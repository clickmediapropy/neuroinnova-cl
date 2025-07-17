import { useState } from "react";
import { CheckCircle, AlertTriangle, AlertCircle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export type AssessmentType = "depression" | "anxiety";

interface AssessmentResultsProps {
  type: AssessmentType;
  score: number;
  onReset: () => void;
}

interface LeadFormData {
  nombre: string;
  email: string;
  celular: string;
  edad: string;
  ciudad: string;
  sexo: string;
}

const AssessmentResults = ({ type, score, onReset }: AssessmentResultsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LeadFormData>({
    nombre: "",
    email: "",
    celular: "",
    edad: "",
    ciudad: "",
    sexo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSeverityLevel = () => {
    if (type === "depression") {
      if (score <= 4) return { level: "Mínima", color: "success" };
      if (score <= 9) return { level: "Leve", color: "success" };
      if (score <= 14) return { level: "Moderada", color: "warning" };
      if (score <= 19) return { level: "Moderadamente severa", color: "warning" };
      return { level: "Severa", color: "destructive" };
    } else {
      // anxiety
      if (score <= 4) return { level: "Mínima", color: "success" };
      if (score <= 9) return { level: "Leve", color: "success" };
      if (score <= 14) return { level: "Moderada", color: "warning" };
      return { level: "Severa", color: "destructive" };
    }
  };

  const severityInfo = getSeverityLevel();
  
  const getMessage = () => {
    if (score <= 4) {
      return "Sus resultados indican niveles mínimos. Esto sugiere que actualmente no presenta síntomas significativos. Es recomendable mantener hábitos saludables y realizar evaluaciones periódicas.";
    }
    if (score <= 9) {
      return "Sus resultados indican niveles leves. Aunque los síntomas son manejables, es importante monitorear su evolución y considerar una consulta preventiva.";
    }
    if (score <= 14) {
      return "Sus resultados indican niveles moderados. Recomendamos agendar una evaluación profesional para un diagnóstico adecuado y opciones de tratamiento.";
    }
    return "Sus resultados indican niveles significativos. Es importante buscar ayuda profesional pronto para recibir el apoyo y tratamiento adecuados.";
  };

  const getIcon = () => {
    if (score <= 9) {
      return <CheckCircle className="h-12 w-12 text-success" />;
    }
    if (score <= 14) {
      return <AlertTriangle className="h-12 w-12 text-warning" />;
    }
    return <AlertCircle className="h-12 w-12 text-destructive" />;
  };

  const getCTAText = () => {
    if (score <= 9) {
      return "Agende una consulta preventiva";
    }
    if (score <= 14) {
      return "Recomendamos agendar una evaluación profesional";
    }
    return "Es importante buscar ayuda profesional pronto";
  };

  const getCTAVariant = () => {
    if (score <= 9) {
      return "default";
    }
    if (score <= 14) {
      return "secondary";
    }
    return "destructive";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.nombre || !formData.email || !formData.celular) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for webhook
      const webhookData = {
        ...formData,
        test_type: type === "depression" ? "PHQ-9" : "GAD-7",
        score,
        severity: severityInfo.level,
        timestamp: new Date().toISOString(),
        source: window.location.href
      };

      // This would normally go to a GoHighLevel webhook
      // For now, we'll just log it and show a success message
      console.log("Sending to webhook:", webhookData);
      
      // In a real implementation, you would send to the webhook like this:
      /*
      const response = await fetch('https://your-gohighlevel-webhook-url/assessment-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit assessment results');
      }
      */
      
      // Show success message
      toast({
        title: "Evaluación completada",
        description: "Sus resultados han sido enviados. Nos pondremos en contacto pronto.",
      });
      
      // Navigate to home or a thank you page
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting assessment:", error);
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
            Resultados de su Evaluación
          </h1>
          <p className="text-muted-foreground mb-6">
            Gracias por completar la evaluación de {type === "depression" ? "depresión" : "ansiedad"}.
          </p>
          
          <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2">{score}</div>
              <div className={`text-${severityInfo.color} font-semibold mb-4`}>
                Nivel: {severityInfo.level}
              </div>
              <p className="text-muted-foreground">{getMessage()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Complete sus datos para recibir más información</h2>
          
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
                <Label htmlFor="celular">Celular <span className="text-destructive">*</span></Label>
                <Input
                  id="celular"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  name="edad"
                  type="number"
                  value={formData.edad}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select
                  value={formData.sexo}
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
              >
                {getCTAText()}
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