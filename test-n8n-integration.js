// Test script for n8n webhook integration
import fetch from 'node-fetch';

const WEBHOOK_URL = 'https://clickmediapro.app.n8n.cloud/webhook/neuroinnova-admin';

async function testChangeRequest() {
  console.log('🔄 Testing change request...');
  
  const changeRequest = {
    type: 'change_request',
    request: {
      id: `test-${Date.now()}`,
      description: 'Cambiar el título del hero a "Centro Líder en Neuromodulación del Paraguay"',
      type: 'content',
      priority: 'medium',
      section: 'hero',
      timestamp: new Date().toISOString(),
      status: 'processing'
    },
    metadata: {
      source: 'neuroinnova-admin-panel',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeRequest),
      timeout: 120000 // 2 minutes
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    
    const responseText = await response.text();
    console.log('Response body:', responseText);
    
    if (responseText) {
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed response:', JSON.stringify(data, null, 2));
      } catch (e) {
        console.log('Could not parse as JSON');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testQuestion() {
  console.log('\n🔄 Testing question...');
  
  const question = {
    type: 'question',
    question: '¿Cuáles son los servicios que ofrece NeuroInnova?',
    conversationId: `conv-${Date.now()}`,
    metadata: {
      source: 'neuroinnova-admin-panel-chat',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
      timeout: 60000 // 1 minute
    });

    console.log('Response status:', response.status);
    
    const responseText = await response.text();
    console.log('Response body:', responseText);
    
    if (responseText) {
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed response:', JSON.stringify(data, null, 2));
      } catch (e) {
        console.log('Could not parse as JSON');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run tests
(async () => {
  await testQuestion();
  await testChangeRequest();
})();