import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OperationLog } from '@/src/types';
import { Database, CreditCard, FileText, Globe, CheckCircle2, AlertCircle, Clock, ArrowRight, Sparkles, Settings, Wifi, ShieldCheck, Loader2, RefreshCcw } from 'lucide-react';

const logs: OperationLog[] = [
  { id: '1', type: 'Portal', action: 'Captura de Leads Automática', status: 'Completo', timestamp: 'Agora' },
  { id: '2', type: 'CRM', action: 'Sincronização de Perfil de Leads', status: 'Completo', timestamp: '2 mins atrás' },
  { id: '3', type: 'Financeiro', action: 'Emissão de Boleto para Contrato #482', status: 'Pendente', timestamp: '5 mins atrás' },
  { id: '4', type: 'Contrato', action: 'Assinatura Digital - Unidade 202', status: 'Completo', timestamp: '15 mins atrás' },
  { id: '5', type: 'CRM', action: 'Disparo de Email Marketing Customizado', status: 'Erro', timestamp: '1 hora atrás' },
];

const SystemNode = ({ label, status, active, icon: Icon, description }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-6 border-2 transition-all flex flex-col items-center gap-3 relative cursor-help ${
        active 
          ? 'border-slate-900 bg-slate-900 text-white shadow-[8px_8px_0px_0px_rgba(226,232,240,1)]' 
          : 'border-slate-200 bg-white text-slate-400'
      }`}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-48 p-3 bg-slate-900 border-2 border-emerald-400 text-white z-50 pointer-events-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1 border-b border-emerald-400/20 pb-1">Status Detalhado</p>
            <p className="text-[8px] leading-relaxed font-bold uppercase tracking-tight">{description}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r-2 border-b-2 border-emerald-400 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`w-10 h-10 flex items-center justify-center border ${active ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-100 bg-slate-50'}`}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      <div className={`text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter border ${
        status === 'online' || status === 'Sincronizado' || status === 'Capturando' || status === 'Processando'
          ? 'text-emerald-400 border-emerald-400/20' 
          : status === 'Retentiva'
            ? 'text-amber-400 border-amber-400/20 animate-pulse'
            : 'text-slate-500 border-slate-200'
      }`}>
        {status}
      </div>
    </div>
  );
};

export default function OperationHub() {
  const [crmUrl, setCrmUrl] = useState('https://api.crm-legado.io/v2');
  const [crmKey, setCrmKey] = useState('••••••••••••••••');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<null | 'success' | 'error'>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (retryCountdown !== null && retryCountdown > 0) {
      interval = setInterval(() => {
        setRetryCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (retryCountdown === 0) {
      handleTestConnection();
    }
    return () => clearInterval(interval);
  }, [retryCountdown]);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setIsRetrying(false);
    setRetryCountdown(null);
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    
    // Simulate API connection test
    setTimeout(() => {
      setIsTesting(false);
      const success = Math.random() > 0.6; // Increased failure rate to test retries
      setTestResult(success ? 'success' : 'error');

      if (!success) {
        setIsRetrying(true);
        // Random delay between 60s and 300s (1-5 minutes)
        const delay = Math.floor(Math.random() * (300 - 60 + 1) + 60);
        setRetryCountdown(delay);
      }
    }, 2000);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-2 border-slate-900 pb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-slate-900">Hub de Operações</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 underline underline-offset-4 decoration-2 decoration-slate-900">Monitoramento de Orquestração em Tempo Real</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <SystemNode 
          icon={Database} 
          label="CRM Legado" 
          status={testResult === 'success' ? 'Sincronizado' : isRetrying ? 'Retentiva' : 'Offline'} 
          active={testResult === 'success'} 
          description="Sincronização bidirecional de leads e atividades via API REST v2.4. Última verificação de integridade há 2 min."
        />
        <SystemNode 
          icon={CreditCard} 
          label="Hub Financeiro" 
          status="Processando" 
          active={true} 
          description="Processamento de faturas, boletos e conciliação bancária via gateway seguro. 14 transações em fila."
        />
        <SystemNode 
          icon={FileText} 
          label="Contratos Digitais" 
          status="Standby" 
          description="Monitoramento de assinaturas digitais. Aguardando interação do proponente em 2 contratos pendentes."
        />
        <SystemNode 
          icon={Globe} 
          label="Portais Externos" 
          status="Capturando" 
          active={true} 
          description="Scraping e integração via webhook com Zap Imóveis, VivaReal e OLX. Fluxo de entrada estável e monitorado."
        />
      </div>

      {/* CRM Configuration UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 border-2 border-slate-900 p-8 space-y-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
              <Settings className="text-slate-900" size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Configuração de Gateway CRM</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Endpoint de API</label>
                <input 
                  type="text" 
                  value={crmUrl}
                  onChange={(e) => setCrmUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 p-3 text-[10px] font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>
              
              <div>
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Chave Especial (Bearer)</label>
                <input 
                  type="password" 
                  value={crmKey}
                  onChange={(e) => setCrmKey(e.target.value)}
                  className="w-full bg-white border border-slate-200 p-3 text-[10px] font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className={`w-full text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${
                    isRetrying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {isTesting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      TESTANDO_SYNC...
                    </>
                  ) : isRetrying ? (
                    <>
                      <RefreshCcw size={16} className="animate-spin-slow" />
                      RETENTIVA EM {retryCountdown ? formatCountdown(retryCountdown) : '...'}
                    </>
                  ) : (
                    <>
                      <Wifi size={16} />
                      Testar Conexão
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {testResult && (
                  <motion.div 
                    key="test-result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 border-2 flex items-center gap-3 ${
                      testResult === 'success' 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                        : 'bg-rose-50 border-rose-500 text-rose-700'
                    }`}
                  >
                    {testResult === 'success' ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {testResult === 'success' ? 'Sincronização Validada' : 'Erro de Autenticação'}
                    </span>
                  </motion.div>
                )}
                {isRetrying && !isTesting && (
                  <motion.p 
                    key="retry-countdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[8px] font-black uppercase text-amber-600 tracking-tighter text-center"
                  >
                    Agendada nova tentativa automática para evitar deadlock de sistema
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-slate-900 overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] h-full">
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
