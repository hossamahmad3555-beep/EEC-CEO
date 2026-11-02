import React from 'react';
import { History, CheckCircle2, FileText, UserCheck, Shield, Clock } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const AuditLogCard: React.FC = () => {
  const { user, projects, approvals } = useApp();

  const auditLogs = [
    {
      id: 'log-1',
      action: 'اعتماد أمر تغيير رقم 014 - P',
      category: 'الموافقات',
      user: user.name,
      time: 'منذ 10 دقائق',
      type: 'success'
    },
    {
      id: 'log-2',
      action: 'تحديث نسبة إنجاز مشروع محطة معالجة المياه إلى 85%',
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
      action: 'إضافة مشروع مبنى إداري جديد للمحافظة',
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
    <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <History className="w-5 h-5 text-blue-400" />
          <span>سجل النشاطات والعمليات (Audit Log)</span>
        </h3>
        <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-semibold">
          آخر العمليات الموثقة
        </span>
      </div>

      <div className="space-y-3">
        {auditLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-start justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg mt-0.5 ${
                log.type === 'success' ? 'bg-emerald-600/20 text-emerald-400' :
                log.type === 'warning' ? 'bg-amber-600/20 text-amber-400' :
                'bg-blue-600/20 text-blue-400'
              }`}>
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">{log.action}</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span className="text-blue-400 font-semibold">{log.category}</span>
                  <span>•</span>
                  <span>المستخدم: {log.user}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 whitespace-nowrap bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
