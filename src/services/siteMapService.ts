import { readFileSync } from 'fs';
import { join } from 'path';

export interface SiteSection {
  id: string;
  name: string;
  description: string;
  file?: string;
  component?: string;
  content?: {
    title?: string;
    subtitle?: string;
    mainText?: string;
    buttons?: string[];
    links?: string[];
  };
  children?: SiteSection[];
}

export interface SitePage {
  path: string;
  name: string;
  description: string;
  file: string;
  sections?: SiteSection[];
  metadata?: {
    title?: string;
    description?: string;
  };
}

export interface SiteMap {
  pages: SitePage[];
  components: {
    layout: SiteSection[];
    sections: SiteSection[];
    forms: SiteSection[];
  };
  lastUpdated: Date;
}

// Mapa estático del sitio - actualizado manualmente por ahora
export const SITE_STRUCTURE: SiteMap = {
  pages: [
    {
      path: '/',
      name: 'Página Principal',
      description: 'Landing page con todas las secciones principales',
      file: 'src/pages/Index.tsx',
      sections: [
        {
          id: 'hero',
          name: 'Hero/Banner Principal',
          description: 'Sección principal con título "Único y Primero Centro de Neuromodulación en Paraguay"',
          file: 'src/components/sections/Hero.tsx',
          content: {
            title: 'Único y Primero Centro de Neuromodulación en Paraguay',
            subtitle: 'Tecnologías avanzadas EMT/TMS y tDCS',
            buttons: ['WhatsApp disponible 24/7', '¿Es Candidato?']
          }
        },
        {
          id: 'features',
          name: 'Características',
          description: 'Beneficios y características del centro',
          file: 'src/components/sections/Features.tsx'
        },
        {
          id: 'services',
          name: 'Servicios',
          description: 'Lista de servicios ofrecidos',
          file: 'src/components/sections/Services.tsx',
          content: {
            title: 'Nuestros Servicios',
            subtitle: 'Tratamientos especializados con tecnología de vanguardia'
          }
        },
        {
          id: 'testimonials',
          name: 'Testimonios',
          description: 'Testimonios de pacientes',
          file: 'src/components/sections/Testimonials.tsx',
          content: {
            title: 'Testimonios de Pacientes',
            subtitle: 'Experiencias reales de personas que han mejorado su calidad de vida'
          }
        },
        {
          id: 'team',
          name: 'Equipo',
          description: 'Dr. Victor Adorno y equipo',
          file: 'src/components/sections/Team.tsx'
        },
        {
          id: 'cta',
          name: 'Llamada a la acción',
          description: 'Sección de contacto rápido',
          file: 'src/components/sections/CTA.tsx'
        }
      ]
    },
    {
      path: '/servicios',
      name: 'Página de Servicios',
      description: 'Lista completa de todos los servicios',
      file: 'src/pages/ServiciosPage.tsx'
    },
    {
      path: '/servicios/emt-tms',
      name: 'EMT/TMS',
      description: 'Estimulación Magnética Transcraneal',
      file: 'src/pages/EMTTMSPage.tsx'
    },
    {
      path: '/servicios/tdcs',
      name: 'tDCS',
      description: 'Estimulación Transcraneal por Corriente Directa',
      file: 'src/pages/TDCSPage.tsx'
    },
    {
      path: '/servicios/psiquiatria-tradicional',
      name: 'Psiquiatría Tradicional',
      description: 'Servicios de psiquiatría convencional',
      file: 'src/pages/PsiquiatriaTradicionalPage.tsx'
    },
    {
      path: '/servicios/rehacom',
      name: 'RehaCom',
      description: 'Rehabilitación cognitiva computarizada',
      file: 'src/pages/servicios/RehaComPage.tsx'
    },
    {
      path: '/condiciones',
      name: 'Condiciones Tratadas',
      description: 'Lista de condiciones que tratamos',
      file: 'src/pages/CondicionesPage.tsx'
    },
    {
      path: '/condiciones/depresion-resistente',
      name: 'Depresión Resistente',
      description: 'Información sobre depresión resistente al tratamiento',
      file: 'src/pages/DepresionResistentePage.tsx'
    },
    {
      path: '/condiciones/ansiedad',
      name: 'Ansiedad',
      description: 'Información sobre trastornos de ansiedad',
      file: 'src/pages/AnsiedadPage.tsx'
    },
    {
      path: '/condiciones/toc',
      name: 'TOC',
      description: 'Trastorno Obsesivo Compulsivo',
      file: 'src/pages/TOCPage.tsx'
    },
    {
      path: '/condiciones/dolor-cronico',
      name: 'Dolor Crónico',
      description: 'Tratamiento del dolor crónico',
      file: 'src/pages/DolorCronicoPage.tsx'
    },
    {
      path: '/condiciones/rehabilitacion-post-acv',
      name: 'Rehabilitación Post-ACV',
      description: 'Rehabilitación después de accidente cerebrovascular',
      file: 'src/pages/RehabilitacionPostACVPage.tsx'
    },
    {
      path: '/autoevaluacion',
      name: 'Autoevaluaciones',
      description: 'Portal de autoevaluaciones de salud mental',
      file: 'src/pages/Autoevaluacion.tsx'
    },
    {
      path: '/contacto',
      name: 'Contacto',
      description: 'Página de contacto con formulario',
      file: 'src/pages/ContactoPage.tsx'
    },
    {
      path: '/agendar-consulta',
      name: 'Agendar Consulta',
      description: 'Formulario para agendar consultas',
      file: 'src/pages/AgendarConsultaPage.tsx'
    }
  ],
  components: {
    layout: [
      {
        id: 'header',
        name: 'Header/Navegación',
        description: 'Barra de navegación principal',
        file: 'src/components/layout/Header.tsx',
        content: {
          links: ['Inicio', 'Servicios', 'Condiciones', 'Autoevaluación', 'Contacto']
        }
      },
      {
        id: 'home-header',
        name: 'Header de Homepage',
        description: 'Header especial para la página principal',
        file: 'src/components/layout/HomeHeader.tsx'
      },
      {
        id: 'footer',
        name: 'Footer/Pie de página',
        description: 'Pie de página con información de contacto y enlaces',
        file: 'src/components/layout/Footer.tsx',
        content: {
          mainText: 'NeuroInnova - Centro de Neuromodulación',
          links: ['WhatsApp', 'Email', 'Dirección', 'Política de Privacidad', 'Términos']
        }
      }
    ],
    sections: [],
    forms: [
      {
        id: 'contact-form',
        name: 'Formulario de Contacto',
        description: 'Formulario principal de contacto',
        component: 'ContactForm'
      },
      {
        id: 'appointment-form',
        name: 'Formulario de Citas',
        description: 'Formulario para agendar consultas',
        component: 'AppointmentForm'
      }
    ]
  },
  lastUpdated: new Date()
};

