const fs = require('fs');
const path = require('path');

// Configuración de la API de GoHighLevel
const config = {
  apiKey: process.env.GHL_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc',
  locationId: process.env.GHL_LOCATION_ID || 'Lmk3yMGsLO5NUbaGlZeB',
  baseUrl: 'https://services.leadconnectorhq.com'
};

// Configuración del modo de ejecución
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// Mapeo de campos a mover entre carpetas
const fieldMoves = {
  "Seguimiento de Formularios": [
    "Contact Source",
    "Contact Type", 
    "Form Type",
    "Source Page",
    "Message"
  ],
  "Evaluaciones de Salud Mental": [
    "Tipo De Evaluación",
    "Nivel De Severidad",
    "Historial De Evaluaciones",
    "Última Evaluación - Fecha",
    "Última Evaluación - Tipo",
    "Última Evaluación - Puntaje",
    "Última Evaluación - Nivel"
  ],
  "Datos Clínicos": [
    "Servicio De Interés"
  ]
};

// Campos a eliminar
const fieldsToDelete = [
  "Date Of Birth",
  "Número De Sesiones",
  "Presupuesto Total",
  "Código Test",
  "Dirección IP"
];

// Campos temporales a eliminar al final
const tempFieldsToDelete = [
  "Campo Temporal Formularios",
  "Campo Temporal Evaluaciones"
];

// Nuevo campo a crear
const newField = {
  name: "Form Submission Timestamp",
  dataType: "DATE_TIME",
  fieldKey: "contact.form_timestamp",
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

// Headers para las peticiones a la API
const headers = {
  'Authorization': `Bearer ${config.apiKey}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
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
    const responseData = await response.json();

    if (VERBOSE) {
      console.log(`📥 Response Status: ${response.status}`);
      console.log('📥 Response:', JSON.stringify(responseData, null, 2));
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

// Función para obtener todas las carpetas
async function getAllFolders() {
  console.log('\n📁 Obteniendo carpetas...');
  try {
    const response = await apiRequest('GET', `/locations/${config.locationId}/custom-field-folders`);
    const folders = response.folders || [];
    
    console.log(`✅ Encontradas ${folders.length} carpetas:`);
    folders.forEach(folder => {
      console.log(`  - ${folder.name} (ID: ${folder.id})`);
    });
    
    return folders;
  } catch (error) {
    report.errors.push(`Error obteniendo carpetas: ${error.message}`);
    return [];
  }
}

// Función para obtener todos los campos personalizados
async function getAllCustomFields() {
  console.log('\n📋 Obteniendo campos personalizados...');
  try {
    const response = await apiRequest('GET', `/locations/${config.locationId}/custom-fields`);
    const fields = response.customFields || [];
    
    console.log(`✅ Encontrados ${fields.length} campos personalizados`);
    
    return fields;
  } catch (error) {
    report.errors.push(`Error obteniendo campos: ${error.message}`);
    return [];
  }
}

// Función para crear backup del estado actual
function createBackup(folders, fields) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupData = {
    timestamp: new Date().toISOString(),
    folders,
    fields,
    locationId: config.locationId
  };
  
  const backupFile = `ghl-backup-${timestamp}.json`;
  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  
  console.log(`\n💾 Backup creado: ${backupFile}`);
  report.backupFile = backupFile;
  
  return backupFile;
}

// Función para encontrar el ID de una carpeta por nombre
function findFolderId(folders, folderName) {
  const folder = folders.find(f => f.name === folderName);
  return folder ? folder.id : null;
}

// Función para encontrar un campo por nombre
function findFieldByName(fields, fieldName) {
  return fields.find(f => f.name === fieldName);
}

// Función para mover un campo a una carpeta
async function moveFieldToFolder(field, folderId, folderName) {
  if (DRY_RUN) {
    console.log(`  🔄 [DRY RUN] Movería "${field.name}" a carpeta "${folderName}"`);
    report.successes.push(`[DRY RUN] Mover campo "${field.name}" a "${folderName}"`);
    return true;
  }

  try {
    const updateData = {
      id: field.id,
      name: field.name,
      dataType: field.dataType,
      fieldKey: field.fieldKey,
      placeholder: field.placeholder || '',
      folderId: folderId
    };

    await apiRequest('PUT', `/locations/${config.locationId}/custom-fields/${field.id}`, updateData);
    
    console.log(`  ✅ Campo "${field.name}" movido a carpeta "${folderName}"`);
    report.successes.push(`Campo "${field.name}" movido a "${folderName}"`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error moviendo campo "${field.name}": ${error.message}`);
    report.errors.push(`Error moviendo campo "${field.name}": ${error.message}`);
    return false;
  }
}

