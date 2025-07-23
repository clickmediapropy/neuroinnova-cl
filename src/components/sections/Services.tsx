import ServiceCard from "../ui/ServiceCard";
import { Brain, Monitor, Stethoscope, Zap } from "lucide-react";

const Services = () => {
  return (
    <section className="py-12 sm:py-16 neural-bg relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4 text-shimmer">Nuestros Servicios</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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

          {/* Other Services - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto stagger-animation">
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

            {/* Traditional Psychiatry Service */}
            <ServiceCard
              title="Consulta Psiquiátrica"
              description="Atención psiquiátrica integral con enfoque en el diagnóstico preciso y manejo personalizado de condiciones de salud mental."
              icon={<Stethoscope className="h-6 w-6 text-primary" />}
              benefits={[
                "Evaluación psiquiátrica completa",
                "Manejo de medicamentos",
                "Integración con psicoterapia",
                "Planificación de tratamiento continuo",
                "Apoyo familiar cuando sea necesario"
              ]}
              url="/servicios/psiquiatria-tradicional"
              buttonText="Información"
            />

            {/* RehaCom Service */}
            <ServiceCard
              title="Rehacom - Evaluación y rehabilitación cognitiva"
              description="Software alemán especializado para rehabilitación de funciones cognitivas afectadas por lesiones cerebrales o trastornos neurológicos."
              icon={<Monitor className="h-6 w-6 text-primary" />}
              badge="REHABILITACIÓN COGNITIVA AVANZADA"
              benefits={[
                "27+ módulos especializados en español",
                "Entrenamiento adaptativo personalizado",
                "Ideal para post-ACV y lesiones cerebrales",
                "Seguimiento remoto del progreso",
                "Complementa terapias de neuromodulación"
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