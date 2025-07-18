import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Focus, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// ASRS-v1.1 (Adult ADHD Self-Report Scale) questions
const questions = [
  "¿Con qué frecuencia tiene problemas para terminar los detalles finales de un proyecto, una vez que ya se han hecho las partes más desafiantes?",
  "¿Con qué frecuencia tiene dificultad para poner las cosas en orden cuando tiene que hacer una tarea que requiere organización?",
  "¿Con qué frecuencia tiene problemas para recordar citas u obligaciones?",
  "Cuando tiene una tarea que requiere mucha reflexión, ¿con qué frecuencia evita o retrasa comenzar?",
  "¿Con qué frecuencia se inquieta o retuerce las manos o los pies cuando tiene que sentarse durante mucho tiempo?",
  "¿Con qué frecuencia se siente demasiado activo y obligado a hacer cosas, como si fuera impulsado por un motor?",
  "¿Con qué frecuencia comete errores por descuido cuando tiene que trabajar en un proyecto aburrido o difícil?",
  "¿Con qué frecuencia tiene dificultad para mantener su atención cuando está haciendo un trabajo aburrido o repetitivo?",
  "¿Con qué frecuencia tiene dificultad para concentrarse en lo que le dicen las personas, incluso cuando le hablan directamente?",
  "¿Con qué frecuencia coloca mal o tiene dificultad para encontrar cosas en casa o en el trabajo?",
  "¿Con qué frecuencia se distrae por actividad o ruido a su alrededor?",
  "¿Con qué frecuencia se levanta de su asiento en reuniones u otras situaciones en las que se espera que permanezca sentado?",
  "¿Con qué frecuencia se siente inquieto o impaciente?",
  "¿Con qué frecuencia tiene dificultad para relajarse cuando tiene tiempo para usted?",
  "¿Con qué frecuencia se encuentra hablando demasiado cuando está en situaciones sociales?",
  "Cuando está en una conversación, ¿con qué frecuencia se encuentra terminando las oraciones de las personas con las que está hablando, antes de que puedan terminar por sí mismas?",
  "¿Con qué frecuencia tiene dificultad para esperar su turno en situaciones en las que se requiere tomar turnos?",
  "¿Con qué frecuencia interrumpe a otros cuando están ocupados?"
];

const options = [
  { label: "Nunca", value: "0", points: 0 },
  { label: "Rara vez", value: "1", points: 1 },
  { label: "A veces", value: "2", points: 2 },
  { label: "A menudo", value: "3", points: 3 },
  { label: "Muy a menudo", value: "4", points: 4 }
];

const ADHDEvaluacion = () => {
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
    setScore(45); // Test score
    setIsComplete(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  if (isComplete) {
    return (
      <AssessmentResults 
        type="adhd"
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
            <Focus className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2 text-protected">
          Autoevaluación de TDAH
        </h1>
        
        <p className="text-center text-protected-muted mb-8">
          Este cuestionario evalúa síntomas de Trastorno por Déficit de Atención e Hiperactividad.
          Responda según cómo se ha sentido durante los últimos 6 meses.
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

export default ADHDEvaluacion;