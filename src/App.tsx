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
import BipolarEvaluacion from "./pages/BipolarEvaluacion";
import PTSDEvaluacion from "./pages/PTSDEvaluacion";
import PsicosisEvaluacion from "./pages/PsicosisEvaluacion";
import ADHDEvaluacion from "./pages/ADHDEvaluacion";
import TrastornoAlimentarioEvaluacion from "./pages/TrastornoAlimentarioEvaluacion";
import AdiccionEvaluacion from "./pages/AdiccionEvaluacion";
import DepresionPostpartoEvaluacion from "./pages/DepresionPostpartoEvaluacion";
import EvaluacionPadresEvaluacion from "./pages/EvaluacionPadresEvaluacion";
import JovenesEvaluacion from "./pages/JovenesEvaluacion";
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
import CondicionesPage from "./pages/CondicionesPage";
import ScrollToTop from "./components/ScrollToTop";
import TestWebhookPage from "./pages/TestWebhookPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/autoevaluacion/depresion" element={<DepresionEvaluacion />} />
          <Route path="/autoevaluacion/ansiedad" element={<AnsiedadEvaluacion />} />
          <Route path="/autoevaluacion/bipolar" element={<BipolarEvaluacion />} />
          <Route path="/autoevaluacion/ptsd" element={<PTSDEvaluacion />} />
          <Route path="/autoevaluacion/psicosis" element={<PsicosisEvaluacion />} />
          <Route path="/autoevaluacion/adhd" element={<ADHDEvaluacion />} />
          <Route path="/autoevaluacion/trastorno-alimentario" element={<TrastornoAlimentarioEvaluacion />} />
          <Route path="/autoevaluacion/adiccion" element={<AdiccionEvaluacion />} />
          <Route path="/autoevaluacion/depresion-postparto" element={<DepresionPostpartoEvaluacion />} />
          <Route path="/autoevaluacion/padres-hijos" element={<EvaluacionPadresEvaluacion />} />
          <Route path="/autoevaluacion/jovenes" element={<JovenesEvaluacion />} />
          <Route path="/servicios/emt-tms" element={<EMTTMSPage />} />
          <Route path="/servicios/tdcs" element={<TDCSPage />} />
          <Route path="/servicios/psiquiatria-tradicional" element={<PsiquiatriaTradicionalPage />} />
          <Route path="/condiciones" element={<CondicionesPage />} />
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
          <Route path="/test-webhook" element={<TestWebhookPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
