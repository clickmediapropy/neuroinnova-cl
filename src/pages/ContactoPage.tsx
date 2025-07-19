import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Car, Accessibility, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/forms/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ContactoPage = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Respuesta inmediata",
      detail: "(+595) 991 800 886",
      action: "Enviar Mensaje",
      href: "https://wa.me/595991800886?text=Hola,%20me%20gustaría%20obtener%20información%20sobre%20sus%20servicios%20y%20horarios%20de%20atención.",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Llamada directa",
      detail: "(+595) 21 605 535",
      action: "Llamar Ahora",
      href: "tel:+59521605535",
      color: "bg-primary hover:bg-primary/90"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Consultas por escrito",
      detail: "info@neuroinnova.com.py",
      action: "Enviar Email",
      href: "mailto:info@neuroinnova.com.py",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: MapPin,
      title: "Visítanos",
      description: "Clínica IMA",
      detail: "Dr. Eduardo López Moreira 4612",
      action: "Ver Ubicación",
      href: "#mapa",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  const faqs = [
    {
      id: "primera-consulta",
      question: "¿Qué debo traer a mi primera consulta?",
      answer: "Traiga estudios previos, lista de medicamentos actuales, informes médicos anteriores y documento de identidad. Si tiene seguro médico, traiga también su carnet."
    },
    {
      id: "tiempo-consulta",
      question: "¿Cuánto tiempo dura la primera consulta?",
      answer: "La evaluación inicial dura aproximadamente 60-90 minutos. Esto nos permite hacer una evaluación completa y discutir opciones de tratamiento personalizadas."
    },
    {
      id: "preparacion",
      question: "¿Necesito alguna preparación especial?",
      answer: "No se requiere preparación especial. Es útil hacer una lista de sus síntomas, preocupaciones y preguntas que desee discutir durante la consulta."
    },
    {
      id: "costo",
      question: "¿Cuál es el costo de la consulta?",
      answer: "Los costos varían según el tipo de evaluación. Contáctenos para información específica sobre precios y opciones de pago disponibles."
    },
    {
      id: "cancelacion",
      question: "¿Puedo cancelar o reprogramar mi cita?",
      answer: "Sí, puede cancelar o reprogramar con al menos 24 horas de anticipación. Contáctenos por WhatsApp o teléfono para hacer cambios en su cita."
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <Layout>
      <div className="min-h-screen contact-tech-bg">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Contáctenos
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Estamos aquí para ayudarle. Elija el método de contacto que prefiera 
                y obtenga la atención especializada que necesita.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-foreground mb-4">{method.detail}</p>
                    <Button asChild className={method.color}>
                      <a href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined} rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {method.action}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Envíenos un Mensaje
                </h2>
                <p className="text-muted-foreground mb-8">
                  Complete el formulario y nos pondremos en contacto con usted a la brevedad.
                </p>
                <ContactForm 
                  variant="default"
                  sourcePage="/contacto"
                  webhookUrl="https://placeholder-webhook.com"
                  defaultService=""
                />
              </div>

              {/* Office Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-primary" />
                    Horarios de Atención
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Lunes a Viernes:</strong> 8:00 - 18:00</p>
                    <p><strong>Sábados:</strong> 8:00 - 12:00</p>
                    <p><strong>Domingos:</strong> Cerrado</p>
                    <p className="text-sm mt-4 text-primary">
                      *Para urgencias fuera del horario, contáctenos por WhatsApp
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                    <Car className="h-6 w-6 mr-2 text-primary" />
                    Estacionamiento
                  </h3>
                  <p className="text-muted-foreground">
                    Estacionamiento gratuito disponible en las instalaciones de Clínica IMA. 
                    Espacios amplios y seguros para su comodidad.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                    <Accessibility className="h-6 w-6 mr-2 text-primary" />
                    Accesibilidad
                  </h3>
                  <p className="text-muted-foreground">
                    Nuestras instalaciones cuentan con acceso para personas con movilidad reducida, 
                    incluyendo rampas y ascensores. Estamos comprometidos con la accesibilidad universal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="mapa" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              Nuestra Ubicación
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-6 w-6 mr-2 text-primary" />
                    Clínica IMA
                  </CardTitle>
                  <CardDescription>
                    Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera, Asunción, Paraguay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.517542285252!2d-57.5877!3d-25.2637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da8b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sDr.+Eduardo+L%C3%B3pez+Moreira+4612%2C+Asunci%C3%B3n%2C+Paraguay!5e0!3m2!1ses!2spy!4v1705584000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de NeuroInnova en Clínica IMA"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <Button asChild variant="outline">
                      <a 
                        href="https://maps.google.com/?q=Dr.+Eduardo+L%C3%B3pez+Moreira+4612+esq.+Legi%C3%B3n+Civil+Extranjera,+Asunci%C3%B3n,+Paraguay"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver en Google Maps
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-8 flex items-center justify-center">
                <HelpCircle className="h-8 w-8 mr-3 text-primary" />
                Preguntas Frecuentes sobre Primera Visita
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Collapsible
                    key={faq.id}
                    open={openFaq === faq.id}
                    onOpenChange={() => toggleFaq(faq.id)}
                  >
                    <Card>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                          <CardTitle className="flex items-center justify-between text-left">
                            <span>{faq.question}</span>
                            {openFaq === faq.id ? (
                              <ChevronUp className="h-5 w-5 text-primary" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-primary" />
                            )}
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="bg-primary/5 border-primary/20 transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    ¿Necesita Atención Urgente?
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Para emergencias psiquiátricas o consultas urgentes fuera del horario de atención
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button size="lg" variant="destructive" className="w-full" asChild>
                      <a href="tel:147" className="flex items-center justify-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Emergencias: 147
                      </a>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Línea nacional de emergencias del gobierno
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600 w-full" asChild>
                      <a href="https://wa.me/595991800886?text=URGENCIA:%20Necesito%20ayuda%20inmediata%20con%20una%20situación%20de%20salud%20mental." target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp de Urgencias
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Disponible 24/7 para situaciones que requieren atención inmediata
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactoPage;