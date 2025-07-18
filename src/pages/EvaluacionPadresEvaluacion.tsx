import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Parent screening questions for child's mental health (based on PSC-17)
const questions = [
  "¿Su hijo/a se queja de dolores y molestias?",
  "¿Su hijo/a pasa tiempo solo/a?",
  "¿Su hijo/a se cansa fácilmente, tiene poca energía?",
  "¿Su hijo/a es inquieto/a o hiperactivo/a?",
  "¿Su hijo/a tiene problemas con maestros?",
  "¿A su hijo/a le importa poco la escuela?",
  "¿Su hijo/a actúa como si fuera dirigido por un motor?",
  "¿Su hijo/a sueña despierto/a demasiado?",
  "¿Su hijo/a se distrae fácilmente?",
  "¿Su hijo/a tiene miedo de situaciones nuevas?",
  "¿Su hijo/a se siente triste, infeliz?",
  "¿Su hijo/a es irritable, se enoja?",
  "¿Su hijo/a se siente desesperanzado/a?",
  "¿Su hijo/a tiene dificultad para concentrarse?",
  "¿A su hijo/a le cuesta trabajo hacer amigos?",
  "¿Su hijo/a pelea con otros niños?",
  "¿Su hijo/a no es elegido/a para juegos por otros niños?",
  "¿Su hijo/a culpa a otros por sus problemas?",
  "¿Su hijo/a toma cosas que no le pertenecen?",
  "¿Su hijo/a no obedece las reglas?"
];

const options = [
  { label: "Nunca", value: "0", points: 0 },
  { label: "A veces", value: "1", points: 1 },
  { label: "A menudo", value: "2", points: 2 }
];

const EvaluacionPadresEvaluacion = () => {
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
        type="parent-child-mental-health"
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
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Evaluación: Salud Mental de su Hijo/a
        </h1>
        
        <p className="text-center text-muted-foreground mb-8">
          Esta evaluación está diseñada para padres preocupados por las emociones, 
          atención o comportamientos de su hijo/a. Para niños de 4 a 16 años.
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
            {questions[currentQuestion]}
          </h2>
          
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

export default EvaluacionPadresEvaluacion;