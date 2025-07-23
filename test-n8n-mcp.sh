#!/bin/bash

echo "Probando conexión con N8N MCP..."

# Test básico del MCP
docker run -i --rm --init \
  -e MCP_MODE=stdio \
  -e LOG_LEVEL=info \
  -e N8N_API_URL=https://clickmediapro.app.n8n.cloud \
  -e N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMzdkOTI4My0xYzFhLTQ4ZDAtOWIzNC03NmQyOWUyYjk4OGUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzUzMDY5NDE2fQ.meb8uBEZvDhTJd53BbV45SPHy7paGt6ZTa4Vt7LpaeE \
  ghcr.io/czlonkowski/n8n-mcp:latest \
  << 'EOF'
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "id": 1,
  "params": {
    "protocolVersion": "0.1.0",
    "capabilities": {
      "tools": {}
    },
    "clientInfo": {
      "name": "test-client",
      "version": "1.0.0"
    }
  }
}
EOF