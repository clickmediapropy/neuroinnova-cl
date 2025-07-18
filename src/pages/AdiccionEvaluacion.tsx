import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// AUDIT (Alcohol Use Disorders Identification Test) and DAST (Drug Abuse Screening Test) questions
const questions = [
  "¿Con qué frecuencia consume bebidas alcohólicas?",
  "¿Cuántas bebidas alcohólicas consume en un día típico cuando bebe?",
  "¿Con qué frecuencia consume seis o más bebidas alcohólicas en una sola ocasión?",
  "¿Con qué frecuencia en el último año ha sido incapaz de parar de beber una vez había empezado?",
  "¿Con qué frecuencia en el último año no pudo hacer lo que se esperaba de usted porque había bebido?",
  "¿Con qué frecuencia en el último año ha necesitado beber en ayunas para recuperarse después de haber bebido mucho el día anterior?",
  "¿Con qué frecuencia en el último año ha tenido remordimientos o sentimientos de culpa después de haber bebido?",
  "¿Con qué frecuencia en el último año no ha podido recordar lo que sucedió la noche anterior porque había estado bebiendo?",
  "¿Usted o alguna otra persona han resultado heridos como consecuencia de su consumo de alcohol?",
  "¿Algún familiar, amigo, médico o profesional sanitario ha mostrado preocupación por su consumo de alcohol o le ha sugerido que deje de beber?",
  "¿Ha usado drogas diferentes al alcohol en el último año?",
  "¿Alguna vez ha sentido que necesita usar drogas o alcohol para funcionar normalmente?",
  "¿Ha tratado de reducir o detener el uso de sustancias pero no ha podido?",
  "¿Su uso de sustancias ha causado problemas en su trabajo, escuela o relaciones?",
  "¿Ha mentido a familiares o amigos sobre cuánto usa sustancias?"
];

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
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2 text-protected">
          Autoevaluación de Uso de Sustancias
        </h1>
        
        <p className="text-center text-protected-muted mb-8">
          Este cuestionario evalúa patrones de uso de alcohol y otras sustancias.
          Responda honestamente según sus experiencias en el último año.
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
          
          <div className="text-sm text-protected-muted flex items-center">
            Seleccione una respuesta para continuar automáticamente
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdiccionEvaluacion;