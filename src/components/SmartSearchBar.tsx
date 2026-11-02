import React, { useState } from 'react';
import { Search, Building2, Coins, FileText, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const SmartSearchBar: React.FC = () => {
  const { projects, approvals, setActiveTab } = useApp();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const matchedProjects = projects.filter(p => 
    p.name.includes(query) || p.location.includes(query) || p.category.includes(query)
  );

  const matchedApprovals = approvals.filter(a =>
    a.title.includes(query) || a.code.includes(query) || a.category.includes(query)
  );

  const hasResults = query.trim() !== '' && (matchedProjects.length > 0 || matchedApprovals.length > 0);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center bg-slate-900/90 backdrop-blur-md rounded-2xl border border-blue-500/30 shadow-xl px-4 py-2.5">
        <Search className="w-5 h-5 text-blue-400 ml-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="بحث ذكي: ابحث باسم المشروع، الكود المرجعي للعقود، أو الميزانية..."
          className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none text-right"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {isFocused && hasResults && (
        <div className="absolute top-full right-0 left-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto divide-y divide-slate-800 animate-in fade-in zoom-in-95 duration-150">
          
          {matchedProjects.length > 0 && (
            <div className="p-3">
              <span className="text-[11px] text-blue-400 font-bold block mb-2">المشاريع المطابقة ({matchedProjects.length})</span>
              <div className="space-y-1.5">
                {matchedProjects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveTab('projects');
                      setQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <div>
                        <h4 className="font-bold text-white text-xs">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">{p.location} - {(p.budget / 1000000).toFixed(1)} مليون ج.م</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-blue-400 font-bold">{p.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedApprovals.length > 0 && (
            <div className="p-3">
              <span className="text-[11px] text-amber-400 font-bold block mb-2">العقود وأوامر التغيير ({matchedApprovals.length})</span>
              <div className="space-y-1.5">
                {matchedApprovals.map(a => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setActiveTab('approvals');
                      setQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <div>
                        <h4 className="font-bold text-white text-xs">{a.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">{a.code} - {a.amount}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full">{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
