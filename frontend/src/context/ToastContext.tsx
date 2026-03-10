import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border pointer-events-auto min-w-[300px] animate-slide-in-right",
              toast.type === 'success' && "bg-white border-emerald-100 text-emerald-800",
              toast.type === 'error' && "bg-white border-red-100 text-red-800",
              toast.type === 'info' && "bg-white border-blue-100 text-blue-800"
            )}
          >
            {toast.type === 'success' && <CheckCircle size={18} className="text-emerald-500 shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-red-500 shrink-0" />}
            {toast.type === 'info' && <Info size={18} className="text-blue-500 shrink-0" />}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
