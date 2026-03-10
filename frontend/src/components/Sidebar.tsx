import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Zap,
  Search, 
  Layers, 
  Send, 
  BarChart3,
  Brain,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: Search, label: 'Lead Finder', path: '/finder' },
  { icon: Layers, label: 'Enrichment', path: '/enrichment' },
  { icon: Send, label: 'AI SDR', path: '/outreach' },
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: Brain, label: 'AI Advisor', path: '/advisor' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <div className={cn(
      "h-screen bg-[#1a1f36] text-white flex flex-col fixed left-0 top-0 z-50 border-r border-slate-800 transition-all duration-300 shadow-2xl overflow-hidden md:translate-x-0",
      isCollapsed ? "w-20 -translate-x-full md:translate-x-0" : "w-64 translate-x-0"
    )}>
      <div className="p-6">
        <div className={cn(
          "flex items-center gap-3 mb-10 px-2 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-10 h-10 bg-[#4f6ef7] rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <Zap size={24} className="text-white fill-current" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">LeadPilot AI</h1>
              <p className="text-[10px] text-[#4f6ef7] font-semibold tracking-widest uppercase">Powered by AI</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group relative",
                isActive 
                  ? "bg-[#4f6ef7] text-white shadow-md shadow-blue-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                isCollapsed ? "justify-center px-0" : "justify-start"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={cn(
                    "transition-colors shrink-0",
                    isActive ? "text-white" : "text-slate-500 group-hover:text-white"
                  )} />
                  {!isCollapsed && (
                    <span className="animate-in fade-in slide-in-from-left-4 duration-300">
                      {item.label}
                    </span>
                  )}
                  {isActive && isCollapsed && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full shadow-lg shadow-white/50" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-1">
        <div className="pt-4 border-t border-slate-800/60">
          <button 
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all text-sm font-medium group",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings size={20} className="shrink-0" />
            {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-4 duration-300">Settings</span>}
          </button>
          <button 
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all text-sm font-medium group",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? "Support" : undefined}
          >
            <HelpCircle size={20} className="shrink-0" />
            {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-4 duration-300">Support</span>}
          </button>
          
          <div className={cn(
            "mt-4 bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden transition-all duration-300",
            isCollapsed ? "p-2" : "p-4"
          )}>
            <div className={cn(
              "flex items-center gap-3",
              isCollapsed && "justify-center"
            )}>
              <div className="w-10 h-10 rounded-full bg-[#4f6ef7]/20 border border-[#4f6ef7]/30 flex items-center justify-center text-[#4f6ef7] font-bold text-sm shrink-0 shadow-inner">
                JD
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-4 duration-300">
                  <p className="text-sm font-semibold truncate text-white leading-tight">John Doe</p>
                  <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider font-bold">Premium Plan</p>
                </div>
              )}
              {!isCollapsed && <LogOut size={16} className="text-slate-500 hover:text-white cursor-pointer transition-colors shrink-0" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
