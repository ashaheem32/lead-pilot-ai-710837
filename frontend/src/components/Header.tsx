import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronRight,
  User,
  Settings,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '../lib/utils';

const routeMap: Record<string, string> = {
  '/': 'Campaign Dashboard',
  '/finder': 'Lead Finder',
  '/enrichment': 'Lead Enrichment',
  '/outreach': 'AI SDR Outreach',
  '/advisor': 'AI Strategy Advisor'
};

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarCollapsed }) => {
  const location = useLocation();
  const currentRouteName = routeMap[location.pathname] || 'Dashboard';
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <header className={cn(
      "h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between transition-all duration-300",
      isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
    )}>
      <div className="flex items-center gap-6">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <span className="hover:text-slate-600 transition-colors cursor-pointer">LeadPilot AI</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-[#4f6ef7]">{currentRouteName}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4f6ef7] transition-colors" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-[#4f6ef7]/20 focus:bg-white transition-all outline-none"
          />
        </div>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-500 hover:text-slate-900"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-500 hover:text-slate-900 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 group-hover:text-[#4f6ef7] transition-colors leading-tight">John Doe</p>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Premium Account</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4f6ef7] to-indigo-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm ring-2 ring-transparent group-hover:ring-[#4f6ef7]/20 transition-all">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};
