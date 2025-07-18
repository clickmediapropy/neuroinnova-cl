// GoHighLevel Custom Fields API Script
// Reemplaza YOUR_API_KEY con tu API key válido

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkxtazN5TUdzTE81TlViYUdsWmVCIiwidmVyc2lvbiI6MSwiaWF0IjoxNzUyODEwNTE0MDM3LCJzdWIiOiJwZm1UNDJFNU8xMVNFYno1M3VKcyJ9.Rurx7_B0q6_hs6RKR7CP_I1xSiyZpF-9veoVMAxJcjc'; // Tu JWT token
const LOCATION_ID = 'Lmk3yMGsLO5NUbaGlZeB'; // Tu Location ID
const BASE_URL = 'https://rest.gohighlevel.com/v1';

// Headers comunes
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28'
};

// 1. Obtener todos los Custom Fields
async function getCustomFields() {
  try {
    const response = await fetch(`${BASE_URL}/custom-fields`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Custom Fields:', data);
    return data;
  } catch (error) {
    console.error('Error getting custom fields:', error);
  }
}

// 2. Crear un nuevo Custom Field
async function createCustomField(fieldData) {
  try {
    const response = await fetch(`${BASE_URL}/custom-fields`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(fieldData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Custom Field created:', data);
    return data;
  } catch (error) {
    console.error('Error creating custom field:', error);
  }
}

// 3. Modificar un Custom Field existente
async function updateCustomField(fieldId, fieldData) {
  try {
    const response = await fetch(`${BASE_URL}/custom-fields/${fieldId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(fieldData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Custom Field updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating custom field:', error);
  }
}

// 4. Eliminar un Custom Field
async function deleteCustomField(fieldId) {
  try {
    const response = await fetch(`${BASE_URL}/custom-fields/${fieldId}`, {
      method: 'DELETE',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log('Custom Field deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting custom field:', error);
  }
}

// Campos personalizados para el formulario de contacto
const customFields = [
  {
    name: 'Servicio de Interés',
    dataType: 'TEXT',
    placeholder: 'Servicio de interés del formulario de contacto',
    position: 750
  },
  {
    name: 'Source Page',
    dataType: 'TEXT',
    placeholder: 'Página de origen del formulario',
    position: 800
  },
  {
    name: 'Form Type',
    dataType: 'TEXT',
    placeholder: 'Tipo de formulario (contacto, evaluación, etc.)',
    position: 850
  }
];

// Función principal para crear todos los campos
async function main() {
  console.log('=== GoHighLevel Custom Fields API ===');
  console.log(`Location ID: ${LOCATION_ID}`);
  console.log(`API Key: ${API_KEY.substring(0, 20)}...`);
  
  // 1. Primero obtener campos existentes para verificar
  console.log('\n1. Obteniendo Custom Fields existentes...');
  const existingFields = await getCustomFields();
  
  if (existingFields) {
    console.log(`\nTotal de campos existentes: ${existingFields.length || 0}`);
    if (existingFields.customFields && Array.isArray(existingFields.customFields)) {
      console.log('Campos existentes:');
      existingFields.customFields.forEach(field => {
        console.log(`- ${field.name} (${field.dataType}) - Key: ${field.fieldKey}`);
      });
    }
  }
  
  // 2. Crear los nuevos campos
  console.log('\n2. Creando nuevos Custom Fields...\n');
  
  for (const field of customFields) {
    console.log(`Creando campo: ${field.name} (${field.dataType})`);
    console.log(`Placeholder: ${field.placeholder}`);
    
    try {
      const result = await createCustomField(field);
      if (result) {
        console.log(`✓ Campo "${field.name}" creado exitosamente`);
        console.log(`  Field Key: ${result.fieldKey || 'N/A'}\n`);
      } else {
        console.log(`✗ Error al crear campo "${field.name}"\n`);
      }
    } catch (error) {
      console.error(`✗ Error al crear campo "${field.name}":`, error.message, '\n');
    }
    
    // Pequeña pausa entre solicitudes para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n=== Proceso completado ===');
  
  // 3. Verificar campos creados
  console.log('\n3. Verificando campos creados...');
  const updatedFields = await getCustomFields();
  
  if (updatedFields && updatedFields.customFields) {
    console.log(`\nTotal de campos después de la creación: ${updatedFields.customFields.length || 0}`);
  }
}

// Ejecutar el script
main().catch(error => {
  console.error('Error en la ejecución:', error);
}); 