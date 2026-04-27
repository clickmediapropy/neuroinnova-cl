import { Shield, Microscope, Award, Check } from "lucide-react";

const TrustAuthority = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-primary-light neural-bg relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex mb-5 sm:mb-6">
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-primary uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Confianza & Excelencia
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-5 text-balance text-shimmer">
            ¿Por qué NeuroInnova?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-balance animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Tecnología de vanguardia con enfoque médico centrado en el paciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-7 stagger-animation">
            <div className="bg-card rounded-xl p-6 sm:p-7 md:p-8 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles tilt-3d">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-primary-light to-accent/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-3 sm:ml-4 tracking-tight">Primer Centro especializado en Neuromodulación</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
              Somos el Primer Centro Integral de Neuromodulación del Paraguay que ofrece tratamientos de neuromodulación avanzada con EMT/TMS y tDCS, evitando a nuestros pacientes viajes costosos a Buenos Aires o São Paulo.
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              <li className="flex items-start">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Tecnologías disponibles solo en NeuroInnova en todo el país</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Atención local con estándares internacionales</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 sm:p-7 md:p-8 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-primary-light to-accent/20">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-3 sm:ml-4 tracking-tight">Tecnología Certificada</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
              Utilizamos equipos y protocolos aprobados por organismos reguladores internacionales, garantizando la seguridad y eficacia de nuestros tratamientos.
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              <li className="flex items-start">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">EMT/TMS aprobado por FDA desde 2008 y CE</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Protocolos validados clínicamente a nivel mundial</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 sm:p-7 md:p-8 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-primary-light to-accent/20">
                <Microscope className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-3 sm:ml-4 tracking-tight">Resultados Clínicos Comprobados</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
              Nuestros tratamientos han demostrado eficacia significativa en condiciones resistentes a terapias convencionales, ofreciendo esperanza donde otras opciones han fallado.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border/40">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary tabular-nums">83%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Respuesta</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary tabular-nums">62%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Remisión</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 sm:p-7 md:p-8 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles">
            <div className="flex items-center mb-4 sm:mb-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-primary-light flex-shrink-0 ring-2 ring-primary/10">
                <img
                  src="/lovable-uploads/a51ffd80-b2ab-449d-b6cb-b011f76a3e1f.png"
                  alt="Dr. Victor Adorno"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-3 sm:ml-4 tracking-tight">Dr. Victor Adorno</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
              Psiquiatra especializado en técnicas avanzadas de neuromodulación, con formación internacional y dedicado a traer tecnologías innovadoras a Paraguay.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-border/40">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary tabular-nums">+10</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary tabular-nums">100+</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Pacientes tratados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAuthority;