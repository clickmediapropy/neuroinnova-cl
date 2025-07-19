// Script para extraer carpetas de custom fields en GoHighLevel

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc';
const LOCATION_ID = 'Lmk3yMGsLO5NUbaGlZeB';

// Headers para la API
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// Función para obtener todas las carpetas
async function getAllFolders() {
  console.log('📁 Obteniendo carpetas de custom fields...\n');
  
  const endpoints = [
    `https://rest.gohighlevel.com/v1/custom-fields/folders?locationId=${LOCATION_ID}`,
    `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/folders`,
    `https://rest.gohighlevel.com/v1/locations/${LOCATION_ID}/customFields/folders`
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Probando: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: headers
      });
      
      console.log(`Status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Endpoint funcionó!\n');
        return data;
      } else {
        const errorText = await response.text();
        console.log(`Error: ${errorText}\n`);
      }
    } catch (error) {
      console.log(`Error de conexión: ${error.message}\n`);
    }
  }
  
  return null;
}

// Función para obtener todos los custom fields
async function getAllCustomFields() {
  try {
    const response = await fetch(`https://rest.gohighlevel.com/v1/custom-fields/?locationId=${LOCATION_ID}`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.customFields || [];
  } catch (error) {
    console.error('❌ Error al obtener custom fields:', error);
    return [];
  }
}

// Función para analizar la estructura
async function analyzeStructure() {
  console.log('🔍 Analizando estructura de carpetas y campos...\n');
  
  // Obtener todos los campos
  const customFields = await getAllCustomFields();
  console.log(`Total de custom fields: ${customFields.length}\n`);
  
  // Agrupar por folder
  const folderStructure = {};
  const noFolder = [];
  
  customFields.forEach(field => {
    // Verificar si el campo tiene información de carpeta
    if (field.folderId || field.folder || field.folderName) {
      const folderId = field.folderId || field.folder || 'unknown';
      if (!folderStructure[folderId]) {
        folderStructure[folderId] = {
          id: folderId,
          name: field.folderName || `Folder ${folderId}`,
          fields: []
        };
      }
      folderStructure[folderId].fields.push(field);
    } else {
      noFolder.push(field);
    }
  });
  
  return { folderStructure, noFolder, customFields };
}

// Función para generar reporte
async function generateReport(folderStructure, noFolder, customFields) {
  const fs = await import('fs');
  
  let content = '# Estructura de Carpetas - Custom Fields GoHighLevel\n\n';
  content += `**Fecha de análisis**: ${new Date().toLocaleString('es-ES')}\n`;
  content += `**Total de custom fields**: ${customFields.length}\n\n`;
  
  // Información de carpetas
  const folderCount = Object.keys(folderStructure).length;
  content += `## 📊 Resumen\n\n`;
  content += `- **Carpetas encontradas**: ${folderCount}\n`;
  content += `- **Campos sin carpeta**: ${noFolder.length}\n\n`;
  
  // Si encontramos carpetas
  if (folderCount > 0) {
    content += '## 📁 Carpetas y sus Campos\n\n';
    
    Object.values(folderStructure).forEach(folder => {
      content += `### 📂 ${folder.name}\n`;
      content += `**ID**: \`${folder.id}\`\n`;
      content += `**Campos**: ${folder.fields.length}\n\n`;
      
      folder.fields.forEach(field => {
        content += `- **${field.name}**\n`;
        content += `  - ID: \`${field.id}\`\n`;
        content += `  - Key: \`${field.fieldKey}\`\n`;
        content += `  - Type: ${field.dataType}\n\n`;
      });
    });
  }
  
  // Campos sin carpeta
  if (noFolder.length > 0) {
    content += '## 📋 Campos Sin Carpeta\n\n';
    content += `*${noFolder.length} campos no están organizados en carpetas*\n\n`;
    
    noFolder.forEach(field => {
      content += `- **${field.name}**\n`;
      content += `  - ID: \`${field.id}\`\n`;
      content += `  - Key: \`${field.fieldKey}\`\n`;
      content += `  - Type: ${field.dataType}\n\n`;
    });
  }
  
  // Análisis adicional
  content += '## 🔍 Análisis de la Estructura Actual\n\n';
  
  // Verificar si los campos tienen información de carpeta en algún formato
  let hasAnyFolderInfo = false;
  customFields.forEach(field => {
    if (field.folderId || field.folder || field.folderName || field.group || field.category) {
      hasAnyFolderInfo = true;
    }
  });
  
  if (!hasAnyFolderInfo) {
    content += '### ⚠️ Observaciones\n\n';
    content += '- **No se encontró información de carpetas en los campos**\n';
    content += '- Esto puede significar:\n';
    content += '  1. Los campos no están organizados en carpetas actualmente\n';
    content += '  2. La API no devuelve información de carpetas en esta versión\n';
    content += '  3. Se requiere un endpoint diferente para obtener esta información\n\n';
    
    content += '### 📝 Recomendaciones\n\n';
    content += '1. Verificar en la interfaz de GoHighLevel si existen carpetas creadas\n';
    content += '2. Si no existen carpetas, crearlas según la organización sugerida\n';
    content += '3. Organizar los campos manualmente en las carpetas correspondientes\n\n';
  }
  
  // Guardar reporte
  fs.writeFileSync('ghl-folders-analysis.md', content);
  console.log('✅ Reporte generado: ghl-folders-analysis.md');
}

// Debug: Mostrar estructura completa de un campo
function debugFieldStructure(customFields) {
  if (customFields.length > 0) {
    console.log('\n🔍 Estructura completa de un campo de ejemplo:');
    console.log(JSON.stringify(customFields[0], null, 2));
    console.log('\n');
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando análisis de carpetas de Custom Fields\n');
  
  // Intentar obtener carpetas directamente
  const foldersData = await getAllFolders();
  
  if (foldersData) {
    console.log('Datos de carpetas obtenidos:', JSON.stringify(foldersData, null, 2));
  }
  
  // Analizar estructura de campos
  const { folderStructure, noFolder, customFields } = await analyzeStructure();
  
  // Debug: mostrar estructura de un campo
  debugFieldStructure(customFields);
  
  // Generar reporte
  await generateReport(folderStructure, noFolder, customFields);
  
  console.log('\n📊 Análisis completado');
}

// Ejecutar
main().catch(console.error);