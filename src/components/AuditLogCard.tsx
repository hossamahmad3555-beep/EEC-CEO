import React from 'react';
import { History, FileText, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const AuditLogCard: React.FC = () => {
  const { user } = useApp();

  const auditLogs = [
    {
      id: 'log-1',
      action: 'اعتماد أمر تغيير رقم P - 014',
      category: 'الموافقات',
      user: user.name,
      time: 'منذ 10 دقائق',
      type: 'success'
    },
    {
      id: 'log-2',
      action: 'تحديث نسبة إنجاز محطة معالجة المياه إلى 85%',
      category: 'المشاريع',
      user: 'م. أحمد السيد',
      time: 'منذ ساعة',
      type: 'info'
    },
    {
      id: 'log-3',
      action: 'تصدير تقرير الميزانية والتدفقات النقدية',
      category: 'التقارير المالية',
      user: user.name,
      time: 'منذ ساعتين',
      type: 'info'
    },
    {
      id: 'log-4',
      action: 'إضافة مشروع مبنى إداري جديد للمحفظة',
      category: 'المشاريع',
      user: user.name,
      time: 'منذ 5 ساعات',
      type: 'success'
    },
    {
      id: 'log-5',
      action: 'تحديث مؤشر السلامة والجودة للموقع الرئيسي',
      category: 'مؤشرات الأداء',
      user: 'م. خالد إبراهيم',
      time: 'منذ يوم',
      type: 'warning'
    }
  ];

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">سجل النشاطات والعمليات</h3>
            <p className="text-[11px] text-slate-400">توثيق فوري لكافة الإجراءات والاعتمادات</p>
          </div>
        </div>
        <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 font-bold shrink-0">
          موثق رقمياً
        </span>
      </div>

      {/* Activity List */}
      <div className="space-y-2.5 flex-1">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/40 transition-all gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  log.type === 'success'
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'
                    : log.type === 'warning'
                    ? 'bg-amber-600/20 text-amber-400 border border-amber-500/20'
                    : 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                }`}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-white text-xs leading-snug truncate">{log.action}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span className="text-blue-400 font-bold">{log.category}</span>
                  <span>•</span>
                  <span className="truncate">بواسطة: {log.user}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-slate-400 whitespace-nowrap bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{log.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          سجل الرقابة الداخلية محدث تلقائياً
        </span>
        <span className="text-emerald-400 font-bold">100% متزامن</span>
      </div>
    </div>
  );
};
