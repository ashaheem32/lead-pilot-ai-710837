import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { Onboarding } from './Onboarding';
import { useLeads } from '../context/LeadContext';
import { cn } from '../lib/utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { showOnboarding } = useLeads();

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      {showOnboarding && <Onboarding />}
      
      {/* Mobile Sidebar Overlay */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[45] md:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}
      
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header 
          isSidebarCollapsed={isSidebarCollapsed}
          onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        
        <main className={cn(
          "flex-1 p-4 md:p-8 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 duration-500",
          isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
        )}>
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>

        <Footer isSidebarCollapsed={isSidebarCollapsed} />
      </div>
    </div>
  );
};
