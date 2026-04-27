import { 
  ClipboardCheck, 
  Stethoscope, 
  Activity, 
  UserCheck 
} from "lucide-react";

const journeySteps = [
  {
    id: 1,
    title: "Evaluación Inicial",
    description: "Diagnóstico detallado y evaluación personalizada de su condición por parte de nuestro equipo médico.",
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "Planificación del Tratamiento",
    description: "Diseño del plan terapéutico específico para su condición, utilizando las tecnologías más apropiadas.",
    icon: Stethoscope,
  },
  {
    id: 3,
    title: "Tratamiento",
    description: "Aplicación de la terapia seleccionada (EMT/TMS, tDCS o Tradicional) con tecnología de punta.",
    icon: Activity,
  },
  {
    id: 4,
    title: "Seguimiento",
    description: "Monitoreo continuo y ajustes al tratamiento para garantizar los mejores resultados posibles.",
    icon: UserCheck,
  },
];

const PatientJourney = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex mb-5 sm:mb-6">
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Cómo Trabajamos
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-5 text-balance">
            Proceso de Atención
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Nuestro enfoque personalizado garantiza atención de calidad y resultados óptimos para cada paciente
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6">
          {journeySteps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 items-center justify-center rounded-full bg-primary-light mb-4 sm:mb-5 ring-4 ring-primary/5">
                <step.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-sm tabular-nums">
                  {step.id}
                </span>
              </div>

              <div className="absolute top-7 sm:top-8 left-[calc(50%+36px)] right-0 hidden h-px bg-border/60 lg:block" />
              {step.id < journeySteps.length && (
                <div className="absolute top-7 sm:top-8 left-[calc(50%+4.25rem)] hidden lg:block">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}

              <h3 className="mb-2 sm:mb-2.5 text-base sm:text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[26ch]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;