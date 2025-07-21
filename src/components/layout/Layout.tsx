import { ReactNode } from "react";
import Header from "./Header";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import VoiceBotWidget from "../ui/VoiceBotWidget";
import FirstVisitTooltip from "../ui/FirstVisitTooltip";
import FloatingActions from "../ui/FloatingActions";
import { AuroraBackgroundMedical } from "../ui/aurora-background-medical";

interface LayoutProps {
  children: ReactNode;
  isHomePage?: boolean;
  auroraIntensity?: 'low' | 'medium' | 'high' | 'none';
}

const Layout = ({ children, isHomePage = false, auroraIntensity = 'low' }: LayoutProps) => {
  const LayoutContent = () => (
    <div className="flex min-h-screen flex-col relative z-10">
      {isHomePage ? <HomeHeader /> : <Header />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <VoiceBotWidget />
      <FirstVisitTooltip />
      <FloatingActions />
    </div>
  );

  if (auroraIntensity === 'none') {
    return <LayoutContent />;
  }

  return (
    <AuroraBackgroundMedical 
      intensity={auroraIntensity}
      showRadialGradient={false}
      className="min-h-screen"
    >
      <LayoutContent />
    </AuroraBackgroundMedical>
  );
};

export default Layout;