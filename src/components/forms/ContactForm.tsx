import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nombre: z.string().min(2, { message: "Por favor ingrese su nombre completo" }),
  email: z.string().email({ message: "Por favor ingrese un correo electrónico válido" }),
  codigoPais: z.string().min(1, { message: "Seleccione un código de país" }),
  telefono: z.string().min(5, { message: "Por favor ingrese su número telefónico" }),
  servicio: z.string().optional(),
  mensaje: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  variant?: "default" | "inline" | "compact";
  sourcePage?: string;
  defaultService?: string;
}

const ContactForm = ({
  variant = "default",
  sourcePage = "contact-page",
  defaultService = ""
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      codigoPais: "+595",
      telefono: "",
      servicio: defaultService || "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Split nombre into first_name and last_name
      const nameParts = data.nombre.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Format phone number for GoHighLevel
      const fullPhone = `${data.codigoPais}${data.telefono.replace(/\s/g, '')}`;
      
      // Map service to readable text
      const getServiceText = (service: string) => {
        switch (service) {
          case 'emt-tms': return 'Estimulación Magnética Transcraneal (EMT/TMS)';
          case 'tdcs': return 'Estimulación Transcraneal por Corriente Directa (tDCS)';
          case 'consulta-psiquiatrica': return 'Consulta Psiquiátrica';
          case 'otro': return 'Otro servicio';
          default: return service;
        }
      };
      
      const webhookData = {
        name: data.nombre.trim(),
        email: data.email,
        phone: fullPhone,
        custom_fields: {
          origen_lead: "formulario_contacto_web",
          nombre: firstName,
          apellido: lastName,
          servicio_interes: getServiceText(data.servicio),
          servicio_slug: data.servicio || "",
          mensaje: data.mensaje || "",
          pagina_origen: sourcePage,
        },
      };

      const webhookUrl = import.meta.env.VITE_CRM_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error("VITE_CRM_WEBHOOK_URL no configurada");
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_CRM_WEBHOOK_KEY || '',
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      toast({
        title: "Mensaje enviado con éxito",
        description: "Nos pondremos en contacto a la brevedad.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error al enviar el mensaje",
        description: "Por favor intente nuevamente más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format phone number for Paraguay
  const formatPhoneNumber = (value: string, countryCode: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    if (countryCode === '+595') {
      // Paraguay format: 9XX XXX XXX (3 sets of 3 numbers, starting with 9)
      if (numericValue.length <= 3) {
        return numericValue;
      } else if (numericValue.length <= 6) {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3)}`;
      } else {
        return `${numericValue.slice(0, 3)} ${numericValue.slice(3, 6)} ${numericValue.slice(6, 9)}`;
      }
    }
    return numericValue;
  };

  const handlePhoneChange = (value: string) => {
    const countryCode = form.getValues('codigoPais');
    const formatted = formatPhoneNumber(value, countryCode);
    form.setValue('telefono', formatted);
  };

  const countryCodes = [
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+55', country: 'Brasil', flag: '🇧🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+1', country: 'Estados Unidos', flag: '🇺🇸' },
    { code: '+34', country: 'España', flag: '🇪🇸' },
  ];

  const isCompact = variant === "compact";
  const isInline = variant === "inline";

  return (
    <div className="contact-tech-bg rounded-lg p-3 sm:p-4 w-full max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className={isInline ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}>
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isCompact ? "text-sm" : ""}>Nombre Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={isCompact ? "text-sm" : ""}>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ejemplo@correo.com" {...field} />
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
                <FormLabel className={isCompact ? "text-sm" : ""}>Teléfono</FormLabel>
                <FormControl>
                  <div className="flex w-full min-w-0">
                    <FormField
                      control={form.control}
                      name="codigoPais"
                      render={({ field: countryField }) => (
                        <Select onValueChange={countryField.onChange} defaultValue={countryField.value}>
                          <FormControl>
                            <SelectTrigger className="w-[110px] sm:w-[140px] shrink-0 rounded-r-none border-r-0 h-12">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-border shadow-md z-50">
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.code}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder={form.watch('codigoPais') === '+595' ? '9XX XXX XXX' : 'Número telefónico'}
                      className="rounded-l-none"
                      value={field.value}
                      onChange={(e) => {
                        handlePhoneChange(e.target.value);
                        field.onChange(e);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="servicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={isCompact ? "text-sm" : ""}>Servicio de Interés</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un servicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="emt-tms">Estimulación Magnética Transcraneal (EMT/TMS)</SelectItem>
                  <SelectItem value="tdcs">Estimulación Transcraneal por Corriente Directa (tDCS)</SelectItem>
                  <SelectItem value="consulta-psiquiatrica">Consulta Psiquiátrica</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={isCompact ? "text-sm" : ""}>Mensaje</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="¿Cómo podemos ayudarle?" 
                  className="resize-none"
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={isCompact ? "w-full mt-2" : "w-full md:w-auto mt-2"}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;