import React, { useState } from 'react';
import { Gauge, Sparkles } from 'lucide-react';

interface KPIItem {
  id: string;
  label: string;
  value: number;
  target: number;
  change: string;
  color: string;
  description: string;
}

export const ExecutiveKPIsCard: React.FC = () => {
  const [selectedKPI, setSelectedKPI] = useState<string>('progress');

  const kpis: KPIItem[] = [
    {
      id: 'progress',
      label: 'نسبة تقدم المشاريع',
      value: 78,
      target: 85,
      change: '+6%',
      color: '#3b82f6',
      description: 'معدل الإنجاز العام لمحفظة المشاريع النشطة (27 مشروعاً)'
    },
    {
      id: 'timeline',
      label: 'معدل الإنجاز الزمني',
      value: 89,
      target: 90,
      change: '+6%',
      color: '#10b981',
      description: 'الالتزام بالجداول الزمنية المخططة ومراحل التسليم'
    },
    {
      id: 'cost',
      label: 'مؤشر كفاءة التكلفة',
      value: 92,
      target: 95,
      change: '+4%',
      color: '#8b5cf6',
      description: 'كفاءة استغلال الميزانية والمصروفات الفعلية مقابل المقايسة'
    },
    {
      id: 'quality',
      label: 'الإلتزام بالجودة والسلامة',
      value: 98,
      target: 98,
      change: '+2%',
      color: '#f59e0b',
      description: 'معايير الجودة الهندسية واختبارات الأمان في المواقع'
    }
  ];

  const current = kpis.find(k => k.id === selectedKPI) || kpis[0];
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (current.value / 100) * circumference;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
            <Gauge className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base">مؤشرات الأداء (KPIs)</h3>
        </div>
        <span className="text-xs bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800 font-bold flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> تفاعلي
        </span>
      </div>

      {/* Main Content Area: Circular Gauge & Info */}
      <div className="flex flex-col items-center text-center my-3 space-y-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-slate-800"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={current.color}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.3s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-white">{current.value}%</span>
            <span className="text-xs text-emerald-400 font-bold mt-0.5">{current.change} عن السابق</span>
          </div>
        </div>

        <div className="w-full space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: current.color }}></span>
            <h4 className="font-extrabold text-white text-base">{current.label}</h4>
          </div>
          <p className="text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed text-right shadow-inner">
            {current.description}
          </p>
        </div>
      </div>

      {/* KPI Selection Buttons Grid */}
      <div className="grid grid-cols-2 gap-2.5 mt-3 pt-4 border-t border-slate-800">
        {kpis.map((kpi) => (
          <button
            key={kpi.id}
            onClick={() => setSelectedKPI(kpi.id)}
            className={`p-3 rounded-xl text-right transition-all flex items-center justify-between border group ${
              selectedKPI === kpi.id
                ? 'bg-blue-600/30 border-blue-500 text-white font-bold shadow-lg shadow-blue-500/10'
                : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
            }`}
          >
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold truncate group-hover:text-white transition-colors">{kpi.label}</span>
              <span className="text-xs font-black text-blue-400 mt-0.5 block">{kpi.value}%</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full shrink-0 mr-1.5 shadow-sm" style={{ backgroundColor: kpi.color }}></span>
          </button>
        ))}
      </div>
    </div>
  );
};
