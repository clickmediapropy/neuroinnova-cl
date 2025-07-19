import fs from 'fs';

// Configuración de la API de GoHighLevel v2
const config = {
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc',
  locationId: 'Lmk3yMGsLO5NUbaGlZeB',
  baseUrl: 'https://services.leadconnectorhq.com',
  apiVersion: '2021-07-28'
};

// Configuración del modo de ejecución
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// Headers para las peticiones a la API v2
const headers = {
  'Authorization': `Bearer ${config.apiKey}`,
  'Content-Type': 'application/json',
  'Version': config.apiVersion
};

// Mapeo de campos a mover (con nombres exactos como aparecen en la API)
const fieldMoves = {
  "Seguimiento de Formularios": [
    // "Contact Source", // No existe
    // "Contact Type",   // No existe
    "Form Type",
    "Source Page",
    "Message"
  ],
  "Evaluaciones de Salud Mental": [
    "Tipo de Evaluación",
    "Nivel de Severidad",
    "Historial de Evaluaciones",
    "Última Evaluación - Fecha",
    "Última Evaluación - Tipo",
    "Última Evaluación - Puntaje",
    "Última Evaluación - Nivel",
    "PHQ9 - Puntaje Total",
    "Diagnóstico Preliminar"
  ],
  "Datos Clínicos": [
    "Servicio de Interés"
  ]
};

// Campos a eliminar (nombres exactos)
const fieldsToDelete = [
  // "Date Of Birth", // No existe
  "Número de Sesiones",
  "Presupuesto Total",
  "Código Test",
  "Dirección IP"
];

// Campos temporales a eliminar
const tempFieldsToDelete = [
  "Campo Temporal Formularios",
  "Campo Temporal Evaluaciones"
];

// Nuevo campo a crear
const newField = {
  name: "Form Submission Timestamp",
  dataType: "DATE_TIME",
  fieldKey: "contact.form_submission_timestamp",
  placeholder: "Timestamp del envío del formulario",
  folderName: "Seguimiento de Formularios"
};

// Estado para tracking de cambios
const report = {
  startTime: new Date(),
  errors: [],
  successes: [],
  warnings: [],
  backupFile: null,
  summary: {}
};

// Función para hacer peticiones a la API
async function apiRequest(method, endpoint, data = null) {
  const url = `${config.baseUrl}${endpoint}`;
  
  if (VERBOSE) {
    console.log(`\n🔄 ${method} ${url}`);
    if (data) console.log('📤 Data:', JSON.stringify(data, null, 2));
  }

  try {
    const options = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) })
    };

    const response = await fetch(url, options);
    const responseText = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    if (VERBOSE) {
      console.log(`📥 Response Status: ${response.status}`);
      if (responseData) console.log('📥 Response:', JSON.stringify(responseData, null, 2));
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(responseData)}`);
    }

    return responseData;
  } catch (error) {
    console.error(`❌ Error en petición ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

