import { CheckCircle, AlertTriangle, TrendingUp, Brain, ArrowRight, Shield, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const DepresionResistentePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-animated-bg py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
              Depresión Resistente al Tratamiento
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              ¿Ha probado múltiples medicamentos sin éxito?
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Cuando los antidepresivos tradicionales no proporcionan alivio, usted no está solo. 
              Existe una solución avanzada disponible en Paraguay que puede cambiar su perspectiva de vida.
            </p>
            <Button size="lg" asChild>
              <a href="#solucion">Descubra la Solución</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-16 neural-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <AlertTriangle className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">¿Qué es la Depresión Resistente al Tratamiento?</h2>
            </div>
            
            <div className="bg-card rounded-lg border p-6 mb-8">
              <p className="text-foreground mb-6 text-lg">
                La depresión resistente al tratamiento se define como una condición en la cual una persona 
                <strong className="text-primary"> no experimenta mejoría significativa después de probar al menos 
                dos antidepresivos diferentes</strong> durante un período adecuado (generalmente 6-8 semanas cada uno) 
                a dosis terapéuticas apropiadas.
              </p>
              
              <div className="bg-warning-light rounded-lg p-6">
                <h3 className="text-xl font-semibold text-warning-light-foreground mb-4">Criterios Médicos</h3>
                <ul className="space-y-3 text-warning-light-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                    <span>Falta de respuesta a 2 o más antidepresivos de clases diferentes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tratamiento durante períodos adecuados (6-8 semanas mínimo)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dosis terapéuticas apropiadas confirmadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-warning mr-2 flex-shrink-0 mt-0.5" />
                    <span>Síntomas depresivos persistentes que afectan la función diaria</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-foreground">
              Si usted ha experimentado esta situación, es importante entender que <strong>no es su culpa</strong> 
              y que <strong>sí existen alternativas efectivas</strong>. La resistencia al tratamiento farmacológico 
              es un fenómeno médico bien documentado que requiere enfoques terapéuticos especializados.
            </p>
          </div>
        </div>
      </section>

      {/* Key Question Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                ¿Se identifica con esta experiencia?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4 text-primary-foreground">Usted puede haber experimentado:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>Múltiples intentos con diferentes antidepresivos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>Efectos secundarios molestos sin beneficios</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>Mejoría parcial que no dura</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>Frustración con el proceso de tratamiento</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4 text-primary-foreground">Sentimientos comunes:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>"Nada funciona para mí"</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>"Tal vez no tenga solución"</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>"He perdido la esperanza"</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground mt-2 mr-3 flex-shrink-0"></div>
                      <span>"Estoy cansado de intentar"</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary-foreground/10 rounded-lg">
                <p className="text-xl font-semibold text-primary-foreground">
                  Si esto le resulta familiar, queremos que sepa que <strong>SÍ hay esperanza</strong> 
                  y que existe una solución médicamente comprobada disponible aquí en Paraguay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">No Está Solo: Las Estadísticas</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl font-bold text-primary mb-4">62%</div>
                  <h3 className="text-xl font-semibold mb-3">Remisión</h3>
                  <p className="text-muted-foreground">
                    No responden adecuadamente a los tratamientos farmacológicos tradicionales, 
                    según estudios internacionales.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl font-bold text-primary mb-4">2-4</div>
                  <h3 className="text-xl font-semibold mb-3">medicamentos en promedio</h3>
                  <p className="text-muted-foreground">
                    Es el número típico de antidepresivos que prueban los pacientes antes 
                    de encontrar alivio, y algunos nunca lo encuentran.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl font-bold text-primary mb-4">67%</div>
                  <h3 className="text-xl font-semibold mb-3">experimentan efectos secundarios</h3>
                  <p className="text-muted-foreground">
                    De los pacientes que toman antidepresivos reportan efectos secundarios 
                    que afectan su calidad de vida.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl font-bold text-primary mb-4">6-8</div>
                  <h3 className="text-xl font-semibold mb-3">semanas de espera</h3>
                  <p className="text-muted-foreground">
                    Es el tiempo mínimo necesario para evaluar si un antidepresivo funciona, 
                    multiplicando la frustración y el sufrimiento.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-success-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-success-light-foreground mb-4">Lo Importante es:</h3>
              <p className="text-success-light-foreground">
                Estos números demuestran que la resistencia al tratamiento farmacológico es un fenómeno 
                médico común y <strong>no una falla personal</strong>. Millones de personas en todo el mundo 
                experimentan esta situación, y para ellas existe una alternativa probada y efectiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Medications Fail Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Users className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">¿Por Qué Fallan Algunos Medicamentos?</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              La resistencia a los antidepresivos no es un misterio médico. Existe evidencia científica 
              sólida que explica por qué algunos cerebros no responden a estos medicamentos de la manera esperada.
            </p>
            
            <div className="space-y-6 mb-8">
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Variabilidad Genética</h3>
                  <p className="text-muted-foreground">
                    Las diferencias genéticas individuales afectan cómo el cuerpo procesa y responde a los 
                    medicamentos. Lo que funciona para una persona puede no funcionar para otra debido a 
                    variaciones en enzimas metabolizadoras y receptores neuronales.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Circuitos Cerebrales Diferentes</h3>
                  <p className="text-muted-foreground">
                    La depresión puede afectar diferentes redes neuronales en diferentes personas. 
                    Los antidepresivos tradicionales actúan principalmente sobre neurotransmisores, 
                    pero algunas formas de depresión involucran disfunciones en circuitos cerebrales 
                    que requieren intervenciones más directas.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Inflamación y Factores Inmunitarios</h3>
                  <p className="text-muted-foreground">
                    Algunos casos de depresión resistente están asociados con procesos inflamatorios 
                    en el cerebro que no son abordados eficazmente por los antidepresivos convencionales, 
                    requiriendo enfoques terapéuticos alternativos.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Plasticidad Neural Comprometida</h3>
                  <p className="text-muted-foreground">
                    En algunos casos, la capacidad del cerebro para formar nuevas conexiones neuronales 
                    (neuroplasticidad) está comprometida, limitando la efectividad de los medicamentos 
                    que dependen de estos procesos para generar mejorías.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-primary-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">La Conclusión Importante</h3>
              <p className="text-primary-light-foreground">
                Entender estos mecanismos ha llevado al desarrollo de tratamientos alternativos que abordan 
                la depresión desde perspectivas diferentes. <strong>La resistencia a medicamentos no significa 
                que no hay solución</strong>, sino que se necesita un enfoque terapéutico distinto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EMT/TMS Solution Section */}
      <section id="solucion" className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
                SOLUCIÓN DISPONIBLE
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">
                EMT/TMS: La Respuesta para la Depresión Resistente
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Cuando los medicamentos no funcionan, la Estimulación Magnética Transcraneal 
                ofrece una alternativa probada, segura y efectiva.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="bg-primary text-primary-foreground p-6">
                  <h3 className="text-2xl font-bold mb-2">¿Cómo Funciona EMT/TMS?</h3>
                  <p className="text-primary-foreground/90">
                    Abordaje directo de los circuitos cerebrales afectados
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Brain className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Estimulación Directa</p>
                        <p className="text-sm text-muted-foreground">
                          Activa directamente las regiones cerebrales afectadas por la depresión, 
                          sin depender de neurotransmisores.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">No Invasivo</p>
                        <p className="text-sm text-muted-foreground">
                          Utiliza campos magnéticos similares a una resonancia magnética, 
                          sin cirugía ni medicamentos.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Sin Efectos Sistémicos</p>
                        <p className="text-sm text-muted-foreground">
                          No causa los efectos secundarios típicos de los antidepresivos 
                          (aumento de peso, disfunción sexual, etc.).
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="bg-success text-success-foreground p-6">
                  <h3 className="text-2xl font-bold mb-2">Resultados Comprobados</h3>
                  <p className="text-success-foreground/90">
                    Evidencia científica sólida de efectividad
                  </p>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-success mb-2">83%</div>
                    <p className="text-muted-foreground">Respuesta</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-2" />
                      <span className="text-sm">Aprobado por FDA desde 2008</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-2" />
                      <span className="text-sm">Miles de estudios científicos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-2" />
                      <span className="text-sm">Beneficios duraderos</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-2" />
                      <span className="text-sm">Se puede combinar con medicamentos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Exclusivo en Paraguay
              </h3>
              <p className="text-primary-light-foreground mb-6">
                NeuroInnova es el único centro en Paraguay que ofrece terapia EMT/TMS. 
                Ya no necesita viajar a Buenos Aires o São Paulo para acceder a este tratamiento avanzado.
              </p>
              <Button size="lg" asChild>
                <Link to="/servicios/emt-tms" className="flex items-center">
                  Conocer Más Sobre EMT/TMS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Journey Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              De la Frustración a la Esperanza: Su Camino hacia la Recuperación
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 text-center mb-6 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-destructive">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-destructive">Frustración Actual</h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-muted-foreground">
                    Ha probado múltiples medicamentos sin encontrar alivio duradero. Se siente desalentado 
                    y preguntándose si alguna vez mejorará. Los efectos secundarios han afectado su calidad 
                    de vida, y la esperanza se ha ido desvaneciendo.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 text-center mb-6 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-warning">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-warning">Evaluación Especializada</h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-muted-foreground">
                    En NeuroInnova, evaluamos su historial de tratamientos y determinamos si es candidato 
                    para EMT/TMS. Explicamos cómo esta tecnología puede abordar su depresión desde una 
                    perspectiva completamente diferente.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 text-center mb-6 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Tratamiento EMT/TMS</h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-muted-foreground">
                    Inicia un curso de tratamiento EMT/TMS personalizado. Las sesiones son cómodas, duran 
                    20-40 minutos, y puede retomar sus actividades normales inmediatamente después. 
                    Sin efectos secundarios sistémicos.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 text-center mb-6 md:mb-0">
                  <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-success">4</span>
                  </div>
                  <h3 className="text-xl font-semibold text-success">Renovada Esperanza</h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-muted-foreground">
                    Después de 2-3 semanas, comienza a experimentar mejorías que no había sentido con 
                    los medicamentos. Su energía regresa, su perspectiva cambia, y redescubre la esperanza 
                    de una vida plena y satisfactoria.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
                Este puede ser su camino hacia la recuperación. El primer paso es una evaluación 
                para determinar si EMT/TMS es adecuado para usted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a
                    href={buildWhatsAppUrl("Hola, me gustaría solicitar una evaluación para tratamiento de depresión resistente con EMT/TMS.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar Evaluación
                  </a>
                </Button>
                <Button size="lg" className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595983309319?text=Hola,%20me%20gustaría%20solicitar%20una%20evaluación%20para%20depresión%20resistente.%20¿Podrían%20ayudarme%20con%20el%20proceso?" target="_blank" rel="noopener noreferrer">
                    WhatsApp disponible 24/7
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              No Permita que la Depresión Resistente Defina su Vida
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Si ha probado múltiples medicamentos sin éxito, EMT/TMS puede ser la respuesta que ha estado buscando. 
              Es tiempo de explorar una solución que aborda su depresión de manera diferente.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Evaluación Especializada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Determinamos si es candidato ideal para EMT/TMS
                </p>
              </div>
              <div className="text-center">
                <Brain className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tecnología Avanzada</h3>
                <p className="text-primary-foreground/80 text-sm">
                  La única opción EMT/TMS disponible en Paraguay
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sin Efectos Sistémicos</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Tratamiento seguro sin los efectos de los medicamentos
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/servicios/emt-tms">Descubra EMT/TMS - La Solución para Depresión Resistente</Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <p className="text-primary-foreground/80 text-sm">
                  Consulta de evaluación disponible | (+595) 21 605 535
                </p>
                <Button size="sm" className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595983309319?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20el%20tratamiento%20EMT/TMS%20para%20depresión%20resistente.%20¿Podrían%20ayudarme%20con%20una%20consulta?" target="_blank" rel="noopener noreferrer">
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

export default DepresionResistentePage;