import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Lock, Send, Clock, FileText, Eye, RotateCcw } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'neuroinnova2024';

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
}

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [changeRequest, setChangeRequest] = useState<Partial<ChangeRequest>>({
    type: 'content',
    priority: 'medium',
    section: 'homepage'
  });
  const [changeHistory, setChangeHistory] = useState<ChangeRequest[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedChange, setProcessedChange] = useState<ProcessedChange | null>(null);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      toast({
        title: 'Acceso concedido',
        description: 'Bienvenido al panel de administración',
      });
    } else {
      setAuthError('Contraseña incorrecta');
    }
  };

  const handleSubmitChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeRequest.description) {
      toast({
        title: 'Error',
        description: 'Por favor describe el cambio que deseas realizar',
        variant: 'destructive',
      });
      return;
    }

    const newRequest: ChangeRequest = {
      id: Date.now().toString(),
      description: changeRequest.description,
      type: changeRequest.type as ChangeRequest['type'],
      priority: changeRequest.priority as ChangeRequest['priority'],
      section: changeRequest.section || 'homepage',
      timestamp: new Date(),
      status: 'processing'
    };

    setChangeHistory(prev => [newRequest, ...prev]);
    setIsProcessing(true);

    try {
      // Simulación de procesamiento
      const processed = await processChangeRequest(newRequest);
      setProcessedChange(processed);
      
      // Actualizar estado del request
      setChangeHistory(prev => 
        prev.map(req => 
          req.id === newRequest.id 
            ? { ...req, status: 'completed' } 
            : req
        )
      );

      toast({
        title: 'Cambio procesado',
        description: 'Revisa los cambios propuestos antes de aplicar',
      });
    } catch (error) {
      setChangeHistory(prev => 
        prev.map(req => 
          req.id === newRequest.id 
            ? { ...req, status: 'failed' } 
            : req
        )
      );
      
      toast({
        title: 'Error al procesar',
        description: 'No se pudo procesar la solicitud de cambio',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processChangeRequest = async (request: ChangeRequest): Promise<ProcessedChange> => {
    // Usar el servicio de procesamiento de AI
    const { processChangeWithAI } = await import('@/services/aiProcessor');
    return processChangeWithAI(request);
  };

  const applyChanges = async () => {
    // Importar las instrucciones de despliegue
    const { getDeploymentInstructions } = await import('@/services/aiProcessor');
    const instructions = getDeploymentInstructions();
    
    toast({
      title: 'Cambios aplicados',
      description: 'Los cambios se han guardado localmente. Revisa las instrucciones de despliegue.',
    });
    
    // Mostrar instrucciones de despliegue
    alert(instructions);
    
    setProcessedChange(null);
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
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-gray-600">
            Solicita cambios al sitio web usando lenguaje natural
          </p>
        </div>

        <Tabs defaultValue="new-change" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new-change">Nueva Solicitud</TabsTrigger>
            <TabsTrigger value="preview">Vista Previa</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="new-change">
            <Card>
              <CardHeader>
                <CardTitle>Solicitar Cambio</CardTitle>
                <CardDescription>
                  Describe el cambio que deseas realizar en lenguaje natural
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitChange} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del cambio</Label>
                    <Textarea
                      id="description"
                      placeholder="Ejemplo: Cambiar el título del hero para enfatizar que somos el único centro con EMT/TMS en Paraguay"
                      className="min-h-[100px]"
                      value={changeRequest.description || ''}
                      onChange={(e) => setChangeRequest(prev => ({
                        ...prev,
                        description: e.target.value
                      }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de cambio</Label>
                      <Select
                        value={changeRequest.type}
                        onValueChange={(value) => setChangeRequest(prev => ({
                          ...prev,
                          type: value as ChangeRequest['type']
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="content">Contenido/Texto</SelectItem>
                          <SelectItem value="design">Diseño/Estilos</SelectItem>
                          <SelectItem value="functionality">Funcionalidad</SelectItem>
                          <SelectItem value="structure">Estructura/Navegación</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select
                        value={changeRequest.priority}
                        onValueChange={(value) => setChangeRequest(prev => ({
                          ...prev,
                          priority: value as ChangeRequest['priority']
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baja</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="urgent">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="section">Sección afectada</Label>
                      <Select
                        value={changeRequest.section}
                        onValueChange={(value) => setChangeRequest(prev => ({
                          ...prev,
                          section: value
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homepage">Homepage</SelectItem>
                          <SelectItem value="hero">Hero Section</SelectItem>
                          <SelectItem value="services">Servicios</SelectItem>
                          <SelectItem value="testimonials">Testimonios</SelectItem>
                          <SelectItem value="contact">Contacto</SelectItem>
                          <SelectItem value="header">Header/Navegación</SelectItem>
                          <SelectItem value="footer">Footer</SelectItem>
                          <SelectItem value="service-pages">Páginas de Servicios</SelectItem>
                          <SelectItem value="condition-pages">Páginas de Condiciones</SelectItem>
                          <SelectItem value="assessments">Autoevaluaciones</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Alert>
                    <AlertDescription>
                      <strong>Ejemplos de cambios:</strong>
                      <ul className="mt-2 list-disc list-inside text-sm">
                        <li>Actualizar el número de WhatsApp a (+595) 991 800 886</li>
                        <li>Agregar un nuevo testimonio en la sección testimonios</li>
                        <li>Cambiar el color principal del sitio</li>
                        <li>Agregar una nueva condición a la lista de tratamientos</li>
                        <li>Cambiar el título del hero para enfatizar EMT/TMS</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Procesar Cambio
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa de Cambios</CardTitle>
                <CardDescription>
                  Revisa los cambios propuestos antes de aplicarlos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {processedChange ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Archivos a modificar:</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {processedChange.files.map((file, i) => (
                          <li key={i}>{file}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Cambios propuestos:</h3>
                      {processedChange.changes.map((change, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-sm font-medium mb-2">{change.file}:{change.lineStart}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Antes:</p>
                              <pre className="bg-red-50 p-2 rounded text-xs overflow-x-auto">
                                <code>{change.oldCode}</code>
                              </pre>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Después:</p>
                              <pre className="bg-green-50 p-2 rounded text-xs overflow-x-auto">
                                <code>{change.newCode}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Mensaje de commit:</h3>
                      <p className="text-sm text-gray-600">{processedChange.commitMessage}</p>
                    </div>

                    {processedChange.requiresReview && (
                      <Alert>
                        <AlertDescription>
                          Este cambio requiere revisión manual antes de aplicar
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-4">
                      <Button onClick={applyChanges} className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        Aplicar Cambios
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setProcessedChange(null)}
                        className="flex-1"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No hay cambios pendientes de revisión
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Cambios</CardTitle>
                <CardDescription>
                  Registro de todas las solicitudes de cambio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {changeHistory.length > 0 ? (
                  <div className="space-y-4">
                    {changeHistory.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{request.description}</p>
                            <p className="text-sm text-gray-500">
                              {request.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            request.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            request.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status === 'completed' ? 'Completado' :
                             request.status === 'processing' ? 'Procesando' :
                             request.status === 'failed' ? 'Fallido' : 'Pendiente'}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>Tipo: {request.type}</span>
                          <span>Prioridad: {request.priority}</span>
                          <span>Sección: {request.section}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No hay cambios registrados
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}