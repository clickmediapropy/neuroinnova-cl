import { chatLogger } from '@/utils/chatLogger';

interface ChangeRequest {
  id: string;
  description: string;
  type: 'content' | 'design' | 'functionality' | 'structure';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  section: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface ProcessedChange {
  files: string[];
  changes: {
    file: string;
    oldCode: string;
    newCode: string;
    lineStart: number;
    lineEnd: number;
  }[];
  commitMessage: string;
  requiresReview: boolean;
  diagnostics?: {
    filesChecked?: string[];
    issuesFound?: string[];
    recommendations?: string[];
  };
}

interface N8NWebhookResponse {
  success: boolean;
  processedChange?: ProcessedChange;
  message?: string;
  error?: string;
  conversationId?: string;
}

// Configuración del webhook de N8N
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://clickmediapro.app.n8n.cloud/webhook/neuroinnova-admin';

/**
 * Envía una solicitud de cambio al webhook de N8N para procesamiento con IA
 */
export async function sendChangeRequestToN8N(request: ChangeRequest): Promise<N8NWebhookResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N webhook URL no configurada. Por favor, configure VITE_N8N_WEBHOOK_URL en las variables de entorno.');
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 minutos de timeout

    const payload = {
      type: 'change_request',
      request: {
        id: request.id,
        description: request.description,
        type: request.type,
        priority: request.priority,
        section: request.section,
        timestamp: request.timestamp.toISOString(),
        status: request.status
      },
      metadata: {
        source: 'neuroinnova-admin-panel',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
    };

    // Log de la solicitud
    chatLogger.logWebhookRequest(payload, N8N_WEBHOOK_URL);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error del webhook: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      throw new Error('El webhook devolvió una respuesta vacía');
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error al parsear JSON:', responseText);
      chatLogger.logError(parseError, 'Error parsing webhook response');
      throw new Error('La respuesta del webhook no es JSON válido');
    }
    
    // Log de la respuesta exitosa
    chatLogger.logWebhookResponse(data, true);
    
    // Validar la respuesta
    if (!data.success && !data.error) {
      throw new Error('Respuesta inválida del webhook');
    }

    // Adaptar la respuesta del n8n workflow al formato esperado
    if (data.success && data.type === 'change_request') {
      const processedChange = convertN8NResponseToProcessedChange(data);
      return {
        success: true,
        processedChange,
        message: data.message,
        conversationId: data.conversationId
      };
    }

    return data;
  } catch (error: any) {
    console.error('Error al comunicarse con N8N:', error);
    chatLogger.logError(error, 'Error in sendChangeRequestToN8N');
    
    if (error.name === 'AbortError') {
      throw new Error('Timeout: El webhook tardó demasiado en responder');
    }
    
    throw error;
  }
}

/**
 * Envía una pregunta conversacional al webhook de N8N
 */
export async function sendQuestionToN8N(
  question: string, 
  conversationId?: string
): Promise<N8NWebhookResponse> {
  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N webhook URL no configurada. Por favor, configure VITE_N8N_WEBHOOK_URL en las variables de entorno.');
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 1 minuto de timeout

    const payload = {
      type: 'question',
      question,
      conversationId,
      metadata: {
        source: 'neuroinnova-admin-panel-chat',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      }
    };

    // Log de la pregunta
    chatLogger.logWebhookRequest(payload, N8N_WEBHOOK_URL);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error del webhook: ${response.status} ${response.statusText}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      throw new Error('El webhook devolvió una respuesta vacía');
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error al parsear JSON:', responseText);
      chatLogger.logError(parseError, 'Error parsing webhook response');
      throw new Error('La respuesta del webhook no es JSON válido');
    }
    
    // Log de la respuesta exitosa
    chatLogger.logWebhookResponse(data, true);
    
    // Manejar la respuesta del workflow n8n
    if (data.type === 'question') {
      return {
        success: true,
        message: data.answer || data.response || 'No se recibió una respuesta',
        conversationId: data.conversationId
      };
    }
    
    return {
      success: true,
      message: data.response || data.message || data.answer,
      conversationId: data.conversationId
    };
  } catch (error: any) {
    console.error('Error al comunicarse con N8N:', error);
    chatLogger.logError(error, 'Error in sendChangeRequestToN8N');
    
    if (error.name === 'AbortError') {
      throw new Error('Timeout: El webhook tardó demasiado en responder');
    }
    
    throw error;
  }
}

/**
 * Aplica los cambios procesados por N8N directamente a GitHub
 */
export async function applyN8NChanges(processedChange: ProcessedChange): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  try {
    // Importar dinámicamente el servicio de GitHub para evitar dependencias circulares
    const { applyChangesToGitHub } = await import('./githubService');
    
    const result = await applyChangesToGitHub(
      processedChange.changes,
      processedChange.commitMessage
    );
    
    if (result.success) {
      // Actualizar el mapa del sitio después de aplicar cambios
      const { updateSiteMap } = await import('./siteMapService');
      updateSiteMap({
        type: processedChange.changes[0].file.includes('.css') ? 'style' : 'content',
        target: processedChange.files.join(', '),
        details: processedChange.commitMessage
      });
      
      return {
        success: true,
        message: 'Cambios aplicados exitosamente. El sitio se actualizará en 2-3 minutos.',
        commitSha: result.commitSha
      };
    } else {
      return {
        success: false,
        message: 'Error al aplicar cambios',
        error: result.error
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: 'Error al conectar con GitHub',
      error: error.message
    };
  }
}

