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
        <div className="flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20">
          {/* CENTERED TEXT ZONE - Full Width */}
          <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-6 md:space-y-8 text-center max-w-5xl px-4">
            {/* Headline */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="text-foreground font-extrabold animate-fade-in-down" style={{ animationDelay: '0.1s' }}>Primer Centro Integral de </span>
                <span className="text-primary font-bold animate-fade-in-right" style={{ animationDelay: '0.3s' }}>Neuromodulación</span>
                <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-gradient animate-fade-in-up" style={{ animationDelay: '0.5s' }}> del Paraguay</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-muted-foreground leading-relaxed max-w-4xl">
                Tecnologías avanzadas <span className="font-semibold text-primary">EMT/TMS</span> y <span className="font-semibold text-primary">tDC</span> para tratar condiciones resistentes a terapias convencionales
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex px-4 animate-scale-in" style={{ animationDelay: '0.9s' }}>
              <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-primary/10 border border-primary/20 rounded-full animate-glow hover-lift">
                <span className="text-base sm:text-lg md:text-xl font-semibold text-primary flex items-center gap-2">
                  <span className="w-2 sm:w-3 h-2 sm:h-3 bg-accent rounded-full animate-pulse"></span>
                  Tecnología FDA Aprobada
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4 md:pt-6 w-full sm:w-auto max-w-lg sm:max-w-none stagger-animation">
              <Button 
                size="lg" 
                className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-7 h-auto group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover-lift animate-pulse-slow"
                asChild
              >
                                  <a 
                    href="https://wa.me/595996960270?text=Hola,%20me%20interesa%20agendar%20una%20consulta%20inicial%20para%20evaluación%20de%20salud%20mental." 
                    target="_blank" 
                    rel="noopener noreferrer"
                  className="flex items-center justify-center font-semibold"
                >
                  <MessageCircle className="mr-2 sm:mr-3 md:mr-4 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  WhatsApp disponible 24/7
                  <ArrowRight className="ml-2 sm:ml-3 md:ml-4 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-5 md:py-6 lg:py-7 h-auto group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 font-semibold w-full sm:w-auto"
                asChild
              >
                <Link to="/autoevaluacion" className="flex items-center justify-center">
                  <Brain className="mr-2 sm:mr-3 md:mr-4 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  ¿Es Candidato?
                  <ArrowRight className="ml-2 sm:ml-3 md:ml-4 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 transition-transform group-hover:translate-x-1" />
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