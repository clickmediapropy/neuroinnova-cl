// Test script para probar el webhook de NeuroInnova

// Webhook de ContactForm
const CONTACT_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/2EyoyOYn1MsthDEpkq7Z';

// Webhook de AssessmentResults
const ASSESSMENT_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35';

// Datos de prueba para ContactForm
const contactTestData = {
  first_name: "Test",
  lastName: "Webhook",
  email: "test@neuroinnova.com",
  phone: "+595991123456",
  GV3kzQc2ELggE7d2KLSk: "Estoy interesado en el servicio de EMT/TMS para tratamiento de depresión resistente",
  eI3874kqFkPMClPIqy0G: "Website",
  terms_and_conditions: "true",
  "contact.servicio_de_inters": "Estimulación Magnética Transcraneal (EMT/TMS)",
  "contact.source_page": "homepage",
  "contact.form_type": "contact-form",
  timestamp: new Date().toISOString()
};

// Datos de prueba para AssessmentResults
const assessmentTestData = {
  firstName: "Test",
  lastName: "Assessment",
  email: "test.assessment@neuroinnova.com",
  phone: "+595991234567",
  "contact.score_phq_9_puntaje_total_2": "15",
  "contact.diagnstico_preliminar": "Depresión moderada (puntuación PHQ-9: 15/27). Se recomienda evaluación profesional.",
  "contact.tipo_de_evaluacin": "PHQ-9 Depresión",
  "contact.nivel_de_severidad": "Moderada",
  "contact.cdigo_test": "depression",
  "contact.edad": "35",
  "contact.sexo": "masculino",
  "contact.historial_de_evaluaciones": JSON.stringify([{
    fecha: new Date().toISOString(),
    tipo: "PHQ-9 Depresión",
    puntaje: "15",
    nivel: "Moderada"
  }]),
  "contact.ltima_evaluacin__fecha": new Date().toISOString(),
  "contact.ltima_evaluacin__tipo": "PHQ-9 Depresión",
  "contact.ltima_evaluacin__puntaje": "15",
  "contact.ltima_evaluacin__nivel": "Moderada",
  ciudad: "Asunción"
};

// Función para enviar al webhook de ContactForm
async function testContactWebhook() {
  console.log('📤 Enviando datos de prueba al webhook de ContactForm...');
  console.log('URL:', CONTACT_WEBHOOK);
  console.log('Datos:', JSON.stringify(contactTestData, null, 2));
  
  try {
    const response = await fetch(CONTACT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactTestData)
    });
    
    console.log('✅ Status:', response.status);
    console.log('Headers:', response.headers);
    
    const text = await response.text();
    console.log('Response:', text);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Función para enviar al webhook de AssessmentResults
async function testAssessmentWebhook() {
  console.log('\n📤 Enviando datos de prueba al webhook de AssessmentResults...');
  console.log('URL:', ASSESSMENT_WEBHOOK);
  console.log('Datos:', JSON.stringify(assessmentTestData, null, 2));
  
  try {
    const response = await fetch(ASSESSMENT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentTestData)
    });
    
    console.log('✅ Status:', response.status);
    console.log('Headers:', response.headers);
    
    const text = await response.text();
    console.log('Response:', text);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Menú de selección
async function runTests() {
  console.log('🧪 NeuroInnova Webhook Test Script');
  console.log('==================================\n');
  
  const args = process.argv.slice(2);
  
  if (args.includes('--contact')) {
    await testContactWebhook();
  } else if (args.includes('--assessment')) {
    await testAssessmentWebhook();
  } else if (args.includes('--all')) {
    await testContactWebhook();
    await testAssessmentWebhook();
  } else {
    console.log('Uso:');
    console.log('  node test-webhook-neuroinnova.js --contact     # Probar webhook de ContactForm');
    console.log('  node test-webhook-neuroinnova.js --assessment  # Probar webhook de AssessmentResults');
    console.log('  node test-webhook-neuroinnova.js --all         # Probar ambos webhooks');
    console.log('\nEjemplo:');
    console.log('  node test-webhook-neuroinnova.js --contact');
  }
}

// Ejecutar tests
runTests();