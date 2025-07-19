# Campos Enviados por Webhooks - NeuroInnova

## 📊 Resumen de Webhooks

| Webhook | URL | Campos Totales |
|---------|-----|----------------|
| Formulario de Contacto | `https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/2EyoyOYn1MsthDEpkq7Z` | 11 campos |
| Autoevaluaciones | `https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35` | 16 campos |

---

## 📝 WEBHOOK DE FORMULARIO DE CONTACTO

### 1. Campos Estándar (4)

| Campo | Parámetro Enviado | Tipo | Descripción | Ejemplo |
|-------|-------------------|------|-------------|---------|
| Nombre | `first_name` | string | Primer nombre extraído | "Juan" |
| Apellido | `lastName` | string | Apellido extraído | "Pérez" |
| Email | `email` | string | Correo electrónico | "juan@email.com" |
| Teléfono | `phone` | string | Teléfono con código país | "+595991123456" |

### 2. Campos Custom con IDs Específicos (3)

| Campo | Parámetro Enviado | ID en GoHighLevel | Tipo | Valor/Descripción |
|-------|-------------------|-------------------|------|-------------------|
| Mensaje/Interés | `GV3kzQc2ELggE7d2KLSk` | `GV3kzQc2ELggE7d2KLSk` | string | Mensaje del usuario |
| Cómo se enteró | `eI3874kqFkPMClPIqy0G` | `eI3874kqFkPMClPIqy0G` | string | Siempre "Website" |
| Términos | `terms_and_conditions` | - | string | Siempre "true" |

### 3. Campos Custom con Prefijo "contact." (4)

| Campo | Parámetro Enviado | Campo en GoHighLevel | Tipo | Valores Posibles |
|-------|-------------------|---------------------|------|------------------|
| Servicio de Interés | `contact.servicio_de_inters` | `contact.servicio_de_inters` | string | - "Estimulación Magnética Transcraneal (EMT/TMS)"<br>- "Estimulación Transcraneal por Corriente Directa (tDCS)"<br>- "Consulta Psiquiátrica"<br>- "Otro servicio" |
| Página de Origen | `contact.source_page` | `contact.source_page` | string | Nombre de la página (ej: "homepage", "servicios/emt-tms") |
| Tipo de Formulario | `contact.form_type` | `contact.form_type` | string | "contact-form" |
| Timestamp | `timestamp` | - | ISO datetime | "2025-07-18T22:56:07.677Z" |

### 📋 Ejemplo de JSON Enviado - Formulario de Contacto

```json
{
  "first_name": "María",
  "lastName": "González",
  "email": "maria.gonzalez@gmail.com",
  "phone": "+595991234567",
  "GV3kzQc2ELggE7d2KLSk": "Estoy interesada en el tratamiento de EMT para depresión resistente",
  "eI3874kqFkPMClPIqy0G": "Website",
  "terms_and_conditions": "true",
  "contact.servicio_de_inters": "Estimulación Magnética Transcraneal (EMT/TMS)",
  "contact.source_page": "homepage",
  "contact.form_type": "contact-form",
  "timestamp": "2025-07-18T22:56:07.677Z"
}
```

---

## 🏥 WEBHOOK DE AUTOEVALUACIONES

### 1. Campos Estándar (5)

| Campo | Parámetro Enviado | Tipo | Descripción | Ejemplo |
|-------|-------------------|------|-------------|---------|
| Nombre | `firstName` | string | Nombre del paciente | "Carlos" |
| Apellido | `lastName` | string | Apellido del paciente | "Mendoza" |
| Email | `email` | string | Correo electrónico | "carlos@email.com" |
| Teléfono | `phone` | string | Teléfono | "+595991234567" |
| Ciudad | `ciudad` | string | Ciudad del paciente | "Asunción" |

### 2. Campos de Evaluación Principal (7)

| Campo | Parámetro Enviado | Campo en GoHighLevel | Tipo | Descripción |
|-------|-------------------|---------------------|------|-------------|
| Puntaje Total | `contact.score_phq_9_puntaje_total_2` | `contact.score_phq_9_puntaje_total_2` | string | Puntaje numérico (ej: "15") |
| Diagnóstico | `contact.diagnstico_preliminar` | `contact.diagnstico_preliminar` | string | Diagnóstico completo con recomendaciones |
| Tipo de Evaluación | `contact.tipo_de_evaluacin` | `contact.tipo_de_evaluacin` | string | Nombre del test (ej: "PHQ-9 Depresión") |
| Nivel de Severidad | `contact.nivel_de_severidad` | `contact.nivel_de_severidad` | string | "Leve", "Moderada", "Severa", etc. |
| Código Test | `contact.cdigo_test` | `contact.cdigo_test` | string | Código interno (ej: "depression") |
| Edad | `contact.edad` | `contact.edad` | string | Edad del paciente |
| Sexo | `contact.sexo` | `contact.sexo` | string | "masculino" o "femenino" |

### 3. Campos de Historial (5)

| Campo | Parámetro Enviado | Campo en GoHighLevel | Tipo | Descripción |
|-------|-------------------|---------------------|------|-------------|
| Historial Completo | `contact.historial_de_evaluaciones` | `contact.historial_de_evaluaciones` | JSON string | Array serializado con todas las evaluaciones |
| Última Fecha | `contact.ltima_evaluacin__fecha` | `contact.ltima_evaluacin__fecha` | string | ISO datetime |
| Último Tipo | `contact.ltima_evaluacin__tipo` | `contact.ltima_evaluacin__tipo` | string | Tipo de test |
| Último Puntaje | `contact.ltima_evaluacin__puntaje` | `contact.ltima_evaluacin__puntaje` | string | Puntaje numérico |
| Último Nivel | `contact.ltima_evaluacin__nivel` | `contact.ltima_evaluacin__nivel` | string | Nivel de severidad |

