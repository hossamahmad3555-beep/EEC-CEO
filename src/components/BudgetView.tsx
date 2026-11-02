import React, { useState } from 'react';
import { Wallet, Coins, TrendingUp, ArrowUpRight, ShieldCheck, BarChart3, PieChart as PieIcon, Calendar, Download, Printer, Layers } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { exportBudgetToCSV } from '../utils/exportUtils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const BudgetView: React.FC = () => {
  const { projects } = useApp();
  const [timeRange, setTimeRange] = useState<'سنوي' | 'ربع سنوي' | 'شهري'>('ربع سنوي');
  const [comparePreviousQuarter, setComparePreviousQuarter] = useState<boolean>(true);

  const multiplier = timeRange === 'سنوي' ? 1 : timeRange === 'ربع سنوي' ? 0.25 : 0.083;

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0) * multiplier;
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0) * multiplier;
  const remaining = totalBudget - totalSpent;

  // Prepare data for BarChart (Comparing Current vs Previous Quarter or General)
  const chartData = projects.map(p => {
    const currentVal = Number(((p.budget * multiplier) / 1000000).toFixed(1));
    const previousVal = Number(((p.budget * multiplier * 0.88) / 1000000).toFixed(1)); // Previous quarter simulation (88%)
    const currentSpent = Number(((p.spent * multiplier) / 1000000).toFixed(1));
    
    if (comparePreviousQuarter) {
      return {
        name: p.name,
        'الربع الحالي (Q4)': currentVal,
        'الربع السابق (Q3)': previousVal,
        'المصروف الفعلي': currentSpent
      };
    } else {
      return {
        name: p.name,
        'الميزانية': currentVal,
        'المصروف': currentSpent,
      };
    }
  });

  const categoryMap: { [key: string]: number } = {};
  projects.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + (p.budget * multiplier);
  });

  const pieData = Object.keys(categoryMap).map(cat => ({
    name: cat,
    value: Number((categoryMap[cat] / 1000000).toFixed(1))
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4'];

  const handleExportExcel = () => {
    exportBudgetToCSV(projects, `budget_report_${timeRange}_comparison.csv`);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header with Time Filter Bar and Export Buttons */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-purple-400" />
            <span>التكاليف والميزانية العامة (مقارنة الأرباع الزمنية جنباً إلى جنب)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">مقارنة ميزانية الربع الحالي مع الربع السابق في Recharts، مع إمكانية التصدير.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Filter Toggle Bar */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <Calendar className="w-4 h-4 text-blue-400 mx-2" />
            {(['سنوي', 'ربع سنوي', 'شهري'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Comparison Toggle */}
          <button
            onClick={() => setComparePreviousQuarter(!comparePreviousQuarter)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              comparePreviousQuarter
                ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>مقارنة الربع الحالي بـ Q3</span>
          </button>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>تصدير Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 rounded-2xl border border-blue-500/30 shadow-xl">
          <span className="text-xs text-slate-400 font-semibold block mb-2">إجمالي ميزانية النطاق ({timeRange})</span>
          <span className="text-2xl lg:text-3xl font-extrabold text-white">{(totalBudget / 1000000).toLocaleString()} مليون</span>
          <span className="text-xs text-blue-400 font-bold block mt-1">ج.م مصرح بها (نمو +12% عن Q3)</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 rounded-2xl border border-blue-500/30 shadow-xl">
          <span className="text-xs text-slate-400 font-semibold block mb-2">إجمالي المصروفات للفترة ({timeRange})</span>
          <span className="text-2xl lg:text-3xl font-extrabold text-white">{(totalSpent / 1000000).toLocaleString()} مليون</span>
          <span className="text-xs text-amber-400 font-bold block mt-1">ج.م تم صرفها</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 rounded-2xl border border-blue-500/30 shadow-xl">
          <span className="text-xs text-slate-400 font-semibold block mb-2">السيولة المتبقية للفترة</span>
          <span className="text-2xl lg:text-3xl font-extrabold text-emerald-400">{(remaining / 1000000).toLocaleString()} مليون</span>
          <span className="text-xs text-emerald-300 font-bold block mt-1">ج.م متاحة</span>
        </div>
      </div>

      {/* Recharts Section with Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span>
              {comparePreviousQuarter
                ? 'مقارنة ميزانية الربع الحالي (Q4) مع الربع السابق (Q3) جنباً إلى جنب (مليون ج.م)'
                : `مقارنة الميزانية مقابل المصروفات للمشاريع حسب النطاق (${timeRange})`}
            </span>
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tick={{ fill: '#cbd5e1' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tick={{ fill: '#cbd5e1' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                {comparePreviousQuarter ? (
                  <>
                    <Bar dataKey="الربع الحالي (Q4)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="الربع السابق (Q3)" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="المصروف الفعلي" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </>
                ) : (
                  <>
                    <Bar dataKey="الميزانية" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="المصروف" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-purple-400" />
            <span>توزيع ميزانية ({timeRange}) حسب التخصص</span>
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(((percent as number) || 0) * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
            توزيع النطاق الزمني الحالي ({timeRange})
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="font-bold text-white text-base mb-4 pb-2 border-b border-slate-800">تفاصيل ميزانية المشاريع النشطة ({timeRange})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-3 px-3">المشروع</th>
                <th className="py-3 px-3">التخصص</th>
                <th className="py-3 px-3">الميزانية للفترة</th>
                <th className="py-3 px-3">المصروف الفعلي للفترة</th>
                <th className="py-3 px-3">النسبة المئوية للصرف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((p) => {
                const adjBudget = p.budget * multiplier;
                const adjSpent = p.spent * multiplier;
                const ratio = Math.round((adjSpent / adjBudget) * 100);
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-3 font-bold text-white">{p.name}</td>
                    <td className="py-3.5 px-3 text-slate-300">{p.category}</td>
                    <td className="py-3.5 px-3 font-bold text-white">{(adjBudget / 1000000).toFixed(2)} مليون ج.م</td>
                    <td className="py-3.5 px-3 font-bold text-blue-400">{(adjSpent / 1000000).toFixed(2)} مليون ج.م</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400">{ratio}%</span>
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ratio}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
