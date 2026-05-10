import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, TrendingUp, Cpu, LayoutDashboard, MessageSquare, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeSection, setActiveSection, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'leads', label: 'Gestão de Leads', icon: Users },
    { id: 'market', label: 'Análise de Mercado', icon: TrendingUp },
    { id: 'ops', label: 'Orquestração Ops', icon: Activity },
    { id: 'agent', label: 'Colega Digital', icon: MessageSquare },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`w-64 bg-white border-r-2 border-slate-900 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:relative lg:translate-x-0 lg:h-screen shrink-0 overflow-y-auto`}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center shrink-0">
              <Cpu className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-slate-900 font-black text-lg tracking-tighter leading-none uppercase">HubIA</h1>
              <p className="text-slate-400 text-[9px] font-black tracking-widest mt-1">ORQUESTRAÇÃO</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-[10px] font-black uppercase tracking-wider transition-all border-l-4 ${
                  activeSection === item.id
                    ? 'bg-slate-900 text-white border-emerald-400 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]'
                    : 'text-slate-400 hover:text-slate-900 border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} />
                  {item.label}
                </div>
                {activeSection === item.id && <ArrowRight size={12} className="text-emerald-400" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t-2 border-slate-900">
          <div className="bg-slate-100 p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-[9px] font-black uppercase text-slate-900 mb-2 underline underline-offset-2">LOG_AGENTE</p>
            <div className="font-mono text-[9px] text-slate-600 space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500" /> SYSTEM_READY
              </p>
              <p className="flex items-center gap-2 opacity-50">
                <span className="w-1.5 h-1.5 border border-slate-400" /> SYNC_WAIT
              </p>
            </div>
          </div>
        </div>
      </div>
  </>
);
}
