/**
 * Sistema de logging para el panel admin chat
 * Guarda un registro completo de todas las interacciones
 */

interface LogEntry {
  timestamp: string;
  type: 'user' | 'assistant' | 'system' | 'webhook_request' | 'webhook_response' | 'error';
  content: any;
  metadata?: {
    conversationId?: string;
    messageId?: string;
    mode?: 'chat' | 'edit';
    [key: string]: any;
  };
}

class ChatLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Límite de logs en memoria
  private storageKey = 'neuroinnova_admin_chat_logs';

  constructor() {
    // Cargar logs del localStorage al iniciar
    this.loadFromStorage();
  }

  /**
   * Registra un mensaje del usuario
   */
  logUserMessage(content: string, conversationId?: string, mode?: 'chat' | 'edit') {
    this.addLog({
      type: 'user',
      content,
      metadata: { conversationId, mode }
    });
  }

  /**
   * Registra una respuesta del asistente
   */
  logAssistantMessage(content: string, conversationId?: string, status?: string) {
    this.addLog({
      type: 'assistant',
      content,
      metadata: { conversationId, status }
    });
  }

  /**
   * Registra mensajes del sistema
   */
  logSystemMessage(content: string, metadata?: any) {
    this.addLog({
      type: 'system',
      content,
      metadata
    });
  }

  /**
   * Registra solicitudes al webhook
   */
  logWebhookRequest(payload: any, endpoint?: string) {
    this.addLog({
      type: 'webhook_request',
      content: payload,
      metadata: { endpoint }
    });
  }

  /**
   * Registra respuestas del webhook
   */
  logWebhookResponse(response: any, success: boolean, duration?: number) {
    this.addLog({
      type: 'webhook_response',
      content: response,
      metadata: { success, duration }
    });
  }

  /**
   * Registra errores
   */
  logError(error: any, context?: string) {
    this.addLog({
      type: 'error',
      content: {
        message: error.message || error,
        stack: error.stack,
        context
      }
    });
  }

  /**
   * Agrega un log
   */
  private addLog(entry: Omit<LogEntry, 'timestamp'>) {
    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString()
    };

    this.logs.push(logEntry);

    // Mantener solo los últimos N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Guardar en localStorage
    this.saveToStorage();

    // También log en consola para debugging
    console.log(`[ChatLogger ${entry.type}]`, logEntry);
  }

  /**
   * Obtiene todos los logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Obtiene logs filtrados por tipo
   */
  getLogsByType(type: LogEntry['type']): LogEntry[] {
    return this.logs.filter(log => log.type === type);
  }

  /**
   * Obtiene logs de una conversación específica
   */
  getLogsByConversation(conversationId: string): LogEntry[] {
    return this.logs.filter(log => log.metadata?.conversationId === conversationId);
  }

  /**
   * Obtiene los últimos N logs
   */
  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count);
  }

  /**
   * Exporta los logs como JSON
   */
  exportAsJSON(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Exporta los logs como texto legible
   */
  exportAsText(): string {
    return this.logs.map(log => {
      const time = new Date(log.timestamp).toLocaleString();
      const type = log.type.toUpperCase().padEnd(15);
      const content = typeof log.content === 'string' 
        ? log.content 
        : JSON.stringify(log.content, null, 2);
      
      return `[${time}] ${type} ${content}`;
    }).join('\n\n');
  }

  /**
   * Limpia todos los logs
   */
  clearLogs() {
    this.logs = [];
    this.saveToStorage();
  }

  /**
   * Guarda logs en localStorage
   */
  private saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Error saving logs to localStorage:', error);
    }
  }

  /**
   * Carga logs desde localStorage
   */
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading logs from localStorage:', error);
      this.logs = [];
    }
  }

  /**
   * Descarga los logs como archivo
   */
  downloadLogs(format: 'json' | 'txt' = 'json') {
    const content = format === 'json' ? this.exportAsJSON() : this.exportAsText();
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neuroinnova-chat-logs-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Instancia singleton
export const chatLogger = new ChatLogger();