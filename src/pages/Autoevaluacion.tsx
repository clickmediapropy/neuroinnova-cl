import { Brain, Heart, Zap, Shield, Eye, Focus, Apple, AlertTriangle, Baby, Users, Sparkles } from "lucide-react";
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
    details: "Evalúa síntomas depresivos durante las últimas dos semanas.",
    category: "adultos"
  },
  {
    title: "Evaluación de Ansiedad", 
    description: "Basada en el cuestionario GAD-7",
    icon: Heart,
    link: "/autoevaluacion/ansiedad", 
    details: "Evalúa síntomas de ansiedad generalizada.",
    category: "adultos"
  },
  {
    title: "Evaluación de Trastorno Bipolar",
    description: "Detección de episodios maníacos",
    icon: Zap,
    link: "/autoevaluacion/bipolar",
    details: "Identifica posibles episodios de manía o hipomanía.",
    category: "adultos"
  },
  {
    title: "Evaluación de PTSD",
    description: "Estrés postraumático PCL-5", 
    icon: Shield,
    link: "/autoevaluacion/ptsd",
    details: "Evalúa síntomas relacionados con traumas.",
    category: "adultos"
  },
  {
    title: "Evaluación de Psicosis",
    description: "Síntomas psicóticos tempranos",
    icon: Eye,
    link: "/autoevaluacion/psicosis",
    details: "Detecta experiencias perceptuales inusuales.",
    category: "adultos"
  },
  {
    title: "Evaluación de TDAH",
    description: "Trastorno por déficit de atención",
    icon: Focus,
    link: "/autoevaluacion/adhd", 
    details: "Evalúa síntomas de inatención e hiperactividad.",
    category: "adultos"
  },
  {
    title: "Evaluación de Trastornos Alimentarios",
    description: "Patrones alimentarios problemáticos",
    icon: Apple,
    link: "/autoevaluacion/trastorno-alimentario",
    details: "Evalúa la relación con la comida y peso corporal.",
    category: "adultos"
  },
  {
    title: "Evaluación de Uso de Sustancias",
    description: "Patrones de consumo problemático", 
    icon: AlertTriangle,
    link: "/autoevaluacion/adiccion",
    details: "Evalúa el uso de alcohol y otras sustancias.",
    category: "adultos"
  },
  {
    title: "Depresión Postparto",
    description: "Para madres y padres nuevos",
    icon: Baby,
    link: "/autoevaluacion/depresion-postparto",
    details: "Evalúa síntomas durante embarazo y postparto.",
    category: "padres"
  },
  {
    title: "Salud Mental de su Hijo/a",
    description: "Evaluación para padres",
    icon: Users,
    link: "/autoevaluacion/padres-hijos",
    details: "Para padres preocupados por sus hijos (4-16 años).",
    category: "padres"
  },
  {
    title: "Salud Mental Juvenil",
    description: "Para jóvenes de 11-17 años",
    icon: Sparkles,
    link: "/autoevaluacion/jovenes",
    details: "Autoevaluación para adolescentes y jóvenes.",
    category: "jovenes"
  }
];

const Autoevaluacion = () => {
  const adultAssessments = assessments.filter(a => a.category === "adultos");
  const parentAssessments = assessments.filter(a => a.category === "padres");
  const youthAssessments = assessments.filter(a => a.category === "jovenes");

  const renderAssessmentCards = (assessmentList: typeof assessments) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assessmentList.map((assessment, index) => {
        const IconComponent = assessment.icon;
        return (
          <Card key={index} className="shadow-md transition-all duration-300 hover:shadow-md hover:border-primary/30 card-hover-effect service-particles h-full">
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
  );
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

        <div className="max-w-6xl mx-auto">
          {/* Adult Assessments */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Evaluaciones para Adultos</h2>
            {renderAssessmentCards(adultAssessments)}
          </div>

          {/* Parent/Family Assessments */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Evaluaciones para Padres y Familia</h2>
            {renderAssessmentCards(parentAssessments)}
          </div>

          {/* Youth Assessments */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Evaluaciones para Jóvenes (11-17 años)</h2>
            {renderAssessmentCards(youthAssessments)}
          </div>
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