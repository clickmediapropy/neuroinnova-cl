import React from "react";
import { Zap, Brain, Stethoscope, Monitor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ServiciosPage = () => {
  const servicios = [
    {
      id: "emt-tms",
      title: "Estimulación Magnética Transcraneal (EMT/TMS)",
      description: "Tecnología no invasiva que utiliza campos magnéticos para estimular áreas específicas del cerebro, efectiva para depresión resistente a medicamentos.",
      icon: <Zap className="h-8 w-8 text-primary" />,
      badge: "EXCLUSIVO EN PARAGUAY",
      features: [
        "Tratamiento no invasivo y sin dolor",
        "Sin efectos secundarios sistémicos", 
        "Aprobado por FDA y CE",
        "Efectivo para depresión resistente",
        "Sesiones ambulatorias de 20-40 minutos"
      ],
      url: "/servicios/emt-tms",
      featured: true
    },
    {
      id: "tdcs",
      title: "Estimulación Transcraneal por Corriente Directa (tDCS)",
      description: "Técnica de neuromodulación que aplica corriente eléctrica de baja intensidad para modular la actividad neuronal y estimular la plasticidad cerebral.",
      icon: <Brain className="h-8 w-8 text-primary" />,
      badge: "PIONERO EN PARAGUAY",
      features: [
        "Rehabilitación neurológica",
        "Manejo del dolor crónico",
        "Estimulación cognitiva",
        "Procedimiento no invasivo",
        "Se puede combinar con otras terapias"
      ],
      url: "/servicios/tdcs"
    },
    {
      id: "psiquiatria",
      title: "Consulta Psiquiátrica Tradicional",
      description: "Atención psiquiátrica integral con enfoque en el diagnóstico preciso y manejo personalizado de condiciones de salud mental.",
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      features: [
        "Evaluación psiquiátrica completa",
        "Manejo de medicamentos",
        "Integración con psicoterapia",
        "Planificación de tratamiento continuo",
        "Apoyo familiar cuando sea necesario"
      ],
      url: "/servicios/psiquiatria-tradicional"
    },
    {
      id: "rehacom",
      title: "RehaCom - Rehabilitación Cognitiva",
      description: "Software alemán especializado para rehabilitación de funciones cognitivas afectadas por lesiones cerebrales o trastornos neurológicos.",
      icon: <Monitor className="h-8 w-8 text-primary" />,
      badge: "REHABILITACIÓN COGNITIVA AVANZADA",
      features: [
        "27+ módulos especializados en español",
        "Entrenamiento adaptativo personalizado",
        "Ideal para post-ACV y lesiones cerebrales",
        "Seguimiento remoto del progreso",
        "Complementa terapias de neuromodulación"
      ],
      url: "/servicios/rehacom"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen hero-animated-bg">
        {/* Hero Section */}
        <section className="pt-24 pb-16 neural-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Nuestros Servicios
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Tecnologías avanzadas de neuromodulación y atención psiquiátrica integral 
                para tratar condiciones resistentes a terapias convencionales
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/agendar-consulta">Agendar Consulta</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/autoevaluacion">Evaluación Gratuita</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-16 neural-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {servicios.map((servicio, index) => (
                  <Card 
                    key={servicio.id} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles ${
                      servicio.featured ? 'border-primary/20 bg-primary/5' : ''
                    }`}
                  >
                     {servicio.badge && (
                       <div className="absolute top-3 right-3 md:top-6 md:right-6 z-10">
                         <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs md:text-sm">
                           {servicio.badge}
                         </Badge>
                       </div>
                     )}
                    
                    <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
                      {/* Content */}
                      <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                        <div className="flex items-start space-x-3 md:space-x-4">
                          <div className="flex-shrink-0 p-2 md:p-3 bg-primary/10 rounded-xl">
                            {React.cloneElement(servicio.icon, { 
                              className: "h-6 w-6 md:h-8 md:w-8 text-primary" 
                            })}
                          </div>
                          <div className="flex-1 min-w-0 pr-8 md:pr-16">
                            <CardTitle className="text-xl md:text-2xl font-bold text-foreground mb-2 md:mb-3">
                              {servicio.title}
                            </CardTitle>
                            <CardDescription className="text-sm md:text-base text-muted-foreground">
                              {servicio.description}
                            </CardDescription>
                          </div>
                        </div>

                        <div className="space-y-3 md:space-y-4">
                          <h4 className="font-semibold text-foreground text-sm md:text-base">Características principales:</h4>
                          <ul className="space-y-2">
                            {servicio.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-2 md:space-x-3">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2 flex-shrink-0" />
                                <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 md:pt-4">
                          <Button asChild className="group w-full md:w-auto">
                            <Link to={servicio.url}>
                              Más Información
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Visual/Stats */}
                      <div className="flex items-center justify-center order-1 md:order-2 py-4 md:py-0">
                        <div className="relative">
                          {servicio.id === "emt-tms" && (
                            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-lg">
                              <img 
                                src="/lovable-uploads/b5a6f141-5909-42f4-8f59-c3d1cad59c14.png"
                                alt="Tratamiento EMT/TMS"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {servicio.id === "tdcs" && (
                            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-lg">
                              <img 
                                src="/lovable-uploads/be3fcff2-e9c7-4a0a-94c7-c3e36bd16ccf.png"
                                alt="Tratamiento tDCS"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {servicio.id === "psiquiatria" && (
                            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-lg">
                              <img 
                                src="/lovable-uploads/613be515-831a-4a66-ba32-1bd4ba4fb034.png"
                                alt="Consulta Psiquiátrica - Dr. Victor Adorno"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {servicio.id === "rehacom" && (
                            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center">
                              <Monitor className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-primary opacity-80" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 assessment-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                ¿No está seguro qué tratamiento es el adecuado?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nuestros especialistas pueden evaluar su caso y recomendar el mejor enfoque 
                terapéutico según sus necesidades específicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/agendar-consulta">Consulta de Evaluación</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contacto">Más Información</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ServiciosPage;