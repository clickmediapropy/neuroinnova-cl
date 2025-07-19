# Organización de Custom Fields de GoHighLevel

## Resumen de Análisis

Después de revisar todos los campos, **NO se encontraron duplicados reales entre español e inglés**. Todos los campos deben mantenerse ya que:
- Los campos estándar de GoHighLevel (First Name, Last Name, Email, Phone, etc.) están en inglés
- Los campos personalizados específicos del negocio están en español y son únicos
- `Edad` y `Sexo` no son campos estándar de GoHighLevel, por lo que deben mantenerse

## Estructura por Carpetas

### 📁 Contact (Campos Principales)
| Campo | Tipo | Unique Key | Estado |
|-------|------|------------|--------|
| First Name | STANDARD_FIELD | `{{ contact.first_name }}` | ✅ Mantener |
| Last Name | STANDARD_FIELD | `{{ contact.last_name }}` | ✅ Mantener |
| Email | STANDARD_FIELD | `{{ contact.email }}` | ✅ Mantener |
| Phone | STANDARD_FIELD | `{{ contact.phone }}` | ✅ Mantener |
| Date Of Birth | STANDARD_FIELD | `{{ contact.date_of_birth }}` | ✅ Mantener |
| Contact Source | STANDARD_FIELD | `{{ contact.source }}` | ✅ Mantener |
| Contact Type | STANDARD_FIELD | `{{ contact.type }}` | ✅ Mantener |
| Edad | NUMERICAL | `{{ contact.edad }}` | ✅ Mantener |
| Sexo | SINGLE_OPTIONS | `{{ contact.sexo }}` | ✅ Mantener |
| Message | LARGE_TEXT | `{{ contact.message }}` | ✅ Mantener |

### 📁 General Info
| Campo | Tipo | Unique Key | Estado |
|-------|------|------------|--------|
| Business Name | STANDARD_FIELD | `{{ contact.company_name }}` | ✅ Mantener |
| Street Address | STANDARD_FIELD | `{{ contact.address1 }}` | ✅ Mantener |
| City | STANDARD_FIELD | `{{ contact.city }}` | ✅ Mantener |
| Country | STANDARD_FIELD | `{{ contact.country }}` | ✅ Mantener |
| State | STANDARD_FIELD | `{{ contact.state }}` | ✅ Mantener |
| Postal Code | STANDARD_FIELD | `{{ contact.postal_code }}` | ✅ Mantener |
| Website | STANDARD_FIELD | `{{ contact.website }}` | ✅ Mantener |
| Time Zone | STANDARD_FIELD | `{{ contact.timezone }}` | ✅ Mantener |

### 📁 Additional Info
| Campo | Tipo | Unique Key | Estado |
|-------|------|------------|--------|
| Dirección IP | TEXT | `{{ contact.direccin_ip }}` | ✅ Mantener (único en español) |
| Tipo De Evaluación | TEXT | `{{ contact.tipo_de_evaluacin }}` | ✅ Mantener (único en español) |
| Nivel De Severidad | TEXT | `{{ contact.nivel_de_severidad }}` | ✅ Mantener (único en español) |
| Código Test | TEXT | `{{ contact.cdigo_test }}` | ✅ Mantener (único en español) |
| Historial De Evaluaciones | LARGE_TEXT | `{{ contact.historial_de_evaluaciones }}` | ✅ Mantener (único en español) |
| Última Evaluación - Fecha | DATE | `{{ contact.ltima_evaluacin__fecha }}` | ✅ Mantener (único en español) |
| Última Evaluación - Tipo | TEXT | `{{ contact.ltima_evaluacin__tipo }}` | ✅ Mantener (único en español) |
| Última Evaluación - Puntaje | NUMERICAL | `{{ contact.ltima_evaluacin__puntaje }}` | ✅ Mantener (único en español) |
| Última Evaluación - Nivel | TEXT | `{{ contact.ltima_evaluacin__nivel }}` | ✅ Mantener (único en español) |
| Servicio De Interés | TEXT | `{{ contact.servicio_de_inters }}` | ✅ Mantener (único en español) |

### 📁 Datos Clínicos
| Campo | Tipo | Unique Key | Estado |
|-------|------|------------|--------|
| Fecha Última Consulta | DATE | `{{ contact.fecha_ltima_consulta }}` | ✅ Mantener (único en español) |
| Número De Sesiones | NUMERICAL | `{{ contact.nmero_de_sesiones }}` | ✅ Mantener (único en español) |
| Medicación Actual | LARGE_TEXT | `{{ contact.medicacin_actual }}` | ✅ Mantener (único en español) |
| Tipo De Tratamiento | TEXT | `{{ contact.tipo_de_tratamiento }}` | ✅ Mantener (único en español) |
| Presupuesto Total | MONETARY | `{{ contact.presupuesto_total }}` | ✅ Mantener (único en español) |
| Diagnóstico Del Dr. Adorno | LARGE_TEXT | `{{ contact.diagnostico_del_dr_adorno }}` | ✅ Mantener (único en español) |

### 📁 Pre-evaluación Depresión
| Campo | Tipo | Unique Key | Estado |
|-------|------|------------|--------|
| PHQ9 - Puntaje Total | NUMERICAL | `{{ contact.score_phq_9_puntaje_total_2 }}` | ✅ Mantener (único en español) |
| Diagnóstico Preliminar | TEXT | `{{ contact.diagnstico_preliminar }}` | ✅ Mantener (único en español) |

### 📁 Concentrador de oxígeno
| Campo | Tipo | Unique Key | Estado |
|-------|------|------------|--------|
| Número Serie Concentrador | TEXT | `{{ contact.nmero_serie_concentrador }}` | ✅ Mantener (único en español) |
| Fecha Inicio Alquiler | DATE | `{{ contact.fecha_inicio_alquiler }}` | ✅ Mantener (único en español) |
| Fecha Fin Alquiler | DATE | `{{ contact.fecha_fin_alquiler }}` | ✅ Mantener (único en español) |

## Recomendaciones

### 1. **Análisis de Duplicados**
No se encontraron campos duplicados entre español e inglés. Todos los campos deben mantenerse porque:
- Los campos en inglés son campos estándar de GoHighLevel
- Los campos en español son personalizaciones específicas del negocio
- `Edad` y `Sexo` no existen como campos estándar en GoHighLevel

### 2. **Organización Actual**
La estructura actual está bien organizada con:
- **Campos estándar del sistema**: En inglés (First Name, Last Name, etc.)
- **Campos personalizados del negocio**: En español (campos médicos, evaluaciones, etc.)
- **Campos demográficos adicionales**: `Edad` y `Sexo` complementan la información básica

### 3. **Buenas Prácticas**
- Mantener los campos estándar en inglés para compatibilidad con el sistema
- Los campos específicos del negocio en español son apropiados y claros
- La organización por carpetas facilita la gestión y comprensión

### 4. **Conclusión**
No es necesario eliminar ningún campo. La configuración actual es óptima para un negocio médico/clínico que opera en español y utiliza GoHighLevel.