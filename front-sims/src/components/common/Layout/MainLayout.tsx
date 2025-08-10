import React, { type ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-lightBg">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 md:px-5 md:py-7 max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;