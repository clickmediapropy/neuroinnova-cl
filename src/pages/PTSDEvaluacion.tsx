import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// PCL-5 (PTSD Checklist for DSM-5) questions
const questions = [
  "¿Recuerdos repetitivos, perturbadores y no deseados del evento estresante?",
  "¿Sueños repetitivos y perturbadores del evento estresante?",
  "¿Actuar o sentir repentinamente como si el evento estresante estuviera sucediendo nuevamente?",
  "¿Sentirse muy perturbado cuando algo le recuerda el evento estresante?",
  "¿Tener reacciones físicas fuertes cuando algo le recuerda el evento estresante?",
  "¿Evitar recuerdos, pensamientos o sentimientos relacionados con el evento estresante?",
  "¿Evitar recordatorios externos del evento estresante (personas, lugares, conversaciones, actividades, objetos, situaciones)?",
  "¿Problemas para recordar partes importantes del evento estresante?",
  "¿Tener creencias negativas fuertes sobre usted mismo, otras personas o el mundo?",
  "¿Culparse a sí mismo o culpar a alguien más por el evento estresante o lo que sucedió después?",
  "¿Tener sentimientos negativos fuertes como miedo, horror, ira, culpa o vergüenza?",
  "¿Pérdida de interés en actividades que solía disfrutar?",
  "¿Sentirse distante o desconectado de otras personas?",
  "¿Problemas para experimentar sentimientos positivos?",
  "¿Comportamiento irritable, arrebatos de ira o actuar agresivamente?",
  "¿Tomar demasiados riesgos o hacer cosas que podrían causarle daño?",
  "¿Estar súper alerta o vigilante o en guardia?",
  "¿Sentirse nervioso o asustarse fácilmente?",
  "¿Tener dificultad para concentrarse?",
  "¿Problemas para conciliar el sueño o permanecer dormido?"
];

const options = [
  { label: "Para nada", value: "0", points: 0 },
  { label: "Un poco", value: "1", points: 1 },
  { label: "Moderadamente", value: "2", points: 2 },
  { label: "Bastante", value: "3", points: 3 },
  { label: "Extremadamente", value: "4", points: 4 }
];

const PTSDEvaluacion = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // If it's the last question, show results
        const calculatedScore = newAnswers.reduce((sum, answerValue) => sum + parseInt(answerValue || "0"), 0);
        setScore(calculatedScore);
        setIsComplete(true);
      }
    }, 300); // 300ms delay for better UX
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedScore = answers.reduce((sum, value) => sum + parseInt(value || "0"), 0);
      setScore(calculatedScore);
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(""));
    setIsComplete(false);
    setScore(0);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  if (isComplete) {
    return (
      <AssessmentResults 
        type="ptsd"
        score={score}
        onReset={handleReset}
      />
    );
  }
  
  return (
    <Layout>
      <div className="container py-12 max-w-3xl medical-grid-bg">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Autoevaluación de Estrés Postraumático
        </h1>
        
        <p className="text-center text-muted-foreground mb-8">
          Este cuestionario evalúa síntomas relacionados con experiencias traumáticas.
          Responda según cómo se ha sentido durante el último mes.
        </p>
        
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">
            En el último mes, ¿qué tan molesto ha sido por...
          </h2>
          <h3 className="text-lg mb-6">
            {questions[currentQuestion]}
          </h3>
          
          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswerChange}
            className="space-y-4"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50">
                <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="flex-grow cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>
          
          <div className="text-sm text-muted-foreground flex items-center">
            Seleccione una respuesta para continuar automáticamente
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PTSDEvaluacion;