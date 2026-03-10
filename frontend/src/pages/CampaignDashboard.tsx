import React, { useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  Send, 
  Target,
  Database,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  FileJson,
  FileSpreadsheet,
  Trophy,
  Mail,
  Linkedin,
  Phone,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  TooltipProps
} from 'recharts';
import { cn } from '../lib/utils';

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1f36] p-3 shadow-2xl rounded-xl border border-slate-700 animate-in fade-in zoom-in duration-200">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label || payload[0].name}</p>
        <p className="text-sm font-black text-white">
          {`${payload[0].name ? '' : 'Leads: '}${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export const CampaignDashboard = () => {
  const { leads, currentICP } = useLeads();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // 1. Key Metrics Calculations
  const metrics = useMemo(() => {
    const totalLeads = leads.length;
    const enrichedLeads = leads.filter(l => l.status === 'enriched' || l.status === 'contacted').length;
    const outreachCreated = leads.filter(l => l.outreachSequences).length;
    const avgFitScore = totalLeads > 0 
      ? Math.round(leads.reduce((acc, curr) => acc + curr.fitScore, 0) / totalLeads) 
      : 0;

    return { totalLeads, enrichedLeads, outreachCreated, avgFitScore };
  }, [leads]);

  // 2. Funnel Data
  const funnelData = useMemo(() => {
    const total = leads.length;
    const enriched = leads.filter(l => l.status === 'enriched' || l.status === 'contacted').length;
    const outreachReady = leads.filter(l => l.outreachSequences).length;
    const sent = leads.filter(l => l.status === 'contacted').length;

    return [
      { name: 'Leads Found', value: total, color: '#4f6ef7' },
      { name: 'Enriched', value: enriched, color: '#8b5cf6' },
      { name: 'Outreach Ready', value: outreachReady, color: '#10b981' },
      { name: 'Sent', value: sent, color: '#f59e0b' },
    ];
  }, [leads]);

  // 3. Industry Breakdown
  const industryData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach(l => {
      counts[l.industry] = (counts[l.industry] || 0) + 1;
    });
    
    const total = leads.length;
    return Object.entries(counts)
      .map(([name, value]) => ({ 
        name, 
        value, 
        percentage: total > 0 ? Math.round((value / total) * 100) : 0 
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [leads]);

  // 4. Fit Score Distribution
  const fitScoreDistribution = useMemo(() => {
    const ranges = [
      { name: '80-100', count: 0, color: '#10b981' },
      { name: '60-79', count: 0, color: '#3b82f6' },
      { name: '40-59', count: 0, color: '#f59e0b' },
      { name: '0-39', count: 0, color: '#ef4444' },
    ];

    leads.forEach(l => {
      if (l.fitScore >= 80) ranges[0].count++;
      else if (l.fitScore >= 60) ranges[1].count++;
      else if (l.fitScore >= 40) ranges[2].count++;
      else ranges[3].count++;
    });

    return ranges;
  }, [leads]);

  // 5. Company Size Breakdown
  const companySizeData = useMemo(() => {
    const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
    const counts: Record<string, number> = {};
    
    leads.forEach(l => {
      const size = l.employeeCount || 'Unknown';
      counts[size] = (counts[size] || 0) + 1;
    });

    return sizes.map(name => ({
      name,
      value: counts[name] || 0
    }));
  }, [leads]);

  // 6. Outreach Breakdown
  const outreachBreakdown = useMemo(() => {
    const leadsWithOutreach = leads.filter(l => l.outreachSequences);
    const emailSequences = leadsWithOutreach.filter(l => l.outreachSequences?.emails).length;
    const linkedinMessages = leadsWithOutreach.filter(l => l.outreachSequences?.linkedin).length;
    const coldCallScripts = leadsWithOutreach.filter(l => l.outreachSequences?.coldCall).length;
    
    const totalEmails = emailSequences * 3;
    const totalLinkedIn = linkedinMessages * 2;
    const totalScripts = coldCallScripts;
    const totalTouchpoints = totalEmails + totalLinkedIn + totalScripts;
    
    // 15 min per lead manual vs AI
    const timeSaved = Math.round((leadsWithOutreach.length * 15) / 60);

    return {
      emailSequences,
      totalEmails,
      linkedinMessages,
      totalLinkedIn,
      coldCallScripts,
      totalScripts,
      totalTouchpoints,
      timeSaved
    };
  }, [leads]);

  // 7. Priority Lead Ranking
  const priorityLeads = useMemo(() => {
    return leads.map(l => {
      const confidenceMap = { High: 100, Medium: 70, Low: 40 };
      const confidenceScore = confidenceMap[l.enrichmentScore || 'Low'] || 0;
      const triggerScore = (l.triggers?.length || 0) > 0 ? 100 : 0;
      
      const combinedScore = Math.round(
        (l.fitScore * 0.5) + (confidenceScore * 0.3) + (triggerScore * 0.2)
      );

      return {
        ...l,
        combinedScore,
        topTrigger: l.triggers?.[0]?.description || 'No triggers found'
      };
    })
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .slice(0, 10);
  }, [leads]);

  const COLORS = ['#4f6ef7', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  const handleExport = (type: string) => {
    showToast(`Exporting ${type} report...`, 'success');
  };

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#4f6ef7]">
            <TrendingUp size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Live Analytics</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1a1f36] tracking-tight">Campaign Dashboard</h1>
          <p className="text-slate-500 font-medium">Real-time performance metrics and lead intelligence across your pipeline.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            System Live
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-200 shadow-sm">
            <Clock size={14} /> Updated: Just now
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col gap-8">
          {/* Key Metrics - Empty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl mb-4 animate-pulse"></div>
                <div className="h-3 w-20 bg-slate-50 rounded mb-2 animate-pulse"></div>
                <div className="h-8 w-12 bg-slate-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm animate-in zoom-in duration-700">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner group cursor-pointer overflow-hidden relative">
              <BarChart3 size={48} className="text-slate-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4f6ef7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h2 className="text-3xl font-black text-[#1a1f36] tracking-tight">Dashboard Empty</h2>
            <p className="text-slate-400 mt-3 max-w-sm mx-auto font-medium text-lg leading-relaxed">
              Start by identifying leads in the Lead Finder to populate your dashboard with real-time intelligence.
            </p>
            <button 
              onClick={() => navigate('/finder')}
              className="mt-10 px-10 py-4 bg-[#4f6ef7] text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:bg-[#3d59d1] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Zap size={18} />
              Launch Lead Finder
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ROW 1 - KEY METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              label="Leads Found" 
              value={metrics.totalLeads} 
              icon={<Users size={24} />} 
              color="blue"
              trend="+12%"
            />
            <MetricCard 
              label="Leads Enriched" 
              value={metrics.enrichedLeads} 
              icon={<Database size={24} />} 
              color="purple"
              trend="+5%"
            />
            <MetricCard 
              label="Outreach Created" 
              value={metrics.outreachCreated} 
              icon={<Send size={24} />} 
              color="emerald"
              trend="+22%"
            />
            <MetricCard 
              label="Avg Fit Score" 
              value={`${metrics.avgFitScore}`} 
              icon={<Target size={24} />} 
              color={metrics.avgFitScore >= 80 ? 'emerald' : metrics.avgFitScore >= 50 ? 'amber' : 'rose'}
              isScore
              trend="stable"
            />
          </div>

          {/* ROW 2 - PIPELINE + INDUSTRY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pipeline Funnel */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <h3 className="text-xl font-black text-[#1a1f36] mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform"><BarChart3 size={20} className="text-[#4f6ef7]" /></div> 
                Pipeline Funnel
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8', textAnchor: 'start' }}
                      width={120}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 8 }} />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {funnelData.slice(1).map((item, i) => {
                  const prevValue = funnelData[i].value;
                  const conversion = prevValue > 0 ? Math.round((item.value / prevValue) * 100) : 0;
                  return (
                    <div key={i} className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Conv.</div>
                      <div className="text-sm font-black text-[#4f6ef7]">{conversion}%</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Industry Breakdown */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <h3 className="text-xl font-black text-[#1a1f36] mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform"><PieChartIcon size={20} className="text-purple-500" /></div> 
                Industry Breakdown
              </h3>
              <div className="h-[300px] w-full flex flex-col sm:flex-row items-center">
                <div className="flex-1 h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={industryData.length > 0 ? industryData : [{ name: 'No Data', value: 1 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={8}
                        dataKey="value"
                        isAnimationActive={true}
                        stroke="none"
                      >
                        {(industryData.length > 0 ? industryData : [{ name: 'No Data', value: 1 }]).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-64 space-y-4 mt-6 sm:mt-0 sm:pl-6">
                  {industryData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group/item cursor-default">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="text-xs font-bold text-slate-500 truncate max-w-[120px] group-hover/item:text-slate-900 transition-colors">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-[#1a1f36]">{item.value}</span>
                        <span className="text-[10px] font-black text-slate-400 w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3 - DISTRIBUTION + COMPANY SIZE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fit Score Distribution */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <h3 className="text-xl font-black text-[#1a1f36] mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform"><Target size={20} className="text-emerald-500" /></div> 
                Fit Score Distribution
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fitScoreDistribution} layout="vertical" margin={{ left: 0, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontStyle: 'italic', fontWeight: 900, fill: '#94a3b8' }}
                      width={70}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 8 }} />
                    <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={32}>
                      {fitScoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Company Size Breakdown */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <h3 className="text-xl font-black text-[#1a1f36] mb-8 flex items-center gap-3 tracking-tight">
                <div className="p-2 bg-orange-50 rounded-xl group-hover:scale-110 transition-transform"><Users size={20} className="text-orange-500" /></div> 
                Company Size Matrix
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={companySizeData} margin={{ bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 10 }} />
                    <Bar dataKey="value" fill="#4f6ef7" radius={[10, 10, 0, 0]} barSize={45} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ROW 4 - OUTREACH BREAKDOWN */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-[#1a1f36] flex items-center gap-3 tracking-tight">
                <Sparkles size={24} className="text-[#10b981]" /> Outreach Performance
              </h3>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                Generated Content Analysis
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <OutreachCard 
                title="Email Sequences" 
                count={outreachBreakdown.emailSequences}
                detail={`${outreachBreakdown.totalEmails} total emails`}
                icon={<Mail className="text-[#4f6ef7]" size={22} />}
                color="blue"
              />
              <OutreachCard 
                title="LinkedIn Messages" 
                count={outreachBreakdown.linkedinMessages}
                detail={`${outreachBreakdown.totalLinkedIn} total messages`}
                icon={<Linkedin className="text-indigo-600" size={22} />}
                color="indigo"
              />
              <OutreachCard 
                title="Cold Call Scripts" 
                count={outreachBreakdown.coldCallScripts}
                detail={`${outreachBreakdown.totalScripts} total scripts`}
                icon={<Phone className="text-emerald-600" size={22} />}
                color="emerald"
              />
              <div className="bg-[#1a1f36] p-7 rounded-3xl border border-slate-700 shadow-2xl shadow-slate-900/10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="p-2 bg-blue-500/20 rounded-xl"><Clock size={20} className="text-[#4f6ef7]" /></div>
                  <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20">Efficiency</span>
                </div>
                <div className="text-3xl font-black relative z-10 tracking-tight">{outreachBreakdown.timeSaved} Hours</div>
                <div className="text-sm text-slate-400 font-bold mt-1 relative z-10">AI Efficiency Savings</div>
                <div className="mt-4 text-[10px] text-slate-500 italic relative z-10 font-medium">Based on 15 min manual research/lead</div>
              </div>
            </div>
          </div>

          {/* ROW 5 - PRIORITY LEAD RANKING */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500">
            <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/30">
              <div>
                <h3 className="text-2xl font-black text-[#1a1f36] tracking-tight flex items-center gap-3">
                  <Trophy size={24} className="text-[#FFD700]" /> Priority Ranking
                </h3>
                <p className="text-sm font-medium text-slate-400 mt-1">Top qualified leads based on Fit, Confidence, and Trigger velocity.</p>
              </div>
              <button 
                onClick={() => navigate('/finder')}
                className="px-6 py-3 bg-white text-[#4f6ef7] border border-[#4f6ef7]/20 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#4f6ef7]/5 transition-all flex items-center gap-2 active:scale-95 shadow-sm"
              >
                Find More Leads <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-white border-b border-slate-50">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Intelligence</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Score</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fit Score</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Confidence</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategic Trigger</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Outreach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {priorityLeads.map((lead, index) => (
                    <tr 
                      key={lead.id} 
                      className={cn(
                        "hover:bg-[#4f6ef7]/[0.02] transition-all group cursor-pointer",
                        index === 0 ? "bg-[#FFD700]/[0.02]" : 
                        index === 1 ? "bg-slate-50/30" : 
                        index === 2 ? "bg-orange-50/20" : ""
                      )}
                      onClick={() => navigate('/outreach', { state: { leadId: lead.id } })}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shadow-sm",
                            index === 0 ? "bg-[#FFD700] text-[#856404] rotate-3" :
                            index === 1 ? "bg-[#C0C0C0] text-[#495057]" :
                            index === 2 ? "bg-[#CD7F32] text-white -rotate-3" :
                            "bg-slate-100 text-slate-400"
                          )}>
                            {index === 0 ? <Trophy size={14} /> : index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md transition-transform group-hover:scale-110",
                            index === 0 ? "bg-[#FFD700]" :
                            index === 1 ? "bg-[#C0C0C0]" :
                            index === 2 ? "bg-[#CD7F32]" :
                            "bg-[#4f6ef7]"
                          )}>
                            {lead.company.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-[#1a1f36] group-hover:text-[#4f6ef7] transition-colors flex items-center gap-1.5 tracking-tight">
                              {lead.company}
                              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-0.5">{lead.industry}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000",
                                lead.combinedScore >= 80 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : 
                                lead.combinedScore >= 60 ? "bg-[#4f6ef7] shadow-[0_0_8px_rgba(79,110,247,0.4)]" : 
                                "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                              )}
                              style={{ width: `${lead.combinedScore}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-[#1a1f36]">{lead.combinedScore}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "text-xs font-black",
                          lead.fitScore >= 80 ? "text-emerald-600" : 
                          lead.fitScore >= 60 ? "text-[#4f6ef7]" : 
                          "text-amber-600"
                        )}>
                          {lead.fitScore}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                          lead.enrichmentScore === 'High' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          lead.enrichmentScore === 'Medium' ? "bg-amber-50 text-amber-600 border-amber-100" :
                          "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                          {lead.enrichmentScore || 'Low'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-[11px] text-slate-500 line-clamp-1 max-w-[200px] font-bold italic group-hover:text-slate-900 transition-colors">
                          "{lead.topTrigger}"
                        </p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className={cn(
                          "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          lead.status === 'contacted' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                          lead.outreachSequences ? "bg-[#4f6ef7] text-white shadow-lg shadow-blue-500/20 animate-pulse" :
                          "bg-slate-100 text-slate-400"
                        )}>
                          {lead.status === 'contacted' ? 'Sent' : lead.outreachSequences ? 'Ready' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ROW 6 - EXPORT CENTER */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-[#4f6ef7] shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Download size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#1a1f36] tracking-tight">Intelligence Export Center</h3>
                  <p className="text-sm font-medium text-slate-400 mt-1">Generate and download comprehensive pipeline reports for external CRM integration.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
                <button 
                  onClick={() => handleExport('Campaign')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1f36] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  <FileSpreadsheet size={18} /> Full Campaign
                </button>
                <button 
                  onClick={() => handleExport('Priority')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 text-[#1a1f36] rounded-2xl text-xs font-black uppercase tracking-widest hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all shadow-sm active:scale-95"
                >
                  <Target size={18} className="text-[#4f6ef7]" /> Priority List
                </button>
                <button 
                  onClick={() => handleExport('Outreach')}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 text-[#1a1f36] rounded-2xl text-xs font-black uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-500 transition-all shadow-sm active:scale-95"
                >
                  <FileJson size={18} className="text-emerald-500" /> AI Outreach
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Sub-components
const MetricCard = ({ label, value, icon, color, isScore = false, trend }: any) => {
  const colorMap: Record<string, any> = {
    blue: { bg: 'bg-blue-50', text: 'text-[#4f6ef7]', border: 'border-blue-100', iconBg: 'bg-white shadow-blue-500/10' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', iconBg: 'bg-white shadow-purple-500/10' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-white shadow-emerald-500/10' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-500', border: 'border-amber-100', iconBg: 'bg-white shadow-amber-500/10' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', iconBg: 'bg-white shadow-rose-500/10' },
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div className={cn(
      "bg-white p-7 rounded-[2rem] border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group relative overflow-hidden",
      style.border
    )}>
      <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 blur-2xl opacity-40", style.bg)}></div>
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={cn("p-3 rounded-2xl border border-slate-100 transition-transform group-hover:rotate-12 duration-500", style.text, style.iconBg)}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm",
            trend === 'stable' ? "bg-slate-100 text-slate-500" : "bg-emerald-500 text-white"
          )}>
            {trend} {trend !== 'stable' && <ArrowRight size={10} className="-rotate-45" />}
          </div>
        )}
      </div>
      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">{label}</h3>
      <div className="flex items-baseline gap-1 mt-1.5 relative z-10">
        <p className="text-4xl font-black text-[#1a1f36] tracking-tight">{value}</p>
        {isScore && <span className="text-slate-300 font-black text-xl">/100</span>}
      </div>
    </div>
  );
};

const OutreachCard = ({ title, count, detail, icon, color }: any) => {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-100 hover:border-blue-300',
    indigo: 'border-indigo-100 hover:border-indigo-300',
    emerald: 'border-emerald-100 hover:border-emerald-300',
  };

  return (
    <div className={cn(
      "bg-white p-7 rounded-[2rem] border shadow-sm transition-all duration-300 hover:shadow-lg group",
      colorMap[color] || 'border-slate-100'
    )}>
      <div className="flex items-center gap-4 mb-5">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform border border-slate-100">
          {icon}
        </div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
      </div>
      <div className="text-3xl font-black text-[#1a1f36] tracking-tight">{count}</div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{detail}</div>
      </div>
    </div>
  );
};
