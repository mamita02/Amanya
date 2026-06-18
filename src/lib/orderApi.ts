// src/lib/orderApi.ts
// Wrapper côté client pour appeler l'Edge Function send-order.

import { generateReceiptPDF, type ReceiptOrder } from "./receipt";
import { supabase } from "./supabase";

export type SendOrderResult = {
  success: boolean;
  orderNumber: string;
  adminEmailId?: string;
  customerEmailId?: string | null;
  savedToDb?: boolean;
};

export async function sendOrder(order: ReceiptOrder): Promise<SendOrderResult> {
  // 1) Générer le PDF (await maintenant que le logo se charge en async)
  const doc = await generateReceiptPDF(order);

  // 2) Télécharger le PDF côté user (copie locale)
  doc.save(`AMANYA-${order.orderNumber}.pdf`);

  // 3) Encoder en base64 pour l'envoyer à l'Edge Function
  const pdfBase64 = doc.output("datauristring").split(",")[1];

  // 4) Appeler l'Edge Function via le client Supabase
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

  return data as SendOrderResult;
}