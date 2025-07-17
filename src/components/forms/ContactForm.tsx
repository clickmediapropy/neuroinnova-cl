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
  telefono: z.string().min(5, { message: "Por favor ingrese su número telefónico" }),
  servicio: z.string().optional(),
  mensaje: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  variant?: "default" | "inline" | "compact";
  sourcePage?: string;
  webhookUrl?: string;
  defaultService?: string;
}

const ContactForm = ({ 
  variant = "default", 
  sourcePage = "contact-page",
  webhookUrl = "https://webhook.site/contact-form", // Placeholder, would be replaced with real GoHighLevel webhook
  defaultService = ""
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      servicio: defaultService || "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Add hidden fields for CRM integration
      const submissionData = {
        ...data,
        sourcePage,
        timestamp: new Date().toISOString(),
        formType: "contact-form",
      };
      
      // In a real implementation, this would be a fetch to the GoHighLevel webhook
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      console.log("Form submission data:", submissionData);
      
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

  const isCompact = variant === "compact";
  const isInline = variant === "inline";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input placeholder="ejemplo@correo.com" {...field} />
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
                  <Input placeholder="+595 XXX XXX XXX" {...field} />
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
  );
};

export default ContactForm;