import React, { useState } from 'react';
import { Gauge, TrendingUp, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface KPIItem {
  id: string;
  label: string;
  value: number; // percentage 0-100
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
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (current.value / 100) * circumference;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Gauge className="w-5 h-5 text-blue-400" />
          <span>مؤشرات الأداء الرئيسية التفاعلية (KPIs)</span>
        </h3>
        <span className="text-xs bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800 font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> تفاعلي
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Interactive Circular Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress circle */}
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
              <span className="text-[11px] text-emerald-400 font-bold mt-0.5">{current.change} عن الشهر السابق</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-300 mt-3">{current.label}</span>
        </div>

        {/* KPI Selectors & Description */}
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {current.description}
          </p>

          <div className="grid grid-cols-2 gap-2">
            {kpis.map((kpi) => (
              <button
                key={kpi.id}
                onClick={() => setSelectedKPI(kpi.id)}
                className={`p-3 rounded-xl text-right transition-all flex items-center justify-between border ${
                  selectedKPI === kpi.id
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-md'
                    : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <span className="block text-[11px] font-semibold truncate max-w-[110px]">{kpi.label}</span>
                  <span className="text-xs font-black text-blue-400">{kpi.value}%</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: kpi.color }}></span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
