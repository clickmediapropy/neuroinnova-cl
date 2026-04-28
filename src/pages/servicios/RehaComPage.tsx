import { useState } from "react";
import { Brain, Users, Monitor, TrendingUp, Clock, Languages, Award, ChevronRight, HelpCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContactForm from "@/components/forms/ContactForm";
import { useToast } from "@/hooks/use-toast";

const RehaComPage = () => {
  const { toast } = useToast();

  const handleCTA = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "Información de contacto",
        description: "Por favor, complete el formulario al final de la página para más información.",
      });
    }
  };

  const benefits = [
    {
      icon: Brain,
      title: "Entrenamiento Personalizado",
      description: "Software que se adapta automáticamente al nivel cognitivo del paciente"
    },
    {
      icon: Monitor,
      title: "27+ Módulos Especializados",
      description: "Ejercicios específicos para cada función cognitiva en español"
    },
    {
      icon: TrendingUp,
      title: "Seguimiento Objetivo",
      description: "Informes detallados del progreso y rendimiento en cada sesión"
    },
    {
      icon: Users,
      title: "Validación Científica",
      description: "Recomendado por sociedades de neuropsicología alemanas"
    },
    {
      icon: Clock,
      title: "Flexibilidad de Uso",
      description: "Sesiones presenciales o remotas según necesidad del paciente"
    },
    {
      icon: Languages,
      title: "Multilingüe",
      description: "Disponible en 27 idiomas para pacientes de diversas nacionalidades"
    }
  ];

  const conditions = [
    "Accidente Cerebrovascular (ACV)",
    "Traumatismo Craneoencefálico",
    "Esclerosis Múltiple",
    "Enfermedad de Parkinson",
    "Demencia y Alzheimer (fases iniciales)",
    "TDAH en adultos y niños",
    "Esquizofrenia",
    "Depresión con síntomas cognitivos",
    "Deterioro cognitivo post-COVID",
    "Lesiones cerebrales adquiridas"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 neural-bg overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-8 bg-accent text-white text-sm py-1.5 px-4 rounded-full">
                REHABILITACIÓN COGNITIVA AVANZADA
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                RehaCom - Evaluación y Rehabilitación Cognitiva
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
                Software alemán de última generación para rehabilitar y entrenar funciones cognitivas 
                afectadas por lesiones cerebrales, enfermedades neurológicas o trastornos psiquiátricos.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                <strong>Evaluación:</strong> TDAH, Demencias, ACV, Traumatismos de cráneo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleCTA} className="bg-primary hover:bg-primary/90">
                  Solicitar Evaluación
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#como-funciona">
                    <Award className="mr-2 h-5 w-5" />
                    Cómo Funciona
                  </a>
                </Button>
              </div>
            </div>

            {/* Video Section */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Tc2hSJBI1aA?si=fLcLh_Uq1rmKZjWN" 
                  title="RehaCom - Software de Rehabilitación Cognitiva" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-center text-muted-foreground mt-4">
                Conozca cómo funciona RehaCom y sus aplicaciones clínicas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is RehaCom Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Brain className="h-8 w-8 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary">¿Qué es RehaCom?</h2>
            </div>
            
            <p className="mb-6 text-foreground">
              RehaCom es un sistema computarizado de rehabilitación cognitiva desarrollado en Alemania, 
              diseñado específicamente para ayudar a pacientes con déficits cognitivos a recuperar y 
              mejorar sus funciones mentales.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Características Principales:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Software desarrollado por neuropsicólogos con más de 20 años de experiencia clínica</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Sistema adaptativo que ajusta automáticamente la dificultad según el rendimiento del paciente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Más de 27 módulos de entrenamiento disponibles en español</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Validado científicamente y recomendado por sociedades profesionales alemanas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Permite rehabilitación presencial y remota con seguimiento profesional</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>Genera informes detallados del progreso para optimizar el tratamiento</span>
                </li>
              </ul>
            </div>

            <p className="text-foreground">
              El software se adapta al nivel de cada paciente, reduciendo la frustración y maximizando el 
              potencial de recuperación. Cada módulo está diseñado para trabajar funciones cognitivas 
              específicas, permitiendo un tratamiento integral y personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
              Beneficios de RehaCom
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-6 transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles">
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
              Condiciones que Trata RehaCom
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                  <Brain className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{condition}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
                Integración con Otros Tratamientos
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                RehaCom se integra perfectamente con nuestros servicios de neuromodulación (TMS y tDCS), 
                potenciando los resultados de la rehabilitación cognitiva mediante la combinación de 
                estimulación cerebral y entrenamiento cognitivo dirigido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30" id="como-funciona">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
              Proceso de Tratamiento
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Evaluación Inicial",
                  description: "Evaluación neuropsicológica completa para identificar las áreas cognitivas afectadas y establecer objetivos de tratamiento."
                },
                {
                  step: "2",
                  title: "Diseño del Programa",
                  description: "Selección personalizada de módulos RehaCom según las necesidades específicas del paciente y sus objetivos terapéuticos."
                },
                {
                  step: "3",
                  title: "Sesiones de Entrenamiento",
                  description: "Sesiones regulares de 30-45 minutos, 2-3 veces por semana, con ejercicios adaptativos que se ajustan al progreso del paciente."
                },
                {
                  step: "4",
                  title: "Monitoreo y Ajustes",
                  description: "Seguimiento continuo del progreso con informes detallados y ajustes del programa según la evolución del paciente."
                },
                {
                  step: "5",
                  title: "Integración con Vida Diaria",
                  description: "Transferencia de las habilidades entrenadas a las actividades cotidianas, con opción de continuar el entrenamiento desde casa."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
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
              <h2 className="text-3xl font-bold text-primary">Preguntas Frecuentes sobre RehaCom</h2>
            </div>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es RehaCom?</AccordionTrigger>
                <AccordionContent>
                  RehaCom es un software de rehabilitación cognitiva computarizada desarrollado por neuropsicólogos 
                  alemanes con más de 20 años de experiencia. Permite rehabilitar déficits cognitivos en atención, 
                  concentración, memoria y percepción mediante módulos de entrenamiento personalizados.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Para qué condiciones está indicado RehaCom?</AccordionTrigger>
                <AccordionContent>
                  RehaCom está indicado para pacientes con déficits cognitivos resultantes de: accidentes 
                  cerebrovasculares (ACV), traumatismo craneoencefálico, esclerosis múltiple, enfermedades 
                  neurodegenerativas, deterioro cognitivo leve/demencia, TDAH, esquizofrenia, depresión y 
                  trastornos por abuso de sustancias.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Cómo funciona el entrenamiento con RehaCom?</AccordionTrigger>
                <AccordionContent>
                  El software se adapta automáticamente al rendimiento del paciente, ajustando la dificultad 
                  de los ejercicios en tiempo real. Esto reduce la frustración y optimiza el aprendizaje. 
                  Cada sesión dura típicamente entre 30-45 minutos y se realizan 2-3 veces por semana.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>¿Cuáles son los módulos disponibles?</AccordionTrigger>
                <AccordionContent>
                  RehaCom cuenta con más de 27 módulos en español que cubren: atención (dividida, sostenida, 
                  selectiva), memoria (de trabajo, verbal, visual), funciones ejecutivas, campo visual, 
                  percepción espacial, y habilidades visuomotoras, entre otros.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>¿Se puede usar RehaCom de forma remota?</AccordionTrigger>
                <AccordionContent>
                  Sí, RehaCom ofrece licencias por internet que permiten al paciente continuar su entrenamiento 
                  desde casa. El terapeuta puede monitorear el progreso y ajustar el programa de forma remota, 
                  lo cual es ideal para mantener la continuidad del tratamiento.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>¿Cómo se integra RehaCom con otros tratamientos?</AccordionTrigger>
                <AccordionContent>
                  RehaCom complementa perfectamente otros tratamientos como la estimulación transcraneal 
                  (tDCS y TMS). La combinación de neuromodulación con entrenamiento cognitivo potencia los 
                  resultados, especialmente en rehabilitación post-ACV y lesiones cerebrales.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center">
              <p className="mb-6 text-muted-foreground">
                ¿Tiene más preguntas sobre RehaCom? Nuestro equipo está disponible para responder
                todas sus consultas y ayudarle a determinar si este tratamiento es adecuado para usted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="tel:+59521605535">Llámenos: (+595) 21 605 535</a>
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" asChild>
                  <a href="https://wa.me/595983309319?text=Hola,%20me%20interesa%20obtener%20más%20información%20sobre%20RehaCom.%20¿Podrían%20ayudarme%20con%20una%20consulta?" target="_blank" rel="noopener noreferrer">
                    WhatsApp disponible 24/7
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Comience su Rehabilitación Cognitiva Hoy
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            RehaCom ha ayudado a miles de pacientes a recuperar sus funciones cognitivas. 
            Permítanos diseñar un programa personalizado para usted.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={handleCTA}
          >
            Agendar Evaluación Inicial
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Solicite Más Información sobre RehaCom
            </h2>
            <ContactForm 
              variant="default" 
              defaultService="RehaCom - Rehabilitación Cognitiva"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RehaComPage;