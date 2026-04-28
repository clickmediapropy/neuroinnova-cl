import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-light border-t border-border/60">
      <div className="container py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">
          {/* Column 1: About */}
          <div className="lg:col-span-4 space-y-5 max-w-sm">
            <Logo className="h-12 w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Primer Centro Integral de Neuromodulación del Paraguay,
              ofreciendo Estimulación Magnética Transcraneal (EMT/TMS) y Estimulación
              Transcraneal por Corriente Directa (tDCS).
            </p>
            <div>
              <Button variant="primary-subtle" size="sm" asChild>
                <Link to="/contacto">Contacte con Nosotros</Link>
              </Button>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">Nuestros Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servicios/emt-tms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Estimulación Magnética Transcraneal (EMT/TMS)
                </Link>
              </li>
              <li>
                <Link to="/servicios/tdcs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Estimulación Transcraneal por Corriente Directa (tDCS)
                </Link>
              </li>
              <li>
                <Link to="/servicios/rehacom" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  RehaCom - Rehabilitación Cognitiva
                </Link>
              </li>
              <li>
                <Link to="/autoevaluacion" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Autoevaluación
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/condiciones" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Condiciones Tratadas
                </Link>
              </li>
              <li>
                <Link to="/autoevaluacion/depresion" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Evaluación de Depresión
                </Link>
              </li>
              <li>
                <Link to="/autoevaluacion/ansiedad" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Evaluación de Ansiedad
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl("Hola, me gustaría agendar una consulta de evaluación para tratamiento de neuromodulación (EMT/TMS o tDCS).")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Agendar Consulta
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">Información de Contacto</h3>
            <ul className="space-y-3.5">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera, Clínica IMA, Asunción, Paraguay
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+59521605535" className="text-sm text-muted-foreground hover:text-primary transition-colors tabular-nums">
                  (+595) 21 605 535
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:dr.victoradorno@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                  dr.victoradorno@gmail.com
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">Lunes a Viernes: 8:00 - 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-14 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="text-xs text-muted-foreground space-y-3">
              <p>
                &copy; {currentYear} NeuroInnova. Todos los derechos reservados.
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <Link to="/politica-privacidad" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
                <span className="text-muted-foreground/40" aria-hidden>·</span>
                <Link to="/terminos-condiciones" className="hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
                <span className="text-muted-foreground/40" aria-hidden>·</span>
                <Link to="/aviso-legal" className="hover:text-primary transition-colors">
                  Aviso Legal
                </Link>
              </div>
            </div>
            <div className="text-xs text-muted-foreground/80 leading-relaxed md:text-right md:max-w-sm">
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