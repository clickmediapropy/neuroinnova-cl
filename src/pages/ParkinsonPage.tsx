import { CheckCircle, Zap, AlertTriangle, Brain, ArrowRight, Shield, Activity, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const ParkinsonPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Enfermedad de Párkinson
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Tratamiento integral con neuromodulación avanzada
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              La neuromodulación ofrece nuevas esperanzas para mejorar tanto los síntomas motores 
              como no motores del Párkinson, mejorando significativamente la calidad de vida.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Conocer Opciones de Tratamiento</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding Parkinson's Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Brain className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Comprendiendo el Párkinson</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                La enfermedad de Párkinson es un trastorno neurodegenerativo progresivo que afecta 
                principalmente el sistema motor, aunque también presenta <strong className="text-primary">
                síntomas no motores significativos</strong>. La pérdida de neuronas dopaminérgicas 
                en el cerebro causa una amplia gama de síntomas que van más allá del temblor característico.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Síntomas Motores</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Temblor en reposo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Rigidez muscular</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Bradicinesia (lentitud de movimientos)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Inestabilidad postural</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dificultad para caminar</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Síntomas No Motores</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Depresión y ansiedad</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Trastornos del sueño</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Deterioro cognitivo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Pérdida del olfato</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Estreñimiento</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                Impacto en la Calidad de Vida
              </h3>
              <p className="text-foreground">
                El Párkinson afecta profundamente la independencia y calidad de vida. Los pacientes 
                pueden experimentar dificultades en actividades diarias, aislamiento social, y cambios 
                en su identidad personal. Un tratamiento integral debe abordar tanto los aspectos 
                físicos como emocionales de la enfermedad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <AlertTriangle className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Desafíos del Tratamiento Tradicional</h2>
            </div>
            
            <div className="grid gap-6">
              <Card className="border-destructive/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Limitaciones de la Medicación</h3>
                  <p className="text-muted-foreground mb-4">
                    Aunque la levodopa y otros medicamentos dopaminérgicos son efectivos inicialmente, 
                    su eficacia disminuye con el tiempo y pueden causar efectos secundarios significativos.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Fluctuaciones motoras ("on-off")</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Discinesias (movimientos involuntarios)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Pérdida de eficacia con el tiempo</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-warning/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Progresión de la Enfermedad</h3>
                  <p className="text-muted-foreground">
                    A pesar del tratamiento, la enfermedad continúa progresando, requiriendo ajustes 
                    constantes en la medicación y aparición de síntomas resistentes al tratamiento 
                    convencional, especialmente los síntomas no motores.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Neuromodulation Solution Section */}
      <section id="solucion" className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Zap className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Neuromodulación para Párkinson</h2>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-lg font-medium text-primary mb-4">
                La neuromodulación ofrece un enfoque revolucionario para el tratamiento del Párkinson
              </p>
              <p className="text-foreground">
                Utilizando estimulación magnética transcraneal (EMT/TMS) y otras técnicas avanzadas, 
                podemos modular la actividad de las redes neuronales afectadas, mejorando tanto los 
                síntomas motores como no motores sin los efectos secundarios de la medicación.
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 rounded-full bg-primary-light mr-4">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">EMT/TMS para Síntomas Motores</h3>
                      <p className="text-muted-foreground mb-4">
                        La estimulación de áreas motoras específicas puede mejorar significativamente:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Reducción del temblor y rigidez</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora en la velocidad de movimiento</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mayor estabilidad al caminar</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Reducción de las fluctuaciones "on-off"</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <div className="p-2 rounded-full bg-accent-light mr-4">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Tratamiento de Síntomas No Motores</h3>
                      <p className="text-muted-foreground mb-4">
                        La neuromodulación también aborda eficazmente:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Depresión asociada al Párkinson</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora cognitiva y de memoria</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Reducción de la ansiedad</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora en la calidad del sueño</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 bg-accent/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Ventajas de la Neuromodulación</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sin efectos secundarios sistémicos</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Compatible con medicación actual</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Resultados duraderos</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Mejora integral de síntomas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Evidence Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Activity className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Evidencia Científica</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <Badge className="mb-4 bg-primary text-white">Nivel B de Evidencia</Badge>
              <h3 className="text-xl font-semibold mb-4">
                EMT/TMS para Enfermedad de Parkinson
              </h3>
              <p className="text-muted-foreground mb-6">
                Múltiples estudios clínicos han demostrado la eficacia de la neuromodulación en Párkinson:
              </p>
              
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Síntomas Motores</p>
                  <p className="text-sm text-muted-foreground">
                    Mejora significativa en escalas UPDRS-III (Unified Parkinson's Disease Rating Scale) 
                    con reducción promedio del 20-30% en síntomas motores.
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Síntomas Depresivos</p>
                  <p className="text-sm text-muted-foreground">
                    Reducción del 40-50% en escalas de depresión en pacientes con Párkinson 
                    tratados con EMT/TMS dirigida al córtex prefrontal.
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Duración de Efectos</p>
                  <p className="text-sm text-muted-foreground">
                    Los beneficios pueden persistir de 3 a 6 meses después del tratamiento, 
                    con posibilidad de sesiones de mantenimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Recupere el Control de su Vida</h2>
            <p className="text-xl text-muted-foreground mb-8">
              No permita que el Párkinson defina sus límites. La neuromodulación puede ayudarle 
              a mejorar significativamente su calidad de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contacto">
                  Agendar Consulta de Evaluación
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/servicios/emt-tms">
                  Conocer más sobre EMT/TMS
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 p-6 bg-card rounded-lg border">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-2">Primer Centro Integral de Neuromodulación del Paraguay</p>
              <p className="text-muted-foreground">
                No es necesario viajar al exterior. Contamos con la tecnología y experiencia 
                para tratar el Párkinson con los más altos estándares internacionales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ParkinsonPage;