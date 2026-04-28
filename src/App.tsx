import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other pages
const Autoevaluacion = lazy(() => import("./pages/Autoevaluacion"));
const DepresionEvaluacion = lazy(() => import("./pages/DepresionEvaluacion"));
const AnsiedadEvaluacion = lazy(() => import("./pages/AnsiedadEvaluacion"));
const BipolarEvaluacion = lazy(() => import("./pages/BipolarEvaluacion"));
const PTSDEvaluacion = lazy(() => import("./pages/PTSDEvaluacion"));
const PsicosisEvaluacion = lazy(() => import("./pages/PsicosisEvaluacion"));
const ADHDEvaluacion = lazy(() => import("./pages/ADHDEvaluacion"));
const TrastornoAlimentarioEvaluacion = lazy(() => import("./pages/TrastornoAlimentarioEvaluacion"));
const AdiccionEvaluacion = lazy(() => import("./pages/AdiccionEvaluacion"));
const DepresionPostpartoEvaluacion = lazy(() => import("./pages/DepresionPostpartoEvaluacion"));
const EvaluacionPadresEvaluacion = lazy(() => import("./pages/EvaluacionPadresEvaluacion"));
const JovenesEvaluacion = lazy(() => import("./pages/JovenesEvaluacion"));
const EMTTMSPage = lazy(() => import("./pages/EMTTMSPage"));
const TDCSPage = lazy(() => import("./pages/TDCSPage"));
const DepresionResistentePage = lazy(() => import("./pages/DepresionResistentePage"));
const AnsiedadPage = lazy(() => import("./pages/AnsiedadPage"));
const TOCPage = lazy(() => import("./pages/TOCPage"));
const DolorCronicoPage = lazy(() => import("./pages/DolorCronicoPage"));
const RehabilitacionPostACVPage = lazy(() => import("./pages/RehabilitacionPostACVPage"));
const ParkinsonPage = lazy(() => import("./pages/ParkinsonPage"));
const FibromialgiaPage = lazy(() => import("./pages/FibromialgiaPage"));
const AdiccionesPage = lazy(() => import("./pages/AdiccionesPage"));
const ContactoPage = lazy(() => import("./pages/ContactoPage"));
const PoliticaPrivacidadPage = lazy(() => import("./pages/PoliticaPrivacidadPage"));
const TerminosCondicionesPage = lazy(() => import("./pages/TerminosCondicionesPage"));
const AvisoLegalPage = lazy(() => import("./pages/AvisoLegalPage"));
const ServiciosPage = lazy(() => import("./pages/ServiciosPage"));
const CondicionesPage = lazy(() => import("./pages/CondicionesPage"));
const RehaComPage = lazy(() => import("./pages/servicios/RehaComPage"));
const AdminPanel = lazy(() => import("./pages/AdminPanelChat"));
// const BlogPage = lazy(() => import("./pages/BlogPage"));
// const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

const queryClient = new QueryClient();

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
          <Route path="/servicios/rehacom" element={<RehaComPage />} />
          <Route path="/condiciones" element={<CondicionesPage />} />
          <Route path="/condiciones/depresion-resistente" element={<DepresionResistentePage />} />
          <Route path="/condiciones/ansiedad" element={<AnsiedadPage />} />
          <Route path="/condiciones/toc" element={<TOCPage />} />
          <Route path="/condiciones/dolor-cronico" element={<DolorCronicoPage />} />
          <Route path="/condiciones/rehabilitacion-post-acv" element={<RehabilitacionPostACVPage />} />
          <Route path="/condiciones/parkinson" element={<ParkinsonPage />} />
          <Route path="/condiciones/fibromialgia" element={<FibromialgiaPage />} />
          <Route path="/condiciones/adicciones" element={<AdiccionesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
          <Route path="/terminos-condiciones" element={<TerminosCondicionesPage />} />
          <Route path="/aviso-legal" element={<AvisoLegalPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
