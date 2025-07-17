import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const Header = () => {
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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>
        
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

        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border/40 shadow-md z-50">
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

export default Header;