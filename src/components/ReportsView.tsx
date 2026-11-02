import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  BookOpen,
  FileText,
  Eye,
  X,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../store/AppContext';

interface ReportItem {
  id: string;
  title: string;
  category: 'هندسي' | 'مالي' | 'جودة وسلامة';
  department: string;
  date: string;
  summary: string;
  highlights: string[];
}

export const ReportsView: React.FC = () => {
  const { readingMode, setReadingMode, addNotification } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [previewReport, setPreviewReport] = useState<ReportItem | null>(null);

  const reports: ReportItem[] = [
    {
      id: 'rep-1',
      title: 'تقرير الأداء الهندسي والإنشائي الشامل - الربع الرابع 2026',
      category: 'هندسي',
      department: 'إدارة التخطيط والمتابعة الهندسية',
      date: '2 نوفمبر 2026',
      summary:
        'يغطي هذا التقرير نسب الإنجاز في المشاريع الكبرى (محطة معالجة المياه، مركز البيانات، المقر الرئيسي) مع تحليل مخاطر الموقع وحلول الدعم الهندسي. تشير المؤشرات إلى تحقيق التزام كامل بالمواصفات الهندسية العالمية بنسبة جودة بلغت 98%.',
      highlights: [
        'ارتفاع متوسط الإنجاز العام للمحفظة إلى 78% بزيادة +6% عن الشهر السابق.',
        'الانتهاء من 100% من الأعمال الميكانيكية في المرحلة الثانية لتطوير أنظمة التكييف.',
        'توريد كافة المعدات الكهروميكانيكية لمحطة معالجة المياه دون أي تأخير زمني.'
      ]
    },
    {
      id: 'rep-2',
      title: 'تقرير الميزانية والتدفقات النقدية الدورية والمستخلصات',
      category: 'مالي',
      department: 'الإدارة المالية ومراقبة الحسابات',
      date: '1 نوفمبر 2026',
      summary:
        'تحليل دقيق للإيرادات، المصروفات، أوامر التغيير المعتمدة، والعقود من الباطن حتى تاريخ 2 نوفمبر 2026. يوضح التقرير كفاءة عالية في إدارة السيولة النقدية المتبقية البالغة 380 مليون جنيه مصري مع ضمان استمرارية الصرف وفق الجداول المالية المعتمدة.',
      highlights: [
        'إجمالي قيمة العقود المسجلة 1.25 مليار جنيه مصري.',
        'نسبة الصرف الفعلي 69.6% متوافقة تماماً مع نسب الإنجاز الميداني.',
        'تحقيق وفر مالي بنسبة 4.2% في عقود التوريدات المجمعة للحديد والكابلات.'
      ]
    },
    {
      id: 'rep-3',
      title: 'تقرير التفتيش الميداني ومعايير السلامة والصحة المهنية (HSE)',
      category: 'جودة وسلامة',
      department: 'إدارة الجودة والسلامة المهنية',
      date: '30 أكتوبر 2026',
      summary:
        'نتائج الفحص الدوري لـ 14 موقع عمل نشط واختبارات ضبط الجودة للخرسانات والتركيبات الكهربائية. سجل النظام صفر حوادث جسيمة خلال الربع الحالي مع التزام تام بمعايير الأمان الهندسي.',
      highlights: [
        'اجتياز 100% من اختبارات تكسير المكعبات الخرسانية ومعاملات الأمان.',
        'تطبيق أنظمة المراقبة الذكية واشتراطات السلامة في موقع العاصمة الإدارية.',
        'اعتماد شهادات المطابقة القياسية لجميع الخامات الموردة للمشاريع.'
      ]
    },
    {
      id: 'rep-4',
      title: 'تقرير التنبؤ الذكي بمواعيد التسليم الابتدائي والنهائي',
      category: 'هندسي',
      department: 'وحدة التحليل الهندسي وإدارة المشروعات PMO',
      date: '28 أكتوبر 2026',
      summary:
        'تحليل مسارات العمل الحرجة (Critical Path) لجميع المشاريع الـ 27 وتحديد التوقعات الزمنية للاستلام الابتدائي والنهائي بناءً على معدلات الأداء اليومية.',
      highlights: [
        '89% معدل الالتزام بالجدول الزمني المخطط للمشاريع الجارية.',
        'خطة تسريع مسار العمل لمشروع تأهيل واجهات البرج الإداري بالعلمين.',
        'جاهزية مشروعين للاستلام الابتدائي خلال الربع القادم.'
      ]
    }
  ];

  const filteredReports = reports.filter(
    r => selectedCategory === 'الكل' || r.category === selectedCategory
  );

  const handlePrintExport = () => {
    addNotification('تصدير التقرير الشامل', 'جاري تجهيز ملف التقارير التنفيذية للطباعة والتصدير بصيغة PDF.', 'success');
    window.print();
  };

  return (
    <div
      className={`transition-all duration-300 max-w-[1400px] mx-auto ${
        readingMode
          ? 'p-8 lg:p-16 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-2xl leading-loose font-serif text-lg space-y-8 my-4'
          : 'p-4 lg:p-8 space-y-6'
      }`}
    >
      {/* Header */}
      <div
        className={`bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          readingMode ? 'border-b border-slate-800 bg-transparent p-0 pb-6 rounded-none shadow-none' : ''
        }`}
      >
        <div>
          <h2 className={`font-black text-white flex items-center gap-2.5 ${readingMode ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <span>التقارير التنفيذية الدورية للشركة المصرية الهندسية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            تقارير أداء الشركة المعتمدة لرئيس مجلس الإدارة والجهات الرقابية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
            <span>{readingMode ? 'إلغاء نمط القراءة' : 'نمط القراءة المريح'}</span>
          </button>

          <button
            onClick={handlePrintExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة / تصدير PDF</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800 overflow-x-auto">
        {['الكل', 'هندسي', 'مالي', 'جودة وسلامة'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat === 'الكل' ? 'جميع التقارير' : `تقارير ${cat}`}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${readingMode ? 'grid-cols-1 gap-8' : ''}`}>
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className={`bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all ${
              readingMode ? 'bg-slate-950/90 border-slate-700 p-8 rounded-3xl' : ''
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                  {report.category}
                </span>
                <span className="text-xs text-slate-400">{report.date}</span>
              </div>

              <h3 className={`font-extrabold text-white ${readingMode ? 'text-2xl text-blue-300' : 'text-base'}`}>
                {report.title}
              </h3>

              <p className={`text-slate-300 leading-relaxed ${readingMode ? 'text-base text-slate-200' : 'text-xs'}`}>
                {report.summary}
              </p>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">أبرز المؤشرات والتوصيات:</span>
                {report.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span>إعداد: {report.department}</span>
              <button
                onClick={() => setPreviewReport(report)}
                className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3.5 py-1.5 rounded-xl font-bold transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة التقرير الكامل</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Full Preview Modal */}
      {previewReport && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">{previewReport.title}</h3>
                  <span className="text-xs text-slate-400">{previewReport.department} • {previewReport.date}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewReport(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs leading-relaxed text-slate-200">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-blue-400 mb-1.5">الملخص التنفيذي:</h4>
                <p>{previewReport.summary}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400 mb-1.5">النتائج التفصيلية المعتمدة:</h4>
                {previewReport.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  handlePrintExport();
                  setPreviewReport(null);
                }}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                <span>تحميل وطباعة التقرير</span>
              </button>
              <button
                onClick={() => setPreviewReport(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
