import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// PRIME Screen (Psychosis Risk Screening) questions
const questions = [
  "¿Los alrededores familiares a veces le parecen extraños, confusos, amenazantes o irreales?",
  "¿Ha escuchado sonidos inusuales como golpes, clics, siseos, aplausos o zumbidos en sus oídos?",
  "¿Las cosas que ve aparecen diferentes de como suelen ser normalmente?",
  "¿Ha tenido experiencias con telepatía, fuerzas psíquicas o adivinación?",
  "¿Ha sentido alguna vez que estaba bajo el control de algún poder o fuerza diferente a usted mismo?",
  "¿Ha sentido que otras personas parecían estar dejando caer pistas o diciendo cosas con un doble significado?",
  "¿Ha tenido la sensación de que algunas personas no son lo que parecen ser?",
  "¿Ha sentido especialmente conectado con alguien o algo que lo rodea?",
  "¿Cree que ha estado destinado a una misión especial en la vida?",
  "¿Se siente confundido a veces sobre si algo que ha experimentado fue real o imaginario?",
  "¿Ha visto cosas que otras personas no pueden ver o no parecen ver?",
  "¿Cree que ha recibido mensajes especiales a través de la televisión, radio, periódicos o internet?",
  "¿Ha sentido que los pensamientos en su cabeza no eran suyos?",
  "¿Ha escuchado la voz de alguien hablando que otras personas no pueden escuchar?",
  "¿Ha sentido que alguien estaba jugando con su mente?"
];

const options = [
  { label: "Nunca", value: "0", points: 0 },
  { label: "A veces", value: "1", points: 1 },
  { label: "Frecuentemente", value: "2", points: 2 },
  { label: "Casi siempre", value: "3", points: 3 }
];

const PsicosisEvaluacion = () => {
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
        type="psychosis"
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
            <Eye className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2 text-protected">
          Autoevaluación de Síntomas Psicóticos
        </h1>
        
        <p className="text-center text-protected-muted mb-8">
          Este cuestionario evalúa experiencias perceptuales y cognitivas inusuales.
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

export default PsicosisEvaluacion;