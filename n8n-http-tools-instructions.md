# Instrucciones para Configurar HTTP Tools en n8n

## 🔧 Configuración de las Herramientas HTTP

He creado un workflow completo que reemplaza las herramientas de GitHub con HTTP Request tools. Aquí está lo que necesitas hacer:

### 1. Importar el Workflow
- Abre n8n
- Ve a Workflows > Import
- Importa el archivo `n8n-github-http-tools.json`

### 2. Configurar las Credenciales
Las herramientas HTTP ya están configuradas para usar tus credenciales de GitHub existentes (`GitHub account` con ID `2HnCPl6Z5QgsnTPI`).

### 3. Cómo Funcionan las Herramientas

#### **Get File Content**
- **URL**: `https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/{path}`
- **Método**: GET
- **Retorna**: JSON con el contenido en base64 y el SHA del archivo

#### **Update File** 
- **URL**: `https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/{path}`
- **Método**: PUT
- **Body requerido**:
```json
{
  "message": "feat: Actualizar WhatsApp desde admin panel",
  "content": "contenido_en_base64",
  "sha": "sha_actual_del_archivo"
}
```

#### **Create File**
- **URL**: `https://api.github.com/repos/clickmediapropy/neuroinnova-cl/contents/{path}`
- **Método**: PUT
- **Body requerido**:
```json
{
  "message": "feat: Crear nuevo archivo desde admin panel",
  "content": "contenido_en_base64"
}
```

### 4. Diferencias Clave

1. **Control Total**: Ahora controlamos exactamente qué se envía a GitHub
2. **Commits Reales**: Cada operación PUT crea un commit real en el repositorio
3. **Base64**: El contenido debe estar codificado en base64
4. **SHA Requerido**: Para actualizar archivos, necesitamos el SHA actual

### 5. El AI Agent Ahora:

- Primero obtiene el archivo con GET para obtener el SHA
- Decodifica el contenido de base64
- Hace los cambios necesarios
- Codifica el nuevo contenido en base64
- Envía PUT con el mensaje de commit, contenido y SHA

### 6. Prueba el Nuevo Workflow

Después de importar, prueba con:
```bash
curl -X POST https://clickmediapro.app.n8n.cloud/webhook/neuroinnova-admin \
  -H "Content-Type: application/json" \
  -d '{
    "type": "change_request",
    "request": {
      "description": "Cambiar el número de WhatsApp a +595 991 222 333",
      "type": "content",
      "section": "global",
      "priority": "high"
    }
  }'
```

## 🎯 Ventajas de Este Enfoque

1. **Transparencia**: Podemos ver exactamente qué se envía a GitHub
2. **Debugging**: Los logs mostrarán las peticiones HTTP reales
3. **Control**: Podemos personalizar los mensajes de commit
4. **Confiabilidad**: Usa la API REST estándar de GitHub

## ⚠️ Notas Importantes

- El AI Agent debe entender que necesita trabajar con base64
- Cada cambio crea un commit inmediato
- No hay staging area, los cambios van directo al main branch
- Vercel detectará los cambios automáticamente

Este enfoque debería resolver el problema de los commits que no se estaban guardando.