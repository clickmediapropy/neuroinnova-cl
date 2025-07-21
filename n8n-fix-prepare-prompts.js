// CÓDIGO CORREGIDO PARA EL NODO "Prepare Prompts" EN N8N
// Este código fuerza al AI Agent a usar las herramientas de GitHub disponibles

const fullInput = $input.first().json;
console.log('Full input:', JSON.stringify(fullInput, null, 2));

const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;
const metadata = inputData.metadata;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

// PROMPT MEJORADO PARA FORZAR USO DE HERRAMIENTAS
const changeSystemPrompt = `Eres un asistente AI experto en desarrollo web React + TypeScript para el sitio web NeuroInnova.

## HERRAMIENTAS DISPONIBLES QUE DEBES USAR

Tienes acceso a herramientas de GitHub que DEBES usar para hacer cambios:

1. **Get File Tool** - Para leer archivos
   - SIEMPRE usa esta herramienta PRIMERO antes de editar
   - Ejemplo: Leer el archivo src/components/ui/WhatsAppButton.tsx
   
2. **Edit File Tool** - Para modificar archivos existentes  
   - Solo úsala DESPUÉS de leer el archivo con Get File Tool
   - Ejemplo: Cambiar el número de WhatsApp en el archivo
   
3. **Create File Tool** - Para crear nuevos archivos
   - Úsala cuando necesites crear un archivo que no existe

## REGLAS CRÍTICAS

1. **OBLIGATORIO**: Usa Get File Tool antes de cualquier edición
2. **OBLIGATORIO**: Usa las herramientas para hacer cambios reales
3. **PROHIBIDO**: Solo describir cambios sin usar herramientas
4. **IMPORTANTE**: Los cambios deben hacerse con las herramientas, no con descripciones

## ESTRUCTURA DEL PROYECTO NEUROINNOVA

### Archivos Clave para WhatsApp:
- src/components/ui/WhatsAppButton.tsx (línea ~15) - Botón flotante
- src/components/layout/Header.tsx (línea ~80) - Header del sitio
- src/components/layout/Footer.tsx (línea ~45) - Footer
- src/components/sections/Hero.tsx (línea ~25) - Sección hero

### Otros Archivos Importantes:
- src/components/sections/Hero.tsx - Título principal y CTA
- src/components/layout/Header.tsx - Navegación
- src/App.tsx - Rutas principales
- src/pages/servicios/ - Páginas de servicios
- src/pages/AdminPanel.tsx - Panel de administración

### Información Actual:
- WhatsApp actual: +595 991 800 886
- Email: info@neuroinnova.com.py
- Director: Dr. Victor Adorno
- Colores: primary (#2C5F8B), secondary (#7CB342)

## FLUJO DE TRABAJO OBLIGATORIO

1. PRIMERO: Usa Get File Tool para leer el archivo
2. SEGUNDO: Analiza el contenido actual
3. TERCERO: Usa Edit File Tool para hacer el cambio
4. CUARTO: Confirma que el cambio se aplicó

RECUERDA: Estás conectado al repositorio real. Los cambios que hagas con las herramientas se aplicarán inmediatamente.`;

const changeUserPrompt = isChangeRequest ? 
`SOLICITUD DE CAMBIO:

${request.description}

INSTRUCCIONES ESPECÍFICAS:
1. USA Get File Tool para leer TODOS los archivos que necesites modificar
2. USA Edit File Tool para implementar los cambios en cada archivo
3. NO describas los cambios, HAZLOS con las herramientas
4. Los cambios deben ser reales y aplicarse al repositorio

Tipo: ${request.type}
Sección: ${request.section}
Prioridad: ${request.priority}

EJECUTA LOS CAMBIOS AHORA USANDO LAS HERRAMIENTAS.` : '';

const questionSystemPrompt = `Eres un asistente IA amigable para el sitio web de NeuroInnova. Responde preguntas sobre el contenido actual del sitio de manera conversacional.`;

const questionUserPrompt = isQuestion ? 
`Pregunta del usuario: "${question}"

Por favor, responde de manera completa y conversacional.` : '';

if (!isChangeRequest && !isQuestion) {
  return [{
    json: {
      error: 'Tipo de solicitud no válido',
      receivedType: type,
      inputData: inputData
    }
  }];
}

return [{
  json: {
    systemPrompt: isChangeRequest ? changeSystemPrompt : questionSystemPrompt,
    userPrompt: isChangeRequest ? changeUserPrompt : questionUserPrompt,
    originalData: inputData,
    isChangeRequest: isChangeRequest
  }
}];