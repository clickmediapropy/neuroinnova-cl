import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, CheckCircle, ArrowRight, ArrowLeft, User, Phone, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  servicio: z.string().min(1, "Debe seleccionar un tipo de servicio"),
  fecha: z.string().min(1, "Debe seleccionar una fecha"),
  horario: z.string().min(1, "Debe seleccionar un horario"),
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  email: z.string().email("Ingrese un email válido"),
  motivo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AgendarConsultaPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servicio: "",
      fecha: "",
      horario: "",
      nombre: "",
      telefono: "",
      email: "",
      motivo: "",
    },
  });

  const servicios = [
    {
      id: "emt-tms",
      title: "Terapia EMT/TMS",
      description: "Estimulación Magnética Transcraneal",
      duration: "60 min",
      badge: "Exclusivo"
    },
    {
      id: "tdcs",
      title: "Tratamiento tDCS",
      description: "Estimulación por Corriente Directa",
      duration: "45 min",
      badge: "Innovador"
    },
    {
      id: "psiquiatria",
      title: "Consulta Psiquiátrica",
      description: "Evaluación y tratamiento tradicional",
      duration: "60 min",
      badge: null
    },
    {
      id: "evaluacion",
      title: "Evaluación Inicial",
      description: "Primera consulta completa",
      duration: "90 min",
      badge: "Recomendado"
    }
  ];

  const horarios = [
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ];

  const nextStep = () => {
    if (currentStep === 1 && !form.getValues("servicio")) {
      toast({
        title: "Selección requerida",
        description: "Por favor seleccione un tipo de servicio",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && !form.getValues("fecha")) {
      toast({
        title: "Fecha requerida",
        description: "Por favor seleccione una fecha",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 3 && !form.getValues("horario")) {
      toast({
        title: "Horario requerido",
        description: "Por favor seleccione un horario",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to GoHighLevel webhook
      const response = await fetch("/api/appointment-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: "website-booking",
        }),
      });

      if (response.ok) {
        setIsConfirmed(true);
        toast({
          title: "¡Solicitud enviada!",
          description: "Nos pondremos en contacto con usted para confirmar su cita",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar su solicitud. Por favor intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedService = () => {
    return servicios.find(s => s.id === form.getValues("servicio"));
  };

  if (isConfirmed) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl text-green-600">
                  ¡Solicitud Recibida!
                </CardTitle>
                <CardDescription className="text-lg">
                  Su solicitud de cita ha sido enviada correctamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/10 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Resumen de su solicitud:</h3>
                  <div className="space-y-2 text-left">
                    <p><strong>Servicio:</strong> {getSelectedService()?.title}</p>
                    <p><strong>Fecha:</strong> {form.getValues("fecha")}</p>
                    <p><strong>Horario:</strong> {form.getValues("horario")}</p>
                    <p><strong>Nombre:</strong> {form.getValues("nombre")}</p>
                    <p><strong>Teléfono:</strong> {form.getValues("telefono")}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Nos pondremos en contacto con usted dentro de las próximas 24 horas 
                    para confirmar la disponibilidad y finalizar la programación de su cita.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                    >
                      Volver al Inicio
                    </Button>
                    <Button 
                      onClick={() => window.location.href = 'https://wa.me/595981175253'}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Contactar por WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Header */}
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Agendar Consulta
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Reserve su cita en pocos pasos. Seleccione el servicio, fecha y horario que mejor se adapte a sus necesidades.
              </p>
              
              {/* Progress Indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          currentStep >= step
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`w-8 h-1 mx-2 ${
                            currentStep > step ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Steps */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Step 1: Service Selection */}
                  {currentStep === 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">Paso 1: Seleccione el Servicio</CardTitle>
                        <CardDescription>
                          Elija el tipo de consulta o tratamiento que necesita
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="servicio"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="grid md:grid-cols-2 gap-4"
                                >
                                  {servicios.map((servicio) => (
                                    <div key={servicio.id} className="relative">
                                      <RadioGroupItem
                                        value={servicio.id}
                                        id={servicio.id}
                                        className="sr-only"
                                      />
                                      <Label
                                        htmlFor={servicio.id}
                                        className={`block p-6 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                          field.value === servicio.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                        }`}
                                      >
                                        <div className="flex justify-between items-start mb-2">
                                          <h3 className="font-semibold text-lg">{servicio.title}</h3>
                                          {servicio.badge && (
                                            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                                              {servicio.badge}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-muted-foreground mb-2">{servicio.description}</p>
                                        <p className="text-sm font-medium text-primary">
                                          Duración: {servicio.duration}
                                        </p>
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: Date Selection */}
                  {currentStep === 2 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                          <Calendar className="h-6 w-6 mr-2" />
                          Paso 2: Seleccione la Fecha
                        </CardTitle>
                        <CardDescription>
                          Elija el día que prefiere para su {getSelectedService()?.title.toLowerCase()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="fecha"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fecha preferida</FormLabel>
                              <FormControl>
                                <div className="space-y-4">
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                                    <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                      Calendario Interactivo
                                    </h3>
                                    <p className="text-blue-700 mb-4">
                                      El calendario de disponibilidad se integrará próximamente con GoHighLevel
                                    </p>
                                    <Input
                                      type="date"
                                      value={field.value}
                                      onChange={field.onChange}
                                      min={new Date().toISOString().split('T')[0]}
                                      className="max-w-xs mx-auto"
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 3: Time Selection */}
                  {currentStep === 3 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                          <Clock className="h-6 w-6 mr-2" />
                          Paso 3: Seleccione el Horario
                        </CardTitle>
                        <CardDescription>
                          Elija el horario que mejor se adapte a su disponibilidad
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="horario"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Horario preferido</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                >
                                  {horarios.map((horario) => (
                                    <div key={horario.value}>
                                      <RadioGroupItem
                                        value={horario.value}
                                        id={horario.value}
                                        className="sr-only"
                                      />
                                      <Label
                                        htmlFor={horario.value}
                                        className={`block p-4 text-center border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                          field.value === horario.value
                                            ? "border-primary bg-primary/5"
                                            : "border-border"
                                        }`}
                                      >
                                        <Clock className="h-5 w-5 mx-auto mb-2" />
                                        <span className="font-medium">{horario.label}</span>
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 4: Contact Information */}
                  {currentStep === 4 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                          <User className="h-6 w-6 mr-2" />
                          Paso 4: Información de Contacto
                        </CardTitle>
                        <CardDescription>
                          Complete sus datos para finalizar la solicitud de cita
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre completo *</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Su nombre completo" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="telefono"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Teléfono *</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="+595 xxx xxx xxx" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="su.email@ejemplo.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="motivo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Motivo de consulta (opcional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="Describa brevemente el motivo de su consulta..."
                                  rows={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Summary */}
                        <div className="bg-secondary/10 p-6 rounded-lg">
                          <h3 className="font-semibold text-lg mb-4">Resumen de su cita:</h3>
                          <div className="space-y-2">
                            <p><strong>Servicio:</strong> {getSelectedService()?.title}</p>
                            <p><strong>Fecha:</strong> {form.getValues("fecha")}</p>
                            <p><strong>Horario:</strong> {form.getValues("horario")}</p>
                            <p><strong>Duración:</strong> {getSelectedService()?.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Anterior
                    </Button>

                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep}>
                        Siguiente
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Confirmar Cita"}
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AgendarConsultaPage;