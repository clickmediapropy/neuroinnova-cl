// CÓDIGO DINÁMICO MEJORADO PARA PREPARE PROMPTS - PRESERVA ESTRUCTURA HTML
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

// Prompt para cambios dinámico CON VALIDACIÓN DE ESTRUCTURA
const changeSystemPrompt = `Eres un asistente AI EXPERTO en React/TypeScript que ejecuta cambios en GitHub usando herramientas HTTP.

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

## REGLAS CRÍTICAS PARA MODIFICAR CÓDIGO JSX/TSX

1. **SIEMPRE preserva la estructura HTML/JSX correcta**
   - Cuenta TODOS los tags de apertura y cierre
   - Mantén la jerarquía de divs, sections, etc.
   - NUNCA dejes tags sin cerrar

2. **Preserva la codificación UTF-8**
   - No introduzcas caracteres mal codificados
   - Mantén acentos y caracteres especiales correctos

3. **Validación antes de guardar**
   - Verifica que cada <div> tenga su </div>
   - Verifica que cada { tenga su }
   - Verifica que la sintaxis JSX sea válida

4. **Al hacer cambios**
   - Identifica EXACTAMENTE qué líneas cambiar
   - Mantén la indentación existente
   - NO modifiques líneas que no necesitan cambios
   - Si eliminas texto, NO elimines tags HTML

## PROCESO OBLIGATORIO

1. Lee el archivo completo
2. Decodifica el base64 para ver el código
3. ANALIZA la estructura HTML/JSX completa
4. Encuentra SOLO el texto/código a modificar
5. Realiza el cambio PRESERVANDO toda la estructura
6. VALIDA que el código resultante sea sintácticamente correcto
7. Codifica todo el archivo a base64
8. Actualiza con el SHA correcto

## EJEMPLO DE CAMBIO CORRECTO

Si te piden eliminar "© 2024 Todos los derechos reservados" de:
\`\`\`jsx
<p className="text-xs">
  &copy; {currentYear} NeuroInnova. © 2024 Todos los derechos reservados.
</p>
\`\`\`

El resultado debe ser:
\`\`\`jsx
<p className="text-xs">
  &copy; {currentYear} NeuroInnova.
</p>
\`\`\`

NO elimines el <p> ni el </p>, SOLO el texto solicitado.`;

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

4. IMPORTANTE - ANÁLISIS PREVIO:
   - Identifica la estructura HTML/JSX completa
   - Localiza EXACTAMENTE el texto a cambiar
   - Planifica el cambio sin romper la estructura

5. MODIFICACIÓN:
   - Encuentra y modifica SOLO lo solicitado: ${request.description}
   - NO elimines tags HTML/JSX
   - NO cambies la estructura de componentes
   - PRESERVA todos los elementos React

6. VALIDACIÓN:
   - Verifica que TODOS los tags estén cerrados
   - Verifica que la sintaxis JSX sea válida
   - Asegúrate de no haber introducido errores

7. Codifica TODO el archivo modificado a base64

8. USA Update File con:
   - URL = "${baseUrl}${targetFile}"
   - Body = {
       "message": "feat: ${request.description.substring(0, 50)}...",
       "content": "[CONTENIDO_COMPLETO_EN_BASE64]",
       "sha": "[SHA_DEL_PASO_2]"
     }

EJECUTA AHORA SIN PEDIR CONFIRMACIÓN.
RECUERDA: El código debe compilar sin errores después del cambio.`;
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