// Función para obtener campos usando diferentes endpoints
async function getCustomFields() {
  // Intentar primero con la API v2
  const v2Endpoints = [
    `/contacts/custom-fields?locationId=${config.locationId}`,
    `/custom-fields?locationId=${config.locationId}`,
    `/locations/${config.locationId}/customFields`
  ];

  for (const endpoint of v2Endpoints) {
    try {
      if (VERBOSE) console.log(`\n🔍 Intentando endpoint v2: ${endpoint}`);
      const response = await apiRequest('GET', endpoint);
      
      if (response && (response.customFields || response.fields || response.data || Array.isArray(response))) {
        console.log('✅ Éxito con endpoint v2:', endpoint);
        return response.customFields || response.fields || response.data || response;
      }
    } catch (error) {
      if (VERBOSE) console.log(`⚠️  Fallo con endpoint: ${endpoint}`);
    }
  }

  // Si falla v2, intentar con v1
  console.log('\n🔍 Usando API v1 como fallback...');
  try {
    const v1Response = await fetch(`https://rest.gohighlevel.com/v1/custom-fields/?locationId=${config.locationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const v1Data = await v1Response.json();
    if (v1Data.customFields) {
      console.log('✅ Éxito con API v1');
      return v1Data.customFields;
    }
  } catch (error) {
    console.log('❌ Error con API v1:', error.message);
  }

  return [];
}

// Función para crear backup
function createBackup(fields) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupData = {
    timestamp: new Date().toISOString(),
    locationId: config.locationId,
    fields,
    totalFields: fields.length
  };
  
  const backupFile = `ghl-backup-${timestamp}.json`;
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  
  console.log(`\n💾 Backup creado: ${backupFile}`);
  report.backupFile = backupFile;
  
  return backupFile;
}

// Función para encontrar un campo por nombre
function findFieldByName(fields, fieldName) {
  return fields.find(f => f.name === fieldName);
}

// Función para crear un campo personalizado
async function createCustomField(fieldData) {
  if (DRY_RUN) {
    console.log(`  🔄 [DRY RUN] Crearía campo "${fieldData.name}"`);
    report.successes.push(`[DRY RUN] Crear campo "${fieldData.name}"`);
    return true;
  }

  try {
    // Preparar datos para la API v2
    const createData = {
      name: fieldData.name,
      dataType: fieldData.dataType,
      fieldKey: fieldData.fieldKey,
      placeholder: fieldData.placeholder || ""
    };

    // Intentar crear con diferentes endpoints
    const createEndpoints = [
      `/contacts/custom-fields`,
      `/custom-fields`,
      `/locations/${config.locationId}/customFields`
    ];

    for (const endpoint of createEndpoints) {
      try {
        await apiRequest('POST', endpoint, createData);
        console.log(`  ✅ Campo "${fieldData.name}" creado exitosamente`);
        report.successes.push(`Campo "${fieldData.name}" creado`);
        return true;
      } catch (error) {
        if (VERBOSE) console.log(`  ⚠️  Fallo creación en ${endpoint}`);
        continue;
      }
    }

    throw new Error('No se pudo crear el campo con ningún endpoint');
  } catch (error) {
    console.error(`  ❌ Error creando campo "${fieldData.name}": ${error.message}`);
    report.errors.push(`Error creando campo "${fieldData.name}": ${error.message}`);
    return false;
  }
}

// Función para eliminar un campo
async function deleteCustomField(field) {
  if (DRY_RUN) {
    console.log(`  🔄 [DRY RUN] Eliminaría campo "${field.name}" (ID: ${field.id})`);
    report.successes.push(`[DRY RUN] Eliminar campo "${field.name}"`);
    return true;
  }

  try {
    // Intentar eliminar con diferentes endpoints
    const deleteEndpoints = [
      `/contacts/custom-fields/${field.id}`,
      `/custom-fields/${field.id}`,
      `/locations/${config.locationId}/customFields/${field.id}`
    ];

    for (const endpoint of deleteEndpoints) {
      try {
        await apiRequest('DELETE', endpoint);
        console.log(`  ✅ Campo "${field.name}" eliminado exitosamente`);
        report.successes.push(`Campo "${field.name}" eliminado`);
        return true;
      } catch (error) {
        if (VERBOSE) console.log(`  ⚠️  Fallo eliminación en ${endpoint}`);
        continue;
      }
    }

    // Si todos fallan, intentar con API v1
    const v1Response = await fetch(`https://rest.gohighlevel.com/v1/custom-fields/${field.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (v1Response.ok) {
      console.log(`  ✅ Campo "${field.name}" eliminado exitosamente (v1 API)`);
      report.successes.push(`Campo "${field.name}" eliminado`);
      return true;
    }

    throw new Error('No se pudo eliminar el campo con ningún endpoint');
  } catch (error) {
    console.error(`  ❌ Error eliminando campo "${field.name}": ${error.message}`);
    report.errors.push(`Error eliminando campo "${field.name}": ${error.message}`);
    return false;
  }
}

