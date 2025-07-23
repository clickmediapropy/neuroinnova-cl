import { CheckCircle, Zap, AlertTriangle, Brain, ArrowRight, Shield, Activity, Heart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const FibromialgiaPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Fibromialgia
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Alivio real para el dolor invisible
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              La fibromialgia es real y su dolor también. Descubra cómo la neuromodulación 
              puede ofrecer alivio significativo cuando otros tratamientos han fallado.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Explorar Tratamiento con Neuromodulación</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding Fibromyalgia Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Heart className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Comprendiendo la Fibromialgia</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                La fibromialgia es un síndrome de dolor crónico generalizado que afecta a 
                <strong className="text-primary"> millones de personas en todo el mundo</strong>. 
                Se caracteriza por dolor musculoesquelético difuso, fatiga extrema y una variedad 
                de síntomas que impactan profundamente la calidad de vida.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Síntomas Principales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dolor generalizado persistente</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Fatiga crónica incapacitante</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Rigidez matutina</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Puntos sensibles al tacto</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Hipersensibilidad al dolor</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Síntomas Asociados</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Trastornos del sueño</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>"Fibro-niebla" (problemas cognitivos)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ansiedad y depresión</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Síndrome del intestino irritable</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dolores de cabeza frecuentes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                El Desafío del Diagnóstico
              </h3>
              <p className="text-foreground">
                La fibromialgia es a menudo llamada una "enfermedad invisible" porque no hay 
                pruebas de laboratorio o imágenes que la confirmen. El diagnóstico se basa en 
                síntomas clínicos y la exclusión de otras condiciones, lo que puede llevar años 
                y causar frustración tanto en pacientes como en médicos.
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
              <h2 className="text-3xl font-bold text-primary">Limitaciones del Tratamiento Convencional</h2>
            </div>
            
            <div className="grid gap-6">
              <Card className="border-destructive/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Medicamentos con Eficacia Limitada</h3>
                  <p className="text-muted-foreground mb-4">
                    Los tratamientos farmacológicos actuales ofrecen alivio parcial y temporal:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Analgésicos tradicionales poco efectivos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Antidepresivos con efectos secundarios significativos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Relajantes musculares que aumentan la fatiga</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Riesgo de dependencia con opioides</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-warning/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Impacto Multidimensional</h3>
                  <p className="text-muted-foreground">
                    La fibromialgia afecta todos los aspectos de la vida: trabajo, relaciones, 
                    actividades diarias y bienestar emocional. Los tratamientos convencionales 
                    rara vez abordan esta complejidad de manera integral.
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
              <h2 className="text-3xl font-bold text-primary">Neuromodulación: Un Nuevo Enfoque</h2>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-lg font-medium text-primary mb-4">
                La ciencia detrás del alivio del dolor
              </p>
              <p className="text-foreground">
                La fibromialgia involucra alteraciones en el procesamiento central del dolor. 
                La neuromodulación actúa directamente sobre estas vías cerebrales alteradas, 
                normalizando la percepción del dolor y mejorando múltiples síntomas simultáneamente.
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
                      <h3 className="text-xl font-semibold mb-2">EMT/TMS para Fibromialgia</h3>
                      <Badge className="mb-3 bg-yellow-100 text-yellow-800">Nivel B de Evidencia</Badge>
                      <p className="text-muted-foreground mb-4">
                        La estimulación magnética transcraneal ha demostrado eficacia significativa:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Reducción del 30-50% en intensidad del dolor</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora significativa en calidad del sueño</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Disminución de la fatiga crónica</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora en función cognitiva ("fibro-niebla")</span>
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
                      <h3 className="text-xl font-semibold mb-2">tDCS: Tratamiento Complementario</h3>
                      <p className="text-muted-foreground mb-4">
                        La estimulación por corriente directa ofrece beneficios adicionales:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Puede realizarse en casa bajo supervisión</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora el estado de ánimo y ansiedad</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Potencia los efectos de la fisioterapia</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Sin efectos secundarios significativos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 bg-accent/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Protocolo de Tratamiento Personalizado</h3>
              <p className="text-muted-foreground mb-4">
                Cada paciente con fibromialgia es único. Nuestro enfoque incluye:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Evaluación integral inicial</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Protocolo adaptado a sus síntomas</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Monitoreo continuo del progreso</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ajustes según respuesta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Heart className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Historias de Esperanza</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4">
                Lo que dicen nuestros pacientes con fibromialgia
              </h3>
              
              <div className="space-y-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="italic mb-2">
                    "Después de años de dolor constante, finalmente puedo dormir toda la noche. 
                    La neuromodulación me devolvió mi vida."
                  </p>
                  <p className="text-sm text-muted-foreground">- Paciente, 45 años</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="italic mb-2">
                    "La 'fibro-niebla' desapareció. Puedo concentrarme en mi trabajo nuevamente 
                    y tengo energía para jugar con mis hijos."
                  </p>
                  <p className="text-sm text-muted-foreground">- Paciente, 38 años</p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="italic mb-2">
                    "Reduje mis medicamentos a la mitad y me siento mejor que en años. 
                    Es increíble no depender solo de pastillas."
                  </p>
                  <p className="text-sm text-muted-foreground">- Paciente, 52 años</p>
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
            <h2 className="text-3xl font-bold mb-6">Su Dolor es Real. La Solución También.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              No tiene que vivir con dolor constante. La neuromodulación ofrece una 
              alternativa segura y efectiva para recuperar su calidad de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contacto">
                  Comenzar mi Tratamiento
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/servicios/tdcs">
                  Conocer sobre tDCS
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 p-6 bg-card rounded-lg border">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-2">Tratamiento Respaldado por la Ciencia</p>
              <p className="text-muted-foreground">
                Somos el Primer Centro Integral de Neuromodulación del Paraguay, 
                ofreciendo tratamientos con evidencia científica nivel B para fibromialgia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FibromialgiaPage;