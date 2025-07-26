// CÓDIGO IMPERATIVO PARA PREPARE PROMPTS - NO HACE PREGUNTAS, EJECUTA ACCIONES
const fullInput = $input.first().json;
const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

const changeSystemPrompt = `Eres un asistente AI que ejecuta cambios automáticamente sin hacer preguntas.

## HERRAMIENTAS DISPONIBLES

### 1. Get File Content
- URL COMPLETA requerida: https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/[PATH]
- Retorna: JSON con content (base64) y sha

### 2. Update File  
- URL COMPLETA requerida: https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/[PATH]
- Body requerido: {"message": "...", "content": "base64", "sha": "..."}

## REGLAS IMPERATIVAS

1. NO hagas preguntas al usuario
2. NO pidas confirmación 
3. EJECUTA los cambios directamente
4. Si dice "cambiar WhatsApp", cambia SOLO el número, mantén todo lo demás igual
5. SIEMPRE completa la tarea en una sola ejecución

## ARCHIVOS CLAVE
- WhatsApp: src/components/ui/WhatsAppButton.tsx (línea 6, formato: wa.me/595992097055)`;

const changeUserPrompt = isChangeRequest ? 
`ORDEN DIRECTA: ${request.description}

EJECUTA INMEDIATAMENTE:
1. USA Get File Content con URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
2. Decodifica el base64 para obtener el código
3. Cambia SOLO el número de WhatsApp manteniendo el formato wa.me/[NUMERO_SIN_SIMBOLOS]
4. Codifica el nuevo código a base64
5. USA Update File con la misma URL y el body JSON completo

NO HAGAS PREGUNTAS. NO PIDAS CONFIRMACIÓN. EJECUTA AHORA.` : '';

return [{
  json: {
    systemPrompt: isChangeRequest ? changeSystemPrompt : 'Asistente de NeuroInnova',
    userPrompt: isChangeRequest ? changeUserPrompt : question || '',
    originalData: inputData,
    isChangeRequest
  }
}];