import { Shield, Microscope, Award, Check } from "lucide-react";

const TrustAuthority = () => {
  return (
    <section className="py-16 bg-primary-light">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">¿Por qué NeuroInnova?</h2>
          <p className="text-lg text-muted-foreground">
            Tecnología de vanguardia con enfoque médico centrado en el paciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-border/60">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Único Centro Especializado</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Somos el primer y único centro en Paraguay que ofrece tratamientos de neuromodulación avanzada con EMT/TMS y tDCS, evitando a nuestros pacientes viajes costosos a Buenos Aires o São Paulo.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span>Tecnologías disponibles solo en NeuroInnova en todo el país</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span>Atención local con estándares internacionales</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border/60">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Tecnología Certificada</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Utilizamos equipos y protocolos aprobados por organismos reguladores internacionales, garantizando la seguridad y eficacia de nuestros tratamientos.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span>EMT/TMS aprobado por FDA desde 2008 y CE</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 shrink-0 mt-0.5" />
                <span>Protocolos validados clínicamente a nivel mundial</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border/60">
            <div className="flex items-center mb-4">
              <Microscope className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Resultados Clínicos Comprobados</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Nuestros tratamientos han demostrado eficacia significativa en condiciones resistentes a terapias convencionales, ofreciendo esperanza donde otras opciones han fallado.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">47.8%</p>
                <p className="text-sm text-muted-foreground">Mejora en depresión resistente</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">30%</p>
                <p className="text-sm text-muted-foreground">De casos de depresión son resistentes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border/60">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-light flex-shrink-0">
                <img 
                  src="/lovable-uploads/a51ffd80-b2ab-449d-b6cb-b011f76a3e1f.png" 
                  alt="Dr. Victor Adorno"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-semibold ml-4">Dr. Victor Adorno</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Psiquiatra especializado en técnicas avanzadas de neuromodulación, con formación internacional y dedicado a traer tecnologías innovadoras a Paraguay.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">+10</p>
                <p className="text-sm text-muted-foreground">Años de experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Pacientes tratados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAuthority;