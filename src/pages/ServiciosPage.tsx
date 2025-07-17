import React from "react";
import { Zap, Brain, Stethoscope, ArrowRight } from "lucide-react";
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
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
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
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {servicios.map((servicio, index) => (
                  <Card 
                    key={servicio.id} 
                    className={`relative overflow-hidden transition-all hover:shadow-lg ${
                      servicio.featured ? 'border-primary/20 bg-primary/5' : ''
                    }`}
                  >
                    {servicio.badge && (
                      <div className="absolute top-6 right-6 z-10">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          {servicio.badge}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      {/* Content */}
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
                            {servicio.icon}
                          </div>
                          <div className="flex-1 min-w-0 pr-16">
                            <CardTitle className="text-2xl font-bold text-foreground mb-3">
                              {servicio.title}
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">
                              {servicio.description}
                            </CardDescription>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground">Características principales:</h4>
                          <ul className="space-y-2">
                            {servicio.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <Button asChild className="group">
                            <Link to={servicio.url}>
                              Más Información
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Visual/Stats */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          {servicio.id === "emt-tms" && (
                            <div className="w-[576px] h-[576px] rounded-full overflow-hidden shadow-lg">
                              <img 
                                src="/lovable-uploads/b5a6f141-5909-42f4-8f59-c3d1cad59c14.png"
                                alt="Tratamiento EMT/TMS"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {servicio.id === "tdcs" && (
                            <div className="w-[576px] h-[576px] rounded-full overflow-hidden shadow-lg">
                              <img 
                                src="/lovable-uploads/be3fcff2-e9c7-4a0a-94c7-c3e36bd16ccf.png"
                                alt="Tratamiento tDCS"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {servicio.id === "psiquiatria" && (
                            <div className="w-[576px] h-[576px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                              <div className="w-96 h-96 bg-white rounded-full shadow-lg flex items-center justify-center">
                                {React.cloneElement(servicio.icon, { 
                                  className: "h-48 w-48 text-primary" 
                                })}
                              </div>
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
        <section className="py-16 bg-primary/5">
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