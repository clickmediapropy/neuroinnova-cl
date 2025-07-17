import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TrustAuthority from "@/components/sections/TrustAuthority";
import ConditionsTreated from "@/components/sections/ConditionsTreated";
import PatientJourney from "@/components/sections/PatientJourney";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <TrustAuthority />
      <ConditionsTreated />
      <PatientJourney />
      
      {/* Contact Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Contáctenos</h2>
            <p className="text-lg text-muted-foreground">
              Estamos aquí para responder a sus preguntas y ayudarle a dar el primer paso hacia su recuperación
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-border/60 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Envíenos un Mensaje</h3>
              <ContactForm sourcePage="homepage" />
            </div>

            <div className="bg-white rounded-lg p-6 border border-border/60 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera, Clínica IMA, Asunción, Paraguay
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <a 
                      href="tel:+59521605535" 
                      className="text-sm text-muted-foreground hover:text-primary mt-1 block"
                    >
                      (+595) 21 605 535
                    </a>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail className="h-5 w-5 text-primary shrink-0 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:info@neuroinnova.com.py" 
                      className="text-sm text-muted-foreground hover:text-primary mt-1 block"
                    >
                      info@neuroinnova.com.py
                    </a>
                  </div>
                </div>
                
                <div className="pt-4">
                  <p className="font-medium mb-2">Horario de Atención</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Lunes a Viernes: 8:00 - 19:00</p>
                    <p>Sábados: 8:00 - 12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );

export default Index;
