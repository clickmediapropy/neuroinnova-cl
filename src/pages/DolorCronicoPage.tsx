import { CheckCircle, Zap, AlertTriangle, Brain, ArrowRight, Shield, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const DolorCronicoPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-light py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Dolor Crónico
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Cuando el dolor persiste más allá de la curación
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              El dolor crónico afecta todos los aspectos de la vida. Descubra cómo las tecnologías 
              de neuromodulación pueden ofrecer alivio cuando otros tratamientos han fallado.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Explorar Opciones de Tratamiento</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding Chronic Pain Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Zap className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Comprendiendo el Dolor Crónico</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                El dolor crónico se define como dolor que persiste por <strong className="text-primary">
                más de 3-6 meses</strong>, extendiéndose más allá del tiempo normal de curación de una lesión. 
                A diferencia del dolor agudo, el dolor crónico puede no tener una función protectora y 
                se convierte en una condición médica por sí mismo.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Características del Dolor Crónico</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Duración superior a 3-6 meses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Puede persistir sin causa aparente</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Impacta función física y emocional</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Resistente a tratamientos convencionales</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tipos Comunes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Fibromialgia</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Dolor neuropático</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Migrañas crónicas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Dolor lumbar crónico</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Artritis reumatoide</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-destructive-light/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">El Círculo Vicioso del Dolor Crónico</h3>
              <p className="text-muted-foreground mb-4">
                El dolor crónico no solo afecta el cuerpo, sino que crea un ciclo que involucra aspectos 
                físicos, emocionales y sociales, perpetuando el sufrimiento:
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-destructive">1</span>
                  </div>
                  <p className="text-sm font-medium">Dolor Físico</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-warning">2</span>
                  </div>
                  <p className="text-sm font-medium">Limitación Funcional</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-primary">3</span>
                  </div>
                  <p className="text-sm font-medium">Impacto Emocional</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-muted-foreground">4</span>
                  </div>
                  <p className="text-sm font-medium">Aislamiento Social</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms and Impact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Impacto del Dolor Crónico</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Síntomas Físicos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Dolor persistente</p>
                        <p className="text-sm text-muted-foreground">Intensidad variable, presente la mayoría de días</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Fatiga crónica</p>
                        <p className="text-sm text-muted-foreground">Agotamiento que no mejora con descanso</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Trastornos del sueño</p>
                        <p className="text-sm text-muted-foreground">Dificultad para dormir o sueño no reparador</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Rigidez muscular</p>
                        <p className="text-sm text-muted-foreground">Tensión y contracturas frecuentes</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Síntomas Emocionales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Depresión</p>
                        <p className="text-sm text-muted-foreground">Tristeza persistente y pérdida de interés</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Ansiedad</p>
                        <p className="text-sm text-muted-foreground">Preocupación por el dolor futuro</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Irritabilidad</p>
                        <p className="text-sm text-muted-foreground">Frustración y cambios de humor</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-warning mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Pérdida de esperanza</p>
                        <p className="text-sm text-muted-foreground">Sensación de que el dolor nunca mejorará</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Limitaciones Funcionales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reducción en actividades laborales</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Limitación en ejercicio y actividad física</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dificultades en relaciones familiares</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reducción en actividades sociales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Consecuencias Cognitivas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Dificultades de concentración</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Problemas de memoria</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Dificultad para tomar decisiones</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span>Atención limitada</span>
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
              <h2 className="text-3xl font-bold text-primary">Limitaciones de los Tratamientos Convencionales</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Aunque existen múltiples tratamientos para el dolor crónico, muchos pacientes enfrentan 
              limitaciones significativas que afectan su calidad de vida y capacidad de recuperación.
            </p>
            
            <div className="space-y-6 mb-8">
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Analgésicos Opioides</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Riesgos y Limitaciones:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Alto riesgo de dependencia y tolerancia</li>
                        <li>• Efectos secundarios significativos</li>
                        <li>• Deterioro cognitivo y sedación</li>
                        <li>• Crisis de opioides a nivel mundial</li>
                        <li>• Efectividad reducida con el tiempo</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios Limitados:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Alivio temporal del dolor severo</li>
                        <li>• Útiles para dolor agudo post-operatorio</li>
                        <li>• Efectivos a corto plazo</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Antiinflamatorios y Medicamentos Neuropáticos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Limitaciones:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Efectos gastrointestinales (AINES)</li>
                        <li>• Riesgo cardiovascular a largo plazo</li>
                        <li>• Efectos secundarios neurológicos</li>
                        <li>• Respuesta variable entre pacientes</li>
                        <li>• No abordan causa subyacente</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Reducción de inflamación</li>
                        <li>• Útiles para dolor neuropático</li>
                        <li>• No crean dependencia física</li>
                        <li>• Disponibles sin receta (algunos)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Fisioterapia y Rehabilitación</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive mb-2">Desafíos:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Progreso lento en casos crónicos</li>
                        <li>• Puede exacerbar dolor inicialmente</li>
                        <li>• Requiere participación activa constante</li>
                        <li>• Acceso limitado a especialistas</li>
                        <li>• Resultados variables</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-success mb-2">Beneficios:</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Mejora función y movilidad</li>
                        <li>• Fortalece músculos de soporte</li>
                        <li>• Enfoque no farmacológico</li>
                        <li>• Herramientas de autogestión</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-warning-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-warning-light-foreground mb-4">La Necesidad de Nuevas Opciones</h3>
              <p className="text-warning-light-foreground">
                Muchos pacientes con dolor crónico no logran un alivio adecuado con tratamientos convencionales, 
                o no pueden tolerarlos debido a efectos secundarios. Las tecnologías de neuromodulación ofrecen 
                una alternativa prometedora que aborda el dolor desde el sistema nervioso central.
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
                NEUROMODULACIÓN AVANZADA
              </Badge>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Tecnologías de Neuromodulación para Dolor Crónico
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cuando los tratamientos convencionales no son suficientes, las tecnologías de 
                neuromodulación pueden ofrecer alivio duradero sin los riesgos de los opioides.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card border-2 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">tDCS para Dolor Crónico</h3>
                  </div>
                  
                  <div className="bg-success-light/20 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2">Mecanismo de Acción</h4>
                    <p className="text-sm text-muted-foreground">
                      Modula las vías de procesamiento del dolor en el cerebro, reduciendo 
                      la percepción del dolor y mejorando la tolerancia.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Efectivo para fibromialgia y dolor neuropático</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sin riesgo de dependencia</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Puede reducir necesidad de medicamentos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Procedimiento ambulatorio</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" asChild>
                    <Link to="/servicios/tdcs">Conocer tDCS para Dolor</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-2 border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">EMT/TMS para Migrañas</h3>
                  </div>
                  
                  <div className="bg-success-light/20 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2">Aplicación Específica</h4>
                    <p className="text-sm text-muted-foreground">
                      Especialmente efectivo para migrañas crónicas y cefaleas resistentes 
                      a tratamientos farmacológicos.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reduce frecuencia de episodios migrañosos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Disminuye intensidad del dolor</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Alternativa para pacientes intolerantes a medicación</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tecnología FDA aprobada</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/servicios/emt-tms">Conocer EMT/TMS</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-primary-light">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary text-center mb-6">
                  Enfoque Multimodal Personalizado
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Evaluación Integral</h4>
                    <p className="text-sm text-primary-light-foreground">
                      Análisis completo del tipo de dolor, historia médica y tratamientos previos
                    </p>
                  </div>
                  <div className="text-center">
                    <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Neuromodulación Dirigida</h4>
                    <p className="text-sm text-primary-light-foreground">
                      Selección de la tecnología más apropiada según el tipo de dolor
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Integración Terapéutica</h4>
                    <p className="text-sm text-primary-light-foreground">
                      Combinación con rehabilitación física y manejo psicológico
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Button size="lg" asChild>
                    <Link to="/agendar-consulta">Consulta Especializada en Dolor</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Recupere Su Calidad de Vida
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              No permita que el dolor crónico limite su vida. Existen alternativas avanzadas 
              que pueden ofrecer el alivio que ha estado buscando sin los riesgos de los opioides.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Zap className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Evaluación Especializada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Análisis detallado de su patrón específico de dolor
                </p>
              </div>
              <div className="text-center">
                <Brain className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tecnología Avanzada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Neuromodulación de última generación disponible en Paraguay
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sin Dependencia</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Alternativa segura sin riesgo de adicción
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/servicios/tdcs">Explorar Opciones de Neuromodulación</Link>
              </Button>
              <p className="text-primary-foreground/80 text-sm">
                Consulta especializada en dolor crónico | (+595) 21 605 535
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DolorCronicoPage;