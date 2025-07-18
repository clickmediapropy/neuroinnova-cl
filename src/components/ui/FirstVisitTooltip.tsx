import { useEffect, useState } from "react";
import { X, MessageCircle, ArrowDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FirstVisitTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the tooltip before
    const hasSeenTooltip = localStorage.getItem("hasSeenBotTooltip");
    
    // Check if user has seen the tooltip before
    if (!hasSeenTooltip) {
      // Show tooltip after a short delay for better UX
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setIsVisible(true);
      }, 1000); // Reduced to 1 second for faster appearance

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setShowTooltip(false);
      // Mark as seen in localStorage
      localStorage.setItem("hasSeenBotTooltip", "true");
    }, 300);
  };

  if (!showTooltip) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Semi-transparent backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] pointer-events-auto"
            onClick={handleClose}
          />

          {/* Tooltip - top center below navbar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="fixed top-80 sm:top-96 right-4 sm:right-8 md:right-16 lg:right-24 z-[100] pointer-events-auto"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-[320px] sm:max-w-[400px] relative border border-green-400/20">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-green-400/20 blur-xl -z-10"></div>
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Cerrar mensaje"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Content */}
              <div className="text-center">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm w-fit mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  ¡Agenda tu consulta ahora!
                </h3>
                <p className="text-sm sm:text-base opacity-95 mb-6">
                  Puedes agendar tu consulta a través de nuestro bot que está en la esquina inferior derecha.
                </p>
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm opacity-80">
                    <span>Busca el botón verde</span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                      <div className="relative bg-green-500 rounded-full w-4 h-4"></div>
                    </div>
                    <span>en la esquina</span>
                  </div>
                  <motion.div
                    animate={{ 
                      x: [0, 10, 0],
                      y: [0, 10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-white/70"
                  >
                    <ArrowDownRight className="h-6 w-6 sm:h-8 sm:w-8" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FirstVisitTooltip;