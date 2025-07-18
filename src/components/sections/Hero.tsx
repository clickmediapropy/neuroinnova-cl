import { Link } from "react-router-dom";
import { ChevronRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/60 via-background to-background pt-32 pb-16 md:pt-32 md:pb-20">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col space-y-6">
            {/* Logo positioned above headline */}
            <div className="mb-4">
              <Logo className="h-20 md:h-28 lg:h-32 w-auto" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                Primer Centro de Neuromodulación de Paraguay
              </h1>
              <p className="text-xl text-muted-foreground">
                Esperanza para pacientes con condiciones resistentes al tratamiento convencional
              </p>
            </div>

            <div className="flex items-center">
              <BadgeCheck className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Tecnología FDA y CE Aprobada</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" asChild>
                <a href="https://wa.me/595981175253" target="_blank" rel="noopener noreferrer">
                  Agende su Consulta
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/autoevaluacion">
                  Autoevaluación Gratis
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:ml-auto">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg border border-primary/20 bg-card">
              {/* Placeholder for hero image - in production, replace with actual image */}
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" 
                alt="Equipamiento médico avanzado de neuromodulación" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;