import React, { useState } from 'react';
import { CheckSquare, Check, X, Search, FileText, ShieldCheck, AlertCircle } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const ApprovalsView: React.FC = () => {
  const { approvals, handleApprovalAction } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('الكل');

  const filteredApprovals = approvals.filter(app => {
    if (filterStatus === 'الكل') return true;
    return app.status === filterStatus;
  });

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-amber-400" />
            <span>إدارة الموافقات والأوامر التنفيذية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">مراجعة واعتماد أوامر التغيير، العقود، والمشتريات الكبرى بصفة رئيس مجلس الإدارة.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {['الكل', 'معلق', 'معتمد', 'مرفوض'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-4 px-4">رقم / عنوان الطلب</th>
                <th className="py-4 px-4">الكود التعريفي</th>
                <th className="py-4 px-4">التصنيف</th>
                <th className="py-4 px-4">القيمة المالية</th>
                <th className="py-4 px-4">تاريخ التقديم</th>
                <th className="py-4 px-4">الحالة</th>
                <th className="py-4 px-4 text-center">الإجراءات الفورية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredApprovals.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>{app.title}</span>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-300">{app.code}</td>
                  <td className="py-4 px-4 text-slate-300">{app.category}</td>
                  <td className="py-4 px-4 font-extrabold text-emerald-400 text-sm">{app.amount}</td>
                  <td className="py-4 px-4 text-slate-400">{app.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      app.status === 'معتمد' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      app.status === 'مرفوض' ? 'bg-red-950 text-red-300 border border-red-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {app.status === 'معلق' ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleApprovalAction(app.id, 'معتمد')}
                          className="flex items-center gap-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white px-3 py-1.5 rounded-lg font-bold transition-all"
                        >
                          <Check className="w-4 h-4" />
                          <span>اعتماد</span>
                        </button>
                        <button
                          onClick={() => handleApprovalAction(app.id, 'مرفوض')}
                          className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg font-bold transition-all"
                        >
                          <X className="w-4 h-4" />
                          <span>رفض</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-500 font-semibold text-[11px]">تم البت في الطلب</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
