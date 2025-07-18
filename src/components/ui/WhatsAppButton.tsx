import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/595991800886?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20servicios%20de%20salud%20mental."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-success text-white w-14 h-14 shadow-lg hover:bg-success/90 transition-colors"
      aria-label="Contáctenos por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;