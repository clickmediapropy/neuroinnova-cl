import React from "react";
import { AuroraBackgroundDemo } from "@/components/demo/aurora-background-demo";
import { AuroraNeuroInnovaDemo } from "@/components/demo/aurora-neuroinnova-demo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuroraDemo = () => {
  const [showNeuroInnovaVersion, setShowNeuroInnovaVersion] = React.useState(false);

  return (
    <div className="min-h-screen">
      {/* Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setShowNeuroInnovaVersion(!showNeuroInnovaVersion)}
          variant="outline"
          className="bg-white/80 backdrop-blur-sm"
        >
          {showNeuroInnovaVersion ? "Ver Demo Original" : "Ver Demo NeuroInnova"}
        </Button>
      </div>

      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
          <Link to="/">← Volver al Inicio</Link>
        </Button>
      </div>

      {/* Render the selected demo */}
      {showNeuroInnovaVersion ? <AuroraNeuroInnovaDemo /> : <AuroraBackgroundDemo />}
    </div>
  );
};

export default AuroraDemo;