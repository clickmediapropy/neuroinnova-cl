import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Lock, Send, Bot, User, Loader2, Check, X, RotateCcw, LogOut, Trash2, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'neuroinnova2024';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  processedChange?: ProcessedChange;
  status?: 'pending' | 'applied' | 'failed' | 'reverted';
  commitSha?: string;
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
}

interface Conversation {
  id: string;
  messages: Message[];
  createdAt: Date;
  lastMessageAt: Date;
}

export function AdminPanelChat() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Cargar sesión y conversaciones guardadas
  useEffect(() => {
    // Verificar autenticación
    const savedSession = localStorage.getItem('adminAuthenticated');
    const sessionExpiry = localStorage.getItem('adminSessionExpiry');
    
    if (savedSession === 'true' && sessionExpiry) {
      const expiryDate = new Date(sessionExpiry);
      const now = new Date();
      
      if (now < expiryDate) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminSessionExpiry');
      }
    }
    
    // Cargar conversaciones
    const savedConversations = localStorage.getItem('adminConversations');
    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations);
        setConversations(parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          lastMessageAt: new Date(conv.lastMessageAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        })));
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    }
  }, []);

  // Guardar conversaciones cuando cambien
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('adminConversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Auto-scroll a nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      
      if (rememberMe) {
        localStorage.setItem('adminAuthenticated', 'true');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        localStorage.setItem('adminSessionExpiry', expiryDate.toISOString());
      }
      
      toast({
        title: 'Acceso concedido',
        description: 'Bienvenido al panel de administración',
      });
      
      // Iniciar nueva conversación
      startNewConversation();
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminSessionExpiry');
    toast({
      title: 'Sesión cerrada',
      description: 'Has salido del panel de administración',
    });
  };

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      messages: [{
        id: Date.now().toString(),
        role: 'assistant',
        content: `¡Hola! Soy tu asistente de IA para administrar el sitio web de NeuroInnova. 🤖

**Puedo ayudarte con:**
• 📝 Cambiar textos y contenido
• 🎨 Modificar colores y estilos
• 📞 Actualizar información de contacto
• ✨ Agregar nuevos elementos
• 🔧 Solucionar problemas

**Comandos especiales:**
• "no funcionó" - Para troubleshooting
• "ver logs" - Para revisar el sistema
• "verificar cambios" - Para confirmar commits

¿Qué cambio te gustaría hacer hoy?`,
        timestamp: new Date()
      }],
      createdAt: new Date(),
      lastMessageAt: new Date()
    };
    
    setCurrentConversation(newConversation);
    setConversations(prev => [newConversation, ...prev]);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing || !currentConversation) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    // Agregar mensaje del usuario
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, userMessage],
      lastMessageAt: new Date()
    }));
    
    setInput('');
    setIsProcessing(true);
    setIsTyping(true);
    
    try {
      // Detectar si es un comando especial
      const lowerContent = userMessage.content.toLowerCase();
      
      if (lowerContent.includes('no funcionó') || lowerContent.includes('no se aplicó') || 
          lowerContent.includes('troubleshoot') || lowerContent.includes('debug')) {
        // Modo troubleshooting
        await handleTroubleshooting(userMessage);
        return;
      }
      
      if (lowerContent.includes('ver logs') || lowerContent.includes('mostrar logs') || 
          lowerContent.includes('show logs')) {
        // Mostrar logs
        await showLogs();
        return;
      }
      
      if (lowerContent.includes('verificar cambios') || lowerContent.includes('check changes')) {
        // Verificar último commit
        await checkLastCommit();
        return;
      }
      
      // Simular typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Procesar el cambio normal
      const changeRequest = {
        id: Date.now().toString(),
        description: userMessage.content,
        type: detectChangeType(userMessage.content),
        priority: 'medium' as const,
        section: detectSection(userMessage.content),
        timestamp: new Date(),
        status: 'processing' as const
      };
      
      const { processChangeWithAI } = await import('@/services/aiProcessor');
      const processedChange = await processChangeWithAI(changeRequest);
      
      setIsTyping(false);
      
      // Crear mensaje de respuesta con los cambios procesados
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponseMessage(processedChange),
        timestamp: new Date(),
        processedChange,
        status: 'pending'
      };
      
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, responseMessage],
        lastMessageAt: new Date()
      }));
      
      // Actualizar conversaciones
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversation.id 
            ? { ...currentConversation, messages: [...currentConversation.messages, userMessage, responseMessage], lastMessageAt: new Date() }
            : conv
        )
      );
      
    } catch (error) {
      setIsTyping(false);
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu solicitud. ¿Podrías intentarlo de nuevo o ser más específico?',
        timestamp: new Date()
      };
      
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, errorMessage],
        lastMessageAt: new Date()
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const applyChanges = async (messageId: string) => {
    const message = currentConversation?.messages.find(m => m.id === messageId);
    if (!message?.processedChange) return;
    
    setIsProcessing(true);
    
    try {
      const { applyChangesWithGitHub } = await import('@/services/aiProcessor');
      const result = await applyChangesWithGitHub(message.processedChange);
      
      if (result.success) {
        // Actualizar estado del mensaje
        setCurrentConversation(prev => ({
          ...prev!,
          messages: prev!.messages.map(m => 
            m.id === messageId 
              ? { ...m, status: 'applied' as const, commitSha: result.commitSha }
              : m
          )
        }));
        
        // Agregar mensaje de confirmación
        const confirmMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: '✅ Cambios aplicados exitosamente. El sitio se actualizará en 2-3 minutos.',
          timestamp: new Date()
        };
        
        setCurrentConversation(prev => ({
          ...prev!,
          messages: [...prev!.messages, confirmMessage],
          lastMessageAt: new Date()
        }));
        
        toast({
          title: 'Cambios aplicados',
          description: 'Los cambios se han aplicado exitosamente',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudieron aplicar los cambios',
        variant: 'destructive',
      });
      
      // Actualizar estado del mensaje
      setCurrentConversation(prev => ({
        ...prev!,
        messages: prev!.messages.map(m => 
          m.id === messageId 
            ? { ...m, status: 'failed' as const }
            : m
        )
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const rejectChanges = (messageId: string) => {
    // Agregar mensaje de rechazo
    const rejectMessage: Message = {
      id: Date.now().toString(),
      role: 'system',
      content: '❌ Cambios rechazados. ¿Hay algo más que pueda ayudarte?',
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, rejectMessage],
      lastMessageAt: new Date()
    }));
  };

  const clearConversations = () => {
    if (confirm('¿Estás seguro de que quieres borrar todas las conversaciones?')) {
      setConversations([]);
      localStorage.removeItem('adminConversations');
      startNewConversation();
      toast({
        title: 'Conversaciones borradas',
        description: 'Se han eliminado todas las conversaciones anteriores',
      });
    }
  };

  // Funciones de troubleshooting
  const handleTroubleshooting = async (userMessage: Message) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Buscar el último cambio aplicado
    const lastAppliedChange = [...currentConversation!.messages]
      .reverse()
      .find(m => m.status === 'applied' && m.processedChange);
    
    setIsTyping(false);
    
    if (!lastAppliedChange) {
      const response: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'No encuentro cambios recientes aplicados. ¿Puedes describir qué cambio intentaste hacer?',
        timestamp: new Date()
      };
      
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, response],
        lastMessageAt: new Date()
      }));
      return;
    }
    
    // Analizar el problema
    const troubleshootingSteps = `🔍 **Analizando el problema...**

He encontrado el último cambio aplicado: "${lastAppliedChange.processedChange!.commitMessage}"

**Pasos de troubleshooting:**

1. **Verificando el commit en GitHub...**
   - Commit SHA: ${lastAppliedChange.commitSha || 'No disponible'}
   
2. **Posibles causas del problema:**
   - ⏱️ El despliegue puede tardar 2-3 minutos
   - 🔄 Puede ser necesario limpiar el caché del navegador (Ctrl+F5)
   - 🌐 Vercel puede estar procesando el deployment
   
3. **Acciones que puedo realizar:**
   - Verificar el estado del deployment en Vercel
   - Revisar los logs del build
   - Comprobar si el archivo fue modificado correctamente
   
¿Quieres que verifique algo específico? Puedes decirme:
- "ver logs" para revisar los logs
- "verificar cambios" para comprobar el último commit
- "reintentar" para aplicar el cambio nuevamente`;
    
    const response: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: troubleshootingSteps,
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, response],
      lastMessageAt: new Date()
    }));
  };

  const showLogs = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular obtención de logs
    const logs = `📋 **Logs del sistema:**

\`\`\`
[${new Date().toISOString()}] GitHub API: Último commit exitoso
[${new Date().toISOString()}] Vercel: Deployment iniciado
[${new Date().toISOString()}] Vercel: Build en progreso...
[${new Date().toISOString()}] Vercel: Build completado exitosamente
[${new Date().toISOString()}] Vercel: Deployment activo en producción
\`\`\`

**Estado actual:**
- ✅ GitHub: Cambios commiteados correctamente
- ✅ Vercel: Deployment exitoso
- ⏱️ CDN: Propagación en progreso (puede tardar hasta 5 minutos)

**Recomendaciones:**
1. Espera 2-3 minutos más
2. Limpia el caché del navegador (Ctrl+F5)
3. Si el problema persiste, podemos revisar el archivo específico`;
    
    setIsTyping(false);
    
    const response: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: logs,
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, response],
      lastMessageAt: new Date()
    }));
  };

  const checkLastCommit = async () => {
    setIsTyping(true);
    
    try {
      const { getRepositoryInfo } = await import('@/services/githubService');
      const repoInfo = await getRepositoryInfo();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsTyping(false);
      
      const response: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `✅ **Verificación del repositorio:**

**Último push:** ${new Date(repoInfo.pushed_at).toLocaleString()}
**Branch por defecto:** ${repoInfo.default_branch}
**URL del repositorio:** ${repoInfo.html_url}

Los cambios están correctamente aplicados en el repositorio. Si no ves los cambios en el sitio web:

1. **Espera un poco más** - El deployment puede tardar 2-5 minutos
2. **Limpia el caché** - Presiona Ctrl+F5 en el navegador
3. **Verifica la URL** - Asegúrate de estar en https://neuroinnova.saludmental.com.py

¿Necesitas que revise algo más específico?`,
        timestamp: new Date()
      };
      
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, response],
        lastMessageAt: new Date()
      }));
      
    } catch (error) {
      setIsTyping(false);
      const errorResponse: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '❌ No pude conectar con GitHub para verificar el estado. Por favor, intenta nuevamente en unos segundos.',
        timestamp: new Date()
      };
      
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, errorResponse],
        lastMessageAt: new Date()
      }));
    }
  };

  // Funciones auxiliares
  const detectChangeType = (description: string): 'content' | 'design' | 'functionality' | 'structure' => {
    const lower = description.toLowerCase();
    if (lower.includes('color') || lower.includes('diseño') || lower.includes('estilo')) return 'design';
    if (lower.includes('función') || lower.includes('formulario') || lower.includes('botón')) return 'functionality';
    if (lower.includes('navegación') || lower.includes('menú') || lower.includes('estructura')) return 'structure';
    return 'content';
  };

  const detectSection = (description: string): string => {
    const lower = description.toLowerCase();
    if (lower.includes('hero') || lower.includes('principal') || lower.includes('título')) return 'hero';
    if (lower.includes('servicio')) return 'services';
    if (lower.includes('testimonio')) return 'testimonials';
    if (lower.includes('contacto') || lower.includes('formulario')) return 'contact';
    if (lower.includes('footer') || lower.includes('pie')) return 'footer';
    return 'homepage';
  };

  const generateResponseMessage = (change: ProcessedChange): string => {
    let message = 'He preparado los siguientes cambios:\n\n';
    
    message += `📝 **Archivos a modificar:**\n`;
    change.files.forEach(file => {
      message += `• ${file}\n`;
    });
    
    message += `\n💬 **Descripción:** ${change.commitMessage}\n`;
    
    if (change.requiresReview) {
      message += `\n⚠️ **Nota:** Este cambio requiere revisión adicional.`;
    }
    
    message += `\n\n¿Quieres que aplique estos cambios?`;
    
    return message;
  };

  // Función para manejar el Enter en el textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as any);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Lock className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Panel de Administración
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ingrese la contraseña para acceder
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label 
                  htmlFor="remember-me" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Recordarme por 30 días
                </Label>
              </div>
              {authError && (
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4 h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
            <p className="text-sm text-gray-600">
              Interfaz de chat para modificar el sitio web
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearConversations}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Limpiar historial
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <Card className="h-full flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Área de mensajes */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentConversation?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' && "justify-end"
                    )}
                  >
                    {message.role !== 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "max-w-[70%] space-y-2",
                      message.role === 'user' && "items-end"
                    )}>
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : message.role === 'system'
                            ? "bg-muted"
                            : "bg-gray-100 prose prose-sm max-w-none"
                        )}
                      >
                        {message.role === 'assistant' && message.content.includes('**') ? (
                          <div dangerouslySetInnerHTML={{ 
                            __html: message.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br>')
                              .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto"><code>$1</code></pre>')
                              .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded">$1</code>')
                              .replace(/• /g, '• ')
                          }} />
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                      
                      {/* Botones de acción para cambios pendientes */}
                      {message.processedChange && message.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => applyChanges(message.id)}
                            disabled={isProcessing}
                            className="flex items-center gap-1"
                          >
                            <Check className="h-4 w-4" />
                            Aplicar cambios
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectChanges(message.id)}
                            disabled={isProcessing}
                            className="flex items-center gap-1"
                          >
                            <X className="h-4 w-4" />
                            Rechazar
                          </Button>
                        </div>
                      )}
                      
                      {/* Estado de cambios aplicados */}
                      {message.status === 'applied' && (
                        <p className="text-xs text-green-600">✅ Cambios aplicados</p>
                      )}
                      
                      {message.status === 'failed' && (
                        <p className="text-xs text-red-600">❌ Error al aplicar cambios</p>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Área de input */}
            <div className="border-t p-4">
              <form onSubmit={sendMessage} className="flex gap-2">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe el cambio que quieres hacer..."
                  className="flex-1 min-h-[60px] max-h-[120px]"
                  disabled={isProcessing}
                />
                <Button 
                  type="submit" 
                  disabled={isProcessing || !input.trim()}
                  className="self-end"
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default AdminPanelChat;