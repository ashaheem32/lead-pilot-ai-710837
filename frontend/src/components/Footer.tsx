import React from 'react';
import { cn } from '../lib/utils';

interface FooterProps {
  isSidebarCollapsed: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isSidebarCollapsed }) => {
  return (
    <footer className={cn(
      "py-8 border-t border-border transition-all duration-300 px-4 md:px-8",
      isSidebarCollapsed ? "sm:ml-20" : "sm:ml-64",
      "ml-0"
    )}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium">
        <div className="flex items-center gap-4">
          <span className="text-foreground font-bold uppercase tracking-widest text-[10px]">LeadPilot AI v1.0</span>
        </div>

        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40"></div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Operational</span>
        </div>
      </div>
    </footer>
  );
};