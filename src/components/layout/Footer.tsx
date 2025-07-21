import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-light border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Logo className="h-12 w-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Primer y único centro especializado en neuromodulación de Paraguay, 
              ofreciendo Estimulación Magnética Transcraneal (EMT/TMS) y Estimulación 
              Transcraneal por Corriente Directa (tDCS).
            </p>
            <div className="pt-2">
              <Button variant="primary-subtle" size="sm" asChild>
                <Link to="/contacto">Contacte con Nosotros</Link>
              </Button>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nuestros Servicios</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/servicios/emt-tms" className="text-sm text-foreground hover:text-primary">
                  Estimulación Magnética Transcraneal (EMT/TMS)
                </Link>
              </li>
              <li>
                <Link to="/servicios/tdcs" className="text-sm text-foreground hover:text-primary">
                  Estimulación Transcraneal por Corriente Directa (tDCS)
                </Link>
              </li>
              <li>
                <Link to="/servicios/psiquiatria-tradicional" className="text-sm text-foreground hover:text-primary">
                  Consulta Psiquiátrica
                </Link>
              </li>
              <li>
                <Link to="/servicios/rehacom" className="text-sm text-foreground hover:text-primary">
                  RehaCom - Rehabilitación Cognitiva
                </Link>
              </li>
              <li>
                <Link to="/autoevaluacion" className="text-sm text-foreground hover:text-primary">
                  Autoevaluación
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/condiciones" className="text-sm text-foreground hover:text-primary">
                  Condiciones Tratadas
                </Link>
              </li>
              <li>
                <Link to="/autoevaluacion/depresion" className="text-sm text-foreground hover:text-primary">
                  Evaluación de Depresión
                </Link>
              </li>
              <li>
                <Link to="/autoevaluacion/ansiedad" className="text-sm text-foreground hover:text-primary">
                  Evaluación de Ansiedad
                </Link>
              </li>
              <li>
                <Link to="/agendar-consulta" className="text-sm text-foreground hover:text-primary">
                  Agendar Consulta
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Información de Contacto</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                <span className="text-sm">
                  Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera, Clínica IMA, Asunción, Paraguay
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary shrink-0 mr-3" />
                <a href="tel:+59521605535" className="text-sm hover:text-primary">
                  (+595) 21 605 535
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary shrink-0 mr-3" />
                <a href="mailto:dr.victoradorno@gmail.com" className="text-sm hover:text-primary">
                  dr.victoradorno@gmail.com
                </a>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-primary shrink-0 mr-3" />
                <span className="text-sm">Lunes a Viernes: 8:00 - 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              &copy; {currentYear} NeuroInnova. Todos los derechos reservados.
            </p>
            <div className="text-xs text-muted-foreground text-center md:text-right">
              <p className="mb-1">
                La información proporcionada en este sitio no reemplaza la consulta médica profesional.
              </p>
              <p>
                Consulte siempre con un profesional de la salud para diagnóstico y tratamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;