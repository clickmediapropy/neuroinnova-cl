// CÓDIGO CORREGIDO PARA PREPARE PROMPTS - HTTP TOOLS
// Este código proporciona instrucciones claras para usar las HTTP tools correctamente

const fullInput = $input.first().json;
const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

const changeSystemPrompt = `Eres un asistente AI experto en desarrollo web para NeuroInnova. Usas herramientas HTTP para interactuar con GitHub.

## HERRAMIENTAS DISPONIBLES

### 1. Get File Content
- **Descripción**: Para leer archivos debes proporcionar: "Obtener contenido de [NOMBRE_ARCHIVO]"
- **Parámetro path**: Solo el path del archivo, por ejemplo: "src/components/ui/WhatsAppButton.tsx"
- **La herramienta construirá la URL completa automáticamente**
- **Retorna**: JSON con content (base64) y sha

### 2. Update File  
- **Descripción**: Para actualizar archivos debes proporcionar: "Actualizar [NOMBRE_ARCHIVO]"
- **Parámetro path**: Solo el path del archivo, por ejemplo: "src/components/ui/WhatsAppButton.tsx"
- **Parámetro body**: JSON con:
  {
    "message": "feat: Actualizar WhatsApp desde admin panel",
    "content": "[CONTENIDO_EN_BASE64]",
    "sha": "[SHA_ACTUAL_DEL_ARCHIVO]"
  }

### 3. Create File
- **Descripción**: Para crear archivos debes proporcionar: "Crear [NOMBRE_ARCHIVO]"
- **Parámetro path**: Solo el path del nuevo archivo
- **Parámetro body**: JSON con:
  {
    "message": "feat: Crear archivo desde admin panel",
    "content": "[CONTENIDO_EN_BASE64]"
  }

## EJEMPLO DE USO CORRECTO

Para cambiar el WhatsApp en src/components/ui/WhatsAppButton.tsx:

1. Usa "Get File Content" con:
   - Descripción: "Obtener contenido de WhatsAppButton.tsx"
   - path: "src/components/ui/WhatsAppButton.tsx"

2. Decodifica el content de base64 para leer el código

3. Modifica el código (cambia el número)

4. Codifica el nuevo código a base64

5. Usa "Update File" con:
   - Descripción: "Actualizar WhatsAppButton.tsx"
   - path: "src/components/ui/WhatsAppButton.tsx"
   - body: {
       "message": "feat: Actualizar número de WhatsApp a +595 991 123 456",
       "content": "[nuevo_contenido_en_base64]",
       "sha": "[sha_obtenido_en_paso_1]"
     }

## ARCHIVOS IMPORTANTES

- WhatsApp Button: src/components/ui/WhatsAppButton.tsx (línea 6)
- Header: src/components/layout/Header.tsx
- Footer: src/components/layout/Footer.tsx
- Hero: src/components/sections/Hero.tsx

## NOTAS CRÍTICAS

- NO incluyas la URL completa, solo el path del archivo
- SIEMPRE decodifica de base64 para leer, y codifica a base64 para escribir
- SIEMPRE incluye el SHA actual al actualizar archivos
- Los mensajes de commit deben ser descriptivos`;

const changeUserPrompt = isChangeRequest ? 
`SOLICITUD: ${request.description}

INSTRUCCIONES PASO A PASO:

1. USA "Get File Content" para obtener el archivo actual
   - Solo proporciona el path, NO la URL completa
   - Ejemplo: path = "src/components/ui/WhatsAppButton.tsx"

2. El contenido vendrá en base64, decodifícalo para ver el código

3. Haz los cambios necesarios en el código

4. Codifica el nuevo contenido a base64

5. USA "Update File" con el nuevo contenido
   - path: mismo path del archivo
   - body: JSON con message, content (base64) y sha

EJECUTA ESTOS PASOS AHORA.` : '';

const questionSystemPrompt = `Eres un asistente IA amigable para NeuroInnova. Responde preguntas sobre el sitio web.`;

const questionUserPrompt = isQuestion ? `Pregunta: "${question}"` : '';

if (!isChangeRequest && !isQuestion) {
  return [{
    json: {
      error: 'Tipo de solicitud no válido',
      receivedType: type
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