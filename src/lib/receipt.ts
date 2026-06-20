// src/lib/receipt.ts
// Génération d'un reçu PDF AMANYA avec logo image, numéro de commande, date, items et total.

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoUrl from "../assets/Logo.png";
import { formatFCFA } from "./perfumes";

export type ReceiptCustomer = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
};

export type ReceiptItem = {
  brand: string;
  name: string;
  volume: number;
  quantity: number;
  unitPrice: number;
};

export type ReceiptOrder = {
  orderNumber: string;
  date: Date;
  customer: ReceiptCustomer;
  items: ReceiptItem[];
  totalItems: number;
  totalPrice: number;
};

export function generateOrderNumber(): string {
  const now = new Date();
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `AMA-${ymd}-${random}`;
}

export function formatOrderDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(date).replace(",", " à");
}

// Palette AMANYA
const COLORS = {
  onyx: [26, 26, 26] as [number, number, number],
  gold: [212, 175, 55] as [number, number, number],
  ruby: [220, 20, 60] as [number, number, number],
  beige: [245, 237, 229] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  gray: [102, 102, 102] as [number, number, number],
};

// ============== CHARGEMENT DU LOGO ==============
// Cache pour ne charger le logo qu'une fois par session

let logoBase64Cache: string | null = null;
let logoLoadPromise: Promise<string> | null = null;

async function getLogoBase64(): Promise<string> {
  if (logoBase64Cache) return logoBase64Cache;
  if (logoLoadPromise) return logoLoadPromise;

  logoLoadPromise = (async () => {
    try {
      const response = await fetch(logoUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          logoBase64Cache = result;
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.warn("⚠️ Logo non chargé, fallback texte:", err);
      return "";
    }
  })();

  return logoLoadPromise;
}

// ============== GÉNÉRATION DU PDF ==============

export async function generateReceiptPDF(order: ReceiptOrder): Promise<jsPDF> {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  // ===================== HEADER ONYX =====================
  doc.setFillColor(...COLORS.onyx);
  doc.rect(0, 0, pageWidth, 42, "F");

  // Logo (image ou fallback texte)
  const logoBase64 = await getLogoBase64();
  if (logoBase64) {
    try {
      // Logo image — ajuste les dimensions selon le ratio de ton fichier
      // 38mm de large × 18mm de haut, positionné à gauche
      doc.addImage(logoBase64, "PNG", margin, 11, 38, 18);
    } catch (err) {
      console.warn("Erreur addImage:", err);
      // Fallback texte
      doc.setTextColor(...COLORS.gold);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(34);
      doc.text("AMANYA", margin, 23);
    }
  } else {
    // Fallback texte si pas de logo
    doc.setTextColor(...COLORS.gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(34);
    doc.text("AMANYA", margin, 23);
  }

  // Tagline sous le logo
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text("Distribution authentique · Dakar, Sénégal", margin, 33);

  // Titre droit
  doc.setTextColor(...COLORS.gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("REÇU DE COMMANDE", pageWidth - margin, 22, { align: "right" });

  doc.setTextColor(...COLORS.white);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(formatOrderDate(order.date), pageWidth - margin, 30, { align: "right" });

  // Trait or sous le header
  doc.setFillColor(...COLORS.gold);
  doc.rect(0, 42, pageWidth, 1, "F");

  let y = 53;

  // ===================== NUMÉRO DE COMMANDE =====================
  doc.setTextColor(...COLORS.onyx);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("N° DE COMMANDE :", margin, y);
  doc.setFont("courier", "bold");
  doc.setTextColor(...COLORS.ruby);
  doc.text(order.orderNumber, margin + 42, y);

  y += 10;

  // ===================== CLIENT =====================
  doc.setFillColor(...COLORS.beige);
  doc.rect(margin, y, pageWidth - margin * 2, 30, "F");

  doc.setTextColor(...COLORS.gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("CLIENT", margin + 4, y + 6);

  doc.setTextColor(...COLORS.onyx);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(order.customer.name, margin + 4, y + 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  let line2 = `Tel: ${order.customer.phone}`;
  if (order.customer.email) line2 += `   ·   Email: ${order.customer.email}`;
  doc.text(line2, margin + 4, y + 20);

  if (order.customer.address) {
    doc.text(`Adresse: ${order.customer.address}`, margin + 4, y + 26);
  }

  y += 38;

  // ===================== TABLEAU DES ARTICLES =====================
  autoTable(doc, {
    startY: y,
    head: [["Produit", "Vol.", "Qte", "Prix unit.", "Sous-total"]],
    body: order.items.map((item) => [
      `${item.brand}\n${item.name}`,
      `${item.volume} ml`,
      `${item.quantity}`,
      formatFCFA(item.unitPrice),
      formatFCFA(item.quantity * item.unitPrice),
    ]),
    theme: "grid",
    headStyles: {
      fillColor: COLORS.onyx,
      textColor: COLORS.gold,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.onyx,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 20, halign: "center", fontStyle: "bold" },
      3: { cellWidth: 35, halign: "right" },
      4: { cellWidth: 35, halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;

  // ===================== TOTAL =====================
  doc.setFillColor(...COLORS.onyx);
  doc.rect(margin, finalY, pageWidth - margin * 2, 20, "F");

  doc.setTextColor(...COLORS.gold);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    `${order.totalItems} article${order.totalItems > 1 ? "s" : ""}`,
    margin + 4,
    finalY + 13
  );

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(16);
  doc.text(
    `TOTAL : ${formatFCFA(order.totalPrice)}`,
    pageWidth - margin - 4,
    finalY + 13,
    { align: "right" }
  );

  // ===================== NOTES =====================
  if (order.customer.notes) {
    const notesY = finalY + 30;
    doc.setTextColor(...COLORS.gray);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Notes du client :", margin, notesY);
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(order.customer.notes, pageWidth - margin * 2);
    doc.text(wrapped, margin, notesY + 5);
  }

  // ===================== FOOTER =====================
  const footerY = doc.internal.pageSize.getHeight() - 28;
  doc.setDrawColor(...COLORS.gold);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setTextColor(...COLORS.onyx);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Merci de votre confiance.", margin, footerY + 7);

  doc.setTextColor(...COLORS.gray);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    "AMANYA · Dakar, Senegal · contact@amanya-distribution.com",
    margin,
    footerY + 13
  );
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.text(
    "Ce document est un recapitulatif de commande. La commande sera confirmee apres contact avec notre equipe.",
    margin,
    footerY + 19
  );

  return doc;
}

export async function downloadReceipt(order: ReceiptOrder): Promise<void> {
  const doc = await generateReceiptPDF(order);
  doc.save(`AMANYA-${order.orderNumber}.pdf`);
}
