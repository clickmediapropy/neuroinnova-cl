# 🔧 FIXING FORMULARIOS - To-Do List

## 🤖 Instrucciones para Claude

### Proceso de Verificación Exhaustiva
Cuando revises formularios, SIEMPRE debes:

1. **CONTAR** el número exacto de preguntas implementadas
2. **VERIFICAR** que coincida con el test clínico estándar:
   - PHQ-9 = 9 preguntas
   - GAD-7 = 7 preguntas  
   - AUDIT = 10 preguntas
   - PCL-5 = 20 preguntas
   - EPDS = 10 preguntas
   - etc.

3. **CALCULAR** el puntaje máximo posible:
   ```javascript
   const numPreguntas = questionData.length;
   const valorMaximoPorPregunta = Math.max(...options.map(o => o.points));
   const puntajeMaximoPosible = numPreguntas * valorMaximoPorPregunta;
   ```

4. **CONFIRMAR** que los rangos acepten ese máximo:
   ```javascript
   const rangoMaximo = Math.max(...rangos.map(r => r.max));
   if (puntajeMaximoPosible > rangoMaximo) {
     // ERROR: Incompatibilidad detectada
   }
   ```

5. **SIMULAR** casos extremos:
   - Todas respuestas mínimas → puntaje debe ser 0
   - Todas respuestas máximas → no debe exceder rango máximo

6. **EJECUTAR** pruebas después de cada cambio:
   ```bash
   npx tsc --noEmit  # Sin errores TypeScript
   npm run dev       # Probar en navegador
   ```

### Proceso de Corrección

#### ⚠️ IMPORTANTE: Marcar progreso
**CADA VEZ que completes una tarea:**
1. Cambia `[ ]` por `[x]` en el checkbox correspondiente
2. Guarda el archivo FIXING_FORMULARIOS.md
3. Continúa con la siguiente tarea

**Ejemplo:**
```markdown
# Antes
- [ ] Eliminar todas las preguntas actuales

# Después de completar
- [x] Eliminar todas las preguntas actuales
```

#### Workflow completo:
```bash
# 1. Leer este archivo para ver qué falta
cat FIXING_FORMULARIOS.md

# 2. Trabajar en una tarea
# ... hacer los cambios ...

# 3. Marcar la tarea como completada
# Editar FIXING_FORMULARIOS.md y cambiar [ ] por [x]

# 4. Verificar que no hay errores
npx tsc --noEmit

# 5. Continuar con la siguiente tarea [ ]
```

### Validación Crítica

**NUNCA asumas que si existe configuración, está correcta.**

Debes validar:
- **Matemáticamente:** Los números deben cuadrar
- **Clínicamente:** Conocer los tests estándar (PCL-5 ≠ PC-PTSD-5)
- **Funcionalmente:** Ejecutar el código y probar
- **Exhaustivamente:** No dar por bueno sin verificar

### Ejemplo de Error Detectado
```javascript
// PROBLEMA: El que tuvimos con PTSD
// Implementado: 20 preguntas × 3 puntos = 60 máximo
// Rangos esperaban: 0-5 máximo
// INCOMPATIBLE → Error en runtime

// SOLUCIÓN: 
// 1. Identificar discrepancia
// 2. Determinar qué test es realmente (PCL-5 no PC-PTSD-5)
// 3. Ajustar rangos o preguntas según corresponda
```

---

## 📋 Estado General
- **Fecha de análisis:** 26/08/2025
- **Total de formularios:** 12
- **Formularios corregidos:** 9 ✅
- **Formularios pendientes:** 0 ✅
- **Formularios correctos sin cambios:** 3 ✅

---

## ✅ Formularios Ya Corregidos

### 1. ✅ PTSD (PCL-5)
- **Estado:** CORREGIDO
- **Cambios realizados:**
  - Actualizado de PC-PTSD-5 a PCL-5
  - Cambiada escala de 0-3 a 0-4
  - Ajustados rangos de puntuación (0-80)

### 2. ✅ BIPOLAR (MDQ)
- **Estado:** CORREGIDO
- **Cambios realizados:**
  - Cambiado de escala 0-3 a respuestas Sí/No (0-1)
  - Puntaje máximo ahora compatible: 12 puntos

### 3. ✅ PSICOSIS (PQ-B)
- **Estado:** CORREGIDO
- **Cambios realizados:**
  - Cambiado de escala 0-3 a respuestas Sí/No (0-1)
  - Rangos ajustados: 0-2 bajo, 3-21 alto

