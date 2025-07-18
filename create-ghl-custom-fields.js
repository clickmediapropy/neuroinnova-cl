// Script para crear custom fields en GoHighLevel
// IMPORTANTE: Este script crea los campos que faltan en GoHighLevel

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc';
const LOCATION_ID = 'Lmk3yMGsLO5NUbaGlZeB';
const BASE_URL = 'https://rest.gohighlevel.com/v1';

// Configuración de headers
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Custom fields a crear
const customFieldsToCreate = [
  {
    name: 'Mensaje/Interés',
    key: 'mensaje_interes',
    dataType: 'TEXT',
    placeholder: 'Mensaje del usuario o interés en servicio',
    position: 0
  },
  {
    name: 'Cómo se enteró',
    key: 'como_se_entero',
    dataType: 'SINGLE_OPTIONS',
    placeholder: 'Cómo se enteró del servicio',
    position: 1,
    options: ['Website', 'Redes Sociales', 'Referido', 'Google', 'Otro']
  },
  {
    name: 'Términos y Condiciones',
    key: 'terminos_condiciones',
    dataType: 'CHECKBOX',
    placeholder: 'Aceptación de términos',
    position: 2
  },
  {
    name: 'Servicio de Interés',
    key: 'servicio_de_interes',
    dataType: 'SINGLE_OPTIONS',
    placeholder: 'Servicio de interés',
    position: 3,
    options: [
      'Estimulación Magnética Transcraneal (EMT/TMS)',
      'Estimulación Transcraneal por Corriente Directa (tDCS)',
      'Consulta Psiquiátrica',
      'RehaCom - Rehabilitación Cognitiva',
      'Otro servicio'
    ]
  },
  {
    name: 'Página de Origen',
    key: 'source_page',
    dataType: 'TEXT',
    placeholder: 'Página desde donde se envió el formulario',
    position: 4
  },
  {
    name: 'Tipo de Formulario',
    key: 'form_type',
    dataType: 'SINGLE_OPTIONS',
    placeholder: 'Tipo de formulario enviado',
    position: 5,
    options: ['contact-form', 'assessment-form', 'appointment-form']
  },
  {
    name: 'Timestamp',
    key: 'timestamp_submission',
    dataType: 'TEXT',
    placeholder: 'Fecha y hora de envío',
    position: 6
  }
];

// Custom fields para autoevaluaciones
const assessmentFields = [
  {
    name: 'Score PHQ-9 (Puntaje Total)',
    key: 'score_phq_9_puntaje_total',
    dataType: 'NUMBER',
    placeholder: 'Puntaje total de la evaluación',
    position: 10
  },
  {
    name: 'Diagnóstico Preliminar',
    key: 'diagnostico_preliminar',
    dataType: 'LARGE_TEXT',
    placeholder: 'Diagnóstico preliminar completo',
    position: 11
  },
  {
    name: 'Tipo de Evaluación',
    key: 'tipo_de_evaluacion',
    dataType: 'SINGLE_OPTIONS',
    placeholder: 'Tipo de evaluación realizada',
    position: 12,
    options: [
      'PHQ-9 Depresión',
      'GAD-7 Ansiedad',
      'Trastorno Bipolar',
      'PTSD Estrés Postraumático',
      'Evaluación Psicosis',
      'ADHD/TDAH',
      'Trastorno Alimentario',
      'Uso de Sustancias',
      'Depresión Postparto',
      'Salud Mental Infantil',
      'Salud Mental Juvenil'
    ]
  },
  {
    name: 'Nivel de Severidad',
    key: 'nivel_de_severidad',
    dataType: 'SINGLE_OPTIONS',
    placeholder: 'Nivel de severidad detectado',
    position: 13,
    options: ['Leve', 'Moderada', 'Moderadamente Severa', 'Severa', 'Crítica']
  },
  {
    name: 'Código Test',
    key: 'codigo_test',
    dataType: 'TEXT',
    placeholder: 'Código interno del test',
    position: 14
  },
  {
    name: 'Edad',
    key: 'edad',
    dataType: 'NUMBER',
    placeholder: 'Edad del paciente',
    position: 15
  },
  {
    name: 'Sexo',
    key: 'sexo',
    dataType: 'SINGLE_OPTIONS',
    placeholder: 'Sexo del paciente',
    position: 16,
    options: ['masculino', 'femenino', 'otro', 'prefiero no decir']
  },
  {
    name: 'Historial de Evaluaciones',
    key: 'historial_de_evaluaciones',
    dataType: 'LARGE_TEXT',
    placeholder: 'Historial completo de evaluaciones en JSON',
    position: 17
  },
  {
    name: 'Última Evaluación - Fecha',
    key: 'ultima_evaluacion_fecha',
    dataType: 'TEXT',
    placeholder: 'Fecha de la última evaluación',
    position: 18
  },
  {
    name: 'Última Evaluación - Tipo',
    key: 'ultima_evaluacion_tipo',
    dataType: 'TEXT',
    placeholder: 'Tipo de la última evaluación',
    position: 19
  },
  {
    name: 'Última Evaluación - Puntaje',
    key: 'ultima_evaluacion_puntaje',
    dataType: 'NUMBER',
    placeholder: 'Puntaje de la última evaluación',
    position: 20
  },
  {
    name: 'Última Evaluación - Nivel',
    key: 'ultima_evaluacion_nivel',
    dataType: 'TEXT',
    placeholder: 'Nivel de la última evaluación',
    position: 21
  }
];

