// supabase/functions/sync-orders/index.ts
// Sync AMANYA → Odoo (compatible clé API + Odoo Online)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const ODOO_URL = Deno.env.get("ODOO_URL") || "https://mce-senegal.odoo.com";
const ODOO_DB = Deno.env.get("ODOO_DB") || "mce-senegal";
const ODOO_USER = Deno.env.get("ODOO_EMAIL") || "";
const ODOO_PASS = Deno.env.get("ODOO_PASSWORD") || "";
const MAX_ORDERS_PER_RUN = 20;

function log(message: string) {
  const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
  console.log(`[${timestamp}] ${message}`);
}

function isValidEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizePrice(value: any): number {
  const price = parseFloat(value);
  return isNaN(price) ? 0 : Math.max(0, price);
}

function sanitizeQuantity(value: any): number {
  const qty = parseFloat(value);
  return isNaN(qty) || qty <= 0 ? 1 : qty;
}

class OdooClient {
  baseUrl: string;
  db: string;
  user: string;
  pass: string;
  uid: number | null = null;

  constructor(url: string, db: string, user: string, pass: string) {
    this.baseUrl = url.replace(/\/+$/, "");
    this.db = db;
    this.user = user;
    this.pass = pass;
  }

  /**
   * Authentification via /jsonrpc avec service "common" 
   * (compatible clé API + mot de passe)
   */
  async authenticate(): Promise<void> {
    log("🔐 Authenticating with Odoo...");

    const res = await fetch(`${this.baseUrl}/jsonrpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "common",
          method: "authenticate",
          args: [this.db, this.user, this.pass, {}],
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Odoo HTTP ${res.status}: ${text.substring(0, 500)}`);
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(`Odoo error: ${JSON.stringify(data.error)}`);
    }

    if (!data.result || typeof data.result !== "number") {
      throw new Error(
        `Authentication failed: got ${JSON.stringify(data.result)} instead of UID. Check ODOO_DB, ODOO_EMAIL, ODOO_PASSWORD.`
      );
    }

