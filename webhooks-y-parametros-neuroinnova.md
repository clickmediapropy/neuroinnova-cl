# Webhooks y Parámetros - NeuroInnova CRM Integration

## 🔗 Webhooks Activos

### 1. **Formulario de Contacto Principal**
- **URL**: `https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/2EyoyOYn1MsthDEpkq7Z`
- **Método**: POST
- **Content-Type**: application/json
- **Estado**: ✅ Funcionando (Status 200)

### 2. **Formulario de Resultados de Evaluación**
- **URL**: `https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35`
- **Método**: POST
- **Content-Type**: application/json
- **Estado**: ✅ Funcionando (Status 200)

## 📋 Parámetros del Formulario de Contacto

### Campos Estándar
| Campo | Nombre del Parámetro | Tipo | Descripción |
|-------|---------------------|------|-------------|
| Nombre | `first_name` | string | Primer nombre extraído del nombre completo |
| Apellido | `lastName` | string | Apellido extraído del nombre completo |
| Email | `email` | string | Correo electrónico |
| Teléfono | `phone` | string | Teléfono completo con código de país |

### Campos Personalizados (Custom Fields)
| Campo | ID del Campo | Valor | Descripción |
|-------|--------------|-------|-------------|
| Mensaje/Interés | `GV3kzQc2ELggE7d2KLSk` | string | Mensaje del usuario o interés en servicio |
| Cómo se enteró | `eI3874kqFkPMClPIqy0G` | "Website" | Siempre envía "Website" |
| Términos | `terms_and_conditions` | "true" | Aceptación de términos |

### Campos con Notación de Punto
| Campo | Nombre del Parámetro | Valores Posibles |
|-------|---------------------|------------------|
| Servicio de Interés | `contact.servicio_de_inters` | - "Estimulación Magnética Transcraneal (EMT/TMS)"<br>- "Estimulación Transcraneal por Corriente Directa (tDCS)"<br>- "Consulta Psiquiátrica"<br>- "Otro servicio" |
| Página de Origen | `contact.source_page` | Nombre de la página desde donde se envió |
| Tipo de Formulario | `contact.form_type` | "contact-form" |
| Timestamp | `timestamp` | ISO 8601 datetime |

## 📊 Parámetros del Formulario de Autoevaluación

### Campos de Identificación
| Campo | Nombre del Parámetro | Tipo | Descripción |
|-------|---------------------|------|-------------|
| Nombre | `firstName` | string | Nombre del paciente |
| Apellido | `lastName` | string | Apellido del paciente |
| Email | `email` | string | Correo electrónico |
| Teléfono | `phone` | string | Teléfono |
| Ciudad | `ciudad` | string | Ciudad del paciente |

### Campos de Evaluación
| Campo | Nombre del Parámetro | Tipo | Descripción |
|-------|---------------------|------|-------------|
| Puntaje Total | `contact.score_phq_9_puntaje_total_2` | string | Puntaje numérico de la evaluación |
| Diagnóstico | `contact.diagnstico_preliminar` | string | Descripción completa del diagnóstico |
| Tipo de Evaluación | `contact.tipo_de_evaluacin` | string | Nombre del test aplicado |
| Nivel de Severidad | `contact.nivel_de_severidad` | string | "Leve", "Moderada", "Severa", etc. |
| Código del Test | `contact.cdigo_test` | string | Código interno del test |
| Edad | `contact.edad` | string | Edad del paciente |
| Sexo | `contact.sexo` | string | "masculino" o "femenino" |

### Campos de Historial
| Campo | Nombre del Parámetro | Tipo | Descripción |
|-------|---------------------|------|-------------|
| Historial Completo | `contact.historial_de_evaluaciones` | JSON string | Array serializado con todo el historial |
| Última Fecha | `contact.ltima_evaluacin__fecha` | string | ISO datetime de la última evaluación |
| Último Tipo | `contact.ltima_evaluacin__tipo` | string | Tipo de la última evaluación |
| Último Puntaje | `contact.ltima_evaluacin__puntaje` | string | Puntaje de la última evaluación |
| Último Nivel | `contact.ltima_evaluacin__nivel` | string | Nivel de la última evaluación |

## 🔧 Configuración GoHighLevel

### Credenciales
- **API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc`
- **Location ID**: `Lmk3yMGsLO5NUbaGlZeB`
- **Base URL**: `https://rest.gohighlevel.com/v1`

## 📱 Códigos de País Soportados

| País | Código |
|------|--------|
| Paraguay | +595 |
| Argentina | +54 |
| Brasil | +55 |
| Chile | +56 |
| Colombia | +57 |
| Uruguay | +598 |
| Estados Unidos | +1 |
| España | +34 |

## 🧪 Script de Prueba

He creado `test-webhook-neuroinnova.js` para probar los webhooks:

```bash
# Probar webhook de contacto
node test-webhook-neuroinnova.js --contact

# Probar webhook de autoevaluación
node test-webhook-neuroinnova.js --assessment

# Probar ambos
node test-webhook-neuroinnova.js --all
```

## ✅ Resultados de Pruebas

### Webhook de Contacto
- **Status**: 200 OK
- **Response**: HTML (página de confirmación)
- **Resultado**: ✅ Datos recibidos correctamente

### Webhook de Autoevaluación
- **Status**: 200 OK
- **Response**: `{"status":"Success: request sent to trigger execution server","id":"t3O7fEURl7L2vDbvk8nD"}`
- **Resultado**: ✅ Trigger ejecutado exitosamente

## 📝 Notas Importantes

1. **Modo CORS**: Los formularios usan `mode: 'no-cors'` para evitar problemas de CORS
2. **Validación**: Todos los formularios usan Zod para validación estricta
3. **Formateo de Teléfono**: Se formatea automáticamente según el código de país
4. **IDs de Campos**: Los campos personalizados usan IDs generados por GoHighLevel
5. **Historial**: El historial de evaluaciones se envía como JSON string

## 🔄 Próximos Pasos para el CRM

1. Configurar los campos personalizados en GoHighLevel con los mismos IDs
2. Crear automatizaciones basadas en los webhooks
3. Configurar notificaciones para nuevos leads
4. Crear flujos de seguimiento según el tipo de evaluación
5. Integrar con el calendario para agendar citas automáticamente