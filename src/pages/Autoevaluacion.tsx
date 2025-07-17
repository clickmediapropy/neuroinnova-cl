import { Brain, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Autoevaluacion = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Evaluaciones de Salud Mental
          </h1>
          <p className="text-lg text-muted-foreground">
            Estas evaluaciones le ayudarán a conocer su estado de salud mental actual. 
            Son herramientas validadas clínicamente que pueden servir como un primer paso 
            para identificar si necesita buscar ayuda profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Depression Assessment Card */}
          <Card className="shadow-md transition-all hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Evaluación de Depresión</CardTitle>
              <CardDescription className="text-center">
                Basada en el cuestionario PHQ-9
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Este cuestionario lo ayudará a evaluar si padece de algún estado de depresión. 
                Responda según cómo se ha sentido durante las últimas dos semanas.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button asChild>
                <Link to="/autoevaluacion/depresion">Comenzar Evaluación</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Anxiety Assessment Card */}
          <Card className="shadow-md transition-all hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-center mb-3">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Evaluación de Ansiedad</CardTitle>
              <CardDescription className="text-center">
                Basada en el cuestionario GAD-7
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Este cuestionario lo ayudará a evaluar si padece de algún estado de ansiedad. 
                Responda según cómo se ha sentido durante las últimas dos semanas.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button asChild>
                <Link to="/autoevaluacion/ansiedad">Comenzar Evaluación</Link>
              </Button>
            </CardFooter>
          </Card>
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