import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Autoevaluacion from "./pages/Autoevaluacion";
import DepresionEvaluacion from "./pages/DepresionEvaluacion";
import AnsiedadEvaluacion from "./pages/AnsiedadEvaluacion";
import EMTTMSPage from "./pages/EMTTMSPage";
import TDCSPage from "./pages/TDCSPage";
import PsiquiatriaTradicionalPage from "./pages/PsiquiatriaTradicionalPage";
import DepresionResistentePage from "./pages/DepresionResistentePage";
import AnsiedadPage from "./pages/AnsiedadPage";
import TOCPage from "./pages/TOCPage";
import DolorCronicoPage from "./pages/DolorCronicoPage";
import RehabilitacionPostACVPage from "./pages/RehabilitacionPostACVPage";
import ContactoPage from "./pages/ContactoPage";
import AgendarConsultaPage from "./pages/AgendarConsultaPage";
import PoliticaPrivacidadPage from "./pages/PoliticaPrivacidadPage";
import TerminosCondicionesPage from "./pages/TerminosCondicionesPage";
import AvisoLegalPage from "./pages/AvisoLegalPage";
import ServiciosPage from "./pages/ServiciosPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/autoevaluacion/depresion" element={<DepresionEvaluacion />} />
          <Route path="/autoevaluacion/ansiedad" element={<AnsiedadEvaluacion />} />
          <Route path="/servicios/emt-tms" element={<EMTTMSPage />} />
          <Route path="/servicios/tdcs" element={<TDCSPage />} />
          <Route path="/servicios/psiquiatria-tradicional" element={<PsiquiatriaTradicionalPage />} />
          <Route path="/condiciones/depresion-resistente" element={<DepresionResistentePage />} />
          <Route path="/condiciones/ansiedad" element={<AnsiedadPage />} />
          <Route path="/condiciones/toc" element={<TOCPage />} />
          <Route path="/condiciones/dolor-cronico" element={<DolorCronicoPage />} />
          <Route path="/condiciones/rehabilitacion-post-acv" element={<RehabilitacionPostACVPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/agendar-consulta" element={<AgendarConsultaPage />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
          <Route path="/terminos-condiciones" element={<TerminosCondicionesPage />} />
          <Route path="/aviso-legal" element={<AvisoLegalPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