// Función para buscar secciones por ID o nombre
export function findSection(query: string): SiteSection | undefined {
  const lowerQuery = query.toLowerCase();
  
  // Buscar en páginas
  for (const page of SITE_STRUCTURE.pages) {
    if (page.sections) {
      const section = page.sections.find(s => 
        s.id.toLowerCase() === lowerQuery ||
        s.name.toLowerCase().includes(lowerQuery)
      );
      if (section) return section;
    }
  }
  
  // Buscar en componentes
  const allComponents = [
    ...SITE_STRUCTURE.components.layout,
    ...SITE_STRUCTURE.components.sections,
    ...SITE_STRUCTURE.components.forms
  ];
  
  return allComponents.find(c => 
    c.id.toLowerCase() === lowerQuery ||
    c.name.toLowerCase().includes(lowerQuery)
  );
}

// Función para buscar páginas
export function findPage(query: string): SitePage | undefined {
  const lowerQuery = query.toLowerCase();
  
  return SITE_STRUCTURE.pages.find(p => 
    p.path === query ||
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

// Función para obtener contexto completo de una sección
export function getSectionContext(sectionId: string): {
  section: SiteSection;
  page?: SitePage;
  relatedSections?: SiteSection[];
} | undefined {
  const section = findSection(sectionId);
  if (!section) return undefined;
  
  // Encontrar la página que contiene esta sección
  const page = SITE_STRUCTURE.pages.find(p => 
    p.sections?.some(s => s.id === section.id)
  );
  
  // Encontrar secciones relacionadas
  const relatedSections = page?.sections?.filter(s => s.id !== section.id);
  
  return {
    section,
    page,
    relatedSections
  };
}

// Función para generar un resumen del sitio para la IA
export function generateSiteSummary(): string {
  let summary = `# Estructura del Sitio Web NeuroInnova\n\n`;
  
  summary += `## Páginas Principales:\n`;
  SITE_STRUCTURE.pages.forEach(page => {
    summary += `- **${page.name}** (${page.path}): ${page.description}\n`;
    if (page.sections) {
      page.sections.forEach(section => {
        summary += `  - ${section.name}: ${section.description}\n`;
      });
    }
  });
  
  summary += `\n## Componentes Globales:\n`;
  summary += `### Header/Navegación:\n`;
  SITE_STRUCTURE.components.layout.forEach(comp => {
    summary += `- ${comp.name}: ${comp.description}\n`;
  });
  
  summary += `\n## Información de Contacto:\n`;
  summary += `- WhatsApp: +595 991 800 886\n`;
  summary += `- Email: contacto@neuroinnova.com.py\n`;
  summary += `- Ubicación: Asunción, Paraguay\n`;
  
  return summary;
}

// Función para actualizar el mapa después de un cambio
export function updateSiteMap(change: {
  type: 'content' | 'structure' | 'style';
  target: string;
  details: any;
}): void {
  // Por ahora solo actualizamos la fecha
  // En el futuro, esto podría actualizar dinámicamente la estructura
  SITE_STRUCTURE.lastUpdated = new Date();
  
  // Log del cambio para referencia
  console.log('Site map updated:', {
    type: change.type,
    target: change.target,
    timestamp: SITE_STRUCTURE.lastUpdated
  });
}

// Función para obtener archivos relacionados con una solicitud
export function getRelatedFiles(request: string): string[] {
  const files: string[] = [];
  const lowerRequest = request.toLowerCase();
  
  // Palabras clave para identificar secciones
  const keywords = {
    hero: ['hero', 'título principal', 'banner', 'principal'],
    header: ['navegación', 'menú', 'header', 'barra'],
    footer: ['footer', 'pie', 'pie de página'],
    contact: ['contacto', 'whatsapp', 'teléfono', 'email'],
    services: ['servicios', 'tratamientos'],
    testimonials: ['testimonios', 'opiniones', 'reseñas'],
    team: ['equipo', 'doctor', 'dr. adorno', 'victor adorno']
  };
  
  // Buscar archivos relacionados basados en palabras clave
  Object.entries(keywords).forEach(([key, terms]) => {
    if (terms.some(term => lowerRequest.includes(term))) {
      const section = findSection(key);
      if (section?.file) {
        files.push(section.file);
      }
    }
  });
  
  // Si menciona una página específica
  const page = SITE_STRUCTURE.pages.find(p => 
    lowerRequest.includes(p.name.toLowerCase()) ||
    lowerRequest.includes(p.path)
  );
  
  if (page) {
    files.push(page.file);
    if (page.sections) {
      page.sections.forEach(s => {
        if (s.file) files.push(s.file);
      });
    }
  }
  
  return [...new Set(files)]; // Eliminar duplicados
}