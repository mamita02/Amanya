// src/lib/orderApi.ts
// Wrapper côté client pour appeler l'Edge Function send-order.

import type { Pack } from "./cart";
import { generateReceiptPDF, type ReceiptItem, type ReceiptOrder } from "./receipt";
import { supabase } from "./supabase";

export type SendOrderResult = {
  success: boolean;
  orderNumber: string;
  adminEmailId?: string;
  customerEmailId?: string | null;
  savedToDb?: boolean;
};

/**
 * Transforme les packs en items plats pour l'envoi
 * (chaque parfum d'un pack devient un ReceiptItem)
 */
export function packsToFlatItems(packs: Pack[]): ReceiptItem[] {
  const items: ReceiptItem[] = [];

  for (const pack of packs) {
    for (const item of pack.items) {
      items.push({
        perfumeName: item.name,
        perfumeBrand: item.brand,
        volume: item.volume,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.unitPrice * item.quantity,
      });
    }
  }

  return items;
}

export async function sendOrder(order: ReceiptOrder): Promise<SendOrderResult> {
  // 1) Générer le PDF
  const doc = await generateReceiptPDF(order);

  // 2) Encoder en base64 AVANT le save (plus léger que datauristring)
  const pdfBase64 = btoa(
    new Uint8Array(doc.output("arraybuffer"))
      .reduce((data, byte) => data + String.fromCharCode(byte), "")
  );

  // 3) Appeler l'Edge Function AVANT le download
  const { data, error } = await supabase.functions.invoke("send-order", {
    body: {
      orderNumber: order.orderNumber,
      date: order.date.toISOString(),
      customer: order.customer,
      items: order.items,
      totalItems: order.totalItems,
      totalPrice: order.totalPrice,
      pdfBase64,
    },
  });

  if (error) {
    console.error("sendOrder error:", error);
    throw new Error(error.message || "Erreur lors de l'envoi de la commande");
  }

  if (!data?.success) {
    throw new Error(data?.error || "La commande n'a pas pu être envoyée");
  }

  // 4) Télécharger le PDF APRÈS le succès (pas avant, sinon bug iOS)
  try {
    doc.save(`AMANYA-${order.orderNumber}.pdf`);
  } catch {
    console.warn("PDF save failed on this device");
  }

  return data as SendOrderResult;
}