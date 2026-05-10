/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadManagement from './components/LeadManagement';
import MarketAnalysisComponent from './components/MarketAnalysisComponent';
import OperationHub from './components/OperationHub';
import AgentChatComponent from './components/AgentChatComponent';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'leads': return <LeadManagement />;
      case 'market': return <MarketAnalysisComponent />;
      case 'ops': return <OperationHub />;
      case 'agent': return <AgentChatComponent />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white flex overflow-x-hidden">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={(id) => {
          setActiveSection(id);
          setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 min-h-screen flex flex-col w-full lg:pl-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b-2 border-slate-900 p-4 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 flex items-center justify-center">
              <span className="text-white text-xs font-black">H</span>
            </div>
            <h1 className="text-sm font-black uppercase tracking-tighter">HubIA</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 border-2 border-slate-900"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Header Section */}
        <header className="px-6 lg:px-12 pt-8 lg:pt-12 pb-6 border-b-2 border-slate-900 mx-4 lg:mx-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none">Colega Digital</h1>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-[10px] mt-2">Sistema de Orquestração Agêntica / PropTech v2.4</p>
          </div>
          <div className="flex gap-4 lg:gap-8 text-left">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">STATUS</p>
              <p className="text-xs font-mono font-bold text-emerald-600 uppercase mt-1">● Ativo</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">SINC</p>
              <p className="text-xs font-mono font-bold uppercase mt-1">OK</p>
            </div>
          </div>
        </header>

        <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Bar */}
        <footer className="px-6 lg:px-12 py-8 border-t border-slate-200 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-center md:text-left">
          <div>PropOps Infrastructure Hub © 2024</div>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            <span>Segurança: AES-256</span>
            <span>Uptime: 99.9%</span>
            <span>v2.4.0</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

