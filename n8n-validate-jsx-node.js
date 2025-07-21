// NODO DE VALIDACIÓN JSX PARA N8N
// Agrega este código en un nodo "Code" después del AI Agent pero antes del commit

// Obtener el contenido del archivo modificado
const fileContent = $input.first().json.content;
const fileName = $input.first().json.path || 'unknown.tsx';

// Decodificar de base64
let decodedContent;
try {
  decodedContent = Buffer.from(fileContent, 'base64').toString('utf-8');
} catch (error) {
  throw new Error('Error al decodificar el contenido base64');
}

// Función para validar estructura JSX básica
function validateJSXStructure(content) {
  const errors = [];
  
  // 1. Contar tags de apertura y cierre
  const openingTags = content.match(/<(\w+)[^>]*>/g) || [];
  const closingTags = content.match(/<\/(\w+)>/g) || [];
  const selfClosingTags = content.match(/<(\w+)[^>]*\/>/g) || [];
  
  // Crear un mapa de tags
  const tagCount = {};
  
  // Contar tags de apertura
  openingTags.forEach(tag => {
    const tagName = tag.match(/<(\w+)/)[1];
    // Ignorar tags auto-cerrados
    if (!tag.endsWith('/>')) {
      tagCount[tagName] = (tagCount[tagName] || 0) + 1;
    }
  });
  
  // Restar tags de cierre
  closingTags.forEach(tag => {
    const tagName = tag.match(/<\/(\w+)>/)[1];
    tagCount[tagName] = (tagCount[tagName] || 0) - 1;
  });
  
  // Verificar balance
  Object.keys(tagCount).forEach(tag => {
    if (tagCount[tag] !== 0) {
      if (tagCount[tag] > 0) {
        errors.push(`Tag <${tag}> tiene ${tagCount[tag]} apertura(s) sin cerrar`);
      } else {
        errors.push(`Tag </${tag}> tiene ${Math.abs(tagCount[tag])} cierre(s) sin apertura`);
      }
    }
  });
  
  // 2. Verificar llaves balanceadas
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    errors.push(`Llaves desbalanceadas: ${openBraces} apertura(s) vs ${closeBraces} cierre(s)`);
  }
  
  // 3. Verificar paréntesis balanceados
  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;
  
  if (openParens !== closeParens) {
    errors.push(`Paréntesis desbalanceados: ${openParens} apertura(s) vs ${closeParens} cierre(s)`);
  }
  
  // 4. Buscar caracteres problemáticos
  const problematicChars = /[ÙÚÛÜùúûü]/g;
  const foundProblematic = content.match(problematicChars);
  if (foundProblematic) {
    errors.push(`Caracteres problemáticos encontrados: ${foundProblematic.join(', ')}`);
  }
  
  // 5. Verificar estructura básica de componente React
  if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) {
    if (!content.includes('export default') && !content.includes('export {')) {
      errors.push('No se encontró export en el componente');
    }
  }
  
  return errors;
}

// Validar el contenido
const validationErrors = validateJSXStructure(decodedContent);

// Preparar el resultado
if (validationErrors.length > 0) {
  // Si hay errores, devolver información detallada
  return [{
    json: {
      valid: false,
      errors: validationErrors,
      fileName: fileName,
      recommendation: 'El código tiene errores de sintaxis. El AI Agent debe corregirlos antes de hacer commit.',
      details: {
        errorCount: validationErrors.length,
        criticalErrors: validationErrors.filter(e => 
          e.includes('sin cerrar') || 
          e.includes('desbalanceadas') || 
          e.includes('problemáticos')
        )
      }
    }
  }];
} else {
  // Si no hay errores, permitir continuar
  return [{
    json: {
      valid: true,
      fileName: fileName,
      message: 'Validación exitosa: el código parece estar sintácticamente correcto',
      content: fileContent, // Pasar el contenido original para el siguiente nodo
      path: fileName
    }
  }];
}