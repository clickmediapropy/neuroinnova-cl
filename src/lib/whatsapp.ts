export const WHATSAPP_NUMBER = "595986960270";

export const buildWhatsAppUrl = (text: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
