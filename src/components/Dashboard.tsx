import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { UserCheck, Wallet, ArrowUpRight, TrendingUp, LayoutGrid, Clock } from 'lucide-react';

const data = [
  { name: 'Jan', leads: 400, conv: 24 },
  { name: 'Fev', leads: 300, conv: 13 },
  { name: 'Mar', leads: 200, conv: 98 },
  { name: 'Abr', leads: 278, conv: 39 },
  { name: 'Mai', leads: 189, conv: 48 },
];

const StatCard = ({ title, value, change, icon: Icon, bg }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`p-6 group relative overflow-hidden ${bg === 'dark' ? 'bg-slate-900 text-white' : 'bg-white border-2 border-slate-900'}`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`p-2 ${bg === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} border border-transparent group-hover:border-slate-400 transition-colors`}>
        <Icon size={20} />
      </div>
      <span className={`text-[10px] font-mono font-bold px-2 py-1 ${change > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change > 0 ? '+' : ''}{change}%
      </span>
    </div>
    <h3 className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-1 ${bg === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{title}</h3>
    <p className={`text-4xl font-light italic leading-none tracking-tighter ${bg === 'dark' ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    
    <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200">
      <div className={`h-full ${change > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`} style={{ width: '70%' }} />
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Qualificação Total" value="1,284" change={12.5} icon={UserCheck} bg="dark" />
        <StatCard title="Volume de Vendas" value="12.4M" change={8.2} icon={Wallet} />
        <StatCard title="Mercado (Jardins)" value="+4.2%" change={2.1} icon={TrendingUp} />
        <StatCard title="Tasks Agênticas" value="84" change={-5.4} icon={LayoutGrid} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-slate-200 pb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Eficiência de Qualificação</h3>
            <p className="text-[10px] font-bold text-emerald-600">Sincronizado</p>
          </div>
          <div className="h-[300px] border-2 border-slate-100 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="1 4" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#fff', fontSize: '10px' }}
                />
                <Area type="stepBefore" dataKey="leads" stroke="#0f172a" fill="#0f172a" fillOpacity={0.05} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-slate-200 pb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Conversão de Ativos</h3>
            <p className="text-[10px] font-bold text-slate-400 font-mono">PREVISÃO_ATIVA</p>
          </div>
          <div className="h-[300px] border-2 border-slate-100 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="1 4" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `R$ ${val}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', color: '#fff', fontSize: '10px' }}
                />
                <Bar dataKey="conv" fill="#0f172a" radius={0} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