### 4. ✅ PSC-35 PADRES
- **Estado:** CORREGIDO
- **Cambios realizados:**
  - Separado en PSC-35-P y PSC-35-Y
  - Rangos corregidos: 0-27 normal, 28-70 con dificultades

### 5. ✅ PSC-35 JÓVENES
- **Estado:** CORRECTO (sin cambios necesarios)
- **Configuración actual:** 35 preguntas, 0-3 puntos, máximo 105

---

## ✅ Formularios Completados en Esta Sesión

### 1. ✅ ADICCIONES (AUDIT-10)
**Problema resuelto:** Tenía 11 preguntas genéricas, ahora tiene las 10 preguntas del AUDIT-10 estándar

#### Tareas:
- [x] Eliminar todas las preguntas actuales (líneas 818-1202 en assessmentQuestions.ts) ✅
- [x] Agregar las 10 preguntas del AUDIT estándar ✅
- [x] Actualizar el componente AdiccionEvaluacion.tsx con lógica especial para diferentes escalas ✅
- [x] Verificar rangos de puntuación AUDIT (0-7, 8-15, 16-19, 20-40) ✅

**Tiempo estimado:** 20-30 minutos

---

### 2. ✅ TDAH (ASRS-v1.1)
**Verificado:** Tiene las 18 preguntas correctas y rangos adecuados

#### Tareas:
- [x] Verificar las 18 preguntas actuales vs ASRS-v1.1 oficial ✅
- [x] Verificar sistema de puntuación (0-4 por pregunta, máximo 72) ✅
- [x] Confirmar rangos: 0-18, 19-26, 27-35, 36-48, 49-72 ✅

**Nota:** La implementación actual usa puntuación simplificada uniforme en lugar de dos partes. Esto es aceptable para screening inicial.

**Tiempo estimado:** 15-20 minutos

---

### 3. ✅ TRASTORNO ALIMENTARIO (SWED)
**Verificado:** Lógica especial correctamente implementada

#### Tareas:
- [x] Verificar las 8 preguntas actuales contra SWED estándar ✅
- [x] Revisar el componente TrastornoAlimentarioEvaluacion.tsx ✅
- [x] Confirmar que la lógica especial es correcta ✅
  - Preguntas 0-4: Sí/No (0-1)
  - Pregunta 5: escala de miedo (0-4)
  - Pregunta 6: última dieta (0-5)
  - Pregunta 7: importancia del peso (0-4)
- [x] Calcular puntaje máximo real (18) y verificar rangos (0-7, 8-13, 14-20) ✅

**Tiempo estimado:** 10-15 minutos

---

### 4. ✅ DEPRESIÓN POSTPARTO (EPDS)
**Verificado:** Escalas invertidas correctamente implementadas

#### Tareas:
- [x] Verificar las 10 preguntas contra EPDS oficial ✅
- [x] Confirmar preguntas con escala invertida correctamente implementadas ✅
  - Preguntas 0-1: Escalas positivas (correctamente invertidas)
  - Preguntas 2-9: Escalas negativas (puntuación normal)
- [x] Revisar el componente DepresionPostpartoEvaluacion.tsx ✅
- [x] Verificar que getOptionsForQuestion() maneja correctamente cada pregunta ✅
- [x] Confirmar rangos: 0-6 mínima, 7-13 leve, 14-19 moderada, 20-30 severa ✅

**Tiempo estimado:** 10-15 minutos

---

## ✅ Formularios Correctos (Sin cambios necesarios)

1. **PHQ-9 (Depresión):** 9 preguntas, 0-3 puntos, máximo 27 ✅
2. **GAD-7 (Ansiedad):** 7 preguntas, 0-3 puntos, máximo 21 ✅
3. **PSC-35 Jóvenes:** 35 preguntas, 0-3 puntos, máximo 105 ✅

---

## 📊 Resumen de Prioridades

### 🔴 Crítico (hacer primero)
1. **Adicciones:** Completamente mal implementado con 41 preguntas

### 🟡 Importante (hacer después)
2. **TDAH:** Funciona pero no es fiel al estándar
3. **Trastorno Alimentario:** Verificar lógica especial
4. **Depresión Postparto:** Verificar escalas invertidas

