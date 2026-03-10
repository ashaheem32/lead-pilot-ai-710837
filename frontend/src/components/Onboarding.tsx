import React, { useState } from 'react';
import { Zap, ArrowRight, CheckCircle2, Search, Layers, Send } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { cn } from '../lib/utils';

export const Onboarding = () => {
  const { setShowOnboarding } = useLeads();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to LeadPilot AI",
      description: "The all-in-one AI platform to find, enrich, and reach out to your ideal customers automatically.",
      icon: Zap,
      color: "bg-blue-500"
    },
    {
      title: "1. Define Your ICP",
      description: "Tell us exactly who your target customers are. We'll find matching leads across global databases.",
      icon: Search,
      color: "bg-emerald-500"
    },
    {
      title: "2. Find & Enrich",
      description: "Generate high-quality leads and enrich them with deep intelligence, tech stacks, and buying triggers.",
      icon: Layers,
      color: "bg-purple-500"
    },
    {
      title: "3. Generate Outreach",
      description: "Automatically create hyper-personalized email sequences, LinkedIn messages, and call scripts.",
      icon: Send,
      color: "bg-orange-500"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const CurrentIcon = steps[step].icon;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1a1f36]/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col md:flex-row h-full">
          <div className={cn("md:w-1/3 p-8 flex flex-col items-center justify-center text-white transition-colors duration-500", steps[step].color)}>
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
              <CurrentIcon size={40} className="text-white" />
            </div>
            <div className="flex gap-2 mt-4">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === step ? "w-6 bg-white" : "bg-white/40"
                  )} 
                />
              ))}
            </div>
          </div>
          
          <div className="md:w-2/3 p-10 flex flex-col">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{steps[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {steps[step].description}
              </p>
              
              <div className="space-y-4">
                {step === 0 && (
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">AI-Powered Lead Generation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">Deep Company Enrichment</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700">Hyper-Personalized Outreach</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-10">
              <button 
                onClick={() => setShowOnboarding(false)}
                className="text-slate-400 hover:text-slate-600 font-medium transition-colors"
              >
                Skip Guide
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 bg-[#4f6ef7] hover:bg-[#3d59d6] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
              >
                {step === steps.length - 1 ? "Get Started" : "Next"}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
