import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContactButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* Phone button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 active:scale-95 transition-all duration-200"
        asChild
      >
        <a href="tel:+59521605535" aria-label="Llamar">
          <Phone className="h-6 w-6" />
        </a>
      </Button>
      
      {/* WhatsApp button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-200"
        asChild
      >
        <a 
          href="https://wa.me/595991800886?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20médica%20especializada."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6 fill-current" />
        </a>
      </Button>
    </div>
  );
};

export default FloatingContactButtons;