// Función para obtener custom fields existentes
async function getExistingCustomFields() {
  console.log('📋 Obteniendo custom fields existentes...');
  
  try {
    const response = await fetch(`${BASE_URL}/locations/${LOCATION_ID}/customFields`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener custom fields: ${response.status}`);
    }
    
    const data = await response.json();
    return data.customFields || [];
  } catch (error) {
    console.error('❌ Error al obtener custom fields:', error);
    return [];
  }
}

// Función para crear un custom field
async function createCustomField(field) {
  console.log(`\n📝 Creando campo: ${field.name}`);
  
  const payload = {
    name: field.name,
    dataType: field.dataType,
    placeholder: field.placeholder,
    position: field.position,
    model: 'contact'
  };
  
  // Agregar opciones si es un campo de selección
  if (field.options && (field.dataType === 'SINGLE_OPTIONS' || field.dataType === 'MULTIPLE_OPTIONS')) {
    payload.options = field.options;
  }
  
  try {
    const response = await fetch(`${BASE_URL}/locations/${LOCATION_ID}/customFields`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error(`❌ Error al crear campo ${field.name}:`, response.status, responseText);
      return null;
    }
    
    const data = JSON.parse(responseText);
    console.log(`✅ Campo creado: ${field.name} (ID: ${data.customField.id})`);
    return data.customField;
  } catch (error) {
    console.error(`❌ Error al crear campo ${field.name}:`, error);
    return null;
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando creación de custom fields en GoHighLevel');
  console.log('📍 Location ID:', LOCATION_ID);
  console.log('===============================================\n');
  
  // Obtener campos existentes
  const existingFields = await getExistingCustomFields();
  const existingFieldNames = existingFields.map(f => f.name.toLowerCase());
  
  console.log(`\n📊 Campos existentes: ${existingFields.length}`);
  existingFields.forEach(field => {
    console.log(`  - ${field.name} (${field.dataType})`);
  });
  
  // Combinar todos los campos a crear
  const allFields = [...customFieldsToCreate, ...assessmentFields];
  
  // Filtrar campos que no existen
  const fieldsToCreate = allFields.filter(field => 
    !existingFieldNames.includes(field.name.toLowerCase())
  );
  
  console.log(`\n📝 Campos a crear: ${fieldsToCreate.length}`);
  
  if (fieldsToCreate.length === 0) {
    console.log('✅ Todos los campos ya existen. No hay nada que crear.');
    return;
  }
  
  // Crear campos uno por uno
  const results = {
    created: [],
    failed: []
  };
  
  for (const field of fieldsToCreate) {
    const result = await createCustomField(field);
    
    if (result) {
      results.created.push({
        name: field.name,
        id: result.id,
        key: result.fieldKey
      });
    } else {
      results.failed.push(field.name);
    }
    
    // Esperar un poco entre requests para no sobrecargar la API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Mostrar resumen
  console.log('\n===============================================');
  console.log('📊 RESUMEN DE CREACIÓN DE CAMPOS');
  console.log('===============================================');
  
  if (results.created.length > 0) {
    console.log(`\n✅ Campos creados exitosamente (${results.created.length}):`);
    results.created.forEach(field => {
      console.log(`  - ${field.name}`);
      console.log(`    ID: ${field.id}`);
      console.log(`    Key: ${field.key}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log(`\n❌ Campos que fallaron (${results.failed.length}):`);
    results.failed.forEach(name => {
      console.log(`  - ${name}`);
    });
  }
  
  // Guardar mapeo de IDs
  if (results.created.length > 0) {
    const mapping = {};
    results.created.forEach(field => {
      mapping[field.name] = {
        id: field.id,
        key: field.key
      };
    });
    
    const fs = require('fs').promises;
    await fs.writeFile(
      'ghl-custom-fields-mapping.json',
      JSON.stringify(mapping, null, 2)
    );
    
    console.log('\n📄 Mapeo de campos guardado en: ghl-custom-fields-mapping.json');
  }
}

// Ejecutar script
main().catch(console.error);