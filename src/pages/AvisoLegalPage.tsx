import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, FileText, Stethoscope, Brain } from "lucide-react";

const AvisoLegalPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Header */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <AlertTriangle className="h-12 w-12 text-orange-500 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Aviso Legal
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Información legal y exenciones de responsabilidad médica
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Última actualización: Enero 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Important Notice */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Aviso Importante
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">
                    <strong>Este sitio web contiene información médica general con fines educativos únicamente. 
                    La información aquí presentada NO constituye consejo médico personalizado y NO debe 
                    utilizarse como sustituto de la consulta con un profesional médico calificado.</strong>
                  </p>
                </CardContent>
              </Card>

              {/* Medical Disclaimers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="h-6 w-6 mr-2 text-primary" />
                    Exenciones de Responsabilidad Médica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">No Sustituto del Consejo Médico:</h4>
                    <p className="text-muted-foreground">
                      La información en este sitio web es de naturaleza general y no pretende 
                      sustituir el juicio clínico profesional, el diagnóstico o el tratamiento. 
                      Siempre consulte con un médico calificado para obtener consejo médico 
                      específico sobre su condición particular.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Relación Médico-Paciente:</h4>
                    <p className="text-muted-foreground">
                      El uso de este sitio web NO establece una relación médico-paciente entre 
                      usted y NeuroInnova o cualquiera de sus profesionales médicos. Una relación 
                      médico-paciente se establece únicamente a través de una consulta presencial 
                      y evaluación directa.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Emergencias Médicas:</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 font-medium">
                        EN CASO DE EMERGENCIA MÉDICA O PSIQUIÁTRICA, LLAME INMEDIATAMENTE AL 911 
                        O DIRÍJASE AL SERVICIO DE EMERGENCIAS MÁS CERCANO. NO USE ESTE SITIO WEB 
                        PARA COMUNICAR EMERGENCIAS.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-primary" />
                    Información sobre Tratamientos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tratamientos EMT/TMS y tDCS:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Los resultados pueden variar significativamente entre pacientes</li>
                      <li>No todos los pacientes son candidatos apropiados</li>
                      <li>Requieren evaluación médica completa antes del tratamiento</li>
                      <li>Pueden existir efectos secundarios y contraindicaciones</li>
                      <li>La eficacia no está garantizada</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Aprobaciones Regulatorias:</h4>
                    <p className="text-muted-foreground">
                      Las referencias a aprobaciones de la FDA, CE u otras autoridades regulatorias 
                      son para fines informativos. Las aprobaciones pueden variar por país y 
                      aplicación específica. Consulte con nuestros profesionales médicos sobre 
                      el estado regulatorio de tratamientos específicos en Paraguay.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Accuracy of Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Precisión de la Información</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Aunque nos esforzamos por mantener la información actualizada y precisa, 
                    la medicina y la neurociencia evolucionan constantemente. No garantizamos 
                    la precisión, integridad o actualidad de toda la información presentada.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-800">Actualización de Información:</h4>
                    <p className="text-blue-700 text-sm">
                      La información médica puede cambiar rápidamente. Siempre verifique 
                      la información más reciente con nuestros profesionales médicos durante 
                      su consulta.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Licensing */}
              <Card>
                <CardHeader>
                  <CardTitle>Licencias Profesionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Profesionales Médicos:</h4>
                      <p className="text-muted-foreground">
                        Todos nuestros profesionales médicos están debidamente licenciados 
                        y registrados ante el Ministerio de Salud Pública y Bienestar Social 
                        de Paraguay y el Colegio Médico del Paraguay según corresponda.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Verificación de Credenciales:</h4>
                      <p className="text-muted-foreground">
                        Los pacientes pueden solicitar verificación de las credenciales 
                        y especializaciones de nuestros profesionales médicos en cualquier momento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Intellectual Property */}
              <Card>
                <CardHeader>
                  <CardTitle>Propiedad Intelectual</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Todo el contenido de este sitio web está protegido por derechos de autor</li>
                    <li>Las marcas comerciales pertenecen a sus respectivos propietarios</li>
                    <li>Uso no autorizado está prohibido</li>
                    <li>Contenido para uso personal y no comercial únicamente</li>
                    <li>Prohibida la reproducción sin autorización escrita</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Third Party Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Enlaces de Terceros</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Este sitio web puede contener enlaces a sitios web de terceros. 
                    No somos responsables por el contenido, precisión o prácticas de 
                    privacidad de sitios web externos. Los enlaces se proporcionan 
                    únicamente para conveniencia del usuario.
                  </p>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card>
                <CardHeader>
                  <CardTitle>Limitación de Responsabilidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Exención General:</h4>
                    <p className="text-muted-foreground">
                      En la máxima medida permitida por la ley, NeuroInnova, sus profesionales, 
                      empleados y afiliados no serán responsables por daños directos, indirectos, 
                      incidentales, especiales o consecuentes que resulten del uso de este sitio web 
                      o de la información contenida en él.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Uso Bajo Su Propio Riesgo:</h4>
                    <p className="text-muted-foreground">
                      El uso de este sitio web y la confianza en cualquier información 
                      aquí contenida es únicamente bajo su propio riesgo. Recomendamos 
                      encarecidamente consultar con profesionales médicos calificados 
                      antes de tomar cualquier decisión relacionada con la salud.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy and Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-primary" />
                    Privacidad y Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    El uso de este sitio web está sujeto a nuestra Política de Privacidad. 
                    Al utilizar este sitio, usted consiente la recopilación y uso de 
                    información según se describe en dicha política. Para información 
                    detallada sobre privacidad médica, consulte nuestra Política de Privacidad.
                  </p>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardHeader>
                  <CardTitle>Ley Aplicable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Este aviso legal se rige por las leyes de la República del Paraguay. 
                    Cualquier disputa relacionada con este sitio web o su contenido será 
                    resuelta en los tribunales competentes de Asunción, Paraguay.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-primary" />
                    Información de Contacto Legal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>NeuroInnova - Innovación en Salud Mental</strong></p>
                    <p>Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera</p>
                    <p>Asunción, Paraguay</p>
                    <p><strong>Teléfono:</strong> (+595) 21 605 535</p>
                    <p><strong>Email Legal:</strong> legal@neuroinnova.com.py</p>
                    <p><strong>RUC:</strong> [Número de RUC]</p>
                  </div>
                </CardContent>
              </Card>

              {/* Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>Actualizaciones del Aviso Legal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Este aviso legal puede ser actualizado periódicamente para reflejar 
                    cambios en nuestras prácticas, servicios o requisitos legales. 
                    La fecha de la última actualización se indica al inicio de este documento. 
                    Se recomienda revisar este aviso regularmente.
                  </p>
                </CardContent>
              </Card>

              {/* Final Warning */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Aviso Final Importante
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700 font-medium text-center">
                    LA INFORMACIÓN EN ESTE SITIO WEB NO DEBE SER UTILIZADA PARA 
                    AUTODIAGNÓSTICO O AUTOTRATAMIENTO. SIEMPRE CONSULTE CON UN 
                    PROFESIONAL MÉDICO CALIFICADO PARA CUALQUIER PREOCUPACIÓN DE SALUD.
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

export default AvisoLegalPage;