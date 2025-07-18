import { useState } from "react";
import { CheckCircle, AlertTriangle, AlertCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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

  const getSeverityLevel = () => {
    if (type === "depression") {
      if (score <= 4) return { level: "Mínima", color: "success" };
      if (score <= 9) return { level: "Leve", color: "success" };
      if (score <= 14) return { level: "Moderada", color: "warning" };
      if (score <= 19) return { level: "Moderadamente severa", color: "warning" };
      return { level: "Severa", color: "destructive" };
    } else if (type === "anxiety") {
      if (score <= 4) return { level: "Mínima", color: "success" };
      if (score <= 9) return { level: "Leve", color: "success" };
      if (score <= 14) return { level: "Moderada", color: "warning" };
      return { level: "Severa", color: "destructive" };
    } else if (type === "bipolar") {
      if (score <= 6) return { level: "Bajo riesgo", color: "success" };
      if (score <= 9) return { level: "Riesgo moderado", color: "warning" };
      return { level: "Alto riesgo", color: "destructive" };
    } else if (type === "ptsd") {
      if (score <= 30) return { level: "Síntomas mínimos", color: "success" };
      if (score <= 44) return { level: "Síntomas leves", color: "success" };
      if (score <= 59) return { level: "Síntomas moderados", color: "warning" };
      return { level: "Síntomas severos", color: "destructive" };
    } else if (type === "psychosis") {
      if (score <= 5) return { level: "Bajo riesgo", color: "success" };
      if (score <= 15) return { level: "Riesgo moderado", color: "warning" };
      return { level: "Alto riesgo", color: "destructive" };
    } else if (type === "adhd") {
      if (score <= 24) return { level: "Síntomas mínimos", color: "success" };
      if (score <= 39) return { level: "Síntomas leves", color: "success" };
      if (score <= 54) return { level: "Síntomas moderados", color: "warning" };
      return { level: "Síntomas severos", color: "destructive" };
    } else if (type === "eating-disorder") {
      if (score <= 5) return { level: "Bajo riesgo", color: "success" };
      if (score <= 12) return { level: "Riesgo moderado", color: "warning" };
      return { level: "Alto riesgo", color: "destructive" };
    } else if (type === "addiction") {
      if (score <= 7) return { level: "Uso bajo riesgo", color: "success" };
      if (score <= 15) return { level: "Uso riesgoso", color: "warning" };
      if (score <= 25) return { level: "Uso problemático", color: "warning" };
      return { level: "Dependencia probable", color: "destructive" };
    } else if (type === "postpartum-depression") {
      if (score <= 9) return { level: "Síntomas mínimos", color: "success" };
      if (score <= 12) return { level: "Síntomas leves", color: "warning" };
      return { level: "Probable depresión postparto", color: "destructive" };
    } else if (type === "parent-child-mental-health") {
      if (score <= 14) return { level: "Funcionamiento normal", color: "success" };
      if (score <= 24) return { level: "Atención recomendada", color: "warning" };
      return { level: "Evaluación urgente requerida", color: "destructive" };
    } else if (type === "youth-mental-health") {
      if (score <= 18) return { level: "Síntomas mínimos", color: "success" };
      if (score <= 30) return { level: "Síntomas moderados", color: "warning" };
      return { level: "Síntomas significativos", color: "destructive" };
    }
    return { level: "No determinado", color: "muted" };
  };

  const severityInfo = getSeverityLevel();
  
  const getMessage = () => {
    const severityInfo = getSeverityLevel();
    
    if (type === "bipolar" || type === "psychosis" || type === "eating-disorder") {
      if (severityInfo.color === "success") {
        return "Sus resultados indican un nivel bajo de riesgo. Mantenga hábitos saludables y consulte si tiene preocupaciones.";
      }
      if (severityInfo.color === "warning") {
        return "Sus resultados sugieren la presencia de algunos síntomas. Recomendamos una evaluación profesional para mayor claridad.";
      }
      return "Sus resultados indican síntomas significativos. Es importante buscar ayuda profesional para una evaluación completa.";
    }
    
    if (type === "addiction") {
      if (severityInfo.color === "success") {
        return "Sus patrones de uso parecen estar dentro de rangos de bajo riesgo. Mantenga el consumo responsable.";
      }
      if (severityInfo.color === "warning") {
        return "Sus resultados sugieren patrones de uso que podrían requerir atención. Considere una consulta profesional.";
      }
      return "Sus resultados indican patrones de uso problemáticos. Recomendamos buscar ayuda especializada en adicciones.";
    }
    
    // Default messages for other types
    if (score <= 9 || severityInfo.color === "success") {
      return "Sus resultados indican niveles mínimos o leves. Aunque los síntomas son manejables, es importante monitorear su evolución y considerar una consulta preventiva.";
    }
    if (score <= 14 || severityInfo.color === "warning") {
      return "Sus resultados indican niveles moderados. Recomendamos agendar una evaluación profesional para un diagnóstico adecuado y opciones de tratamiento.";
    }
    return "Sus resultados indican niveles significativos. Es importante buscar ayuda profesional pronto para recibir el apoyo y tratamiento adecuados.";
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
    const severityInfo = getSeverityLevel();
    if (severityInfo.color === "success") {
      return "Agende una consulta preventiva";
    }
    if (severityInfo.color === "warning") {
      return "Recomendamos agendar una evaluación profesional";
    }
    return "Es importante buscar ayuda profesional pronto";
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

    try {
      // Get assessment type name for webhook
      const getAssessmentTypeName = () => {
        switch (type) {
          case "depression": return "PHQ-9 Depresión";
          case "anxiety": return "GAD-7 Ansiedad";
          case "bipolar": return "Trastorno Bipolar";
          case "ptsd": return "PTSD Estrés Postraumático";
          case "psychosis": return "Evaluación Psicosis";
          case "adhd": return "ADHD/TDAH";
          case "eating-disorder": return "Trastorno Alimentario";
          case "addiction": return "Uso de Sustancias";
          case "postpartum-depression": return "Depresión Postparto";
          case "parent-child-mental-health": return "Salud Mental Infantil";
          case "youth-mental-health": return "Salud Mental Juvenil";
          default: return "Evaluación Mental";
        }
      };

      // Prepare data for GoHighLevel webhook with exact parameters requested
      const webhookData = {
        "Puntaje Total": score,
        "Nivel de Severidad": severityInfo.level,
        "Tipo de Test": type,
        "Categoria de Severidad": severityInfo.level,
        "Nombre": formData.nombre,
        "Apellido": formData.apellido,
        "Email": formData.email,
        "Telefono": formData.telefono,
        "Edad": formData.edad,
        "Sexo": formData.sexo,
        "Ciudad": formData.ciudad,
        "Tipo de Evaluacion": getAssessmentTypeName()
      };

      console.log("Sending to GoHighLevel webhook:", webhookData);
      console.log("Webhook URL:", 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35');
      console.log("Request body:", JSON.stringify(webhookData));
      
      // Send to GoHighLevel webhook
      const response = await fetch('https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Required for external webhooks
        body: JSON.stringify(webhookData),
      });

      console.log("Webhook request sent successfully");
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
            <CheckCircle className="h-12 w-12 text-success" />
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
                Sus resultados le serán enviados por WhatsApp
              </h3>
              <p className="text-muted-foreground text-center">
                Complete sus datos a continuación para recibir un análisis detallado de sus resultados y recomendaciones personalizadas directamente en WhatsApp.
              </p>
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