// Función para generar reporte final
function generateReport() {
  const endTime = new Date();
  const duration = (endTime - report.startTime) / 1000;
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 REPORTE DE REORGANIZACIÓN DE CAMPOS');
  console.log('='.repeat(60));
  
  if (DRY_RUN) {
    console.log('⚠️  MODO DRY RUN - No se realizaron cambios reales');
  }
  
  console.log(`\n⏱️  Duración: ${duration.toFixed(2)} segundos`);
  console.log(`📅 Fecha: ${endTime.toISOString()}`);
  
  if (report.backupFile) {
    console.log(`\n💾 Backup guardado en: ${report.backupFile}`);
  }
  
  console.log(`\n✅ Operaciones exitosas: ${report.successes.length}`);
  report.successes.forEach(success => console.log(`  - ${success}`));
  
  if (report.warnings.length > 0) {
    console.log(`\n⚠️  Advertencias: ${report.warnings.length}`);
    report.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  if (report.errors.length > 0) {
    console.log(`\n❌ Errores: ${report.errors.length}`);
    report.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n' + '='.repeat(60));
  
  // Guardar reporte
  const reportFile = `ghl-reorganization-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(`\n📄 Reporte completo guardado en: ${reportFile}`);
}

// Función principal
async function main() {
  console.log('🚀 Iniciando reorganización de campos en GoHighLevel');
  console.log(`📍 Location ID: ${config.locationId}`);
  console.log(`🔧 Modo: ${DRY_RUN ? 'DRY RUN' : 'EJECUCIÓN REAL'}`);
  console.log(`📊 API Version: ${config.apiVersion}`);
  
  try {
    // 1. Obtener campos actuales
    console.log('\n📋 Obteniendo campos personalizados...');
    const fields = await getCustomFields();
    
    if (fields.length === 0) {
      throw new Error('No se pudieron obtener campos personalizados');
    }
    
    console.log(`✅ Encontrados ${fields.length} campos`);
    
    // 2. Crear backup
    createBackup(fields);
    
    // 3. Crear nuevo campo
    console.log('\n➕ Creando nuevo campo...');
    const existingTimestamp = findFieldByName(fields, newField.name);
    
    if (existingTimestamp) {
      report.warnings.push(`Campo "${newField.name}" ya existe`);
      console.log(`  ⚠️  Campo "${newField.name}" ya existe`);
    } else {
      await createCustomField(newField);
    }
    
    // 4. Eliminar campos innecesarios
    console.log('\n🗑️  Eliminando campos innecesarios...');
    for (const fieldName of fieldsToDelete) {
      const field = findFieldByName(fields, fieldName);
      
      if (!field) {
        report.warnings.push(`Campo a eliminar "${fieldName}" no encontrado`);
        console.log(`  ⚠️  Campo "${fieldName}" no encontrado`);
        continue;
      }
      
      await deleteCustomField(field);
    }
    
    // 5. Eliminar campos temporales
    console.log('\n🗑️  Eliminando campos temporales...');
    for (const fieldName of tempFieldsToDelete) {
      const field = findFieldByName(fields, fieldName);
      
      if (!field) {
        report.warnings.push(`Campo temporal "${fieldName}" no encontrado`);
        console.log(`  ⚠️  Campo temporal "${fieldName}" no encontrado`);
        continue;
      }
      
      await deleteCustomField(field);
    }
    
    // 6. Nota sobre la reorganización de carpetas
    console.log('\n📁 NOTA SOBRE LA REORGANIZACIÓN DE CARPETAS:');
    console.log('='.repeat(60));
    console.log('La API de GoHighLevel no expone endpoints para manejar carpetas de campos.');
    console.log('Los campos que necesitan ser movidos entre carpetas son:');
    
    Object.entries(fieldMoves).forEach(([folderName, fieldNames]) => {
      console.log(`\n→ Hacia "${folderName}":`);
      fieldNames.forEach(fieldName => {
        const field = findFieldByName(fields, fieldName);
        if (field) {
          console.log(`  • ${fieldName} (ID: ${field.id})`);
        }
      });
    });
    
    console.log('\n⚠️  Deberás mover estos campos manualmente en la interfaz de GoHighLevel.');
    
  } catch (error) {
    console.error('\n❌ Error fatal:', error.message);
    report.errors.push(`Error fatal: ${error.message}`);
  }
  
  // Generar reporte final
  generateReport();
}

// Ejecutar script
main();