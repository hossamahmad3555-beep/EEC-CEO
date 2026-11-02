import React from 'react';
import { BarChart3, Download, Printer, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const ReportsView: React.FC = () => {
  const { user, readingMode, setReadingMode } = useApp();

  return (
    <div className={`transition-all duration-300 max-w-[1400px] mx-auto ${
      readingMode
        ? 'p-8 lg:p-16 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-2xl leading-loose font-serif text-lg space-y-8'
        : 'p-4 lg:p-8 space-y-6'
    }`}>
      
      {/* Header */}
      <div className={`bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${readingMode ? 'border-none bg-transparent p-0' : ''}`}>
        <div>
          <h2 className={`font-black text-white flex items-center gap-2 ${readingMode ? 'text-3xl font-serif' : 'text-xl'}`}>
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <span>التقارير التنفيذية الدورية للشركة المصرية الهندسية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">تقارير أداء الشركة المعتمدة لرئيس مجلس الإدارة والجهات الرقابية.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Reading Mode Toggle */}
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              readingMode
                ? 'bg-amber-600 text-white border-amber-500 shadow-lg'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{readingMode ? 'إلغاء نمط القراءة' : 'نمط القراءة النظيف (Reading Mode)'}</span>
          </button>

          <button
            onClick={() => alert('تم تصدير التقرير التنفيذي الشامل بصيغة PDF بنجاح.')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>تصدير الشامل (PDF)</span>
          </button>
        </div>
      </div>

      {/* Reports Content */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${readingMode ? 'grid-cols-1 space-y-8 font-serif text-base' : ''}`}>
        <div className={`bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 ${readingMode ? 'bg-slate-950/80 border-slate-700 p-8 rounded-3xl' : ''}`}>
          <h3 className={`font-bold text-white ${readingMode ? 'text-2xl font-serif text-blue-300' : 'text-base'}`}>
            تقرير الأداء الهندسي والإنشائي الشامل
          </h3>
          <p className={`text-slate-300 leading-relaxed ${readingMode ? 'text-lg text-slate-200' : 'text-xs'}`}>
            يغطي هذا التقرير نسب الإنجاز في المشاريع الكبرى (محطة معالجة المياه، مركز البيانات، المقر الرئيسي) مع تحليل مخاطر الموقع وحلول الدعم الهندسي. تشير المؤشرات إلى تحقيق التزام كامل بالمواصفات الهندسية العالمية بنسبة جودة بلغت 98% ومعايير سلامة فائقة.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
            <span>إعداد: إدارة التخطيط والمتابعة الهندسية</span>
            <button onClick={() => alert('جاري تحميل التقرير الهندسي...')} className="text-blue-400 hover:text-blue-300 font-bold">معاينة التقرير الكامل</button>
          </div>
        </div>

        <div className={`bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 ${readingMode ? 'bg-slate-950/80 border-slate-700 p-8 rounded-3xl' : ''}`}>
          <h3 className={`font-bold text-white ${readingMode ? 'text-2xl font-serif text-blue-300' : 'text-base'}`}>
            تقرير الميزانية والتدفقات النقدية الدورية
          </h3>
          <p className={`text-slate-300 leading-relaxed ${readingMode ? 'text-lg text-slate-200' : 'text-xs'}`}>
            تحليل دقيق للإيرادات، المصروفات، أوامر التغيير المعتمدة، والعقود من الباطن حتى تاريخ 2 نوفمبر 2026. يوضح التقرير كفاءة عالية في إدارة السيولة النقدية المتبقية البالغة 380 مليون جنيه مصري مع ضمان استمرارية الصرف وفق الجداول المالية المعتمدة.
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
            <span>إعداد: الإدارة المالية ومراقبة الحسابات</span>
            <button onClick={() => alert('جاري تحميل التقرير المالي...')} className="text-blue-400 hover:text-blue-300 font-bold">معاينة التقرير الكامل</button>
          </div>
        </div>
      </div>

    </div>
  );
};
