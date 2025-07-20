import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { Button } from './button';

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="relative">
        {/* Expanded menu */}
        <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <Button
            size="icon"
            className="shadow-lg hover:scale-110 transition-transform animate-float"
            style={{ animationDelay: '0.1s' }}
            asChild
          >
            <a href="/agendar-consulta" className="flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </a>
          </Button>
          
          <Button
            size="icon"
            variant="secondary"
            className="shadow-lg hover:scale-110 transition-transform animate-float"
            style={{ animationDelay: '0.2s' }}
            asChild
          >
            <a href="tel:+59521605535" className="flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default FloatingActions;