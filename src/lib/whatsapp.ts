export const WHATSAPP_NUMBER = "595983309319";

export const buildWhatsAppUrl = (text: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
