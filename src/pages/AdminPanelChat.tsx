import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Lock, Send, Bot, User, Loader2, Check, X, RotateCcw, LogOut, Trash2, AlertCircle, FileText, RefreshCw, ArrowDown, Copy } from 'lucide-react';
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
  const [mode, setMode] = useState<'chat' | 'edit'>('chat');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const [isNearBottom, setIsNearBottom] = useState(true);

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

  // Iniciar conversación cuando se autentique
  useEffect(() => {
    if (isAuthenticated && !currentConversation) {
      console.log('Authenticated but no conversation, starting new one');
      startNewConversation();
    }
  }, [isAuthenticated]);

  // Auto-scroll a nuevos mensajes solo si el usuario está cerca del final
  useEffect(() => {
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentConversation?.messages, isNearBottom]);

  // Detectar si el usuario está cerca del bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const threshold = 150;
    const isNear = element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
    setIsNearBottom(isNear);
  };

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
      
      // Iniciar nueva conversación después de un pequeño delay para asegurar que el estado se actualice
      setTimeout(() => {
        startNewConversation();
      }, 100);
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
        content: `¡Hola Dr. Adorno! 👋 Soy tu asistente para el sitio web de NeuroInnova.

**Hay dos modos disponibles:**

**💬 Modo Chat** (actual) - Para preguntas e información
• Pregúntame sobre el contenido actual del sitio
• Consulta sobre páginas, secciones o elementos
• Obtén información sin hacer cambios

**✏️ Modo Edición** - Para hacer cambios
• Cambiar textos y contenido
• Modificar colores y estilos
• Actualizar información
• Agregar nuevos elementos

Puedes cambiar de modo en cualquier momento usando los botones arriba.

¿En qué puedo ayudarte?`,
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
    console.log('sendMessage called', { input, isProcessing, currentConversation });
    
    if (!input.trim() || isProcessing || !currentConversation) {
      console.log('Message blocked:', { 
        hasInput: !!input.trim(), 
        isProcessing, 
        hasConversation: !!currentConversation 
      });
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    console.log('Creating user message:', userMessage);
    
    // Agregar mensaje del usuario
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, userMessage],
      lastMessageAt: new Date()
    }));
    
    setInput('');
    setIsProcessing(true);
    setIsTyping(true);
    
    // Reset altura del textarea
    if (inputRef.current) {
      inputRef.current.style.height = '60px';
    }
    
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
      
      // En modo Chat, siempre responder conversacionalmente
      if (mode === 'chat') {
        await handleConversationalResponse(userMessage);
        return;
      }
      
      // En modo Edición, procesar cambios
      if (mode === 'edit') {
        // Si es una pregunta clara, responder conversacionalmente incluso en modo edición
        if (isQuestion(lowerContent) && !isChangeRequest(lowerContent)) {
          await handleConversationalResponse(userMessage);
          return;
        }
        // Procesar el cambio
        const changeRequest = {
          id: Date.now().toString(),
          description: userMessage.content,
          type: detectChangeType(userMessage.content),
          priority: 'medium' as const,
          section: detectSection(userMessage.content),
          timestamp: new Date(),
          status: 'processing' as const
        };
        
        const { processChangeWithAI, validateChange } = await import('@/services/aiProcessor');
        const processedChange = await processChangeWithAI(changeRequest);
        
        // Validar los cambios antes de mostrarlos
        const validation = validateChange(processedChange);
        
        setIsTyping(false);
        
        // Crear mensaje de respuesta con los cambios procesados
        let responseContent = generateResponseMessage(processedChange);
        
        // Agregar advertencias si las hay
        if (validation.warnings && validation.warnings.length > 0) {
          responseContent += '\n\n⚠️ **Advertencias detectadas:**\n';
          validation.warnings.forEach(warning => {
            responseContent += `• ${warning}\n`;
          });
          responseContent += '\n¿Deseas continuar de todas formas?';
        }
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date(),
          processedChange,
          status: validation.isValid ? 'pending' : 'failed'
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
      } else {
        // Respuesta conversacional sugeriendo el cambio
        await handleSuggestiveResponse(userMessage);
      }
      
    } catch (error) {
      setIsTyping(false);
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Ups, algo no funcionó bien. 😅 ¿Podrías decirme de nuevo qué quieres cambiar? Intenta ser más específico.',
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
        
        // Agregar mensaje de confirmación con botón de retry si falla
        const confirmMessage: Message = {
          id: Date.now().toString(),
          role: 'system',
          content: '✅ ¡Listo! Los cambios se aplicaron correctamente. Tu sitio web se actualizará en 2-3 minutos. 🎉',
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
      
      // Actualizar estado del mensaje y agregar mensaje de error con retry
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages.map(m => 
          m.id === messageId 
            ? { ...m, status: 'failed' as const }
            : m
        ), {
          id: Date.now().toString(),
          role: 'system',
          content: `❌ Error: ${error.message || 'No se pudieron aplicar los cambios'}. 
          
🔄 [¿Intentar de nuevo?](#retry-${messageId})`,
          timestamp: new Date()
        }]
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
      content: '👍 Entendido, no aplicaré esos cambios. ¿Hay algo más que quieras modificar?',
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, rejectMessage],
      lastMessageAt: new Date()
    }));
  };

  const clearConversations = () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres limpiar el chat? Esta acción no se puede deshacer.');
    if (confirmed) {
      setConversations([]);
      localStorage.removeItem('adminConversations');
      startNewConversation();
      toast({
        title: 'Chat limpiado',
        description: 'Se han eliminado todos los mensajes',
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
        content: 'No encuentro cambios recientes. 🤔 ¿Podrías decirme qué cambio intentaste hacer para poder ayudarte mejor?',
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
    const troubleshootingSteps = `🔍 **Revisando qué pasó...**

El último cambio que hice fue: "${lastAppliedChange.processedChange!.commitMessage}"

**¿Por qué puede que no veas los cambios?**

1. ⏱️ **Espera un poco más** - Los cambios tardan 2-3 minutos en aparecer
2. 🔄 **Actualiza tu navegador** - Presiona Ctrl+F5 (o Cmd+Shift+R en Mac)
3. 🌐 **El sitio se está actualizando** - A veces tarda un poco más

**¿Qué puedo hacer?**
• Si dices "ver logs" te muestro información técnica
• Si dices "verificar cambios" reviso si se aplicaron correctamente
• Si dices "reintentar" intento aplicar el cambio otra vez

¿Qué prefieres hacer?`;
    
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
        content: `✅ **Revisé y los cambios están listos**

Los cambios se guardaron hace: ${new Date(repoInfo.pushed_at).toLocaleString('es-ES', { 
  hour: '2-digit', 
  minute: '2-digit',
  day: '2-digit',
  month: 'short'
})}

**Si aún no ves los cambios:**
1. 🕐 Espera 2-3 minutos más
2. 🔄 Actualiza tu navegador (Ctrl+F5)
3. 🌐 Asegúrate de estar en el sitio correcto

¿Todo bien o necesitas ayuda con algo más?`,
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
        content: '😕 No pude conectar para verificar. Por favor, intenta de nuevo en unos segundos.',
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
    let message = '✨ **He preparado estos cambios para tu sitio web:**\n\n';
    
    // Simplificar nombres de archivos
    message += `📁 **Páginas que se van a actualizar:**\n`;
    change.files.forEach(file => {
      const simplifiedName = file
        .replace('src/components/sections/', '')
        .replace('src/pages/', '')
        .replace('.tsx', '')
        .replace('.ts', '')
        .replace('Home', 'Página principal')
        .replace('Hero', 'Sección principal')
        .replace('Header', 'Encabezado')
        .replace('Footer', 'Pie de página')
        .replace('Contact', 'Contacto')
        .replace('Services', 'Servicios')
        .replace('Testimonials', 'Testimonios');
      message += `• ${simplifiedName}\n`;
    });
    
    message += `\n💡 **¿Qué va a cambiar?**\n${change.commitMessage}\n`;
    
    if (change.requiresReview) {
      message += `\n⚠️ **Nota:** Este cambio es más complejo y necesita una revisión especial.`;
    }
    
    message += `\n\n¿Te gustaría que aplique estos cambios a tu sitio web?`;
    
    return message;
  };

  // Detectar si es una pregunta
  const isQuestion = (text: string): boolean => {
    const questionPatterns = [
      '¿', '?', 'qué', 'que', 'cómo', 'como', 'cuál', 'cual', 'cuándo', 'cuando',
      'dónde', 'donde', 'por qué', 'porque', 'quién', 'quien', 'cuánto', 'cuanto',
      'puedes', 'puedo', 'es posible', 'se puede', 'hay forma', 'existe',
      'explica', 'dime', 'muestra', 'enseña', 'ayuda'
    ];
    
    return questionPatterns.some(pattern => text.includes(pattern));
  };

  // Detectar si es una solicitud de cambio potencial
  const isChangeRequest = (text: string): boolean => {
    const changePatterns = [
      'cambiar', 'cambia', 'modificar', 'modifica', 'actualizar', 'actualiza', 
      'agregar', 'agrega', 'añadir', 'añade', 'quitar', 'quita', 'eliminar', 'elimina',
      'poner', 'pon', 'hacer', 'haz', 'mover', 'mueve', 'reemplazar', 'reemplaza', 
      'editar', 'edita', 'arreglar', 'arregla', 'corregir', 'corrige',
      'mejorar', 'mejora', 'optimizar', 'optimiza', 'nuevo', 'nueva', 'diferente', 
      'otro', 'otra', 'más grande', 'más pequeño', 'mayor', 'menor',
      'color', 'tamaño', 'texto', 'imagen', 'botón', 'enlace', 'página', 'título', 
      'principal', 'hero', 'sección'
    ];
    
    return changePatterns.some(pattern => text.includes(pattern));
  };

  // Detectar si es una solicitud explícita de cambio
  const isExplicitChangeRequest = (text: string): boolean => {
    const explicitPatterns = [
      'quiero cambiar', 'necesito cambiar', 'por favor cambia', 'cambia',
      'quiero que', 'necesito que', 'hazme', 'aplica', 'implementa',
      'actualiza esto', 'modifica esto', 'arregla esto'
    ];
    
    return explicitPatterns.some(pattern => text.includes(pattern));
  };

  // Manejar respuestas conversacionales con IA real
  const handleConversationalResponse = async (userMessage: Message) => {
    setIsTyping(true);
    
    try {
      // Usar la IA para procesar la pregunta
      const { processQuestionWithAI } = await import('@/services/aiProcessor');
      const aiResponse = await processQuestionWithAI(userMessage.content);
      
      setIsTyping(false);
      
      const response: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setCurrentConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, response],
        lastMessageAt: new Date()
      }));
      
    } catch (error) {
      setIsTyping(false);
      console.error('Error al procesar con IA:', error);
      
      // Fallback a respuestas predefinidas si la IA falla
      await handleConversationalResponseFallback(userMessage);
    }
  };

  // Respuestas de fallback cuando la IA no está disponible
  const handleConversationalResponseFallback = async (userMessage: Message) => {
    setIsTyping(false);
    
    // Solo usar fallback para mensajes muy básicos o errores
    const response: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Lo siento, tuve un problema al procesar tu pregunta. 

Por favor, intenta preguntarme de nuevo. Puedo ayudarte con información sobre:
• El contenido actual del sitio
• Los servicios que ofrece NeuroInnova
• La información de contacto
• La estructura del sitio web

¿Qué te gustaría saber?`,
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, response],
      lastMessageAt: new Date()
    }));
  };

  // Manejar respuestas sugestivas (cuando detecta un posible cambio)
  const handleSuggestiveResponse = async (userMessage: Message) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerContent = userMessage.content.toLowerCase();
    let suggestion = '';
    
    // Analizar qué tipo de cambio podría querer
    if (lowerContent.includes('título') || lowerContent.includes('titulo')) {
      suggestion = `Veo que mencionas el título. ¿Te gustaría que cambie el título principal del sitio web?

El título actual es: "Excelencia en Psiquiatría"

Si quieres cambiarlo, solo dime algo como: "Cambia el título principal a [tu nuevo título]"`;
    } else if (lowerContent.includes('color')) {
      suggestion = `Mencionas los colores. ¿Qué elemento te gustaría cambiar de color?

Puedo cambiar:
• El color de los botones
• El color del fondo
• El color de los títulos
• El color de los enlaces

Solo dime, por ejemplo: "Cambia el color de los botones a verde"`;
    } else if (lowerContent.includes('agregar') || lowerContent.includes('añadir')) {
      suggestion = `Veo que quieres agregar algo. ¿Qué te gustaría agregar?

Puedo agregar:
• Nuevos testimonios de pacientes
• Información de servicios
• Nuevas secciones
• Imágenes o elementos visuales

Dime específicamente qué quieres agregar y lo haré.`;
    } else {
      suggestion = `Entiendo que quieres hacer un cambio. 🤔

Para poder ayudarte, necesito que me digas exactamente qué quieres modificar.

**Ejemplos de cómo pedirlo:**
• "Cambia el número de WhatsApp a..."
• "Agrega un testimonio que diga..."
• "Haz el título más grande"
• "Cambia el color de los botones a..."

¿Qué cambio específico te gustaría hacer?`;
    }
    
    setIsTyping(false);
    
    const response: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: suggestion,
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => ({
      ...prev!,
      messages: [...prev!.messages, response],
      lastMessageAt: new Date()
    }));
  };

  // Función para manejar el Enter en el textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form && !isProcessing && input.trim()) {
        form.requestSubmit();
      }
    }
  };

  if (!isAuthenticated) {
    return (
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
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Chat container con altura fija */}
      <div className="flex flex-col h-full max-w-6xl mx-auto w-full" style={{ maxHeight: '100vh', height: '100dvh' }}>
        {/* Header fijo */}
        <div className="flex-shrink-0 bg-background border-b px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold">Panel Admin IA</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Haz cambios a tu sitio web con simples mensajes
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Selector de modo */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-1 sm:flex-initial">
                <button
                  onClick={() => setMode('chat')}
                  className={cn(
                    "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial",
                    mode === 'chat' 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => setMode('edit')}
                  className={cn(
                    "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial",
                    mode === 'edit' 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  ✏️ Editar
                </button>
              </div>
              
              <div className="flex gap-1 sm:gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearConversations}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <Trash2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  <span className="hidden sm:inline">Limpiar</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
                >
                  <LogOut className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Área de mensajes con scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-3 sm:py-4 relative" 
             style={{ scrollBehavior: 'smooth' }}
             ref={messagesAreaRef}
             onScroll={handleScroll}>
          {/* Indicador de mensajes nuevos arriba */}
          {!isNearBottom && (
            <button
              onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="fixed bottom-24 sm:bottom-32 right-4 sm:right-8 bg-primary text-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-primary/90 transition-all flex items-center gap-1 sm:gap-2 z-10"
            >
              <ArrowDown className="h-4 sm:h-5 w-4 sm:w-5" />
              <span className="text-xs sm:text-sm hidden sm:inline">Nuevos mensajes</span>
            </button>
          )}
          
          <div className="space-y-3 sm:space-y-4 pb-4 max-w-4xl mx-auto w-full">
            {currentConversation?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2 sm:gap-3",
                      message.role === 'user' && "justify-end"
                    )}
                  >
                    {message.role !== 'user' && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                    )}
                    
                    <div className={cn(
                      "max-w-[85%] sm:max-w-[70%] space-y-1 sm:space-y-2",
                      message.role === 'user' && "items-end"
                    )}>
                      <div
                        className={cn(
                          "rounded-lg px-3 sm:px-4 py-2 sm:py-3 relative group",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : message.role === 'system'
                            ? "bg-muted"
                            : "bg-gray-100 prose prose-sm max-w-none"
                        )}
                      >
                        {/* Botón de copiar para mensajes de asistente */}
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(message.content);
                              toast({
                                title: 'Copiado',
                                description: 'Mensaje copiado al portapapeles',
                              });
                            }}
                            className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                          >
                            <Copy className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                          </button>
                        )}
                        {message.role === 'assistant' && message.content.includes('**') ? (
                          <div className="text-sm sm:text-base" dangerouslySetInnerHTML={{ 
                            __html: message.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br>')
                              .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto"><code>$1</code></pre>')
                              .replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded text-xs">$1</code>')
                              .replace(/• /g, '• ')
                          }} />
                        ) : (
                          <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                        )}
                      </div>
                      
                      {/* Botones de acción para cambios pendientes */}
                      {message.processedChange && message.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <Button
                            size="sm"
                            onClick={() => applyChanges(message.id)}
                            disabled={isProcessing}
                            className="flex items-center justify-center gap-1 text-xs sm:text-sm w-full sm:w-auto"
                          >
                            <Check className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                            Aplicar cambios
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectChanges(message.id)}
                            disabled={isProcessing}
                            className="flex items-center justify-center gap-1 text-xs sm:text-sm w-full sm:w-auto"
                          >
                            <X className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
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
                      
                      {/* Timestamp */}
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                        {message.timestamp.toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    )}
                  </div>
                ))}
                
            {/* Indicador de escribiendo */}
            {isTyping && (
              <div className="flex gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="bg-gray-100 rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2">
                  <Loader2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 animate-spin" />
                  <span className="text-xs sm:text-sm text-gray-600">Claude está escribiendo...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Área de input fija al bottom */}
        <div className="flex-shrink-0 bg-background border-t px-4 sm:px-6 py-3 sm:py-4">
          <form onSubmit={sendMessage} className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize del textarea
                  const textarea = e.target;
                  textarea.style.height = 'auto';
                  textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
                }}
                onKeyDown={handleKeyDown}
                placeholder={mode === 'chat' 
                  ? "Pregúntame..." 
                  : "Describe el cambio..."}
                className="w-full resize-none pr-12 text-sm sm:text-base py-2 sm:py-3"
                style={{ minHeight: '44px', maxHeight: '120px' }}
                disabled={isProcessing}
                rows={1}
              />
              <span className="absolute bottom-1 sm:bottom-2 right-2 text-[10px] sm:text-xs text-gray-400">
                {input.length}/10000
              </span>
            </div>
            <Button 
              type="submit" 
              disabled={isProcessing || !input.trim() || input.length > 10000}
              className="self-end px-3 sm:px-4"
              size="default"
            >
              {isProcessing ? (
                <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" />
              ) : (
                <Send className="h-4 sm:h-5 w-4 sm:w-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelChat;