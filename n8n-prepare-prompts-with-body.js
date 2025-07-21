// CÓDIGO CORREGIDO - EL AI AGENT AHORA ENVIARÁ URL Y BODY
const fullInput = $input.first().json;
const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

const changeSystemPrompt = `Eres un asistente AI que ejecuta cambios en GitHub usando herramientas HTTP.

## HERRAMIENTAS DISPONIBLES Y SUS PARÁMETROS

### 1. Get File Content
REQUIERE:
- URL: La URL completa de la API de GitHub

EJEMPLO DE USO:
{
  "URL": "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
}

### 2. Update File
REQUIERE DOS PARÁMETROS:
- URL: La URL completa de la API de GitHub
- Body: Un objeto JSON con message, content y sha

EJEMPLO DE USO:
{
  "URL": "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx",
  "Body": {
    "message": "feat: Actualizar número de WhatsApp",
    "content": "aW1wb3J0IHsgTWVzc2FnZUNpcmNsZSB9IGZyb20gImx1Y2lkZS1yZWFjdCI7...",
    "sha": "1bf604267dcbc1e98ca93d9699cd9276d77cc88a"
  }
}

### 3. Create File
REQUIERE DOS PARÁMETROS:
- URL: La URL completa de la API de GitHub  
- Body: Un objeto JSON con message y content

## PROCESO CORRECTO

1. Usa Get File Content proporcionando solo URL
2. Extrae sha y content del response
3. Decodifica el content de base64
4. Modifica el código
5. Codifica el nuevo código a base64
6. Usa Update File proporcionando TANTO URL COMO Body

IMPORTANTE: Cuando uses Update File o Create File, DEBES proporcionar ambos parámetros: URL y Body.`;

const changeUserPrompt = isChangeRequest ? 
`SOLICITUD: ${request.description}

INSTRUCCIONES EXACTAS:

1. LLAMA a Get File Content con:
   URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"

2. Del response obtendrás algo como:
   {
     "content": "aW1wb3J0IHsg...",
     "sha": "1bf604267dcbc1e98ca93d9699cd9276d77cc88a"
   }

3. Decodifica el content de base64 para obtener el código actual

4. Modifica SOLO el número de WhatsApp en la línea href

5. Codifica TODO el archivo modificado a base64

6. LLAMA a Update File con AMBOS parámetros:
   - URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
   - Body = {
       "message": "feat: Actualizar número de WhatsApp a ${request.description.match(/\+?\d[\d\s]+/)?.[0] || 'nuevo número'}",
       "content": "[EL_CONTENIDO_COMPLETO_EN_BASE64]",
       "sha": "[EL_SHA_DEL_PASO_2]"
     }

RECUERDA: Update File necesita DOS parámetros: URL y Body. NO olvides el Body.

EJECUTA AHORA.` : '';

return [{
  json: {
    systemPrompt: isChangeRequest ? changeSystemPrompt : 'Asistente de NeuroInnova',
    userPrompt: isChangeRequest ? changeUserPrompt : question || '',
    originalData: inputData,
    isChangeRequest
  }
}];