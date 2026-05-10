import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, TrendingUp, Cpu, LayoutDashboard, MessageSquare, ShieldCheck, Activity } from 'lucide-react';

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

      <div className={`w-64 bg-white border-r-2 border-slate-900 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static lg:h-auto`}>
        <div className="p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-slate-900 rounded-none flex items-center justify-center">
            <Cpu className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-slate-900 font-black text-xl tracking-tighter leading-none uppercase">HubIA</h1>
            <p className="text-slate-400 text-[10px] font-bold tracking-widest mt-1">ORQUESTRAÇÃO</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b border-transparent ${
                activeSection === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-400 hover:text-slate-900 hover:border-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                {item.label}
              </div>
              {activeSection === item.id && <div className="w-1.5 h-1.5 bg-emerald-400" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-slate-100">
        <div className="bg-slate-50 p-4 border border-slate-200">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Log do Agente</p>
          <div className="font-mono text-[9px] text-slate-500 space-y-1">
            <p className="flex items-center gap-2">
              <span className="text-emerald-500">●</span> SYSTEM_READY
            </p>
            <p className="flex items-center gap-2 opacity-50">
              <span>○</span> SYNC_WAITING
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
