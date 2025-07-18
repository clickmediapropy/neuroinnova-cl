// Test script for GoHighLevel webhook
const webhookUrl = 'https://services.leadconnectorhq.com/hooks/Lmk3yMGsLO5NUbaGlZeB/webhook-trigger/25428128-10eb-4929-9076-debc9e8b9e35';

const testData = {
  "Puntaje Total": 15,
  "Nivel de Severidad": "Moderadamente severa",
  "Tipo de Test": "depression",
  "Categoria de Severidad": "Moderadamente severa",
  "Nombre": "Test",
  "Apellido": "Usuario",
  "Email": "test@example.com",
  "Telefono": "+595991123456",
  "Edad": 30,
  "Sexo": "masculino",
  "Ciudad": "Asunción",
  "Tipo de Evaluacion": "PHQ-9 Depresión"
};

console.log('Testing GoHighLevel webhook...');
console.log('URL:', webhookUrl);
console.log('Data:', JSON.stringify(testData, null, 2));

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData),
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response data:', data);
  console.log('✅ Webhook test successful!');
})
.catch(error => {
  console.error('❌ Error:', error);
});