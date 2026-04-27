import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import QuestionCard from "@/components/assessment/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAssessmentQuestions } from "@/data/assessmentQuestions";

// Obtener preguntas mejoradas del archivo de datos
const questionData = getAssessmentQuestions('anxiety');

const options = [
  { label: "Nunca", value: "0", points: 0 },
  { label: "Varios días", value: "1", points: 1 },
  { label: "Más de la mitad de los días", value: "2", points: 2 },
  { label: "Casi todos los días", value: "3", points: 3 }
];

const AnsiedadEvaluacion = () => {
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
  
  if (isComplete) {
    return (
      <AssessmentResults 
        type="anxiety"
        score={score}
        onReset={handleReset}
      />
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 sm:py-10 max-w-3xl">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2 leading-tight">
          Autoevaluación de Ansiedad
        </h1>
        
        <p className="text-sm sm:text-base text-center text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
          Este cuestionario le ayudará a evaluar si padece de algún estado de ansiedad.
          Responda según cómo se ha sentido durante las últimas dos semanas.
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
          options={options}
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

export default AnsiedadEvaluacion;