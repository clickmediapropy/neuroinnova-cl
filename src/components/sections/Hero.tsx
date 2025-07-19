import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
const Hero = () => {
  const headerHeight = useHeaderHeight();

  return (
    <section 
      id="hero-neuromodulation"
      className="relative overflow-hidden min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
      style={{ 
        paddingTop: `${headerHeight}px`
      }}
    >
      {/* Multi-Layer Background Animation System - MUCH MORE VISIBLE */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Layer 1: Neural Network Base - Much higher opacity */}
        <div className="absolute inset-0 opacity-80">
          <div className="neural-network-bg h-full w-full"></div>
        </div>
        
        {/* Layer 2: Electromagnetic Field Visualization - Higher opacity */}
        <div className="absolute inset-0 opacity-60">
          <div className="electromagnetic-field h-full w-full"></div>
        </div>
        
        {/* Layer 3: Electrical Stimulation Patterns - Higher opacity */}
        <div className="absolute inset-0 opacity-50">
          <div className="electrical-stimulation h-full w-full"></div>
        </div>
        
        {/* Layer 4: Particle Flow System - Higher opacity */}
        <div className="absolute inset-0 opacity-40">
          <div className="particle-flow h-full w-full"></div>
        </div>
      </div>

      <div className="container relative z-20">
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-6 sm:py-12 md:py-16">
          {/* CENTERED TEXT ZONE - Full Width */}
          <div className="flex flex-col justify-center items-center space-y-6 sm:space-y-8 text-center max-w-5xl px-4">
            {/* Headline */}
            <div className="space-y-4 md:space-y-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.05]">
                <span className="text-primary font-extrabold">Primer y Único</span><br />
                <span className="text-foreground">Centro de</span><br />
                <span className="text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Neuromodulación</span><br />
                <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">de Paraguay</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-muted-foreground leading-relaxed max-w-4xl">
                Tecnologías avanzadas <span className="font-semibold text-primary">EMT/TMS</span> y <span className="font-semibold text-primary">tDCS</span> para tratar condiciones resistentes a terapias convencionales
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex px-4">
              <div className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-base sm:text-lg md:text-xl font-semibold text-primary flex items-center gap-2">
                  <span className="w-2 sm:w-3 h-2 sm:h-3 bg-accent rounded-full animate-pulse"></span>
                  Tecnología FDA Aprobada
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-10 w-full sm:w-auto max-w-lg sm:max-w-none">
              <Button 
                size="lg" 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl px-8 sm:px-10 md:px-12 lg:px-14 py-5 sm:py-7 md:py-9 h-auto group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                                  <a 
                    href="https://wa.me/+595991800886?text=Hola,%20me%20interesa%20agendar%20una%20consulta%20inicial%20para%20evaluación%20de%20salud%20mental." 
                    target="_blank" 
                    rel="noopener noreferrer"
                  className="flex items-center justify-center font-semibold"
                >
                  <MessageCircle className="mr-3 sm:mr-4 md:mr-5 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  Agende su Consulta
                  <ArrowRight className="ml-3 sm:ml-4 md:ml-5 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl px-8 sm:px-10 md:px-12 lg:px-14 py-5 sm:py-7 md:py-9 h-auto group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 font-semibold w-full sm:w-auto"
                asChild
              >
                <Link to="/autoevaluacion" className="flex items-center justify-center">
                  <Brain className="mr-3 sm:mr-4 md:mr-5 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  ¿Es Candidato?
                  <ArrowRight className="ml-3 sm:ml-4 md:ml-5 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;