// Función para crear un nuevo campo
async function createCustomField(fieldData, folderId) {
  if (DRY_RUN) {
    console.log(`  🔄 [DRY RUN] Crearía campo "${fieldData.name}" en carpeta "${fieldData.folderName}"`);
    report.successes.push(`[DRY RUN] Crear campo "${fieldData.name}"`);
    return true;
  }

  try {
    const createData = {
      name: fieldData.name,
      dataType: fieldData.dataType,
      fieldKey: fieldData.fieldKey,
      placeholder: fieldData.placeholder,
      folderId: folderId
    };

    await apiRequest('POST', `/locations/${config.locationId}/custom-fields`, createData);
    
    console.log(`  ✅ Campo "${fieldData.name}" creado en carpeta "${fieldData.folderName}"`);
    report.successes.push(`Campo "${fieldData.name}" creado en "${fieldData.folderName}"`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error creando campo "${fieldData.name}": ${error.message}`);
    report.errors.push(`Error creando campo "${fieldData.name}": ${error.message}`);
    return false;
  }
}

// Función para eliminar un campo
async function deleteCustomField(field) {
  if (DRY_RUN) {
    console.log(`  🔄 [DRY RUN] Eliminaría campo "${field.name}"`);
    report.successes.push(`[DRY RUN] Eliminar campo "${field.name}"`);
    return true;
  }

  try {
    await apiRequest('DELETE', `/locations/${config.locationId}/custom-fields/${field.id}`);
    
    console.log(`  ✅ Campo "${field.name}" eliminado`);
    report.successes.push(`Campo "${field.name}" eliminado`);
    return true;
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
  
  // Validar configuración
  if (!config.apiKey || !config.locationId) {
    console.error('\n❌ Error: Debes configurar GHL_API_KEY y GHL_LOCATION_ID');
    console.log('\nUso:');
    console.log('  export GHL_API_KEY="tu-api-key"');
    console.log('  export GHL_LOCATION_ID="tu-location-id"');
    console.log('  node reorganize-ghl-fields.js [--dry-run] [--verbose]');
    process.exit(1);
  }
  
  try {
    // 1. Obtener carpetas y campos actuales
    const folders = await getAllFolders();
    const fields = await getAllCustomFields();
    
    if (folders.length === 0 || fields.length === 0) {
      throw new Error('No se pudieron obtener carpetas o campos');
    }
    
    // 2. Crear backup
    createBackup(folders, fields);
    
    // 3. Mover campos entre carpetas
    console.log('\n📦 Moviendo campos entre carpetas...');
    for (const [folderName, fieldNames] of Object.entries(fieldMoves)) {
      const folderId = findFolderId(folders, folderName);
      
      if (!folderId) {
        report.warnings.push(`Carpeta "${folderName}" no encontrada - saltando campos`);
        console.log(`\n⚠️  Carpeta "${folderName}" no encontrada`);
        continue;
      }
      
      console.log(`\n📁 Procesando carpeta "${folderName}":`);
      
      for (const fieldName of fieldNames) {
        const field = findFieldByName(fields, fieldName);
        
        if (!field) {
          report.warnings.push(`Campo "${fieldName}" no encontrado`);
          console.log(`  ⚠️  Campo "${fieldName}" no encontrado`);
          continue;
        }
        
        await moveFieldToFolder(field, folderId, folderName);
      }
    }
    
    // 4. Crear nuevo campo
    console.log('\n➕ Creando nuevo campo...');
    const folderIdForNewField = findFolderId(folders, newField.folderName);
    
    if (folderIdForNewField) {
      await createCustomField(newField, folderIdForNewField);
    } else {
      report.warnings.push(`Carpeta "${newField.folderName}" no encontrada para nuevo campo`);
      console.log(`⚠️  Carpeta "${newField.folderName}" no encontrada`);
    }
    
    // 5. Eliminar campos innecesarios
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
    
    // 6. Eliminar campos temporales
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
    
  } catch (error) {
    console.error('\n❌ Error fatal:', error.message);
    report.errors.push(`Error fatal: ${error.message}`);
  }
  
  // Generar reporte final
  generateReport();
}

// Ejecutar script
main();