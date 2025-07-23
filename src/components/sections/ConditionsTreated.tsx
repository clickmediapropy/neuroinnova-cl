import { Link } from "react-router-dom";
import { Brain, Heart, Frown, Activity, Smile, Pill, Zap, Users } from "lucide-react";

const conditions = [
  {
    id: "depresion-resistente",
    title: "Depresión Resistente al Tratamiento",
    description: "Para pacientes que no han respondido a dos o más antidepresivos. La neuromodulación ofrece una alternativa efectiva.",
    icon: Frown,
    url: "/condiciones/depresion-resistente"
  },
  {
    id: "ansiedad",
    title: "Trastornos de Ansiedad",
    description: "Tratamiento para ansiedad generalizada, trastorno de pánico y otras formas de ansiedad resistentes a tratamientos convencionales.",
    icon: Brain,
    url: "/condiciones/ansiedad"
  },
  {
    id: "toc",
    title: "Trastorno Obsesivo Compulsivo (TOC)",
    description: "Opciones avanzadas para TOC severo que no responde adecuadamente a medicamentos o terapia conductual.",
    icon: Activity,
    url: "/condiciones/toc"
  },
  {
    id: "dolor-cronico",
    title: "Dolor Crónico",
    description: "Alivio para síndromes de dolor persistente mediante neuromodulación que modifica las vías del dolor a nivel cerebral.",
    icon: Heart,
    url: "/condiciones/dolor-cronico"
  },
  {
    id: "rehabilitacion",
    title: "Rehabilitación Post-ACV",
    description: "Terapias de neuromodulación para mejorar la recuperación motora y cognitiva después de un accidente cerebrovascular.",
    icon: Smile,
    url: "/condiciones/rehabilitacion-post-acv"
  },
  {
    id: "parkinson",
    title: "Párkinson",
    description: "Tratamiento con neuromodulación para mejorar síntomas motores y no motores de la enfermedad de Parkinson.",
    icon: Users,
    url: "/condiciones/parkinson"
  },
  {
    id: "fibromialgia",
    title: "Fibromialgia",
    description: "Alivio del dolor generalizado y síntomas asociados mediante técnicas de neuromodulación no invasiva.",
    icon: Zap,
    url: "/condiciones/fibromialgia"
  },
  {
    id: "adicciones",
    title: "Adicciones",
    description: "Tratamiento complementario para adicciones mediante neuromodulación de circuitos cerebrales de recompensa.",
    icon: Pill,
    url: "/condiciones/adicciones"
  }
];

const ConditionsTreated = () => {
  return (
    <section className="py-12 sm:py-16 neural-bg bg-white relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">Condiciones Tratadas</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Nuestras tecnologías avanzadas ofrecen soluciones para condiciones neuropsiquiátricas complejas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {conditions.map((condition) => (
            <Link 
              key={condition.id}
              to={condition.url}
              className="flex flex-col p-4 sm:p-6 rounded-lg border border-border/60 bg-white hover:shadow-md transition-shadow card-hover-effect service-particles"
            >
              <div className="mb-3 sm:mb-4 flex items-center">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary-light">
                  <condition.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="ml-3 sm:ml-4 font-semibold text-base sm:text-lg text-foreground">
                  {condition.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {condition.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConditionsTreated;