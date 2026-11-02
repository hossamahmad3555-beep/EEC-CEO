import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon, Layers, Building2, Paintbrush, Zap, Radio, Snowflake } from 'lucide-react';

interface SpecialtyItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
  icon: React.ElementType;
  description: string;
}

export const SpecialtiesChartCard: React.FC = () => {
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);

  const specialties: SpecialtyItem[] = [
    { name: 'الأعمال الإنشائية', count: 9, percentage: 33.3, color: '#3b82f6', icon: Building2, description: 'الأساسات والخرسانات والهياكل الكبرى' },
    { name: 'أعمال التشطيبات', count: 6, percentage: 22.2, color: '#8b5cf6', icon: Paintbrush, description: 'التشطيبات الداخلية، الواجهات والديكورات' },
    { name: 'الأعمال الميكانيكية', count: 5, percentage: 18.5, color: '#10b981', icon: Snowflake, description: 'أنظمة التكييف المركزي، الصرف والحريق' },
    { name: 'الكهرباء (باور)', count: 4, percentage: 14.8, color: '#f59e0b', icon: Zap, description: 'شبكات الجهد المتوسط واللوحات الرئيسية' },
    { name: 'التيار الخفيف', count: 3, percentage: 11.1, color: '#06b6d4', icon: Radio, description: 'كاميرات المراقبة، الإنذار وشبكات البيانات' }
  ];

  const totalProjects = specialties.reduce((acc, s) => acc + s.count, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as SpecialtyItem;
      return (
        <div className="bg-slate-950 border border-slate-700 p-4 rounded-2xl shadow-2xl text-right z-50">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: data.color }}></span>
            <span className="font-extrabold text-white text-base">{data.name}</span>
          </div>
          <p className="text-sm text-blue-400 font-black">{data.count} مشروعاً نشطاً ({data.percentage}%)</p>
          <p className="text-xs text-slate-300 mt-1 max-w-[240px] leading-relaxed">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
           توزيع المشاريع الاستراتيجية حسب التخصصات الهندسية
          <p className="text-xs text-slate-400 mt-1">توزيع محفظة المشاريع (27 مشروعاً) على القطاعات الهندسية المختلفة</p>
        </div>
        <span className="text-xs bg-blue-950 text-blue-300 px-3.5 py-1.5 rounded-full border border-blue-800/80 font-bold flex items-center gap-2 shadow-sm">
          <Layers className="w-4 h-4 text-blue-400" /> 5 قطاعات رئيسية
        </span>
      </div>

      {/* Main Content Layout: Side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4">
        
        {/* Left: Gorgeous Donut Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-56 h-56 lg:w-64 lg:h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={specialties}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={6}
                  dataKey="count"
                  onMouseEnter={(e) => setActiveSpecialty(e?.name || null)}
                  onMouseLeave={() => setActiveSpecialty(null)}
                >
                  {specialties.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#0f172a"
                      strokeWidth={3}
                      className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Stats */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">{totalProjects}</span>
              <span className="text-xs lg:text-sm text-blue-300 font-bold mt-1">مشروعاً هندسياً</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">مرر الماوس فوق القطاعات لمعرفة التفاصيل</p>
        </div>

        {/* Right: Detailed Specialty Cards with Progress Bars */}
        <div className="lg:col-span-7 space-y-3.5">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            const isSelected = activeSpecialty === spec.name;
            return (
              <div
                key={spec.name}
                onMouseEnter={() => setActiveSpecialty(spec.name)}
                onMouseLeave={() => setActiveSpecialty(null)}
                className={`p-3.5 lg:p-4 rounded-2xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500 shadow-xl scale-[1.01]'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: `${spec.color}20`, color: spec.color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm group-hover:text-blue-300 transition-colors">{spec.name}</h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{spec.description}</span>
                    </div>
                  </div>

                  <div className="text-left shrink-0">
                    <span className="text-sm lg:text-base font-black text-white">{spec.percentage}%</span>
                    <span className="text-xs text-blue-400 font-bold block">{spec.count} مشاريع</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${spec.percentage}%`, backgroundColor: spec.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-2 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          جميع القطاعات الهندسية تخضع للرقابة المالية وجداول التسليم الزمنية بدقة
        </span>
        <span className="bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 font-bold">
          كفاءة التنفيذ 100%
        </span>
      </div>
    </div>
  );
};
