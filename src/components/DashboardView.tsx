import React from 'react';
import {
  Building2,
  HardHat,
  TrendingUp,
  Coins,
  Wallet,
  PieChart as PieIcon,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  Calendar,
  FileText,
  ExternalLink,
  Check,
  X,
  CheckSquare
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { ExecutiveKPIsCard } from './ExecutiveKPIsCard';
import { AuditLogCard } from './AuditLogCard';
import { SmartSearchBar } from './SmartSearchBar';

export const DashboardView: React.FC = () => {
  const { projects, approvals, handleApprovalAction, setActiveTab } = useApp();

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Smart Search Bar */}
      <div className="mb-2">
        <SmartSearchBar />
      </div>

      {/* Top 6 KPI Metric Cards matching the user requirements */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* 1. إجمالي المشاريع */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 lg:p-5 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col justify-between hover:border-blue-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">إجمالي المشاريع</span>
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-black text-white">27</span>
            <span className="text-xs text-blue-400 mr-2 font-semibold">مشروع نشط</span>
          </div>
        </div>

        {/* 2. المواقع النشطة */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 lg:p-5 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col justify-between hover:border-blue-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">المواقع النشطة</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <HardHat className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl lg:text-3xl font-black text-white">14</span>
            <span className="text-xs text-amber-400 mr-2 font-semibold">موقع عمل</span>
          </div>
        </div>

        {/* 3. نسبة الإنجاز العامة */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 lg:p-5 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col justify-between hover:border-blue-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">نسبة الإنجاز العامة</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl lg:text-3xl font-black text-white">78%</span>
            <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1 font-bold">
              <ArrowUpRight className="w-3 h-3" /> +6%
            </span>
          </div>
        </div>

        {/* 4. إجمالي قيمة العقود */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 lg:p-5 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col justify-between hover:border-blue-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">إجمالي قيمة العقود</span>
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base lg:text-lg font-black text-white tracking-tight">1,250,000,000</span>
            <span className="text-[11px] text-blue-300 block font-semibold">جنيه مصري</span>
          </div>
        </div>

        {/* 5. التكلفة الفعلية */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 lg:p-5 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col justify-between hover:border-blue-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">التكلفة الفعلية</span>
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base lg:text-lg font-black text-white tracking-tight">870,000,000</span>
            <span className="text-[11px] text-blue-300 block font-semibold">ج.م (69.6%)</span>
          </div>
        </div>

        {/* 6. المتبقي من الميزانية */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-4 lg:p-5 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col justify-between hover:border-blue-400 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">المتبقي من الميزانية</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base lg:text-lg font-black text-white tracking-tight">380,000,000</span>
            <span className="text-[11px] text-purple-300 block font-semibold">ج.م (30.4%)</span>
          </div>
        </div>

      </div>

      {/* Second Section: 3 Columns (Project Status, Monthly Portfolio Progress, Specialty Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: حالة المشاريع (Project Status) */}
        <div className="lg:col-span-3 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>حالة المشاريع</span>
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">مكتملة</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">6 <span className="text-[11px] text-slate-400 font-normal">(22.2%)</span></span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">قيد التنفيذ</span>
                </div>
                <span className="text-xs font-extrabold text-blue-400">18 <span className="text-[11px] text-slate-400 font-normal">(66.7%)</span></span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">مؤجلة</span>
                </div>
                <span className="text-xs font-extrabold text-amber-400">2 <span className="text-[11px] text-slate-400 font-normal">(7.4%)</span></span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">معرضة للمخاطر</span>
                </div>
                <span className="text-xs font-extrabold text-red-400">1 <span className="text-[11px] text-slate-400 font-normal">(3.7%)</span></span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-center">
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1.5 w-full py-1 hover:bg-slate-800/40 rounded-lg transition-colors"
            >
              <span>عرض تفاصيل جميع المشاريع (27)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 2: تقدم المحفظة (شهرياً) */}
        <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>تقدم المحفظة (شهرياً)</span>
            </h3>
            <span className="text-xs bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-bold shadow-sm">
              78% إنجاز حالي
            </span>
          </div>

          <div className="relative h-48 w-full flex items-end justify-between px-2 pt-6 pb-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
              <div className="border-b border-slate-600 w-full text-[10px] text-right font-medium">100%</div>
              <div className="border-b border-slate-600 w-full text-[10px] text-right font-medium">80%</div>
              <div className="border-b border-slate-600 w-full text-[10px] text-right font-medium">60%</div>
              <div className="border-b border-slate-600 w-full text-[10px] text-right font-medium">40%</div>
              <div className="border-b border-slate-600 w-full text-[10px] text-right font-medium">20%</div>
            </div>

            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 160">
              <path
                d="M 20,110 Q 120,95 220,85 T 420,65 T 560,40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 20,110 Q 120,95 220,85 T 420,65 T 560,40 L 560,150 L 20,150 Z"
                fill="url(#blueGrad)"
                opacity="0.25"
              />
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative z-10 w-full flex justify-between text-center px-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow mb-1"></div>
                <span className="text-[11px] text-slate-400 font-bold">يونيو</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow mb-1"></div>
                <span className="text-[11px] text-slate-400 font-bold">يوليو</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow mb-1"></div>
                <span className="text-[11px] text-slate-400 font-bold">أغسطس</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow mb-1"></div>
                <span className="text-[11px] text-slate-400 font-bold">سبتمبر</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow mb-1"></div>
                <span className="text-[11px] text-slate-400 font-bold">أكتوبر</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 bg-blue-400 rounded-full border-2 border-white shadow mb-1 animate-pulse"></div>
                <span className="text-[11px] text-blue-400 font-extrabold">نوفمبر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: المشاريع حسب التخصص (Specialty Donut Chart & Legend) */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2.5">
              <PieIcon className="w-5 h-5 text-indigo-400" />
              <span>المشاريع حسب التخصص</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
            <div className="relative flex items-center justify-center shrink-0">
              <div className="w-32 h-32 rounded-full border-8 border-blue-600 relative flex items-center justify-center shadow-xl bg-slate-950">
                <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-t-transparent border-l-transparent rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-t-transparent border-r-transparent -rotate-12"></div>
                <div className="absolute inset-0 rounded-full border-8 border-cyan-400 border-b-transparent border-l-transparent rotate-90"></div>
                <div className="text-center z-10">
                  <span className="block text-2xl font-black text-white">27</span>
                  <span className="block text-[11px] text-slate-300 font-bold">مشروعاً</span>
                </div>
              </div>
            </div>

            <div className="w-full space-y-2 text-xs">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="flex items-center gap-2 text-slate-300 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm"></span>إنشائي</span>
                <span className="font-extrabold text-white">33.3%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="flex items-center gap-2 text-slate-300 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm"></span>تشطيبات</span>
                <span className="font-extrabold text-white">22.2%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="flex items-center gap-2 text-slate-300 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></span>كهرباء باور</span>
                <span className="font-extrabold text-white">14.8%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="flex items-center gap-2 text-slate-300 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm"></span>تيار خفيف</span>
                <span className="font-extrabold text-white">11.1%</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="flex items-center gap-2 text-slate-300 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span>ميكانيكا</span>
                <span className="font-extrabold text-white">18.5%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Third Section: 5 Active Project Cards with real photos & delivery percentages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {projects.slice(0, 5).map((project) => (
          <div
            key={project.id}
            className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all group"
          >
            <div className="relative h-36 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute top-2.5 right-2.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-blue-300 font-bold shadow-sm">
                {project.category}
              </div>
              <h4 className="absolute bottom-2.5 right-2.5 left-2.5 text-white font-extrabold text-sm truncate drop-shadow">
                {project.name}
              </h4>
            </div>

            <div className="p-3.5 space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>نسبة التنفيذ</span>
                  <span className="text-blue-400 font-black">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-blue-500 rounded-full shadow"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>التسليم الإبتدائي</span>
                  <span className="text-emerald-400 font-black">{project.initialDelivery}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-emerald-500 rounded-full shadow"
                    style={{ width: `${project.initialDelivery}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>التسليم النهائي</span>
                  <span className="text-purple-400 font-black">{project.finalDelivery}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-purple-500 rounded-full shadow"
                    style={{ width: `${project.finalDelivery}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 border-t border-slate-800 text-center">
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1.5 w-full py-1 hover:bg-slate-800/40 rounded-lg transition-colors"
              >
                <span>متابعة المشروع</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fourth Section: Executive Interactive KPIs & Audit Log & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Executive KPIs Card */}
        <div className="lg:col-span-4">
          <ExecutiveKPIsCard />
        </div>

        {/* Audit Log Card */}
        <div className="lg:col-span-4">
          <AuditLogCard />
        </div>

        {/* Card 2: الموافقات المعلقة (Pending Approvals) */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2.5">
              <CheckSquare className="w-5 h-5 text-amber-400" />
              <span>الموافقات المعلقة</span>
            </h3>
            <button
              onClick={() => setActiveTab('approvals')}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold px-2.5 py-1 bg-blue-950/60 rounded-lg border border-blue-900/60"
            >
              عرض الكل
            </button>
          </div>

          <div className="space-y-3">
            {approvals.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 transition-all gap-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-white text-xs truncate">{app.title}</h4>
                    <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">{app.amount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {app.status === 'معلق' ? (
                    <>
                      <button
                        onClick={() => handleApprovalAction(app.id, 'معتمد')}
                        className="p-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl transition-colors shadow-sm"
                        title="اعتماد"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApprovalAction(app.id, 'مرفوض')}
                        className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-colors shadow-sm"
                        title="رفض"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      app.status === 'معتمد' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'
                    }`}>
                      {app.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
