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
    <section className="py-16 sm:py-20 md:py-24 neural-bg bg-white relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex mb-5 sm:mb-6">
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Áreas de Especialidad
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-5 text-balance">
            Condiciones Tratadas
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Nuestras tecnologías avanzadas ofrecen soluciones para condiciones neuropsiquiátricas complejas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {conditions.map((condition) => (
            <Link
              key={condition.id}
              to={condition.url}
              className="group flex flex-col p-6 sm:p-7 rounded-xl border border-border/60 bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300 card-hover-effect service-particles"
            >
              <div className="mb-4 sm:mb-5 flex items-center">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary-light group-hover:bg-primary/15 transition-colors">
                  <condition.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="ml-3 sm:ml-4 font-semibold text-base sm:text-lg text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {condition.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
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