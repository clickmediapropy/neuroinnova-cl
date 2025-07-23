import { CheckCircle, Zap, AlertTriangle, Brain, ArrowRight, Shield, Activity, Pill } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const AdiccionesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Tratamiento de Adicciones
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Neuromodulación para romper el ciclo de la adicción
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              La adicción es una enfermedad del cerebro. La neuromodulación ofrece un enfoque 
              revolucionario para tratar las adicciones atacando directamente los circuitos 
              cerebrales alterados.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Descubrir Tratamiento Innovador</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding Addiction Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Brain className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">La Neurobiología de la Adicción</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                La adicción es una <strong className="text-primary">enfermedad cerebral crónica</strong> 
                que altera los sistemas de recompensa, motivación y memoria. No es una falta de 
                voluntad o un defecto moral, sino cambios neurobiológicos que requieren tratamiento 
                médico especializado.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tipos de Adicciones Tratadas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Alcohol</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Nicotina/Tabaco</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cocaína</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Cannabis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>Opioides</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Circuitos Cerebrales Afectados</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sistema de recompensa (dopamina)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Control ejecutivo (corteza prefrontal)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Regulación emocional</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Memoria y aprendizaje</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                      <span>Respuesta al estrés</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="h-6 w-6 mr-2" />
                El Ciclo de la Adicción
              </h3>
              <p className="text-foreground">
                La adicción se mantiene por un ciclo de: intoxicación/euforia → abstinencia/afecto 
                negativo → preocupación/anticipación (craving). La neuromodulación puede interrumpir 
                este ciclo actuando sobre los circuitos cerebrales específicos involucrados en cada fase.
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
                  <h3 className="text-xl font-semibold mb-3">Alta Tasa de Recaídas</h3>
                  <p className="text-muted-foreground mb-4">
                    Los tratamientos convencionales tienen limitaciones significativas:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>40-60% de recaídas en el primer año</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Medicamentos con eficacia limitada</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>Efectos secundarios que dificultan adherencia</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-destructive mt-2 mr-3 flex-shrink-0"></div>
                      <span>No abordan los cambios cerebrales subyacentes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-warning/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">El Poder del Craving</h3>
                  <p className="text-muted-foreground">
                    El deseo intenso o "craving" es el principal factor de recaída. Los métodos 
                    tradicionales tienen dificultades para controlar estos impulsos que se originan 
                    en circuitos cerebrales profundamente alterados por la adicción.
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
              <h2 className="text-3xl font-bold text-primary">Neuromodulación: Tratando la Raíz del Problema</h2>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 mb-8">
              <p className="text-lg font-medium text-primary mb-4">
                Restaurando el equilibrio cerebral
              </p>
              <p className="text-foreground">
                La neuromodulación actúa directamente sobre los circuitos cerebrales alterados 
                por la adicción, normalizando la función de las áreas relacionadas con el control 
                de impulsos, la toma de decisiones y el sistema de recompensa.
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
                      <h3 className="text-xl font-semibold mb-2">EMT/TMS para Adicciones</h3>
                      <Badge className="mb-3 bg-blue-100 text-blue-800">Aprobado CE</Badge>
                      <p className="text-muted-foreground mb-4">
                        La estimulación del córtex prefrontal dorsolateral produce:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Reducción del 60-80% en el craving</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora en el control de impulsos</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Disminución del consumo de sustancias</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Menor tasa de recaídas</span>
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
                      <h3 className="text-xl font-semibold mb-2">tDCS: Apoyo Continuo</h3>
                      <Badge className="mb-3 bg-orange-100 text-orange-800">Nivel C de Evidencia</Badge>
                      <p className="text-muted-foreground mb-4">
                        Tratamiento complementario que ofrece:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Reducción de ansiedad y depresión asociadas</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Mejora en funciones cognitivas</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Apoyo durante la abstinencia</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-success mr-2" />
                          <span>Tratamiento en casa disponible</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 bg-accent/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Protocolo Integral de Tratamiento</h3>
              <p className="text-muted-foreground mb-4">
                Nuestro enfoque combina neuromodulación con apoyo integral:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Evaluación neuropsiquiátrica completa</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Protocolo personalizado de neuromodulación</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Psicoterapia especializada en adicciones</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span>Prevención de recaídas a largo plazo</span>
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
              <h3 className="text-xl font-semibold mb-4">
                Resultados Clínicos en Adicciones
              </h3>
              
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Adicción al Alcohol</p>
                  <p className="text-sm text-muted-foreground">
                    Estudios muestran reducción del 70% en el consumo y días de abstinencia 
                    aumentados en un 300% después de tratamiento con EMT/TMS.
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Adicción a la Cocaína</p>
                  <p className="text-sm text-muted-foreground">
                    Disminución significativa del craving (65%) y pruebas de orina negativas 
                    en el 70% de los pacientes tratados durante 3 meses de seguimiento.
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Tabaquismo</p>
                  <p className="text-sm text-muted-foreground">
                    Tasa de abandono del 40% a los 6 meses, comparado con 15% en grupos 
                    control. Reducción del 80% en cigarrillos diarios en quienes no logran 
                    abstinencia completa.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm font-medium text-primary">
                  La neuromodulación está revolucionando el tratamiento de las adicciones al 
                  abordar directamente los mecanismos cerebrales subyacentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rompa el Ciclo de la Adicción</h2>
            <p className="text-xl text-muted-foreground mb-8">
              La recuperación es posible. Con neuromodulación, puede recuperar el control 
              de su vida y construir un futuro libre de adicciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contacto">
                  Iniciar mi Recuperación
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/servicios/emt-tms">
                  Más sobre EMT/TMS
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 p-6 bg-card rounded-lg border">
              <div className="flex items-center justify-center mb-4">
                <Pill className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-medium mb-2">Tratamiento Confidencial y Profesional</p>
              <p className="text-muted-foreground">
                En NeuroInnova entendemos la complejidad de las adicciones. Ofrecemos un 
                ambiente seguro, confidencial y libre de juicios para su recuperación.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdiccionesPage;