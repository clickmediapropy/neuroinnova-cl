import { ReactNode } from "react";
import Header from "./Header";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import FloatingActions from "../ui/FloatingActions";

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
      <FloatingActions />
    </div>
  );
};

export default Layout;