    this.uid = data.result;
    log(`✅ Authenticated as UID: ${this.uid}`);
  }

  /**
   * Appel execute_kw via /jsonrpc avec service "object"
   */
  private async executeKw(model: string, method: string, args: any[], kwargs: any = {}): Promise<any> {
    if (!this.uid) throw new Error("Not authenticated");

    const res = await fetch(`${this.baseUrl}/jsonrpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [this.db, this.uid, this.pass, model, method, args, kwargs],
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Odoo HTTP ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`Odoo error in ${model}.${method}: ${JSON.stringify(data.error)}`);
    }
    return data.result;
  }

  async search(model: string, domain: any[]): Promise<any[]> {
    try {
      const result = await this.executeKw(model, "search_read", [domain], {
        fields: ["id"],
        limit: 1,
      });
      return result || [];
    } catch (e) {
      log(`⚠️ Search error in ${model}: ${e}`);
      return [];
    }
  }

  async create(model: string, values: any): Promise<number | null> {
    try {
      const id = await this.executeKw(model, "create", [values]);
      return id;
    } catch (e) {
      log(`❌ Create error in ${model}: ${e}`);
      return null;
    }
  }
}

async function getOrCreateCustomer(odoo: OdooClient, order: any): Promise<number | null> {
  let email = (order.customer_email || "").trim();

  if (!isValidEmail(email)) {
    email = `no-email-amanya-${order.order_number}@placeholder.local`;
    log(`⚠️ No valid email for order ${order.order_number}, using: ${email}`);
  }

  const existing = await odoo.search("res.partner", [["email", "=", email]]);
  if (existing && existing.length > 0) {
    log(`✓ Customer found: ${email} (ID: ${existing[0].id})`);
    return existing[0].id;
  }

  const name = (order.customer_name || "").trim() || `Client AMANYA #${order.order_number}`;

  const values: any = {
    name,
    email,
    phone: (order.customer_phone || "").trim() || false,
    street: (order.customer_address || "").trim() || false,
    country_id: 195,
    customer_rank: 1,
  };

  const customerId = await odoo.create("res.partner", values);
  if (customerId) {
    log(`✅ Customer created: ${name} (ID: ${customerId})`);
  }
  return customerId;
}

async function getOrCreateProduct(odoo: OdooClient, item: any): Promise<number | null> {
  const brand = (item.perfumeBrand || "UNKNOWN").trim();
  const name = (item.perfumeName || "Parfum").trim();
  const volume = item.volume || 100;

  const sku = `AMANYA-${brand}-${name}-${volume}ML`
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const existing = await odoo.search("product.product", [["default_code", "=", sku]]);
  if (existing && existing.length > 0) {
    log(`✓ Product found: ${sku} (ID: ${existing[0].id})`);
    return existing[0].id;
  }

  const price = sanitizePrice(item.unitPrice);

  const values = {
    name: `${name} — ${brand}`,
    list_price: price,
    default_code: sku,
    type: "consu",
    sale_ok: true,
  };

  const productId = await odoo.create("product.product", values);
  if (productId) {
    log(`✅ Product created: ${name} (ID: ${productId})`);
  }
  return productId;
}

async function syncOrder(odoo: OdooClient, order: any): Promise<number | null> {
  const originTag = `AMANYA-${order.order_number}`;

  const existing = await odoo.search("sale.order", [["origin", "=", originTag]]);
  if (existing && existing.length > 0) {
    log(`⏩ Order ${originTag} already in Odoo (ID: ${existing[0].id})`);
    return existing[0].id;
  }

  log(`🔄 Processing Order ${originTag}...`);

  const partnerId = await getOrCreateCustomer(odoo, order);
  if (!partnerId) {
    log(`❌ No customer for order ${originTag}, skipping`);
    return null;
  }

  const items = Array.isArray(order.items) ? order.items : [];
  if (items.length === 0) {
    log(`⚠️ Order ${originTag} has no items, skipping`);
    return null;
  }

  const orderLines: any[] = [];
  for (const item of items) {
    const productId = await getOrCreateProduct(odoo, item);
    if (!productId) {
      log(`  ├─ ⚠️ Failed to create product for "${item.perfumeName}"`);
      continue;
    }

    const quantity = sanitizeQuantity(item.quantity);
    const price = sanitizePrice(item.unitPrice);

    orderLines.push([
      0,
      0,
      {
        product_id: productId,
        name: `${item.perfumeName} (${item.volume}ml)`,
        product_uom_qty: quantity,
        price_unit: price,
      },
    ]);
    log(`  ├─ Line: ${item.perfumeName} x${quantity} @ ${price}`);
  }

  if (orderLines.length === 0) {
    log(`❌ No valid lines for order ${originTag}, skipping`);
    return null;
  }

  const rawDate = order.created_at || new Date().toISOString();
  const odooDate = rawDate.replace("T", " ").replace("Z", "").split(".")[0];

  const orderValues = {
    partner_id: partnerId,
    origin: originTag,
    client_order_ref: String(order.order_number),
    state: "draft",
    order_line: orderLines,
    date_order: odooDate,
  };

  const newOrderId = await odoo.create("sale.order", orderValues);
  if (newOrderId) {
    log(`✅ SUCCESS: Order ${originTag} → Odoo ID ${newOrderId}`);
  } else {
    log(`❌ FAILED: Could not create ${originTag} in Odoo`);
  }

  return newOrderId;
}

serve(async (_req) => {
  log("🚀 Starting AMANYA → Odoo Sync Job...");

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    log("❌ Missing Supabase credentials");
    return new Response("Missing Supabase credentials", { status: 500 });
  }

  if (!ODOO_USER || !ODOO_PASS) {
    log("❌ Missing Odoo credentials");
    return new Response("Missing Odoo credentials", { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const { data: orders, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("synced_to_odoo", false)
    .order("created_at", { ascending: true })
    .limit(MAX_ORDERS_PER_RUN);

  if (fetchError) {
    log(`❌ Supabase fetch error: ${fetchError.message}`);
    return new Response(`Supabase error: ${fetchError.message}`, { status: 500 });
  }

  if (!orders || orders.length === 0) {
    log("ℹ️ No new orders to sync.");
    return new Response(
      JSON.stringify({ status: "no_new_orders", processed: 0 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  log(`🔎 Found ${orders.length} order(s) to process.`);

  const odoo = new OdooClient(ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASS);
  try {
    await odoo.authenticate();
  } catch (e) {
    log(`❌ Odoo auth failed: ${e}`);
    return new Response(`Odoo auth failed: ${e}`, { status: 500 });
  }

  let successCount = 0;
  let errorCount = 0;

  for (const order of orders) {
    try {
      const odooOrderId = await syncOrder(odoo, order);

      if (odooOrderId) {
        const { error: updateError } = await supabase
          .from("orders")
          .update({
            synced_to_odoo: true,
            odoo_order_id: odooOrderId,
            synced_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        if (updateError) {
          log(`⚠️ Failed to mark order ${order.order_number} as synced: ${updateError.message}`);
        } else {
          successCount++;
        }
      } else {
        errorCount++;
      }
    } catch (e) {
      log(`❌ Unexpected error processing order ${order.order_number}: ${e}`);
      errorCount++;
    }
  }

  log("🏁 Sync finished.");
  log(`📊 Summary: ${successCount} synced, ${errorCount} errors`);

  return new Response(
    JSON.stringify({
      status: "completed",
      total: orders.length,
      synced: successCount,
      errors: errorCount,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});