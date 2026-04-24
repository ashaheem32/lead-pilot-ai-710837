import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';
import { useToast } from '../context/ToastContext';
import { leadService } from '../services/leadService';
import { Skeleton } from '../components/Skeleton';
import { ICP, Lead } from '../types';
import { 
  Search, 
  Loader2, 
  Filter, 
  Download, 
  Rocket, 
  Check, 
  Globe, 
  Building2, 
  Users, 
  DollarSign, 
  MapPin, 
  ArrowUpDown, 
  ChevronRight,
  X,
  Plus,
  Layers,
  Sparkles,
  ExternalLink,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../lib/utils';

const LOADING_MESSAGES = [
  "Scanning company databases...",
  "Matching against your ICP...",
  "Calculating fit scores...",
  "Preparing results..."
];

const INDUSTRIES = [
  "SaaS", "FinTech", "HealthTech", "E-commerce", "EdTech", "MarTech", 
  "Cybersecurity", "HR Tech", "Legal Tech", "Real Estate Tech", 
  "Manufacturing", "Logistics", "Other"
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const REVENUE_RANGES = ["Pre-revenue", "$0-$1M", "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M+"];

const GEOGRAPHIES = [
  "Africa", "Asia", "Australia / Oceania", "Europe",
  "North America", "South America", "Middle East", "Global"
];

const PRESET_JOB_TITLES = [
  "CEO", "CTO", "VP Sales", "VP Marketing", "Head of Growth", 
  "CMO", "CFO", "Director of Operations", "Product Manager"
];

export const LeadFinder = () => {
  const navigate = useNavigate();
  const { addLeads, setCurrentICP, currentICP, resetFinds, leads } = useLeads();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [results, setResults] = useState<Lead[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [fitScoreRange, setFitScoreRange] = useState<[number, number]>([0, 100]);
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Lead, direction: 'asc' | 'desc' } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const [icp, setIcp] = useState<ICP>(currentICP || {
    industry: '',
    companySize: '',
    revenueRange: '',
    geography: [],
    targetJobTitles: [],
    technologyKeywords: []
  });

  const [customIndustry, setCustomIndustry] = useState('');
  const [jobTitleInput, setJobTitleInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingMessageIndex(0);
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const finalIcp = {
        ...icp,
        industry: icp.industry === 'Other' ? customIndustry : icp.industry
      };
      const leadsArray = await leadService.findLeads(finalIcp);
      
      if (!Array.isArray(leadsArray) || leadsArray.length === 0) {
        throw new Error("Could not find any leads. Try adjusting your ICP parameters.");
      }
      
      setResults(leadsArray);
      setCurrentICP(finalIcp);
      showToast(`${leadsArray.length} leads found!`, 'success');
    } catch (error: any) {
      setError(error?.message || "Something went wrong.");
      showToast(error?.message || "Failed to find leads", 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(filteredAndSortedResults.map(r => r.id)));
  };

  const handleClearAll = () => {
    setSelectedIds(new Set());
  };

  const handleReset = () => {
    resetFinds();
    setResults([]);
    setSelectedIds(new Set());
    setShowResetConfirm(false);
    showToast('All finds have been reset. Websites will appear as new.', 'success');
  };

  const handleEnrichSelected = () => {
    const resultsArray = Array.isArray(results) ? results : [];
    const selectedLeads = resultsArray.filter(l => selectedIds.has(l.id));
    addLeads(selectedLeads);
    showToast(`${selectedLeads.length} leads added to pipeline`, 'info');
    navigate('/enrichment');
  };

  const requestSort = (key: keyof Lead) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (score >= 50) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    if (score >= 30) return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const filteredAndSortedResults = useMemo(() => {
    const resultsArray = Array.isArray(results) ? results : [];
    let processed = [...resultsArray].filter(
      lead => lead.fitScore >= fitScoreRange[0] && lead.fitScore <= fitScoreRange[1]
    );

    if (industryFilter !== 'All') {
      processed = processed.filter(lead => lead.industry === industryFilter);
    }

    if (sortConfig) {
      processed.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return processed;
  }, [results, fitScoreRange, industryFilter, sortConfig]);

  return (
    <div className="space-y-6">
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 space-y-4">
            <div className="flex items-center gap-3 text-orange-500">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base font-bold text-foreground">Reset All Finds?</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              This will remove all <span className="font-bold text-foreground">{leads.length} lead{leads.length !== 1 ? 's' : ''}</span> from your pipeline — including enriched and contacted ones. All websites will appear as new in future searches.
            </p>
            <p className="text-xs text-muted-foreground">Your ICP and product context will be kept.</p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold hover:bg-muted transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                Reset Finds
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl border border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Lead Sourcing</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Finder</h1>
          <p className="text-muted-foreground text-sm">Define your Ideal Customer Profile and find your next big wins.</p>
        </div>
        {leads.length > 0 && (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-orange-500/30 text-orange-500 bg-orange-500/5 hover:bg-orange-500/10 text-xs font-bold uppercase tracking-widest transition-all"
          >
            <RotateCcw size={14} />
            Reset Last Finds
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ICP Form */}
        <div className="lg:col-span-4 bg-card p-6 rounded-xl border border-border shadow-subtle h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Filter size={20} />
            </div>
            <h2 className="text-lg font-bold">Define Your ICP</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Industry</label>
                  <select 
                    className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    value={icp.industry}
                    onChange={e => setIcp({...icp, industry: e.target.value})}
                    required
                  >
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Company Size</label>
                    <select 
                      className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      value={icp.companySize}
                      onChange={e => setIcp({...icp, companySize: e.target.value})}
                      required
                    >
                      <option value="">Select size...</option>
                      {COMPANY_SIZES.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Revenue</label>
                    <select 
                      className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      value={icp.revenueRange}
                      onChange={e => setIcp({...icp, revenueRange: e.target.value})}
                      required
                    >
                      <option value="">Select revenue...</option>
                      {REVENUE_RANGES.map(rev => (
                        <option key={rev} value={rev}>{rev}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Geography</label>
                <div className="grid grid-cols-2 gap-2">
                  {GEOGRAPHIES.map(geo => (
                    <label key={geo} className="flex items-center gap-2 cursor-pointer group p-2 hover:bg-muted rounded-xl transition-all">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                        checked={icp.geography.includes(geo)}
                        onChange={() => {
                          setIcp(prev => ({
                            ...prev,
                            geography: prev.geography.includes(geo)
                              ? prev.geography.filter(g => g !== geo)
                              : [...prev.geography, geo]
                          }));
                        }}
                      />
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{geo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Job Titles</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {icp.targetJobTitles.map(title => (
                    <span key={title} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-bold border border-primary/20">
                      {title}
                      <button type="button" onClick={() => setIcp(prev => ({...prev, targetJobTitles: prev.targetJobTitles.filter(t => t !== title)}))}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 px-3 py-2 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Add title..."
                    value={jobTitleInput}
                    onChange={e => setJobTitleInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), icp.targetJobTitles.push(jobTitleInput), setJobTitleInput(''))}
                  />
                  <button type="button" onClick={() => {if(jobTitleInput){icp.targetJobTitles.push(jobTitleInput); setJobTitleInput('');}}} className="p-2 bg-muted hover:bg-border rounded-xl text-muted-foreground">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-1 mt-4 disabled:opacity-70 shadow-lg shadow-primary/25 interactive-hover"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">{LOADING_MESSAGES[loadingMessageIndex]}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Rocket size={18} />
                  <span>Find Leads</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-card p-4 rounded-xl border border-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-4">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Min Fit Score</div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={fitScoreRange[0]} 
                onChange={(e) => setFitScoreRange([parseInt(e.target.value), fitScoreRange[1]])}
                className="w-32 h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-sm font-bold text-primary">{fitScoreRange[0]}+</span>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handleSelectAll} className="px-3 py-1.5 text-[10px] font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-all">Select All</button>
              <button onClick={handleClearAll} className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground bg-muted hover:bg-border rounded-lg transition-all">Clear All</button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-subtle overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-background rounded-lg border border-border flex items-center justify-center text-primary">
                  <Search size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{filteredAndSortedResults.length} leads matching</h3>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-background text-foreground border border-border rounded-lg text-[10px] font-bold hover:bg-muted flex items-center gap-2 transition-all">
                <Download size={14} /> Export CSV
              </button>
            </div>
            
            {/* Mobile View Card List */}
            <div className="sm:hidden divide-y divide-border">
              {filteredAndSortedResults.map((lead) => (
                <div key={lead.id} className={cn(
                  "p-4 transition-all active:bg-muted",
                  selectedIds.has(lead.id) ? "bg-primary/[0.03]" : "bg-card"
                )}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-bold text-foreground">
                        {lead.company.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{lead.company}</h4>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase">{lead.industry}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-lg text-[10px] font-bold border",
                        getFitScoreColor(lead.fitScore)
                      )}>{lead.fitScore}</span>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20"
                        checked={selectedIds.has(lead.id)}
                        onChange={() => toggleSelect(lead.id)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 bg-muted rounded-lg flex items-center gap-2">
                      <Users size={12} className="text-muted-foreground" />
                      <span className="text-xs font-medium">{lead.employeeCount}</span>
                    </div>
                    <div className="p-2 bg-muted rounded-lg flex items-center gap-2">
                      <DollarSign size={12} className="text-muted-foreground" />
                      <span className="text-xs font-medium">{lead.revenue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold">
                    <div className="flex items-center gap-1"><MapPin size={10} /> {lead.hqLocation}</div>
                    <a href={lead.websiteUrl} className="text-primary flex items-center gap-1">Visit <ExternalLink size={10} /></a>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-4 py-3 w-10">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-border text-primary"
                        checked={filteredAndSortedResults.length > 0 && selectedIds.size === filteredAndSortedResults.length}
                        onChange={(e) => e.target.checked ? handleSelectAll() : handleClearAll()}
                      />
                    </th>
                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer hover:bg-muted" onClick={() => requestSort('company')}>
                      Company <ArrowUpDown size={10} className="inline ml-1" />
                    </th>
                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Industry</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Size</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Revenue</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Location</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center" onClick={() => requestSort('fitScore')}>
                      Fit <ArrowUpDown size={10} className="inline ml-1" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={7} className="px-4 py-6"><Skeleton className="h-4 w-full" /></td>
                      </tr>
                    ))
                  ) : filteredAndSortedResults.map((lead) => (
                    <tr key={lead.id} className={cn(
                      "transition-all group table-row-alt",
                      selectedIds.has(lead.id) && "bg-primary/[0.04] hover:bg-primary/[0.06]"
                    )}>
                      <td className="px-4 py-4">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-border text-primary cursor-pointer"
                          checked={selectedIds.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center font-bold text-foreground border border-border group-hover:border-primary/30 transition-all">
                            {lead.company.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm group-hover:text-primary transition-colors">{lead.company}</div>
                            <div className="text-[10px] text-muted-foreground">{lead.websiteUrl?.split('//')[1]}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4"><span className="text-xs font-medium px-2 py-0.5 bg-muted rounded-lg">{lead.industry}</span></td>
                      <td className="px-4 py-4 text-xs font-medium text-muted-foreground">{lead.employeeCount}</td>
                      <td className="px-4 py-4 text-xs font-medium text-muted-foreground">{lead.revenue}</td>
                      <td className="px-4 py-4 text-xs font-medium text-muted-foreground">{lead.hqLocation}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={cn(
                          "inline-flex items-center justify-center px-2 py-0.5 rounded-lg text-[10px] font-bold border",
                          getFitScoreColor(lead.fitScore)
                        )}>
                          {lead.fitScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {results.length > 0 && (
              <div className="p-6 bg-background/50 border-t border-border flex justify-center">
                <button 
                  onClick={handleEnrichSelected}
                  disabled={selectedIds.size === 0}
                  className={cn(
                    "px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 interactive-hover",
                    selectedIds.size > 0 
                      ? "bg-foreground text-background shadow-lg" 
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <Layers size={18} />
                  Enrich {selectedIds.size} Leads
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
