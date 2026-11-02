import React from 'react';
import { Calendar as CalendarIcon, Clock, Building2 } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const CalendarView: React.FC = () => {
  const { projects } = useApp();

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
            <span>التقويم والمواعيد التنفيذية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">المحطات الزمنية، مواعيد التسليم الإبتدائي والنهائي للمشاريع.</p>
        </div>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-base">جدول تسليمات شهر نوفمبر وديسمبر 2026</h3>
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{p.name}</h4>
                  <span className="text-xs text-slate-400">تاريخ الانتهاء المخطط: {p.endDate}</span>
                </div>
              </div>
              <div className="text-left">
                <span className="text-xs bg-blue-950 text-blue-300 px-3 py-1 rounded-full border border-blue-800 font-bold">
                  نسبة الإنجاز: {p.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
