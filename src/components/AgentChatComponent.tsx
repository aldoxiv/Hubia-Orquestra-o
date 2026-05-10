import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAgent } from '@/src/services/geminiService';
import { Send, Bot, User, Cpu, Terminal, ExternalLink, RefreshCcw, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'agent' | 'user';
  text: string;
  timestamp: string;
}

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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const context = {
      active_leads: 24,
      pending_tasks: 8,
      market_status: 'Volátil',
      last_sync: '2 mins atrás'
    };

    const responseText = await chatWithAgent(input, context);

    const agentMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'agent',
      text: responseText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, agentMsg]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col bg-white border-2 border-slate-900 shadow-[12px_12px_0px_0px_rgba(226,232,240,1)]">
      <div className="p-4 lg:p-6 bg-slate-900 border-b-2 border-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white flex items-center justify-center shrink-0">
            <Cpu size={24} className="text-slate-900" />
          </div>
          <div>
            <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest leading-none">Agente Colega v2.4</h3>
            <div className="flex items-center gap-2 mt-1 lg:mt-2">
              <div className="w-2 h-2 bg-emerald-400" />
              <p className="text-[8px] lg:text-[9px] text-emerald-400 font-bold uppercase tracking-tighter">Sincronizado com CRM Legado</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-full text-center md:text-left text-[8px] lg:text-[10px] font-mono font-bold uppercase text-slate-400 border border-slate-700 px-3 py-1">
            SESSION_ID: AI_ORC_482
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 lg:space-y-8 scroll-smooth scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-6 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-none flex items-center justify-center shrink-0 border-2 ${
                msg.role === 'user' ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-slate-900 border-slate-900 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-6 border-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.05)] ${
                msg.role === 'user' 
                  ? 'bg-slate-50 border-slate-200 text-slate-900' 
                  : 'bg-white border-slate-900 text-slate-900'
              }`}>
                <p className="text-xs font-bold leading-relaxed uppercase tracking-tight">{msg.text}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center opacity-30 text-[9px] font-black uppercase">
                  <span>{msg.role === 'user' ? 'OPERADOR' : 'AGENTE'}</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-6 max-w-[80%] items-center">
              <div className="w-8 h-8 border-2 border-slate-900 bg-slate-900 text-white flex items-center justify-center">
                <Loader2 className="animate-spin" size={16} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 animate-pulse">Consultando Redes Agênticas...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-8 bg-slate-50 border-t-2 border-slate-900">
        <div className="relative flex items-center gap-4 p-2 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(226,232,240,1)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Executar comando de orquestração..."
            className="flex-1 bg-transparent border-none focus:outline-none px-4 text-xs font-bold uppercase tracking-wider text-slate-900 placeholder:text-slate-300"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-6 flex items-center gap-8 px-1">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
            <ExternalLink size={12} />
            Legado Sync: OK
          </p>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
            <RefreshCcw size={12} />
            Hub: Ativo
          </p>
        </div>
      </div>
    </div>
  );
}
