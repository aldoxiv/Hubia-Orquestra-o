import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeMarket } from '@/src/services/geminiService';
import { TrendingUp, AlertTriangle, Lightbulb, MapPin, Search, ArrowUpRight, ArrowDownRight, Sparkles, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockProperty = {
  address: "Av. Paulista, 1000",
  type: "Comercial",
  neighborhood: "Bela Vista",
  currentPrice: 4500000,
  history: [
    { date: '2023-01', price: 4100000 },
    { date: '2023-06', price: 4300000 },
    { date: '2024-01', price: 4450000 },
    { date: '2024-05', price: 4500000 },
  ]
};

export default function MarketAnalysisComponent() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeMarket(mockProperty);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b-2 border-slate-900 pb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-slate-900">Previsão Automática</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 underline underline-offset-4 decoration-2 decoration-slate-900">Análise Preditiva Jardins / Bela Vista</p>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[6px_6px_0px_0px_rgba(226,232,240,1)]"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {loading ? 'PROCESSANDO_IA' : 'Gerar Relatório v2.4'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="p-8 bg-white border-2 border-slate-900">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Tendência Histórica vs Projeção</h3>
              <p className="text-[10px] font-mono font-bold text-slate-400 tracking-tighter uppercase">Market_Data Sync_OK</p>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProperty.history}>
                  <CartesianGrid strokeDasharray="1 4" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#fff', fontSize: '10px' }}
                  />
                  <Line type="stepAfter" dataKey="price" stroke="#0f172a" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-2 border-slate-900 p-8 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 border-b border-emerald-100 pb-2">Oportunidades de Valorização</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 mt-1 shrink-0" />
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">Nova estação de metrô a 300m (Impacto: Alto)</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 mt-1 shrink-0" />
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">Demanda por flats: +12% YoY</p>
                </li>
              </ul>
            </div>
            <div className="border-2 border-slate-900 p-8 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600 border-b border-rose-100 pb-2">Indicadores de Risco</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-rose-400 mt-1 shrink-0" />
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">Saturação de novos lançamentos (Micro-área)</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-rose-400 mt-1 shrink-0" />
                  <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase tracking-tight">Volatilidade juros financiamento</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            {analysis ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900 p-8 space-y-8 h-full shadow-[12px_12px_0px_0px_rgba(226,232,240,1)]"
              >
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4 underline underline-offset-4 decoration-emerald-400 decoration-2">IA SUGERIDO</p>
                  <p className="text-5xl font-black italic tracking-tighter text-white">
                    R$ {analysis.suggestedPrice.toLocaleString('pt-BR')}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest leading-none">
                    <ArrowUpRight size={14} />
                    +{((analysis.suggestedPrice / mockProperty.currentPrice - 1) * 100).toFixed(1)}% vs Atual
                  </div>
                </div>

                <div className="space-y-6 border-t border-slate-700 pt-8">
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-black uppercase text-white tracking-widest">Racional Estratégico</h5>
                    <p className="text-slate-400 text-[10px] uppercase font-bold leading-relaxed tracking-tight">
                      {analysis.reasoning}
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-slate-800 pt-6">
                    <h5 className="text-[10px] font-black uppercase text-white tracking-widest">Cenários_IA</h5>
                    {analysis.riskScenarios.map((risk: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-wider">
                        <div className="w-1 h-1 bg-rose-500" />
                        {risk}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {analysis.marketTrends.map((trend: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-slate-700">
                        {trend}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white border-2 border-dashed border-slate-300 p-12 h-full flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center mb-6">
                  <TrendingUp size={24} className="text-slate-400" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hub em Standby</h4>
                <p className="text-[9px] font-bold text-slate-300 uppercase mt-2">Inicie a orquestração v2.4 no topo.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