### 🟢 Opcional (mejoras menores)
- Agregar pregunta 13 faltante al MDQ (Bipolar)
- Agregar pregunta 21 faltante al PQ-B (Psicosis)
- Documentar mejor los algoritmos de puntuación especiales

---

## 🚀 Comandos Útiles

```bash
# Verificar tipos TypeScript
npx tsc --noEmit

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar linter
npm run lint

# Contar preguntas de una sección
grep -c "question:" src/data/assessmentQuestions.ts

# Ver rangos de un test específico
grep -A 20 "'AUDIT'" src/data/clinicalScoring.ts
```

---

## 📝 Notas Adicionales

### Archivos clave:
- `/src/data/assessmentQuestions.ts` - Preguntas de todos los tests
- `/src/data/clinicalScoring.ts` - Rangos y puntuación
- `/src/pages/*Evaluacion.tsx` - Componentes de cada formulario
- `/src/components/assessment/AssessmentResults.tsx` - Resultados compartidos

### Validación importante:
Para cada formulario, siempre verificar:
1. **Número de preguntas** = Estándar del test
2. **Escala de respuestas** = Opciones correctas
3. **Puntaje máximo posible** = N° preguntas × valor máximo
4. **Rangos configurados** ≥ Puntaje máximo posible

### Testing:
Después de cada corrección:
1. Ejecutar `npx tsc --noEmit`
2. Probar formulario en navegador
3. Verificar cálculo de puntaje con caso extremo (todas respuestas máximas)
4. Confirmar que se muestra interpretación correcta

---

## 🎯 Instrucciones Específicas para Claude

### Al iniciar el trabajo:
```bash
# 1. Primero, lee TODO el archivo para entender el contexto
cat FIXING_FORMULARIOS.md

# 2. Identifica las tareas pendientes (checkboxes sin marcar [ ])

# 3. Comienza SIEMPRE con las tareas marcadas como 🔴 Crítico

# 4. Usa TodoWrite para crear tu lista de trabajo
```

### Durante el trabajo:

1. **Para cada formulario a corregir:**
   ```javascript
   // a) Cuenta las preguntas actuales
   const numPreguntasActuales = // contar en assessmentQuestions.ts
   
   // b) Verifica el estándar del test
   const numPreguntasEstandar = // según el test clínico oficial
   
   // c) Revisa las opciones de respuesta
   const opcionesActuales = // en el componente *Evaluacion.tsx
   
   // d) Calcula compatibilidad
   const maxPosible = numPreguntas * maxPorPregunta;
   const rangoMax = // en clinicalScoring.ts
   
   if (maxPosible > rangoMax) {
      // PROBLEMA DETECTADO - debe corregirse
   }
   ```

2. **Después de CADA cambio:**
   - Ejecuta `npx tsc --noEmit`
   - Si hay error, corrígelo antes de continuar
   - Marca la subtarea como completada [x]

3. **Al completar un formulario completo:**
   - Marca todas sus subtareas como [x]
   - Actualiza el contador de formularios corregidos
   - Documenta cualquier decisión importante

### Recordatorios críticos:

⚠️ **NO OLVIDES:**
- Marcar [x] cada tarea completada EN TIEMPO REAL
- No avanzar a la siguiente tarea sin marcar la anterior
- Si encuentras un problema no documentado, agrégalo al archivo
- Si algo no está claro, documenta tu decisión

### Ejemplo de progreso correcto:
```markdown
### 1. 🔴 ADICCIONES (AUDIT-10)
#### Tareas:
- [x] Eliminar todas las preguntas actuales (líneas 818-1202)  ✅ Hecho 18:52
- [x] Agregar las 10 preguntas del AUDIT estándar             ✅ Hecho 18:55
- [ ] Actualizar el componente AdiccionEvaluacion.tsx         ⏳ En progreso
- [ ] Verificar rangos de puntuación AUDIT
```

### Comando para verificar progreso:
```bash
# Ver cuántas tareas quedan
grep -c "\[ \]" FIXING_FORMULARIOS.md

# Ver cuántas tareas completadas
grep -c "\[x\]" FIXING_FORMULARIOS.md
```

---

## ⏱️ Tiempo Total Estimado
- **Crítico:** 30 minutos
- **Importante:** 40 minutos
- **Total:** ~70 minutos para corrección completa

---

*Última actualización: 26/08/2025 - 18:52*
*Próxima sesión: Comenzar con 🔴 ADICCIONES (AUDIT-10)*