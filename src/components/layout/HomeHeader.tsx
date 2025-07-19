import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `relative px-4 py-3 font-medium transition-all duration-200 hover:text-primary hover:scale-105 ${
      isActive ? "text-primary bg-primary/10 rounded-lg" : "text-foreground hover:bg-primary/5 rounded-lg"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 border-b border-primary/20 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-card/60">
      {/* Navigation Section with Logo */}
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Desktop navigation */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Logo className="h-12 sm:h-14 md:h-16 w-auto transition-transform hover:scale-105" />
          
          <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" end className={getNavLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/servicios" className={getNavLinkClass}>
            Servicios
          </NavLink>
          <NavLink to="/autoevaluacion" className={getNavLinkClass}>
            Autoevaluación
          </NavLink>
          <NavLink to="/condiciones" className={getNavLinkClass}>
            Condiciones
          </NavLink>
          <NavLink to="/contacto" className={getNavLinkClass}>
            Contacto
          </NavLink>
          </nav>
        </div>

        {/* Mobile menu button - positioned at start for mobile */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Menu"
            className="h-10 w-10 rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <a href="tel:+59521605535" className="flex items-center text-sm text-foreground hover:text-primary">
            <Phone className="mr-1 h-4 w-4" />
            <span>(+595) 21 605 535</span>
          </a>
          <Button size="sm" asChild>
            <a href="https://wa.me/595991800886?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20médica%20especializada." target="_blank" rel="noopener noreferrer">
              Agende su Consulta
            </a>
          </Button>
        </div>

        {/* Mobile contact info - positioned at end */}
        <div className="md:hidden ml-auto mr-2">
          <Button 
            size="sm" 
            className="text-xs sm:text-sm px-3 sm:px-4 py-2 h-9 rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105" 
            asChild
          >
            <a href="https://wa.me/595991800886?text=Hola,%20necesito%20información%20sobre%20consultas%20médicas." target="_blank" rel="noopener noreferrer">
              Consulta
            </a>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={closeMenu}
          />
          {/* Mobile menu */}
          <div className="md:hidden fixed top-14 sm:top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-primary/20 shadow-2xl z-50 animate-slide-in-right">
            <div className="container py-6 space-y-6 px-4 sm:px-6">
              <nav className="flex flex-col space-y-1">
                <NavLink to="/" end className={getNavLinkClass} onClick={closeMenu}>
                  Inicio
                </NavLink>
                <NavLink to="/servicios" className={getNavLinkClass} onClick={closeMenu}>
                  Servicios
                </NavLink>
                <NavLink to="/autoevaluacion" className={getNavLinkClass} onClick={closeMenu}>
                  Autoevaluación
                </NavLink>
                <NavLink to="/condiciones" className={getNavLinkClass} onClick={closeMenu}>
                  Condiciones
                </NavLink>
                <NavLink to="/contacto" className={getNavLinkClass} onClick={closeMenu}>
                  Contacto
                </NavLink>
              </nav>
              <div className="flex flex-col space-y-4 pt-4 border-t border-border/60">
                <a 
                  href="tel:+59521605535" 
                  className="flex items-center text-sm text-foreground hover:text-primary p-3 rounded-lg hover:bg-primary/5 transition-all duration-200"
                  onClick={closeMenu}
                >
                  <Phone className="mr-3 h-5 w-5" />
                  <span>(+595) 21 605 535</span>
                </a>
                <Button size="lg" onClick={closeMenu} className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 rounded-lg py-3" asChild>
                  <a href="https://wa.me/595991800886?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20médica%20especializada." target="_blank" rel="noopener noreferrer">
                    Agende su Consulta
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default HomeHeader;