import { useState } from "react";
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

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `relative px-3 py-2 transition-colors hover:text-primary ${
      isActive ? "font-medium text-primary" : "text-foreground"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-primary/20 shadow-sm backdrop-blur-sm">
      {/* Navigation Section - No Logo */}
      <div className="container flex h-16 items-center justify-between">        
        {/* Desktop navigation */}
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

        {/* Mobile menu button - positioned at start for mobile */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <a href="tel:+59521605535" className="flex items-center text-sm text-foreground hover:text-primary">
            <Phone className="mr-1 h-4 w-4" />
            <span>(+595) 21 605 535</span>
          </a>
          <Button size="sm" asChild>
            <a href="https://wa.me/595981175253" target="_blank" rel="noopener noreferrer">
              Agende su Consulta
            </a>
          </Button>
        </div>

        {/* Mobile contact info - positioned at end */}
        <div className="md:hidden ml-auto">
          <Button size="sm" asChild>
            <a href="https://wa.me/595981175253" target="_blank" rel="noopener noreferrer">
              Consulta
            </a>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-primary/20 shadow-md z-50 backdrop-blur-sm">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
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
            <div className="flex flex-col space-y-3 pt-3 border-t border-border/60">
              <a 
                href="tel:+59521605535" 
                className="flex items-center text-sm text-foreground hover:text-primary"
                onClick={closeMenu}
              >
                <Phone className="mr-2 h-4 w-4" />
                <span>(+595) 21 605 535</span>
              </a>
              <Button size="sm" onClick={closeMenu} asChild>
                <a href="https://wa.me/595981175253" target="_blank" rel="noopener noreferrer">
                  Agende su Consulta
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;