/**
 * Valida los cambios antes de aplicarlos
 */
/**
 * Convierte la respuesta del workflow n8n al formato ProcessedChange esperado
 */
function convertN8NResponseToProcessedChange(n8nResponse: any): ProcessedChange {
  const files: string[] = [];
  const changes: ProcessedChange['changes'] = [];
  
  // Procesar las acciones del agente AI para extraer cambios
  if (n8nResponse.actions && Array.isArray(n8nResponse.actions)) {
    n8nResponse.actions.forEach((action: any) => {
      if (action.tool === 'Create File Tool' || action.tool === 'Edit File Tool') {
        const filePath = action.input?.path || action.input?.file_path || '';
        if (filePath && !files.includes(filePath)) {
          files.push(filePath);
        }
        
        // Crear un cambio basado en la acción
        if (action.tool === 'Create File Tool') {
          changes.push({
            file: filePath,
            oldCode: '',
            newCode: action.input?.content || action.output || '',
            lineStart: 0,
            lineEnd: 0
          });
        } else if (action.tool === 'Edit File Tool') {
          // Para ediciones, intentar extraer el contenido anterior y nuevo
          changes.push({
            file: filePath,
            oldCode: action.input?.old_content || '',
            newCode: action.input?.new_content || action.output || '',
            lineStart: action.input?.line_start || 1,
            lineEnd: action.input?.line_end || 1
          });
        }
      }
    });
  }
  
  // Si no hay cambios específicos pero hay un resumen, crear un cambio genérico
  if (changes.length === 0 && n8nResponse.agentSummary) {
    // Esto indica que el agente procesó la solicitud pero no generó cambios específicos
    // Podríamos necesitar una revisión manual
    return {
      files: [],
      changes: [],
      commitMessage: n8nResponse.agentSummary,
      requiresReview: true,
      diagnostics: {
        issuesFound: ['El agente AI procesó la solicitud pero no generó cambios específicos'],
        recommendations: ['Revisar manualmente la solicitud y aplicar cambios según sea necesario']
      }
    };
  }
  
  // Generar mensaje de commit basado en la solicitud original y el resumen
  const commitMessage = n8nResponse.agentSummary || 
    `${n8nResponse.request?.type || 'update'}: ${n8nResponse.request?.description?.substring(0, 50)}...`;
  
  return {
    files,
    changes,
    commitMessage,
    requiresReview: n8nResponse.requiresReview || false,
    diagnostics: n8nResponse.diagnostics
  };
}

export function validateN8NChanges(change: ProcessedChange): { 
  isValid: boolean; 
  errors: string[]; 
  warnings: string[] 
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Si no hay cambios, es válido pero requiere revisión
  if (change.changes.length === 0) {
    if (!change.requiresReview) {
      errors.push('No se generaron cambios y no se marcó para revisión');
    }
    return {
      isValid: errors.length === 0,
      errors,
      warnings: ['No se generaron cambios automáticos, se requiere revisión manual']
    };
  }
  
  // Validar que los archivos tengan rutas válidas
  change.files.forEach(file => {
    if (!file.startsWith('src/') && !file.startsWith('public/') && file !== 'tailwind.config.js' && file !== 'vite.config.ts') {
      errors.push(`Archivo con ruta inválida: ${file}`);
    }
  });
  
  // Validar que los cambios tengan sentido
  change.changes.forEach(c => {
    // Para archivos nuevos, oldCode debe estar vacío
    if (c.oldCode === '' && c.lineStart === 0 && c.lineEnd === 0) {
      // Es un archivo nuevo, esto está bien
    } else if (!c.oldCode || !c.newCode) {
      errors.push('Cambio incompleto detectado');
    }
    
    // Validar números de línea solo para archivos existentes
    if (c.oldCode !== '' && (c.lineStart < 0 || c.lineEnd < c.lineStart)) {
      errors.push('Números de línea inválidos');
    }
  });
  
  // Detectar si es una nueva página/sección
  const isNewPage = change.files.some(f => f.includes('/pages/') && change.changes.some(c => c.file === f && c.oldCode === ''));
  const isNewBlog = change.files.some(f => f.toLowerCase().includes('blog'));
  
  if (isNewPage || isNewBlog) {
    // Verificar que se incluyan todos los archivos necesarios
    const hasRoute = change.files.includes('src/App.tsx');
    const hasNavigation = change.files.includes('src/components/layout/Header.tsx');
    
    if (!hasRoute) {
      warnings.push('⚠️ No se detectó actualización de rutas en App.tsx');
    }
    if (!hasNavigation) {
      warnings.push('⚠️ No se detectó actualización de navegación en Header.tsx');
    }
  }
  
  // Detectar cambios globales (como WhatsApp)
  const mentionsWhatsApp = change.commitMessage.toLowerCase().includes('whatsapp');
  if (mentionsWhatsApp) {
    const expectedFiles = [
      'src/components/layout/Header.tsx',
      'src/components/layout/Footer.tsx',
      'src/components/sections/Hero.tsx',
      'src/components/ui/WhatsAppButton.tsx'
    ];
    
    expectedFiles.forEach(file => {
      if (!change.files.includes(file)) {
        warnings.push(`⚠️ Cambio de WhatsApp pero falta actualizar: ${file}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}