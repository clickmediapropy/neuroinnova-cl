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
    <section className="py-12 sm:py-16 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">Proceso de Atención</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Nuestro enfoque personalizado garantiza atención de calidad y resultados óptimos para cada paciente
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {journeySteps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center px-4 sm:px-0">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary-light mb-3 sm:mb-4">
                <step.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
              </div>
              
              <div className="absolute top-6 sm:top-7 md:top-8 left-[calc(50%+32px)] right-0 hidden h-px bg-border/60 lg:block" />
              {step.id < journeySteps.length && (
                <div className="absolute top-6 sm:top-7 md:top-8 left-[calc(50%+4rem)] hidden lg:block">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
              
              <h3 className="mb-2 text-base sm:text-lg font-semibold">{step.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;