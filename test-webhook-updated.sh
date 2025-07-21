#!/bin/bash
# Script para probar el webhook con el workflow actualizado

echo "🚀 Probando webhook de n8n actualizado..."

# Prueba 1: Cambiar WhatsApp
echo -e "\n📱 Prueba 1: Cambiar número de WhatsApp"
curl -X POST https://clickmediapro.app.n8n.cloud/webhook/neuroinnova-admin \
  -H "Content-Type: application/json" \
  -d '{
    "type": "change_request",
    "request": {
      "id": "test-'$(date +%s)'",
      "description": "Cambiar el número de WhatsApp en el botón flotante a +595 991 999 888",
      "type": "content",
      "section": "global",
      "priority": "high",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")'",
      "status": "processing"
    },
    "metadata": {
      "source": "test-script",
      "version": "1.0.0",
      "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")'"
    }
  }'

echo -e "\n\n✅ Prueba completada. Revisa los logs en n8n."