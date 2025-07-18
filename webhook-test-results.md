# Resultados de Prueba de Webhooks - NeuroInnova

## 📅 Fecha de Prueba: 18 de Julio 2025

### ✅ Webhook de Formulario de Contacto (NUEVO)
- **URL**: `https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/2EyoyOYn1MsthDEpkq7Z`
- **Status**: 200 OK ✅
- **Response**: `{"status":"Success: test request received"}`
- **Tiempo de Respuesta**: ~1 segundo

**Datos Enviados:**
```json
{
  "first_name": "Test",
  "lastName": "Webhook",
  "email": "test@neuroinnova.com",
  "phone": "+595991123456",
  "GV3kzQc2ELggE7d2KLSk": "Estoy interesado en el servicio de EMT/TMS para tratamiento de depresión resistente",
  "eI3874kqFkPMClPIqy0G": "Website",
  "terms_and_conditions": "true",
  "contact.servicio_de_inters": "Estimulación Magnética Transcraneal (EMT/TMS)",
  "contact.source_page": "homepage",
  "contact.form_type": "contact-form",
  "timestamp": "2025-07-18T22:56:07.677Z"
}
```

### ✅ Webhook de Autoevaluaciones
- **URL**: `https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35`
- **Status**: 200 OK ✅
- **Response**: `{"status":"Success: request sent to trigger execution server","id":"t3O7fEURl7L2vDbvk8nD"}`

## 🔄 Cambios Realizados

1. **ContactForm.tsx**: Actualizado con nuevo webhook
2. **test-webhook-neuroinnova.js**: Actualizado para pruebas
3. **webhooks-y-parametros-neuroinnova.md**: Documentación actualizada

## ✅ Conclusión

Ambos webhooks están funcionando correctamente y están listos para producción. El nuevo webhook de formularios de contacto está correctamente integrado en todos los componentes del sitio.