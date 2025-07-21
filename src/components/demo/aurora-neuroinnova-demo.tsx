import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Brain, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AuroraNeuroInnovaDemo() {
  return (
    <AuroraBackground className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-8 items-center justify-center px-4 max-w-5xl mx-auto text-center"
      >
        <div className="flex gap-4 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Brain className="h-16 w-16 text-primary" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Zap className="h-16 w-16 text-accent" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Activity className="h-16 w-16 text-primary" />
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Tecnología de Vanguardia en Neuromodulación
        </h1>
        
        <p className="font-light text-lg md:text-2xl text-muted-foreground max-w-3xl">
          Descubra el poder de la estimulación magnética transcraneal y otras tecnologías avanzadas para el tratamiento de condiciones neurológicas y psiquiátricas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg" className="group" asChild>
            <Link to="/servicios">
              Ver Servicios
              <Zap className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link to="/autoevaluacion">
              Autoevaluación Gratuita
            </Link>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 text-sm text-muted-foreground"
        >
          Centro líder en neuromodulación en Paraguay
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}