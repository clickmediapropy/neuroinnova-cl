import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

const TerminosCondicionesPage = () => {
  return (
    <Layout>
      <div className="min-h-screen hero-animated-bg">
        {/* Header */}
        <section className="pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 neural-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Scale className="h-12 w-12 text-primary mr-4" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                  Términos y Condiciones
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                Condiciones de uso de nuestros servicios médicos especializados
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Última actualización: Enero 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16 contact-tech-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-primary" />
                    Aceptación de Términos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Al acceder y utilizar los servicios de NeuroInnova, usted acepta estar 
                    legalmente vinculado por estos términos y condiciones. Si no está de 
                    acuerdo con alguno de estos términos, no debe utilizar nuestros servicios. 
                    Estos términos se aplican a todos los usuarios, pacientes y visitantes 
                    de nuestras instalaciones y sitio web.
                  </p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Servicios Médicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Servicios Ofrecidos:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Consultas psiquiátricas especializadas</li>
                      <li>Terapia de Estimulación Magnética Transcraneal (EMT/TMS)</li>
                      <li>Tratamiento de Estimulación por Corriente Directa (tDCS)</li>
                      <li>Evaluaciones neuropsiquiátricas</li>
                      <li>Seguimiento y monitoreo de tratamientos</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Alcance de los Servicios:</h4>
                    <p className="text-muted-foreground">
                      Nuestros servicios se proporcionan exclusivamente en las instalaciones 
                      de Clínica IMA, ubicada en Dr. Eduardo López Moreira 4612, Asunción, Paraguay. 
                      Todos los tratamientos son realizados por profesionales médicos licenciados 
                      y especializados.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Responsabilidades del Paciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Como paciente, usted se compromete a:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Proporcionar información médica completa y veraz</li>
                    <li>Asistir puntualmente a las citas programadas</li>
                    <li>Seguir las instrucciones médicas y planes de tratamiento</li>
                    <li>Notificar cambios en su condición médica</li>
                    <li>Informar sobre medicamentos y tratamientos concurrentes</li>
                    <li>Cancelar citas con al menos 24 horas de anticipación</li>
                    <li>Cumplir con las políticas de pago establecidas</li>
                    <li>Mantener la confidencialidad de otros pacientes</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Appointments and Cancellations */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Citas y Cancelaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Programación de Citas:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Las citas deben programarse con anticipación</li>
                      <li>Confirmación requerida 24-48 horas antes</li>
                      <li>Llegada 15 minutos antes de la hora programada</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Política de Cancelación:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Cancelación gratuita con 24 horas de anticipación</li>
                      <li>Cancelaciones tardías pueden incurrir en cargos</li>
                      <li>No presentarse sin aviso: cargo del 50% de la consulta</li>
                      <li>Emergencias médicas exentas de cargos por cancelación</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Términos de Pago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Métodos de Pago:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Efectivo, tarjetas de débito y crédito</li>
                      <li>Transferencias bancarias</li>
                      <li>Seguros médicos (sujeto a cobertura)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Política de Facturación:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Pago requerido al momento del servicio</li>
                      <li>Facturación detallada proporcionada</li>
                      <li>Costos de tratamiento acordados previamente</li>
                      <li>Planes de pago disponibles para tratamientos extensos</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Disclaimers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-6 w-6 mr-2 text-orange-500" />
                    5. Limitaciones y Exenciones de Responsabilidad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-orange-800">Importante - Lea Cuidadosamente:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-orange-700 text-sm">
                      <li>No garantizamos resultados específicos de tratamiento</li>
                      <li>Los resultados pueden variar entre pacientes</li>
                      <li>Algunos tratamientos son experimentales o innovadores</li>
                      <li>Existen riesgos inherentes a todos los procedimientos médicos</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Consentimiento Informado:</h4>
                    <p className="text-muted-foreground">
                      Todos los procedimientos requieren consentimiento informado previo. 
                      Los riesgos, beneficios y alternativas se explicarán detalladamente 
                      antes de cualquier tratamiento.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Limitación de Responsabilidad:</h4>
                    <p className="text-muted-foreground">
                      Nuestra responsabilidad se limita al estándar de atención médica 
                      profesional. No somos responsables por resultados no deseados 
                      que estén dentro del rango de riesgos médicos conocidos y 
                      apropiadamente divulgados.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Confidentiality */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Confidencialidad y Privacidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Mantenemos estricta confidencialidad médico-paciente</li>
                    <li>Cumplimiento con leyes de privacidad médica</li>
                    <li>Información compartida solo con consentimiento o por ley</li>
                    <li>Políticas de seguridad de datos implementadas</li>
                    <li>Derecho del paciente a acceder y corregir información</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Conduct */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Código de Conducta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Comportamiento Esperado:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Trato respetuoso hacia el personal y otros pacientes</li>
                      <li>Cumplimiento de las normas de la clínica</li>
                      <li>Uso apropiado de las instalaciones</li>
                      <li>Prohibido el uso de sustancias no autorizadas</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Consecuencias:</h4>
                    <p className="text-muted-foreground">
                      El comportamiento inapropiado, amenazante o disruptivo 
                      puede resultar en la terminación de servicios y prohibición 
                      de acceso a las instalaciones.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Technology and Website */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Uso del Sitio Web y Tecnología</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Uso responsable y legal del sitio web</li>
                    <li>Prohibido el acceso no autorizado a sistemas</li>
                    <li>Cookies utilizadas para mejorar la experiencia</li>
                    <li>Contenido protegido por derechos de autor</li>
                    <li>Enlaces externos bajo su propio riesgo</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Force Majeure */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Fuerza Mayor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No seremos responsables por el incumplimiento de obligaciones 
                    debido a circunstancias fuera de nuestro control, incluyendo 
                    pero no limitado a: desastres naturales, pandemias, regulaciones 
                    gubernamentales, fallas de energía, o emergencias de salud pública.
                  </p>
                </CardContent>
              </Card>

              {/* Modifications */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Modificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nos reservamos el derecho de modificar estos términos en cualquier 
                    momento. Los cambios serán publicados en nuestro sitio web y 
                    notificados a los pacientes activos. El uso continuado de nuestros 
                    servicios constituye aceptación de los términos modificados.
                  </p>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardHeader>
                  <CardTitle>11. Ley Aplicable y Jurisdicción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Estos términos se rigen por las leyes de la República del Paraguay. 
                    Cualquier disputa será resuelta en los tribunales competentes de 
                    Asunción, Paraguay. Para disputas menores, se priorizará la 
                    mediación antes del litigio.
                  </p>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>12. Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Para preguntas sobre estos términos:</p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> legal@neuroinnova.com.py</p>
                    <p><strong>Teléfono:</strong> (+595) 21 605 535</p>
                    <p><strong>Dirección:</strong> Dr. Eduardo López Moreira 4612, Asunción, Paraguay</p>
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <Card className="bg-primary/5 border-primary/20 transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-primary" />
                    Compromiso con la Excelencia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-primary">
                    Estos términos reflejan nuestro compromiso con brindar atención 
                    médica de la más alta calidad, manteniendo los estándares éticos 
                    y profesionales más exigentes en el campo de la salud mental y neurología.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TerminosCondicionesPage;