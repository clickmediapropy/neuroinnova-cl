import { CheckCircle, Heart, AlertTriangle, Brain, ArrowRight, Shield, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const AnsiedadPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Trastornos de Ansiedad
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Cuando la preocupación controla su vida diaria
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              La ansiedad no tratada puede limitar significativamente su calidad de vida. 
              Descubra tratamientos avanzados que van más allá de los enfoques tradicionales.
            </p>
            <Button size="lg" asChild>
              <a href="#autoevaluacion">Evalúe su Ansiedad</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding Anxiety Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Heart className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Comprendiendo los Trastornos de Ansiedad</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                Los trastornos de ansiedad van más allá de la preocupación normal. Se caracterizan por 
                <strong className="text-primary"> miedo o ansiedad excesiva y persistente</strong> que 
                interfiere significativamente con las actividades diarias, el trabajo y las relaciones.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tipos Principales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Trastorno de Ansiedad Generalizada (TAG)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Trastorno de Pánico</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Fobias Específicas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ansiedad Social</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Impacto en la Vida</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                      <span>Limitación en actividades sociales</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dificultades laborales o académicas</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                      <span>Evitación de situaciones importantes</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tensión en relaciones familiares</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Síntomas Comunes</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Síntomas Emocionales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Preocupación excesiva sobre eventos futuros</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Sensación de peligro inminente</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Irritabilidad frecuente</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Dificultad para controlar preocupaciones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Miedo a perder el control</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Síntomas Físicos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Palpitaciones cardíacas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Sudoración excesiva</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Tensión muscular</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Fatiga constante</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Problemas digestivos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Síntomas Cognitivos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Dificultad para concentrarse</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Pensamientos catastróficos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Problemas de memoria</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Indecisión frecuente</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Pensamientos repetitivos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Síntomas Conductuales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Evitación de situaciones específicas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Inquietud motora</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Búsqueda constante de tranquilización</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Aislamiento social</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Conductas de seguridad excesivas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Treatment Limitations */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <AlertTriangle className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Limitaciones de los Tratamientos Tradicionales</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Aunque los tratamientos convencionales pueden ser efectivos para muchas personas, 
              también presentan limitaciones importantes que afectan la calidad de vida del paciente.
            </p>
            
            <div className="space-y-6 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Medicamentos Ansiolíticos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Limitaciones:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Riesgo de dependencia y tolerancia</li>
                        <li>• Efectos secundarios sedantes</li>
                        <li>• Deterioro cognitivo temporal</li>
                        <li>• Síndrome de abstinencia</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Alivio rápido de síntomas agudos</li>
                        <li>• Útiles en crisis de pánico</li>
                        <li>• Efectivos a corto plazo</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Antidepresivos (ISRS/IRSN)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Limitaciones:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 4-6 semanas para ver efectos</li>
                        <li>• Efectos secundarios sexuales</li>
                        <li>• Aumento de peso</li>
                        <li>• No todos los pacientes responden</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Efectivos para ansiedad y depresión</li>
                        <li>• No crean dependencia</li>
                        <li>• Uso a largo plazo seguro</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Psicoterapia Cognitivo-Conductual</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Limitaciones:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Requiere tiempo y compromiso significativo</li>
                        <li>• Acceso limitado a especialistas</li>
                        <li>• Resultados variables entre pacientes</li>
                        <li>• Puede ser emocionalmente desafiante</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Sin efectos secundarios físicos</li>
                        <li>• Herramientas duraderas</li>
                        <li>• Aborda patrones de pensamiento</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-warning-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-warning-light-foreground mb-4">El Problema Principal</h3>
              <p className="text-warning-light-foreground">
                Muchos pacientes experimentan una respuesta parcial o insuficiente a estos tratamientos, 
                o no pueden tolerarlos debido a efectos secundarios. Para estos casos, las opciones de 
                neuromodulación ofrecen una alternativa prometedora y efectiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Solutions Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
                SOLUCIONES AVANZADAS
              </Badge>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Opciones de Neuromodulación para Ansiedad
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                En NeuroInnova ofrecemos tecnologías avanzadas que complementan o pueden 
                ser alternativas a los tratamientos tradicionales.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card border-2 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">EMT/TMS para Ansiedad</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Modula circuitos cerebrales específicos relacionados con ansiedad</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>No requiere medicamentos adicionales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sin efectos secundarios sistémicos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Efectivo en casos resistentes al tratamiento</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" asChild>
                    <Link to="/servicios/emt-tms">Conocer EMT/TMS</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-2 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">tDCS Complementario</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Potencia efectos de psicoterapia</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mejora plasticidad cerebral</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Procedimiento no invasivo y cómodo</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Puede combinarse con otros tratamientos</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/servicios/tdcs">Conocer tDCS</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-primary-light rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Enfoque Integrado Personalizado
              </h3>
              <p className="text-primary-light-foreground mb-6">
                En NeuroInnova desarrollamos planes de tratamiento que pueden combinar 
                psiquiatría tradicional con tecnologías avanzadas según las necesidades 
                específicas de cada paciente.
              </p>
              <Button size="lg" asChild>
                <Link to="/servicios/psiquiatria-tradicional">Consulta Integral</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section id="autoevaluacion" className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Evalúe su Nivel de Ansiedad
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nuestra evaluación basada en el cuestionario GAD-7 puede ayudarle a entender 
              mejor su situación actual y determinar si necesita buscar ayuda profesional.
            </p>
            
            <div className="bg-card rounded-lg border p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <Heart className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Autoevaluación de Ansiedad</h3>
              <p className="text-muted-foreground mb-6">
                Cuestionario validado clínicamente que evalúa síntomas de ansiedad 
                durante las últimas dos semanas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/autoevaluacion/ansiedad">Comenzar Evaluación</Link>
                </Button>
                <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595992097055?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20la%20evaluación%20de%20ansiedad.%20¿Podrían%20ayudarme%20con%20el%20proceso?" target="_blank" rel="noopener noreferrer">
                    WhatsApp disponible 24/7
                  </a>
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Esta evaluación no reemplaza un diagnóstico profesional. Si está experimentando 
              síntomas significativos de ansiedad, recomendamos consultar con un especialista.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              No Permita que la Ansiedad Limite su Vida
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Existen tratamientos efectivos que pueden ayudarle a recuperar el control 
              y vivir una vida plena sin las limitaciones de la ansiedad.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Heart className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Evaluación Completa</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Análisis integral de sus síntomas y historia clínica
                </p>
              </div>
              <div className="text-center">
                <Brain className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tecnología Avanzada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Opciones de neuromodulación exclusivas en Paraguay
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tratamiento Integral</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Combinación personalizada de terapias según sus necesidades
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/agendar-consulta">Solicitar Consulta Especializada</Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <p className="text-primary-foreground/80 text-sm">
                  Evaluación profesional disponible | (+595) 21 605 535
                </p>
                <Button size="sm" className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595992097055?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20tratamientos%20para%20ansiedad.%20¿Podrían%20ayudarme%20con%20una%20consulta%20especializada?" target="_blank" rel="noopener noreferrer">
                    WhatsApp disponible 24/7
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AnsiedadPage;