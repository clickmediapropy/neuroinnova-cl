import ServiceCard from "../ui/ServiceCard";
import { Brain, Monitor, Zap } from "lucide-react";

const Services = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 neural-bg relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex mb-5 sm:mb-6">
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Tratamientos Especializados
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-5 text-balance text-shimmer">
            Nuestros Servicios
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Tecnologías avanzadas de neuromodulación para tratar condiciones resistentes a terapias convencionales
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Featured EMT/TMS Service - Full Width */}
          <div className="mb-6 sm:mb-8">
            <ServiceCard
              title="Estimulación Magnética Transcraneal (EMT/TMS)"
              description="Tecnología no invasiva que utiliza campos magnéticos para estimular áreas específicas del cerebro, efectiva para depresión resistente a medicamentos."
              icon={<Zap className="h-6 w-6 text-primary" />}
              badge="EXCLUSIVO EN PARAGUAY"
              benefits={[
                "Tratamiento no invasivo y sin dolor",
                "Sin efectos secundarios sistémicos",
                "Aprobado por FDA y CE",
                "Efectivo para depresión resistente",
                "Sesiones ambulatorias de 20-40 minutos"
              ]}
              url="/servicios/emt-tms"
              buttonText="Más Información"
              size="large"
            />
          </div>

          {/* Other Services - 2 column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-7 max-w-5xl mx-auto stagger-animation">
            {/* tDCS Service */}
            <ServiceCard
              title="Estimulación Transcraneal por Corriente Directa (tDCS)"
              description="Técnica de neuromodulación que aplica corriente eléctrica de baja intensidad para modular la actividad neuronal y estimular la plasticidad cerebral."
              icon={<Brain className="h-6 w-6 text-primary" />}
              badge="PIONERO EN PARAGUAY"
              benefits={[
                "Tratamiento de la Depresión moderada a severa",
                "Tratamiento en la casa",
                "Rehabilitación neurológica",
                "Manejo del dolor crónico",
                "Estimulación cognitiva"
              ]}
              url="/servicios/tdcs"
              buttonText="Conozca Más"
            />

            {/* RehaCom Service */}
            <ServiceCard
              title="Rehacom - Evaluación y rehabilitación cognitiva"
              description="Software alemán especializado para rehabilitación de funciones cognitivas afectadas por lesiones cerebrales o trastornos neurológicos."
              icon={<Monitor className="h-6 w-6 text-primary" />}
              badge="REHABILITACIÓN COGNITIVA AVANZADA"
              benefits={[
                "Evaluación: TDAH, Demencias, ACV, Traumatismos de cráneo",
                "27+ módulos especializados en español",
                "Entrenamiento adaptativo personalizado",
                "Ideal para post-ACV y lesiones cerebrales",
                "Seguimiento remoto del progreso"
              ]}
              url="/servicios/rehacom"
              buttonText="Descubrir Más"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;