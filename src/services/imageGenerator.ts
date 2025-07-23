// Servicio para generación de imágenes con DALL-E
interface ImageGenerationRequest {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
  format?: 'url' | 'b64_json';
}

interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  imageData?: string;
  error?: string;
  revisedPrompt?: string;
}

interface GitHubImageUpload {
  success: boolean;
  filePath?: string;
  commitSha?: string;
  error?: string;
}

// Configuración de la API
const IMAGE_CONFIG = {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || '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',
  apiUrl: 'https://api.openai.com/v1/images/generations',
  defaultSize: '1024x1024' as const,
  defaultQuality: 'standard' as const,
  defaultStyle: 'vivid' as const,
  maxRetries: 3,
  retryDelay: 2000,
};

// Generar imagen con DALL-E
export async function generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= IMAGE_CONFIG.maxRetries; attempt++) {
    try {
      console.log(`🎨 Generando imagen (intento ${attempt}/${IMAGE_CONFIG.maxRetries}):`, request.prompt);
      
      const response = await fetch(IMAGE_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${IMAGE_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: request.prompt,
          size: request.size || IMAGE_CONFIG.defaultSize,
          quality: request.quality || IMAGE_CONFIG.defaultQuality,
          style: request.style || IMAGE_CONFIG.defaultStyle,
          response_format: request.format || 'url',
          n: 1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const imageData = data.data[0];
        
        return {
          success: true,
          imageUrl: imageData.url,
          imageData: imageData.b64_json,
          revisedPrompt: data.data[0].revised_prompt
        };
      } else {
        throw new Error('No image data received from API');
      }

    } catch (error: any) {
      lastError = error;
      console.error(`Error en intento ${attempt}:`, error.message);
      
      if (attempt < IMAGE_CONFIG.maxRetries) {
        const delay = IMAGE_CONFIG.retryDelay * Math.pow(1.5, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Failed to generate image after all attempts'
  };
}

// Descargar imagen desde URL
async function downloadImage(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  return await response.arrayBuffer();
}

// Convertir ArrayBuffer a base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Generar nombre de archivo único
function generateFileName(prompt: string, extension: string = 'png'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const sanitizedPrompt = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  
  return `generated-${sanitizedPrompt}-${timestamp}.${extension}`;
}

// Subir imagen a GitHub
export async function uploadImageToGitHub(
  imageUrl: string, 
  prompt: string, 
  fileName?: string
): Promise<GitHubImageUpload> {
  try {
    console.log('📤 Subiendo imagen a GitHub...');
    
    // Descargar la imagen
    const imageBuffer = await downloadImage(imageUrl);
    const base64Image = arrayBufferToBase64(imageBuffer);
    
    // Generar nombre de archivo
    const finalFileName = fileName || generateFileName(prompt);
    const filePath = `public/images/generated/${finalFileName}`;
    
    // Subir a GitHub usando el servicio existente
    const { applyChangesToGitHub } = await import('./githubService');
    
    const result = await applyChangesToGitHub(
      [{
        file: filePath,
        oldCode: '', // Archivo nuevo
        newCode: base64Image,
        lineStart: 1,
        lineEnd: 1
      }],
      `feat: agregar imagen generada por IA - ${prompt.substring(0, 50)}...`
    );
    
    if (result.success) {
      return {
        success: true,
        filePath: filePath,
        commitSha: result.commitSha
      };
    } else {
      return {
        success: false,
        error: result.error || 'Failed to upload to GitHub'
      };
    }
    
  } catch (error: any) {
    console.error('Error uploading image to GitHub:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Función principal para generar y subir imagen
export async function generateAndUploadImage(
  prompt: string,
  options?: {
    size?: '1024x1024' | '1792x1024' | '1024x1792';
    quality?: 'standard' | 'hd';
    style?: 'vivid' | 'natural';
    fileName?: string;
  }
): Promise<{
  success: boolean;
  imageUrl?: string;
  filePath?: string;
  commitSha?: string;
  error?: string;
  revisedPrompt?: string;
}> {
  try {
    // Generar la imagen
    const generationResult = await generateImage({
      prompt,
      size: options?.size,
      quality: options?.quality,
      style: options?.style
    });
    
    if (!generationResult.success || !generationResult.imageUrl) {
      return {
        success: false,
        error: generationResult.error || 'Failed to generate image'
      };
    }
    
    // Subir a GitHub
    const uploadResult = await uploadImageToGitHub(
      generationResult.imageUrl,
      prompt,
      options?.fileName
    );
    
    if (!uploadResult.success) {
      return {
        success: false,
        error: uploadResult.error || 'Failed to upload image'
      };
    }
    
    return {
      success: true,
      imageUrl: generationResult.imageUrl,
      filePath: uploadResult.filePath,
      commitSha: uploadResult.commitSha,
      revisedPrompt: generationResult.revisedPrompt
    };
    
  } catch (error: any) {
    console.error('Error in generateAndUploadImage:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Función para obtener URL pública de la imagen
export function getPublicImageUrl(filePath: string): string {
  // Asumiendo que el sitio está desplegado en Vercel
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://neuroinnova.com.py' 
    : 'http://localhost:5173';
  
  return `${baseUrl}/${filePath.replace('public/', '')}`;
}

// Validar prompt de imagen
export function validateImagePrompt(prompt: string): { isValid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { isValid: false, error: 'El prompt no puede estar vacío' };
  }
  
  if (prompt.length > 1000) {
    return { isValid: false, error: 'El prompt es demasiado largo (máximo 1000 caracteres)' };
  }
  
  // Verificar contenido inapropiado
  const inappropriateWords = ['nude', 'naked', 'violence', 'blood', 'gore', 'explicit'];
  const lowerPrompt = prompt.toLowerCase();
  
  for (const word of inappropriateWords) {
    if (lowerPrompt.includes(word)) {
      return { isValid: false, error: 'El prompt contiene contenido inapropiado' };
    }
  }
  
  return { isValid: true };
} 