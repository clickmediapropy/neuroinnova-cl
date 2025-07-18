// GoHighLevel Custom Fields API Script
// Reemplaza YOUR_API_KEY con tu API key válido

const API_KEY = 'YOUR_API_KEY'; // Reemplazar con tu API key
const BASE_URL = 'https://rest.gohighlevel.com/v1';

// Headers comunes
const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// 1. Obtener todos los Custom Fields
async function getCustomFields() {
  try {
    const response = await fetch(`${BASE_URL}/contacts/custom-fields`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
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
    const response = await fetch(`${BASE_URL}/contacts/custom-fields`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(fieldData)
    });
    
    if (!response.ok) {
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
    const response = await fetch(`${BASE_URL}/contacts/custom-fields/${fieldId}`, {
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
    const response = await fetch(`${BASE_URL}/contacts/custom-fields/${fieldId}`, {
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

// Ejemplo de uso
async function main() {
  console.log('=== GoHighLevel Custom Fields API ===');
  
  // 1. Obtener campos existentes
  console.log('\n1. Obteniendo Custom Fields existentes...');
  const existingFields = await getCustomFields();
  
  // 2. Crear un nuevo campo (ejemplo)
  console.log('\n2. Creando nuevo Custom Field...');
  const newField = {
    name: 'puntaje_total',
    type: 'number',
    required: false,
    description: 'Puntaje total de la evaluación'
  };
  
  // await createCustomField(newField);
  
  // 3. Modificar un campo existente (ejemplo)
  // await updateCustomField('FIELD_ID', { name: 'nuevo_nombre' });
  
  // 4. Eliminar un campo (ejemplo)
  // await deleteCustomField('FIELD_ID');
}

// Ejecutar el script
main(); 