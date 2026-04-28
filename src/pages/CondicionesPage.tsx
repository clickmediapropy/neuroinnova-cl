import React from "react";
import { Brain, AlertTriangle, RotateCcw, Activity, Heart, ArrowRight, Users, Zap, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CondicionesPage = () => {
  const condiciones = [
    {
      id: "depresion-resistente",
      title: "Depresión Resistente al Tratamiento",
      description: "Cuando los antidepresivos tradicionales no han funcionado después de múltiples intentos, ofrecemos alternativas avanzadas como EMT/TMS.",
      icon: <Brain className="h-8 w-8 text-primary" />,
      badge: "MÁS COMÚN",
      symptoms: [
        "Falta de respuesta a 2+ medicamentos",
        "Síntomas persistentes por meses",
        "Efectos secundarios intolerables",
        "Pérdida de esperanza en tratamientos"
      ],
      treatments: ["EMT/TMS"],
      url: "/condiciones/depresion-resistente",
      featured: true
    },
    {
      id: "ansiedad",
      title: "Trastornos de Ansiedad",
      description: "Ansiedad generalizada, ataques de pánico y fobias que interfieren significativamente con la vida diaria.",
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
      symptoms: [
        "Preocupación excesiva constante",
        "Ataques de pánico recurrentes",
        "Evitación de situaciones sociales",
        "Síntomas físicos (palpitaciones, sudoración)"
      ],
      treatments: ["EMT/TMS", "tDCS"],
      url: "/condiciones/ansiedad"
    },
    {
      id: "toc",
      title: "Trastorno Obsesivo Compulsivo (TOC)",
      description: "Pensamientos obsesivos y comportamientos compulsivos que causan angustia significativa y dificultan el funcionamiento diario.",
      icon: <RotateCcw className="h-8 w-8 text-primary" />,
      symptoms: [
        "Pensamientos intrusivos repetitivos",
        "Rituales o comportamientos compulsivos",
        "Ansiedad extrema al no realizar rituales",
        "Tiempo excesivo en actividades obsesivas"
      ],
      treatments: ["EMT/TMS"],
      url: "/condiciones/toc"
    },
    {
      id: "dolor-cronico",
      title: "Dolor Crónico",
      description: "Dolor persistente que no responde adecuadamente a tratamientos convencionales y afecta la calidad de vida.",
      icon: <Activity className="h-8 w-8 text-primary" />,
      symptoms: [
        "Dolor constante por más de 3-6 meses",
        "Resistencia a analgésicos tradicionales",
        "Limitación funcional significativa",
        "Impacto en el estado de ánimo"
      ],
      treatments: ["tDCS"],
      url: "/condiciones/dolor-cronico"
    },
    {
      id: "rehabilitacion-post-acv",
      title: "Rehabilitación Post-ACV",
      description: "Recuperación neurológica después de accidente cerebrovascular para mejorar función motora y cognitiva.",
      icon: <Heart className="h-8 w-8 text-primary" />,
      symptoms: [
        "Déficits motores residuales",
        "Problemas del habla o lenguaje",
        "Dificultades cognitivas",
        "Limitaciones en actividades diarias"
      ],
      treatments: ["tDCS"],
      url: "/condiciones/rehabilitacion-post-acv"
    },
    {
      id: "parkinson",
      title: "Párkinson",
      description: "Tratamiento con neuromodulación para mejorar síntomas motores y no motores de la enfermedad de Parkinson.",
      icon: <Users className="h-8 w-8 text-primary" />,
      symptoms: [
        "Temblor en reposo",
        "Rigidez muscular",
        "Bradicinesia (lentitud de movimientos)",
        "Alteraciones del equilibrio"
      ],
      treatments: ["EMT/TMS", "tDCS"],
      url: "/condiciones/parkinson"
    },
    {
      id: "fibromialgia",
      title: "Fibromialgia",
      description: "Alivio del dolor generalizado y síntomas asociados mediante técnicas de neuromodulación no invasiva.",
      icon: <Zap className="h-8 w-8 text-primary" />,
      symptoms: [
        "Dolor muscular generalizado",
        "Fatiga crónica",
        "Problemas de sueño",
        "Dificultades cognitivas (fibro-niebla)"
      ],
      treatments: ["tDCS", "EMT/TMS"],
      url: "/condiciones/fibromialgia"
    },
    {
      id: "adicciones",
      title: "Adicciones",
      description: "Tratamiento complementario para adicciones mediante neuromodulación de circuitos cerebrales de recompensa.",
      icon: <Pill className="h-8 w-8 text-primary" />,
      symptoms: [
        "Deseo intenso de consumo",
        "Pérdida de control",
        "Síndrome de abstinencia",
        "Recaídas frecuentes"
      ],
      treatments: ["EMT/TMS", "tDCS"],
      url: "/condiciones/adicciones"
    }
  ];

  const treatmentMap = {
    "EMT/TMS": {
      name: "EMT/TMS",
      description: "Estimulación Magnética Transcraneal",
      url: "/servicios/emt-tms",
      badge: "Exclusivo"
    },
    "tDCS": {
      name: "tDCS",
      description: "Estimulación por Corriente Directa",
      url: "/servicios/tdcs",
      badge: "Innovador"
    }
  };

  return (
    <Layout>
      <div className="min-h-screen hero-animated-bg">
        {/* Hero Section */}
        <section className="pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 neural-bg">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight text-balance">
                Condiciones que Tratamos
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Especializados en condiciones de salud mental y neurológicas que requieren
                enfoques avanzados cuando los tratamientos tradicionales no son suficientes
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/autoevaluacion">Evaluación Gratuita</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <a
                    href={buildWhatsAppUrl("Hola, me gustaría una consulta especializada para evaluar tratamiento de neuromodulación.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consulta Especializada
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Grid */}
        <section className="pb-12 sm:pb-16">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-5 sm:gap-6">
                {condiciones.map((condicion, index) => (
                  <Card
                    key={condicion.id}
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles ${
                      condicion.featured ? 'border-primary/20 bg-primary/5' : ''
                    }`}
                  >
                    {condicion.badge && (
                      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10">
                        <Badge variant="secondary" className="bg-orange-500 text-white text-[10px] sm:text-xs">
                          {condicion.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-5 sm:gap-8 p-4 sm:p-6 md:p-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-5 sm:space-y-6 min-w-0">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 p-2.5 sm:p-3 bg-primary/10 rounded-xl">
                            {condicion.icon}
                          </div>
                          <div className="flex-1 min-w-0 pr-20 sm:pr-24">
                            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                              {condicion.title}
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              {condicion.description}
                            </CardDescription>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                          {/* Symptoms */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground">Síntomas principales:</h4>
                            <ul className="space-y-2">
                              {condicion.symptoms.map((symptom, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Treatments */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground">Tratamientos disponibles:</h4>
                            <div className="space-y-2">
                              {condicion.treatments.map((treatment, idx) => {
                                const treatmentInfo = treatmentMap[treatment];
                                return (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                                    <Link 
                                      to={treatmentInfo.url}
                                      className="text-sm text-primary hover:underline font-medium"
                                    >
                                      {treatmentInfo.name}
                                    </Link>
                                    {treatmentInfo.badge && (
                                      <Badge variant="outline" className="text-xs">
                                        {treatmentInfo.badge}
                                      </Badge>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 sm:pt-4">
                          <Button asChild className="group w-full sm:w-auto">
                            <Link to={condicion.url}>
                              Más Información
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      {/* Side Stats/Info */}
                      <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto">
                            {React.cloneElement(condicion.icon, { 
                              className: "h-16 w-16 text-primary" 
                            })}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              Tratamientos especializados disponibles
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              {condicion.treatments.length}
                            </p>
                          </div>
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
        <section className="py-12 sm:py-16 bg-primary/5">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                ¿No encuentra su condición aquí?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Nuestros especialistas evalúan cada caso individualmente. Muchas condiciones
                neuropsiquiátricas pueden beneficiarse de nuestros tratamientos avanzados.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <a
                    href={buildWhatsAppUrl("Hola, me gustaría una consulta de evaluación para definir el mejor tratamiento de neuromodulación.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consulta de Evaluación
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/contacto">WhatsApp disponible 24/7</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Assessment CTA */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-5 sm:p-8 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 leading-tight">
                    Evaluación Gratuita Online
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                    Complete nuestras evaluaciones para depresión y ansiedad.
                    Los resultados nos ayudan a entender mejor su situación.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Button asChild className="w-full sm:w-auto">
                      <Link to="/autoevaluacion/depresion">Evaluación de Depresión</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                      <Link to="/autoevaluacion/ansiedad">Evaluación de Ansiedad</Link>
                    </Button>
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

export default CondicionesPage;