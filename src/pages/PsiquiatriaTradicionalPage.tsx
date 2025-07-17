import { Stethoscope, ClipboardList, Pill, Brain, Users, LayoutList, RefreshCw, HelpCircle, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContactForm from "@/components/forms/ContactForm";

const PsiquiatriaTradicionalPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary-light py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Atención Psiquiátrica Integral
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Servicios psiquiátricos profesionales basados en evidencia científica para 
              el cuidado integral de su salud mental.
            </p>
            <Button size="lg" asChild>
              <a href="#contacto">Agende su Consulta Psiquiátrica</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Included Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <ClipboardList className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Servicios Incluidos</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Nuestra consulta psiquiátrica ofrece una atención completa con un enfoque 
              centrado en el paciente y basado en las más recientes evidencias científicas.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Evaluación Psiquiátrica</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Evaluación diagnóstica completa</li>
                    <li>• Historia clínica detallada</li>
                    <li>• Evaluación de síntomas actuales</li>
                    <li>• Identificación de factores desencadenantes</li>
                    <li>• Análisis de antecedentes familiares</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Manejo de Medicación</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Prescripción personalizada</li>
                    <li>• Monitoreo de efectos terapéuticos</li>
                    <li>• Control de efectos secundarios</li>
                    <li>• Ajustes según respuesta clínica</li>
                    <li>• Planes de tratamiento a largo plazo</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">Integración Terapéutica</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Coordinación con psicoterapia</li>
                    <li>• Abordaje biopsicosocial</li>
                    <li>• Intervenciones psicoeducativas</li>
                    <li>• Apoyo familiar cuando necesario</li>
                    <li>• Planificación de tratamiento integral</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Nuestro Enfoque</h3>
              <p className="text-muted-foreground">
                En NeuroInnova, combinamos la atención psiquiátrica tradicional con las más recientes 
                innovaciones en el campo de la salud mental. Reconocemos que cada paciente es único, 
                por lo que nuestro enfoque terapéutico se adapta a las necesidades específicas de cada 
                persona, incorporando cuando sea necesario nuestras opciones avanzadas de tratamiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Treated Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Users className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Condiciones Tratadas</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Ofrecemos tratamiento para una amplia gama de condiciones psiquiátricas, 
              utilizando enfoques basados en evidencia y personalizados para cada paciente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Trastornos del Estado de Ánimo</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Depresión</p>
                      <p className="text-sm text-muted-foreground">
                        Incluyendo depresión mayor, distimia y trastornos depresivos persistentes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Trastorno Bipolar</p>
                      <p className="text-sm text-muted-foreground">
                        Manejo de fases depresivas, maníacas y mixtas, y estabilización a largo plazo.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Trastornos Estacionales</p>
                      <p className="text-sm text-muted-foreground">
                        Tratamiento de patrones depresivos asociados a cambios estacionales.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Trastornos de Ansiedad</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Ansiedad Generalizada</p>
                      <p className="text-sm text-muted-foreground">
                        Manejo de preocupación excesiva y síntomas físicos asociados.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Trastorno de Pánico</p>
                      <p className="text-sm text-muted-foreground">
                        Tratamiento de ataques de pánico y ansiedad anticipatoria.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Fobias</p>
                      <p className="text-sm text-muted-foreground">
                        Abordaje de miedos específicos que interfieren con la vida diaria.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Trastornos del Sueño</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Insomnio</p>
                      <p className="text-sm text-muted-foreground">
                        Dificultad para conciliar o mantener el sueño.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Hipersomnia</p>
                      <p className="text-sm text-muted-foreground">
                        Somnolencia excesiva durante el día a pesar de un sueño adecuado.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Trastornos del Ritmo Circadiano</p>
                      <p className="text-sm text-muted-foreground">
                        Alteraciones en los patrones normales de sueño-vigilia.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Otros Trastornos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">TOC</p>
                      <p className="text-sm text-muted-foreground">
                        Trastorno obsesivo-compulsivo y trastornos relacionados.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">TDAH</p>
                      <p className="text-sm text-muted-foreground">
                        Trastorno por déficit de atención e hiperactividad en adultos.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                    <div>
                      <p className="font-medium">Trastornos Adaptativos</p>
                      <p className="text-sm text-muted-foreground">
                        Respuestas emocionales o conductuales a estresores identificables.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-foreground">
              Además de las condiciones listadas, también ofrecemos atención para una variedad 
              de otras afecciones psiquiátricas. Si tiene preguntas sobre una condición específica, 
              por favor contáctenos para más información.
            </p>
          </div>
        </div>
      </section>

      {/* Foundation Service Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <LayoutList className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Base de un Tratamiento Completo</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              La psiquiatría tradicional constituye el fundamento de nuestro enfoque de tratamiento, 
              proporcionando una base sólida que puede complementarse con opciones terapéuticas avanzadas 
              cuando sea necesario.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-primary-light rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Evaluación Diagnóstica Precisa</h3>
                <p className="text-primary-light-foreground mb-4">
                  Toda intervención efectiva comienza con un diagnóstico preciso. Nuestra evaluación psiquiátrica 
                  completa permite identificar con claridad la naturaleza exacta de su condición, estableciendo 
                  así la base para un plan de tratamiento adecuado.
                </p>
                <p className="text-primary-light-foreground">
                  Esta evaluación inicial es esencial incluso cuando se consideran terapias avanzadas, 
                  asegurando que cualquier intervención adicional sea apropiada para su situación específica.
                </p>
              </div>
              
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Tratamiento Escalable</h3>
                <p className="text-muted-foreground mb-4">
                  Nuestro enfoque por etapas comienza con intervenciones psiquiátricas tradicionales, 
                  escalando hacia opciones más avanzadas solo cuando sea necesario. Esto garantiza que 
                  cada paciente reciba el nivel de atención adecuado a su condición.
                </p>
                <p className="text-muted-foreground">
                  Muchos pacientes responden bien a la atención psiquiátrica tradicional, mientras que 
                  otros pueden beneficiarse de la adición de terapias avanzadas como EMT/TMS o tDCS en 
                  etapas posteriores del tratamiento.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border overflow-hidden mb-8">
              <div className="p-6 bg-primary/10">
                <h3 className="text-xl font-semibold mb-2">Enfoque Integrado</h3>
                <p>
                  En NeuroInnova, no consideramos las diferentes modalidades de tratamiento como opciones 
                  aisladas, sino como componentes de un continuo terapéutico integrado.
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Fundamento Psiquiátrico</p>
                      <p className="text-sm text-muted-foreground">
                        Comenzamos con una evaluación psiquiátrica completa y un plan de tratamiento tradicional 
                        como base fundamental.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Monitoreo de Respuesta</p>
                      <p className="text-sm text-muted-foreground">
                        Evaluamos continuamente la respuesta al tratamiento, ajustando las intervenciones según sea necesario.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Integración de Terapias Avanzadas</p>
                      <p className="text-sm text-muted-foreground">
                        En casos de respuesta insuficiente, integramos modalidades avanzadas como EMT/TMS o tDCS 
                        al plan de tratamiento existente.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center text-primary font-medium mr-3 flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <p className="font-medium">Atención Continuada</p>
                      <p className="text-sm text-muted-foreground">
                        Mantenemos el seguimiento psiquiátrico regular, asegurando un enfoque coherente y coordinado 
                        en todas las modalidades de tratamiento.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <RefreshCw className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Integración con Opciones Avanzadas</h2>
            </div>
            
            <p className="mb-8 text-foreground">
              Cuando el tratamiento psiquiátrico tradicional no proporciona resultados óptimos, 
              podemos integrar terapias avanzadas para potenciar los beneficios y abordar síntomas persistentes.
            </p>
            
            <div className="space-y-6 mb-8">
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-3">Psiquiatría + EMT/TMS</h3>
                      <p className="text-muted-foreground mb-4">
                        Para pacientes con depresión resistente al tratamiento o aquellos que experimentan 
                        efectos secundarios significativos con los medicamentos, la EMT/TMS puede integrarse 
                        al tratamiento psiquiátrico tradicional.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/servicios/emt-tms">Conocer más sobre EMT/TMS</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 flex justify-center items-start mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-3">Psiquiatría + tDCS</h3>
                      <p className="text-muted-foreground mb-4">
                        En casos de dolor crónico asociado a condiciones psiquiátricas o para 
                        potenciar la recuperación neurológica, la tDCS puede complementar el 
                        tratamiento psiquiátrico convencional.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/servicios/tdcs">Conocer más sobre tDCS</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-success-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-success-light-foreground mb-4">Beneficios de la Integración</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center text-success mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p className="text-success-light-foreground">Mayor efectividad que las terapias individuales por separado</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center text-success mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p className="text-success-light-foreground">Posibilidad de reducir dosis de medicación en algunos casos</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center text-success mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p className="text-success-light-foreground">Abordaje de síntomas resistentes al tratamiento convencional</p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center text-success mr-3 flex-shrink-0 mt-0.5">✓</div>
                  <p className="text-success-light-foreground">Continuidad en la atención con el mismo equipo médico</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <HelpCircle className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">Preguntas Frecuentes</h2>
            </div>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué debo esperar en mi primera consulta psiquiátrica?</AccordionTrigger>
                <AccordionContent>
                  Su primera consulta tendrá una duración aproximada de 60 minutos. Durante esta sesión, 
                  realizaremos una evaluación completa que incluye su historial médico y psiquiátrico, 
                  síntomas actuales, antecedentes familiares y factores psicosociales relevantes. 
                  Al finalizar, discutiremos las opciones de tratamiento y estableceremos un plan 
                  terapéutico inicial personalizado a sus necesidades.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Con qué frecuencia necesitaré asistir a consultas?</AccordionTrigger>
                <AccordionContent>
                  La frecuencia de las consultas varía según las necesidades individuales y la fase del 
                  tratamiento. Inicialmente, las consultas suelen ser más frecuentes (cada 2-4 semanas) 
                  para ajustar el tratamiento y monitorear la respuesta. Una vez que se logra la estabilización, 
                  las consultas pueden espaciarse a intervalos más largos para el mantenimiento.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Los medicamentos psiquiátricos crean dependencia?</AccordionTrigger>
                <AccordionContent>
                  La mayoría de los medicamentos psiquiátricos utilizados para tratar condiciones como depresión, 
                  ansiedad y trastornos bipolares no generan dependencia física. Algunos medicamentos, como las 
                  benzodiacepinas, pueden crear dependencia si se usan a largo plazo, pero se prescriben con 
                  precauciones apropiadas y monitoreo cuidadoso. Discutimos abiertamente los riesgos y beneficios 
                  de cada medicamento antes de iniciar el tratamiento.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Cómo se determina si necesito terapias avanzadas como EMT/TMS?</AccordionTrigger>
                <AccordionContent>
                  Las terapias avanzadas como EMT/TMS se consideran generalmente después de que el tratamiento 
                  psiquiátrico tradicional ha mostrado resultados insuficientes. Evaluamos factores como la 
                  respuesta a medicamentos previos, la severidad de los síntomas, la tolerancia a efectos 
                  secundarios y las preferencias personales del paciente. La decisión se toma en conjunto, 
                  analizando los beneficios potenciales específicos para su caso.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>¿Trabajan en conjunto con psicólogos o psicoterapeutas?</AccordionTrigger>
                <AccordionContent>
                  Sí, valoramos el enfoque multidisciplinario. Podemos coordinar su atención con su psicoterapeuta 
                  actual o recomendarle profesionales con quienes colaboramos frecuentemente. La combinación de 
                  farmacoterapia y psicoterapia ha demostrado ser más efectiva que cualquiera de las dos 
                  modalidades por separado para muchas condiciones psiquiátricas.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>¿Cuánto tiempo necesitaré medicación psiquiátrica?</AccordionTrigger>
                <AccordionContent>
                  La duración del tratamiento farmacológico varía considerablemente según la condición, historial 
                  de síntomas, respuesta al tratamiento y factores de riesgo individuales. Algunas personas 
                  pueden necesitar tratamiento a corto plazo durante períodos específicos de dificultad, mientras 
                  que otras con condiciones crónicas pueden beneficiarse de tratamiento a largo plazo. Revisamos 
                  periódicamente la necesidad de continuar con la medicación y ajustamos el plan según la evolución.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center">
              <p className="mb-6 text-muted-foreground">
                ¿Tiene más preguntas sobre nuestros servicios psiquiátricos? 
                Estaremos encantados de responder todas sus consultas.
              </p>
              <Button variant="outline" asChild>
                <a href="tel:+59521605535">Llámenos: (+595) 21 605 535</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Agende su Consulta Psiquiátrica
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Dé el primer paso hacia una mejor salud mental con una evaluación psiquiátrica 
              completa y personalizada.
            </p>
            <Button size="lg" variant="secondary" asChild className="mb-4">
              <a href="#contacto">Solicitar Cita</a>
            </Button>
            <p className="text-primary-foreground/80 text-sm">
              Ofrecemos atención psiquiátrica integral con acceso exclusivo a tecnologías avanzadas cuando sea necesario.
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
              <ContactForm defaultService="consulta-psiquiatrica" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PsiquiatriaTradicionalPage;