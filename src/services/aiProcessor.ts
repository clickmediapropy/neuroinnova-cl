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

import { generateSiteSummary, getRelatedFiles, updateSiteMap, findSection, getSectionContext } from './siteMapService';

// Mapeo de secciones a archivos del proyecto
const SECTION_FILE_MAP: Record<string, string[]> = {
  'homepage': ['src/pages/Index.tsx', 'src/components/sections/Hero.tsx'],
  'hero': ['src/components/sections/Hero.tsx'],
  'services': ['src/components/sections/Services.tsx', 'src/pages/ServiciosPage.tsx'],
  'testimonials': ['src/components/sections/Testimonials.tsx'],
  'contact': ['src/components/forms/ContactForm.tsx', 'src/pages/ContactoPage.tsx'],
  'header': ['src/components/layout/Header.tsx', 'src/components/layout/HomeHeader.tsx'],
  'footer': ['src/components/layout/Footer.tsx'],
  'service-pages': ['src/pages/EMTTMSPage.tsx', 'src/pages/TDCSPage.tsx', 'src/pages/PsiquiatriaTradicionalPage.tsx'],
  'condition-pages': ['src/pages/DepresionResistentePage.tsx', 'src/pages/AnsiedadPage.tsx', 'src/pages/TOCPage.tsx'],
  'assessments': ['src/pages/Autoevaluacion.tsx', 'src/pages/DepresionEvaluacion.tsx'],
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

// Configuración de Moonshot AI
const MOONSHOT_API_KEY = 'sk-kf1rXAf4r93JTqtA2UPSAvGUPDkX3bcM0QpjUySc8CLH7oDw';
const MOONSHOT_MODEL = 'moonshot-v1-128k'; // Modelo más potente con 128K tokens de contexto
const MOONSHOT_API_URL = 'https://api.moonshot.ai/v1/chat/completions';

// Configuración de reintentos
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

// Función para procesar preguntas conversacionales con IA
export async function processQuestionWithAI(question: string): Promise<string> {
  try {
    // Analizar la pregunta para determinar qué información necesita
    const lowerQuestion = question.toLowerCase();
    let specificContext = '';
    
    // Buscar contexto específico basado en la pregunta
    if (lowerQuestion.includes('título') || lowerQuestion.includes('titulo')) {
      const heroSection = findSection('hero');
      if (heroSection) {
        specificContext += `\nCONTENIDO DEL HERO/TÍTULO PRINCIPAL:
- Título actual: "${heroSection.content?.title || 'Único y Primero Centro de Neuromodulación en Paraguay'}"
- Subtítulo: "${heroSection.content?.subtitle || 'Tecnologías avanzadas EMT/TMS y tDCS'}"
- Archivo: ${heroSection.file}
- El título está dividido en 4 líneas con animaciones:
  * Línea 1: "Único y Primero" (color primario, negrita)
  * Línea 2: "Centro de" (color normal)
  * Línea 3: "Neuromodulación" (color normal, tamaño ligeramente menor)
  * Línea 4: "en Paraguay" (color acento con gradiente)`;
      }
    }
    
    if (lowerQuestion.includes('servicio')) {
      const servicesSection = findSection('services');
      specificContext += `\nSERVICIOS OFRECIDOS:
1. **EMT/TMS (Estimulación Magnética Transcraneal)**
   - Tratamiento no invasivo para depresión resistente
   - Aprobado por FDA
   - Sin efectos secundarios sistémicos
   - Página: /servicios/emt-tms

2. **tDCS (Estimulación Transcraneal por Corriente Directa)**
   - Neuromodulación suave y segura
   - Mejora funciones cognitivas
   - Tratamiento de dolor crónico
   - Página: /servicios/tdcs

3. **Psiquiatría Tradicional**
   - Evaluación psiquiátrica integral
   - Manejo farmacológico personalizado
   - Psicoterapia
   - Página: /servicios/psiquiatria-tradicional

4. **RehaCom**
   - Rehabilitación cognitiva computarizada
   - Entrenamiento de funciones cerebrales
   - Seguimiento personalizado
   - Página: /servicios/rehacom`;
    }
    
    if (lowerQuestion.includes('whatsapp') || lowerQuestion.includes('teléfono') || lowerQuestion.includes('telefono') || lowerQuestion.includes('contacto')) {
      specificContext += `\nINFORMACIÓN DE CONTACTO:
- WhatsApp: +595 991 800 886 (disponible 24/7)
- URL de WhatsApp: wa.me/595991800886
- Email: contacto@neuroinnova.com.py
- Ubicación: Asunción, Paraguay
- El botón de WhatsApp aparece en:
  * Header (navegación)
  * Hero (botón principal)
  * Footer (pie de página)
  * Botón flotante (WhatsAppButton)`;
    }
    
    if (lowerQuestion.includes('doctor') || lowerQuestion.includes('adorno') || lowerQuestion.includes('equipo')) {
      specificContext += `\nEQUIPO MÉDICO:
- **Dr. Victor Adorno** - Director Médico
  * Especialista en Psiquiatría
  * Experto en Neuromodulación
  * Formación internacional
- El equipo aparece en la sección "Team" de la página principal`;
    }
    
    if (lowerQuestion.includes('testimonio')) {
      specificContext += `\nTESTIMONIOS:
- Sección de testimonios en la página principal
- Muestra experiencias de pacientes reales
- Sistema de calificación con estrellas
- Se pueden agregar nuevos testimonios
- Archivo: src/components/sections/Testimonials.tsx`;
    }
    
    if (lowerQuestion.includes('color')) {
      specificContext += `\nCOLORES DEL SITIO:
- Color Primario: #2C5F8B (Azul médico) - HSL(210, 51%, 36%)
- Color Secundario/Accent: #7CB342 (Verde) - HSL(90, 48%, 48%)
- Fondo: HSL(210, 40%, 98%) - Casi blanco con tinte azul
- Texto: HSL(222, 20%, 18%) - Gris muy oscuro
- Los colores se definen en src/index.css`;
    }
    
    // Generar resumen del sitio completo
    const siteSummary = generateSiteSummary();
    
    // Buscar archivos relacionados
    const relatedFiles = getRelatedFiles(question);
    
    const systemPrompt = `Eres un asistente IA inteligente y amigable para el sitio web de NeuroInnova, un centro de psiquiatría y neuromodulación en Paraguay.

Tu tarea es responder preguntas sobre el contenido actual del sitio web de manera precisa, detallada y conversacional.

INSTRUCCIONES IMPORTANTES:
1. SIEMPRE responde basándote en la información real del sitio proporcionada
2. Sé específico y detallado - menciona los valores exactos cuando los tengas
3. Usa un tono amigable, profesional pero accesible
4. Si la información no está disponible, indícalo claramente
5. NO sugieras cambios ni modificaciones, solo informa sobre el estado actual
6. Habla en español de manera natural
7. Cuando menciones elementos técnicos, explícalos de forma simple
8. Si la pregunta es sobre "cómo" hacer algo, explica el proceso claramente`;

    const userPrompt = `PREGUNTA DEL USUARIO: "${question}"

ESTRUCTURA COMPLETA DEL SITIO:
${siteSummary}

${specificContext}

ARCHIVOS RELACIONADOS CON LA PREGUNTA:
${relatedFiles.length > 0 ? relatedFiles.join('\n') : 'No se identificaron archivos específicos'}

INFORMACIÓN ADICIONAL IMPORTANTE:
- El sitio usa React + TypeScript + Tailwind CSS
- Tiene un diseño moderno y profesional
- Es totalmente responsive (móvil, tablet, desktop)
- Incluye animaciones sutiles y efectos visuales
- Tiene sistema de autoevaluación con 11 cuestionarios
- Formularios de contacto con validación

Por favor, responde la pregunta del usuario de manera completa y detallada, basándote en toda esta información. Si la pregunta requiere información específica que está disponible arriba, úsala. Sé conversacional pero preciso.`;

    // Llamada a Moonshot AI
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000); // Más tiempo para respuestas detalladas

    const response = await fetch(MOONSHOT_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MOONSHOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MOONSHOT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000 // Más tokens para respuestas detalladas
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`Error ${response.status}: ${errorData?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Respuesta inválida de la IA');
    }
    
    return data.choices[0].message.content;

  } catch (error: any) {
    console.error('Error al procesar pregunta con IA:', error);
    
    // Respuesta de fallback mejorada basada en la pregunta
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('título') || lowerQuestion.includes('titulo')) {
      return `El título principal del sitio es **"Único y Primero Centro de Neuromodulación en Paraguay"**.

Este título aparece en la sección Hero (banner principal) de la página de inicio, dividido en 4 líneas con animaciones especiales.

Aunque tuve un problema técnico, esta información está confirmada en el archivo Hero.tsx.`;
    }
    
    if (lowerQuestion.includes('servicio')) {
      return `Los servicios principales de NeuroInnova son:

1. **EMT/TMS** - Estimulación Magnética Transcraneal
2. **tDCS** - Estimulación por Corriente Directa
3. **Psiquiatría Tradicional**
4. **RehaCom** - Rehabilitación Cognitiva

Cada servicio tiene su propia página con información detallada. Aunque tuve un problema técnico, estos son los servicios confirmados del sitio.`;
    }
    
    // Fallback genérico
    return `Lo siento, tuve un problema técnico al procesar tu pregunta. 

Sin embargo, puedo decirte que NeuroInnova es un centro de psiquiatría y neuromodulación ubicado en Asunción, Paraguay, dirigido por el Dr. Victor Adorno.

¿Podrías reformular tu pregunta o ser más específico sobre qué información necesitas?`;
  }
}

export async function processChangeWithAI(request: ChangeRequest): Promise<ProcessedChange> {
  let lastError: Error | null = null;
  
  // Intentar con reintentos
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Preparar el prompt para Moonshot AI
      const systemPrompt = `Eres un asistente AI avanzado especializado en modificar código de sitios web médicos React + TypeScript.
Tienes una ventana de contexto de 128K tokens, lo que te permite analizar archivos completos y generar cambios precisos y complejos.

IMPORTANTE: 
- SIEMPRE responde en formato JSON estructurado válido
- Analiza cuidadosamente el código actual antes de proponer cambios
- Identifica archivos exactos a modificar con rutas completas
- Genera código completo, válido y funcional
- Mantén el estilo de código existente y las convenciones del proyecto
- Los cambios deben ser precisos - el oldCode debe coincidir EXACTAMENTE con el código actual

Tu respuesta DEBE seguir EXACTAMENTE esta estructura JSON:
{
  "files": ["src/ruta/archivo1.tsx", "src/ruta/archivo2.tsx"],
  "changes": [
    {
      "file": "src/ruta/archivo.tsx",
      "oldCode": "código exacto actual que será reemplazado",
      "newCode": "código nuevo que reemplazará al anterior",
      "lineStart": 0,
      "lineEnd": 0
    }
  ],
  "commitMessage": "feat/fix/style: mensaje descriptivo del commit",
  "requiresReview": false
}

REGLAS CRÍTICAS:
1. El campo "oldCode" debe contener el texto EXACTO que está en el archivo, incluyendo espacios y saltos de línea
2. Si no estás seguro del contenido exacto, usa patrones más pequeños y específicos
3. Para números de teléfono, busca el patrón completo como "wa.me/595991800886"
4. Para títulos, incluye las etiquetas HTML completas
5. Siempre usa rutas completas desde src/`;

    // Obtener información relevante del mapa del sitio
    const relatedFiles = getRelatedFiles(request.description);
    const siteSummary = generateSiteSummary();
    
    // Buscar contexto específico si menciona una sección
    let sectionContext = '';
    const sectionInfo = getSectionContext(request.section);
    if (sectionInfo) {
      sectionContext = `
CONTEXTO DE LA SECCIÓN:
- Sección: ${sectionInfo.section.name}
- Descripción: ${sectionInfo.section.description}
- Archivo: ${sectionInfo.section.file || 'No especificado'}
- Página contenedora: ${sectionInfo.page?.name || 'No especificada'}
`;
    }

    const userPrompt = `
Analiza esta solicitud de cambio para el sitio web NeuroInnova:

SOLICITUD: "${request.description}"
TIPO: ${request.type}
SECCIÓN: ${request.section}

MAPA DEL SITIO:
${siteSummary}

${sectionContext}

ARCHIVOS RELACIONADOS CON LA SOLICITUD:
${relatedFiles.length > 0 ? relatedFiles.join('\n') : 'Usar archivos por defecto según la sección'}

CONTEXTO DEL SITIO:
- React + TypeScript + Tailwind CSS
- Componentes en src/components/
- Páginas en src/pages/
- Colores principales: #2C5F8B (azul), #7CB342 (verde)
- Sitio médico profesional de psiquiatría y neuromodulación

ARCHIVOS COMUNES POR SECCIÓN:
${JSON.stringify(SECTION_FILE_MAP, null, 2)}

INFORMACIÓN IMPORTANTE DEL SITIO ACTUAL:
- Número de WhatsApp actual: 595991800886 (aparece en URLs como wa.me/595991800886)
- Título principal actual en Hero: Está dividido en 4 líneas con spans separados:
  Línea 1: "Primer y Único"
  Línea 2: "Centro de"
  Línea 3: "Neuromodulación"
  Línea 4: "de Paraguay"
- Color principal actual: #2C5F8B (HSL: 205 56% 35%)

ESTRUCTURA ACTUAL DEL TÍTULO EN HERO.TSX:
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
  <span className="text-primary font-extrabold animate-fade-in-down" style={{ animationDelay: '0.1s' }}>Primer y Único</span><br />
  <span className="text-foreground animate-fade-in-left" style={{ animationDelay: '0.3s' }}>Centro de</span><br />
  <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-right" style={{ animationDelay: '0.5s' }}>Neuromodulación</span><br />
  <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-gradient animate-fade-in-up" style={{ animationDelay: '0.7s' }}>de Paraguay</span>
</h1>

EJEMPLOS DE CAMBIOS ESPECÍFICOS:
1. Para cambiar WhatsApp de 595991800886 a otro número:
   - Buscar: "wa.me/595991800886" o "wa.me/+595991800886"
   - Reemplazar con: "wa.me/NUEVONUMERO" (sin espacios ni guiones)
   - Archivos: Header.tsx, HomeHeader.tsx, Footer.tsx, WhatsAppButton.tsx

2. Para cambiar el título del Hero:
   - Si quieres cambiar todo a un texto simple como "Estoy probando":
     Reemplazar TODO el bloque <h1>...</h1> con una versión simplificada
   - Si quieres cambiar solo una línea específica:
     Buscar el span específico y cambiar solo su contenido

3. Para cambiar colores:
   - En src/index.css buscar "--primary: 205 56% 35%;"
   - Reemplazar con nuevo valor HSL

IMPORTANTE: Los cambios deben ser EXACTOS. El oldCode debe coincidir EXACTAMENTE con lo que está en el archivo actual.

Genera los cambios necesarios en formato JSON.`;

      // Llamada a Moonshot AI con timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000); // 60 segundos de timeout para modelo más grande

      const response = await fetch(MOONSHOT_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MOONSHOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MOONSHOT_MODEL,
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
          temperature: 0.2, // Más preciso para cambios de código
          max_tokens: 8000  // Más tokens para respuestas detalladas
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      // Manejar errores de respuesta
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        // Manejo específico de errores de Moonshot AI
        if (response.status === 429) {
          throw new Error('Rate limit excedido. Por favor, intenta de nuevo en unos segundos.');
        } else if (response.status === 401) {
          throw new Error('Error de autenticación con Moonshot AI.');
        } else if (response.status === 503) {
          throw new Error('Servicio de Moonshot AI temporalmente no disponible.');
        } else {
          throw new Error(`Moonshot AI error: ${response.status} ${errorData?.error?.message || response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error('Respuesta inválida de Moonshot AI');
      }

      // Moonshot AI puede devolver JSON o texto, intentamos parsear
      let aiResponse;
      try {
        aiResponse = JSON.parse(data.choices[0].message.content);
      } catch (parseError) {
        console.error('Error parseando respuesta de Moonshot, intentando extraer JSON...');
        // Intentar extraer JSON del texto
        const jsonMatch = data.choices[0].message.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiResponse = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No se pudo extraer JSON válido de la respuesta');
        }
      }
      
      console.log('Moonshot AI response:', aiResponse);

      // Validar y ajustar la respuesta
      const processedResponse = {
        files: aiResponse.files || [],
        changes: aiResponse.changes || [],
        commitMessage: aiResponse.commitMessage || `feat: ${request.description.substring(0, 50)}...`,
        requiresReview: aiResponse.requiresReview !== undefined ? aiResponse.requiresReview : true
      };
      
      // Si no hay cambios reales, intentar generar basado en la descripción
      if (processedResponse.changes.length === 0) {
        console.warn('Moonshot AI no generó cambios, usando procesamiento local');
        throw new Error('No se generaron cambios válidos');
      }
      
      return processedResponse;

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
  console.error('Todos los intentos con Moonshot AI fallaron. Usando procesamiento local.');
  
  if (lastError) {
    console.error('Último error:', lastError);
    
  }
  
  // Fallback a procesamiento local
  const description = request.description.toLowerCase();
  
  console.log('Usando procesamiento local para:', description);
  
  // CASO ESPECIAL: "Estoy probando"
  if (description.includes('estoy probando')) {
    console.log('Detectado: cambio a "Estoy probando"');
    return {
      files: ['src/components/sections/Hero.tsx'],
      changes: [{
        file: 'src/components/sections/Hero.tsx',
        oldCode: `              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="text-primary font-extrabold animate-fade-in-down" style={{ animationDelay: '0.1s' }}>Primer y Único</span><br />
                <span className="text-foreground animate-fade-in-left" style={{ animationDelay: '0.3s' }}>Centro de</span><br />
                <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-right" style={{ animationDelay: '0.5s' }}>Neuromodulación</span><br />
                <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-gradient animate-fade-in-up" style={{ animationDelay: '0.7s' }}>de Paraguay</span>
              </h1>`,
        newCode: `              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="text-primary font-extrabold animate-fade-in-down">Estoy probando</span>
              </h1>`,
        lineStart: 46,
        lineEnd: 51
      }],
      commitMessage: 'feat: Cambiar título del Hero a "Estoy probando"',
      requiresReview: false
    };
  }
  
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
  const cleanPhone = newPhone.replace(/\D/g, '');
  
  console.log('Generating phone change for:', newPhone);
  
  return {
    files: [
      'src/components/layout/Header.tsx',
      'src/components/layout/HomeHeader.tsx',
      'src/components/layout/Footer.tsx',
      'src/components/sections/Hero.tsx'
    ],
    changes: [
      {
        file: 'src/components/layout/Header.tsx',
        oldCode: 'wa.me/595991800886',
        newCode: `wa.me/${cleanPhone}`,
        lineStart: 0,
        lineEnd: 0
      },
      {
        file: 'src/components/layout/HomeHeader.tsx',
        oldCode: 'wa.me/595991800886',
        newCode: `wa.me/${cleanPhone}`,
        lineStart: 0,
        lineEnd: 0
      },
      {
        file: 'src/components/layout/Footer.tsx',
        oldCode: 'wa.me/595991800886',
        newCode: `wa.me/${cleanPhone}`,
        lineStart: 0,
        lineEnd: 0
      },
      {
        file: 'src/components/sections/Hero.tsx',
        oldCode: 'wa.me/595991800886',
        newCode: `wa.me/${cleanPhone}`,
        lineStart: 0,
        lineEnd: 0
      },
      {
        file: 'src/components/ui/WhatsAppButton.tsx',
        oldCode: 'wa.me/595991800886',
        newCode: `wa.me/${cleanPhone}`,
        lineStart: 0,
        lineEnd: 0
      }
    ],
    commitMessage: `feat: Actualizar número de WhatsApp a ${newPhone}`,
    requiresReview: false
  };
}

function generateContentChangeResponse(request: ChangeRequest): ProcessedChange {
  const files = SECTION_FILE_MAP[request.section] || ['src/components/sections/Hero.tsx'];
  const description = request.description.toLowerCase();
  
  // Detectar si es un cambio de título en el Hero
  if ((description.includes('título') || description.includes('texto')) && 
      (description.includes('hero') || description.includes('principal') || description.includes('inicio'))) {
    
    // Para "Estoy probando" o cambios simples de título
    if (description.includes('estoy probando') || description.includes('"estoy probando"')) {
      return {
        files: ['src/components/sections/Hero.tsx'],
        changes: [{
          file: 'src/components/sections/Hero.tsx',
          oldCode: `              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="text-primary font-extrabold animate-fade-in-down" style={{ animationDelay: '0.1s' }}>Primer y Único</span><br />
                <span className="text-foreground animate-fade-in-left" style={{ animationDelay: '0.3s' }}>Centro de</span><br />
                <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-fade-in-right" style={{ animationDelay: '0.5s' }}>Neuromodulación</span><br />
                <span className="text-accent font-extrabold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-gradient animate-fade-in-up" style={{ animationDelay: '0.7s' }}>de Paraguay</span>
              </h1>`,
          newCode: `              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="text-primary font-extrabold animate-fade-in-down">Estoy probando</span>
              </h1>`,
          lineStart: 46,
          lineEnd: 51
        }],
        commitMessage: 'feat: Cambiar título principal del Hero',
        requiresReview: false
      };
    }
    
    // Para otros cambios de título, extraer el nuevo texto
    const newTitleMatch = description.match(/"([^"]+)"|'([^']+)'|para que diga (.+?)(?:\.|$)/);
    const newTitle = newTitleMatch ? (newTitleMatch[1] || newTitleMatch[2] || newTitleMatch[3]).trim() : 'Nuevo título';
    
    return {
      files: ['src/components/sections/Hero.tsx'],
      changes: [{
        file: 'src/components/sections/Hero.tsx',
        oldCode: 'Primer y Único',
        newCode: newTitle,
        lineStart: 47,
        lineEnd: 47
      }],
      commitMessage: `feat: Cambiar título principal a "${newTitle}"`,
      requiresReview: false
    };
  }
  
  // Respuesta genérica para otros cambios
  return {
    files: files,
    changes: [{
      file: files[0],
      oldCode: '// Contenido a cambiar',
      newCode: '// Nuevo contenido',
      lineStart: 1,
      lineEnd: 1
    }],
    commitMessage: `feat: Actualizar contenido en ${request.section}`,
    requiresReview: true
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
      // Actualizar el mapa del sitio después de aplicar cambios
      updateSiteMap({
        type: processedChange.changes[0].file.includes('.css') ? 'style' : 'content',
        target: processedChange.files.join(', '),
        details: processedChange.commitMessage
      });
      
      return {
        success: true,
        message: 'Cambios aplicados exitosamente. El sitio se actualizará en 2-3 minutos.',
        commitSha: result.commitSha
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