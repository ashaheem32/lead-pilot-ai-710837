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
  Calendar, 
  ArrowUpDown, 
  ChevronRight,
  X,
  Plus,
  Layers,
  Sparkles,
  ExternalLink
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
  "North America", "Europe", "Asia-Pacific", "Latin America", 
  "Middle East & Africa", "Global"
];

const PRESET_JOB_TITLES = [
  "CEO", "CTO", "VP Sales", "VP Marketing", "Head of Growth", 
  "CMO", "CFO", "Director of Operations", "Product Manager"
];

export const LeadFinder = () => {
  const navigate = useNavigate();
  const { addLeads, setCurrentICP, currentICP } = useLeads();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [results, setResults] = useState<Lead[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [fitScoreRange, setFitScoreRange] = useState<[number, number]>([0, 100]);
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Lead, direction: 'asc' | 'desc' } | null>(null);
  
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
      showToast(`${leadsArray.length} leads found matching your ICP!`, 'success');
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Something went wrong while finding leads. Please try again.");
      setResults([]);
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

  const handleEnrichSelected = () => {
    const resultsArray = Array.isArray(results) ? results : [];
    const selectedLeads = resultsArray.filter(l => selectedIds.has(l.id));
    addLeads(selectedLeads);
    showToast(`${selectedLeads.length} leads added to enrichment pipeline`, 'info');
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
    if (score >= 80) return "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (score >= 30) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-red-100 text-red-700 border-red-200";
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
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return processed;
  }, [results, fitScoreRange, industryFilter, sortConfig]);

  const toggleGeography = (geo: string) => {
    setIcp(prev => ({
      ...prev,
      geography: prev.geography.includes(geo)
        ? prev.geography.filter(g => g !== geo)
        : [...prev.geography, geo]
    }));
  };

  const addJobTitle = (title: string) => {
    if (title && !icp.targetJobTitles.includes(title)) {
      setIcp(prev => ({
        ...prev,
        targetJobTitles: [...prev.targetJobTitles, title]
      }));
    }
    setJobTitleInput('');
  };

  const removeJobTitle = (title: string) => {
    setIcp(prev => ({
      ...prev,
      targetJobTitles: prev.targetJobTitles.filter(t => t !== title)
    }));
  };

  const addKeyword = (keyword: string) => {
    if (keyword && !icp.technologyKeywords.includes(keyword)) {
      setIcp(prev => ({
        ...prev,
        technologyKeywords: [...prev.technologyKeywords, keyword]
      }));
    }
    setKeywordInput('');
  };

  const removeKeyword = (keyword: string) => {
    setIcp(prev => ({
      ...prev,
      technologyKeywords: prev.technologyKeywords.filter(k => k !== keyword)
    }));
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#4f6ef7]" />
            <span className="text-xs font-black text-[#4f6ef7] uppercase tracking-[0.2em]">Lead Sourcing</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1a1f36] tracking-tight">Lead Finder</h1>
          <p className="text-slate-500 font-medium">Define your Ideal Customer Profile and let LeadPilot AI find your next big wins.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ICP Form */}
        <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#4f6ef7]/10 rounded-xl flex items-center justify-center">
              <Filter size={24} className="text-[#4f6ef7]" />
            </div>
            <h2 className="text-xl font-bold text-[#1a1f36]">Define Your ICP</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Industry</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/20 focus:border-[#4f6ef7] text-sm font-medium transition-all"
                  value={icp.industry}
                  onChange={e => setIcp({...icp, industry: e.target.value})}
                  required
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                {icp.industry === 'Other' && (
                  <input 
                    type="text"
                    className="w-full px-4 py-3 mt-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/20 focus:border-[#4f6ef7] text-sm font-medium transition-all"
                    placeholder="Enter custom industry..."
                    value={customIndustry}
                    onChange={e => setCustomIndustry(e.target.value)}
                    required
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Size</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/20 focus:border-[#4f6ef7] text-sm font-medium transition-all"
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
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Annual Revenue</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/20 focus:border-[#4f6ef7] text-sm font-medium transition-all"
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

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Geography</label>
                <div className="grid grid-cols-2 gap-3">
                  {GEOGRAPHIES.map(geo => (
                    <label key={geo} className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border border-slate-300 rounded-md checked:bg-[#4f6ef7] checked:border-[#4f6ef7] transition-all"
                          checked={icp.geography.includes(geo)}
                          onChange={() => toggleGeography(geo)}
                        />
                        <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 group-hover:text-[#1a1f36] transition-colors">{geo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Job Titles</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {icp.targetJobTitles.map(title => (
                    <span key={title} className="inline-flex items-center gap-1 px-3 py-1 bg-[#4f6ef7]/10 text-[#4f6ef7] rounded-full text-xs font-bold border border-[#4f6ef7]/20 animate-in zoom-in duration-200">
                      {title}
                      <button type="button" onClick={() => removeJobTitle(title)} className="hover:text-[#1a1f36]">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/20 focus:border-[#4f6ef7] text-sm font-medium transition-all"
                    placeholder="Type custom title..."
                    value={jobTitleInput}
                    onChange={e => setJobTitleInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addJobTitle(jobTitleInput))}
                  />
                  <button 
                    type="button" 
                    onClick={() => addJobTitle(jobTitleInput)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-600 active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {PRESET_JOB_TITLES.filter(t => !icp.targetJobTitles.includes(t)).slice(0, 6).map(title => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => addJobTitle(title)}
                      className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200 transition-colors uppercase"
                    >
                      + {title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Keywords / Technologies</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {icp.technologyKeywords.map(keyword => (
                    <span key={keyword} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200 animate-in zoom-in duration-200">
                      {keyword}
                      <button type="button" onClick={() => removeKeyword(keyword)} className="hover:text-[#1a1f36]">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f6ef7]/20 focus:border-[#4f6ef7] text-sm font-medium transition-all"
                    placeholder="AI, Salesforce, HubSpot..."
                    value={keywordInput}
                    onChange={e => setKeywordInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addKeyword(keywordInput))}
                  />
                  <button 
                    type="button" 
                    onClick={() => addKeyword(keywordInput)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-600 active:scale-95"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#4f6ef7] hover:bg-[#3d59d1] text-white font-bold rounded-2xl transition-all flex flex-col items-center justify-center gap-1 mt-8 disabled:opacity-70 shadow-lg shadow-blue-500/25 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <div className="w-full px-8 mt-2">
                    <div className="h-1 bg-blue-400/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-1/2 animate-[progress_2s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black animate-pulse mt-2">{LOADING_MESSAGES[loadingMessageIndex]}</span>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Rocket size={24} className="fill-current" />
                  <span className="text-lg">Find Leads</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fit Score Range</label>
                <span className="text-sm font-bold text-[#4f6ef7]">{fitScoreRange[0]} - {fitScoreRange[1]}</span>
              </div>
              <div className="relative h-6 flex items-center">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={fitScoreRange[0]} 
                  onChange={(e) => setFitScoreRange([parseInt(e.target.value), fitScoreRange[1]])}
                  className="absolute w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#4f6ef7]"
                />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={fitScoreRange[1]} 
                  onChange={(e) => setFitScoreRange([fitScoreRange[0], parseInt(e.target.value)])}
                  className="absolute w-full h-1.5 bg-transparent appearance-none cursor-pointer accent-[#4f6ef7]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-40">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Industry Filter</label>
                <select 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none hover:border-[#4f6ef7] transition-colors"
                  value={industryFilter}
                  onChange={e => setIndustryFilter(e.target.value)}
                >
                  <option value="All">All Industries</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button 
                  onClick={handleSelectAll}
                  className="px-4 py-2 text-xs font-bold text-[#4f6ef7] bg-[#4f6ef7]/10 hover:bg-[#4f6ef7]/20 rounded-xl transition-all active:scale-95"
                >
                  Select All
                </button>
                <button 
                  onClick={handleClearAll}
                  className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <Search size={18} className="text-[#4f6ef7]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1f36]">{results.length > 0 ? `${filteredAndSortedResults.length} leads found` : 'No leads to display'}</h3>
                  {results.length > 0 && (
                    <p className="text-xs font-bold text-[#4f6ef7] uppercase tracking-wider mt-0.5">
                      {selectedIds.size} of {filteredAndSortedResults.length} leads selected
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-2 transition-all shadow-sm active:scale-95">
                  <Download size={14} />
                  Export CSV
                </button>
              </div>
            </div>
            
            {/* Mobile View Card List */}
            <div className="md:hidden divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-2xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-8 rounded-xl" />
                      <Skeleton className="h-8 rounded-xl" />
                    </div>
                  </div>
                ))
              ) : filteredAndSortedResults.length > 0 ? (
                filteredAndSortedResults.map((lead) => (
                  <div key={lead.id} className={cn(
                    "p-6 transition-all active:bg-slate-50",
                    selectedIds.has(lead.id) ? "bg-[#4f6ef7]/[0.03]" : "bg-white"
                  )}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-black text-[#1a1f36] shadow-inner">
                          {lead.company.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-[#1a1f36] leading-tight">{lead.company}</h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Building2 size={10} className="text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.industry}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-2.5 py-1 rounded-lg text-[10px] font-black border shadow-sm",
                          getFitScoreColor(lead.fitScore)
                        )}>{lead.fitScore}</span>
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-6 h-6 border border-slate-300 rounded-lg checked:bg-[#4f6ef7] checked:border-[#4f6ef7] transition-all"
                            checked={selectedIds.has(lead.id)}
                            onChange={() => toggleSelect(lead.id)}
                          />
                          <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Employees</p>
                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><Users size={12} /> {lead.employeeCount}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Revenue</p>
                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><DollarSign size={12} /> {lead.revenue}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <MapPin size={12} />
                        {lead.hqLocation}
                      </div>
                      <a href={lead.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-[#4f6ef7] flex items-center gap-1">
                        Visit <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                ))
              ) : null}
            </div>

            {/* Desktop View Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 w-12 sticky left-0 bg-white z-10">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border border-slate-300 rounded-md checked:bg-[#4f6ef7] checked:border-[#4f6ef7] transition-all cursor-pointer"
                          checked={filteredAndSortedResults.length > 0 && selectedIds.size === filteredAndSortedResults.length}
                          onChange={(e) => e.target.checked ? handleSelectAll() : handleClearAll()}
                        />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => requestSort('company')}
                    >
                      <div className="flex items-center gap-2">
                        Company <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => requestSort('industry')}
                    >
                      <div className="flex items-center gap-2">
                        Industry <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => requestSort('employeeCount')}
                    >
                      <div className="flex items-center gap-2">
                        Employees <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => requestSort('revenue')}
                    >
                      <div className="flex items-center gap-2">
                        Revenue <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => requestSort('hqLocation')}
                    >
                      <div className="flex items-center gap-2">
                        Location <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th 
                      className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors text-center"
                      onClick={() => requestSort('fitScore')}
                    >
                      <div className="flex items-center justify-center gap-2">
                        Fit Score <ArrowUpDown size={12} />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-5"><Skeleton className="h-5 w-5" /></td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-11 w-11 rounded-xl" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5"><Skeleton className="h-5 w-24 rounded-lg" /></td>
                        <td className="px-4 py-5"><Skeleton className="h-4 w-12" /></td>
                        <td className="px-4 py-5"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-4 py-5"><Skeleton className="h-4 w-24" /></td>
                        <td className="px-4 py-5 text-center"><Skeleton className="h-8 w-12 rounded-full mx-auto" /></td>
                      </tr>
                    ))
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-32 text-center">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 border border-red-100 shadow-sm shadow-red-500/10">
                            <X size={40} className="text-red-400" />
                          </div>
                          <h4 className="text-lg font-bold text-[#1a1f36] mb-2">Search Failed</h4>
                          <p className="text-sm font-medium text-slate-500 mb-6">{error}</p>
                          <button 
                            onClick={(e) => handleSearch(e as any)}
                            className="px-8 py-3 bg-[#4f6ef7] text-white rounded-xl font-bold hover:bg-[#3d59d1] transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-blue-500/20"
                          >
                            <Rocket size={18} />
                            Try Again
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : filteredAndSortedResults.length > 0 ? (
                    filteredAndSortedResults.map((lead) => (
                      <tr key={lead.id} className={cn(
                        "hover:bg-[#4f6ef7]/[0.02] transition-all group",
                        selectedIds.has(lead.id) && "bg-[#4f6ef7]/[0.04]"
                      )}>
                        <td className="px-6 py-5 sticky left-0 bg-white group-hover:bg-[#fcfcff] z-10 transition-colors">
                          <div className="flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              className="peer appearance-none w-5 h-5 border border-slate-300 rounded-md checked:bg-[#4f6ef7] checked:border-[#4f6ef7] transition-all cursor-pointer"
                              checked={selectedIds.has(lead.id)}
                              onChange={() => toggleSelect(lead.id)}
                            />
                            <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center text-[#1a1f36] font-black text-sm border border-slate-200 group-hover:border-[#4f6ef7]/30 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                              {lead.company.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-[#1a1f36] text-sm group-hover:text-[#4f6ef7] transition-colors">{lead.company}</div>
                              <a href={lead.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[#4f6ef7]/70 hover:text-[#4f6ef7] uppercase tracking-tight flex items-center gap-1 mt-0.5 transition-colors">
                                <Globe size={10} />
                                {lead.websiteUrl?.replace('https://www.', '').replace('http://www.', '').split('/')[0]}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 group-hover:border-slate-200 transition-colors">
                            <Building2 size={12} className="text-slate-400" />
                            {lead.industry}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-sm font-semibold text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Users size={14} className="text-slate-400" />
                            {lead.employeeCount}
                          </div>
                        </td>
                        <td className="px-4 py-5 text-sm font-semibold text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <DollarSign size={14} className="text-slate-400" />
                            {lead.revenue}
                          </div>
                        </td>
                        <td className="px-4 py-5 text-sm font-semibold text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-slate-400" />
                            {lead.hqLocation}
                          </div>
                        </td>
                        <td className="px-4 py-5 text-center">
                          <span className={cn(
                            "inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-full text-xs font-black border shadow-sm transition-all duration-300 group-hover:scale-110",
                            getFitScoreColor(lead.fitScore)
                          )}>
                            {lead.fitScore}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-32 text-center animate-in fade-in duration-500">
                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100 shadow-inner relative overflow-hidden group">
                            <Search size={48} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#4f6ef7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <h4 className="text-2xl font-black text-[#1a1f36] mb-3 tracking-tight">No Leads to Show</h4>
                          <p className="text-sm font-medium text-slate-400 leading-relaxed">
                            {results.length > 0 
                              ? 'Your current filters are too restrictive. Try broadening your fit score range or industry selection to find more potential matches.' 
                              : 'Define your target audience in the ICP panel on the left and launch an AI-powered search to find your ideal B2B leads.'}
                          </p>
                          {!results.length && (
                            <div className="mt-8 flex items-center gap-4 text-xs font-black text-slate-300 uppercase tracking-widest">
                              <div className="flex items-center gap-1.5"><Check size={14} className="text-[#10b981]" /> High Accuracy</div>
                              <div className="h-4 w-[1px] bg-slate-100"></div>
                              <div className="flex items-center gap-1.5"><Check size={14} className="text-[#10b981]" /> Verified Data</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {results.length > 0 && (
              <div className="p-8 bg-white border-t border-slate-100 flex justify-center sticky bottom-0 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                <button 
                  onClick={handleEnrichSelected}
                  disabled={selectedIds.size === 0}
                  className={cn(
                    "px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-4 shadow-2xl",
                    selectedIds.size > 0 
                      ? "bg-[#1a1f36] text-white hover:bg-slate-900 hover:scale-[1.02] active:scale-[0.98] shadow-blue-900/30" 
                      : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
                  )}
                >
                  <Layers size={22} className={selectedIds.size > 0 ? "animate-bounce" : ""} />
                  Enrich {selectedIds.size} Selected Leads
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};