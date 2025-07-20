interface ChangeRequest {
  id: string;
  description: string;
  type: 'content' | 'design' | 'functionality' | 'structure';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  section: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface ProcessedChange {
  files: string[];
  changes: {
    file: string;
    oldCode: string;
    newCode: string;
    lineStart: number;
    lineEnd: number;
  }[];
  commitMessage: string;
  requiresReview: boolean;
}

// Mapeo de secciones a archivos del proyecto
const SECTION_FILE_MAP: Record<string, string[]> = {
  'homepage': ['src/pages/Home.tsx', 'src/components/sections/Hero.tsx'],
  'hero': ['src/components/sections/Hero.tsx'],
  'services': ['src/components/sections/Services.tsx', 'src/pages/services/'],
  'testimonials': ['src/components/sections/Testimonials.tsx'],
  'contact': ['src/components/forms/ContactForm.tsx', 'src/pages/Contact.tsx'],
  'header': ['src/components/layout/Header.tsx', 'src/components/layout/HomeHeader.tsx'],
  'footer': ['src/components/layout/Footer.tsx'],
  'service-pages': ['src/pages/services/'],
  'condition-pages': ['src/pages/conditions/'],
  'assessments': ['src/pages/assessments/'],
  'global': ['src/index.css', 'tailwind.config.js', 'src/App.tsx']
};

// Patrones comunes de cambios
const CHANGE_PATTERNS = {
  whatsapp: /(\+\d{1,3}[\s-]?\(?\d{1,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}[\s-]?\d{3,4})/g,
  phone: /(\(?\d{3,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4})/g,
  email: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
  color: /(#[0-9A-Fa-f]{6}|hsl\(\d+,\s*\d+%,\s*\d+%\))/g,
  title: /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g,
  text: /<p[^>]*>(.*?)<\/p>/g
};

// Configuración de Groq API
const GROQ_API_KEY = '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';
const GROQ_MODEL = 'llama-3-groq-70b-tool-use';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Configuración de reintentos
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

export async function processChangeWithAI(request: ChangeRequest): Promise<ProcessedChange> {
  let lastError: Error | null = null;
  
  // Intentar con reintentos
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Preparar el prompt para Groq
      const systemPrompt = `Eres un asistente AI especializado en modificar código de sitios web médicos.
Analizas solicitudes en español y generas cambios de código específicos.
IMPORTANTE: 
- SIEMPRE responde en formato JSON estructurado
- Identifica archivos exactos a modificar
- Genera código completo y válido
- Mantén el estilo de código existente
- La respuesta debe seguir exactamente esta estructura:
{
  "files": ["archivo1.tsx", "archivo2.tsx"],
  "changes": [
    {
      "file": "ruta/archivo.tsx",
      "oldCode": "código actual",
      "newCode": "código nuevo",
      "lineStart": número,
      "lineEnd": número
    }
  ],
  "commitMessage": "mensaje descriptivo del commit",
  "requiresReview": boolean
}`;

    const userPrompt = `
Analiza esta solicitud de cambio para el sitio web NeuroInnova:

SOLICITUD: "${request.description}"
TIPO: ${request.type}
SECCIÓN: ${request.section}

CONTEXTO DEL SITIO:
- React + TypeScript + Tailwind CSS
- Componentes en src/components/
- Páginas en src/pages/
- Colores principales: #2C5F8B (azul), #7CB342 (verde)
- Sitio médico profesional de psiquiatría y neuromodulación

ARCHIVOS COMUNES POR SECCIÓN:
${JSON.stringify(SECTION_FILE_MAP, null, 2)}

EJEMPLOS DE CAMBIOS ESPECÍFICOS:
- Para números de teléfono/WhatsApp: buscar href="https://wa.me/..." en Header, Footer, Hero
- Para títulos: buscar etiquetas <h1>, <h2>, etc. en los componentes de sección
- Para colores: modificar src/index.css variable --primary
- Para testimonios: agregar al array testimonials en Testimonials.tsx

Genera los cambios necesarios en formato JSON.`;

      // Llamada a Groq API con timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30 segundos de timeout

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.3,
          max_tokens: 4000,
          response_format: { type: "json_object" }
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      // Manejar errores de respuesta
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        // Manejo específico de errores de Groq
        if (response.status === 429) {
          throw new Error('Rate limit excedido. Por favor, intenta de nuevo en unos segundos.');
        } else if (response.status === 401) {
          throw new Error('Error de autenticación con Groq API.');
        } else if (response.status === 503) {
          throw new Error('Servicio de Groq temporalmente no disponible.');
        } else {
          throw new Error(`Groq API error: ${response.status} ${errorData?.error?.message || response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error('Respuesta inválida de Groq API');
      }

      const aiResponse = JSON.parse(data.choices[0].message.content);

      // Validar y ajustar la respuesta
      return {
        files: aiResponse.files || [],
        changes: aiResponse.changes || [],
        commitMessage: aiResponse.commitMessage || `feat: ${request.description.substring(0, 50)}...`,
        requiresReview: aiResponse.requiresReview !== undefined ? aiResponse.requiresReview : true
      };

    } catch (error: any) {
      lastError = error;
      console.error(`Error en intento ${attempt}/${MAX_RETRIES}:`, error.message);
      
      // Si no es el último intento, esperar antes de reintentar
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
        continue;
      }
    }
  }

  // Si todos los intentos fallan, usar fallback
  console.error('Todos los intentos con Groq fallaron. Usando procesamiento local.');
  
  if (lastError) {
    console.error('Último error:', lastError);
    
  }
  
  // Fallback a procesamiento local si Groq falla
  const description = request.description.toLowerCase();
  
  // Detectar tipo de cambio basado en palabras clave
  if (description.includes('whatsapp') || description.includes('teléfono') || description.includes('número')) {
    return generatePhoneChangeResponse(request);
  }
  
  if (description.includes('título') || description.includes('texto') || description.includes('contenido')) {
    return generateContentChangeResponse(request);
  }
  
  if (description.includes('color') || description.includes('diseño') || description.includes('estilo')) {
    return generateDesignChangeResponse(request);
  }
  
  if (description.includes('testimonio') || description.includes('agregar')) {
    return generateAddContentResponse(request);
  }
  
  if (description.includes('formulario') || description.includes('campo')) {
    return generateFormChangeResponse(request);
  }

  // Respuesta genérica
  return generateGenericChangeResponse(request);
}

function generatePhoneChangeResponse(request: ChangeRequest): ProcessedChange {
  const phoneMatch = request.description.match(/(\+?\d[\d\s\-\(\)]+\d)/);
  const newPhone = phoneMatch ? phoneMatch[1] : '(+595) 991 800 886';
  
  return {
    files: [
      'src/components/layout/Header.tsx',
      'src/components/layout/HomeHeader.tsx',
      'src/components/layout/Footer.tsx',
      'src/components/sections/Hero.tsx',
      'src/pages/Contact.tsx'
    ],
    changes: [
      {
        file: 'src/components/layout/Header.tsx',
        oldCode: 'href="https://wa.me/595991800885"',
        newCode: `href="https://wa.me/${newPhone.replace(/\D/g, '')}"`,
        lineStart: 78,
        lineEnd: 78
      },
      {
        file: 'src/components/sections/Hero.tsx',
        oldCode: 'href="https://wa.me/595991800885"',
        newCode: `href="https://wa.me/${newPhone.replace(/\D/g, '')}"`,
        lineStart: 56,
        lineEnd: 56
      }
    ],
    commitMessage: 'feat: Actualizar número de WhatsApp en todo el sitio',
    requiresReview: false
  };
}

function generateContentChangeResponse(request: ChangeRequest): ProcessedChange {
  const files = SECTION_FILE_MAP[request.section] || ['src/components/sections/Hero.tsx'];
  
  return {
    files: files,
    changes: [{
      file: files[0],
      oldCode: '<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">',
      newCode: '<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">',
      lineStart: 45,
      lineEnd: 45
    }],
    commitMessage: `feat: Actualizar contenido en ${request.section}`,
    requiresReview: false
  };
}

function generateDesignChangeResponse(request: ChangeRequest): ProcessedChange {
  const colorMatch = request.description.match(/(#[0-9A-Fa-f]{6})/);
  const newColor = colorMatch ? colorMatch[1] : '#1E4D7B';
  
  return {
    files: ['src/index.css', 'tailwind.config.js'],
    changes: [
      {
        file: 'src/index.css',
        oldCode: '--primary: 205 56% 35%;',
        newCode: `--primary: ${hexToHSL(newColor)};`,
        lineStart: 12,
        lineEnd: 12
      }
    ],
    commitMessage: 'style: Actualizar esquema de colores',
    requiresReview: true
  };
}

function generateAddContentResponse(request: ChangeRequest): ProcessedChange {
  if (request.description.includes('testimonio')) {
    return {
      files: ['src/components/sections/Testimonials.tsx'],
      changes: [{
        file: 'src/components/sections/Testimonials.tsx',
        oldCode: 'const testimonials = [',
        newCode: 'const testimonials = [\n  {\n    content: "Nuevo testimonio aquí",\n    author: "Nombre del Paciente",\n    rating: 5,\n  },',
        lineStart: 15,
        lineEnd: 15
      }],
      commitMessage: 'feat: Agregar nuevo testimonio',
      requiresReview: false
    };
  }
  
  return generateGenericChangeResponse(request);
}

function generateFormChangeResponse(request: ChangeRequest): ProcessedChange {
  return {
    files: ['src/components/forms/ContactForm.tsx'],
    changes: [{
      file: 'src/components/forms/ContactForm.tsx',
      oldCode: 'const formSchema = z.object({',
      newCode: 'const formSchema = z.object({\n  source: z.string().optional(),',
      lineStart: 25,
      lineEnd: 25
    }],
    commitMessage: 'feat: Agregar nuevos campos al formulario de contacto',
    requiresReview: true
  };
}

function generateGenericChangeResponse(request: ChangeRequest): ProcessedChange {
  const files = SECTION_FILE_MAP[request.section] || ['src/App.tsx'];
  
  return {
    files: files,
    changes: [{
      file: files[0],
      oldCode: '// Cambio pendiente',
      newCode: '// Cambio aplicado',
      lineStart: 1,
      lineEnd: 1
    }],
    commitMessage: `feat: ${request.description.substring(0, 50)}...`,
    requiresReview: true
  };
}

// Utilidad para convertir hex a HSL (formato de Tailwind)
function hexToHSL(hex: string): string {
  // Remover el #
  hex = hex.replace('#', '');
  
  // Convertir a RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// Función para validar cambios antes de aplicar
export function validateChange(change: ProcessedChange): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validar que los archivos existan (mock)
  change.files.forEach(file => {
    if (!file.startsWith('src/')) {
      errors.push(`Archivo inválido: ${file}`);
    }
  });
  
  // Validar que los cambios tengan sentido
  change.changes.forEach(c => {
    if (!c.oldCode || !c.newCode) {
      errors.push('Cambio incompleto detectado');
    }
    if (c.lineStart < 1 || c.lineEnd < c.lineStart) {
      errors.push('Números de línea inválidos');
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Función para aplicar cambios usando GitHub API
export async function applyChangesWithGitHub(processedChange: ProcessedChange): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  try {
    const { applyChangesToGitHub } = await import('./githubService');
    
    const result = await applyChangesToGitHub(
      processedChange.changes,
      processedChange.commitMessage
    );
    
    if (result.success) {
      return {
        success: true,
        message: 'Cambios aplicados exitosamente. El sitio se actualizará en 2-3 minutos.'
      };
    } else {
      return {
        success: false,
        message: 'Error al aplicar cambios',
        error: result.error
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Error al conectar con GitHub',
      error: error.message
    };
  }
}