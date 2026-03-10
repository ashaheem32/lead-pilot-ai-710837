import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';
import { useToast } from '../context/ToastContext';
import { leadService } from '../services/leadService';
import { Skeleton } from '../components/Skeleton';
import { Lead, ProductContext } from '../types';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Phone, 
  Loader2, 
  Copy, 
  Check, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Edit2,
  Download,
  Building2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Save,
  MessageSquare,
  ArrowRight,
  Target,
  Trophy,
  History,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AIOutreach = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leads, updateLead, productContext, setProductContext } = useLeads();
  const { showToast } = useToast();
  const [isContextExpanded, setIsContextExpanded] = useState(!productContext?.companyName);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [editingEmails, setEditingEmails] = useState<Record<string, boolean>>({});
  const [activeTabs, setActiveTabs] = useState<Record<string, 'email' | 'linkedin' | 'call'>>({});
  const leadRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [localPC, setLocalPC] = useState<ProductContext>(productContext || {
    companyName: '',
    whatYouSell: '',
    keyValueProp: '',
    targetPainPoints: '',
    preferredTone: 'Professional'
  });

  useEffect(() => {
    if (productContext) {
      setLocalPC(productContext);
    }
  }, [productContext]);

  useEffect(() => {
    const state = location.state as { leadId?: string } | null;
    if (state?.leadId && leadRefs.current[state.leadId]) {
      setTimeout(() => {
        leadRefs.current[state.leadId!]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [location.state, leads]);

  const handleSaveContext = () => {
    if (!localPC.companyName) {
      showToast("Company name is required", 'error');
      return;
    }
    setProductContext(localPC);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
    setIsContextExpanded(false);
    showToast("Product context saved successfully!", 'success');
  };

  const handleGenerateLead = async (lead: Lead) => {
    if (!productContext?.companyName) {
      showToast("Please save your product context first", 'info');
      setIsContextExpanded(true);
      return;
    }
    setGeneratingId(lead.id);
    try {
      const updates = await leadService.generateOutreach(lead, productContext);
      updateLead(lead.id, updates);
      showToast(`Outreach generated for ${lead.company}`, 'success');
    } catch (error) {
      console.error(error);
      showToast("Failed to generate outreach", 'error');
    } finally {
      setGeneratingId(null);
    }
  };

  const handleGenerateAll = async () => {
    const enrichedLeads = leads.filter(l => l.status === 'enriched' || l.status === 'contacted');
    if (enrichedLeads.length === 0) return;
    if (!productContext?.companyName) {
      showToast("Please save your product context first", 'info');
      setIsContextExpanded(true);
      return;
    }

    setGeneratingAll(true);
    let completed = 0;
    for (const lead of enrichedLeads) {
      if (!lead.outreachSequences) {
        setGeneratingId(lead.id);
        const updates = await leadService.generateOutreach(lead, productContext);
        updateLead(lead.id, updates);
      }
      completed++;
      setProgress(Math.round((completed / enrichedLeads.length) * 100));
    }
    setGeneratingAll(false);
    setGeneratingId(null);
    setProgress(0);
    showToast(`Outreach generated for ${enrichedLeads.length} leads!`, 'success');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'info');
  };

  const handleBatchExport = () => {
    const generatedLeads = leads.filter(l => l.outreachSequences);
    if (generatedLeads.length === 0) {
      showToast("No outreach data to export", 'info');
      return;
    }

    let csv = "Company,Name,Email,Initial Email Subject,Initial Email Body,LinkedIn Connection\n";
    generatedLeads.forEach(l => {
      const outreach = l.outreachSequences!;
      csv += `"${l.company}","${l.name}","${l.contacts?.[0]?.email || ''}","${outreach.emails.initial.subject.replace(/"/g, '""')}","${outreach.emails.initial.body.replace(/"/g, '""')}","${outreach.linkedin.connectionRequest.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'outreach_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Batch export started", 'success');
  };

  const downloadScript = (lead: Lead) => {
    if (!lead.outreachSequences) return;
    const script = lead.outreachSequences.coldCall;
    const content = `COLD CALL SCRIPT FOR ${lead.company}\n\n` +
      `Opening: ${script.openingHook}\n\n` +
      `Pitch: ${script.quickPitch}\n\n` +
      `Questions:\n${script.qualifyingQuestions.map(q => `- ${q}`).join('\n')}\n\n` +
      `Objections:\n${script.objectionHandling.map(o => `Q: ${o.objection}\nA: ${o.response}`).join('\n\n')}\n\n` +
      `Close: ${script.closeCTA}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lead.company.replace(/\s+/g, '_')}_call_script.txt`;
    a.click();
    showToast("Script downloaded", 'info');
  };

  const enrichedLeads = leads.filter(l => l.status === 'enriched' || l.status === 'contacted');

  const getActiveTab = (leadId: string) => activeTabs[leadId] || 'email';
  const setActiveTab = (leadId: string, tab: 'email' | 'linkedin' | 'call') => {
    setActiveTabs(prev => ({ ...prev, [leadId]: tab }));
  };

  const toggleEditEmail = (emailId: string) => {
    setEditingEmails(prev => ({ ...prev, [emailId]: !prev[emailId] }));
  };

  const updateEmailContent = (leadId: string, type: 'initial' | 'followUp' | 'breakup', field: 'subject' | 'body', value: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead?.outreachSequences) return;

    const newOutreach = { ...lead.outreachSequences };
    newOutreach.emails[type][field] = value;
    updateLead(leadId, { outreachSequences: newOutreach });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#4f6ef7]">
            <Send size={20} className="fill-current" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Automated Outreach</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1a1f36] tracking-tight">AI SDR Module</h1>
          <p className="text-slate-500 font-medium">Generate high-converting personalized outreach sequences for your pipeline.</p>
        </div>
      </div>

      {/* Product Context Section */}
      <div className={cn(
        "bg-white rounded-3xl border transition-all duration-500 overflow-hidden shadow-sm",
        isContextExpanded ? "border-[#4f6ef7] shadow-[0_15px_40px_rgba(79,110,247,0.06)]" : "border-slate-200"
      )}>
        <button 
          onClick={() => setIsContextExpanded(!isContextExpanded)}
          className={cn(
            "w-full px-8 py-6 flex items-center justify-between transition-colors",
            isContextExpanded ? "bg-[#4f6ef7]/[0.02]" : "bg-white hover:bg-slate-50/50"
          )}
        >
          <div className="flex items-center gap-5">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner",
              isContextExpanded ? "bg-[#4f6ef7] text-white shadow-blue-500/20" : "bg-blue-50 text-blue-600"
            )}>
              <Building2 size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-black text-[#1a1f36] tracking-tight">Your Product Context</h3>
              <p className="text-sm font-medium text-slate-400">Used to personalize all generated outreach content</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {productContext?.companyName && !isContextExpanded && (
              <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 uppercase tracking-widest animate-in zoom-in">
                <ShieldCheck size={14} /> Context Ready
              </span>
            )}
            <div className={cn(
              "p-2.5 rounded-xl transition-all duration-300",
              isContextExpanded ? "bg-[#4f6ef7] text-white rotate-180 shadow-lg shadow-blue-500/20" : "bg-slate-100 text-slate-400"
            )}>
              <ChevronDown size={20} />
            </div>
          </div>
        </button>

        {isContextExpanded && (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-500">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Company Name</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#4f6ef7]/20 focus:bg-white focus:border-[#4f6ef7] outline-none text-sm font-bold transition-all shadow-inner"
                  placeholder="e.g. LeadPilot AI"
                  value={localPC.companyName}
                  onChange={e => setLocalPC({...localPC, companyName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">What You Sell</label>
                <textarea 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#4f6ef7]/20 focus:bg-white focus:border-[#4f6ef7] outline-none text-sm font-bold transition-all h-32 shadow-inner"
                  placeholder="Describe your product in 2-3 sentences..."
                  value={localPC.whatYouSell}
                  onChange={e => setLocalPC({...localPC, whatYouSell: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Preferred Outreach Tone</label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#4f6ef7]/20 focus:bg-white focus:border-[#4f6ef7] outline-none text-sm font-bold transition-all bg-white shadow-inner cursor-pointer"
                  value={localPC.preferredTone}
                  onChange={e => setLocalPC({...localPC, preferredTone: e.target.value as any})}
                >
                  <option value="Professional">Professional (Corporate & Trustworthy)</option>
                  <option value="Conversational">Conversational (Personal & Human)</option>
                  <option value="Bold">Bold (Direct & Provocative)</option>
                  <option value="Friendly">Friendly (Approachable & Warm)</option>
                </select>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Key Value Proposition</label>
                <textarea 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#4f6ef7]/20 focus:bg-white focus:border-[#4f6ef7] outline-none text-sm font-bold transition-all h-32 shadow-inner"
                  placeholder="What is your main unique selling point?"
                  value={localPC.keyValueProp}
                  onChange={e => setLocalPC({...localPC, keyValueProp: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Target Pain Points You Solve</label>
                <textarea 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#4f6ef7]/20 focus:bg-white focus:border-[#4f6ef7] outline-none text-sm font-bold transition-all h-32 shadow-inner"
                  placeholder="List the main challenges your product addresses..."
                  value={localPC.targetPainPoints}
                  onChange={e => setLocalPC({...localPC, targetPainPoints: e.target.value})}
                />
              </div>
              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleSaveContext}
                  className="px-10 py-4 bg-[#4f6ef7] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#3d59d1] transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/30 active:scale-95 group"
                >
                  {showSaveSuccess ? <CheckCircle2 size={20} className="animate-in zoom-in" /> : <Save size={20} className="group-hover:rotate-12 transition-transform" />}
                  {showSaveSuccess ? "Context Saved" : "Save Product Context"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Section - Lead Outreach Cards */}
      <div className="space-y-10">
        {enrichedLeads.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner group cursor-pointer overflow-hidden relative">
              <Sparkles size={48} className="text-slate-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4f6ef7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="text-3xl font-black text-[#1a1f36] tracking-tight">No Enriched Leads Yet</h3>
            <p className="text-slate-400 max-w-sm mx-auto font-medium text-lg leading-relaxed mt-3">
              Generate deep intelligence for your leads in the Enrichment module before creating high-converting outreach sequences.
            </p>
            <button 
              onClick={() => navigate('/enrichment')}
              className="mt-10 px-10 py-4 bg-[#1a1f36] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Layers size={18} />
              Go to Enrichment
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {enrichedLeads.map((lead) => (
              <div 
                key={lead.id} 
                ref={el => { leadRefs.current[lead.id] = el; }}
                className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[600px] group transition-all duration-500 hover:shadow-xl hover:border-[#4f6ef7]/30"
              >
                {/* Lead Summary Sidebar */}
                <div className="lg:w-80 bg-slate-50/50 p-8 border-r border-slate-100 flex flex-col">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-[#1a1f36] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform duration-500">
                      {lead.company[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-[#1a1f36] text-xl leading-tight tracking-tight">{lead.company}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-500 rounded text-[9px] font-black uppercase tracking-widest">{lead.industry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-1">
                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group/target">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 blur-2xl group-hover/target:bg-blue-100 transition-colors"></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 relative z-10 flex items-center gap-2">
                        <Target size={12} className="text-[#4f6ef7]" /> Target Contact
                      </p>
                      <p className="text-lg font-black text-[#1a1f36] relative z-10">{lead.contacts?.[0]?.name || lead.name}</p>
                      <p className="text-xs font-bold text-slate-400 relative z-10 mt-1">{lead.contacts?.[0]?.title || lead.title}</p>
                    </div>

                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group/pain">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-full -mr-10 -mt-10 blur-2xl group-hover/pain:bg-orange-100 transition-colors"></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 relative z-10 flex items-center gap-2">
                        <Zap size={12} className="text-orange-500" /> Key Pain Point
                      </p>
                      <p className="text-sm font-bold text-slate-700 italic relative z-10 leading-relaxed">
                        "{lead.painPoints?.[0] || 'Optimizing manual workflows'}"
                      </p>
                    </div>

                    <div className="pt-4 mt-auto">
                      {!lead.outreachSequences ? (
                        <button 
                          onClick={() => handleGenerateLead(lead)}
                          disabled={generatingId === lead.id}
                          className="w-full py-4 bg-[#4f6ef7] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#3d59d1] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                          {generatingId === lead.id ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="animate-pulse" />}
                          Generate Outreach
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleGenerateLead(lead)}
                          disabled={generatingId === lead.id}
                          className="w-full py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                          {generatingId === lead.id ? <Loader2 size={18} className="animate-spin" /> : <History size={18} />}
                          Regenerate All
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tabbed Content Area */}
                <div className="flex-1 flex flex-col bg-white">
                  {lead.outreachSequences ? (
                    <>
                      <div className="flex bg-slate-50/30 border-b border-slate-100 p-2 gap-2">
                        {[
                          { id: 'email', icon: Mail, label: 'Email Sequence' },
                          { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                          { id: 'call', icon: Phone, label: 'Call Script' }
                        ].map((tab) => (
                          <button 
                            key={tab.id}
                            onClick={() => setActiveTab(lead.id, tab.id as any)}
                            className={cn(
                              "flex-1 py-4 text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 rounded-2xl transition-all duration-300",
                              getActiveTab(lead.id) === tab.id 
                                ? "bg-white text-[#4f6ef7] shadow-lg shadow-blue-500/5 ring-1 ring-slate-100" 
                                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                            )}
                          >
                            <tab.icon size={18} className={cn(getActiveTab(lead.id) === tab.id ? "text-[#4f6ef7]" : "text-slate-300")} /> 
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="p-10 flex-1 overflow-y-auto max-h-[700px] custom-scrollbar animate-in fade-in duration-500">
                        {getActiveTab(lead.id) === 'email' && (
                          <div className="space-y-12">
                            {[ 
                              { id: 'initial', label: 'Step 1: Initial Hook', email: lead.outreachSequences.emails.initial, type: 'initial', color: 'bg-blue-500' },
                              { id: 'followUp', label: 'Step 2: Value Expansion', email: lead.outreachSequences.emails.followUp, type: 'followUp', color: 'bg-indigo-500' },
                              { id: 'breakup', label: 'Step 3: Permission to Close', email: lead.outreachSequences.emails.breakup, type: 'breakup', color: 'bg-slate-500' }
                            ].map((item, idx) => {
                              const isEditing = editingEmails[`${lead.id}-${item.id}`];
                              return (
                                <div key={item.id} className="relative group/email">
                                  <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                      <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-black shadow-lg", item.color)}>
                                        {idx + 1}
                                      </div>
                                      <div>
                                        <h5 className="text-base font-black text-[#1a1f36] tracking-tight">{item.label}</h5>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-black uppercase tracking-widest border border-slate-200">Wait: {item.email.day} Days</span>
                                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                            <Trophy size={10} /> High Conversion
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover/email:opacity-100 transition-all duration-300 translate-x-2 group-hover/email:translate-x-0">
                                      <button 
                                        onClick={() => toggleEditEmail(`${lead.id}-${item.id}`)}
                                        className={cn(
                                          "p-2.5 rounded-xl transition-all shadow-sm active:scale-95",
                                          isEditing ? "bg-[#4f6ef7] text-white shadow-blue-500/20" : "bg-white border border-slate-200 text-slate-400 hover:text-[#4f6ef7] hover:border-[#4f6ef7]/30"
                                        )}
                                        title={isEditing ? "Save Email" : "Edit Email"}
                                      >
                                        {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                                      </button>
                                      <button 
                                        onClick={() => copyToClipboard(`Subject: ${item.email.subject}\n\n${item.email.body}`, `Email ${idx + 1}`)}
                                        className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-[#4f6ef7] hover:border-[#4f6ef7]/30 rounded-xl transition-all shadow-sm active:scale-95"
                                        title="Copy to Clipboard"
                                      >
                                        <Copy size={18} />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <div className={cn(
                                    "rounded-[2rem] border transition-all duration-300 shadow-sm overflow-hidden",
                                    isEditing ? "border-[#4f6ef7] bg-[#4f6ef7]/[0.01] shadow-xl shadow-blue-500/5" : "border-slate-100 bg-slate-50/30 group-hover/email:border-slate-200 group-hover/email:bg-white"
                                  )}>
                                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</span>
                                      {isEditing ? (
                                        <input 
                                          className="flex-1 bg-white border border-slate-200 outline-none text-sm font-bold text-[#1a1f36] px-3 py-1.5 rounded-xl"
                                          value={item.email.subject}
                                          onChange={(e) => updateEmailContent(lead.id, item.type as any, 'subject', e.target.value)}
                                        />
                                      ) : (
                                        <span className="text-sm font-bold text-[#1a1f36] truncate">{item.email.subject}</span>
                                      )}
                                    </div>
                                    <div className="p-8">
                                      {isEditing ? (
                                        <textarea 
                                          className="w-full bg-white border border-slate-200 outline-none text-sm text-slate-700 font-medium whitespace-pre-wrap leading-relaxed min-h-[250px] p-5 rounded-2xl shadow-inner focus:border-[#4f6ef7] transition-colors"
                                          value={item.email.body}
                                          onChange={(e) => updateEmailContent(lead.id, item.type as any, 'body', e.target.value)}
                                        />
                                      ) : (
                                        <div className="text-[15px] text-slate-600 font-medium whitespace-pre-wrap leading-loose">
                                          {item.email.body}
                                        </div>
                                      )}
                                    </div>
                                    <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                      <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                          <Edit2 size={10} /> {item.email.body.split(/\s+/).length} Words
                                        </span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Read Time: {Math.ceil(item.email.body.split(/\s+/).length / 200)}m</span>
                                      </div>
                                      <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {getActiveTab(lead.id) === 'linkedin' && (
                          <div className="space-y-12 max-w-2xl mx-auto">
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                                    <Linkedin size={20} />
                                  </div>
                                  <h5 className="text-lg font-black text-[#1a1f36] tracking-tight">LinkedIn Connection</h5>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border",
                                    lead.outreachSequences.linkedin.connectionRequest.length > 280 ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  )}>
                                    {lead.outreachSequences.linkedin.connectionRequest.length} / 300 Characters
                                  </span>
                                  <button 
                                    onClick={() => copyToClipboard(lead.outreachSequences!.linkedin.connectionRequest, "Connection Request")}
                                    className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 rounded-xl transition-all shadow-sm active:scale-95"
                                  >
                                    <Copy size={18} />
                                  </button>
                                </div>
                              </div>
                              <div className="p-8 bg-gradient-to-br from-blue-50/50 to-white border-2 border-dashed border-blue-200/50 rounded-[2.5rem] text-base text-slate-700 font-medium leading-relaxed relative group/li">
                                <div className="absolute -left-1 top-8 w-1.5 h-12 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"></div>
                                "{lead.outreachSequences.linkedin.connectionRequest}"
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                                    <MessageSquare size={20} />
                                  </div>
                                  <h5 className="text-lg font-black text-[#1a1f36] tracking-tight">Follow-Up InMail</h5>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                                    AI-Optimized for ROI
                                  </span>
                                  <button 
                                    onClick={() => copyToClipboard(lead.outreachSequences!.linkedin.followUpInMail, "InMail Message")}
                                    className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-xl transition-all shadow-sm active:scale-95"
                                  >
                                    <Copy size={18} />
                                  </button>
                                </div>
                              </div>
                              <div className="p-8 bg-indigo-50/30 border border-indigo-100 rounded-[2.5rem] text-base text-slate-700 font-medium leading-loose italic relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                  <Sparkles size={48} className="text-indigo-600" />
                                </div>
                                "{lead.outreachSequences.linkedin.followUpInMail}"
                              </div>
                            </div>
                          </div>
                        )}

                        {getActiveTab(lead.id) === 'call' && (
                          <div className="space-y-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-200">
                                  <Phone size={24} />
                                </div>
                                <div>
                                  <h5 className="text-xl font-black text-[#1a1f36] tracking-tight">60-Second Cold Call Framework</h5>
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">High-Stakes Conversion Script</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => copyToClipboard(lead.outreachSequences!.coldCall.openingHook, "Full Script")}
                                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-[#4f6ef7] transition-all flex items-center gap-2 shadow-sm active:scale-95"
                                >
                                  <Copy size={16} /> Copy Full
                                </button>
                                <button 
                                  onClick={() => downloadScript(lead)}
                                  className="px-5 py-2.5 bg-[#1a1f36] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10 active:scale-95"
                                >
                                  <Download size={16} /> Download
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm relative group/card">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 blur-2xl group-hover/card:bg-blue-100 transition-colors"></div>
                                <span className="text-[10px] font-black text-[#4f6ef7] uppercase mb-3 block tracking-[0.2em] relative z-10">A) Opening Hook (10s)</span>
                                <p className="text-sm font-bold text-slate-700 italic leading-relaxed relative z-10">"{lead.outreachSequences.coldCall.openingHook}"</p>
                              </div>
                              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm relative group/card">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 blur-2xl group-hover/card:bg-indigo-100 transition-colors"></div>
                                <span className="text-[10px] font-black text-indigo-500 uppercase mb-3 block tracking-[0.2em] relative z-10">B) Quick Pitch (15s)</span>
                                <p className="text-sm font-bold text-slate-700 italic leading-relaxed relative z-10">"{lead.outreachSequences.coldCall.quickPitch}"</p>
                              </div>
                              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm lg:col-span-1">
                                <span className="text-[10px] font-black text-[#4f6ef7] uppercase mb-4 block tracking-[0.2em]">C) Discovery Questions</span>
                                <div className="space-y-3">
                                  {lead.outreachSequences.coldCall.qualifyingQuestions.map((q, i) => (
                                    <div key={i} className="flex items-start gap-4 p-3 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-blue-50 transition-colors">
                                      <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-[11px] font-black text-[#4f6ef7] shadow-sm border border-slate-100 shrink-0 mt-0.5">{i+1}</div>
                                      <p className="text-sm font-bold text-slate-700 leading-snug">{q}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm lg:col-span-1">
                                <span className="text-[10px] font-black text-orange-500 uppercase mb-4 block tracking-[0.2em]">D) Objection Deflector</span>
                                <div className="space-y-4">
                                  {lead.outreachSequences.coldCall.objectionHandling.map((o, i) => (
                                    <div key={i} className="space-y-2 group/obj">
                                      <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover/obj:text-orange-500 transition-colors">{o.objection}</p>
                                      </div>
                                      <p className="text-[13px] font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed italic">"{o.response}"</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="md:col-span-2 p-8 bg-gradient-to-r from-[#1a1f36] to-slate-800 rounded-[2rem] text-white shadow-2xl shadow-slate-900/30 relative overflow-hidden group/close">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/close:opacity-100 transition-opacity"></div>
                                <span className="text-[10px] font-black text-blue-400 uppercase mb-2 block tracking-[0.2em]">E) The Close / Solidify Meeting</span>
                                <p className="text-xl font-black tracking-tight leading-snug">{lead.outreachSequences.coldCall.closeCTA}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center bg-slate-50/30 animate-in fade-in duration-700">
                      <div className="w-24 h-24 rounded-[2rem] bg-white shadow-2xl shadow-slate-200 flex items-center justify-center mb-8 relative group cursor-pointer overflow-hidden">
                        <Loader2 size={40} className="text-slate-200 group-hover:rotate-180 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#4f6ef7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h4 className="text-2xl font-black text-[#1a1f36] tracking-tight mb-3">No Outreach Sequence Found</h4>
                      <p className="text-sm font-medium text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed">
                        Ready to book more meetings? Launch our AI SDR agent to generate high-converting sequences tailored to this lead.
                      </p>
                      <button 
                        onClick={() => handleGenerateLead(lead)}
                        disabled={generatingId === lead.id}
                        className="px-12 py-5 bg-[#4f6ef7] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#3d59d1] transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95"
                      >
                        {generatingId === lead.id ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} className="animate-pulse" />}
                        Generate All Sequences
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      {enrichedLeads.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-40 animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-[#1a1f36]/90 backdrop-blur-xl border border-slate-700/50 p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-left hidden md:block">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Pipeline Status</p>
                <p className="text-sm font-bold text-white tracking-tight">
                  <span className="text-[#4f6ef7]">{enrichedLeads.filter(l => l.outreachSequences).length}</span> of {enrichedLeads.length} sequences generated
                </p>
              </div>
              {generatingAll && (
                <div className="w-48 group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-black text-[#4f6ef7] uppercase tracking-widest animate-pulse">Processing...</span>
                    <span className="text-[10px] font-black text-white">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-700/50">
                    <div 
                      className="h-full bg-[#4f6ef7] transition-all duration-500 shadow-[0_0_10px_rgba(79,110,247,0.5)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={handleBatchExport}
                className="flex-1 md:flex-none px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg"
              >
                <Download size={18} /> Export CSV
              </button>
              <button 
                onClick={handleGenerateAll}
                disabled={generatingAll}
                className="flex-1 md:flex-none px-10 py-4 bg-[#4f6ef7] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#3d59d1] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 group"
              >
                {generatingAll ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="group-hover:animate-pulse" />}
                Process Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
