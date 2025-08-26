// Sistema de puntuación clínica validado para interpretación inequívoca de resultados
// Basado en los rangos clínicos estandarizados internacionalmente

export interface ScoreRange {
  min: number;
  max: number;
  categoria: string;
  descripcion_problema: string;
  solucion_recomendada: string;
}

export interface TestConfiguration {
  nombre_test: string;
  rangos: ScoreRange[];
}

// Mapeo de tipos de evaluación internos a nombres de test clínicos
export const testTypeMapping: Record<string, string> = {
  'depression': 'PHQ-9',
  'anxiety': 'GAD-7',
  'bipolar': 'MDQ',
  'ptsd': 'PCL-5',
  'psychosis': 'PQ-B',
  'addiction': 'AUDIT-10',
  'eatingDisorder': 'SWED',
  'parentChildMentalHealth': 'PSC-35-P',
  'adhd': 'ASRS-v1.1',
  'postpartumDepression': 'EPDS',
  'youthMentalHealth': 'PSC-35-Y'
};

// Configuración completa de rangos clínicos validados
export const clinicalScoringData: Record<string, TestConfiguration> = {
  'PHQ-9': {
    nombre_test: 'PHQ-9',
    rangos: [
      {
        min: 0,
        max: 4,
        categoria: 'Mínima o ninguna',
        descripcion_problema: 'Puntuación indica ausencia o mínima presencia de síntomas depresivos clínicamente significativos.',
        solucion_recomendada: 'No se requiere evaluación clínica inmediata; mantener observación.'
      },
      {
        min: 5,
        max: 9,
        categoria: 'Leve',
        descripcion_problema: 'Presencia de síntomas depresivos leves; riesgo bajo de disfunción grave.',
        solucion_recomendada: 'Monitorear síntomas y considerar intervenciones psicosociales de bajo nivel.'
      },
      {
        min: 10,
        max: 14,
        categoria: 'Moderada',
        descripcion_problema: 'Síntomas moderados de depresión que seguramente afectan la vida diaria.',
        solucion_recomendada: 'Evaluación clínica formal y posible inicio de tratamiento.'
      },
      {
        min: 15,
        max: 19,
        categoria: 'Moderadamente severa',
        descripcion_problema: 'Depresión moderadamente severa con impacto funcional significativo.',
        solucion_recomendada: 'Buscar atención especializada y posible tratamiento integral.'
      },
      {
        min: 20,
        max: 27,
        categoria: 'Severa',
        descripcion_problema: 'Depresión severa con alto riesgo y disfunción grave.',
        solucion_recomendada: 'Intervención urgente con profesional de salud mental.'
      }
    ]
  },
  'GAD-7': {
    nombre_test: 'GAD-7',
    rangos: [
      {
        min: 0,
        max: 4,
        categoria: 'Mínima o ninguna',
        descripcion_problema: 'No hay síntomas significativos de ansiedad clínica.',
        solucion_recomendada: 'No se requiere intervención; mantener vigilancia.'
      },
      {
        min: 5,
        max: 9,
        categoria: 'Leve',
        descripcion_problema: 'Ansiedad leve sin impacto significativo.',
        solucion_recomendada: 'Monitorear y brindar apoyo psicosocial.'
      },
      {
        min: 10,
        max: 14,
        categoria: 'Moderada',
        descripcion_problema: 'Ansiedad moderada con síntomas que afectan funcionalidad.',
        solucion_recomendada: 'Evaluación y posible tratamiento clínico.'
      },
      {
        min: 15,
        max: 21,
        categoria: 'Severa',
        descripcion_problema: 'Ansiedad severa que afecta significativamente la vida del paciente.',
        solucion_recomendada: 'Atención rápida con especialistas.'
      }
    ]
  },
  'MDQ': {
    nombre_test: 'MDQ',
    rangos: [
      {
        min: 0,
        max: 6,
        categoria: 'Screening negativo',
        descripcion_problema: 'No se cumplen criterios para posible trastorno bipolar.',
        solucion_recomendada: 'No se requieren evaluaciones adicionales inmediatas.'
      },
      {
        min: 7,
        max: 100,
        categoria: 'Screening positivo',
        descripcion_problema: 'Criterios cumplidos sugieren posible trastorno bipolar.',
        solucion_recomendada: 'Evaluación clínica diagnóstica recomendada.'
      }
    ]
  },
  'PCL-5': {
    nombre_test: 'PCL-5',
    rangos: [
      {
        min: 0,
        max: 10,
        categoria: 'Mínimo',
        descripcion_problema: 'Síntomas mínimos de estrés postraumático.',
        solucion_recomendada: 'Continuar seguimiento y monitoreo rutinario.'
      },
      {
        min: 11,
        max: 22,
        categoria: 'Leve',
        descripcion_problema: 'Síntomas leves de PTSD que pueden requerir atención.',
        solucion_recomendada: 'Considerar apoyo psicosocial y técnicas de manejo del estrés.'
      },
      {
        min: 23,
        max: 32,
        categoria: 'Moderado',
        descripcion_problema: 'Síntomas moderados de PTSD con impacto funcional.',
        solucion_recomendada: 'Evaluación clínica recomendada y posible inicio de terapia.'
      },
      {
        min: 33,
        max: 44,
        categoria: 'Severo',
        descripcion_problema: 'Síntomas severos de PTSD que afectan significativamente la vida.',
        solucion_recomendada: 'Derivación urgente a especialista en trauma.'
      },
      {
        min: 45,
        max: 80,
        categoria: 'Muy severo',
        descripcion_problema: 'Síntomas muy severos de PTSD con alto riesgo y disfunción grave.',
        solucion_recomendada: 'Intervención inmediata con equipo especializado en trauma.'
      }
    ]
  },
  'PQ-B': {
    nombre_test: 'PQ-B',
    rangos: [
      {
        min: 0,
        max: 2,
        categoria: 'Riesgo bajo',
        descripcion_problema: 'No se detecta riesgo clínico importante de psicosis temprana.',
        solucion_recomendada: 'Monitorear síntomas y seguimiento rutinario.'
      },
      {
        min: 3,
        max: 21,
        categoria: 'Riesgo alto',
        descripcion_problema: 'Puntuación indica posible riesgo elevado de psicosis temprana.',
        solucion_recomendada: 'Se recomienda evaluación especializada inmediata.'
      }
    ]
  },
  'AUDIT-10': {
    nombre_test: 'AUDIT-10',
    rangos: [
      {
        min: 0,
        max: 7,
        categoria: 'Bajo riesgo',
        descripcion_problema: 'Consumo de alcohol dentro de límites de bajo riesgo.',
        solucion_recomendada: 'Mantener educación preventiva y monitoreo periódico.'
      },
      {
        min: 8,
        max: 15,
        categoria: 'Riesgo medio',
        descripcion_problema: 'Consumo de alcohol que puede derivar en problemas de salud.',
        solucion_recomendada: 'Intervención breve y consejería sobre reducción de consumo.'
      },
      {
        min: 16,
        max: 19,
        categoria: 'Alto riesgo',
        descripcion_problema: 'Consumo nocivo de alcohol con consecuencias negativas.',
        solucion_recomendada: 'Evaluación completa y consejería intensiva.'
      },
      {
        min: 20,
        max: 40,
        categoria: 'Posible dependencia',
        descripcion_problema: 'Alta probabilidad de dependencia al alcohol.',
        solucion_recomendada: 'Derivar urgentemente para tratamiento especializado.'
      }
    ]
  },
  'SWED': {
    nombre_test: 'SWED',
    rangos: [
      {
        min: 0,
        max: 7,
        categoria: 'Riesgo bajo',
        descripcion_problema: 'No hay indicios clínicos importantes de trastorno alimentario.',
        solucion_recomendada: 'Mantener monitoreo; promover hábitos saludables.'
      },
      {
        min: 8,
        max: 13,
        categoria: 'Riesgo moderado',
        descripcion_problema: 'Presencia de algunos comportamientos o pensamientos preocupantes sobre alimentación.',
        solucion_recomendada: 'Considerar evaluación profesional y apoyo psicológico.'
      },
      {
        min: 14,
        max: 20,
        categoria: 'Riesgo alto',
        descripcion_problema: 'Indicativo de riesgo elevado de trastorno alimentario.',
        solucion_recomendada: 'Se recomienda consulta especializada psiquiátrica o nutricional urgente.'
      }
    ]
  },
  'PSC-35-P': {
    nombre_test: 'PSC-35 (Padres)',
    rangos: [
      {
        min: 0,
        max: 27,
        categoria: 'Funcional sin dificultades',
        descripcion_problema: 'Sin signos significativos de disfunción psicosocial en su hijo/a.',
        solucion_recomendada: 'Continuar monitoreo habitual.'
      },
      {
        min: 28,
        max: 70,
        categoria: 'Funcional con dificultades',
        descripcion_problema: 'Disfunción psicosocial presente que puede requerir apoyo.',
        solucion_recomendada: 'Evaluar con profesional especializado en salud mental infantil.'
      }
    ]
  },
  'PSC-35-Y': {
    nombre_test: 'PSC-35 (Jóvenes)',
    rangos: [
      {
        min: 0,
        max: 29,
        categoria: 'Funcional sin dificultades',
        descripcion_problema: 'Sin signos significativos de disfunción psicosocial.',
        solucion_recomendada: 'Continuar monitoreo habitual.'
      },
      {
        min: 30,
        max: 105,
        categoria: 'Funcional con dificultades',
        descripcion_problema: 'Disfunción psicosocial presente que puede requerir apoyo.',
        solucion_recomendada: 'Buscar evaluación con profesional de salud mental.'
      }
    ]
  },
  'ASRS-v1.1': {
    nombre_test: 'ASRS-v1.1',
    rangos: [
      {
        min: 0,
        max: 18,
        categoria: 'Bajo negativo',
        descripcion_problema: 'Poca o ninguna evidencia de síntomas clínicos significativos de TDAH.',
        solucion_recomendada: 'No requiere evaluación específica para TDAH.'
      },
      {
        min: 19,
        max: 26,
        categoria: 'Alto negativo',
        descripcion_problema: 'Síntomas leves o ausencia de TDAH significativo.',
        solucion_recomendada: 'Monitoreo y evaluación si persisten síntomas.'
      },
      {
        min: 27,
        max: 35,
        categoria: 'Bajo positivo',
        descripcion_problema: 'Síntomas compatibles con diagnóstico de TDAH, moderados en severidad.',
        solucion_recomendada: 'Evaluación clínica para confirmar diagnóstico.'
      },
      {
        min: 36,
        max: 48,
        categoria: 'Alto positivo',
        descripcion_problema: 'Alta probabilidad de TDAH con síntomas clínicamente relevantes.',
        solucion_recomendada: 'Consulta urgente con especialista en TDAH recomendada.'
      },
      {
        min: 49,
        max: 72,
        categoria: 'Muy alto positivo',
        descripcion_problema: 'Síntomas severos y persistentes compatibles con diagnóstico de TDAH.',
        solucion_recomendada: 'Intervención inmediata y tratamiento especializado necesario.'
      }
    ]
  },
  'EPDS': {
    nombre_test: 'EPDS',
    rangos: [
      {
        min: 0,
        max: 6,
        categoria: 'Nula o mínima',
        descripcion_problema: 'No se detectan síntomas de depresión posparto.',
        solucion_recomendada: 'No requiere intervención clínica inmediata.'
      },
      {
        min: 7,
        max: 13,
        categoria: 'Leve',
        descripcion_problema: 'Presencia de síntomas leves de depresión posparto.',
        solucion_recomendada: 'Seguimiento y apoyo psicosocial recomendados.'
      },
      {
        min: 14,
        max: 19,
        categoria: 'Moderada',
        descripcion_problema: 'Depresión posparto moderada presente.',
        solucion_recomendada: 'Consultas clínicas y posible tratamiento terapéutico.'
      },
      {
        min: 20,
        max: 30,
        categoria: 'Severa',
        descripcion_problema: 'Depresión posparto severa con posible impacto grave.',
        solucion_recomendada: 'Intervención especializada urgente y seguimiento.'
      }
    ]
  }
};

