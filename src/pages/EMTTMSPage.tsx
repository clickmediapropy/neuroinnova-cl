import { CheckCircle, Award, BrainCircuit, Users, Clock, ChartBar, Shield, HelpCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContactForm from "@/components/forms/ContactForm";
import brainMagneticField from "@/assets/brain-magnetic-field.jpg";
import tmsEquipmentSetup from "@/assets/tms-equipment-setup.jpg";
import brainActivityComparison from "@/assets/brain-activity-comparison.jpg";
import electromagneticStimulation from "@/assets/electromagnetic-stimulation.jpg";

const EMTTMSPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="emt-hero-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
              EXCLUSIVO EN PARAGUAY
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Terapia EMT/TMS
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Estimulación Magnética Transcraneal, un tratamiento no invasivo
              aprobado por FDA y CE para trastornos neuropsiquiátricos resistentes al tratamiento.
            </p>
            <Button size="lg" asChild>
              <a href="#candidato">Descubra si es candidato para EMT/TMS</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What is EMT/TMS Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <BrainCircuit className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">¿Qué es la Terapia EMT/TMS?</h2>
            </div>
            
            <p className="mb-6 text-foreground">
              La Estimulación Magnética Transcraneal (EMT/TMS) es una tecnología de neuromodulación no invasiva
              que utiliza pulsos magnéticos para estimular regiones específicas del cerebro asociadas con trastornos
              como la depresión, ansiedad y dolor crónico.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tecnología Avanzada</h3>
                  <p className="text-muted-foreground">
                    Aprobada por la FDA desde 2008 y con certificación CE, la EMT/TMS utiliza campos magnéticos
                    similares a los de una resonancia magnética para activar circuitos cerebrales específicos.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Procedimiento No Invasivo</h3>
                  <p className="text-muted-foreground">
                    No requiere anestesia, sedación ni cirugía. El paciente permanece despierto y cómodo
                    durante todo el procedimiento, pudiendo reanudar sus actividades normales inmediatamente después.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* EMT/TMS Infographic Section */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 mb-8 border border-primary/10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mb-6">
                  <img 
                    src={brainMagneticField} 
                    alt="Campo magnético para sanar - Visualización del cerebro con estimulación magnética"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Campo Magnético para Sanar
                </h3>
                <p className="text-lg text-muted-foreground">
                  Estimulación Magnética Transcraneal EMT/TMS
                </p>
              </div>

              {/* Treatment Setup Visualization */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Treatment Process */}
                <div className="space-y-6">
                  <div className="bg-white/50 rounded-lg p-6 border border-primary/20">
                    <h4 className="text-xl font-semibold text-primary mb-4">
                      Configuración del Tratamiento
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-accent rounded-full mr-3"></div>
                        <span className="text-sm font-medium">Duración: aproximadamente 40 minutos por sesión</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
                        <span className="text-sm font-medium">Sin dolor, sin anestesia, terapia ambulatoria</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                        <span className="text-sm font-medium">Entretenimiento: TV o música durante la sesión</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                      <h5 className="font-semibold text-primary mb-2">Componentes del Equipo:</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>• Bobina de estimulación</div>
                        <div>• Soporte ajustable</div>
                        <div>• Estimulador principal</div>
                        <div>• Interruptor de pie</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <img 
                        src={tmsEquipmentSetup} 
                        alt="Configuración del equipo EMT/TMS"
                        className="w-full rounded-lg shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <h5 className="font-semibold text-warning mb-2">Medidas Previas al Tratamiento:</h5>
                    <p className="text-sm text-muted-foreground">
                      Evaluación médica completa y determinación de la zona cerebral específica a estimular.
                    </p>
                  </div>
                </div>

                {/* Right Column - How It Works */}
                <div className="space-y-6">
                  <div className="bg-white/50 rounded-lg p-6 border border-primary/20">
                    <div className="mb-4">
                      <img 
                        src={electromagneticStimulation} 
                        alt="Estimulación electromagnética del cerebro"
                        className="w-full max-w-xs mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-primary mb-4">
                      ¿Cómo Opera?
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1">
                          1
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Comunicación Celular</h5>
                          <p className="text-sm text-muted-foreground">
                            Las células cerebrales se comunican a través de la liberación de neurotransmisores
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1">
                          2
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Campo Magnético</h5>
                          <p className="text-sm text-muted-foreground">
                            Una bobina especial genera un campo magnético en la región cerebral deseada
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-success text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-1">
                          3
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Estimulación Neural</h5>
                          <p className="text-sm text-muted-foreground">
                            Las células nerviosas son estimuladas, regresando la actividad cerebral a niveles normales
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h5 className="font-semibold text-destructive mb-2">Contraindicaciones:</h5>
                    <p className="text-sm text-muted-foreground">
                      Pacientes con implantes metálicos en la cabeza, marcapasos, o historial de epilepsia requieren evaluación especial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Brain Activity Visualization */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                <h4 className="text-xl font-semibold text-primary mb-4 text-center">
                  Visualización de la Actividad Cerebral
                </h4>
                
                <div className="mb-6">
                  <img 
                    src={brainActivityComparison} 
                    alt="Comparación de actividad cerebral antes, durante y después del tratamiento EMT/TMS"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-destructive/20 to-destructive/40 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <BrainCircuit className="h-10 w-10 text-destructive" />
                    </div>
                    <h5 className="font-semibold mb-2">Antes del Tratamiento</h5>
                    <p className="text-sm text-muted-foreground">
                      Actividad neural alterada en regiones específicas
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-warning/20 to-warning/40 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <div className="w-8 h-8 bg-warning rounded-full animate-pulse"></div>
                    </div>
                    <h5 className="font-semibold mb-2">Durante EMT/TMS</h5>
                    <p className="text-sm text-muted-foreground">
                      Estimulación magnética dirigida y precisa
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-success/20 to-success/40 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-success" />
                    </div>
                    <h5 className="font-semibold mb-2">Después del Tratamiento</h5>
                    <p className="text-sm text-muted-foreground">
                      Actividad cerebral normalizada y equilibrada
                    </p>
                  </div>
                </div>
              </div>

              {/* Who Cannot Receive This Therapy */}
              <div className="mt-6 bg-muted/50 rounded-lg p-6 border border-muted">
                <h5 className="font-semibold text-center mb-4">¿Quién NO puede recibir esta terapia?</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                    <span>Pacientes con marcapasos cardíaco</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                    <span>Implantes metálicos en la cabeza</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                    <span>Historial de convulsiones no controladas</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-destructive rounded-full mr-3"></div>
                    <span>Embarazo (por precaución)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-foreground">
              La terapia EMT/TMS actúa restableciendo el equilibrio de la actividad cerebral en regiones
              afectadas por trastornos neuropsiquiátricos. A diferencia de los medicamentos, que afectan a
              todo el cuerpo, la EMT/TMS se dirige específicamente a las áreas cerebrales involucradas en la patología.
            </p>
          </div>
        </div>
      </section>

      {/* Ideal Candidates Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto" id="candidato">
            <div className="flex items-center mb-8">
              <Users className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">¿Para quién es ideal?</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              La terapia EMT/TMS es especialmente beneficiosa para pacientes que no han respondido adecuadamente a
              tratamientos convencionales o que no toleran los efectos secundarios de los medicamentos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Depresión Resistente al Tratamiento</h3>
                  <p className="text-sm text-muted-foreground">Pacientes que no han mejorado después de probar 2 o más antidepresivos.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Trastorno Obsesivo-Compulsivo (TOC)</h3>
                  <p className="text-sm text-muted-foreground">Con síntomas persistentes a pesar de la terapia convencional.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Migrañas Crónicas</h3>
                  <p className="text-sm text-muted-foreground">Personas con migrañas frecuentes resistentes a tratamientos habituales.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Tinnitus</h3>
                  <p className="text-sm text-muted-foreground">Pacientes con acúfenos persistentes que afectan su calidad de vida.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Intolerancia a Medicamentos</h3>
                  <p className="text-sm text-muted-foreground">Personas que experimentan efectos secundarios significativos con medicamentos psiquiátricos.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Trastorno Depresivo Mayor</h3>
                  <p className="text-sm text-muted-foreground">Como complemento a tratamientos actuales para mejorar resultados.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6 flex items-start">
              <Award className="h-10 w-10 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Ventaja Clave</h3>
                <p className="text-muted-foreground">
                  NeuroInnova ofrece el <strong>ÚNICO</strong> servicio de EMT/TMS en Paraguay, 
                  evitando la necesidad de viajar a Buenos Aires o São Paulo para recibir este 
                  tratamiento avanzado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Clock className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Proceso de Tratamiento</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              El tratamiento con EMT/TMS sigue un protocolo estructurado, personalizado según las necesidades 
              específicas de cada paciente y su condición clínica.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-3">Detalles de las Sesiones</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Duración</p>
                      <p className="text-muted-foreground">Cada sesión dura entre 20-40 minutos, durante los cuales el paciente permanece despierto y cómodo.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Curso de Tratamiento</p>
                      <p className="text-muted-foreground">Típicamente se requieren entre 20-30 sesiones para lograr resultados óptimos.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Frecuencia</p>
                      <p className="text-muted-foreground">Sesiones diarias durante varias semanas, generalmente de lunes a viernes.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <p className="font-medium">Entorno</p>
                      <p className="text-muted-foreground">Tratamiento ambulatorio en un entorno clínico confortable, sin necesidad de hospitalización.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">5</div>
                    <div>
                      <p className="font-medium">Actividades Posteriores</p>
                      <p className="text-muted-foreground">Los pacientes pueden volver a sus actividades normales inmediatamente después de cada sesión.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-foreground">
              Antes de iniciar el tratamiento, realizamos una evaluación completa para determinar 
              el protocolo más adecuado y la ubicación óptima para la estimulación en cada caso.
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <ChartBar className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Resultados Comprobados</h2>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden mb-8 border">
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <h3 className="text-2xl md:text-4xl font-bold">47.8%</h3>
                <p className="text-primary-foreground/90">Tasa de mejora en depresión resistente al tratamiento</p>
              </div>
              
              <div className="p-6">
                <p className="mb-6">
                  Estudios clínicos exhaustivos han demostrado la eficacia de la EMT/TMS, especialmente
                  en casos donde los tratamientos convencionales no han logrado los resultados esperados.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Eficacia Superior</h4>
                    <p className="text-sm text-muted-foreground">
                      Mayor tasa de éxito que los medicamentos solos en casos resistentes al tratamiento.
                    </p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Resultados Duraderos</h4>
                    <p className="text-sm text-muted-foreground">
                      Beneficios que persisten a largo plazo, con sesiones de mantenimiento ocasionales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-foreground">
              Los pacientes típicamente comienzan a notar mejoras después de 2-3 semanas de tratamiento,
              con beneficios que continúan acumulándose a lo largo del curso completo de la terapia.
            </p>
          </div>
        </div>
      </section>

      {/* No Side Effects Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Shield className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Sin Efectos Secundarios Sistémicos</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Una de las ventajas más significativas de la EMT/TMS sobre los medicamentos tradicionales
              es su perfil de efectos secundarios mínimos, lo que la hace ideal para pacientes que no
              toleran bien los fármacos psiquiátricos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-success-light rounded-lg p-6">
                <h3 className="text-xl font-semibold text-success-light-foreground mb-4">Ventajas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-success-light-foreground">No causa aumento de peso</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-success-light-foreground">No afecta la función sexual</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-success-light-foreground">No causa sedación o somnolencia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-success-light-foreground">No genera dependencia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-success-light-foreground">No causa problemas gastrointestinales</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Posibles Efectos Temporales</h3>
                <p className="mb-4 text-muted-foreground">
                  Algunos pacientes pueden experimentar efectos leves y temporales durante o después del tratamiento:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Leve dolor de cabeza que disminuye después de las primeras sesiones</li>
                  <li>• Sensación temporal de incomodidad en el sitio de estimulación</li>
                  <li>• Leve fatiga que generalmente se resuelve rápidamente</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6">
              <p className="text-primary-light-foreground font-medium">
                Importante: A diferencia de los medicamentos, la EMT/TMS no introduce sustancias químicas
                en el cuerpo y no afecta a órganos como el hígado o los riñones. Su acción se limita 
                específicamente a las regiones cerebrales donde se aplica la estimulación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <HelpCircle className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Preguntas Frecuentes</h2>
            </div>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Duele el tratamiento con EMT/TMS?</AccordionTrigger>
                <AccordionContent>
                  No, el tratamiento con EMT/TMS no es doloroso. Algunos pacientes pueden sentir un leve golpeteo 
                  o sensación de hormigueo en el cuero cabelludo durante la aplicación, pero esto no se considera 
                  doloroso. La mayoría de los pacientes se acostumbran rápidamente a la sensación después de las 
                  primeras sesiones.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cuánto tiempo tarda en funcionar la EMT/TMS?</AccordionTrigger>
                <AccordionContent>
                  La mayoría de los pacientes comienzan a notar mejoras después de 2-3 semanas de tratamiento diario. 
                  Sin embargo, los resultados pueden variar según el individuo. El curso completo de tratamiento 
                  (generalmente 20-30 sesiones) es importante para lograr beneficios óptimos y duraderos.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Necesito suspender mis medicamentos actuales?</AccordionTrigger>
                <AccordionContent>
                  No, la EMT/TMS puede utilizarse junto con medicamentos psiquiátricos. De hecho, en muchos casos, 
                  la combinación puede ser más efectiva que cualquiera de los tratamientos por separado. Nunca debe 
                  interrumpir sus medicamentos sin consultar primero con su médico.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Está cubierto por seguros médicos?</AccordionTrigger>
                <AccordionContent>
                  La cobertura varía según el proveedor de seguros. Le recomendamos consultar directamente con su 
                  aseguradora. Nuestro equipo también puede ayudarlo a determinar la cobertura disponible y discutir 
                  opciones de pago durante su consulta inicial.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>¿Cuánto tiempo duran los resultados?</AccordionTrigger>
                <AccordionContent>
                  Los beneficios de la EMT/TMS suelen ser duraderos. Después de un curso inicial de tratamiento, 
                  muchos pacientes mantienen la mejoría durante meses o incluso años. Para algunos, pueden 
                  recomendarse sesiones de mantenimiento ocasionales para mantener los resultados a largo plazo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>¿La EMT/TMS causa convulsiones?</AccordionTrigger>
                <AccordionContent>
                  El riesgo de convulsiones con EMT/TMS es extremadamente bajo (menos de 1 en 30,000 sesiones). 
                  Realizamos una evaluación exhaustiva antes del tratamiento para identificar cualquier factor de 
                  riesgo. Es mucho más seguro que muchos medicamentos psiquiátricos comunes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center">
              <p className="mb-6 text-muted-foreground">
                ¿Tiene más preguntas sobre la terapia EMT/TMS? Nuestro equipo está disponible para responder
                todas sus consultas y ayudarle a determinar si este tratamiento es adecuado para usted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="tel:+59521605535">Llámenos: (+595) 21 605 535</a>
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595991800886?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20el%20tratamiento%20EMT/TMS.%20¿Podrían%20ayudarme%20con%20una%20consulta?" target="_blank" rel="noopener noreferrer">
                    WhatsApp disponible 24/7
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Descubra si es candidato para EMT/TMS
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Ofrecemos consultas de evaluación donde analizamos su historial médico y
              determinamos si la terapia EMT/TMS es la opción adecuada para su situación específica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="#contacto">Agendar Consulta de Evaluación</a>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                <a href="https://wa.me/595991800886?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20de%20evaluación%20para%20EMT/TMS.%20¿Podrían%20ayudarme%20con%20el%20proceso?" target="_blank" rel="noopener noreferrer">
                  WhatsApp disponible 24/7
                </a>
              </Button>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              NeuroInnova es el único centro en Paraguay que ofrece esta tecnología avanzada.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contacto" className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">
              Contáctenos
            </h2>
            <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8">
              <ContactForm defaultService="emt-tms" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EMTTMSPage;