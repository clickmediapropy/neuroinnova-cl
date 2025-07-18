import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useHeaderHeight } from "@/hooks/useHeaderHeight";
import neuromodulationIllustration from "@/assets/neuromodulation-comparison-professional.png";
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
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="neural-network-bg h-full w-full"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[600px] items-center">
          {/* LEFT COLUMN - Text Zone */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Logo */}
            <div className="mb-4">
              <Logo className="h-12 w-auto" />
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="text-primary font-extrabold">Primer y Único</span><br />
                <span className="text-foreground">Centro de</span><br />
                <span className="text-foreground">Neuromodulación</span><br />
                <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">de Paraguay</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Tecnologías avanzadas <span className="font-semibold text-primary">EMT/TMS</span> y <span className="font-semibold text-primary">tDCS</span> para tratar condiciones resistentes a terapias convencionales
              </p>
            </div>

            {/* Badge */}
            <div className="inline-flex">
              <div className="px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-sm font-semibold text-primary flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Tecnología FDA Aprobada
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Button 
                size="lg" 
                className="text-xl px-10 py-6 h-auto group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a 
                  href="https://wa.me/+595981175253" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center font-semibold"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Agende su Consulta
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-10 py-6 h-auto group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 font-semibold"
                asChild
              >
                <Link to="/autoevaluacion" className="flex items-center">
                  <Brain className="mr-3 h-6 w-6" />
                  ¿Es Candidato?
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN - Visual Zone */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Professional Medical Illustration */}
            <div className="relative">
              <img
                src={neuromodulationIllustration}
                alt="EMT/TMS vs tDCS Professional Medical Comparison"
                className="max-w-[600px] w-full h-auto object-contain drop-shadow-2xl"
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-lg blur-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;