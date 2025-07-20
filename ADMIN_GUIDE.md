# Guía de Usuario - Panel de Administración NeuroInnova

## 📋 Índice
1. [Acceso al Panel](#acceso-al-panel)
2. [Interfaz Principal](#interfaz-principal)
3. [Crear una Solicitud de Cambio](#crear-una-solicitud-de-cambio)
4. [Vista Previa de Cambios](#vista-previa-de-cambios)
5. [Historial de Cambios](#historial-de-cambios)
6. [Ejemplos Prácticos](#ejemplos-prácticos)
7. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🔐 Acceso al Panel

### URL de Acceso
- **Dirección**: `https://tu-sitio.com/admin`
- **Contraseña**: `neuroinnova2024`

### Pasos para Ingresar
1. Navega a la URL `/admin`
2. Ingresa la contraseña
3. Haz clic en "Ingresar"

![Login](https://via.placeholder.com/600x300?text=Pantalla+de+Login)

---

## 🖥️ Interfaz Principal

El panel tiene 3 secciones principales accesibles mediante pestañas:

### 1. **Nueva Solicitud** 
Donde describes los cambios que deseas realizar

### 2. **Vista Previa**
Donde revisas los cambios antes de aplicarlos

### 3. **Historial**
Registro de todos los cambios solicitados

---

## ✏️ Crear una Solicitud de Cambio

### Campos del Formulario

#### 1. **Descripción del cambio** (Obligatorio)
Describe en lenguaje natural lo que deseas cambiar. Sé específico y claro.

**Buenos ejemplos:**
- ✅ "Cambiar el número de WhatsApp a (+595) 991 800 886 en todo el sitio"
- ✅ "Actualizar el título del hero para decir 'Único centro con EMT/TMS en Paraguay'"
- ✅ "Agregar un nuevo testimonio de María González que dice 'Excelente atención...'"

**Malos ejemplos:**
- ❌ "Cambiar texto" (muy vago)
- ❌ "Actualizar sitio" (no específico)

#### 2. **Tipo de cambio**
Selecciona la categoría que mejor describe tu cambio:
- **Contenido/Texto**: Cambios en títulos, párrafos, descripciones
- **Diseño/Estilos**: Colores, tamaños, espaciados
- **Funcionalidad**: Nuevos campos en formularios, botones
- **Estructura/Navegación**: Nuevas páginas, menús

#### 3. **Prioridad**
- **Baja**: Puede esperar
- **Media**: Importante pero no urgente
- **Alta**: Necesario pronto
- **Urgente**: Requiere atención inmediata

#### 4. **Sección afectada**
Indica dónde se aplicará el cambio:
- Homepage
- Hero Section
- Servicios
- Testimonios
- Contacto
- Header/Navegación
- Footer
- Páginas de Servicios
- Páginas de Condiciones
- Autoevaluaciones
- Global (afecta todo el sitio)

### Proceso de Envío
1. Completa todos los campos
2. Haz clic en "Procesar Cambio"
3. Espera mientras el sistema analiza tu solicitud (15-30 segundos)
4. El sistema te notificará cuando esté listo

---

## 👁️ Vista Previa de Cambios

Una vez procesada tu solicitud, verás:

### 1. **Archivos a modificar**
Lista de archivos que serán actualizados

### 2. **Cambios propuestos**
Comparación lado a lado:
- **Antes**: Código actual (fondo rojo)
- **Después**: Código nuevo (fondo verde)

### 3. **Mensaje de commit**
Descripción técnica del cambio para el historial

### 4. **Acciones disponibles**
- **Aplicar Cambios**: Confirma y aplica los cambios
- **Cancelar**: Descarta los cambios

⚠️ **Importante**: Si aparece "Este cambio requiere revisión manual", significa que el cambio es complejo y podría necesitar ajustes adicionales.

---

## 📊 Historial de Cambios

El historial muestra todos los cambios solicitados con:
- Descripción del cambio
- Fecha y hora
- Estado:
  - 🟢 **Completado**: Cambio aplicado exitosamente
  - 🔵 **Procesando**: En proceso
  - 🔴 **Fallido**: Hubo un error
  - ⚪ **Pendiente**: En espera
- Tipo y prioridad
- Sección afectada

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Cambiar Número de WhatsApp
```
Descripción: Actualizar el número de WhatsApp a (+595) 991 800 886 en todo el sitio
Tipo: Contenido/Texto
Prioridad: Alta
Sección: Global
```

### Ejemplo 2: Agregar Testimonio
```
Descripción: Agregar nuevo testimonio de Juan Pérez que dice "El tratamiento con EMT cambió mi vida. Después de años de depresión, finalmente encontré alivio"
Tipo: Contenido/Texto
Prioridad: Media
Sección: Testimonios
```

### Ejemplo 3: Cambiar Color Principal
```
Descripción: Cambiar el color azul principal del sitio de #2C5F8B a #1E4D7B para que sea más oscuro
Tipo: Diseño/Estilos
Prioridad: Baja
Sección: Global
```

### Ejemplo 4: Actualizar Horarios
```
Descripción: Cambiar los horarios de atención en la página de contacto a Lunes a Viernes 8:00 - 18:00, Sábados 9:00 - 13:00
Tipo: Contenido/Texto
Prioridad: Media
Sección: Contacto
```

### Ejemplo 5: Modificar Título Principal
```
Descripción: Cambiar el título del hero para que diga "Centro Pionero en Neuromodulación - Único con EMT/TMS en Paraguay"
Tipo: Contenido/Texto
Prioridad: Alta
Sección: Hero Section
```

---

## ❓ Preguntas Frecuentes

### ¿Cuánto tiempo tarda en aplicarse un cambio?
- **Procesamiento**: 15-30 segundos
- **Aplicación en el sitio**: 2-5 minutos después de aplicar

### ¿Qué pasa si cometo un error?
- Los cambios se pueden revertir contactando al equipo técnico
- Siempre revisa la vista previa antes de aplicar

### ¿Por qué mi cambio falló?
Posibles razones:
- La descripción no fue lo suficientemente clara
- El cambio requiere modificaciones manuales complejas
- Error temporal del sistema (intenta de nuevo)

### ¿Puedo hacer múltiples cambios a la vez?
Es mejor hacer un cambio a la vez para poder revisar cada uno cuidadosamente.

### ¿Los cambios son inmediatos?
Los cambios se guardan inmediatamente, pero pueden tardar 2-5 minutos en verse reflejados en el sitio web debido al proceso de despliegue.

### ¿Qué tipos de cambios NO puedo hacer?
- Cambios en la estructura de la base de datos
- Modificaciones en la configuración del servidor
- Cambios que requieran nuevas integraciones externas
- Modificaciones en el código del panel de administración

---

## 📞 Soporte

Si necesitas ayuda adicional o encuentras problemas:
1. Toma una captura de pantalla del error
2. Anota la fecha y hora del problema
3. Contacta al equipo técnico con esta información

---

## 🔒 Seguridad

- **Nunca compartas la contraseña del panel**
- Cierra sesión cuando termines (cierra la pestaña)
- Si sospechas que la contraseña fue comprometida, contacta inmediatamente al equipo técnico

---

## 💡 Consejos Finales

1. **Sé específico**: Mientras más detalles proporciones, mejor será el resultado
2. **Revisa siempre**: La vista previa te muestra exactamente qué cambiará
3. **Empieza con cambios pequeños**: Familiarízate con el sistema antes de hacer cambios grandes
4. **Guarda las descripciones**: Si un cambio funciona bien, guarda la descripción para usarla como referencia futura
5. **Ten paciencia**: El sistema usa inteligencia artificial que está aprendiendo constantemente

---

*Última actualización: Diciembre 2024*