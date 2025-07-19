// Script para extraer y analizar custom fields de GoHighLevel

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc';
const LOCATION_ID = 'Lmk3yMGsLO5NUbaGlZeB';

// Headers para la API
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// Función para obtener todos los custom fields
async function getAllCustomFields() {
  console.log('📋 Obteniendo todos los custom fields de GoHighLevel...\n');
  
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

// Función para analizar duplicados
function findDuplicates(fields) {
  const nameGroups = {};
  const duplicates = [];
  
  // Agrupar por nombre (case insensitive)
  fields.forEach(field => {
    const normalizedName = field.name.toLowerCase().trim();
    if (!nameGroups[normalizedName]) {
      nameGroups[normalizedName] = [];
    }
    nameGroups[normalizedName].push(field);
  });
  
  // Identificar duplicados
  Object.entries(nameGroups).forEach(([name, group]) => {
    if (group.length > 1) {
      duplicates.push({
        name: group[0].name,
        count: group.length,
        fields: group
      });
    }
  });
  
  return duplicates;
}

// Función para categorizar campos
function categorizeFields(fields) {
  const categories = {
    'Información de Contacto': {
      keywords: ['nombre', 'apellido', 'phone', 'email', 'teléfono', 'correo', 'ciudad', 'dirección', 'whatsapp'],
      fields: []
    },
    'Evaluaciones y Diagnósticos': {
      keywords: ['evaluación', 'diagnóstico', 'score', 'puntaje', 'phq', 'gad', 'test', 'severidad', 'resultado'],
      fields: []
    },
    'Servicios e Intereses': {
      keywords: ['servicio', 'interés', 'tratamiento', 'consulta', 'motivo'],
      fields: []
    },
    'Tracking y Analytics': {
      keywords: ['source', 'origen', 'utm', 'campaign', 'referrer', 'página', 'form', 'type', 'timestamp'],
      fields: []
    },
    'Datos Demográficos': {
      keywords: ['edad', 'sexo', 'género', 'fecha nacimiento', 'cumpleaños'],
      fields: []
    },
    'Historial y Seguimiento': {
      keywords: ['historial', 'última', 'anterior', 'seguimiento', 'nota', 'observación'],
      fields: []
    },
    'Consentimientos y Legal': {
      keywords: ['términos', 'condiciones', 'consentimiento', 'autorización', 'privacidad'],
      fields: []
    },
    'Otros': {
      keywords: [],
      fields: []
    }
  };
  
  // Categorizar cada campo
  fields.forEach(field => {
    let categorized = false;
    const fieldNameLower = field.name.toLowerCase();
    
    for (const [category, data] of Object.entries(categories)) {
      if (category === 'Otros') continue;
      
      for (const keyword of data.keywords) {
        if (fieldNameLower.includes(keyword)) {
          categories[category].fields.push(field);
          categorized = true;
          break;
        }
      }
      if (categorized) break;
    }
    
    if (!categorized) {
      categories['Otros'].fields.push(field);
    }
  });
  
  return categories;
}

// Función para generar el documento MD
async function generateMarkdown(fields, duplicates, categories) {
  const fs = await import('fs');
  
  let content = '# Análisis de Custom Fields - GoHighLevel\n\n';
  content += `**Fecha de análisis**: ${new Date().toLocaleString('es-ES')}\n`;
  content += `**Total de custom fields**: ${fields.length}\n`;
  content += `**Campos duplicados encontrados**: ${duplicates.length}\n\n`;
  
  // Sección de duplicados
  content += '## 🔴 Campos Duplicados (Recomendado Eliminar)\n\n';
  if (duplicates.length === 0) {
    content += '*No se encontraron campos duplicados.*\n\n';
  } else {
    duplicates.forEach(dup => {
      content += `### "${dup.name}" (${dup.count} instancias)\n\n`;
      dup.fields.forEach((field, index) => {
        content += `${index + 1}. **ID**: ${field.id}\n`;
        content += `   - **Field Key**: ${field.fieldKey}\n`;
        content += `   - **Data Type**: ${field.dataType}\n`;
        if (field.placeholder) content += `   - **Placeholder**: ${field.placeholder}\n`;
        content += `   - **Recomendación**: ${index === 0 ? '✅ Mantener este' : '❌ Eliminar'}\n\n`;
      });
    });
  }
  
  // Sección de organización por carpetas
  content += '## 📁 Organización Sugerida por Carpetas\n\n';
  
  Object.entries(categories).forEach(([categoryName, data]) => {
    if (data.fields.length === 0) return;
    
    content += `### 📂 ${categoryName}\n`;
    content += `*${data.fields.length} campos*\n\n`;
    
    data.fields.forEach(field => {
      content += `- **${field.name}**\n`;
      content += `  - ID: \`${field.id}\`\n`;
      content += `  - Key: \`${field.fieldKey}\`\n`;
      content += `  - Type: ${field.dataType}\n`;
      if (field.options && field.options.length > 0) {
        content += `  - Options: ${field.options.join(', ')}\n`;
      }
      content += '\n';
    });
  });
  
  // Sección de todos los campos (para referencia)
  content += '## 📋 Lista Completa de Custom Fields\n\n';
  content += '| Nombre | ID | Field Key | Data Type | Placeholder |\n';
  content += '|--------|----|-----------|-----------|--------------|\n';
  
  fields.forEach(field => {
    content += `| ${field.name} | \`${field.id}\` | \`${field.fieldKey}\` | ${field.dataType} | ${field.placeholder || '-'} |\n`;
  });
  
  // Recomendaciones
  content += '\n## 💡 Recomendaciones\n\n';
  content += '1. **Eliminar duplicados**: Mantener solo una instancia de cada campo duplicado\n';
  content += '2. **Usar nomenclatura consistente**: Considerar renombrar campos para mantener consistencia\n';
  content += '3. **Agrupar por carpetas**: Organizar los campos en las carpetas sugeridas para mejor gestión\n';
  content += '4. **Documentar el propósito**: Agregar descripciones claras a cada campo\n\n';
  
  // Guardar el archivo
  fs.writeFileSync('ghl-custom-fields-analysis.md', content);
  console.log('✅ Documento generado: ghl-custom-fields-analysis.md');
}

// Función principal
async function main() {
  console.log('🚀 Iniciando análisis de Custom Fields\n');
  
  // Obtener todos los campos
  const fields = await getAllCustomFields();
  
  if (fields.length === 0) {
    console.log('❌ No se pudieron obtener los custom fields');
    return;
  }
  
  console.log(`✅ Se encontraron ${fields.length} custom fields\n`);
  
  // Analizar duplicados
  const duplicates = findDuplicates(fields);
  console.log(`🔍 Duplicados encontrados: ${duplicates.length}\n`);
  
  // Categorizar campos
  const categories = categorizeFields(fields);
  
  // Generar documento
  await generateMarkdown(fields, duplicates, categories);
  
  console.log('\n📊 Análisis completado exitosamente');
}

// Ejecutar
main().catch(console.error);