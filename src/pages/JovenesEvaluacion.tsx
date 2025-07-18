import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Youth mental health screening questions (ages 11-17)
const questions = [
  "En el último mes, ¿has sentido nerviosismo, ansiedad o preocupación?",
  "En el último mes, ¿no has podido parar o controlar tus preocupaciones?",
  "En el último mes, ¿has sentido poco interés o placer en hacer cosas?",
  "En el último mes, ¿te has sentido decaído/a, deprimido/a o sin esperanza?",
  "En el último mes, ¿has tenido problemas para dormir o permanecer dormido/a?",
  "En el último mes, ¿te has sentido cansado/a o con poca energía?",
  "En el último mes, ¿has tenido problemas para concentrarte en cosas como estudiar o ver televisión?",
  "En el último mes, ¿te has movido o hablado tan lentamente que otras personas podrían haberlo notado?",
  "En el último mes, ¿has estado tan inquieto/a que no podías quedarte quieto/a?",
  "En el último mes, ¿has tenido pensamientos de que estarías mejor muerto/a o de hacerte daño?",
  "En el último año, ¿has perdido o ganado peso significativamente sin proponértelo?",
  "En el último año, ¿has tenido ataques de pánico (miedo intenso repentino)?",
  "En el último año, ¿has evitado situaciones sociales por timidez o miedo?",
  "En el último año, ¿has tenido comportamientos repetitivos difíciles de controlar?",
  "En el último año, ¿has usado alcohol o drogas para sentirte mejor o escapar de problemas?",
  "En el último año, ¿has tenido problemas serios en casa, escuela o con amigos?",
  "En el último año, ¿te has lastimado a propósito (cortándote, quemándote, etc.)?",
  "En el último año, ¿has tenido experiencias que otros dirían que no son reales?"
];

const options = [
  { label: "No, nunca", value: "0", points: 0 },
  { label: "Sí, un poco", value: "1", points: 1 },
  { label: "Sí, moderadamente", value: "2", points: 2 },
  { label: "Sí, mucho", value: "3", points: 3 }
];

const JovenesEvaluacion = () => {
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
        type="youth-mental-health"
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
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2 text-protected">
          Evaluación de Salud Mental para Jóvenes
        </h1>
        
        <p className="text-center text-protected-muted mb-8">
          Esta evaluación está diseñada para jóvenes de 11 a 17 años que están preocupados 
          por sus emociones, atención o comportamientos.
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
          
          <div className="text-sm text-protected-muted flex items-center">
            Seleccione una respuesta para continuar automáticamente
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JovenesEvaluacion;