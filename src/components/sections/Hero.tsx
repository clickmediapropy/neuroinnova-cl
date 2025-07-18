import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
const Hero = () => {
  const headerHeight = useHeaderHeight();

  return (
    <section 
      id="hero-neuromodulation"
      className="relative overflow-hidden min-h-[580px]"
      style={{ 
        paddingTop: `${headerHeight}px`,
        background: 'linear-gradient(to left, #E6F2F7 40%, #FFFFFF 100%)'
      }}
    >
      {/* Animated SVG Layer */}
      <svg 
        className="absolute right-0 bottom-0 w-[520px] h-auto select-none pointer-events-none opacity-30"
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
      >
        <path fill="#A0D8EF">
          <animate 
            attributeName="d" 
            dur="12s" 
            repeatCount="indefinite"
            values="
              M0,200C480,240 960,160 1440,200L1440,320L0,320Z;
              M0,240C480,160 960,240 1440,240L1440,320L0,320Z;
              M0,200C480,240 960,160 1440,200L1440,320L0,320Z"
          />
        </path>
      </svg>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px] items-center">
          {/* LEFT COLUMN - Text Zone */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Logo */}
            <div className="mb-4">
              <Logo className="h-12 w-auto" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                <span className="text-primary">Primer y Único</span><br />
                Centro de Neuromodulación<br />
                <span className="text-accent">de Paraguay</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Tecnologías avanzadas EMT/TMS y tDCS para tratar condiciones resistentes a terapias convencionales
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex">
              <Button variant="badge" size="badge" className="text-xs px-4 py-2 h-auto">
                Tecnología FDA Aprobada
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 h-auto group"
                asChild
              >
                <a 
                  href="https://wa.me/+595981175253" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Agende su Consulta
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 h-auto group"
                asChild
              >
                <Link to="/autoevaluacion" className="flex items-center">
                  <Brain className="mr-2 h-5 w-5" />
                  ¿Es Candidato?
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN - Visual Zone */}
          <div className="relative flex items-center justify-center md:justify-end">
            {/* EMT vs tDCS Illustration */}
            <img
              src="/images/emt-tdcs-illustration.png"
              alt="EMT/TMS vs tDCS Neuromodulation Illustration"
              className="absolute right-0 bottom-0 md:right-8 md:bottom-6 max-w-[460px] w-full h-auto object-contain opacity-95 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;