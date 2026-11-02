import React, { useState } from 'react';
import { Gauge, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

interface KPIItem {
  id: string;
  label: string;
  shortLabel: string;
  value: number;
  target: number;
  change: string;
  color: string;
  bgBadge: string;
  description: string;
}

export const ExecutiveKPIsCard: React.FC = () => {
  const [selectedKPI, setSelectedKPI] = useState<string>('progress');

  const kpis: KPIItem[] = [
    {
      id: 'progress',
      label: 'نسبة تقدم المشاريع',
      shortLabel: 'تقدم المشاريع',
      value: 78,
      target: 85,
      change: '+6% عن الشهر السابق',
      color: '#3b82f6',
      bgBadge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      description: 'معدل الإنجاز العام لمحفظة المشاريع النشطة (27 مشروعاً هندسياً)'
    },
    {
      id: 'timeline',
      label: 'معدل الإنجاز الزمني',
      shortLabel: 'الإنجاز الزمني',
      value: 89,
      target: 90,
      change: '+6% عن الشهر السابق',
      color: '#10b981',
      bgBadge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      description: 'نسبة الالتزام بالجداول الزمنية المخططة ومراحل التسليم التعاقدية'
    },
    {
      id: 'cost',
      label: 'مؤشر كفاءة التكلفة',
      shortLabel: 'كفاءة التكلفة',
      value: 92,
      target: 95,
      change: '+4% عن الشهر السابق',
      color: '#8b5cf6',
      bgBadge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      description: 'كفاءة استغلال الميزانية وضبط المصروفات الفعلية مقابل المقايسات'
    },
    {
      id: 'quality',
      label: 'الالتزام بالجودة والسلامة',
      shortLabel: 'الجودة والسلامة',
      value: 98,
      target: 98,
      change: '+2% عن الشهر السابق',
      color: '#f59e0b',
      bgBadge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      description: 'معايير الجودة الهندسية واختبارات السلامة المهنية في جميع المواقع'
    }
  ];

  const current = kpis.find(k => k.id === selectedKPI) || kpis[0];
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (current.value / 100) * circumference;

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">مؤشرات الأداء الرئيسية (KPIs)</h3>
            <p className="text-[11px] text-slate-400">اضغط على أي مؤشر لعرض التحليل التفصيلي</p>
          </div>
        </div>
        <span className="text-[11px] bg-blue-950 text-blue-300 px-2.5 py-1 rounded-full border border-blue-800/80 font-bold flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3" /> تفاعلي
        </span>
      </div>

      {/* Selected KPI Display Card */}
      <div className="bg-slate-950/70 rounded-2xl border border-slate-800/90 p-4 mb-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Circular Gauge */}
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="text-slate-800/90"
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
              style={{ transition: 'stroke-dashoffset 0.6s ease-in-out, stroke 0.3s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white">{current.value}%</span>
            <span className="text-[10px] text-slate-400 font-bold">المستهدف {current.target}%</span>
          </div>
        </div>

        {/* Selected KPI Details */}
        <div className="flex-1 text-center sm:text-right space-y-2 min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: current.color }} />
            <h4 className="font-extrabold text-white text-sm">{current.label}</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {current.description}
          </p>
          <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              {current.change}
            </span>
          </div>
        </div>
      </div>

      {/* 4 KPI Interactive Selector Cards - Clean 2x2 Grid with full readable labels */}
      <div className="grid grid-cols-2 gap-2.5 mt-auto">
        {kpis.map((kpi) => {
          const isSelected = selectedKPI === kpi.id;
          return (
            <button
              key={kpi.id}
              type="button"
              onClick={() => setSelectedKPI(kpi.id)}
              className={`p-3 rounded-xl text-right transition-all border flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-blue-950/80 border-blue-500 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full gap-1.5">
                <span className="text-xs font-bold text-slate-200 leading-snug">{kpi.label}</span>
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: kpi.color }}
                />
              </div>

              <div className="w-full space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-black text-white">{kpi.value}%</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{kpi.change.split(' ')[0]}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${kpi.value}%`, backgroundColor: kpi.color }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
