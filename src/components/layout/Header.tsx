import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
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
    return `relative px-3.5 py-2 text-sm font-medium tracking-tight transition-all duration-200 hover:text-primary active:scale-95 min-h-[44px] flex items-center rounded-md ${
      isActive ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-primary/5"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/70 shadow-sm">
      <div className="container flex h-16 md:h-20 items-center justify-between gap-2 sm:gap-4">
        {/* Logo and Desktop navigation */}
        <div className="flex items-center gap-6 lg:gap-8 min-w-0">
          <Link to="/" className="shrink-0 transition-transform duration-200 hover:scale-[1.03]" aria-label="Inicio">
            <Logo className="h-10 xs:h-11 sm:h-12 md:h-14 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
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
            {/* <NavLink to="/blog" className={getNavLinkClass}>
              Blog
            </NavLink> */}
            <NavLink to="/contacto" className={getNavLinkClass}>
              Contacto
            </NavLink>
          </nav>
        </div>

        {/* Right cluster: contact (desktop) + CTA + mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+59521605535"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="tabular-nums">(+595) 21 605 535</span>
          </a>

          <Button
            size="sm"
            className="hidden md:inline-flex h-10 px-4 rounded-full shadow-sm"
            asChild
          >
            <a
              href="https://wa.me/595996960270?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20médica%20especializada."
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 24/7
            </a>
          </Button>

          {/* Mobile CTA */}
          <Button
            size="sm"
            className="md:hidden h-10 px-3.5 text-xs rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm active:scale-95 transition-all duration-200"
            asChild
          >
            <a
              href="https://wa.me/595996960270?text=Hola,%20necesito%20información%20sobre%20consultas%20médicas."
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 24/7
            </a>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden h-11 w-11 rounded-full hover:bg-primary/10 active:scale-95 transition-all duration-200"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
          <div
            id="mobile-menu"
            className="md:hidden fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border/60 shadow-xl z-50 animate-slide-in-right max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="container py-5 space-y-5">
              <nav className="flex flex-col gap-1" aria-label="Menú principal">
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
              <div className="flex flex-col gap-3 pt-4 border-t border-border/60">
                <a
                  href="tel:+59521605535"
                  className="flex items-center gap-3 text-sm text-foreground/90 hover:text-primary p-3 rounded-lg hover:bg-primary/5 active:bg-primary/10 transition-colors duration-200 min-h-[48px]"
                  onClick={closeMenu}
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="tabular-nums">(+595) 21 605 535</span>
                </a>
                <Button
                  size="lg"
                  onClick={closeMenu}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm active:scale-95 transition-all duration-200 rounded-lg min-h-[48px] text-base"
                  asChild
                >
                  <a href="https://wa.me/595996960270?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20médica%20especializada." target="_blank" rel="noopener noreferrer">
                    WhatsApp disponible 24/7
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

export default Header;