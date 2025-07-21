/**
 * Script de diagnóstico para el webhook n8n
 * Verifica la comunicación y el procesamiento de cambios
 */

const WEBHOOK_URL = 'https://clickmediapro.app.n8n.cloud/webhook/neuroinnova-admin';
const GITHUB_TOKEN = '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';
const REPO_OWNER = 'clickmediapropy';
const REPO_NAME = 'neuroinnova-cl';

// Función para verificar el contenido actual del archivo
async function checkCurrentFile() {
  console.log('🔍 Verificando contenido actual del Footer.tsx...\n');
  
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/src/components/layout/Footer.tsx`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    
    // Buscar la línea específica
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('© 2024 Todos los derechos reservados.')) {
        console.log(`✅ Encontrado en línea ${index + 1}: ${line.trim()}`);
      }
    });
    
    console.log(`\n📄 SHA actual del archivo: ${data.sha}`);
    return data.sha;
  } catch (error) {
    console.error('❌ Error verificando archivo:', error.message);
    return null;
  }
}

// Función para probar el webhook
async function testWebhook() {
  console.log('\n🚀 Enviando solicitud de prueba al webhook...\n');
  
  const payload = {
    type: 'change_request',
    request: {
      id: `test-${Date.now()}`,
      description: 'Eliminar el texto "© 2024 Todos los derechos reservados." del footer',
      type: 'content',
      priority: 'high',
      section: 'Footer',
      timestamp: new Date().toISOString(),
      status: 'pending'
    },
    metadata: {
      source: 'diagnostic-script',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  };
  
  console.log('📤 Payload enviado:', JSON.stringify(payload, null, 2));
  
  try {
    const startTime = Date.now();
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const duration = Date.now() - startTime;
    console.log(`\n⏱️ Tiempo de respuesta: ${duration}ms`);
    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    
    const responseText = await response.text();
    console.log('\n📋 Respuesta completa:');
    console.log(responseText);
    
    // Intentar parsear como JSON
    try {
      const responseData = JSON.parse(responseText);
      console.log('\n✅ Respuesta parseada correctamente');
      
      if (responseData.success) {
        console.log('✅ El webhook reportó éxito');
        
        // Verificar si hubo cambios reales
        if (responseData.actions && responseData.actions.length > 0) {
          console.log(`\n📝 Acciones ejecutadas: ${responseData.actions.length}`);
          responseData.actions.forEach((action, index) => {
            console.log(`\nAcción ${index + 1}:`);
            console.log(`- Herramienta: ${action.tool}`);
            console.log(`- Input:`, action.input);
            if (action.output) {
              console.log(`- Output:`, action.output.substring(0, 200) + '...');
            }
          });
        } else {
          console.log('\n⚠️ No se reportaron acciones ejecutadas');
        }
      } else {
        console.log('❌ El webhook reportó fallo');
      }
      
    } catch (parseError) {
      console.error('\n❌ Error parseando respuesta JSON:', parseError.message);
    }
    
  } catch (error) {
    console.error('\n❌ Error llamando webhook:', error.message);
  }
}

// Verificar cambios después del webhook
async function checkChangesAfterWebhook(originalSha) {
  console.log('\n🔄 Esperando 5 segundos para verificar cambios...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('\n🔍 Verificando si hubo cambios...\n');
  
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/src/components/layout/Footer.tsx`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const data = await response.json();
    
    if (data.sha !== originalSha) {
      console.log('✅ El archivo fue modificado (SHA cambió)');
      console.log(`SHA anterior: ${originalSha}`);
      console.log(`SHA nuevo: ${data.sha}`);
      
      // Verificar el contenido
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      if (!content.includes('© 2024 Todos los derechos reservados.')) {
        console.log('✅ El texto fue eliminado exitosamente');
      } else {
        console.log('⚠️ El archivo cambió pero el texto sigue presente');
      }
    } else {
      console.log('❌ No se detectaron cambios en el archivo');
    }
    
  } catch (error) {
    console.error('❌ Error verificando cambios:', error.message);
  }
}

// Verificar commits recientes
async function checkRecentCommits() {
  console.log('\n📜 Verificando commits recientes...\n');
  
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=5`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    const commits = await response.json();
    
    commits.forEach(commit => {
      const date = new Date(commit.commit.author.date);
      console.log(`${date.toLocaleString()} - ${commit.commit.message}`);
      console.log(`  Autor: ${commit.commit.author.name}`);
      console.log(`  SHA: ${commit.sha}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo commits:', error.message);
  }
}

// Ejecutar diagnóstico completo
async function runDiagnostic() {
  console.log('🏥 DIAGNÓSTICO DEL WEBHOOK N8N PARA NEUROINNOVA');
  console.log('='.repeat(50));
  
  // 1. Verificar archivo actual
  const originalSha = await checkCurrentFile();
  
  // 2. Probar webhook
  await testWebhook();
  
  // 3. Verificar cambios
  if (originalSha) {
    await checkChangesAfterWebhook(originalSha);
  }
  
  // 4. Ver commits recientes
  await checkRecentCommits();
  
  console.log('\n✅ Diagnóstico completado');
}

// Ejecutar
runDiagnostic().catch(console.error);