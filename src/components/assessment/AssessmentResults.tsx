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
  codigoPais: string;
  telefono: string;
  edad: number | null;
  sexo: string | null;
  ciudad: string;
}

const AssessmentResults = ({ type, score, onReset }: AssessmentResultsProps) => {
  // Component initialization
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const countryCodes = [
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+55', country: 'Brasil', flag: '🇧🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
    { code: '+34', country: 'España', flag: '🇪🇸' },
    { code: '+52', country: 'México', flag: '🇲🇽' },
  ];
  const [formData, setFormData] = useState<LeadFormData>({
    nombre: "",
    apellido: "",
    email: "",
    codigoPais: "+595",
    telefono: "",
    edad: null,
    sexo: null,
    ciudad: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format phone number based on country
  const formatPhoneNumber = (value: string, countryCode: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    if (countryCode === '+595') {
      // Paraguay format: 9XX XXX XXX
      if (numericValue.length <= 3) {
        return numericValue;
      } else if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3)}`;
      } else {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3, 6)} ${numericValue.slice(6, 9)}`;
      }
    } else if (countryCode === '+54') {
      // Argentina format: 11 XXXX XXXX (Buenos Aires) or 9 XXX XXX XXXX (other regions)
      if (numericValue.length <= 2) {
        return numericValue;
      } else if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 2)} ${numericValue.slice(2)}`;
      } else {
        return `${numericValue.slice(0, 2)} ${numericValue.slice(2, 6)} ${numericValue.slice(6, 10)}`;
      }
    } else if (countryCode === '+1') {
      // US format: (XXX) XXX-XXXX
      if (numericValue.length <= 3) {
        return numericValue;
      } else if (numericValue.length <= 6) {
        return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
      } else {
        return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
      }
    } else if (countryCode === '+34') {
      // Spain format: XXX XX XX XX
      if (numericValue.length <= 3) {
        return numericValue;
      } else if (numericValue.length <= 5) {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3)}`;
      } else if (numericValue.length <= 7) {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3, 5)} ${numericValue.slice(5)}`;
      } else {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3, 5)} ${numericValue.slice(5, 7)} ${numericValue.slice(7, 9)}`;
      }
    } else if (countryCode === '+52') {
      // Mexico format: XX XXXX XXXX
      if (numericValue.length <= 2) {
        return numericValue;
      } else if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 2)} ${numericValue.slice(2)}`;
      } else {
        return `${numericValue.slice(0, 2)} ${numericValue.slice(2, 6)} ${numericValue.slice(6, 10)}`;
      }
    }
    return numericValue;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value, formData.codigoPais);
    setFormData(prev => ({ ...prev, telefono: formatted }));
  };

  // Validar el puntaje antes de procesar
  const scoreValidation = validateScore(type, score);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'edad' ? (value ? parseInt(value) : null) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission started
    
    setIsSubmitting(true);

    // Handle form submission

    // Validate required fields
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.codigoPais) {
      // Validation failed
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Proceed with webhook call

    try {
      // Process webhook data
      
      // Validate score before sending
      if (!scoreValidation.isValid) {
        // Invalid score detected
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

      // Prepare data for GoHighLevel webhook with correct field keys
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const evaluationEntry = `${currentDate}: ${getAssessmentTypeName()} - Puntaje ${score} (${localSeverityInfo.level})`;
      
      // Format full phone number for GoHighLevel
      const fullPhone = `${formData.codigoPais}${formData.telefono.replace(/\s/g, '')}`;
      
      const webhookData = {
        // Standard fields
        "firstName": formData.nombre || "Juan Carlos",
        "lastName": formData.apellido || "González López",
        "email": formData.email || "juan.gonzalez@email.com",
        "phone": fullPhone || "+595992097055",
        
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

      // Send to GoHighLevel webhook
      
      try {
        const response = await fetch('https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        });

        // Webhook request sent successfully
      } catch (fetchError) {
        // Fetch error occurred
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
      // Error submitting assessment
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
      <div className="container py-8 sm:py-12 max-w-3xl px-4 sm:px-6 lg:px-8">
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
                Sus resultados están listos
              </h3>
              <p className="text-muted-foreground text-center">
                Complete el formulario a continuación y le enviaremos sus resultados detallados y recomendaciones personalizadas por WhatsApp.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-4 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">Complete sus datos para recibir sus resultados</h2>
          
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
              
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <Label htmlFor="telefono">Teléfono <span className="text-destructive">*</span></Label>
                <div className="flex">
                  <Select
                    value={formData.codigoPais}
                    onValueChange={(value) => handleSelectChange("codigoPais", value)}
                  >
                    <SelectTrigger className="w-[110px] sm:w-[130px] md:w-[150px] rounded-r-none border-r-0 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-border shadow-md z-50">
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-base sm:text-lg">{country.flag}</span>
                            <span className="text-sm sm:text-base">{country.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    inputMode="numeric"
                    className="rounded-l-none flex-1"
                    value={formData.telefono}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={formData.codigoPais === '+595' ? '9XX XXX XXX' : 'Número telefónico'}
                    required
                  />
                </div>
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
            
            <div className="pt-4 flex flex-col items-center space-y-4">
              <Button 
                type="submit" 
                className="w-full sm:w-auto min-w-[280px] flex items-center justify-center text-sm sm:text-base px-4 sm:px-6"
                variant={getCTAVariant()}
                disabled={isSubmitting}
                size="lg"
              >
                <span className="flex items-center">
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <span className="hidden sm:inline">Enviar y Recibir Resultados por WhatsApp disponible 24/7</span>
                      <span className="sm:hidden">Recibir Resultados por WhatsApp disponible 24/7</span>
                    </>
                  )}
                  <ChevronRight className="ml-2 h-4 w-4 flex-shrink-0" />
                </span>
              </Button>
              
              <Button 
                type="button" 
                variant="link" 
                onClick={onReset} 
                className="text-sm sm:text-base"
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