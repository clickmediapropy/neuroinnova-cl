import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TestWebhookPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "Test",
    email: "test@example.com"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Test form submitted!");
    console.log("Form data:", formData);
    
    setIsSubmitting(true);
    
    try {
      const webhookData = {
        "Puntaje Total": 15,
        "Nivel de Severidad": "Moderada",
        "Tipo de Test": "test",
        "Categoria de Severidad": "Moderada",
        "Nombre": formData.nombre,
        "Apellido": "TestApellido",
        "Email": formData.email,
        "Telefono": "+595991123456",
        "Edad": 30,
        "Sexo": "masculino",
        "Ciudad": "Asunción",
        "Tipo de Evaluacion": "Test Webhook"
      };

      console.log("Sending webhook data:", webhookData);
      
      const response = await fetch('https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(webhookData),
      });
      
      console.log("Webhook sent!");
      
      toast({
        title: "¡Éxito!",
        description: "Webhook enviado correctamente",
      });
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error al enviar webhook",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-12 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Test Webhook Page</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Test Webhook"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default TestWebhookPage;