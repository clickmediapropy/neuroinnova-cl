import fs from 'fs';

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
    const responseText = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    console.log(`📥 Response Status: ${response.status}`);
    
    if (!response.ok) {
      console.error(`❌ API Error Response:`, responseData);
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
    // Primero intentemos obtener los campos personalizados
    console.log('\n📋 OBTENIENDO CAMPOS PERSONALIZADOS...');
    
    // Intentar diferentes endpoints para campos personalizados
    const endpoints = [
      `/locations/${config.locationId}/customFields`,
      `/locations/${config.locationId}/custom-fields`,
      `/custom-fields?locationId=${config.locationId}`,
      `/v2/locations/${config.locationId}/customFields`
    ];
    
    let fields = [];
    let successfulEndpoint = null;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`\n🔍 Intentando endpoint: ${endpoint}`);
        const response = await apiRequest('GET', endpoint);
        
        // Manejar diferentes formatos de respuesta
        if (Array.isArray(response)) {
          fields = response;
        } else if (response.customFields) {
          fields = response.customFields;
        } else if (response.data) {
          fields = response.data;
        } else if (response.fields) {
          fields = response.fields;
        }
        
        if (fields.length > 0) {
          successfulEndpoint = endpoint;
          console.log(`✅ Éxito con endpoint: ${endpoint}`);
          break;
        }
      } catch (error) {
        console.log(`⚠️  Fallo con endpoint: ${endpoint}`);
        continue;
      }
    }
    
    if (fields.length === 0 && !successfulEndpoint) {
      // Intentar con la API v1
      console.log('\n🔍 Intentando con API v1...');
      try {
        const v1Headers = {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        };
        
        const v1Response = await fetch(`https://rest.gohighlevel.com/v1/custom-fields/?locationId=${config.locationId}`, {
          method: 'GET',
          headers: v1Headers
        });
        
        const v1Data = await v1Response.json();
        console.log('Respuesta API v1:', v1Data);
        
        if (v1Data.customFields) {
          fields = v1Data.customFields;
        }
      } catch (error) {
        console.log('⚠️  Error con API v1:', error.message);
      }
    }
    
    console.log(`\n✅ Encontrados ${fields.length} campos personalizados`);
    
    if (fields.length === 0) {
      console.log('\n⚠️  No se encontraron campos. Posibles razones:');
      console.log('  - El token de API no tiene permisos suficientes');
      console.log('  - El location ID es incorrecto');
      console.log('  - La cuenta no tiene campos personalizados creados');
      return;
    }

    // Mostrar todos los campos encontrados
    console.log('\n📊 CAMPOS ENCONTRADOS:');
    console.log('='.repeat(80));
    
    fields.forEach((field, index) => {
      console.log(`\n${index + 1}. ${field.name || field.fieldName || 'Sin nombre'}`);
      console.log(`   - ID: ${field.id || field._id || 'N/A'}`);
      console.log(`   - Key: ${field.fieldKey || field.key || 'N/A'}`);
      console.log(`   - Tipo: ${field.dataType || field.type || 'N/A'}`);
      if (field.folderId || field.folder) {
        console.log(`   - Carpeta ID: ${field.folderId || field.folder}`);
      }
      if (field.placeholder) {
        console.log(`   - Placeholder: ${field.placeholder}`);
      }
    });

    // Análisis de campos según el plan
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
        "Última Evaluación - Nivel",
        "PHQ9 - Puntaje Total",
        "Diagnóstico Preliminar"
      ],
      "Datos Clínicos": [
        "Servicio De Interés"
      ]
    };

    console.log('\n📦 CAMPOS A MOVER:');
    Object.entries(fieldMoves).forEach(([targetFolder, fieldNames]) => {
      console.log(`\n→ Hacia "${targetFolder}":`);
      
      fieldNames.forEach(fieldName => {
        const field = fields.find(f => 
          (f.name && f.name === fieldName) || 
          (f.fieldName && f.fieldName === fieldName)
        );
        if (field) {
          console.log(`  ✓ ${fieldName} - ENCONTRADO (ID: ${field.id || field._id})`);
        } else {
          console.log(`  ✗ ${fieldName} - NO ENCONTRADO`);
        }
      });
    });

    // Campos a eliminar
    const fieldsToDelete = [
      "Date Of Birth",
      "Número De Sesiones",
      "Presupuesto Total",
      "Código Test",
      "Dirección IP"
    ];

    console.log('\n\n🗑️  CAMPOS A ELIMINAR:');
    fieldsToDelete.forEach(fieldName => {
      const field = fields.find(f => 
        (f.name && f.name === fieldName) || 
        (f.fieldName && f.fieldName === fieldName)
      );
      if (field) {
        console.log(`  ✓ ${fieldName} - EXISTE (ID: ${field.id || field._id})`);
      } else {
        console.log(`  ✗ ${fieldName} - NO ENCONTRADO`);
      }
    });

    // Campos temporales a eliminar
    const tempFieldsToDelete = [
      "Campo Temporal Formularios",
      "Campo Temporal Evaluaciones"
    ];

    console.log('\n\n🗑️  CAMPOS TEMPORALES A ELIMINAR:');
    tempFieldsToDelete.forEach(fieldName => {
      const field = fields.find(f => 
        (f.name && f.name === fieldName) || 
        (f.fieldName && f.fieldName === fieldName)
      );
      if (field) {
        console.log(`  ✓ ${fieldName} - EXISTE (ID: ${field.id || field._id})`);
      } else {
        console.log(`  ✗ ${fieldName} - NO ENCONTRADO`);
      }
    });

    // Campo nuevo a crear
    console.log('\n\n➕ CAMPO NUEVO A CREAR:');
    console.log(`  • Nombre: Form Submission Timestamp`);
    console.log(`  • Tipo: DATE_TIME`);
    console.log(`  • Key: contact.form_timestamp`);
    console.log(`  • Carpeta destino: Seguimiento de Formularios`);

    // Verificar si el campo ya existe
    const existingTimestampField = fields.find(f => 
      (f.fieldKey && f.fieldKey === 'contact.form_timestamp') ||
      (f.key && f.key === 'contact.form_timestamp')
    );
    
    if (existingTimestampField) {
      console.log(`  ⚠️  ADVERTENCIA: Este campo ya existe con ID: ${existingTimestampField.id || existingTimestampField._id}`);
    }

    // Resumen
    console.log('\n\n📊 RESUMEN:');
    console.log('='.repeat(60));
    console.log(`Total de campos encontrados: ${fields.length}`);
    
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
      successfulEndpoint,
      fields,
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

    const filename = `ghl-analysis-v2-${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(analysisData, null, 2));
    console.log(`\n\n💾 Análisis completo guardado en: ${filename}`);

    // Nota sobre las carpetas
    console.log('\n\n📁 NOTA SOBRE LAS CARPETAS:');
    console.log('='.repeat(60));
    console.log('La API de GoHighLevel puede no exponer directamente la información de carpetas.');
    console.log('Es posible que necesites:');
    console.log('1. Verificar manualmente en la interfaz web las carpetas existentes');
    console.log('2. Usar un endpoint diferente o versión de API para acceder a las carpetas');
    console.log('3. Los campos pueden tener un campo "folderId" o similar que indique su carpeta');

  } catch (error) {
    console.error('\n❌ Error durante el análisis:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Ejecutar análisis
console.log('🚀 Iniciando análisis del estado actual en GoHighLevel (v2)...\n');
analyzeCurrentState();