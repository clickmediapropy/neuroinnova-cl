import { useEffect } from "react";
import { Calendar, Clock, Shield, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AgendarConsultaPage = () => {
  useEffect(() => {
    // Load GoHighLevel widget script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen hero-animated-bg">
        {/* Header */}
        <section className="pt-24 pb-8 neural-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Agendar Consulta
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Reserve su cita en línea de manera rápida y sencilla. Seleccione el servicio, fecha y horario que mejor se adapte a sus necesidades.
              </p>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardContent className="pt-6">
                    <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Disponibilidad en Tiempo Real</h3>
                    <p className="text-muted-foreground">
                      Vea los horarios disponibles actualizados al instante
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Confirmación Inmediata</h3>
                    <p className="text-muted-foreground">
                      Reciba confirmación de su cita al momento de agendar
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardContent className="pt-6">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Proceso Seguro</h3>
                    <p className="text-muted-foreground">
                      Sus datos están protegidos con los más altos estándares de seguridad
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* GoHighLevel Calendar Widget */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <iframe 
                    src="https://api.leadconnectorhq.com/widget/booking/Ei49mHpaTGZZ9SlrERGm" 
                    style={{ width: '100%', minHeight: '450px', border: 'none', overflow: 'hidden' }}
                    scrolling="no" 
                    id="Ei49mHpaTGZZ9SlrERGm_1752904247532"
                    className="md:min-h-[600px]"
                  />
                </CardContent>
              </Card>

              {/* Additional Information */}
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      Información Importante
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">
                      • Primera consulta: 90 minutos de evaluación completa
                    </p>
                    <p className="text-muted-foreground">
                      • Consultas de seguimiento: 30-60 minutos según el servicio
                    </p>
                    <p className="text-muted-foreground">
                      • Recibirá recordatorios por SMS y email antes de su cita
                    </p>
                    <p className="text-muted-foreground">
                      • Puede cancelar o reprogramar hasta 24 horas antes
                    </p>
                  </CardContent>
                </Card>

                <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardHeader>
                    <CardTitle>¿Necesita Ayuda?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Si tiene dificultades para agendar en línea o necesita asistencia personalizada, 
                      no dude en contactarnos directamente.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <a href="tel:+595991800886" className="flex items-center justify-center">
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Llamar al +595 991 800 886
                        </a>
                      </Button>
                      <Button asChild className="bg-green-500 hover:bg-green-600">
                        <a 
                          href="https://wa.me/595991800886?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20médica%20especializada.%20¿Podrían%20ayudarme%20con%20el%20proceso%20de%20agendamiento?"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AgendarConsultaPage;