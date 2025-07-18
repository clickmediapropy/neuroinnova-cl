import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
const Hero = () => {
  const headerHeight = useHeaderHeight();

  return (
    <section 
      id="hero-neuromodulation"
      className="relative overflow-hidden min-h-[700px] bg-gradient-to-br from-background via-background to-primary/5"
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
        <div className="flex min-h-[600px] items-center justify-center">
          {/* CENTERED TEXT ZONE - Full Width */}
          <div className="flex flex-col justify-center items-center space-y-8 text-center max-w-5xl">
            {/* Headline */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                <span className="text-primary font-extrabold">Primer y Único</span><br />
                <span className="text-foreground">Centro de</span><br />
                <span className="text-foreground">Neuromodulación</span><br />
                <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">de Paraguay</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-relaxed max-w-4xl">
                Tecnologías avanzadas <span className="font-semibold text-primary">EMT/TMS</span> y <span className="font-semibold text-primary">tDCS</span> para tratar condiciones resistentes a terapias convencionales
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex">
              <div className="px-8 py-4 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-lg font-semibold text-primary flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                  Tecnología FDA Aprobada
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8">
              <Button 
                size="lg" 
                className="text-2xl px-12 py-8 h-auto group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a 
                  href="https://wa.me/+595981175253" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center font-semibold"
                >
                  <MessageCircle className="mr-4 h-7 w-7" />
                  Agende su Consulta
                  <ArrowRight className="ml-4 h-7 w-7 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-2xl px-12 py-8 h-auto group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 font-semibold"
                asChild
              >
                <Link to="/autoevaluacion" className="flex items-center">
                  <Brain className="mr-4 h-7 w-7" />
                  ¿Es Candidato?
                  <ArrowRight className="ml-4 h-7 w-7 transition-transform group-hover:translate-x-1" />
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