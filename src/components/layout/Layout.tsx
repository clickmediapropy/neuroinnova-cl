import { ReactNode } from "react";
import Header from "./Header";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import VoiceBotWidget from "../ui/VoiceBotWidget";
import FirstVisitTooltip from "../ui/FirstVisitTooltip";

interface LayoutProps {
  children: ReactNode;
  isHomePage?: boolean;
}

const Layout = ({ children, isHomePage = false }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      {isHomePage ? <HomeHeader /> : <Header />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <VoiceBotWidget />
      <FirstVisitTooltip />
    </div>
  );
};

export default Layout;