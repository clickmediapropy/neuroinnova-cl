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
    <section className="py-16 bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Proceso de Atención</h2>
          <p className="text-lg text-muted-foreground">
            Nuestro enfoque personalizado garantiza atención de calidad y resultados óptimos para cada paciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journeySteps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              
              <div className="absolute top-8 left-[calc(50%+32px)] right-0 hidden h-px bg-border/60 lg:block" />
              {step.id < journeySteps.length && (
                <div className="absolute top-8 left-[calc(50%+4rem)] hidden lg:block">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
              
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;