import React, { useState } from 'react';
import {
  Building2,
  HardHat,
  TrendingUp,
  Coins,
  Wallet,
  PieChart as PieIcon,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  ExternalLink,
  Check,
  X,
  CheckSquare,
  Paintbrush,
  Zap,
  Radio,
  Snowflake,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { ExecutiveKPIsCard } from './ExecutiveKPIsCard';
import { AuditLogCard } from './AuditLogCard';
import { SmartSearchBar } from './SmartSearchBar';
import { ProjectsTabbedSection } from './ProjectsTabbedSection';

export const DashboardView: React.FC = () => {
  const { approvals, handleApprovalAction, setActiveTab, setSubTab } = useApp();
  const [hoveredSpecialty, setHoveredSpecialty] = useState<string | null>(null);

  const specialtiesData = [
    { id: 'إنشائي', label: 'الأعمال الإنشائية', count: 9, percent: 33.3, color: '#3b82f6', icon: Building2 },
    { id: 'تشطيبات', label: 'أعمال التشطيبات', count: 6, percent: 22.2, color: '#8b5cf6', icon: Paintbrush },
    { id: 'ميكانيكا', label: 'الأعمال الميكانيكية', count: 5, percent: 18.5, color: '#10b981', icon: Snowflake },
    { id: 'كهرباء', label: 'كهرباء باور', count: 4, percent: 14.8, color: '#f59e0b', icon: Zap },
    { id: 'تيار خفيف', label: 'تيار خفيف', count: 3, percent: 11.1, color: '#06b6d4', icon: Radio }
  ];

  // SVG Donut segments calculation for Specialties
  const donutRadius = 46;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let cumulativePercent = 0;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Smart Search Bar */}
      <div className="mb-1">
        <SmartSearchBar />
      </div>

      {/* Top 6 KPI Metric Cards */}
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

      {/* Second Section: 3 Columns (Project Status, Monthly Portfolio Progress, Specialty Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: حالة المشاريع (Project Status) */}
        <div className="lg:col-span-3 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>حالة المشاريع</span>
              </h3>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">
                27 مشروعاً
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">مكتملة</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">6 <span className="text-[11px] text-slate-400 font-normal">(22.2%)</span></span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">قيد التنفيذ</span>
                </div>
                <span className="text-xs font-extrabold text-blue-400">18 <span className="text-[11px] text-slate-400 font-normal">(66.7%)</span></span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
                  <span className="text-xs font-bold text-slate-200">مؤجلة</span>
                </div>
                <span className="text-xs font-extrabold text-amber-400">2 <span className="text-[11px] text-slate-400 font-normal">(7.4%)</span></span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
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
              className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1.5 w-full py-1.5 hover:bg-slate-800/50 rounded-xl transition-colors"
            >
              <span>عرض تفاصيل جميع المشاريع (27)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 2: تقدم المحفظة (شهرياً) */}
        <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span>تقدم المحفظة (شهرياً)</span>
              </h3>
              <span className="text-xs bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 font-bold shadow-sm">
                78% إنجاز حالي
              </span>
            </div>

            <div className="relative h-52 w-full flex items-end justify-between px-2 pt-6 pb-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
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
                {[
                  { month: 'يونيو', val: '52%' },
                  { month: 'يوليو', val: '58%' },
                  { month: 'أغسطس', val: '63%' },
                  { month: 'سبتمبر', val: '68%' },
                  { month: 'أكتوبر', val: '72%' },
                  { month: 'نوفمبر', val: '78%', active: true }
                ].map((m) => (
                  <div key={m.month} className="flex flex-col items-center">
                    <span className={`text-[10px] font-bold mb-1 ${m.active ? 'text-blue-300' : 'text-slate-400'}`}>
                      {m.val}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full border-2 border-white shadow mb-1 ${
                        m.active ? 'bg-blue-400 w-3.5 h-3.5 animate-pulse' : 'bg-blue-500'
                      }`}
                    />
                    <span className={`text-[11px] font-bold ${m.active ? 'text-blue-400 font-extrabold' : 'text-slate-400'}`}>
                      {m.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>معدل النمو الشهري المتوسط: <strong className="text-emerald-400">+5.2%</strong></span>
            <span className="text-blue-400 font-bold">الربع الرابع 2026</span>
          </div>
        </div>

        {/* Column 3: المشاريع حسب التخصص (Redesigned Clean SVG Donut + Interactive Specialty Bars) */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2.5">
                <PieIcon className="w-5 h-5 text-indigo-400" />
                <span>المشاريع حسب التخصص</span>
              </h3>
              <span className="text-[11px] bg-indigo-950 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-800 font-bold">
                5 قطاعات
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 my-1">
              {/* Accurate Multi-Segment SVG Donut Chart */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={donutRadius}
                    fill="transparent"
                    stroke="#1e293b"
                    strokeWidth="12"
                  />
                  {specialtiesData.map((spec) => {
                    const strokeDasharray = `${(spec.percent / 100) * donutCircumference} ${donutCircumference}`;
                    const strokeDashoffset = -((cumulativePercent / 100) * donutCircumference);
                    cumulativePercent += spec.percent;
                    const isHovered = hoveredSpecialty === spec.id;
                    return (
                      <circle
                        key={spec.id}
                        cx="60"
                        cy="60"
                        r={donutRadius}
                        fill="transparent"
                        stroke={spec.color}
                        strokeWidth={isHovered ? '15' : '12'}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredSpecialty(spec.id)}
                        onMouseLeave={() => setHoveredSpecialty(null)}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-2xl font-black text-white leading-none">27</span>
                  <span className="text-[11px] text-slate-300 font-bold mt-1">مشروعاً</span>
                </div>
              </div>

              {/* Interactive Specialty Breakdown List */}
              <div className="w-full space-y-2 text-xs">
                {specialtiesData.map((spec) => {
                  const isHovered = hoveredSpecialty === spec.id;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      onMouseEnter={() => setHoveredSpecialty(spec.id)}
                      onMouseLeave={() => setHoveredSpecialty(null)}
                      onClick={() => {
                        setSubTab(spec.id);
                        setActiveTab('projects');
                      }}
                      className={`w-full p-2 rounded-xl border transition-all flex flex-col gap-1 text-right ${
                        isHovered
                          ? 'bg-slate-800/90 border-blue-500/60 shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2 text-slate-200 font-bold">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: spec.color }}
                          />
                          <span>{spec.label}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400">({spec.count})</span>
                          <span className="font-black text-white">{spec.percent}%</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${spec.percent}%`, backgroundColor: spec.color }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>اضغط على أي تخصص لاستعراض مشاريعه</span>
            <span className="text-indigo-400 font-bold">توزيع متوازن</span>
          </div>
        </div>

      </div>

      {/* Third Section: Interactive Tabbed Projects by Status & Specialty */}
      <ProjectsTabbedSection />

      {/* Fourth Section: Executive Interactive KPIs & Audit Log & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive Executive KPIs Card */}
        <div className="lg:col-span-4">
          <ExecutiveKPIsCard />
        </div>

        {/* Audit Log Card */}
        <div className="lg:col-span-4">
          <AuditLogCard />
        </div>

        {/* Card 3: الموافقات المعلقة (Pending Approvals) - Cleanly aligned without empty middle gap */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/20">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">الموافقات والاعتمادات</h3>
                <p className="text-[11px] text-slate-400">أوامر التغيير والعقود المعروضة للاعتماد</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('approvals')}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold px-3 py-1.5 bg-blue-950/70 hover:bg-blue-900/70 rounded-xl border border-blue-800/70 transition-colors shrink-0"
            >
              عرض الكل
            </button>
          </div>

          {/* Summary Banner inside Pending Approvals */}
          <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block">إجمالي الطلبات</span>
              <span className="text-sm font-black text-white">{approvals.length}</span>
            </div>
            <div className="border-x border-slate-800">
              <span className="text-[10px] text-slate-400 block">بانتظار القرار</span>
              <span className="text-sm font-black text-amber-400">
                {approvals.filter(a => a.status === 'معلق').length}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">تم البت فيها</span>
              <span className="text-sm font-black text-emerald-400">
                {approvals.filter(a => a.status !== 'معلق').length}
              </span>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {approvals.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-blue-500/40 transition-all gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-xs truncate">{app.title}</h4>
                      {app.urgency === 'عاجل' && (
                        <span className="text-[9px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800 font-bold shrink-0">
                          عاجل
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-emerald-400 font-extrabold">{app.amount}</span>
                      <span className="text-[10px] text-slate-400">• {app.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {app.status === 'معلق' ? (
                    <>
                      <button
                        onClick={() => handleApprovalAction(app.id, 'معتمد')}
                        className="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl transition-colors text-xs font-bold flex items-center gap-1 border border-emerald-500/30"
                        title="اعتماد"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>اعتماد</span>
                      </button>
                      <button
                        onClick={() => handleApprovalAction(app.id, 'مرفوض')}
                        className="p-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl transition-colors border border-red-500/30"
                        title="رفض"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold ${
                        app.status === 'معتمد'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-red-950 text-red-300 border border-red-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              صلاحية الاعتماد المباشر لرئيس مجلس الإدارة
            </span>
            <button
              onClick={() => setActiveTab('approvals')}
              className="text-blue-400 hover:text-blue-300 font-bold"
            >
              سجل القرارات ←
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
