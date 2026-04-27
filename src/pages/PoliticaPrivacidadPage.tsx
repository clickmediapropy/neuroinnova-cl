import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileText, Mail, Phone } from "lucide-react";

const PoliticaPrivacidadPage = () => {
  return (
    <Layout>
      <div className="min-h-screen hero-animated-bg">
        {/* Header */}
        <section className="pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 neural-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 text-primary mr-4" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                  Política de Privacidad
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                Protección y confidencialidad de sus datos médicos y personales
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
                    <Lock className="h-6 w-6 mr-2 text-primary" />
                    Compromiso con la Privacidad Médica
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    En NeuroInnova, entendemos la importancia crítica de proteger la privacidad 
                    y confidencialidad de la información médica de nuestros pacientes. Esta Política 
                    de Privacidad describe cómo recopilamos, utilizamos, protegemos y divulgamos 
                    su información personal y de salud, en cumplimiento con las leyes de privacidad 
                    médica de Paraguay y estándares internacionales.
                  </p>
                </CardContent>
              </Card>

              {/* Information Collection */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Información que Recopilamos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Información Médica:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Historial médico y psiquiátrico</li>
                      <li>Síntomas y diagnósticos</li>
                      <li>Medicamentos y tratamientos actuales</li>
                      <li>Resultados de evaluaciones y pruebas</li>
                      <li>Notas de consultas y sesiones de tratamiento</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Información Personal:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Nombre, fecha de nacimiento, documento de identidad</li>
                      <li>Información de contacto (teléfono, email, dirección)</li>
                      <li>Información del seguro médico</li>
                      <li>Contacto de emergencia</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Información Técnica:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Datos de navegación en nuestro sitio web</li>
                      <li>Dirección IP y información del dispositivo</li>
                      <li>Cookies y tecnologías similares</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Use of Information */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Uso de la Información</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Utilizamos su información únicamente para:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Proporcionar atención médica y tratamientos especializados</li>
                    <li>Programar y gestionar citas</li>
                    <li>Comunicarnos sobre su tratamiento y cuidado</li>
                    <li>Facturación y gestión de seguros</li>
                    <li>Cumplir con requisitos legales y regulatorios</li>
                    <li>Mejorar la calidad de nuestros servicios</li>
                    <li>Investigación médica (solo con consentimiento explícito)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Data Protection */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Protección de Datos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Medidas de Seguridad:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Encriptación de datos en tránsito y en reposo</li>
                      <li>Acceso restringido basado en roles</li>
                      <li>Autenticación multifactor para el personal</li>
                      <li>Auditorías regulares de seguridad</li>
                      <li>Copias de seguridad seguras y regulares</li>
                      <li>Capacitación continua del personal en privacidad</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Acceso a la Información:</h4>
                    <p className="text-muted-foreground">
                      Solo el personal médico autorizado y directamente involucrado 
                      en su atención tiene acceso a su información médica. Todo acceso 
                      se registra y audita regularmente.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Rights */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Sus Derechos como Paciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Usted tiene derecho a:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Acceso:</strong> Solicitar una copia de su historial médico</li>
                    <li><strong>Corrección:</strong> Solicitar correcciones a información inexacta</li>
                    <li><strong>Restricción:</strong> Solicitar limitaciones en el uso de su información</li>
                    <li><strong>Portabilidad:</strong> Transferir su historial a otro proveedor</li>
                    <li><strong>Eliminación:</strong> Solicitar la eliminación de datos (sujeto a requisitos legales)</li>
                    <li><strong>Oposición:</strong> Objetar ciertos usos de su información</li>
                    <li><strong>Revocación:</strong> Retirar consentimientos previamente otorgados</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Information Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Compartir Información</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Su información médica puede ser compartida únicamente:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Con su consentimiento explícito por escrito</li>
                    <li>Con otros profesionales médicos involucrados en su atención</li>
                    <li>Con familiares autorizados por usted</li>
                    <li>Cuando sea requerido por ley (orden judicial, autoridades de salud)</li>
                    <li>En situaciones de emergencia médica</li>
                    <li>Para actividades de salud pública autorizadas</li>
                  </ul>
                  
                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      <strong>Importante:</strong> Nunca compartimos información con fines comerciales 
                      o de marketing sin su consentimiento explícito.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Retención de Datos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Historiales médicos:</strong> Se conservan por un mínimo de 10 años según la ley paraguaya</li>
                    <li><strong>Información de contacto:</strong> Se conserva mientras mantenga una relación activa con nosotros</li>
                    <li><strong>Datos web:</strong> Se eliminan después de 2 años de inactividad</li>
                    <li><strong>Investigación:</strong> Solo con consentimiento específico y por períodos definidos</li>
                  </ul>
                </CardContent>
              </Card>

              {/* International Transfers */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Transferencias Internacionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Algunos de nuestros proveedores de servicios tecnológicos pueden estar ubicados 
                    fuera de Paraguay. En estos casos, garantizamos que se implementen las mismas 
                    medidas de protección y que cualquier transferencia cumpla con los estándares 
                    internacionales de protección de datos médicos.
                  </p>
                </CardContent>
              </Card>

              {/* Updates */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Actualizaciones de esta Política</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Esta política puede actualizarse periódicamente para reflejar cambios en nuestras 
                    prácticas o en las leyes aplicables. Le notificaremos sobre cambios significativos 
                    por email o a través de aviso en nuestro sitio web. La fecha de la última 
                    actualización se indica al inicio de este documento.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-6 w-6 mr-2 text-primary" />
                    9. Contacto para Asuntos de Privacidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Para ejercer sus derechos, hacer consultas sobre privacidad o reportar 
                    preocupaciones, contáctenos:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email:</p>
                        <p className="text-muted-foreground">privacidad@neuroinnova.com.py</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Teléfono:</p>
                        <p className="text-muted-foreground">(+595) 21 605 535</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Dirección:</p>
                        <p className="text-muted-foreground">
                          Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera<br />
                          Asunción, Paraguay<br />
                          Attn: Oficial de Privacidad
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Tiempo de respuesta:</strong> Nos comprometemos a responder 
                      a todas las consultas de privacidad dentro de 30 días hábiles.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <Card className="bg-primary/5 border-primary/20 transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardContent className="pt-6">
                  <p className="text-center text-primary font-medium">
                    Su privacidad y confianza son fundamentales para nosotros. 
                    Estamos comprometidos con la protección de su información médica 
                    y el cumplimiento de los más altos estándares de confidencialidad.
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

export default PoliticaPrivacidadPage;