// Función para obtener la interpretación clínica del puntaje
export function getClinicalInterpretation(assessmentType: string, score: number): {
  testName: string;
  score: number;
  categoria: string;
  descripcion_problema: string;
  solucion_recomendada: string;
} | null {
  // Mapear el tipo de evaluación al nombre del test clínico
  const testName = testTypeMapping[assessmentType];
  if (!testName) {
    console.error(`No se encontró mapeo para el tipo de evaluación: ${assessmentType}`);
    return null;
  }

  // Obtener la configuración del test
  const testConfig = clinicalScoringData[testName];
  if (!testConfig) {
    console.error(`No se encontró configuración para el test: ${testName}`);
    return null;
  }

  // Buscar el rango correspondiente al puntaje
  const scoreRange = testConfig.rangos.find(rango => 
    score >= rango.min && score <= rango.max
  );

  if (!scoreRange) {
    console.error(`No se encontró rango para el puntaje ${score} en el test ${testName}`);
    return null;
  }

  return {
    testName,
    score,
    categoria: scoreRange.categoria,
    descripcion_problema: scoreRange.descripcion_problema,
    solucion_recomendada: scoreRange.solucion_recomendada
  };
}

// Función auxiliar para obtener el color de severidad según la categoría
export function getSeverityColor(categoria: string): 'success' | 'warning' | 'destructive' {
  const lowerCategoria = categoria.toLowerCase();
  
  // Categorías que indican bajo riesgo o ausencia de síntomas
  if (
    lowerCategoria.includes('mínima') ||
    lowerCategoria.includes('ninguna') ||
    lowerCategoria.includes('bajo riesgo') ||
    lowerCategoria.includes('baja probabilidad') ||
    lowerCategoria.includes('negativo') ||
    lowerCategoria.includes('bajo negativo') ||
    lowerCategoria.includes('alto negativo') ||
    lowerCategoria.includes('nula') ||
    lowerCategoria.includes('funcional sin dificultades')
  ) {
    return 'success';
  }
  
  // Categorías que indican riesgo moderado o síntomas moderados
  if (
    lowerCategoria.includes('leve') ||
    lowerCategoria.includes('moderada') ||
    lowerCategoria.includes('bajo positivo') ||
    lowerCategoria.includes('funcional con dificultades')
  ) {
    return 'warning';
  }
  
  // Categorías que indican alto riesgo o síntomas severos
  return 'destructive';
}

// Función para validar que el puntaje esté dentro del rango esperado
export function validateScore(assessmentType: string, score: number): {
  isValid: boolean;
  minScore: number;
  maxScore: number;
  message?: string;
} {
  const testName = testTypeMapping[assessmentType];
  if (!testName) {
    return {
      isValid: false,
      minScore: 0,
      maxScore: 0,
      message: `Tipo de evaluación no reconocido: ${assessmentType}`
    };
  }

  const testConfig = clinicalScoringData[testName];
  if (!testConfig) {
    return {
      isValid: false,
      minScore: 0,
      maxScore: 0,
      message: `No se encontró configuración para el test: ${testName}`
    };
  }

  // Obtener el rango mínimo y máximo del test
  const minScore = Math.min(...testConfig.rangos.map(r => r.min));
  const maxScore = Math.max(...testConfig.rangos.map(r => r.max));

  const isValid = score >= minScore && score <= maxScore;
  
  return {
    isValid,
    minScore,
    maxScore,
    message: isValid ? undefined : `Puntaje ${score} fuera del rango válido (${minScore}-${maxScore}) para ${testName}`
  };
}