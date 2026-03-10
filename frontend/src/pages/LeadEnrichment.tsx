import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';
import { useToast } from '../context/ToastContext';
import { leadService } from '../services/leadService';
import { Skeleton } from '../components/Skeleton';
import { Lead } from '../types';
import { 
  Layers, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Building2, 
  Zap, 
  Target, 
  Sword, 
  Copy, 
  Check, 
  RefreshCw, 
  Trash2, 
  MessageSquare,
  Sparkles,
  Download,
  ExternalLink,
  Briefcase,
  ArrowRight,
  Database,
  Search,
  Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';

export const LeadEnrichment = () => {
  const navigate = useNavigate();
  const { leads, updateLead, removeLead } = useLeads();
  const { showToast } = useToast();
  const [enrichingIds, setEnrichingIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});
  const [isEnrichingAll, setIsEnrichingAll] = useState(false);
  const [enrichAllProgress, setEnrichAllProgress] = useState(0);

  const selectedLeads = leads;
  const enrichedLeadsCount = useMemo(() => leads.filter(l => l.status === 'enriched' || l.status === 'contacted').length, [leads]);
  const pendingLeadsCount = leads.length - enrichedLeadsCount;

  const handleEnrich = async (lead: Lead) => {
    setEnrichingIds(prev => new Set(prev).add(lead.id));
    try {
      const enrichment = await leadService.enrichLead(lead);
      updateLead(lead.id, { 
        ...enrichment, 
        status: 'enriched' 
      });
      setExpandedId(lead.id);
      showToast(`${lead.company} enrichment complete!`, 'success');
    } catch (error) {
      console.error(error);
      showToast(`Failed to enrich ${lead.company}`, 'error');
    } finally {
      setEnrichingIds(prev => {
        const next = new Set(prev);
        next.delete(lead.id);
        return next;
      });
    }
  };

  const handleEnrichAll = async () => {
    const pending = leads.filter(l => l.status === 'new');
    if (pending.length === 0) return;

    setIsEnrichingAll(true);
    setEnrichAllProgress(0);
    
    let completed = 0;
    for (const lead of pending) {
      await handleEnrich(lead);
      completed++;
      setEnrichAllProgress((completed / pending.length) * 100);
    }
    
    setIsEnrichingAll(false);
    showToast(`Enrichment complete for ${completed} leads!`, 'success');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus({ ...copyStatus, [id]: true });
    showToast('Copied to clipboard', 'info');
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const exportToCSV = () => {
    const headers = ["Company", "Name", "Title", "Industry", "Fit Score", "Confidence", "Email", "LinkedIn"];
    const rows = leads.map(l => [
      l.company,
      l.name,
      l.title,
      l.industry,
      l.fitScore,
      l.enrichmentScore || 'N/A',
      l.email || 'N/A',
      l.linkedinUrl || 'N/A'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lead_enrichment_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exporting enrichment data...', 'info');
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (score >= 30) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getConfidenceColor = (conf: string | undefined) => {
    switch (conf) {
      case 'High': return "bg-green-100 text-green-700 border-green-200";
      case 'Medium': return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case 'Low': return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Bar */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#4f6ef7]/10 rounded-xl flex items-center justify-center shadow-inner">
              <Layers size={28} className="text-[#4f6ef7]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#1a1f36] tracking-tight">Lead Enrichment</h1>
              <div className="mt-1 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                <span className="flex items-center gap-1.5"><Database size={12} className="text-slate-300" /> {leads.length} leads selected</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span className="text-emerald-500 flex items-center gap-1.5"><Check size={12} /> {enrichedLeadsCount} enriched</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                <span className="text-orange-500 flex items-center gap-1.5"><RefreshCw size={12} /> {pendingLeadsCount} pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={exportToCSV}
            disabled={leads.length === 0}
            className="px-5 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Download size={16} />
            Export Data
          </button>
          
          <div className="relative group">
            <button 
              onClick={handleEnrichAll}
              disabled={isEnrichingAll || pendingLeadsCount === 0}
              className={cn(
                "px-8 py-3 bg-[#4f6ef7] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-500/25 active:scale-95",
                (isEnrichingAll || pendingLeadsCount === 0) && "opacity-50 cursor-not-allowed shadow-none"
              )}
            >
              {isEnrichingAll ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="animate-pulse" />}
              Enrich All
            </button>
            {isEnrichingAll && (
              <div className="absolute -bottom-6 left-0 w-full">
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4f6ef7] to-indigo-500 transition-all duration-500 animate-pulse"
                    style={{ width: `${enrichAllProgress}%` }}
                  />
                </div>
                <div className="text-[9px] font-black text-[#4f6ef7] uppercase tracking-widest mt-1 text-right">
                  {Math.round(enrichAllProgress)}% Complete
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 animate-in fade-in duration-700">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner group cursor-pointer overflow-hidden relative">
            <Layers size={48} className="text-slate-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4f6ef7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <h2 className="text-3xl font-black text-[#1a1f36] tracking-tight">No Leads Selected</h2>
          <p className="text-slate-400 mt-3 max-w-sm mx-auto font-medium text-lg leading-relaxed">
            Head to the Lead Finder to identify and select potential leads for deep AI enrichment.
          </p>
          <button 
            onClick={() => navigate('/finder')}
            className="mt-10 px-10 py-4 bg-[#1a1f36] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
          >
            <Search size={18} />
            Go to Lead Finder
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {leads.map((lead) => (
            <div 
              key={lead.id} 
              className={cn(
                "bg-white rounded-3xl border transition-all duration-500 group overflow-hidden",
                expandedId === lead.id 
                  ? "border-[#4f6ef7] shadow-[0_20px_50px_rgba(79,110,247,0.08)] ring-1 ring-[#4f6ef7]/10" 
                  : "border-slate-200 shadow-sm hover:border-[#4f6ef7]/40 hover:shadow-md"
              )}
            >
              {/* Card Header */}
              <div 
                className={cn(
                  "p-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 cursor-pointer transition-colors",
                  expandedId === lead.id ? "bg-[#4f6ef7]/[0.02]" : "hover:bg-slate-50/50"
                )}
                onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl font-black text-[#1a1f36] shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:bg-white group-hover:shadow-md">
                    {lead.company.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-[#1a1f36] text-xl tracking-tight">{lead.company}</span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 group-hover:border-[#4f6ef7]/20 transition-colors">{lead.industry}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                          <Users size={12} className="text-slate-400" />
                        </div>
                        <span className="group-hover:text-slate-600 transition-colors">{lead.contacts?.[0]?.name || 'Pending Research'}</span>
                      </div>
                      <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                          <Briefcase size={12} className="text-slate-400" />
                        </div>
                        <span className="group-hover:text-slate-600 transition-colors">{lead.title || 'Loading Role...'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Fit Score</span>
                    <span className={cn(
                      "px-4 py-1.5 rounded-xl text-xs font-black border shadow-sm transition-transform duration-300 group-hover:scale-110",
                      getFitScoreColor(lead.fitScore)
                    )}>{lead.fitScore}</span>
                  </div>
                  
                  {lead.status === 'enriched' && (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Confidence</span>
                      <span className={cn(
                        "px-4 py-1.5 rounded-xl text-xs font-black border shadow-sm transition-transform duration-300 group-hover:scale-110",
                        getConfidenceColor(lead.enrichmentScore)
                      )}>{lead.enrichmentScore}</span>
                    </div>
                  )}

                  <div className={cn(
                    "ml-2 p-3 bg-slate-50 rounded-2xl text-slate-400 transition-all duration-300",
                    expandedId === lead.id ? "bg-[#4f6ef7] text-white shadow-lg shadow-blue-500/20 rotate-180" : "group-hover:bg-slate-100 group-hover:text-slate-600"
                  )}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              {/* Card Expanded Content */}
              {expandedId === lead.id && (
                <div className="border-t border-slate-100 bg-slate-50/20 animate-in slide-in-from-top-4 duration-500">
                  {lead.status === 'new' ? (
                    <div className="p-16 text-center">
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100 group/btn relative overflow-hidden">
                        <Sparkles size={40} className="text-[#4f6ef7] group-hover/btn:scale-125 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-black text-[#1a1f36] tracking-tight">AI Research Required</h3>
                      <p className="text-slate-500 mt-2 mb-10 max-w-sm mx-auto font-medium">Launch our deep-research agents to uncover tech stacks, stakeholders, and buying signals for {lead.company}.</p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEnrich(lead); }}
                        disabled={enrichingIds.has(lead.id)}
                        className="px-10 py-4 bg-[#4f6ef7] text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 mx-auto shadow-2xl shadow-blue-500/30 hover:bg-[#3d59d1] hover:scale-105 active:scale-95 transition-all"
                      >
                        {enrichingIds.has(lead.id) ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            Analyzing Data...
                          </>
                        ) : (
                          <>
                            <Sparkles size={20} />
                            Start AI Enrichment
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="p-8 space-y-10">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Section A: Key Decision Makers */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                          <h4 className="flex items-center gap-3 text-xs font-black text-[#1a1f36] uppercase tracking-[0.2em] mb-6 relative z-10">
                            <div className="p-1.5 bg-blue-50 rounded-lg"><Users size={16} className="text-[#4f6ef7]" /></div>
                            Key Decision Makers
                          </h4>
                          <div className="space-y-4 relative z-10">
                            {lead.contacts?.map((contact, idx) => (
                              <div key={idx} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-[#4f6ef7]/30 transition-all group/contact">
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <div className="font-black text-[#1a1f36] text-lg leading-tight group-hover/contact:text-[#4f6ef7] transition-colors">{contact.name}</div>
                                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">{contact.title}</div>
                                  </div>
                                  <span className={cn(
                                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm",
                                    contact.roleRelevance === 'High' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                                  )}>
                                    {contact.roleRelevance} Relevance
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div className="flex items-center justify-between bg-white px-3 py-2.5 rounded-xl border border-slate-100 group/field">
                                    <span className="text-[11px] font-bold text-slate-600 truncate mr-2">{contact.email}</span>
                                    <button 
                                      onClick={() => handleCopy(contact.email, `${lead.id}-email-${idx}`)}
                                      className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-[#4f6ef7] transition-all"
                                      title="Copy Email"
                                    >
                                      {copyStatus[`${lead.id}-email-${idx}`] ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                    </button>
                                  </div>
                                  <div className="flex items-center justify-between bg-white px-3 py-2.5 rounded-xl border border-slate-100 group/field">
                                    <span className="text-[11px] font-bold text-slate-600 truncate mr-2">LinkedIn Profile</span>
                                    <div className="flex items-center gap-1">
                                      <a href={`https://${contact.linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-blue-600 transition-all">
                                        <ExternalLink size={14} />
                                      </a>
                                      <button 
                                        onClick={() => handleCopy(contact.linkedinUrl, `${lead.id}-li-${idx}`)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-300 hover:text-[#4f6ef7] transition-all"
                                        title="Copy Link"
                                      >
                                        {copyStatus[`${lead.id}-li-${idx}`] ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section B: Company Intelligence */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                          <h4 className="flex items-center gap-3 text-xs font-black text-[#1a1f36] uppercase tracking-[0.2em] mb-6 relative z-10">
                            <div className="p-1.5 bg-purple-50 rounded-lg"><Building2 size={16} className="text-purple-500" /></div>
                            Company Intelligence
                          </h4>
                          <div className="space-y-8 relative z-10">
                            <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Tech Stack Infrastructure</label>
                              <div className="flex flex-wrap gap-2.5">
                                {lead.techStack?.map((tech, idx) => (
                                  <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-black border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 shadow-sm">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Est. Annual Tooling</label>
                                <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                  {lead.estimatedToolSpend}
                                </div>
                              </div>
                              <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 shadow-sm">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Growth Lifecycle</label>
                                <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                  {lead.growthStage}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section C: Triggers & News */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                          <h4 className="flex items-center gap-3 text-xs font-black text-[#1a1f36] uppercase tracking-[0.2em] mb-6">
                            <div className="p-1.5 bg-orange-50 rounded-lg"><Zap size={16} className="text-orange-500" /></div>
                            Strategic Triggers & News
                          </h4>
                          <div className="space-y-4">
                            {lead.triggers?.map((trigger, idx) => (
                              <div key={idx} className="flex gap-5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-white transition-all duration-300 group/trigger">
                                <div className={cn(
                                  "w-3 h-3 mt-1 rounded-full shrink-0 shadow-sm group-hover/trigger:scale-125 transition-transform duration-300",
                                  trigger.impact === 'High' ? "bg-emerald-500 shadow-emerald-500/20" : trigger.impact === 'Medium' ? "bg-yellow-500 shadow-yellow-500/20" : "bg-slate-300"
                                )} />
                                <div>
                                  <div className="text-[15px] font-bold text-[#1a1f36] leading-snug group-hover/trigger:text-[#4f6ef7] transition-colors">{trigger.description}</div>
                                  <div className="flex items-center gap-3 mt-3">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-slate-100">{trigger.date}</span>
                                    <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                    <span className={cn(
                                      "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border",
                                      trigger.impact === 'High' ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-slate-500 bg-white border-slate-100"
                                    )}>{trigger.impact} Impact Priority</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section D: Pain Points & Opportunities */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                          <h4 className="flex items-center gap-3 text-xs font-black text-[#1a1f36] uppercase tracking-[0.2em] mb-6">
                            <div className="p-1.5 bg-emerald-50 rounded-lg"><Target size={16} className="text-emerald-500" /></div>
                            Pain Points & Opportunities
                          </h4>
                          <div className="space-y-8">
                            <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">AI-Detected Pain Points</label>
                              <div className="grid grid-cols-1 gap-3">
                                {lead.painPoints?.map((pain, idx) => (
                                  <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-orange-50/30 hover:border-orange-100 transition-all duration-300">
                                    <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-slate-100">
                                      <Check size={14} className="text-orange-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 leading-snug">{pain}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-3">Intent Intelligence</label>
                              <div className="flex flex-wrap gap-2.5">
                                {lead.buyingIntentSignals?.map((signal, idx) => (
                                  <span key={idx} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[11px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                                    {signal}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="p-5 bg-gradient-to-r from-emerald-50 to-emerald-50/10 rounded-2xl border border-emerald-100/50">
                              <label className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] block mb-1.5">Fiscal Planning Cycle</label>
                              <div className="text-lg font-black text-[#1a1f36] flex items-center gap-2 uppercase tracking-tight">
                                <Calendar size={18} className="text-emerald-500" />
                                {lead.budgetTiming}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section E: Competitive Landscape */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm lg:col-span-2 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4f6ef7]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                          <h4 className="flex items-center gap-3 text-xs font-black text-[#1a1f36] uppercase tracking-[0.2em] mb-8 relative z-10">
                            <div className="p-1.5 bg-indigo-50 rounded-lg"><Sword size={16} className="text-[#4f6ef7]" /></div>
                            Strategic Competitive Intelligence
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            {lead.competitors?.map((comp, idx) => (
                              <div key={idx} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-[#4f6ef7]/20 hover:bg-white hover:shadow-xl transition-all duration-500 group/comp">
                                <div className="font-black text-[#1a1f36] text-xl mb-4 group-hover/comp:text-[#4f6ef7] transition-colors">{comp.name}</div>
                                <div className="space-y-6">
                                  <div>
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 underline decoration-slate-200 underline-offset-4">Market Positioning</label>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{comp.positioning}</p>
                                  </div>
                                  <div className="pt-5 border-t border-slate-200/50 relative">
                                    <div className="absolute -top-3 left-0 bg-[#4f6ef7] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">Win Angle</div>
                                    <p className="text-sm text-slate-800 font-black italic tracking-tight leading-snug">"{comp.differentiation}"</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Individual Card Actions */}
                      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEnrich(lead); }}
                            disabled={enrichingIds.has(lead.id)}
                            className="px-6 py-3 text-xs font-black uppercase tracking-widest text-[#4f6ef7] bg-white border border-[#4f6ef7]/20 hover:bg-[#4f6ef7]/5 rounded-2xl flex items-center gap-2.5 transition-all shadow-sm active:scale-95"
                          >
                            <RefreshCw size={16} className={cn("transition-transform duration-700", enrichingIds.has(lead.id) && "animate-spin")} />
                            Re-Enrich AI
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeLead(lead.id); }}
                            className="px-6 py-3 text-xs font-black uppercase tracking-widest text-red-500 bg-white border border-red-100 hover:bg-red-50 rounded-2xl flex items-center gap-2.5 transition-all shadow-sm active:scale-95"
                          >
                            <Trash2 size={16} />
                            Remove Lead
                          </button>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate('/outreach', { state: { leadId: lead.id } }); }}
                          className="px-10 py-4 bg-[#1a1f36] text-white rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-900 shadow-2xl shadow-slate-900/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                          <MessageSquare size={18} className="animate-pulse" />
                          View Outreach Sequences
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};