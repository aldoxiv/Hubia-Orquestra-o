import React from 'react';
import { motion } from 'motion/react';
import { OperationLog } from '@/src/types';
import { Database, CreditCard, FileText, Globe, CheckCircle2, AlertCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';

const logs: OperationLog[] = [
  { id: '1', type: 'Portal', action: 'Captura de Leads Automática', status: 'Completo', timestamp: 'Agora' },
  { id: '2', type: 'CRM', action: 'Sincronização de Perfil de Leads', status: 'Completo', timestamp: '2 mins atrás' },
  { id: '3', type: 'Financeiro', action: 'Emissão de Boleto para Contrato #482', status: 'Pendente', timestamp: '5 mins atrás' },
  { id: '4', type: 'Contrato', action: 'Assinatura Digital - Unidade 202', status: 'Completo', timestamp: '15 mins atrás' },
  { id: '5', type: 'CRM', action: 'Disparo de Email Marketing Customizado', status: 'Erro', timestamp: '1 hora atrás' },
];

const SystemNode = ({ label, status, active, icon: Icon }: any) => (
  <div className={`p-6 border-2 transition-all flex flex-col items-center gap-3 ${
    active 
      ? 'border-slate-900 bg-slate-900 text-white scale-105 shadow-[8px_8px_0px_0px_rgba(226,232,240,1)]' 
      : 'border-slate-200 bg-white text-slate-400'
  }`}>
    <div className={`w-10 h-10 flex items-center justify-center border ${active ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-100 bg-slate-50'}`}>
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    <div className={`text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter border ${
      status === 'online' || status === 'Sincronizado' || status === 'Capturando' || status === 'Processando'
        ? 'text-emerald-400 border-emerald-400/20' 
        : 'text-slate-500 border-slate-200'
    }`}>
      {status}
    </div>
  </div>
);

export default function OperationHub() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-2 border-slate-900 pb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-slate-900">Hub de Operações</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 underline underline-offset-4 decoration-2 decoration-slate-900">Monitoramento de Orquestração em Tempo Real</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <SystemNode icon={Database} label="CRM Legado" status="Sincronizado" active={true} />
        <SystemNode icon={CreditCard} label="Hub Financeiro" status="Processando" active={true} />
        <SystemNode icon={FileText} label="Contratos Digitais" status="Standby" />
        <SystemNode icon={Globe} label="Portais Externos" status="Capturando" active={true} />
      </div>

      <div className="bg-white border-2 border-slate-900 overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
        <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center text-white">
          <h3 className="text-[10px] font-black uppercase tracking-widest">Console de Eventos Ativos</h3>
          <div className="flex gap-4">
            <span className="text-[9px] font-mono text-emerald-400 uppercase">Buffer: 4.2 MBps</span>
            <span className="text-[9px] font-mono text-slate-500 uppercase">Uptime: 4d 12h</span>
          </div>
        </div>
        <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto font-mono">
          {logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-50 transition-all flex gap-4 items-start group">
              <span className="text-[9px] text-slate-400 shrink-0 font-bold">
                [{log.timestamp}]
              </span>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 border ${
                log.status === 'Completo' ? 'border-emerald-100 text-emerald-600 bg-emerald-50' : 'border-amber-100 text-amber-600 bg-amber-50'
              }`}>
                {log.action}
              </span>
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight group-hover:text-slate-900 transition-colors">
                Origem: {log.type}
              </p>
              <div className="ml-auto">
                <div className={`w-2 h-2 ${log.status === 'Completo' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-100 border-2 border-slate-900">
          <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Latência Processamento</p>
          <p className="text-3xl font-black italic tracking-tighter text-slate-900">42ms</p>
          <div className="w-full h-1 bg-slate-200 mt-4 overflow-hidden">
            <div className="w-4/5 h-full bg-slate-900" />
          </div>
        </div>
        <div className="p-6 bg-slate-100 border-2 border-slate-900">
          <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Tokens Orquestrados</p>
          <p className="text-3xl font-black italic tracking-tighter text-slate-900">1.2M</p>
          <div className="w-full h-1 bg-slate-200 mt-4 overflow-hidden">
            <div className="w-1/2 h-full bg-slate-900" />
          </div>
        </div>
        <div className="p-6 bg-slate-100 border-2 border-slate-900">
          <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Carga de Sistemas</p>
          <p className="text-3xl font-black italic tracking-tighter text-slate-900">Normal</p>
          <div className="w-full h-1 bg-slate-200 mt-4 overflow-hidden">
            <div className="w-[98%] h-full bg-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
