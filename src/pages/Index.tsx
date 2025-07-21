import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TrustAuthority from "@/components/sections/TrustAuthority";
import ConditionsTreated from "@/components/sections/ConditionsTreated";
import PatientJourney from "@/components/sections/PatientJourney";
import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail } from "lucide-react";
import AnimatedParticles from "@/components/ui/AnimatedParticles";
import { useEffect } from "react";
import "@/styles/animations.css";
import "@/styles/aurora-text.css";

const Index = () => {
  useEffect(() => {
    // Initialize scroll reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout isHomePage={true}>
      <AnimatedParticles />
      <Hero />
      <div className="scroll-reveal">
        <Services />
      </div>
      <div className="scroll-reveal" style={{ transitionDelay: '0.2s' }}>
        <TrustAuthority />
      </div>
      <div className="scroll-reveal" style={{ transitionDelay: '0.4s' }}>
        <ConditionsTreated />
      </div>
      <div className="scroll-reveal" style={{ transitionDelay: '0.6s' }}>
        <PatientJourney />
      </div>
      
      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-muted/50 scroll-reveal" style={{ transitionDelay: '0.8s' }}>
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">Contáctenos</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
              Estamos aquí para responder a sus preguntas y ayudarle a dar el primer paso hacia su recuperación
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg p-4 sm:p-6 border border-border/60 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Envíenos un Mensaje</h3>
              <ContactForm sourcePage="homepage" />
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-border/60 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Información de Contacto</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mr-2 sm:mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Dirección</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Dr. Eduardo López Moreira 4612 esq. Legión Civil Extranjera, Clínica IMA, Asunción, Paraguay
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mr-2 sm:mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Teléfono</p>
                    <a 
                      href="tel:+59521605535" 
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary mt-1 block"
                    >
                      (+595) 21 605 535
                    </a>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mr-2 sm:mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Email</p>
                    <a 
                      href="mailto:dr.victoradorno@gmail.com" 
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary mt-1 block break-all"
                    >
                      dr.victoradorno@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="pt-3 sm:pt-4">
                  <p className="font-medium mb-2 text-sm sm:text-base">Horario de Atención</p>
                  <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
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
};

export default Index;