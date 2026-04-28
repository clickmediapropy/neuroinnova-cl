import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import { AuroraBackgroundMedical } from "@/components/ui/aurora-background-medical";
const Hero = () => {
  const headerHeight = useHeaderHeight();

  return (
    <AuroraBackgroundMedical 
      intensity="medium"
      showRadialGradient={true}
      className="min-h-screen"
      style={{ 
        paddingTop: `${headerHeight}px`,
        '--header-height': `${headerHeight}px`
      } as React.CSSProperties}
    >
      <section 
        id="hero-neuromodulation"
        className="relative min-h-screen"
      >

      <div className="container relative z-20">
        <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-28">
          {/* CENTERED TEXT ZONE */}
          <div className="flex flex-col justify-center items-center text-center max-w-4xl w-full">
            {/* Eyebrow badge */}
            <div className="inline-flex animate-scale-in mb-5 sm:mb-8 max-w-full" style={{ animationDelay: '0.05s' }}>
              <div className="px-3.5 sm:px-5 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full hover-lift">
                <span className="text-[11px] xs:text-xs sm:text-sm font-semibold tracking-wide text-primary flex items-center gap-2 uppercase">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse shrink-0"></span>
                  Tecnología FDA Aprobada
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[1.75rem] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] sm:leading-[1.05] text-balance">
              <span className="text-foreground font-extrabold animate-fade-in-down" style={{ animationDelay: '0.1s' }}>Primer Centro Integral de </span>
              <span className="text-primary font-bold animate-fade-in-right" style={{ animationDelay: '0.3s' }}>Neuromodulación</span>
              <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-gradient animate-fade-in-up" style={{ animationDelay: '0.5s' }}> del Paraguay</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 sm:mt-6 md:mt-7 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
              Tecnologías avanzadas <span className="font-semibold text-primary">EMT/TMS</span> y <span className="font-semibold text-primary">tDC</span> para tratar condiciones resistentes a terapias convencionales
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none stagger-animation">
              <Button
                size="lg"
                className="text-base md:text-lg px-5 md:px-8 h-12 md:h-14 group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover-lift"
                asChild
              >
                <a
                  href="https://wa.me/595983309319?text=Hola,%20me%20interesa%20agendar%20una%20consulta%20inicial%20para%20evaluación%20de%20salud%20mental."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center font-semibold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp 24/7
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-5 md:px-8 h-12 md:h-14 group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 font-semibold w-full sm:w-auto"
                asChild
              >
                <Link to="/autoevaluacion" className="flex items-center justify-center">
                  <Brain className="mr-2 h-5 w-5" />
                  ¿Es Candidato?
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      </section>
    </AuroraBackgroundMedical>
  );
};
export default Hero;