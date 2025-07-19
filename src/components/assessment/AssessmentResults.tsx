import { useState } from "react";
import { CheckCircle, AlertTriangle, AlertCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getClinicalInterpretation, getSeverityColor, validateScore } from "@/data/clinicalScoring";

export type AssessmentType = "depression" | "anxiety" | "bipolar" | "ptsd" | "psychosis" | "adhd" | "eating-disorder" | "addiction" | "postpartum-depression" | "parent-child-mental-health" | "youth-mental-health";

interface AssessmentResultsProps {
  type: AssessmentType;
  score: number;
  onReset: () => void;
}

interface LeadFormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  edad: number | null;
  sexo: string | null;
  ciudad: string;
}

const AssessmentResults = ({ type, score, onReset }: AssessmentResultsProps) => {
  console.log("AssessmentResults component rendered with:", { type, score });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LeadFormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    edad: null,
    sexo: null,
    ciudad: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar el puntaje antes de procesar
  const scoreValidation = validateScore(type, score);
  if (!scoreValidation.isValid) {
    console.error("Score validation failed:", scoreValidation.message);
    console.error(`Type: ${type}, Score: ${score}, Valid range: ${scoreValidation.minScore}-${scoreValidation.maxScore}`);
  }

  // Obtener la interpretación clínica validada
  const clinicalResult = getClinicalInterpretation(type, score);
  
  const getSeverityLevel = () => {
    if (!clinicalResult) {
      return { level: "No determinado", color: "muted" as const };
    }
    
    return {
      level: clinicalResult.categoria,
      color: getSeverityColor(clinicalResult.categoria)
    };
  };

  const severityInfo = getSeverityLevel();
  
  const getMessage = () => {
    if (!clinicalResult) {
      return "No se pudo interpretar el resultado. Por favor, contacte con soporte.";
    }
    
    // Usar la descripción del problema del sistema clínico
    return clinicalResult.descripcion_problema;
  };

  const getIcon = () => {
    const severityInfo = getSeverityLevel();
    if (severityInfo.color === "success") {
      return <CheckCircle className="h-12 w-12 text-success" />;
    }
    if (severityInfo.color === "warning") {
      return <AlertTriangle className="h-12 w-12 text-warning" />;
    }
    return <AlertCircle className="h-12 w-12 text-destructive" />;
  };

  const getCTAText = () => {
    if (!clinicalResult) {
      return "Consulte con un profesional";
    }
    
    // Usar la solución recomendada del sistema clínico
    return clinicalResult.solucion_recomendada;
  };

  const getCTAVariant = () => {
    const severityInfo = getSeverityLevel();
    if (severityInfo.color === "success") {
      return "default";
    }
    if (severityInfo.color === "warning") {
      return "secondary";
    }
    return "destructive";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      console.log("Updated form data:", newData);
      return newData;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    console.log(`Select changed: ${name} = ${value}`);
    setFormData(prev => {
      const newData = { 
        ...prev, 
        [name]: name === 'edad' ? (value ? parseInt(value) : null) : value 
      };
      console.log("Updated form data:", newData);
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== FORM SUBMISSION STARTED ===");
    console.log("Event:", e);
    console.log("Form data at submission:", formData);
    
    setIsSubmitting(true);

    // Add early error catching
    window.addEventListener('error', (event) => {
      console.error("Global error caught:", event.error);
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error("Unhandled promise rejection:", event.reason);
    });

    // Validate required fields
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
      console.log("Validation failed - missing required fields");
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    console.log("Validation passed, proceeding with webhook call");
    console.log("CODE VERSION: 2024-01-18-FIX");

    try {
      console.log("=== TRY BLOCK STARTED ===");
      
      // Validate score before sending
      if (!scoreValidation.isValid) {
        console.error("Invalid score detected:", scoreValidation.message);
        toast({
          title: "Error",
          description: "Puntaje inválido detectado. Por favor, contacte con soporte.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Get assessment type name for webhook
      const getAssessmentTypeName = () => {
        if (!clinicalResult) {
          return "Evaluación Mental";
        }
        return clinicalResult.testName;
      };
      
      // Get Spanish name for assessment
      const getSpanishAssessmentName = () => {
        switch (type) {
          case "depression": return "Evaluación de Depresión (PHQ-9)";
          case "anxiety": return "Evaluación de Ansiedad (GAD-7)";
          case "bipolar": return "Evaluación de Trastorno Bipolar (MDQ)";
          case "ptsd": return "Evaluación de Estrés Postraumático (PC-PTSD-5)";
          case "psychosis": return "Evaluación de Riesgo de Psicosis (PQ-B)";
          case "adhd": return "Evaluación de TDAH (ASRS)";
          case "eating-disorder": return "Evaluación de Trastorno Alimentario (SWED)";
          case "addiction": return "Evaluación de Uso de Sustancias (AUDIT)";
          case "postpartum-depression": return "Evaluación de Depresión Postparto (EPDS)";
          case "parent-child-mental-health": return "Evaluación de Salud Mental Infantil (PSC-35)";
          case "youth-mental-health": return "Evaluación de Salud Mental Juvenil (PSC-35)";
          default: return "Evaluación de Salud Mental";
        }
      };

      const localSeverityInfo = getSeverityLevel();
      console.log("Severity info:", localSeverityInfo);
      console.log("Clinical result:", clinicalResult);

      // Prepare data for GoHighLevel webhook with correct field keys
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const evaluationEntry = `${currentDate}: ${getAssessmentTypeName()} - Puntaje ${score} (${localSeverityInfo.level})`;
      
      const webhookData = {
        // Standard fields
        "firstName": formData.nombre || "Juan Carlos",
        "lastName": formData.apellido || "González López",
        "email": formData.email || "juan.gonzalez@email.com",
        "phone": formData.telefono || "+56912345678",
        
        // Custom fields for evaluations - using exact field keys from GoHighLevel
        "contact.score_phq_9_puntaje_total_2": score, // Puntaje Total
        "contact.diagnstico_preliminar": `${getAssessmentTypeName()} - Puntaje: ${score} - Nivel: ${localSeverityInfo.level}`, // Diagnóstico Preliminar
        "contact.tipo_de_evaluacin": getAssessmentTypeName(), // Tipo de Evaluación (código técnico)
        "contact.tipo_evaluacion_espanol": getSpanishAssessmentName(), // Tipo de Evaluación (español)
        "contact.nivel_de_severidad": localSeverityInfo.level, // Nivel de Severidad
        "contact.edad": formData.edad || 35, // Edad
        "contact.sexo": formData.sexo || "Masculino", // Sexo
        
        // Agregar campos adicionales del sistema clínico
        "contact.descripcion_problema": clinicalResult?.descripcion_problema || "No disponible",
        "contact.solucion_recomendada": clinicalResult?.solucion_recomendada || "Consulte con un profesional",
        
        // Historial de evaluaciones (para múltiples tests) - USANDO LOS NUEVOS FIELD KEYS
        "contact.historial_de_evaluaciones": evaluationEntry, // Historial de Evaluaciones
        "contact.ltima_evaluacin__fecha": currentDate, // Última Evaluación - Fecha
        "contact.ltima_evaluacin__tipo": getAssessmentTypeName(), // Última Evaluación - Tipo
        "contact.ltima_evaluacin__puntaje": score, // Última Evaluación - Puntaje
        "contact.ltima_evaluacin__nivel": localSeverityInfo.level, // Última Evaluación - Nivel
        
        // Additional data for tracking
        "ciudad": formData.ciudad || "Santiago"
      };

      console.log("Sending to GoHighLevel webhook:", webhookData);
      console.log("Webhook URL:", 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35');
      console.log("Request body:", JSON.stringify(webhookData));
      
      // Send to GoHighLevel webhook
      console.log("About to call fetch...");
      console.log("Is fetch available?", typeof fetch);
      console.log("Window object:", typeof window);
      
      try {
        const response = await fetch('https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });

        console.log("Fetch completed, response:", response);
        console.log("Response type:", response.type);
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        
        console.log("Webhook request sent successfully");
      } catch (fetchError) {
        console.error("Fetch error occurred:", fetchError);
        console.error("Fetch error message:", fetchError.message);
        console.error("Fetch error stack:", fetchError.stack);
        throw fetchError;
      }
      // Since we're using no-cors, we can't check response status
      // but the request will be sent
      
      // Show success message
      toast({
        title: "¡Datos enviados!",
        description: "Sus resultados le serán enviados por WhatsApp en breve.",
      });
      
      // Navigate to home or a thank you page
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting assessment:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      toast({
        title: "Error",
        description: "Hubo un problema al enviar sus resultados. Por favor intente nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            ¡Evaluación Completada!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Gracias por completar la evaluación de {
              type === "depression" ? "depresión" :
              type === "anxiety" ? "ansiedad" :
              type === "bipolar" ? "trastorno bipolar" :
              type === "ptsd" ? "estrés postraumático" :
              type === "psychosis" ? "síntomas psicóticos" :
              type === "adhd" ? "TDAH" :
              type === "eating-disorder" ? "trastorno alimentario" :
              type === "addiction" ? "uso de sustancias" :
              type === "postpartum-depression" ? "depresión postparto" :
              type === "parent-child-mental-health" ? "salud mental de su hijo/a" :
              type === "youth-mental-health" ? "salud mental juvenil" :
              "salud mental"
            }.
          </p>
          
          <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 mb-8">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Sus resultados: {severityInfo.level}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {getMessage()}
              </p>
              <div className="bg-secondary/20 p-4 rounded-md">
                <p className="text-sm font-medium text-primary mb-2">Recomendación:</p>
                <p className="text-sm text-muted-foreground">
                  {clinicalResult?.solucion_recomendada || getCTAText()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Complete sus datos para recibir sus resultados</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre <span className="text-destructive">*</span></Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido <span className="text-destructive">*</span></Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono <span className="text-destructive">*</span></Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="numeric"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="+595 9XX XXX XXX"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Select
                  value={formData.edad?.toString() || ""}
                  onValueChange={(value) => handleSelectChange("edad", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione edad" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 83 }, (_, i) => i + 18).map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} años
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  placeholder="Ej. Asunción"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select
                  value={formData.sexo || ""}
                  onValueChange={(value) => handleSelectChange("sexo", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                    <SelectItem value="prefiero_no_decir">Prefiero no decir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col items-center">
              <Button 
                type="submit" 
                className="w-full md:w-auto flex items-center justify-center"
                variant={getCTAVariant()}
                disabled={isSubmitting}
                size="lg"
                onClick={() => console.log("Submit button clicked!")}
              >
                {isSubmitting ? "Enviando..." : "Enviar y Recibir Resultados por WhatsApp"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                type="button" 
                variant="link" 
                onClick={onReset} 
                className="mt-4"
                disabled={isSubmitting}
              >
                Volver a realizar la evaluación
              </Button>
            </div>
          </form>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            <strong>Nota importante:</strong> Esta evaluación no reemplaza un diagnóstico profesional.
            Si está experimentando dificultades emocionales o psicológicas, le recomendamos buscar
            ayuda de un profesional de la salud mental.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AssessmentResults;