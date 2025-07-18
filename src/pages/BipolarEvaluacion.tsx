import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Bipolar Mood Disorder Questionnaire (based on HCL-32 and Mood Disorder Questionnaire)
const questions = [
  "¿Ha experimentado un período de tiempo en el que no era su yo habitual y se sentía tan bien o hiperactivo que otras personas pensaron que no era normal?",
  "¿Ha habido períodos en los que se sintió tan irritable que gritó a las personas o comenzó peleas o discusiones?",
  "¿Se ha sentido mucho más seguro de sí mismo de lo habitual?",
  "¿Ha dormido mucho menos de lo habitual y descubrió que realmente no lo extrañaba?",
  "¿Ha estado mucho más hablador o hablaba mucho más rápido de lo habitual?",
  "¿Los pensamientos corrían por su cabeza o no podía frenar su mente?",
  "¿Se distraía tan fácilmente con las cosas que lo rodeaban que tenía problemas para concentrarse o mantenerse en el camino?",
  "¿Ha tenido mucha más energía de lo habitual?",
  "¿Ha sido mucho más sociable o extrovertido de lo habitual?",
  "¿Ha estado mucho más interesado en el sexo de lo habitual?",
  "¿Ha hecho cosas que eran inusuales para usted o que otras personas podrían haber pensado que eran excesivas, tontas o arriesgadas?",
  "¿Los gastos de dinero lo metieron a usted o a su familia en problemas?"
];

const BipolarEvaluacion = () => {
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
    setAnswers(Array(questions.length).fill(1)); // Fill with test values
    setScore(8); // Test score
    setIsComplete(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  if (isComplete) {
    return (
      <AssessmentResults 
        type="bipolar"
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
            <Zap className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-primary mb-2 text-protected">
          Autoevaluación de Trastorno Bipolar
        </h1>
        
        <p className="text-center text-protected-muted mb-8">
          Este cuestionario lo ayudará a evaluar si ha experimentado episodios maníacos o hipomaníacos.
          Responda pensando en todos los períodos de su vida.
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
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50">
              <RadioGroupItem value="0" id="option-0" />
              <Label htmlFor="option-0" className="flex-grow cursor-pointer">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50">
              <RadioGroupItem value="1" id="option-1" />
              <Label htmlFor="option-1" className="flex-grow cursor-pointer">
                Sí
              </Label>
            </div>
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

export default BipolarEvaluacion;