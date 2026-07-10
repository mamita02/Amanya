// src/lib/receipt.ts
// Génère un PDF de reçu de commande avec jsPDF + autoTable

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logoUrl from "../assets/Logo.png";

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════

export type ReceiptCustomer = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
};

export type ReceiptItem = {
  perfumeName: string;
  perfumeBrand: string;
  volume: 50 | 100;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type ReceiptOrder = {
  orderNumber: string;
  date: Date;
  customer: ReceiptCustomer;
  items: ReceiptItem[];
  totalItems: number;
  totalPrice: number;
};

// ═══════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════

function formatFCFA(amount: number): string {
  return amount.toLocaleString("fr-FR") + " F CFA";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Charge le logo en base64 pour l'inclure dans le PDF
 */
async function loadLogoBase64(): Promise<string | null> {
  try {
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn("Failed to load logo:", err);
    return null;
  }
}

// ═══════════════════════════════════════════
// GÉNÉRATION DU PDF
// ═══════════════════════════════════════════

export async function generateReceiptPDF(order: ReceiptOrder): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Couleurs
  const GOLD: [number, number, number] = [212, 175, 55];
  const ONYX: [number, number, number] = [26, 26, 26];
  const RUBY: [number, number, number] = [220, 20, 60];
  const GRAY: [number, number, number] = [100, 100, 100];
  const LIGHT_BG: [number, number, number] = [250, 246, 240];

  // ═══ HEADER : LOGO + INFOS AMANYA ═══
  const logoBase64 = await loadLogoBase64();

  if (logoBase64) {
    try {
      doc.addImage(logoBase64, "PNG", 15, 12, 35, 20);
    } catch (err) {
      console.warn("Failed to add logo:", err);
    }
  }

  // Texte AMANYA à droite du logo
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "normal");
  doc.text("Distribution de parfums en gros", pageWidth - 15, 18, { align: "right" });
  doc.text("Dakar, Sénégal", pageWidth - 15, 23, { align: "right" });
  doc.text("contact@amanya-distribution.com", pageWidth - 15, 28, { align: "right" });
  doc.text("amanya-distribution.com", pageWidth - 15, 33, { align: "right" });

  // Ligne dorée sous le header
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(15, 40, pageWidth - 15, 40);

  // ═══ TITRE RECU + NUMERO ═══
  doc.setFontSize(20);
  doc.setTextColor(...ONYX);
  doc.setFont("helvetica", "bold");
  doc.text("REÇU DE COMMANDE", 15, 52);

  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "normal");
  doc.text(`Date : ${formatDate(order.date)}`, 15, 58);

  // Numéro à droite
  doc.setFontSize(10);
  doc.setTextColor(...ONYX);
  doc.setFont("helvetica", "bold");
  doc.text("N° DE COMMANDE :", pageWidth - 65, 52);
  doc.setTextColor(...RUBY);
  doc.text(order.orderNumber, pageWidth - 15, 52, { align: "right" });

  // ═══ INFOS CLIENT ═══
  const clientY = 68;
  doc.setFillColor(...LIGHT_BG);
  doc.rect(15, clientY, pageWidth - 30, 30, "F");

  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT", 20, clientY + 6);

  doc.setFontSize(11);
  doc.setTextColor(...ONYX);
  doc.setFont("helvetica", "bold");
  doc.text(order.customer.name, 20, clientY + 13);

  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "normal");
  let contactLine = `Tel: ${order.customer.phone}`;
  if (order.customer.email) contactLine += `   ·   Email: ${order.customer.email}`;
  doc.text(contactLine, 20, clientY + 19);

  if (order.customer.address) {
    doc.text(`Adresse: ${order.customer.address}`, 20, clientY + 25);
  }

  // ═══ TABLEAU DES ITEMS ═══
  const tableStartY = 105;
  const availableWidth = pageWidth - 30; // 15mm marge de chaque côté

  autoTable(doc, {
    startY: tableStartY,
    head: [["Produit", "Vol.", "Qte", "Prix unit.", "Sous-total"]],
    body: order.items.map((item) => [
      `${item.perfumeName}\n${item.perfumeBrand}`,
      `${item.volume} ml`,
      String(item.quantity),
      formatFCFA(item.unitPrice),
      formatFCFA(item.subtotal),
    ]),
    theme: "grid",
    headStyles: {
      fillColor: ONYX,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
      cellPadding: 3,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: ONYX,
      cellPadding: 3,
      lineColor: [230, 230, 230],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [252, 250, 246],
    },
    columnStyles: {
      0: { cellWidth: availableWidth * 0.42, halign: "left" },    // Produit — 42%
      1: { cellWidth: availableWidth * 0.10, halign: "center" },  // Vol — 10%
      2: { cellWidth: availableWidth * 0.10, halign: "center", fontStyle: "bold" }, // Qte — 10%
      3: { cellWidth: availableWidth * 0.18, halign: "right" },   // Prix unit — 18%
      4: { cellWidth: availableWidth * 0.20, halign: "right", fontStyle: "bold" }, // Sous-total — 20%
    },
    margin: { left: 15, right: 15 },
  });

  // ═══ TOTAL ═══
  const finalY = (doc as any).lastAutoTable.finalY + 6;

  doc.setFillColor(...ONYX);
  doc.rect(15, finalY, pageWidth - 30, 18, "F");

  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.setFont("helvetica", "bold");
  doc.text(`${order.totalItems} articles`, 20, finalY + 11);

  doc.setFontSize(14);
  doc.setTextColor(...GOLD);
  doc.text(`TOTAL : ${formatFCFA(order.totalPrice)}`, pageWidth - 20, finalY + 11, { align: "right" });

  // ═══ NOTES ═══
  let notesY = finalY + 28;
  if (order.customer.notes) {
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.setFont("helvetica", "bold");
    doc.text("Notes du client :", 15, notesY);

    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(order.customer.notes, pageWidth - 30);
    doc.text(splitNotes, 15, notesY + 5);
    notesY += 5 + splitNotes.length * 4;
  }

  // ═══ FOOTER ═══
  const footerY = Math.max(notesY + 15, doc.internal.pageSize.getHeight() - 30);

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(15, footerY, pageWidth - 15, footerY);

  doc.setFontSize(9);
  doc.setTextColor(...ONYX);
  doc.setFont("helvetica", "bold");
  doc.text("Merci de votre confiance.", 15, footerY + 6);

  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.setFont("helvetica", "normal");
  doc.text("AMANYA  ·  Dakar, Senegal  ·  contact@amanya-distribution.com", 15, footerY + 11);
  doc.text("Ce document est un recapitulatif de commande. La commande sera confirmee apres contact avec notre equipe.", 15, footerY + 15);

  return doc;
}