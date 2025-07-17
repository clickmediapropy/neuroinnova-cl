import { CheckCircle, Activity, AlertTriangle, Brain, ArrowRight, Shield, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const RehabilitacionPostACVPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-light py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Rehabilitación Post-ACV
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Potenciando la recuperación neurológica
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Después de un accidente cerebrovascular, cada día cuenta. Descubra cómo la neuromodulación 
              puede acelerar y mejorar su proceso de rehabilitación.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Conocer Opciones Avanzadas</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Understanding Post-Stroke Recovery */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Brain className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Rehabilitación Post-ACV</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                El accidente cerebrovascular (ACV) afecta diferentes áreas del cerebro, causando déficits 
                que pueden incluir <strong className="text-primary">debilidad motora, problemas del habla, 
                dificultades cognitivas</strong> y otros síntomas que impactan significativamente la calidad de vida.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Secuelas Comunes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Hemiparesia (debilidad en un lado)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Afasia (dificultades del habla)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Problemas de equilibrio y coordinación</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dificultades cognitivas</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ventana de Oportunidad</h3>
                  <p className="text-muted-foreground mb-4">
                    Los primeros 6 meses post-ACV son cruciales para la recuperación, 
                    cuando el cerebro tiene mayor capacidad de reorganización (neuroplasticidad).
                  </p>
                  <div className="bg-success-light/30 rounded-lg p-4">
                    <p className="text-success-light-foreground font-medium">
                      La neuromodulación puede extender y potenciar esta ventana de recuperación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Solutions */}
      <section id="solucion" className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
                REHABILITACIÓN AVANZADA
              </Badge>
              <h2 className="text-4xl font-bold text-primary mb-6">
                tDCS: Potenciando la Recuperación Post-ACV
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                La Estimulación Transcraneal por Corriente Directa puede acelerar y mejorar 
                significativamente los resultados de la rehabilitación tradicional.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">tDCS + Fisioterapia</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mejora la función motora de extremidades</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Acelera la recuperación del equilibrio</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Potencia efectos de fisioterapia</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" asChild>
                    <Link to="/servicios/tdcs">Conocer tDCS para Rehabilitación</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold">Rehabilitación del Habla</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mejora en afasia y disartria</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Combinación con terapia del lenguaje</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Resultados más rápidos y duraderos</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/servicios/psiquiatria-tradicional">Evaluación Integral</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Maximice Su Recuperación Post-ACV
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              No se conforme solo con rehabilitación tradicional. La neuromodulación puede 
              acelerar y mejorar significativamente su proceso de recuperación.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/servicios/tdcs">Explorar Rehabilitación Avanzada</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RehabilitacionPostACVPage;