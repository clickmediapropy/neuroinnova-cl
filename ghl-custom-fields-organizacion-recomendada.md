# Organización Recomendada de Custom Fields - NeuroInnova GoHighLevel

## 📊 Resumen del Análisis

- **Total de campos**: 28 custom fields
- **Duplicados encontrados**: 0 (¡Excelente!)
- **Campos sin usar aparentemente**: 10 campos en categoría "Otros"

## 🗂️ Estructura de Carpetas Sugerida

### 1️⃣ **📁 Datos del Paciente**
*Información personal y demográfica del contacto*

**Campos a incluir:**
- Edad (`contact.edad`)
- Sexo (`contact.sexo`)
- Dirección IP (`contact.direccin_ip`)

**Campos a crear/agregar:**
- Ciudad (missing)
- País (missing)
- Ocupación (opcional)

---

### 2️⃣ **📁 Evaluaciones Clínicas**
*Todos los datos relacionados con tests y evaluaciones*

**Campos a incluir:**
- PHQ9 - Puntaje Total (`contact.score_phq_9_puntaje_total_2`)
- Tipo de Evaluación (`contact.tipo_de_evaluacin`)
- Nivel de Severidad (`contact.nivel_de_severidad`)
- Código Test (`contact.cdigo_test`)
- Diagnóstico Preliminar (`contact.diagnstico_preliminar`)
- Historial de Evaluaciones (`contact.historial_de_evaluaciones`)
- Última Evaluación - Fecha (`contact.ltima_evaluacin__fecha`)
- Última Evaluación - Tipo (`contact.ltima_evaluacin__tipo`)
- Última Evaluación - Puntaje (`contact.ltima_evaluacin__puntaje`)
- Última Evaluación - Nivel (`contact.ltima_evaluacin__nivel`)

---

### 3️⃣ **📁 Información Médica**
*Datos clínicos y tratamientos*

**Campos a incluir:**
- Medicación Actual (`contact.medicacin_actual`)
- Diagnóstico del Dr. Adorno (`contact.diagnostico_del_dr_adorno`)
- Tipo de Tratamiento (`contact.tipo_de_tratamiento`)
- Fecha Última Consulta (`contact.fecha_ltima_consulta`)
- Número de Sesiones (`contact.nmero_de_sesiones`)

---

### 4️⃣ **📁 Intereses y Formularios**
*Tracking de origen y preferencias*

**Campos a incluir:**
- Servicio de Interés (`contact.servicio_de_inters`)
- Message (`contact.message`) - ⚠️ Renombrar a "Mensaje/Consulta"
- How did you hear about us? (`contact.how_did_you_hear_about_us`) - ⚠️ Traducir a español
- Source Page (`contact.source_page`)
- Form Type (`contact.form_type`)

---

### 5️⃣ **📁 Alquiler de Equipos**
*Específico para el servicio de alquiler de dispositivos*

**Campos a incluir:**
- Número Serie Concentrador (`contact.nmero_serie_concentrador`)
- Fecha Inicio Alquiler (`contact.fecha_inicio_alquiler`)
- Fecha Fin Alquiler (`contact.fecha_fin_alquiler`)
- Presupuesto Total (`contact.presupuesto_total`)

---

## 🔴 Campos Problemáticos a Corregir

### 1. **Campos en Inglés** (Requieren traducción)
- `Gender` → Cambiar a "Género" o eliminar (ya existe "Sexo")
- `How did you hear about us?` → "¿Cómo se enteró de nosotros?"
- `Message` → "Mensaje" o "Consulta"

### 2. **Campos Redundantes**
- `Gender` (CHECKBOX) vs `Sexo` (SINGLE_OPTIONS) 
  - **Recomendación**: Eliminar `Gender` y mantener solo `Sexo`

### 3. **Tipos de Datos Incorrectos**
- `How did you hear about us?` está como CHECKBOX, debería ser SINGLE_OPTIONS o TEXT
- `Gender` está como CHECKBOX, debería ser SINGLE_OPTIONS

### 4. **Campos con Nombres Técnicos**
- `contact.score_phq_9_puntaje_total_2` → Simplificar a "Puntaje PHQ-9"
- Los guiones bajos en nombres deberían usar espacios

## 🟢 Campos Nuevos Recomendados

### Para mejorar el tracking:
1. **Fecha de Primer Contacto** (DATE)
2. **Estado del Lead** (SINGLE_OPTIONS: Nuevo, En Seguimiento, Paciente Activo, Inactivo)
3. **Próxima Cita** (DATE)
4. **Notas de Seguimiento** (LARGE_TEXT)
5. **Consentimiento de Comunicación** (CHECKBOX)
6. **Preferencia de Contacto** (SINGLE_OPTIONS: WhatsApp, Llamada, Email)

### Para servicios específicos:
1. **Sesiones EMT/TMS Completadas** (NUMERICAL)
2. **Sesiones tDCS Completadas** (NUMERICAL)
3. **Progreso RehaCom** (TEXT)
4. **Respuesta al Tratamiento** (SINGLE_OPTIONS: Excelente, Buena, Regular, Sin Respuesta)

## 📋 Plan de Acción Sugerido

### Fase 1: Limpieza (Inmediato)
1. ✅ Traducir campos en inglés
2. ✅ Eliminar campo `Gender` redundante
3. ✅ Corregir tipos de datos incorrectos
4. ✅ Renombrar campos con formato técnico

### Fase 2: Organización (Esta semana)
1. ✅ Crear las 5 carpetas sugeridas
2. ✅ Mover campos a sus carpetas correspondientes
3. ✅ Agregar descripciones claras a cada campo

### Fase 3: Mejoras (Próximas 2 semanas)
1. ✅ Crear los campos nuevos recomendados
2. ✅ Configurar automatizaciones basadas en estos campos
3. ✅ Entrenar al equipo en el uso correcto

## 💡 Notas Importantes

1. **No eliminar campos en uso**: Verificar que ningún workflow activo use los campos antes de eliminarlos
2. **Mapear IDs**: Al hacer cambios, actualizar los IDs en los formularios del sitio web
3. **Backup**: Exportar configuración actual antes de hacer cambios masivos
4. **Testing**: Probar todos los formularios después de cualquier cambio

## 🔗 Integración con el Sitio Web

Los siguientes campos son críticos para los formularios web:
- `GV3kzQc2ELggE7d2KLSk` (Message) - Usado en formulario de contacto
- `eI3874kqFkPMClPIqy0G` (How did you hear about us?) - Usado en formulario de contacto
- Todos los campos de evaluación - Usados en formularios de autoevaluación

**⚠️ IMPORTANTE**: Estos IDs deben actualizarse en el código si se eliminan o recrean los campos.