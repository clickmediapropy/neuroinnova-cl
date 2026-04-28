import { CheckCircle, RotateCcw, AlertTriangle, Brain, ArrowRight, Shield, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const TOCPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
              Trastorno Obsesivo-Compulsivo (TOC)
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Cuando los pensamientos y rituales controlan su día
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              El TOC puede ser profundamente limitante, pero existen tratamientos avanzados 
              que van más allá de los enfoques tradicionales para brindar alivio real.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Descubra las Opciones</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding OCD Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <RotateCcw className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Comprendiendo el TOC</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                El Trastorno Obsesivo-Compulsivo se caracteriza por la presencia de 
                <strong className="text-primary"> obsesiones</strong> (pensamientos, impulsos o imágenes 
                recurrentes e intrusivas) y <strong className="text-primary">compulsiones</strong> (comportamientos 
                repetitivos o actos mentales) que la persona siente que debe realizar en respuesta a las obsesiones.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-warning-light/30 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-4 text-warning-light-foreground">Obsesiones Comunes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-warning-light-foreground">Miedo a la contaminación o gérmenes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-warning-light-foreground">Dudas sobre seguridad (puertas, hornos)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-warning-light-foreground">Necesidad de orden y simetría</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-warning-light-foreground">Pensamientos agresivos o de daño</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-primary-light/30 rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Compulsiones Típicas</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></div>
                      <span>Lavado excesivo de manos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></div>
                      <span>Verificación repetitiva</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></div>
                      <span>Organización y alineación</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2 flex-shrink-0"></div>
                      <span>Conteo o repetición mental</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-destructive-light/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Impacto en la Vida Diaria</h3>
              <p className="text-muted-foreground mb-4">
                El TOC puede consumir horas del día, interferir con el trabajo, las relaciones y las actividades básicas. 
                La persona reconoce que los pensamientos son irracionales, pero siente que no puede resistir realizar las compulsiones.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                  <span>Pérdida significativa de tiempo (más de 1 hora diaria)</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                  <span>Interferencia con responsabilidades laborales o académicas</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tensión en relaciones familiares y sociales</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                  <span>Evitación de situaciones que desencadenan obsesiones</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Patrones de Síntomas del TOC</h2>
            
            <div className="space-y-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Ciclo Obsesivo-Compulsivo</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-destructive">1</span>
                      </div>
                      <h4 className="font-medium mb-2">Obsesión</h4>
                      <p className="text-sm text-muted-foreground">Pensamiento intrusivo genera ansiedad</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-warning">2</span>
                      </div>
                      <h4 className="font-medium mb-2">Ansiedad</h4>
                      <p className="text-sm text-muted-foreground">Malestar intenso y urgencia de actuar</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-primary">3</span>
                      </div>
                      <h4 className="font-medium mb-2">Compulsión</h4>
                      <p className="text-sm text-muted-foreground">Ritual para reducir la ansiedad</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-success">4</span>
                      </div>
                      <h4 className="font-medium mb-2">Alivio Temporal</h4>
                      <p className="text-sm text-muted-foreground">Reducción momentánea que refuerza el ciclo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Tipos de TOC</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">TOC de Contaminación</p>
                          <p className="text-sm text-muted-foreground">Miedo a gérmenes, suciedad o químicos</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">TOC de Verificación</p>
                          <p className="text-sm text-muted-foreground">Dudas sobre seguridad y verificación repetitiva</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">TOC de Simetría</p>
                          <p className="text-sm text-muted-foreground">Necesidad de orden, equilibrio y precisión</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">TOC de Pensamientos Intrusivos</p>
                          <p className="text-sm text-muted-foreground">Pensamientos no deseados sobre violencia o moralidad</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Compulsiones Ocultas</h3>
                    <p className="text-muted-foreground mb-4">
                      No todas las compulsiones son visibles. Algunas ocurren internamente:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Conteo mental</p>
                          <p className="text-sm text-muted-foreground">Números específicos o patrones</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Repetición de frases</p>
                          <p className="text-sm text-muted-foreground">Palabras o oraciones mentales</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Revisión mental</p>
                          <p className="text-sm text-muted-foreground">Repasar eventos para buscar certeza</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium">Neutralización</p>
                          <p className="text-sm text-muted-foreground">Pensamientos "buenos" para contrarrestar "malos"</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
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
              <h2 className="text-3xl font-bold text-primary">Desafíos en el Tratamiento Tradicional del TOC</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Aunque existen tratamientos establecidos para el TOC, muchos pacientes enfrentan 
              limitaciones significativas que afectan su recuperación completa.
            </p>
            
            <div className="space-y-6 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Terapia de Exposición y Prevención de Respuesta (EPR)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Desafíos:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Proceso emocionalmente muy exigente</li>
                        <li>• Alta tasa de abandono (30-40%)</li>
                        <li>• Requiere exposición a miedos intensos</li>
                        <li>• Acceso limitado a especialistas EPR</li>
                        <li>• Progreso puede ser lento y difícil</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Tratamiento de primera línea basado en evidencia</li>
                        <li>• Efectivo cuando se completa</li>
                        <li>• Herramientas duraderas para el manejo</li>
                        <li>• Sin efectos secundarios físicos</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Medicamentos ISRS para TOC</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Limitaciones:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Requiere dosis más altas que para depresión</li>
                        <li>• 40-60% de pacientes no responden completamente</li>
                        <li>• Efectos secundarios significativos</li>
                        <li>• Puede tomar 10-12 semanas para ver beneficios</li>
                        <li>• Recaída al discontinuar en muchos casos</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Puede reducir la intensidad de obsesiones</li>
                        <li>• Facilita la participación en EPR</li>
                        <li>• Útil para comorbilidades</li>
                        <li>• Opción para casos severos</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-warning-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-warning-light-foreground mb-4">TOC Resistente al Tratamiento</h3>
              <p className="text-warning-light-foreground mb-4">
                Se estima que entre el 20-30% de pacientes con TOC no responden adecuadamente a los 
                tratamientos de primera línea, incluso después de intentos múltiples y bien implementados.
              </p>
              <p className="text-warning-light-foreground">
                Para estos casos, las tecnologías de neuromodulación representan una opción prometedora 
                que puede ser efectiva cuando otros tratamientos han fallado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Solutions Section */}
      <section id="solucion" className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
                TRATAMIENTO AVANZADO
              </Badge>
              <h2 className="text-4xl font-bold text-primary mb-6">
                EMT/TMS: Esperanza para TOC Resistente
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Cuando los tratamientos tradicionales no son suficientes, la neuromodulación 
                ofrece una alternativa científicamente respaldada.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card border-2 border-primary/20 transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">EMT/TMS para TOC</h3>
                  </div>
                  
                  <div className="bg-success-light/20 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2">Evidencia Clínica</h4>
                    <p className="text-sm text-muted-foreground">
                      Aprobado por FDA para TOC resistente al tratamiento. Estudios muestran 
                      reducción significativa de síntomas en 60-70% de pacientes.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dirigido a circuitos cerebrales específicos del TOC</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reduce intensidad de obsesiones y compulsiones</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Facilita la participación en EPR</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sin efectos secundarios cognitivos</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" asChild>
                    <Link to="/servicios/emt-tms">Conocer EMT/TMS para TOC</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">¿Cómo Funciona para TOC?</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium">Mapeo Cerebral</p>
                        <p className="text-sm text-muted-foreground">
                          Identificación de áreas hiperactivas relacionadas con TOC
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium">Estimulación Dirigida</p>
                        <p className="text-sm text-muted-foreground">
                          Pulsos magnéticos modulan la actividad en circuitos específicos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium">Normalización Gradual</p>
                        <p className="text-sm text-muted-foreground">
                          Reducción progresiva de la hiperactividad en áreas problemáticas
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0">4</div>
                      <div>
                        <p className="font-medium">Mejora Clínica</p>
                        <p className="text-sm text-muted-foreground">
                          Reducción de obsesiones y menor urgencia compulsiva
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary-light rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Protocolo para TOC</h4>
                    <p className="text-sm text-primary-light-foreground">
                      Tratamiento típicamente requiere sesiones más frecuentes que para depresión, 
                      con enfoque en áreas específicas como la corteza orbitofrontal.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-primary-light rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Enfoque Integrado para TOC
              </h3>
              <p className="text-primary-light-foreground mb-6">
                EMT/TMS puede combinarse con EPR y medicación cuando sea apropiado, 
                creando un plan de tratamiento comprehensivo y personalizado.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-primary-light-foreground">EMT/TMS reduce intensidad</p>
                </div>
                <div className="text-center">
                  <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-primary-light-foreground">EPR más tolerable</p>
                </div>
                <div className="text-center">
                  <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-primary-light-foreground">Resultados sostenidos</p>
                </div>
              </div>
              <Button size="lg" asChild>
                <a
                  href={buildWhatsAppUrl("Hola, me gustaría una evaluación integral para TOC con tratamiento de neuromodulación.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Evaluación Integral
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Rompa el Ciclo del TOC Resistente
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Si los tratamientos tradicionales no han sido suficientes, EMT/TMS puede 
              ofrecer la esperanza de alivio que ha estado buscando.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <RotateCcw className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Evaluación Especializada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Análisis detallado de su patrón específico de TOC
                </p>
              </div>
              <div className="text-center">
                <Brain className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tecnología FDA Aprobada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  EMT/TMS específicamente aprobado para TOC resistente
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Único en Paraguay</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Acceso exclusivo a esta tecnología avanzada
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/servicios/emt-tms">Descubra EMT/TMS para TOC</Link>
              </Button>
              <p className="text-primary-foreground/80 text-sm">
                Consulta especializada en TOC | (+595) 21 605 535
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TOCPage;