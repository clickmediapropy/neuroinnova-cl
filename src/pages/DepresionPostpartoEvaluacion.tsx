import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Baby, ChevronLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import QuestionCard from "@/components/assessment/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAssessmentQuestions } from "@/data/assessmentQuestions";

// Obtener preguntas mejoradas del archivo de datos
const questionData = getAssessmentQuestions('postpartumDepression');

const getOptionsForQuestion = (questionIndex: number) => {
  if (questionIndex === 0) { // Able to laugh
    return [
      { label: "Tanto como siempre", value: "0", points: 0 },
      { label: "No tanto ahora", value: "1", points: 1 },
      { label: "Mucho menos", value: "2", points: 2 },
      { label: "Para nada", value: "3", points: 3 }
    ];
  } else if (questionIndex === 1) { // Looking forward
    return [
      { label: "Tanto como siempre", value: "0", points: 0 },
      { label: "Algo menos de lo que solía", value: "1", points: 1 },
      { label: "Mucho menos de lo que solía", value: "2", points: 2 },
      { label: "Prácticamente nada", value: "3", points: 3 }
    ];
  } else if (questionIndex === 2) { // Self-blame
    return [
      { label: "No, nunca", value: "0", points: 0 },
      { label: "No muy a menudo", value: "1", points: 1 },
      { label: "Sí, algunas veces", value: "2", points: 2 },
      { label: "Sí, la mayoría de las veces", value: "3", points: 3 }
    ];
  } else if (questionIndex === 3) { // Anxious/worried
    return [
      { label: "No, para nada", value: "0", points: 0 },
      { label: "Casi nada", value: "1", points: 1 },
      { label: "Sí, a veces", value: "2", points: 2 },
      { label: "Sí, muy a menudo", value: "3", points: 3 }
    ];
  } else if (questionIndex === 4) { // Scared/panicky
    return [
      { label: "No, para nada", value: "0", points: 0 },
      { label: "No, no mucho", value: "1", points: 1 },
      { label: "Sí, a veces", value: "2", points: 2 },
      { label: "Sí, bastante seguido", value: "3", points: 3 }
    ];
  } else if (questionIndex === 5) { // Things on top of me
    return [
      { label: "No, he estado manejando todo bien", value: "0", points: 0 },
      { label: "No, la mayoría de las veces me las he arreglado bien", value: "1", points: 1 },
      { label: "Sí, a veces no he podido arreglármelas como siempre", value: "2", points: 2 },
      { label: "Sí, la mayoría de las veces no me he podido arreglar para nada", value: "3", points: 3 }
    ];
  } else if (questionIndex === 6) { // Sleep difficulty
    return [
      { label: "No, para nada", value: "0", points: 0 },
      { label: "No muy a menudo", value: "1", points: 1 },
      { label: "Sí, a veces", value: "2", points: 2 },
      { label: "Sí, la mayoría de las veces", value: "3", points: 3 }
    ];
  } else if (questionIndex === 7) { // Sad/miserable
    return [
      { label: "No, para nada", value: "0", points: 0 },
      { label: "No muy a menudo", value: "1", points: 1 },
      { label: "Sí, bastante seguido", value: "2", points: 2 },
      { label: "Sí, la mayoría del tiempo", value: "3", points: 3 }
    ];
  } else if (questionIndex === 8) { // Crying
    return [
      { label: "No, nunca", value: "0", points: 0 },
      { label: "Solo ocasionalmente", value: "1", points: 1 },
      { label: "Sí, bastante seguido", value: "2", points: 2 },
      { label: "Sí, la mayoría del tiempo", value: "3", points: 3 }
    ];
  } else { // Self-harm
    return [
      { label: "Nunca", value: "0", points: 0 },
      { label: "Casi nunca", value: "1", points: 1 },
      { label: "A veces", value: "2", points: 2 },
      { label: "Sí, bastante seguido", value: "3", points: 3 }
    ];
  }
};

const DepresionPostpartoEvaluacion = () => {
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
        type="postpartumDepression"
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
            <Baby className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Evaluación de Depresión Postparto
        </h1>
        
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Esta evaluación está diseñada para madres y padres nuevos o esperando bebé.
          Responda según cómo se ha sentido durante la última semana.
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
          options={getOptionsForQuestion(currentQuestion)}
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

export default DepresionPostpartoEvaluacion;