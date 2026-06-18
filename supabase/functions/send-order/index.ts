// supabase/functions/send-order/index.ts
//
// Edge Function appelée depuis le front pour traiter une commande.
// Le logo est embarqué directement dans l'email via CID (Content-ID)
// pour qu'il s'affiche TOUJOURS, même si le client mail bloque les images externes.

import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@3.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type OrderPayload = {
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    notes?: string;
  };
  items: Array<{
    brand: string;
    name: string;
    volume: number;
    quantity: number;
    unitPrice: number;
  }>;
  totalItems: number;
  totalPrice: number;
  pdfBase64: string;
};

// ============== HELPERS ==============

function formatFCFA(n: number): string {
  return `${n.toLocaleString("fr-FR")} FCFA`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

// Convertit un ArrayBuffer en base64 (compatible Deno)
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Télécharge le logo depuis l'URL et le retourne en base64.
// Retourne null si erreur (fallback texte sera utilisé).
async function fetchLogoBase64(logoUrl: string): Promise<string | null> {
  if (!logoUrl) return null;
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) {
      console.warn(`Logo fetch failed: HTTP ${response.status}`);
      return null;
    }
    const buffer = await response.arrayBuffer();
    return arrayBufferToBase64(buffer);
  } catch (err) {
    console.warn("Logo fetch error:", err);
    return null;
  }
}

// Bloc HTML du logo : image CID si dispo, fallback texte sinon.
// Le src="cid:amanya-logo" sera résolu par le client mail vers la pièce jointe inline.
function logoBlock(hasLogo: boolean, size: "small" | "big" = "small"): string {
  if (hasLogo) {
    const height = size === "big" ? 140 : 80;
    const align = size === "big" ? "margin:0 auto" : "";
    return `<img src="cid:amanya-logo" alt="AMANYA" style="height:${height}px;width:auto;display:block;${align}" />`;
  }
  // Fallback texte (si fetch logo a échoué)
  const fontSize = size === "big" ? 44 : 32;
  const letterSpacing = size === "big" ? 8 : 5;
  return `<div style="color:#D4AF37;font-size:${fontSize}px;font-weight:bold;letter-spacing:${letterSpacing}px">AMANYA</div>`;
}

function buildAdminHtml(order: OrderPayload, hasLogo: boolean): string {
  const rows = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e5e5e5">
          <div style="font-weight:bold;color:#1a1a1a">${i.brand}</div>
          <div style="color:#666;font-size:13px">${i.name}</div>
        </td>
        <td style="padding:12px;border-bottom:1px solid #e5e5e5;text-align:center;color:#666">${i.volume} ml</td>
        <td style="padding:12px;border-bottom:1px solid #e5e5e5;text-align:center;font-weight:bold">${i.quantity}</td>
        <td style="padding:12px;border-bottom:1px solid #e5e5e5;text-align:right;color:#666">${formatFCFA(i.unitPrice)}</td>
        <td style="padding:12px;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:bold">${formatFCFA(i.quantity * i.unitPrice)}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f5f5;font-family:Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden">

        <tr><td style="background:#1a1a1a;padding:28px 32px">
          <table width="100%"><tr>
            <td style="vertical-align:middle">
              ${logoBlock(hasLogo, "small")}
              <div style="color:#fff;font-size:11px;opacity:0.7;margin-top:8px">Distribution authentique · Dakar</div>
            </td>
            <td align="right" style="vertical-align:middle">
              <div style="color:#D4AF37;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1.5px">Nouvelle commande</div>
              <div style="color:#fff;font-size:11px;opacity:0.7;margin-top:4px">${formatDate(order.date)}</div>
            </td>
          </tr></table>
        </td></tr>

        <tr><td style="padding:24px 32px 0">
          <div style="background:#F5EDE5;padding:16px;border-radius:8px">
            <div style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:bold">N° de commande</div>
            <div style="color:#DC143C;font-family:Courier,monospace;font-size:18px;font-weight:bold;margin-top:4px">${order.orderNumber}</div>
          </div>
        </td></tr>

        <tr><td style="padding:24px 32px 0">
          <div style="color:#D4AF37;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-bottom:8px">Client</div>
          <div style="color:#1a1a1a;font-size:16px;font-weight:bold">${order.customer.name}</div>
          <div style="color:#666;font-size:14px;margin-top:4px">
            📞 ${order.customer.phone}${order.customer.email ? ` &nbsp;·&nbsp; ✉️ ${order.customer.email}` : ""}
          </div>
          ${order.customer.address ? `<div style="color:#666;font-size:14px;margin-top:2px">📍 ${order.customer.address}</div>` : ""}
        </td></tr>

        <tr><td style="padding:24px 32px 0">
          <div style="color:#D4AF37;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-bottom:8px">
            Articles (${order.totalItems})
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            <thead><tr style="background:#1a1a1a;color:#D4AF37">
              <th style="padding:10px;text-align:left;font-size:11px;text-transform:uppercase">Produit</th>
              <th style="padding:10px;font-size:11px;text-transform:uppercase">Vol.</th>
              <th style="padding:10px;font-size:11px;text-transform:uppercase">Qté</th>
              <th style="padding:10px;text-align:right;font-size:11px;text-transform:uppercase">Prix unit.</th>
              <th style="padding:10px;text-align:right;font-size:11px;text-transform:uppercase">Sous-total</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </td></tr>

        <tr><td style="padding:16px 32px 0">
          <table width="100%" style="background:#1a1a1a;border-radius:8px"><tr>
            <td style="padding:16px;color:#D4AF37;font-weight:bold">${order.totalItems} articles</td>
            <td style="padding:16px;text-align:right;color:#fff;font-size:20px;font-weight:bold">TOTAL : ${formatFCFA(order.totalPrice)}</td>
          </tr></table>
        </td></tr>

        ${
          order.customer.notes
            ? `
        <tr><td style="padding:16px 32px 0">
          <div style="background:#FFF9E6;padding:12px;border-radius:8px;border-left:3px solid #D4AF37">
            <div style="font-size:11px;font-weight:bold;color:#666;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px">Notes client</div>
            <div style="color:#1a1a1a;font-size:14px">${order.customer.notes}</div>
          </div>
        </td></tr>`
            : ""
        }

        <tr><td style="padding:24px 32px;border-top:1px solid #e5e5e5;color:#999;font-size:12px;text-align:center">
          Le reçu PDF détaillé est joint à cet email.<br>
          AMANYA · Dakar, Sénégal
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildCustomerHtml(order: OrderPayload, hasLogo: boolean): string {
  const itemsText = order.items
    .map((i) => `<li>${i.brand} — ${i.name} (${i.volume}ml) × ${i.quantity}</li>`)
    .join("");

  return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f5f5;font-family:Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:24px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden">

        <tr><td style="background:#1a1a1a;padding:40px 32px;text-align:center">
          ${logoBlock(hasLogo, "big")}
          <div style="color:#fff;font-size:13px;opacity:0.7;margin-top:14px">Distribution authentique · Dakar, Sénégal</div>
        </td></tr>

        <tr><td style="padding:40px 32px 0;text-align:center">
          <h1 style="color:#1a1a1a;font-size:28px;margin:0">Merci pour votre commande !</h1>
          <p style="color:#666;font-size:15px;margin-top:12px;line-height:1.6">
            Bonjour <strong>${order.customer.name}</strong>,<br>
            Nous avons bien reçu votre commande. Notre équipe vous contactera très prochainement
            pour confirmer la disponibilité et organiser la livraison.
          </p>
        </td></tr>

        <tr><td style="padding:32px">
          <div style="background:#F5EDE5;padding:20px;border-radius:8px;text-align:center">
            <div style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-weight:bold">N° de commande</div>
            <div style="color:#DC143C;font-family:Courier,monospace;font-size:20px;font-weight:bold;margin-top:6px">${order.orderNumber}</div>
            <div style="color:#666;font-size:13px;margin-top:8px">${formatDate(order.date)}</div>
          </div>
        </td></tr>

        <tr><td style="padding:0 32px">
          <h3 style="color:#1a1a1a;font-size:14px;text-transform:uppercase;letter-spacing:1.5px">Votre commande (${order.totalItems} articles)</h3>
          <ul style="color:#666;font-size:14px;line-height:1.8;padding-left:20px">${itemsText}</ul>
        </td></tr>

        <tr><td style="padding:0 32px 32px">
          <div style="background:#1a1a1a;padding:20px;border-radius:8px;text-align:center">
            <div style="color:#D4AF37;font-size:12px;text-transform:uppercase;letter-spacing:2px">Total</div>
            <div style="color:#fff;font-size:28px;font-weight:bold;margin-top:4px">${formatFCFA(order.totalPrice)}</div>
          </div>
        </td></tr>

        <tr><td style="padding:0 32px 32px;text-align:center">
          <p style="color:#666;font-size:13px;line-height:1.6">
            📎 Le reçu détaillé est joint à cet email au format PDF.<br>
            Conservez-le précieusement pour le suivi de votre commande.
          </p>
        </td></tr>

        <tr><td style="padding:24px;background:#f5f5f5;text-align:center;color:#999;font-size:12px">
          Une question ? Contactez-nous à <a href="mailto:contact@amanya-distribution.com" style="color:#D4AF37;text-decoration:none">contact@amanya-distribution.com</a><br>
          <span style="font-size:11px;opacity:0.7">© ${new Date().getFullYear()} AMANYA · Tous droits réservés</span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ============== HANDLER ==============

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "contact@amanya-distribution.com";
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
    const REPLY_TO = Deno.env.get("REPLY_TO_EMAIL") ?? ADMIN_EMAIL;
    const LOGO_URL = Deno.env.get("LOGO_URL") ?? "";

    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY manquant");
    if (!ADMIN_EMAIL) throw new Error("ADMIN_EMAIL manquant");

    const order: OrderPayload = await req.json();

    if (!order.orderNumber || !order.customer?.name || !order.customer?.phone) {
      throw new Error("Données de commande invalides");
    }
    if (!order.pdfBase64) {
      throw new Error("PDF manquant");
    }

    // 🆕 Télécharger le logo en base64 pour le CID inline
    const logoBase64 = await fetchLogoBase64(LOGO_URL);
    const hasLogo = !!logoBase64;
    console.log("Logo loaded:", hasLogo, "size:", logoBase64?.length ?? 0);

    const resend = new Resend(RESEND_API_KEY);
    const pdfFilename = `AMANYA-${order.orderNumber}.pdf`;
    const fromName = `AMANYA <${FROM_EMAIL}>`;

    // Construction des pièces jointes : PDF + logo CID si dispo
    const buildAttachments = () => {
      const atts: Array<{
        filename: string;
        content: string;
        content_id?: string;
      }> = [{ filename: pdfFilename, content: order.pdfBase64 }];

      if (logoBase64) {
        atts.push({
          filename: "logo.png",
          content: logoBase64,
          content_id: "amanya-logo", // Référencé via src="cid:amanya-logo"
        });
      }
      return atts;
    };

    // 1) Email vers l'admin AMANYA
    const adminEmailResult = await resend.emails.send({
      from: fromName,
      to: [ADMIN_EMAIL],
      reply_to: order.customer.email || REPLY_TO,
      subject: `🛒 Nouvelle commande ${order.orderNumber} — ${formatFCFA(order.totalPrice)}`,
      html: buildAdminHtml(order, hasLogo),
      attachments: buildAttachments(),
    });

    if (adminEmailResult.error) {
      throw new Error(`Erreur email admin: ${JSON.stringify(adminEmailResult.error)}`);
    }

    // 2) Email de confirmation au client
    let customerEmailId: string | null = null;
    if (order.customer.email) {
      const customerEmailResult = await resend.emails.send({
        from: fromName,
        to: [order.customer.email],
        reply_to: REPLY_TO,
        subject: `Confirmation de votre commande AMANYA — ${order.orderNumber}`,
        html: buildCustomerHtml(order, hasLogo),
        attachments: buildAttachments(),
      });
      if (customerEmailResult.error) {
        console.error("Erreur email client:", customerEmailResult.error);
      } else {
        customerEmailId = customerEmailResult.data?.id ?? null;
      }
    }

    // 3) Persister en BD
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("orders").insert({
      order_number: order.orderNumber,
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_email: order.customer.email ?? null,
      customer_address: order.customer.address ?? null,
      customer_notes: order.customer.notes ?? null,
      items: order.items,
      total_items: order.totalItems,
      total_price: order.totalPrice,
      status: "pending",
    });

    if (dbError) {
      console.error("Erreur BD:", dbError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderNumber: order.orderNumber,
        adminEmailId: adminEmailResult.data?.id,
        customerEmailId,
        savedToDb: !dbError,
        logoEmbedded: hasLogo,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("send-order error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});