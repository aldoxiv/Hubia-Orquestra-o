import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead } from '@/src/types';
import { Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, Sparkles, Cpu, ArrowRight } from 'lucide-react';

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'Roberto Silva',
    email: 'roberto@email.com',
    phone: '(11) 98765-4321',
    propertyInterest: 'Apartamento Jardins - 3 Quartos',
    budget: 2500000,
    status: 'Qualificando',
    qualificationScore: 85,
    aiObservation: 'Cliente possui urgência na mudança e financiamento pré-aprovado.',
    createdAt: '2024-05-09 14:30'
  },
  {
    id: '2',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(21) 99887-1122',
    propertyInterest: 'Casa de Condomínio - Barra',
    budget: 4800000,
    status: 'Novo',
    qualificationScore: 45,
    aiObservation: 'Interesse inicial detectado via ZAP Imóveis. Agente iniciando fluxo de qualificação.',
    createdAt: '2024-05-10 09:15'
  },
  {
    id: '3',
    name: 'Juliana Pires',
    email: 'jupires@email.com',
    phone: '(31) 98888-0000',
    propertyInterest: 'Studio Centro - Investimento',
    budget: 450000,
    status: 'Qualificado',
    qualificationScore: 95,
    aiObservation: 'Investidor recorrente. Perfil agressivo para fechamento rápido.',
    createdAt: '2024-05-08 17:50'
  }
];

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'text-slate-400 bg-slate-100';
      case 'Qualificando': return 'text-blue-600 bg-blue-50';
      case 'Qualificado': return 'text-emerald-600 bg-emerald-50';
      case 'Desqualificado': return 'text-rose-600 bg-rose-50';
      default: return 'text-slate-400 bg-slate-50';
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-2 border-slate-900 pb-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Qualificação Inteligente</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Agente Triando 24 Ativos Agora</p>
        </div>
        <button className="w-full md:w-auto px-6 py-2 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          <Sparkles size={14} />
          Forçar Orquestração
        </button>
      </div>

      <div className="flex gap-4 p-2 bg-slate-100 border border-slate-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Filtrar por metadados de lead..." 
            className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-900">
              <th className="px-6 py-4 text-slate-900 text-[10px] font-black uppercase tracking-widest">Identidade</th>
              <th className="px-6 py-4 text-slate-900 text-[10px] font-black uppercase tracking-widest">Ativo / Orçamento</th>
              <th className="px-6 py-4 text-slate-900 text-[10px] font-black uppercase tracking-widest text-center">Score_IA</th>
              <th className="px-6 py-4 text-slate-900 text-[10px] font-black uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-slate-900 text-[10px] font-black uppercase tracking-widest">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y border-slate-200">
            <AnimatePresence>
              {leads.map((lead) => (
                <motion.tr 
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-slate-900">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-tight">{lead.propertyInterest}</p>
                    <p className="text-xs font-mono font-black text-slate-900 mt-0.5">
                      R$ {lead.budget.toLocaleString('pt-BR')}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono font-black text-slate-900">{lead.qualificationScore}%</span>
                      <div className="w-16 h-1 bg-slate-100 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${lead.qualificationScore}%` }}
                          className={`h-full ${lead.qualificationScore > 80 ? 'bg-emerald-500' : 'bg-slate-900'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 font-black uppercase text-[9px] tracking-widest border-2 border-slate-900 ${getStatusColor(lead.status)} shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                      <ArrowRight size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16" />
        <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
          <Cpu size={24} className="text-slate-900" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 underline underline-offset-8 decoration-2 decoration-emerald-400">Insights do Oráculo</h4>
          <p className="text-slate-300 text-xs leading-relaxed max-w-2xl font-medium">
            Sincronização com o CRM detectou teto de qualificação para o setor "Jardins". O agente sugere re-priorizar leads do setor "Barra" para os próximos 3 ciclos de orquestração automatizada.
          </p>
        </div>
      </div>
    </div>
  );
}
