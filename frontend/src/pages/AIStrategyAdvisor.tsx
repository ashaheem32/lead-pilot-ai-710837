import React, { useState, useRef, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { useToast } from '../context/ToastContext';
import { emitter } from '../agentSdk';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  LayoutDashboard, 
  Zap, 
  Info, 
  Layers, 
  MousePointer2,
  Brain,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const QUICK_PROMPT_CHIPS = [
  "Which leads should I prioritize?",
  "What objections will I likely face?",
  "Rewrite top lead's email - more casual",
  "Best time to reach out this week?",
  "Analyze my ICP targeting",
  "Create a 5-day cadence for #1 lead",
  "Compare my top 3 leads",
  "Suggest better subject lines"
];

const AGENT_ID = "c00af298-c519-4ac1-8cea-b2ed6c6bbd04";

export const AIStrategyAdvisor = () => {
  const { leads, productContext } = useLeads();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      { 
        id: 'welcome', 
        role: 'assistant', 
        content: leads.length > 0 
          ? `Hello! I'm your AI Strategy Advisor. I've analyzed your pipeline of **${leads.length} leads**. How can I help you optimize your outreach strategy today?`
          : "Hello! I'm LeadPilot AI. I'm ready to help you build a high-performance sales pipeline. **Start by defining your ICP in the Lead Finder module** so I can provide specific strategic advice.",
        timestamp: Date.now()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  // Sync pipeline state with agent
  useEffect(() => {
    if (leads.length > 0) {
      emitter.emit({
        agentId: AGENT_ID,
        event: 'pipeline_updated',
        payload: {
          totalLeads: leads.length,
          enrichedLeads: leads.filter(l => l.status === 'enriched').length,
          outreachReady: leads.filter(l => l.outreachSequences).length,
          topLeads: leads.sort((a, b) => b.fitScore - a.fitScore).slice(0, 5)
        }
      });
    }
  }, [leads]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    
    const userMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const result = await emitter.emit({
        agentId: AGENT_ID,
        event: 'user_query',
        payload: {
          query: text,
          pipelineContext: {
            leads: leads.slice(0, 10), // Send a slice for context
            productContext
          }
        }
      });

      const assistantMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: typeof result === 'string' ? result : (result as any)?.response || "I've analyzed your query. How else can I help?",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
      showToast("Advisor agent error", 'error');
    } finally {
      setLoading(false);
    }
  };

  const enrichedCount = leads.filter(l => l.status === 'enriched' || l.status === 'contacted').length;
  const outreachCount = leads.filter(l => l.outreachSequences).length;
  const topLeads = [...leads].sort((a, b) => b.fitScore - a.fitScore).slice(0, 3);
  
  const latestTriggers = leads
    .flatMap(l => (l.triggers || []).map(t => ({ ...t, company: l.company })))
    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
    .slice(0, 3);

  const getNextStep = () => {
    if (leads.length === 0) return {
      title: "Define ICP",
      desc: "Generate leads to start",
      path: "/finder",
      icon: <Target className="text-blue-500" />
    };
    if (enrichedCount < leads.length) return {
      title: "Enrich Leads",
      desc: "Get deep intelligence",
      path: "/enrichment",
      icon: <Layers className="text-purple-500" />
    };
    if (outreachCount < leads.length) return {
      title: "Generate Outreach",
      desc: "Create AI sequences",
      path: "/outreach",
      icon: <Zap className="text-amber-500" />
    };
    return {
      title: "Dashboard",
      desc: "Track conversion",
      path: "/",
      icon: <LayoutDashboard className="text-emerald-500" />
    };
  };

  const nextStep = getNextStep();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col -m-8 overflow-hidden bg-white rounded-[2.5rem] border border-slate-200 shadow-xl">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] relative">
          {/* Header */}
          <div className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4f6ef7] to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 animate-in zoom-in">
                <Brain size={26} className="fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#1a1f36] tracking-tight">Strategy Advisor</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">AI Agent Active</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowContext(!showContext)}
              className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 hover:text-[#4f6ef7] transition-all border border-transparent hover:border-slate-200 shadow-sm md:hidden"
            >
              <Info size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 scroll-smooth custom-scrollbar bg-slate-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "flex gap-5 max-w-[90%] md:max-w-[80%] animate-in fade-in slide-in-from-bottom-2 duration-500",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-110",
                  msg.role === 'assistant' 
                    ? "bg-white text-[#4f6ef7] border border-slate-100" 
                    : "bg-[#4f6ef7] text-white shadow-blue-500/20"
                )}>
                  {msg.role === 'assistant' ? <Brain size={24} /> : <User size={24} />}
                </div>
                <div className={cn(
                  "relative group flex flex-col",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "p-6 rounded-[2rem] text-[15px] leading-loose shadow-sm border transition-all duration-300",
                    msg.role === 'assistant' 
                      ? "bg-white border-slate-100 rounded-tl-none group-hover:shadow-md" 
                      : "bg-[#1a1f36] border-slate-800 text-white rounded-tr-none shadow-slate-900/10"
                  )}>
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        strong: ({node, ...props}) => <strong className={cn("font-black tracking-tight", msg.role === 'assistant' ? "text-[#1a1f36]" : "text-white")} {...props} />,
                        h1: ({node, ...props}) => <h1 className="text-2xl font-black mb-4 tracking-tight" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-black mb-3 tracking-tight" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-black mb-2 tracking-tight" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  <div className={cn(
                    "mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2",
                    msg.role === 'user' ? "text-right" : "text-left"
                  )}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-5 mr-auto max-w-[80%] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-12 h-12 rounded-[1.25rem] bg-white border border-slate-100 text-[#4f6ef7] flex items-center justify-center shrink-0 shadow-sm">
                  <Brain size={24} className="animate-pulse" />
                </div>
                <div className="bg-white border border-slate-100 p-6 rounded-[2rem] rounded-tl-none shadow-sm flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4f6ef7] animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#4f6ef7] animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#4f6ef7] animate-bounce"></span>
                  </div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Advisor is formulating strategy...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Next Steps */}
          <div className="px-6 md:px-10 pb-6 shrink-0">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-5 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-slate-200/50 hover:border-[#4f6ef7]/30 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-50 transition-colors"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-inner group-hover:scale-110 transition-transform">
                  {nextStep.icon}
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#1a1f36] leading-none tracking-tight">Recommended Next Step</h4>
                  <p className="text-sm font-medium text-slate-400 mt-1.5">{nextStep.title}: {nextStep.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => (window.location.href = nextStep.path)}
                className="mt-4 sm:mt-0 px-8 py-3 bg-[#1a1f36] text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg active:scale-95 relative z-10"
              >
                Go to Module
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Input Area */}
          <div className="p-6 md:p-8 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            {/* Quick Prompt Chips */}
            <div className="flex gap-2.5 overflow-x-auto pb-5 no-scrollbar scroll-smooth">
              {QUICK_PROMPT_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(chip)}
                  className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all whitespace-nowrap shadow-sm flex items-center gap-2.5 group shrink-0 active:scale-95"
                >
                  <Sparkles size={14} className="text-[#4f6ef7] group-hover:scale-125 transition-transform" />
                  {chip}
                </button>
              ))}
            </div>

            <div className="relative max-w-5xl mx-auto group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask about your pipeline strategy..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] pl-8 pr-24 py-6 focus:outline-none focus:ring-4 focus:ring-[#4f6ef7]/10 focus:bg-white focus:border-[#4f6ef7]/30 transition-all min-h-[80px] max-h-48 text-base font-medium text-slate-700 resize-none leading-relaxed shadow-inner"
              />
              <div className="absolute right-4 bottom-4 flex items-center gap-3">
                <button
                  onClick={() => handleSend(input)}
                  disabled={loading || !input.trim()}
                  className="w-14 h-14 bg-[#4f6ef7] text-white rounded-2xl flex items-center justify-center hover:bg-[#3d59d1] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-blue-500/40 active:scale-90 group/send"
                >
                  {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} className="group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform" />}
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-6">Powered by Strategy-Advisor-Agent v2.0</p>
          </div>
        </div>

        {/* Right Sidebar Context Panel */}
        <div className={cn(
          "bg-white border-l border-slate-200 flex flex-col transition-all duration-500 ease-in-out shrink-0 relative z-20 overflow-hidden",
          showContext ? "w-96" : "w-0 md:w-0"
        )}>
          {/* Toggle Button */}
          <button 
            onClick={() => setShowContext(!showContext)}
            className="absolute -left-3 top-24 w-6 h-14 bg-white border border-slate-200 rounded-l-2xl flex items-center justify-center text-slate-300 hover:text-[#4f6ef7] shadow-xl z-30 transition-colors"
          >
            {showContext ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 min-w-[384px] bg-white custom-scrollbar">
            {/* Pipeline Summary */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4f6ef7]"></div>
                Pipeline Overview
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <SummaryCard label="Total Leads" value={leads.length} icon={<Users size={18} />} color="blue" />
                <SummaryCard label="Enriched Intel" value={enrichedCount} icon={<Layers size={18} />} color="purple" />
                <SummaryCard label="Outreach Ready" value={outreachCount} icon={<Zap size={18} />} color="amber" />
              </div>
            </section>

            {/* Priority Leads */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                Top Priority Targets
              </h3>
              <div className="space-y-4">
                {topLeads.length > 0 ? (
                  topLeads.map((lead, idx) => (
                    <div key={lead.id} className="group relative bg-slate-50/50 border border-slate-100 rounded-3xl p-5 hover:bg-white hover:border-[#4f6ef7]/30 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 shadow-sm group-hover:scale-110 transition-transform",
                          idx === 0 ? "bg-[#FFD700] text-[#856404]" :
                          idx === 1 ? "bg-slate-200 text-slate-500" :
                          "bg-orange-100 text-orange-600"
                        )}>
                          #{idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base font-black text-[#1a1f36] truncate group-hover:text-[#4f6ef7] transition-colors tracking-tight">{lead.company}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Target size={10} className="text-[#4f6ef7]" /> Fit: {lead.fitScore}%
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-200 group-hover:text-[#4f6ef7] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">No targets found</p>
                  </div>
                )}
              </div>
            </section>

            {/* Latest Triggers */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                Strategic Velocity
              </h3>
              <div className="space-y-6">
                {latestTriggers.length > 0 ? (
                  latestTriggers.map((trigger, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-100 group/trigger">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#4f6ef7] group-hover/trigger:scale-150 transition-transform shadow-lg shadow-blue-500/50"></div>
                      <div className="text-[10px] font-black text-[#4f6ef7] mb-1.5 uppercase tracking-[0.15em] truncate">
                        {trigger.company}
                      </div>
                      <p className="text-[13px] font-bold text-slate-700 leading-relaxed mb-2">
                        {trigger.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock size={10} className="text-slate-300" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{trigger.date || 'Recently'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">No triggers detected</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, icon, color }: any) => {
  const styles: Record<string, string> = {
    blue: "hover:border-blue-200 hover:shadow-blue-500/5",
    purple: "hover:border-purple-200 hover:shadow-purple-500/5",
    amber: "hover:border-amber-200 hover:shadow-amber-500/5"
  };

  const iconColors: Record<string, string> = {
    blue: "text-[#4f6ef7] bg-blue-50",
    purple: "text-purple-500 bg-purple-50",
    amber: "text-amber-500 bg-amber-50"
  };

  return (
    <div className={cn(
      "bg-slate-50/50 p-5 rounded-[1.5rem] border border-slate-100 group transition-all duration-300",
      styles[color]
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform", iconColors[color])}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-black text-[#1a1f36] tracking-tight group-hover:translate-x-1 transition-transform">{value}</div>
    </div>
  );
};