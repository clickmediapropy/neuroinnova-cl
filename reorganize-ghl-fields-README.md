# Script de Reorganización de Campos Personalizados en GoHighLevel

Este script automatiza la reorganización de campos personalizados (custom fields) en GoHighLevel, moviendo campos entre carpetas, creando nuevos campos y eliminando campos innecesarios.

## 🚀 Configuración Inicial

### 1. Requisitos Previos
- Node.js instalado
- Acceso a la API de GoHighLevel
- API Key y Location ID de tu cuenta GoHighLevel

### 2. Configurar Credenciales

Opción A - Variables de entorno (recomendado):
```bash
export GHL_API_KEY="tu-api-key-aqui"
export GHL_LOCATION_ID="tu-location-id-aqui"
```

Opción B - Editar directamente en el script:
```javascript
const config = {
  apiKey: 'tu-api-key-aqui',
  locationId: 'tu-location-id-aqui',
  baseUrl: 'https://services.leadconnectorhq.com'
};
```

## 📋 Funcionalidades del Script

### Acciones que Realiza:

1. **Obtiene información actual**: Descarga todos los campos y carpetas existentes
2. **Crea backup**: Guarda el estado actual antes de hacer cambios
3. **Mueve campos entre carpetas**:
   - De "Additional Info" → "Seguimiento de Formularios"
   - De "Additional Info" → "Evaluaciones de Salud Mental"
   - De "Additional Info" → "Datos Clínicos"
4. **Crea campo nuevo**: "Form Submission Timestamp" en "Seguimiento de Formularios"
5. **Elimina campos innecesarios**: Date Of Birth, Número De Sesiones, etc.
6. **Elimina campos temporales**: Los campos temporales creados para las carpetas
7. **Genera reporte**: Detalla todas las acciones realizadas

## 🎯 Uso del Script

### Modo Dry Run (recomendado para primera ejecución):
```bash
node reorganize-ghl-fields.js --dry-run
```
Este modo simula todos los cambios sin ejecutarlos realmente.

### Modo Verbose (para debugging):
```bash
node reorganize-ghl-fields.js --verbose
```
Muestra todas las peticiones y respuestas de la API.

### Ejecución Real:
```bash
node reorganize-ghl-fields.js
```
Ejecuta todos los cambios en GoHighLevel.

### Combinar modos:
```bash
node reorganize-ghl-fields.js --dry-run --verbose
```

## 📁 Estructura de Carpetas Esperada

El script espera encontrar estas carpetas en GoHighLevel:
- Contact (sistema)
- General Info (sistema)
- Additional Info (sistema)
- **Datos Clínicos**
- **Concentrador de Oxígeno**
- **Seguimiento de Formularios**
- **Evaluaciones de Salud Mental**

## 🔄 Campos que se Reorganizan

### → Seguimiento de Formularios:
- Contact Source
- Contact Type
- Form Type
- Source Page
- Message

### → Evaluaciones de Salud Mental:
- Tipo De Evaluación
- Nivel De Severidad
- Historial De Evaluaciones
- Última Evaluación - Fecha
- Última Evaluación - Tipo
- Última Evaluación - Puntaje
- Última Evaluación - Nivel

### → Datos Clínicos:
- Servicio De Interés

### 🗑️ Campos a Eliminar:
- Date Of Birth
- Número De Sesiones
- Presupuesto Total
- Código Test
- Dirección IP
- Campo Temporal Formularios
- Campo Temporal Evaluaciones

## 📊 Archivos Generados

1. **Backup**: `ghl-backup-[timestamp].json`
   - Contiene el estado completo antes de los cambios
   - Útil para revertir cambios si es necesario

2. **Reporte**: `ghl-reorganization-report-[timestamp].json`
   - Detalla todas las operaciones realizadas
   - Incluye éxitos, advertencias y errores

## ⚠️ Manejo de Errores

El script continúa con otras operaciones si una falla. Los errores comunes incluyen:
- Campo no encontrado
- Carpeta no encontrada
- Permisos insuficientes en la API
- Campo ya existe (al crear nuevo)

## 🔒 Consideraciones de Seguridad

- **Nunca compartas tu API Key**
- El script crea un backup automático antes de hacer cambios
- Usa el modo dry-run para verificar los cambios antes de ejecutarlos
- Revisa el reporte después de la ejecución

## 🛠️ Troubleshooting

### "Campo no encontrado"
- Verifica que el nombre del campo sea exacto (mayúsculas/minúsculas)
- El campo puede haber sido eliminado o renombrado manualmente

### "Carpeta no encontrada"
- Asegúrate de que las carpetas existan en GoHighLevel
- Los nombres deben coincidir exactamente

### Error de autenticación
- Verifica que tu API Key sea válida
- Confirma que el Location ID sea correcto

## 📝 Notas Importantes

1. Los campos del sistema (Contact, General Info, Additional Info) no se pueden mover
2. Algunos campos pueden tener restricciones especiales
3. El script respeta las validaciones de GoHighLevel
4. Los cambios son permanentes una vez ejecutados (sin --dry-run)