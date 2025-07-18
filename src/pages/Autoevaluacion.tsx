import { Brain, Heart, Zap, Shield, Eye, Focus, Apple, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const assessments = [
  {
    title: "Evaluación de Depresión",
    description: "Basada en el cuestionario PHQ-9",
    icon: Brain,
    link: "/autoevaluacion/depresion",
    details: "Evalúa síntomas depresivos durante las últimas dos semanas."
  },
  {
    title: "Evaluación de Ansiedad", 
    description: "Basada en el cuestionario GAD-7",
    icon: Heart,
    link: "/autoevaluacion/ansiedad", 
    details: "Evalúa síntomas de ansiedad generalizada."
  },
  {
    title: "Evaluación de Trastorno Bipolar",
    description: "Detección de episodios maníacos",
    icon: Zap,
    link: "/autoevaluacion/bipolar",
    details: "Identifica posibles episodios de manía o hipomanía."
  },
  {
    title: "Evaluación de PTSD",
    description: "Estrés postraumático PCL-5", 
    icon: Shield,
    link: "/autoevaluacion/ptsd",
    details: "Evalúa síntomas relacionados con traumas."
  },
  {
    title: "Evaluación de Psicosis",
    description: "Síntomas psicóticos tempranos",
    icon: Eye,
    link: "/autoevaluacion/psicosis",
    details: "Detecta experiencias perceptuales inusuales."
  },
  {
    title: "Evaluación de TDAH",
    description: "Trastorno por déficit de atención",
    icon: Focus,
    link: "/autoevaluacion/adhd", 
    details: "Evalúa síntomas de inatención e hiperactividad."
  },
  {
    title: "Evaluación de Trastornos Alimentarios",
    description: "Patrones alimentarios problemáticos",
    icon: Apple,
    link: "/autoevaluacion/trastorno-alimentario",
    details: "Evalúa la relación con la comida y peso corporal."
  },
  {
    title: "Evaluación de Uso de Sustancias",
    description: "Patrones de consumo problemático", 
    icon: AlertTriangle,
    link: "/autoevaluacion/adiccion",
    details: "Evalúa el uso de alcohol y otras sustancias."
  }
];

const Autoevaluacion = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Evaluaciones de Salud Mental
          </h1>
          <p className="text-lg text-muted-foreground">
            Estas evaluaciones le ayudarán a conocer su estado de salud mental actual. 
            Son herramientas validadas clínicamente que pueden servir como un primer paso 
            para identificar si necesita buscar ayuda profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {assessments.map((assessment, index) => {
            const IconComponent = assessment.icon;
            return (
              <Card key={index} className="shadow-md transition-all hover:shadow-lg h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center">{assessment.title}</CardTitle>
                  <CardDescription className="text-center">
                    {assessment.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-sm">
                  <p>{assessment.details}</p>
                </CardContent>
                <CardFooter className="flex justify-center pb-6">
                  <Button asChild>
                    <Link to={assessment.link}>Comenzar Evaluación</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-muted-foreground font-medium">
              <strong>Importante:</strong> Estas evaluaciones no reemplazan un diagnóstico profesional. 
              Si está experimentando dificultades emocionales o psicológicas, le recomendamos buscar 
              ayuda de un profesional de la salud mental.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Autoevaluacion;