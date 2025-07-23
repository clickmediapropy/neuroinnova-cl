import { Shield, Microscope, Award, Check } from "lucide-react";

const TrustAuthority = () => {
  return (
    <section className="py-12 sm:py-16 bg-primary-light neural-bg relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4 text-shimmer">¿Por qué NeuroInnova?</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Tecnología de vanguardia con enfoque médico centrado en el paciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 stagger-animation">
            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles tilt-3d">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-primary-light to-accent/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-2 sm:ml-3">Primer Centro especializado en Neuromodulación</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Somos el Primer Centro Integral de Neuromodulación del Paraguay que ofrece tratamientos de neuromodulación avanzada con EMT/TMS y tDCS, evitando a nuestros pacientes viajes costosos a Buenos Aires o São Paulo.
            </p>
            <ul className="space-y-1.5 sm:space-y-2">
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

          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-primary-light to-accent/20">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-2 sm:ml-3">Tecnología Certificada</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Utilizamos equipos y protocolos aprobados por organismos reguladores internacionales, garantizando la seguridad y eficacia de nuestros tratamientos.
            </p>
            <ul className="space-y-1.5 sm:space-y-2">
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

          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-primary-light to-accent/20">
                <Microscope className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-2 sm:ml-3">Resultados Clínicos Comprobados</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Nuestros tratamientos han demostrado eficacia significativa en condiciones resistentes a terapias convencionales, ofreciendo esperanza donde otras opciones han fallado.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">83%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Respuesta</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">62%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Remisión</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-md card-hover-effect service-particles">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-primary-light flex-shrink-0">
                <img 
                  src="/lovable-uploads/a51ffd80-b2ab-449d-b6cb-b011f76a3e1f.png" 
                  alt="Dr. Victor Adorno"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold ml-3 sm:ml-4">Dr. Victor Adorno</h3>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Psiquiatra especializado en técnicas avanzadas de neuromodulación, con formación internacional y dedicado a traer tecnologías innovadoras a Paraguay.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">+10</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">100+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Pacientes tratados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAuthority;