// Script para enviar datos de prueba a los webhooks de GoHighLevel

// Webhook URLs
const CONTACT_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/2EyoyOYn1MsthDEpkq7Z';
const ASSESSMENT_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35';

// Función para enviar datos al webhook
async function sendToWebhook(url, data, webhookName) {
  console.log(`\n📤 Enviando datos de prueba a ${webhookName}...`);
  console.log('URL:', url);
  console.log('Datos:', JSON.stringify(data, null, 2));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    console.log(`✅ Respuesta del webhook: ${response.status} ${response.statusText}`);
    
    // Intentar leer la respuesta si existe
    try {
      const responseText = await response.text();
      if (responseText) {
        console.log('Respuesta:', responseText);
      }
    } catch (e) {
      // Ignorar si no hay respuesta
    }
    
    return response;
  } catch (error) {
    console.error(`❌ Error enviando al webhook ${webhookName}:`, error.message);
    return null;
  }
}

// Datos de prueba para el formulario de contacto
async function testContactForm() {
  const contactData = {
    // Campos estándar
    "first_name": "María",
    "lastName": "González Pérez",
    "email": "maria.gonzalez.test@gmail.com",
    "phone": "+595991234567",
    
    // Campos custom con IDs específicos
    "GV3kzQc2ELggE7d2KLSk": "Estoy interesada en conocer más sobre el tratamiento de EMT para depresión resistente. Me gustaría agendar una consulta inicial.",
    "eI3874kqFkPMClPIqy0G": "Website",
    "terms_and_conditions": "true",
    
    // Campos custom con prefijo contact.
    "contact.servicio_de_inters": "Estimulación Magnética Transcraneal (EMT/TMS)",
    "contact.source_page": "homepage",
    "contact.form_type": "contact-form"
  };
  
  await sendToWebhook(CONTACT_WEBHOOK, contactData, "Formulario de Contacto");
}

// Datos de prueba para autoevaluación
async function testAssessmentForm() {
  const currentDate = new Date().toISOString().split('T')[0];
  const score = 18;
  const severityLevel = "Moderadamente Severa";
  const assessmentType = "PHQ-9 Depresión";
  
  const assessmentData = {
    // Campos estándar
    "firstName": "Carlos",
    "lastName": "Mendoza Silva",
    "email": "carlos.mendoza.test@gmail.com",
    "phone": "+595982345678",
    "ciudad": "Asunción",
    
    // Campos de evaluación (sin el campo Código Test que fue eliminado)
    "contact.score_phq_9_puntaje_total_2": score.toString(),
    "contact.diagnstico_preliminar": `${assessmentType} - Puntaje: ${score} - Nivel: ${severityLevel}. Se recomienda evaluación profesional urgente y considerar tratamiento con medicación y/o psicoterapia.`,
    "contact.tipo_de_evaluacin": assessmentType,
    "contact.nivel_de_severidad": severityLevel,
    "contact.edad": "42",
    "contact.sexo": "masculino",
    
    // Campos de historial
    "contact.historial_de_evaluaciones": JSON.stringify([{
      fecha: new Date().toISOString(),
      tipo: assessmentType,
      puntaje: score.toString(),
      nivel: severityLevel
    }]),
    "contact.ltima_evaluacin__fecha": currentDate,
    "contact.ltima_evaluacin__tipo": assessmentType,
    "contact.ltima_evaluacin__puntaje": score.toString(),
    "contact.ltima_evaluacin__nivel": severityLevel
  };
  
  await sendToWebhook(ASSESSMENT_WEBHOOK, assessmentData, "Formulario de Autoevaluación");
}

// Función principal
async function main() {
  console.log('🚀 Iniciando pruebas de webhooks de GoHighLevel');
  console.log('='.repeat(60));
  console.log('Fecha:', new Date().toISOString());
  console.log('='.repeat(60));
  
  // Esperar 2 segundos entre envíos para no saturar
  await testContactForm();
  
  console.log('\n⏳ Esperando 2 segundos antes del siguiente envío...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await testAssessmentForm();
  
  console.log('\n✅ Pruebas completadas');
  console.log('\n📝 Notas:');
  console.log('- Los campos eliminados NO están incluidos en los datos');
  console.log('- No se envían timestamps (GoHighLevel los detecta automáticamente)');
  console.log('- Los campos están listos para ser procesados en los workflows');
}

// Ejecutar las pruebas
main();