### 📋 Ejemplo de JSON Enviado - Autoevaluación

```json
{
  "firstName": "Ana",
  "lastName": "Martínez",
  "email": "ana.martinez@gmail.com",
  "phone": "+595991987654",
  "ciudad": "Asunción",
  "contact.score_phq_9_puntaje_total_2": "18",
  "contact.diagnstico_preliminar": "Depresión moderadamente severa (puntuación PHQ-9: 18/27). Se recomienda evaluación profesional urgente y considerar tratamiento con medicación y/o psicoterapia.",
  "contact.tipo_de_evaluacin": "PHQ-9 Depresión",
  "contact.nivel_de_severidad": "Moderadamente Severa",
  "contact.cdigo_test": "depression",
  "contact.edad": "42",
  "contact.sexo": "femenino",
  "contact.historial_de_evaluaciones": "[{\"fecha\":\"2025-07-18T22:46:40.525Z\",\"tipo\":\"PHQ-9 Depresión\",\"puntaje\":\"18\",\"nivel\":\"Moderadamente Severa\"}]",
  "contact.ltima_evaluacin__fecha": "2025-07-18T22:46:40.525Z",
  "contact.ltima_evaluacin__tipo": "PHQ-9 Depresión",
  "contact.ltima_evaluacin__puntaje": "18",
  "contact.ltima_evaluacin__nivel": "Moderadamente Severa"
}
```

---

## 🔄 Mapeo de Campos con GoHighLevel

### Campos que Coinciden Exactamente ✅

| Campo del Webhook | ID en GoHighLevel | Estado |
|-------------------|-------------------|---------|
| `contact.message` | `GV3kzQc2ELggE7d2KLSk` | ✅ Existe |
| `contact.how_did_you_hear_about_us` | `eI3874kqFkPMClPIqy0G` | ✅ Existe |
| `contact.servicio_de_inters` | `9dY1TUMijVQ7U4Ma7EsX` | ✅ Existe |
| `contact.source_page` | `KNkMMImZUQr4W0Vx19ko` | ✅ Existe |
| `contact.form_type` | `lTXRWmOZDE4fFxjZjhbA` | ✅ Existe |
| `contact.score_phq_9_puntaje_total_2` | `d3VcsCVd1eMe3rigrY8l` | ✅ Existe |
| `contact.diagnstico_preliminar` | `YLMP9Jcb0dSXd203BEhh` | ✅ Existe |
| `contact.tipo_de_evaluacin` | `q6dUUoNfZNdFEUuWVkWs` | ✅ Existe |
| `contact.nivel_de_severidad` | `MQkBv6F2XmjD8nCRRSTg` | ✅ Existe |
| `contact.cdigo_test` | `25XkI2WcemIrb5dbGM32` | ✅ Existe |
| `contact.edad` | `AwLRuPhvgrkseh1m0NFp` | ✅ Existe |
| `contact.sexo` | `JtHKHzTR7fLb8kPbYbkz` | ✅ Existe |
| `contact.historial_de_evaluaciones` | `lCzRiiJdB9VIMeV9agg2` | ✅ Existe |
| `contact.ltima_evaluacin__fecha` | `WdhmvQrV2kHriuZzB2jM` | ✅ Existe |
| `contact.ltima_evaluacin__tipo` | `2OqG40RJRPtLOSYyCPXe` | ✅ Existe |
| `contact.ltima_evaluacin__puntaje` | `qA4EbA2X7c11xhMgQUpi` | ✅ Existe |
| `contact.ltima_evaluacin__nivel` | `NFMoFeJWXLGBxGCHtcDP` | ✅ Existe |

### Campos que NO Existen en GoHighLevel ❌

| Campo del Webhook | Tipo | Acción Requerida |
|-------------------|------|------------------|
| `terms_and_conditions` | Formulario Contacto | Crear campo custom |
| `timestamp` | Formulario Contacto | Crear campo custom o usar campo de sistema |
| `ciudad` | Autoevaluaciones | Usar campo estándar de GoHighLevel |

---

## 🎯 Resumen de Tipos de Evaluación

Los webhooks de autoevaluación pueden enviar los siguientes tipos:

1. **PHQ-9 Depresión** - Evaluación de depresión
2. **GAD-7 Ansiedad** - Evaluación de ansiedad
3. **Trastorno Bipolar** - Screening de bipolaridad
4. **PTSD Estrés Postraumático** - Evaluación de TEPT
5. **Evaluación Psicosis** - Detección temprana de psicosis
6. **ADHD/TDAH** - Evaluación de déficit de atención
7. **Trastorno Alimentario** - Screening de trastornos alimenticios
8. **Uso de Sustancias** - Evaluación de adicciones
9. **Depresión Postparto** - Para madres y padres
10. **Salud Mental Infantil** - Evaluación para padres (4-16 años)
11. **Salud Mental Juvenil** - Autoevaluación (11-17 años)

---

## ⚠️ Notas Importantes

1. **Campos Estándar vs Custom**: Los campos estándar (first_name, email, etc.) se mapean automáticamente en GoHighLevel. Los custom necesitan el ID exacto o el fieldKey.

2. **Formato de Datos**: 
   - Los números se envían como strings ("15", no 15)
   - Los booleanos se envían como strings ("true", no true)
   - Las fechas usan formato ISO 8601

3. **Historial de Evaluaciones**: Se envía como JSON string, no como objeto. GoHighLevel lo almacena como texto largo.

4. **Validación**: Ambos formularios validan con Zod antes de enviar, garantizando que todos los campos requeridos estén presentes.

5. **Modo CORS**: Los webhooks se envían con `mode: 'no-cors'` para evitar problemas de cross-origin.