# 🔧 Corrección del Nodo Update File en n8n

## El Problema

El nodo "Update File" no está enviando el body JSON necesario para la API de GitHub.

## Solución

### 1. Abre tu workflow en n8n

### 2. Haz doble clic en el nodo "Update File"

### 3. Configura estos parámetros:

#### Configuración Básica:
- **Method**: PUT
- **URL**: `{{ $fromAI('URL', 'The full GitHub API URL for the file to update', 'string') }}`
- **Authentication**: Predefined Credential Type
- **Credential Type**: GitHub API

#### Configuración del Body (CRÍTICO):
1. **Activa "Send Body"**: Marca la casilla
2. **Body Content Type**: JSON
3. **Body**: 
```
={{ $fromAI('Body', 'JSON body with message, content (base64), and sha', 'json') }}
```

#### Headers:
- **Add Header**: Accept = application/vnd.github.v3+json

### 4. Haz lo mismo para el nodo "Create File"

#### Configuración del Body:
1. **Activa "Send Body"**: Marca la casilla
2. **Body Content Type**: JSON
3. **Body**: 
```
={{ $fromAI('Body', 'JSON body with message and content (base64)', 'json') }}
```

## 📝 Actualiza también el Prepare Prompts

Usa este código mejorado que especifica claramente el formato del body:

```javascript
// CÓDIGO IMPERATIVO PARA PREPARE PROMPTS - VERSIÓN CORREGIDA
const fullInput = $input.first().json;
const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

const changeSystemPrompt = `Eres un asistente AI que ejecuta cambios automáticamente.

## HERRAMIENTAS DISPONIBLES

### 1. Get File Content
- Proporciona URL: La URL completa de GitHub API
- Ejemplo: URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
- Retorna: JSON con content (base64) y sha

### 2. Update File  
- Proporciona:
  - URL: La URL completa de GitHub API
  - Body: Un objeto JSON con esta estructura EXACTA:
    {
      "message": "feat: Actualizar WhatsApp desde admin panel",
      "content": "EL_CONTENIDO_COMPLETO_DEL_ARCHIVO_EN_BASE64",
      "sha": "EL_SHA_OBTENIDO_DEL_GET"
    }

IMPORTANTE: El Body debe ser un objeto JSON válido, no una cadena de texto.

## PROCESO PASO A PASO

1. Primero obtén el archivo con Get File Content
2. El response tendrá: { "content": "base64...", "sha": "abc123..." }
3. Decodifica el content de base64 para ver el código
4. Modifica el código según lo solicitado
5. Codifica TODO el archivo modificado a base64
6. Usa Update File con:
   - URL: misma URL del archivo
   - Body: {"message": "...", "content": "nuevo_base64", "sha": "sha_del_paso_2"}`;

const changeUserPrompt = isChangeRequest ? 
`SOLICITUD: ${request.description}

PASOS OBLIGATORIOS:
1. USA Get File Content:
   - URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"

2. Del response, extrae:
   - El SHA del archivo
   - El content en base64

3. Decodifica el base64 y modifica el número de WhatsApp

4. Codifica TODO el archivo modificado a base64

5. USA Update File:
   - URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
   - Body = {
       "message": "feat: Actualizar número de WhatsApp desde admin panel",
       "content": "[EL_NUEVO_CONTENIDO_EN_BASE64]",
       "sha": "[EL_SHA_DEL_PASO_2]"
     }

EJECUTA AHORA SIN HACER PREGUNTAS.` : '';

return [{
  json: {
    systemPrompt: isChangeRequest ? changeSystemPrompt : 'Asistente de NeuroInnova',
    userPrompt: isChangeRequest ? changeUserPrompt : question || '',
    originalData: inputData,
    isChangeRequest
  }
}];
```

## ✅ Verificación

Después de hacer estos cambios:
1. Guarda el workflow
2. Ejecuta `./test-webhook-updated.sh`
3. Verifica en los logs que el body se esté enviando correctamente

El error debería desaparecer y los cambios deberían guardarse en GitHub.