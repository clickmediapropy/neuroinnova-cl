import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Apple, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// SCOFF questionnaire and eating disorder screening questions
const questions = [
  "¿Alguien ha estado preocupado porque usted estaba demasiado delgado/a?",
  "¿Se ha sentido mal consigo mismo/a porque pensó que estaba gordo/a o con sobrepeso?",
  "¿Ha habido momentos en los que pensó en comida o en comer casi todo el tiempo?",
  "¿Ha tenido atracones de comida (comer grandes cantidades en poco tiempo sin poder controlarse)?",
  "¿Se preocupa mucho más que otras personas de su edad por su peso y forma corporal?",
  "¿Qué tanto miedo tiene de ganar 3 kilos?",
  "¿Cuándo fue la última vez que hizo dieta?",
  "Comparado con otras cosas en su vida, ¿qué tan importante es su peso para usted?",
  "¿Ha usado laxantes, diuréticos o pastillas para adelgazar para controlar su peso?",
  "¿Ha vomitado para controlar su peso o forma corporal?",
  "¿Ha hecho ejercicio de manera excesiva para controlar su peso?",
  "¿Cuenta las calorías de todo lo que come?",
  "¿Evita comer cuando tiene hambre?",
  "¿Su estado de ánimo depende de su peso o forma corporal?",
  "¿Se pesa todos los días o varias veces al día?"
];

const getOptionsForQuestion = (questionIndex: number) => {
  if (questionIndex === 5) { // Fear of gaining weight question
    return [
      { label: "No tengo miedo", value: "0", points: 0 },
      { label: "Un poco de miedo", value: "1", points: 1 },
      { label: "Moderadamente asustado/a", value: "2", points: 2 },
      { label: "Muy asustado/a", value: "3", points: 3 },
      { label: "Aterrorizado/a", value: "4", points: 4 }
    ];
  } else if (questionIndex === 6) { // Last diet question
    return [
      { label: "Nunca he hecho dieta", value: "0", points: 0 },
      { label: "Hace un año", value: "1", points: 1 },
      { label: "Hace 6 meses", value: "2", points: 2 },
      { label: "Hace 3 meses", value: "3", points: 3 },
      { label: "Hace 1 mes", value: "4", points: 4 },
      { label: "Estoy a dieta ahora", value: "5", points: 5 }
    ];
  } else if (questionIndex === 7) { // Importance of weight question
    return [
      { label: "No es importante", value: "0", points: 0 },
      { label: "Un poco importante", value: "1", points: 1 },
      { label: "Moderadamente importante", value: "2", points: 2 },
      { label: "Muy importante", value: "3", points: 3 },
      { label: "Lo más importante", value: "4", points: 4 }
    ];
  } else {
    // Standard yes/no questions
    return [
      { label: "No", value: "0", points: 0 },
      { label: "Sí", value: "1", points: 1 }
    ];
  }
};

const TrastornoAlimentarioEvaluacion = () => {
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

  
  // TEMPORARY: Test function for development
  const goToTestResults = () => {
    setAnswers(Array(questions.length).fill(2)); // Fill with test values
    setScore(14); // Test score
    setIsComplete(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentOptions = getOptionsForQuestion(currentQuestion);
  
  if (isComplete) {
    return (
      <AssessmentResults 
        type="eating-disorder"
        score={score}
        onReset={handleReset}
      />
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
            <Apple className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2 text-protected">
          Autoevaluación de Trastornos Alimentarios
        </h1>
        
        <p className="text-center text-protected-muted mb-8">
          Este cuestionario evalúa patrones de alimentación y actitudes hacia el peso y la forma corporal.
          Responda según sus experiencias en los últimos 3 meses.
        </p>
        
        <div className="mb-8">
          <div className="flex justify-between text-sm text-protected-muted mb-2">
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
            {currentOptions.map((option) => (
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
          
          {/* TEMPORARY DEV BUTTON - REMOVE WHEN TESTING IS COMPLETE */}
          <Button
            variant="destructive"
            onClick={goToTestResults}
            className="text-xs"
          >
            🔧 TEST RESULTS
          </Button>
          
          <div className="text-sm text-protected-muted flex items-center">
            Seleccione una respuesta para continuar automáticamente
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrastornoAlimentarioEvaluacion;