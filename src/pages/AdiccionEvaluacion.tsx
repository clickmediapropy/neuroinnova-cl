import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import QuestionCard from "@/components/assessment/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAssessmentQuestions } from "@/data/assessmentQuestions";

// Obtener preguntas mejoradas del archivo de datos
const questionData = getAssessmentQuestions('addiction');

const getOptionsForQuestion = (questionIndex: number) => {
  if (questionIndex === 0) { // Frequency of drinking
    return [
      { label: "Nunca", value: "0", points: 0 },
      { label: "Una vez al mes o menos", value: "1", points: 1 },
      { label: "2-4 veces al mes", value: "2", points: 2 },
      { label: "2-3 veces por semana", value: "3", points: 3 },
      { label: "4 o más veces por semana", value: "4", points: 4 }
    ];
  } else if (questionIndex === 1) { // Number of drinks
    return [
      { label: "1-2", value: "0", points: 0 },
      { label: "3-4", value: "1", points: 1 },
      { label: "5-6", value: "2", points: 2 },
      { label: "7-9", value: "3", points: 3 },
      { label: "10 o más", value: "4", points: 4 }
    ];
  } else if (questionIndex <= 7) { // AUDIT frequency questions
    return [
      { label: "Nunca", value: "0", points: 0 },
      { label: "Menos de una vez al mes", value: "1", points: 1 },
      { label: "Mensualmente", value: "2", points: 2 },
      { label: "Semanalmente", value: "3", points: 3 },
      { label: "A diario o casi a diario", value: "4", points: 4 }
    ];
  } else if (questionIndex <= 9) { // AUDIT yes/no questions
    return [
      { label: "No", value: "0", points: 0 },
      { label: "Sí, pero no en el último año", value: "2", points: 2 },
      { label: "Sí, en el último año", value: "4", points: 4 }
    ];
  } else { // Drug use questions
    return [
      { label: "Nunca", value: "0", points: 0 },
      { label: "Rara vez", value: "1", points: 1 },
      { label: "A veces", value: "2", points: 2 },
      { label: "Frecuentemente", value: "3", points: 3 },
      { label: "Muy frecuentemente", value: "4", points: 4 }
    ];
  }
};

const AdiccionEvaluacion = () => {
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
        type="addiction"
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
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Autoevaluación de Uso de Sustancias
        </h1>
        
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Este cuestionario evalúa patrones de uso de alcohol y otras sustancias.
          Responda honestamente según sus experiencias en el último año.
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
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Seleccione una respuesta para continuar automáticamente
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdiccionEvaluacion;