// CÓDIGO DINÁMICO PARA PREPARE PROMPTS - SE ADAPTA A LA SOLICITUD
const fullInput = $input.first().json;
const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

// Función para determinar qué archivo modificar basado en la solicitud
function getTargetFile(description) {
  const lowerDesc = description.toLowerCase();
  
  // Título principal o hero
  if (lowerDesc.includes('título') || lowerDesc.includes('titulo') || 
      lowerDesc.includes('principal') || lowerDesc.includes('hero')) {
    return 'src/components/sections/Hero.tsx';
  }
  
  // WhatsApp
  if (lowerDesc.includes('whatsapp') || lowerDesc.includes('teléfono') || 
      lowerDesc.includes('telefono')) {
    return 'src/components/ui/WhatsAppButton.tsx';
  }
  
  // Navegación o menú
  if (lowerDesc.includes('navegación') || lowerDesc.includes('navegacion') || 
      lowerDesc.includes('menú') || lowerDesc.includes('menu')) {
    return 'src/components/layout/Header.tsx';
  }
  
  // Footer o pie de página
  if (lowerDesc.includes('footer') || lowerDesc.includes('pie de página') || 
      lowerDesc.includes('pie de pagina')) {
    return 'src/components/layout/Footer.tsx';
  }
  
  // Servicios
  if (lowerDesc.includes('servicio')) {
    return 'src/components/sections/Services.tsx';
  }
  
  // Por defecto, asumir Hero si no está claro
  return 'src/components/sections/Hero.tsx';
}

// Prompt para cambios dinámico
const changeSystemPrompt = `Eres un asistente AI que ejecuta cambios en GitHub usando herramientas HTTP.

## HERRAMIENTAS DISPONIBLES

### 1. Get File Content
- URL: La URL completa de la API de GitHub
- Retorna: JSON con content (base64) y sha

### 2. Update File
- URL: La URL completa de la API de GitHub
- Body: JSON con message, content (base64) y sha

### 3. Create File
- URL: La URL completa de la API de GitHub
- Body: JSON con message y content (base64)

## INFORMACIÓN DEL PROYECTO

### Archivos principales y su contenido:

1. **src/components/sections/Hero.tsx**
   - Contiene el título principal del sitio
   - Busca: "Único y Primero Centro de Neuromodulación en Paraguay"
   - Es un componente React con el hero section

2. **src/components/ui/WhatsAppButton.tsx**
   - Contiene el botón flotante de WhatsApp
   - Busca el href con el número: wa.me/595991...

3. **src/components/layout/Header.tsx**
   - Contiene la navegación y menú principal

4. **src/components/layout/Footer.tsx**
   - Contiene el pie de página con información de contacto

## PROCESO OBLIGATORIO

1. Lee el archivo correcto basado en la solicitud
2. Decodifica el base64 para ver el código
3. Encuentra y modifica SOLO lo solicitado
4. Codifica todo el archivo a base64
5. Actualiza con el SHA correcto`;

const changeUserPrompt = isChangeRequest ? (() => {
  const targetFile = getTargetFile(request.description);
  const baseUrl = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/";
  
  return `SOLICITUD: ${request.description}

ARCHIVO A MODIFICAR: ${targetFile}

PASOS EXACTOS:

1. USA Get File Content con:
   URL = "${baseUrl}${targetFile}"

2. Del response obtendrás:
   - content: el archivo en base64
   - sha: el hash actual del archivo

3. Decodifica el content de base64

4. IMPORTANTE: Encuentra y modifica SOLO lo que se solicita:
   ${request.description}

5. Codifica TODO el archivo modificado a base64

6. USA Update File con:
   - URL = "${baseUrl}${targetFile}"
   - Body = {
       "message": "feat: ${request.description.substring(0, 50)}...",
       "content": "[CONTENIDO_COMPLETO_EN_BASE64]",
       "sha": "[SHA_DEL_PASO_2]"
     }

EJECUTA AHORA SIN PEDIR CONFIRMACIÓN.`;
})() : '';

// Prompt para preguntas
const questionSystemPrompt = `Eres un asistente AI para el sitio web NeuroInnova. Responde preguntas sobre el contenido del sitio.

## HERRAMIENTA DISPONIBLE: Get File Content

IMPORTANTE: SIEMPRE usa la URL COMPLETA de la API de GitHub.

## ARCHIVOS PRINCIPALES:
- Título principal: src/components/sections/Hero.tsx
- WhatsApp: src/components/ui/WhatsAppButton.tsx
- Información general: README.md

Base URL: https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/`;

const questionUserPrompt = isQuestion ? 
`Pregunta: "${question}"

Si necesitas leer archivos, usa Get File Content con la URL COMPLETA.` : '';

return [{
  json: {
    systemPrompt: isChangeRequest ? changeSystemPrompt : questionSystemPrompt,
    userPrompt: isChangeRequest ? changeUserPrompt : questionUserPrompt,
    originalData: inputData,
    isChangeRequest
  }
}];