const fs = require('fs');

// Configuración de la API de GoHighLevel
const config = {
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc',
  locationId: 'Lmk3yMGsLO5NUbaGlZeB',
  baseUrl: 'https://services.leadconnectorhq.com'
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
  
  console.log(`\n🔄 ${method} ${url}`);

  try {
    const options = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) })
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(responseData)}`);
    }

    return responseData;
  } catch (error) {
    console.error(`❌ Error en petición ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

// Función principal de análisis
async function analyzeCurrentState() {
  console.log('🔍 ANÁLISIS DEL ESTADO ACTUAL DE CAMPOS EN GOHIGHLEVEL');
  console.log('='.repeat(60));
  console.log(`📍 Location ID: ${config.locationId}`);
  console.log(`📅 Fecha: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  try {
    // 1. Obtener todas las carpetas
    console.log('\n📁 OBTENIENDO CARPETAS...');
    const foldersResponse = await apiRequest('GET', `/locations/${config.locationId}/custom-field-folders`);
    const folders = foldersResponse.folders || [];
    
    console.log(`\n✅ Encontradas ${folders.length} carpetas:`);
    console.log('\n┌─────────────────────────────────────────────────────────────┐');
    console.log('│ CARPETAS DISPONIBLES                                        │');
    console.log('├─────────────────────────────────────────────────────────────┤');
    folders.forEach((folder, index) => {
      console.log(`│ ${index + 1}. ${folder.name.padEnd(40)} │ ID: ${folder.id} │`);
    });
    console.log('└─────────────────────────────────────────────────────────────┘');

    // 2. Obtener todos los campos personalizados
    console.log('\n📋 OBTENIENDO CAMPOS PERSONALIZADOS...');
    const fieldsResponse = await apiRequest('GET', `/locations/${config.locationId}/custom-fields`);
    const fields = fieldsResponse.customFields || [];
    
    console.log(`\n✅ Encontrados ${fields.length} campos personalizados`);

    // 3. Organizar campos por carpeta
    const fieldsByFolder = {};
    const fieldsWithoutFolder = [];

    fields.forEach(field => {
      if (field.folderId) {
        const folder = folders.find(f => f.id === field.folderId);
        const folderName = folder ? folder.name : `Carpeta Desconocida (${field.folderId})`;
        
        if (!fieldsByFolder[folderName]) {
          fieldsByFolder[folderName] = [];
        }
        fieldsByFolder[folderName].push(field);
      } else {
        fieldsWithoutFolder.push(field);
      }
    });

    // 4. Mostrar campos organizados por carpeta
    console.log('\n📊 CAMPOS ORGANIZADOS POR CARPETA:');
    console.log('='.repeat(60));

    Object.entries(fieldsByFolder).forEach(([folderName, folderFields]) => {
      console.log(`\n📁 ${folderName} (${folderFields.length} campos)`);
      console.log('-'.repeat(60));
      folderFields.forEach(field => {
        console.log(`  • ${field.name}`);
        console.log(`    - ID: ${field.id}`);
        console.log(`    - Key: ${field.fieldKey}`);
        console.log(`    - Tipo: ${field.dataType}`);
      });
    });

    if (fieldsWithoutFolder.length > 0) {
      console.log(`\n❓ CAMPOS SIN CARPETA (${fieldsWithoutFolder.length} campos)`);
      console.log('-'.repeat(60));
      fieldsWithoutFolder.forEach(field => {
        console.log(`  • ${field.name}`);
        console.log(`    - ID: ${field.id}`);
        console.log(`    - Key: ${field.fieldKey}`);
        console.log(`    - Tipo: ${field.dataType}`);
      });
    }

    // 5. Análisis de campos a mover según el plan
    console.log('\n\n🎯 ANÁLISIS DEL PLAN DE REORGANIZACIÓN:');
    console.log('='.repeat(60));

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

    console.log('\n📦 CAMPOS A MOVER:');
    Object.entries(fieldMoves).forEach(([targetFolder, fieldNames]) => {
      console.log(`\n→ Hacia "${targetFolder}":`);
      
      const folderExists = folders.some(f => f.name === targetFolder);
      if (!folderExists) {
        console.log(`  ⚠️  ADVERTENCIA: La carpeta "${targetFolder}" NO EXISTE`);
      }
      
      fieldNames.forEach(fieldName => {
        const field = fields.find(f => f.name === fieldName);
        if (field) {
          const currentFolder = field.folderId ? 
            folders.find(f => f.id === field.folderId)?.name || 'Carpeta Desconocida' : 
            'Sin Carpeta';
          console.log(`  ✓ ${fieldName} (actualmente en: ${currentFolder})`);
        } else {
          console.log(`  ✗ ${fieldName} - NO ENCONTRADO`);
        }
      });
    });

    // 6. Campos a eliminar
    const fieldsToDelete = [
      "Date Of Birth",
      "Número De Sesiones",
      "Presupuesto Total",
      "Código Test",
      "Dirección IP"
    ];

    console.log('\n\n🗑️  CAMPOS A ELIMINAR:');
    fieldsToDelete.forEach(fieldName => {
      const field = fields.find(f => f.name === fieldName);
      if (field) {
        console.log(`  ✓ ${fieldName} - EXISTE (ID: ${field.id})`);
      } else {
        console.log(`  ✗ ${fieldName} - NO ENCONTRADO`);
      }
    });

    // 7. Campos temporales a eliminar
    const tempFieldsToDelete = [
      "Campo Temporal Formularios",
      "Campo Temporal Evaluaciones"
    ];

    console.log('\n\n🗑️  CAMPOS TEMPORALES A ELIMINAR:');
    tempFieldsToDelete.forEach(fieldName => {
      const field = fields.find(f => f.name === fieldName);
      if (field) {
        console.log(`  ✓ ${fieldName} - EXISTE (ID: ${field.id})`);
      } else {
        console.log(`  ✗ ${fieldName} - NO ENCONTRADO`);
      }
    });

    // 8. Campo nuevo a crear
    console.log('\n\n➕ CAMPO NUEVO A CREAR:');
    console.log(`  • Nombre: Form Submission Timestamp`);
    console.log(`  • Tipo: DATE_TIME`);
    console.log(`  • Key: contact.form_timestamp`);
    console.log(`  • Carpeta destino: Seguimiento de Formularios`);
    
    const targetFolderExists = folders.some(f => f.name === "Seguimiento de Formularios");
    if (!targetFolderExists) {
      console.log(`  ⚠️  ADVERTENCIA: La carpeta destino NO EXISTE`);
    }

    // 9. Resumen
    console.log('\n\n📊 RESUMEN:');
    console.log('='.repeat(60));
    console.log(`Total de carpetas: ${folders.length}`);
    console.log(`Total de campos: ${fields.length}`);
    console.log(`Campos sin carpeta: ${fieldsWithoutFolder.length}`);
    
    const camposAMover = Object.values(fieldMoves).flat().length;
    const camposAEliminar = fieldsToDelete.length + tempFieldsToDelete.length;
    console.log(`\nOperaciones planeadas:`);
    console.log(`  • Campos a mover: ${camposAMover}`);
    console.log(`  • Campos a eliminar: ${camposAEliminar}`);
    console.log(`  • Campos a crear: 1`);

    // Guardar análisis completo
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const analysisData = {
      timestamp: new Date().toISOString(),
      locationId: config.locationId,
      folders,
      fields,
      fieldsByFolder,
      fieldsWithoutFolder,
      plannedOperations: {
        moves: fieldMoves,
        deletes: fieldsToDelete,
        tempDeletes: tempFieldsToDelete,
        creates: [{
          name: "Form Submission Timestamp",
          dataType: "DATE_TIME",
          fieldKey: "contact.form_timestamp",
          targetFolder: "Seguimiento de Formularios"
        }]
      }
    };

    const filename = `ghl-analysis-${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(analysisData, null, 2));
    console.log(`\n\n💾 Análisis completo guardado en: ${filename}`);

  } catch (error) {
    console.error('\n❌ Error durante el análisis:', error.message);
  }
}

// Ejecutar análisis
console.log('🚀 Iniciando análisis del estado actual en GoHighLevel...\n');
analyzeCurrentState();