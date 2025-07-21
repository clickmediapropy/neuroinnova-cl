# Guía de Configuración N8N - NeuroInnova

## Estado Actual de la Integración

✅ **Webhook Activo**: https://clickmediapro.app.n8n.cloud/webhook/neuroinnova-admin
✅ **Admin Panel Integrado**: Código listo para enviar/recibir del webhook
✅ **Adaptador de Respuestas**: Servicio puede manejar respuestas del AI agent
⚠️ **Problema Detectado**: Webhook responde HTTP 200 pero sin contenido

## 1. Importar el Workflow

1. Abre tu instancia de N8N
2. Ve a **Workflows** → **Import from File**
3. Selecciona el archivo `n8n-neuroinnova-workflow.json`

## 2. Configurar Credenciales

### OpenAI API (o Claude/Anthropic)
1. Ve a **Credentials** → **New**
2. Busca **OpenAI** (o el proveedor que uses)
3. Añade tu API Key
4. Guarda como "OpenAI API"

### Variables de Entorno
Añade estas variables en tu N8N:
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
GITHUB_OWNER=nicodelgadob
GITHUB_REPO=neuroinnova-cl
```

## 3. Configurar el Nodo AI Agent con MCP

### Opción A: Usar OpenAI (Configuración actual)
El workflow está configurado para usar GPT-4. Si prefieres Claude:

1. Reemplaza el nodo "AI Agent" con un nodo de Anthropic
2. Usa el mismo systemPrompt y userPrompt

### Opción B: Configurar MCP de GitHub
Para acceso directo a GitHub desde el AI:

1. Instala el MCP de GitHub en tu N8N:
   ```bash
   npm install @modelcontextprotocol/server-github
   ```

2. Configura el MCP en N8N:
   - Ve a Settings → MCP Servers
   - Añade el servidor de GitHub con tu token

3. En el nodo AI Agent, habilita las herramientas MCP

## 4. Personalizar el Nodo "Apply GitHub Changes"

El nodo actual es una simulación. Para implementación real:

```javascript
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
  auth: $env.GITHUB_TOKEN
});

const processedChange = $input.first().json.processedChange;
const owner = $env.GITHUB_OWNER;
const repo = $env.GITHUB_REPO;

// Obtener el SHA del branch actual
const { data: ref } = await octokit.git.getRef({
  owner,
  repo,
  ref: 'heads/main'
});

const commitSha = ref.object.sha;

// Crear un tree con los cambios
const treeItems = [];

for (const change of processedChange.changes) {
  // Si es un archivo nuevo
  if (change.oldCode === '') {
    treeItems.push({
      path: change.file,
      mode: '100644',
      type: 'blob',
      content: change.newCode
    });
  } else {
    // Para archivos existentes, obtener contenido actual
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: change.file
      });
      
      const currentContent = Buffer.from(fileData.content, 'base64').toString();
      const newContent = currentContent.replace(change.oldCode, change.newCode);
      
      treeItems.push({
        path: change.file,
        mode: '100644',
        type: 'blob',
        content: newContent
      });
    } catch (error) {
      // Si el archivo no existe, crearlo
      treeItems.push({
        path: change.file,
        mode: '100644',
        type: 'blob',
        content: change.newCode
      });
    }
  }
}

// Crear el tree
const { data: tree } = await octokit.git.createTree({
  owner,
  repo,
  tree: treeItems,
  base_tree: commitSha
});

// Crear el commit
const { data: commit } = await octokit.git.createCommit({
  owner,
  repo,
  message: processedChange.commitMessage,
  tree: tree.sha,
  parents: [commitSha]
});

// Actualizar la referencia
await octokit.git.updateRef({
  owner,
  repo,
  ref: 'heads/main',
  sha: commit.sha
});

return [{
  json: {
    success: true,
    processedChange: processedChange,
    githubResult: {
      sha: commit.sha,
      message: 'Cambios aplicados exitosamente'
    }
  }
}];
```

## 5. Obtener la URL del Webhook

1. Después de importar el workflow, abre el nodo "Webhook Trigger"
2. Copia la URL del webhook (algo como: `https://tu-n8n.com/webhook/xxx`)
3. Añade esta URL a tu archivo `.env` del proyecto:
   ```
   VITE_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/xxx
   ```

## 6. Probar el Workflow

### Test de Pregunta
```bash
curl -X POST https://tu-n8n.com/webhook/xxx \
  -H "Content-Type: application/json" \
  -d '{
    "type": "question",
    "question": "¿Cuál es el título principal del sitio?",
    "metadata": {
      "source": "test",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
    }
  }'
```

### Test de Cambio
```bash
curl -X POST https://tu-n8n.com/webhook/xxx \
  -H "Content-Type: application/json" \
  -d '{
    "type": "change_request",
    "request": {
      "id": "test-001",
      "description": "Cambiar el título principal a Estoy probando",
      "type": "content",
      "priority": "medium",
      "section": "hero",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
      "status": "processing"
    },
    "metadata": {
      "source": "test",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"
    }
  }'
```

## 7. Mejoras Opcionales

### A. Persistencia de Conversaciones
Añade un nodo de base de datos (PostgreSQL/MySQL) para guardar el historial.

### B. Rate Limiting
Añade un nodo de validación al inicio para limitar requests por IP/usuario.

### C. Notificaciones
Añade nodos de email/Slack para notificar cambios importantes.

### D. Logs de Auditoría
Guarda todos los cambios en una base de datos para auditoría.

## 8. Troubleshooting

### Error: "No se pudo procesar la respuesta del AI"
- Verifica que el AI esté devolviendo JSON válido
- Revisa los logs del nodo "Process AI Response"

### Error: "GitHub API rate limit"
- Usa un token con permisos suficientes
- Implementa caché para reducir llamadas

### El webhook no responde
- Verifica que el workflow esté activo
- Revisa los logs de N8N
- Asegúrate de que el webhook sea accesible desde internet