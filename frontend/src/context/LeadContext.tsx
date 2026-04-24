import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, ICP, ProductContext } from '../types';

interface LeadContextType {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  currentICP: ICP | null;
  setCurrentICP: (icp: ICP) => void;
  productContext: ProductContext | null;
  setProductContext: (context: ProductContext) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  removeLead: (id: string) => void;
  addLeads: (newLeads: Lead[]) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  clearAllData: () => void;
  resetFinds: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const DEFAULT_PRODUCT_CONTEXT: ProductContext = {
  companyName: '',
  whatYouSell: '',
  keyValueProp: '',
  targetPainPoints: '',
  preferredTone: 'Professional'
};

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const savedLeads = localStorage.getItem('leads');
      if (savedLeads) {
        const parsed = JSON.parse(savedLeads);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error('Failed to parse leads from localStorage', e);
    }
    return [];
  });

  const [currentICP, setCurrentICPState] = useState<ICP | null>(() => {
    try {
      const savedICP = localStorage.getItem('currentICP');
      return savedICP ? JSON.parse(savedICP) : null;
    } catch (e) {
      console.error('Failed to parse ICP from localStorage', e);
      return null;
    }
  });

  const [productContext, setProductContextState] = useState<ProductContext>(() => {
    try {
      const savedPC = localStorage.getItem('productContext');
      return savedPC ? JSON.parse(savedPC) : DEFAULT_PRODUCT_CONTEXT;
    } catch (e) {
      console.error('Failed to parse productContext from localStorage', e);
      return DEFAULT_PRODUCT_CONTEXT;
    }
  });

  const [showOnboarding, setShowOnboardingState] = useState<boolean>(() => {
    const saved = localStorage.getItem('onboardingShown');
    return saved !== 'true';
  });

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (currentICP) {
      localStorage.setItem('currentICP', JSON.stringify(currentICP));
    }
  }, [currentICP]);

  useEffect(() => {
    localStorage.setItem('productContext', JSON.stringify(productContext));
  }, [productContext]);

  useEffect(() => {
    localStorage.setItem('onboardingShown', (!showOnboarding).toString());
  }, [showOnboarding]);

  const setCurrentICP = (icp: ICP) => {
    setCurrentICPState(icp);
  };

  const setProductContext = (context: ProductContext) => {
    setProductContextState(context);
  };

  const setShowOnboarding = (show: boolean) => {
    setShowOnboardingState(show);
  };

  const clearAllData = () => {
    setLeads([]);
    setCurrentICPState(null);
    setProductContextState(DEFAULT_PRODUCT_CONTEXT);
    localStorage.removeItem('leads');
    localStorage.removeItem('currentICP');
    localStorage.removeItem('productContext');
  };

  const resetFinds = () => {
    setLeads([]);
    localStorage.removeItem('leads');
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.map(lead => lead.id === id ? { ...lead, ...updates } : lead);
    });
  };

  const removeLead = (id: string) => {
    setLeads(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.filter(lead => lead.id !== id);
    });
  };

  const addLeads = (newLeads: Lead[]) => {
    setLeads(prev => {
      const prevArray = Array.isArray(prev) ? prev : [];
      const newLeadsArray = Array.isArray(newLeads) ? newLeads : [];
      const existingIds = new Set(prevArray.map(l => l.id));
      const filteredNewLeads = newLeadsArray.filter(l => !existingIds.has(l.id));
      return [...prevArray, ...filteredNewLeads];
    });
  };

  return (
    <LeadContext.Provider value={{
      leads,
      setLeads,
      currentICP,
      setCurrentICP,
      productContext,
      setProductContext,
      updateLead,
      addLeads,
      removeLead,
      showOnboarding,
      setShowOnboarding,
      clearAllData,
      resetFinds
    }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
