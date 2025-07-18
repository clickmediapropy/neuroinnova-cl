// Script para crear custom fields en GoHighLevel usando API v2
// Documentación: https://highlevel.stoplight.io/docs/integrations/

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc';
const LOCATION_ID = 'Lmk3yMGsLO5NUbaGlZeB';

// Headers para la API
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

// Función para probar la conexión
async function testConnection() {
  console.log('🔍 Probando conexión con GoHighLevel...');
  
  // Intentar con diferentes endpoints para verificar acceso
  const endpoints = [
    `https://services.leadconnectorhq.com/locations/${LOCATION_ID}`,
    `https://rest.gohighlevel.com/v1/custom-fields/?locationId=${LOCATION_ID}`,
    `https://services.leadconnectorhq.com/custom-fields/?locationId=${LOCATION_ID}`
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n📡 Probando: ${endpoint}`);
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: headers
      });
      
      console.log(`   Status: ${response.status}`);
      const text = await response.text();
      console.log(`   Response: ${text.substring(0, 100)}...`);
      
      if (response.ok) {
        console.log(`   ✅ Endpoint funciona!`);
        return endpoint;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }
  
  return null;
}

// Función para mostrar instrucciones manuales
function showManualInstructions() {
  console.log('\n===============================================');
  console.log('📋 INSTRUCCIONES PARA CREAR CAMPOS MANUALMENTE');
  console.log('===============================================\n');
  
  console.log('Como la API no está respondiendo correctamente, aquí están los campos');
  console.log('que necesitas crear manualmente en GoHighLevel:\n');
  
  console.log('1. Ingresa a tu cuenta de GoHighLevel');
  console.log('2. Ve a Settings > Custom Fields');
  console.log('3. Crea los siguientes campos:\n');
  
  console.log('CAMPOS DEL FORMULARIO DE CONTACTO:');
  console.log('-----------------------------------');
  console.log('1. Nombre: "Mensaje/Interés"');
  console.log('   Tipo: Text');
  console.log('   Key: mensaje_interes\n');
  
  console.log('2. Nombre: "Cómo se enteró"');
  console.log('   Tipo: Dropdown');
  console.log('   Opciones: Website, Redes Sociales, Referido, Google, Otro\n');
  
  console.log('3. Nombre: "Términos y Condiciones"');
  console.log('   Tipo: Checkbox\n');
  
  console.log('4. Nombre: "Servicio de Interés"');
  console.log('   Tipo: Dropdown');
  console.log('   Opciones:');
  console.log('   - Estimulación Magnética Transcraneal (EMT/TMS)');
  console.log('   - Estimulación Transcraneal por Corriente Directa (tDCS)');
  console.log('   - Consulta Psiquiátrica');
  console.log('   - RehaCom - Rehabilitación Cognitiva');
  console.log('   - Otro servicio\n');
  
  console.log('5. Nombre: "Página de Origen"');
  console.log('   Tipo: Text\n');
  
  console.log('6. Nombre: "Tipo de Formulario"');
  console.log('   Tipo: Dropdown');
  console.log('   Opciones: contact-form, assessment-form, appointment-form\n');
  
  console.log('7. Nombre: "Timestamp"');
  console.log('   Tipo: Text\n');
  
  console.log('\nCAMPOS DE AUTOEVALUACIÓN:');
  console.log('-------------------------');
  console.log('8. Nombre: "Score PHQ-9 (Puntaje Total)"');
  console.log('   Tipo: Number\n');
  
  console.log('9. Nombre: "Diagnóstico Preliminar"');
  console.log('   Tipo: Text Area\n');
  
  console.log('10. Nombre: "Tipo de Evaluación"');
  console.log('    Tipo: Dropdown');
  console.log('    Opciones: PHQ-9 Depresión, GAD-7 Ansiedad, Trastorno Bipolar, etc.\n');
  
  console.log('11. Nombre: "Nivel de Severidad"');
  console.log('    Tipo: Dropdown');
  console.log('    Opciones: Leve, Moderada, Moderadamente Severa, Severa, Crítica\n');
  
  console.log('12. Nombre: "Código Test"');
  console.log('    Tipo: Text\n');
  
  console.log('13. Nombre: "Edad"');
  console.log('    Tipo: Number\n');
  
  console.log('14. Nombre: "Sexo"');
  console.log('    Tipo: Dropdown');
  console.log('    Opciones: masculino, femenino, otro, prefiero no decir\n');
  
  console.log('15. Nombre: "Historial de Evaluaciones"');
  console.log('    Tipo: Text Area\n');
  
  console.log('16-19. Última Evaluación - Fecha/Tipo/Puntaje/Nivel');
  console.log('    Tipos: Text, Text, Number, Text respectivamente\n');
}

// Función para crear archivo de mapeo
async function createMappingFile() {
  console.log('\n📄 Creando archivo de mapeo para actualizar en el código...\n');
  
  const mapping = {
    "instrucciones": "Después de crear los campos manualmente, actualiza los IDs aquí",
    "campos_formulario": {
      "mensaje_interes": {
        "nombre": "Mensaje/Interés",
        "id_actual": "GV3kzQc2ELggE7d2KLSk",
        "nuevo_id": "PEGAR_ID_AQUI"
      },
      "como_se_entero": {
        "nombre": "Cómo se enteró",
        "id_actual": "eI3874kqFkPMClPIqy0G",
        "nuevo_id": "PEGAR_ID_AQUI"
      },
      "terminos_condiciones": {
        "nombre": "Términos y Condiciones",
        "id_actual": "terms_and_conditions",
        "nuevo_id": "PEGAR_ID_AQUI"
      }
    },
    "campos_con_prefijo_contact": {
      "servicio_de_interes": {
        "nombre": "Servicio de Interés",
        "key_actual": "contact.servicio_de_inters",
        "nuevo_key": "contact.PEGAR_KEY_AQUI"
      },
      "source_page": {
        "nombre": "Página de Origen",
        "key_actual": "contact.source_page",
        "nuevo_key": "contact.PEGAR_KEY_AQUI"
      },
      "form_type": {
        "nombre": "Tipo de Formulario",
        "key_actual": "contact.form_type",
        "nuevo_key": "contact.PEGAR_KEY_AQUI"
      }
    },
    "campos_evaluacion": {
      "score_phq_9": {
        "nombre": "Score PHQ-9 (Puntaje Total)",
        "key_actual": "contact.score_phq_9_puntaje_total_2",
        "nuevo_key": "contact.PEGAR_KEY_AQUI"
      },
      "diagnostico_preliminar": {
        "nombre": "Diagnóstico Preliminar",
        "key_actual": "contact.diagnstico_preliminar",
        "nuevo_key": "contact.PEGAR_KEY_AQUI"
      }
    },
    "notas": [
      "1. Crea los campos manualmente en GoHighLevel",
      "2. Copia los IDs generados",
      "3. Actualiza este archivo con los nuevos IDs",
      "4. Ejecuta update-form-field-ids.js para actualizar el código"
    ]
  };
  
  const fs = require('fs').promises;
  await fs.writeFile(
    'ghl-fields-mapping-manual.json',
    JSON.stringify(mapping, null, 2)
  );
  
  console.log('✅ Archivo creado: ghl-fields-mapping-manual.json');
  console.log('   Actualiza este archivo con los IDs después de crear los campos.\n');
}

// Script principal
async function main() {
  console.log('🚀 Script de Custom Fields para GoHighLevel');
  console.log('==========================================\n');
  
  // Probar conexión
  const workingEndpoint = await testConnection();
  
  if (!workingEndpoint) {
    console.log('\n⚠️  No se pudo conectar a la API de GoHighLevel.');
    console.log('   Esto puede deberse a permisos limitados del API token.');
    console.log('   Los webhooks funcionan, pero la gestión de campos puede requerir');
    console.log('   permisos adicionales o acceso directo desde la UI.\n');
    
    // Mostrar instrucciones manuales
    showManualInstructions();
    
    // Crear archivo de mapeo
    await createMappingFile();
    
    console.log('\n===============================================');
    console.log('💡 SIGUIENTE PASO:');
    console.log('===============================================');
    console.log('1. Crea los campos manualmente en GoHighLevel');
    console.log('2. Actualiza ghl-fields-mapping-manual.json con los IDs');
    console.log('3. Ejecuta: node update-form-field-ids.js');
    console.log('   para actualizar automáticamente el código\n');
  }
}

// Ejecutar
main().catch(console.error);