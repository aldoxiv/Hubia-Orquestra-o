import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAgent } from '@/src/services/geminiService';
import { Send, Bot, User, Cpu, Terminal, ExternalLink, RefreshCcw, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'agent' | 'user';
  text: string;
  timestamp: string;
}

const SYSTEM_CONTEXT = {
  active_leads: 24,
  pending_tasks: 8,
  market_status: 'Volátil',
  last_sync: '2 mins atrás'
};

export default function AgentChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      text: 'Olá! Sou seu Colega Digital. Acabei de verificar o CRM e notei que temos 3 leads com score alto aguardando resposta. Gostaria que eu iniciasse o fluxo de qualificação para eles ou prefere analisar o relatório de mercado primeiro?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getSuggestions = () => {
    const suggestions = [];
    if (SYSTEM_CONTEXT.market_status === 'Volátil') {
      suggestions.push('Analisar Tendências de Mercado');
    }
    if (SYSTEM_CONTEXT.active_leads > 10) {
      suggestions.push('Qualificar Novos Leads');
    }
    if (SYSTEM_CONTEXT.pending_tasks > 5) {
      suggestions.push('Resumir Tarefas Pendentes');
    }
    suggestions.push('Gerar Relatório de Performance');
    return suggestions;
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    setLoading(true);

    const responseText = await chatWithAgent(messageText, SYSTEM_CONTEXT);

    const agentMsg: Message = {
      id: `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: 'agent',
      text: responseText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, agentMsg]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(226,232,240,1)] lg:shadow-[12px_12px_0px_0px_rgba(226,232,240,1)] overflow-hidden">
      <div className="p-4 lg:p-6 bg-slate-900 border-b-2 border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white shrink-0">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center shrink-0">
            <Cpu size={24} className="text-slate-900" />
          </div>
          <div>
            <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">Agente Colega v2.4</h3>
            <div className="flex items-center gap-2 mt-1 lg:mt-2">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-400" />
              <p className="text-[7px] lg:text-[9px] text-emerald-400 font-bold uppercase tracking-tighter">Sincronizado com CRM Legado</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-full text-center md:text-left text-[8px] lg:text-[10px] font-mono font-bold uppercase text-slate-400 border border-slate-700 px-3 py-1">
            SESSION_ID: AI_ORC_482
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4 lg:space-y-8 scroll-smooth scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 lg:gap-6 max-w-[95%] lg:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 border-2 ${
                msg.role === 'user' ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-900 border-slate-900 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 lg:p-6 border-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.05)] ${
                msg.role === 'user' 
                  ? 'bg-slate-50 border-slate-200 text-slate-900 font-medium' 
                  : 'bg-white border-slate-900 text-slate-900'
              }`}>
                <p className="text-[10px] lg:text-xs font-bold leading-relaxed uppercase tracking-tight">{msg.text}</p>
                <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-slate-100 flex justify-between items-center opacity-30 text-[8px] lg:text-[9px] font-black uppercase">
                  <span>{msg.role === 'user' ? 'OPERADOR' : 'AGENTE'}</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-4 lg:gap-6 max-w-[80%] items-center">
              <div className="w-8 h-8 border-2 border-slate-900 bg-slate-900 text-white flex items-center justify-center">
                <Loader2 className="animate-spin" size={16} />
              </div>
              <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-slate-400 animate-pulse">Consultando Redes Agênticas...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 lg:p-8 bg-slate-50 border-t-2 border-slate-900 shrink-0">
        <div className="mb-4 lg:mb-6 flex flex-wrap gap-2 lg:gap-3">
          {getSuggestions().map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSend(suggestion)}
              className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-white border border-slate-200 text-[8px] lg:text-[10px] font-black uppercase tracking-tight text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] active:translate-y-0.5 active:shadow-none"
            >
              <Sparkles size={10} className="lg:order-none" />
              <span className="truncate max-w-[120px] lg:max-w-none">{suggestion}</span>
            </motion.button>
          ))}
        </div>
        <div className="relative flex items-center gap-2 lg:gap-4 p-1.5 lg:p-2 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(226,232,240,1)] lg:shadow-[6px_6px_0px_0px_rgba(226,232,240,1)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Executar comando..."
            className="flex-1 bg-transparent border-none focus:outline-none px-2 lg:px-4 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-slate-900 placeholder:text-slate-300"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50 shrink-0"
          >
            <Send size={16} lg:size={18} />
          </button>
        </div>
        <div className="mt-4 lg:mt-6 flex flex-wrap items-center gap-4 lg:gap-8 px-1">
          <p className="text-[8px] lg:text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
            <ExternalLink size={10} lg:size={12} />
            Legado Sync: OK
          </p>
          <p className="text-[8px] lg:text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
            <RefreshCcw size={10} lg:size={12} />
            Hub: Ativo
          </p>
        </div>
      </div>
    </div>
  );
}
