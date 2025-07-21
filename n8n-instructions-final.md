# Instrucciones Finales para n8n

## ⚠️ Problema Identificado

El AI Agent está pasando solo el path del archivo en lugar de la URL completa que necesitan las HTTP tools.

## ✅ Solución Manual Rápida

Como la API de n8n requiere un formato específico para actualizaciones, necesitas actualizar manualmente el nodo "Prepare Prompts" en tu workflow:

### 1. Abre tu workflow en n8n

### 2. Doble clic en el nodo "Prepare Prompts"

### 3. Reemplaza TODO el código con este:

```javascript
// CÓDIGO ACTUALIZADO PARA PREPARE PROMPTS - COMPATIBLE CON HTTP TOOLS
const fullInput = $input.first().json;
const inputData = fullInput.body || fullInput;
const type = inputData.type;
const request = inputData.request;
const question = inputData.question;

const isChangeRequest = type === 'change_request' && request && request.description;
const isQuestion = type === 'question' && question;

const changeSystemPrompt = `Eres un asistente AI experto en desarrollo web para NeuroInnova.

## HERRAMIENTAS DISPONIBLES

### 1. Get File Content
- Para leer archivos, proporciona la URL COMPLETA de la API de GitHub
- Ejemplo: URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
- Retorna: JSON con content (base64) y sha

### 2. Update File  
- Para actualizar archivos, proporciona:
  - URL: La URL COMPLETA como "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
  - Body: JSON con message, content (base64) y sha

### 3. Create File
- Para crear archivos, proporciona:
  - URL: La URL COMPLETA del nuevo archivo
  - Body: JSON con message y content (base64)

## EJEMPLO CORRECTO

Para cambiar WhatsApp:
1. Get File Content con URL = "https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/src/components/ui/WhatsAppButton.tsx"
2. Decodifica base64, modifica el código
3. Update File con la misma URL y el body con el nuevo contenido

## ARCHIVOS IMPORTANTES
- WhatsApp: src/components/ui/WhatsAppButton.tsx (línea 6)
- Header: src/components/layout/Header.tsx
- Footer: src/components/layout/Footer.tsx`;

const changeUserPrompt = isChangeRequest ? 
`SOLICITUD: ${request.description}

USA LAS HERRAMIENTAS CON URLs COMPLETAS:
1. Get File Content con URL completa de GitHub API
2. Modifica el contenido
3. Update File con URL completa y body en JSON

EJECUTA AHORA.` : '';

return [{
  json: {
    systemPrompt: isChangeRequest ? changeSystemPrompt : 'Asistente de NeuroInnova',
    userPrompt: isChangeRequest ? changeUserPrompt : question || '',
    originalData: inputData,
    isChangeRequest
  }
}];
```

### 4. Guarda el workflow

### 5. Prueba con el script

Ejecuta:
```bash
./test-webhook-updated.sh
```

## 🔍 Verificación

Después de la prueba:
1. Revisa los logs en n8n
2. Verifica que el AI Agent use URLs completas
3. Comprueba que los cambios se guarden en GitHub

## 📝 Notas

- El AI Agent ahora sabe que debe proporcionar URLs COMPLETAS
- Las HTTP tools esperan el parámetro "URL" con la URL completa
- Los cambios crearán commits reales en GitHub