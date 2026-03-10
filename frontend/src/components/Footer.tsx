import React from 'react';
import { cn } from '../lib/utils';

interface FooterProps {
  isSidebarCollapsed: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isSidebarCollapsed }) => {
  return (
    <footer className={cn(
      "py-10 border-t border-slate-200 transition-all duration-300 px-4 md:px-8",
      isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
    )}>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400 font-medium">
        <div className="flex items-center gap-4">
          <span className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">LeadPilot AI v1.0</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <p>Built on <span className="text-[#4f6ef7] font-semibold">Mattr</span></p>
        </div>

        <nav className="flex items-center gap-8">
          <a href="#" className="hover:text-[#4f6ef7] transition-colors">How It Works</a>
          <a href="#" className="hover:text-[#4f6ef7] transition-colors">About</a>
          <a href="#" className="hover:text-[#4f6ef7] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#4f6ef7] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#4f6ef7] transition-colors">Support</a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
          <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">System Status: Operational</span>
        </div>
      </div>
    </footer>
  );
};
