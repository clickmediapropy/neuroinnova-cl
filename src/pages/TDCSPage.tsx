import { CheckCircle, Award, Zap, Brain, Clock, Activity, Shield, HelpCircle, Microscope } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContactForm from "@/components/forms/ContactForm";
// Removed import - using YouTube video instead

const TDCSPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
              PIONERO EN PARAGUAY
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Tratamiento tDCS
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Estimulación Transcraneal por Corriente Directa, una tecnología innovadora para rehabilitación neurológica y manejo del dolor crónico.
            </p>
            <Button size="lg" asChild>
              <a href="#contacto">Consulte sobre tratamiento tDCS</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What is tDCS Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Zap className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">¿Qué es tDCS?</h2>
            </div>
            
            <p className="mb-6 text-foreground">
              La Estimulación Transcraneal por Corriente Directa (tDCS) es una técnica de neuromodulación no invasiva 
              que utiliza corrientes eléctricas de baja intensidad para modular la actividad neuronal y mejorar la 
              plasticidad cerebral, facilitando la recuperación funcional y el alivio de síntomas en diversas condiciones.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Tecnología Innovadora</h3>
                  <p className="text-muted-foreground">
                    La tDCS aplica una corriente eléctrica de baja intensidad a través de electrodos 
                    colocados en el cuero cabelludo, modulando la excitabilidad de las neuronas en áreas 
                    cerebrales específicas sin provocar una despolarización masiva.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Procedimiento No Invasivo</h3>
                  <p className="text-muted-foreground">
                    El tratamiento es completamente indoloro y no requiere anestesia ni cirugía. Los pacientes 
                    pueden experimentar una leve sensación de hormigueo durante los primeros minutos de la sesión.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/KNpyhgcr7iE?si=LPfugepqqkbDecIT" 
                title="Tratamiento tDCS - Estimulación Transcraneal por Corriente Directa" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            
            <p className="text-foreground">
              A diferencia de otras técnicas de estimulación cerebral, la tDCS puede combinarse fácilmente con terapias 
              de rehabilitación convencionales, lo que permite una intervención más completa e integrada. Esto hace que 
              sea particularmente valiosa para pacientes que requieren rehabilitación neurológica o manejo del dolor.
            </p>
          </div>
        </div>
      </section>

      {/* Main Applications Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Brain className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Aplicaciones Principales</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              La terapia tDCS ha demostrado beneficios significativos en una variedad de condiciones, 
              especialmente en aquellas relacionadas con la función neurológica y el dolor crónico.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Rehabilitación Post-ACV</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Mejora la recuperación motora en extremidades afectadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ayuda en la rehabilitación del habla y el lenguaje</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Potencia los efectos de la fisioterapia tradicional</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Manejo del Dolor Crónico</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Fibromialgia y síndrome de dolor crónico</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dolor neuropático y migrañas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reduce la necesidad de analgésicos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Mejora Cognitiva</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Memoria y atención</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Funciones ejecutivas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Rehabilitación cognitiva post-lesión</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Trastornos Psiquiátricos</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Depresión resistente al tratamiento</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tratamiento de la Depresión moderada a severa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Ansiedad</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Tratamiento en la casa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span>Complemento a terapias psicológicas</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6 flex items-start">
              <Award className="h-10 w-10 text-primary mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Ventaja Pionera</h3>
                <p className="text-muted-foreground">
                  NeuroInnova es el Primer Centro Integral de Neuromodulación del Paraguay que ofrece tDCS, 
                  brindando una alternativa terapéutica avanzada sin necesidad de viajar 
                  al extranjero para recibir este innovador tratamiento.
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
              El tratamiento con tDCS sigue un protocolo personalizado según la condición específica 
              del paciente y los objetivos terapéuticos establecidos.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-3">Detalles de las Sesiones</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Duración</p>
                      <p className="text-muted-foreground">Cada sesión dura entre 20-30 minutos, dependiendo del protocolo específico.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Colocación de Electrodos</p>
                      <p className="text-muted-foreground">No invasiva, sobre el cuero cabelludo en áreas específicas según la condición tratada.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Sensación</p>
                      <p className="text-muted-foreground">Procedimiento indoloro, con posible hormigueo leve al inicio de la sesión.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <p className="font-medium">Frecuencia</p>
                      <p className="text-muted-foreground">Múltiples sesiones para efecto acumulativo, generalmente 2-3 veces por semana.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-primary-light rounded-full h-6 w-6 flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">5</div>
                    <div>
                      <p className="font-medium">Terapia Combinada</p>
                      <p className="text-muted-foreground">A menudo se combina con fisioterapia o terapia ocupacional para maximizar resultados.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-foreground">
              Antes de iniciar el tratamiento, realizamos una evaluación completa para determinar 
              el protocolo más adecuado según la condición específica y objetivos terapéuticos del paciente.
            </p>
          </div>
        </div>
      </section>

      {/* Neurological Rehabilitation Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Activity className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Ideal para Rehabilitación Neurológica</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              La tDCS ha demostrado ser particularmente efectiva en la rehabilitación neurológica, 
              ayudando a pacientes a recuperar funciones perdidas o comprometidas debido a lesiones 
              cerebrales, accidentes cerebrovasculares u otras condiciones neurológicas.
            </p>
            
            <div className="bg-card rounded-lg overflow-hidden mb-8 border">
              <div className="bg-primary text-primary-foreground p-6">
                <h3 className="text-xl font-bold mb-2">Potenciando la Neuroplasticidad</h3>
                <p className="text-primary-foreground/90">
                  La tDCS facilita la reorganización de circuitos neuronales, acelerando la recuperación funcional
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Mejora de la Función Motora</h4>
                      <p className="text-sm text-muted-foreground">
                        Ayuda a recuperar el movimiento y la fuerza en extremidades afectadas tras un ACV o lesión cerebral.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Recuperación del Habla y Lenguaje</h4>
                      <p className="text-sm text-muted-foreground">
                        Facilita la rehabilitación en pacientes con afasia u otros trastornos del habla.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Rehabilitación Cognitiva</h4>
                      <p className="text-sm text-muted-foreground">
                        Mejora la atención, memoria y otras funciones cognitivas afectadas por lesiones cerebrales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-foreground mb-8">
              Un aspecto fundamental de la tDCS es su capacidad para complementar y potenciar los efectos de 
              otras terapias de rehabilitación, creando un enfoque integral para la recuperación del paciente.
            </p>
            
            <div className="bg-primary-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Casos de Éxito</h3>
              <p className="text-primary-light-foreground mb-4">
                Pacientes con secuelas de ACV que habían alcanzado una meseta en su recuperación con terapias 
                convencionales han experimentado mejoras significativas adicionales al incorporar tDCS a su 
                programa de rehabilitación.
              </p>
              <p className="text-primary-light-foreground font-medium">
                "La combinación de tDCS con fisioterapia tradicional ha permitido avances en casos donde 
                anteriormente se había estancado el progreso de recuperación."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Comparison Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Shield className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Beneficios Comparativos</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              La tDCS ofrece numerosas ventajas cuando se compara con los enfoques tradicionales 
              de rehabilitación y manejo del dolor, especialmente en casos donde los métodos 
              convencionales no han proporcionado resultados satisfactorios.
            </p>
            
            {/* Tabla responsive - Desktop */}
            <div className="hidden lg:block overflow-hidden rounded-lg border mb-8">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-4 text-left">Aspecto</th>
                    <th className="p-4 text-left">tDCS</th>
                    <th className="p-4 text-left">Rehabilitación Tradicional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Mecanismo de acción</td>
                    <td className="p-4 bg-success-light/30">Estimulación directa de circuitos neuronales</td>
                    <td className="p-4">Principalmente ejercicios mecánicos y repetitivos</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Neuroplasticidad</td>
                    <td className="p-4 bg-success-light/30">Facilitación directa y acelerada</td>
                    <td className="p-4">Indirecta y más lenta</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Casos estancados</td>
                    <td className="p-4 bg-success-light/30">Puede superar mesetas terapéuticas</td>
                    <td className="p-4">Frecuentemente alcanza límites</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Dolor crónico</td>
                    <td className="p-4 bg-success-light/30">Modula vías del dolor a nivel cerebral</td>
                    <td className="p-4">Enfoque principalmente periférico</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Complementariedad</td>
                    <td className="p-4 bg-success-light/30">Se integra y potencia otras terapias</td>
                    <td className="p-4">Funciona de forma aislada</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cards responsive - Mobile y Tablet */}
            <div className="lg:hidden space-y-4 mb-8">
              {[
                {
                  aspecto: "Mecanismo de acción",
                  tdcs: "Estimulación directa de circuitos neuronales",
                  tradicional: "Principalmente ejercicios mecánicos y repetitivos"
                },
                {
                  aspecto: "Neuroplasticidad",
                  tdcs: "Facilitación directa y acelerada",
                  tradicional: "Indirecta y más lenta"
                },
                {
                  aspecto: "Casos estancados",
                  tdcs: "Puede superar mesetas terapéuticas",
                  tradicional: "Frecuentemente alcanza límites"
                },
                {
                  aspecto: "Dolor crónico",
                  tdcs: "Modula vías del dolor a nivel cerebral",
                  tradicional: "Enfoque principalmente periférico"
                },
                {
                  aspecto: "Complementariedad",
                  tdcs: "Se integra y potencia otras terapias",
                  tradicional: "Funciona de forma aislada"
                }
              ].map((item, index) => (
                <div key={index} className="bg-card rounded-lg border overflow-hidden">
                  <div className="bg-primary text-primary-foreground p-4">
                    <h4 className="font-semibold">{item.aspecto}</h4>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-success-light/30 rounded-lg p-3">
                      <h5 className="font-medium text-sm text-success-light-foreground mb-1">tDCS</h5>
                      <p className="text-sm">{item.tdcs}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <h5 className="font-medium text-sm text-muted-foreground mb-1">Rehabilitación Tradicional</h5>
                      <p className="text-sm">{item.tradicional}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Enfoque Complementario Ideal</h3>
              <p className="text-muted-foreground">
                En NeuroInnova no consideramos la tDCS como un reemplazo de la rehabilitación tradicional, 
                sino como un complemento poderoso que potencia sus efectos. La combinación de ambos enfoques 
                permite obtener resultados superiores a los que se lograrían con cualquiera de ellos por separado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Evidence Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Microscope className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Evidencia tDCS</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Recomendación de directrices basada en evidencia para el uso de tDCS según el nivel de eficacia por condición.
            </p>

            <div className="bg-primary-light rounded-lg p-6 mb-8">
              <p className="text-primary text-center font-medium">
                La tDCS cuenta con una base sólida de evidencia científica que respalda su uso en diversas 
                condiciones neurológicas y psiquiátricas, con niveles de evidencia diferenciados según la 
                condición tratada.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-success/20 bg-success-light/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-success">Nivel A - Eficacia Definitiva</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Depresión (especialmente moderada a severa)</li>
                  <li>Dolor crónico (fibromialgia, dolor neuropático)</li>
                </ul>
              </div>
              
              <div className="border border-primary/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Nivel B - Eficacia Probable</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Rehabilitación post-ACV (motor y lenguaje)</li>
                  <li>Adicciones (craving y abstinencia)</li>
                  <li>Esquizofrenia (síntomas negativos)</li>
                </ul>
              </div>
              
              <div className="border border-primary/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Nivel C - Eficacia Posible</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Enfermedad de Parkinson</li>
                  <li>Trastornos de ansiedad</li>
                  <li>TDAH</li>
                  <li>Mejora cognitiva en adultos mayores</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Nota:</strong> Los niveles de evidencia se basan en meta-análisis y revisiones sistemáticas 
                publicadas en revistas científicas de alto impacto. La clasificación puede actualizarse según 
                emerjan nuevas investigaciones.
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
                <AccordionTrigger>¿Es doloroso el tratamiento con tDCS?</AccordionTrigger>
                <AccordionContent>
                  No, el tratamiento con tDCS no es doloroso. La mayoría de los pacientes solo experimentan 
                  una leve sensación de hormigueo o picazón durante los primeros minutos de la sesión. Esta 
                  sensación suele disminuir rápidamente a medida que el paciente se adapta a la estimulación.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Cuántas sesiones de tDCS se necesitan?</AccordionTrigger>
                <AccordionContent>
                  El número de sesiones varía según la condición tratada y la respuesta individual del paciente. 
                  Típicamente, se recomiendan entre 10-20 sesiones iniciales, distribuidas en 2-3 sesiones semanales. 
                  Algunos pacientes pueden beneficiarse de sesiones de mantenimiento posteriores.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Es seguro el tratamiento con tDCS?</AccordionTrigger>
                <AccordionContent>
                  Sí, la tDCS es considerada muy segura cuando es administrada por profesionales capacitados. 
                  Las corrientes utilizadas son de baja intensidad y los efectos secundarios son mínimos y 
                  transitorios. Existen numerosos estudios que respaldan su seguridad en diversas poblaciones 
                  clínicas.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Puedo continuar con mis medicamentos durante el tratamiento?</AccordionTrigger>
                <AccordionContent>
                  Sí, en la mayoría de los casos se puede continuar con la medicación habitual durante el 
                  tratamiento con tDCS. De hecho, la tDCS puede complementar los efectos de los medicamentos. 
                  Sin embargo, es importante informar a nuestro equipo sobre todos los medicamentos que esté 
                  tomando para evaluar posibles interacciones.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>¿Cuándo empezaré a notar resultados?</AccordionTrigger>
                <AccordionContent>
                  La respuesta varía según la condición tratada y factores individuales. Algunos pacientes 
                  reportan mejoras después de 5-6 sesiones, mientras que otros pueden requerir más sesiones 
                  para notar cambios significativos. Los efectos tienden a ser acumulativos, mejorando con 
                  cada sesión adicional.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>¿Puede combinarse la tDCS con fisioterapia?</AccordionTrigger>
                <AccordionContent>
                  Absolutamente. De hecho, se recomienda combinar la tDCS con fisioterapia o terapia ocupacional 
                  cuando sea posible. La tDCS puede aumentar la neuroplasticidad cerebral, creando una "ventana 
                  de oportunidad" durante la cual la terapia física puede ser más efectiva.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center">
              <p className="mb-6 text-muted-foreground">
                ¿Tiene más preguntas sobre la terapia tDCS? Nuestro equipo está disponible para responder
                todas sus consultas y ayudarle a determinar si este tratamiento es adecuado para su situación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="tel:+59521605535">Llámenos: (+595) 21 605 535</a>
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595983309319?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20el%20tratamiento%20tDCS.%20¿Podrían%20ayudarme%20con%20una%20consulta?" target="_blank" rel="noopener noreferrer">
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
              Consulte sobre tratamiento tDCS
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Ofrecemos evaluaciones personalizadas para determinar si la terapia tDCS 
              puede beneficiar su condición específica y desarrollar un plan de tratamiento adaptado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="#contacto">Solicitar Información</a>
              </Button>
              <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                <a href="https://wa.me/595983309319?text=Hola,%20me%20gustaría%20solicitar%20información%20sobre%20el%20tratamiento%20tDCS.%20¿Podrían%20ayudarme%20con%20más%20detalles?" target="_blank" rel="noopener noreferrer">
                  WhatsApp disponible 24/7
                </a>
              </Button>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              NeuroInnova es pionero en Paraguay ofreciendo esta tecnología avanzada de neuromodulación.
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
              <ContactForm defaultService="tdcs" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TDCSPage;