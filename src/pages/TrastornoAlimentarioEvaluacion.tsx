import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Apple, ChevronLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import QuestionCard from "@/components/assessment/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAssessmentQuestions } from "@/data/assessmentQuestions";

// Obtener preguntas mejoradas del archivo de datos
const questionData = getAssessmentQuestions('eatingDisorder');

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
  const [answers, setAnswers] = useState<string[]>(Array(questionData.length).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questionData.length - 1) {
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
    if (currentQuestion < questionData.length - 1) {
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
    setAnswers(Array(questionData.length).fill(""));
    setIsComplete(false);
    setScore(0);
  };
  const progress = ((currentQuestion + 1) / questionData.length) * 100;
  const currentOptions = getOptionsForQuestion(currentQuestion);
  
  if (isComplete) {
    return (
      <AssessmentResults 
        type="eatingDisorder"
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
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2 leading-tight">
          Autoevaluación de Trastornos Alimentarios
        </h1>
        
        <p className="text-sm sm:text-base text-center text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          Este cuestionario evalúa patrones de alimentación y actitudes hacia el peso y la forma corporal.
          Responda según sus experiencias en los últimos 3 meses.
        </p>
        
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Pregunta {currentQuestion + 1} de {questionData.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <QuestionCard
          question={questionData[currentQuestion].question}
          description={questionData[currentQuestion].description}
          examples={questionData[currentQuestion].examples}
          options={currentOptions}
          value={answers[currentQuestion]}
          onValueChange={handleAnswerChange}
        />
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-stretch sm:items-center gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center justify-center w-full sm:w-auto"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>
          
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            Seleccione una respuesta para continuar automáticamente
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrastornoAlimentarioEvaluacion;