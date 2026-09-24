import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Loader2, 
  Lightbulb, 
  RefreshCw 
} from 'lucide-react';

export default function AiChatbot({ result }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hello! I am **LaunchLens Co-Pilot**, your virtual startup consultant. 

I have full analytical context on your startup idea. You can ask me to:
- Critique your value proposition or elevator pitch
- Recommend an MVP feature backlog to launch in 4 weeks
- Suggest specific tactics to acquire your first 100 paying customers
- Prepare for seed investor due diligence questions
- Optimize your pricing tiers and unit economics

What strategic question would you like to explore?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const contextData = result ? {
    startup_name: result.startup_name,
    industry: result.industry,
    problem: result.validation_insights?.target_persona?.primary_icp?.core_pain_points?.join(' ') || '',
    solution: result.business_plan?.sections?.[1]?.content || '',
    business_model: result.validation_insights?.pricing_strategy?.recommended_model || 'B2B SaaS',
    feasibility_score: result.feasibility?.overall_feasibility_score || 75
  } : {
    startup_name: 'Your Startup',
    industry: 'SaaS',
    feasibility_score: 75
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: contextData
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: "I encountered a network issue communicating with the server. Please check your backend connection." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const samplePrompts = [
    "How should I structure my seed round pitch deck?",
    "What should be in our 4-week lean MVP?",
    "How do I acquire my first 100 paying customers?",
    "How should I price our monthly subscription tiers?",
    "What are the biggest competitive risks we face?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              LaunchLens Co-Pilot
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              AI Startup Consultant powered by venture intelligence & Lean Startup methodologies
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-slate-500 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-slate-500 shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          Prompt Chips:
        </span>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-indigo-300 border border-slate-700/60 transition-all cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl h-[520px] flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto space-y-4 pr-2 flex-1">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                  isUser ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400 border border-slate-700'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                }`}>
                  {m.content}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>Formulating venture strategy...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-4 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask LaunchLens Co-Pilot anything about your startup thesis..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
