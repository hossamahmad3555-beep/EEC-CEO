import React, { useState, useMemo } from 'react';
import {
  Layers,
  Activity,
  Building2,
  Paintbrush,
  Zap,
  Radio,
  Snowflake,
  CheckCircle2,
  Clock,
  PauseCircle,
  MapPin,
  User,
  ExternalLink,
  FolderKanban,
  Wallet
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Project } from '../types';

type FilterMode = 'status' | 'specialty';

export const ProjectsTabbedSection: React.FC = () => {
  const { projects, setActiveTab, setSubTab, updateProjectProgress } = useApp();
  const [filterMode, setFilterMode] = useState<FilterMode>('status');
  const [activeStatusTab, setActiveStatusTab] = useState<string>('الكل');
  const [activeSpecialtyTab, setActiveSpecialtyTab] = useState<string>('الكل');

  // Helper to normalize project status into the 3 requested tabs: قيد التنفيذ، مكتمل، متوقف
  const matchesStatus = (project: Project, statusTab: string): boolean => {
    if (statusTab === 'الكل') return true;
    if (statusTab === 'قيد التنفيذ') return project.status === 'قيد التنفيذ';
    if (statusTab === 'مكتمل') return project.status === 'مكتملة' || project.progress === 100;
    if (statusTab === 'متوقف') return project.status === 'مؤجلة' || project.status === 'معرضة للمخاطر';
    return true;
  };

  // Helper to match project specialty
  const matchesSpecialty = (project: Project, specialtyTab: string): boolean => {
    if (specialtyTab === 'الكل') return true;
    if (specialtyTab === 'كهرباء') return project.category.includes('كهرباء');
    if (specialtyTab === 'تيار خفيف') return project.category.includes('تيار خفيف');
    return project.category === specialtyTab;
  };

  const statusTabs = useMemo(() => [
    {
      id: 'الكل',
      label: 'جميع المشاريع',
      icon: FolderKanban,
      color: 'text-blue-400',
      activeBg: 'bg-blue-600 text-white border-blue-400 shadow-blue-600/30',
      count: projects.length
    },
    {
      id: 'قيد التنفيذ',
      label: 'قيد التنفيذ',
      icon: Clock,
      color: 'text-amber-400',
      activeBg: 'bg-blue-600 text-white border-blue-400 shadow-blue-600/30',
      count: projects.filter(p => matchesStatus(p, 'قيد التنفيذ')).length
    },
    {
      id: 'مكتمل',
      label: 'مكتمل',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-600/30',
      count: projects.filter(p => matchesStatus(p, 'مكتمل')).length
    },
    {
      id: 'متوقف',
      label: 'متوقف',
      icon: PauseCircle,
      color: 'text-rose-400',
      activeBg: 'bg-rose-600 text-white border-rose-400 shadow-rose-600/30',
      count: projects.filter(p => matchesStatus(p, 'متوقف')).length
    }
  ], [projects]);

  const specialtyTabs = useMemo(() => [
    {
      id: 'الكل',
      label: 'كل التخصصات',
      icon: Layers,
      color: 'text-blue-400',
      count: projects.length
    },
    {
      id: 'إنشائي',
      label: 'الأعمال الإنشائية',
      icon: Building2,
      color: 'text-indigo-400',
      count: projects.filter(p => matchesSpecialty(p, 'إنشائي')).length
    },
    {
      id: 'تشطيبات',
      label: 'أعمال التشطيبات',
      icon: Paintbrush,
      color: 'text-purple-400',
      count: projects.filter(p => matchesSpecialty(p, 'تشطيبات')).length
    },
    {
      id: 'كهرباء',
      label: 'الكهرباء (باور)',
      icon: Zap,
      color: 'text-amber-400',
      count: projects.filter(p => matchesSpecialty(p, 'كهرباء')).length
    },
    {
      id: 'تيار خفيف',
      label: 'التيار الخفيف',
      icon: Radio,
      color: 'text-cyan-400',
      count: projects.filter(p => matchesSpecialty(p, 'تيار خفيف')).length
    },
    {
      id: 'ميكانيكا',
      label: 'الأعمال الميكانيكية',
      icon: Snowflake,
      color: 'text-emerald-400',
      count: projects.filter(p => matchesSpecialty(p, 'ميكانيكا')).length
    }
  ], [projects]);

  const displayedProjects = useMemo(() => {
    return projects.filter(project => {
      const statusOk = matchesStatus(project, activeStatusTab);
      const specialtyOk = matchesSpecialty(project, activeSpecialtyTab);
      return statusOk && specialtyOk;
    });
  }, [projects, activeStatusTab, activeSpecialtyTab]);

  // Summary stats for the currently filtered projects
  const summaryStats = useMemo(() => {
    const count = displayedProjects.length;
    if (count === 0) return { avgProgress: 0, totalBudget: 0 };
    const avgProgress = Math.round(
      displayedProjects.reduce((acc, p) => acc + p.progress, 0) / count
    );
    const totalBudget = displayedProjects.reduce((acc, p) => acc + p.budget, 0);
    return { avgProgress, totalBudget };
  }, [displayedProjects]);

  const getStatusBadge = (project: Project) => {
    if (project.status === 'مكتملة' || project.progress === 100) {
      return {
        label: 'مكتمل',
        classes: 'bg-emerald-950/90 text-emerald-300 border-emerald-700/80'
      };
    }
    if (project.status === 'مؤجلة' || project.status === 'معرضة للمخاطر') {
      return {
        label: 'متوقف',
        classes: 'bg-rose-950/90 text-rose-300 border-rose-700/80'
      };
    }
    return {
      label: 'قيد التنفيذ',
      classes: 'bg-blue-950/90 text-blue-300 border-blue-700/80'
    };
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base lg:text-lg">
                مستعرض المشاريع التفاعلي (حسب الحالة والتخصص)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تصفية فورية للمشاريع الهندسية بنظام التبويبات دون إعادة تحميل الصفحة
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector Toggle (حسب الحالة / حسب التخصص) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setFilterMode('status')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'status'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>تبويب حسب الحالة</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('specialty')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'specialty'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>تبويب حسب التخصص</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="space-y-3">
        {filterMode === 'status' ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Primary Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full lg:w-auto">
              {statusTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeStatusTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveStatusTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                      isActive
                        ? `${tab.activeBg} shadow-lg`
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Specialty Sub-filter Pill */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 font-medium ml-1">التخصص:</span>
              {['الكل', 'إنشائي', 'تشطيبات', 'كهرباء', 'تيار خفيف', 'ميكانيكا'].map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setActiveSpecialtyTab(spec)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    activeSpecialtyTab === spec
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Primary Specialty Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full lg:w-auto">
              {specialtyTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSpecialtyTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveSpecialtyTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Status Sub-filter Pill */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 font-medium ml-1">الحالة:</span>
              {['الكل', 'قيد التنفيذ', 'مكتمل', 'متوقف'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setActiveStatusTab(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    activeStatusTab === st
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Tab Summary Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-slate-300 font-semibold">
            المشاريع المعروضة: <strong className="text-white font-black">{displayedProjects.length}</strong> مشروع
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-300 font-semibold">
            متوسط نسبة الإنجاز: <strong className="text-blue-400 font-black">{summaryStats.avgProgress}%</strong>
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-slate-300 font-semibold hidden sm:inline">
            إجمالي الميزانيات: <strong className="text-emerald-400 font-black">{(summaryStats.totalBudget / 1000000).toLocaleString()} مليون ج.م</strong>
          </span>
        </div>

        {(activeStatusTab !== 'الكل' || activeSpecialtyTab !== 'الكل') && (
          <button
            type="button"
            onClick={() => {
              setActiveStatusTab('الكل');
              setActiveSpecialtyTab('الكل');
            }}
            className="text-[11px] text-blue-400 hover:text-blue-300 font-bold underline"
          >
            إعادة تعيين الفلاتر
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {displayedProjects.length === 0 ? (
        <div className="py-12 text-center bg-slate-950/40 rounded-2xl border border-slate-800/60 space-y-2">
          <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-300">لا توجد مشاريع مطابقة للتبويب المحدد حالياً</p>
          <button
            type="button"
            onClick={() => {
              setActiveStatusTab('الكل');
              setActiveSpecialtyTab('الكل');
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold mt-2 inline-block"
          >
            عرض جميع المشاريع
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedProjects.map((project) => {
            const statusBadge = getStatusBadge(project);
            return (
              <div
                key={project.id}
                className="bg-slate-950/80 rounded-2xl border border-slate-800/90 shadow-lg overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 group"
              >
                {/* Project Image & Overlay Badges */}
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-2.5 right-2.5 left-2.5 flex items-center justify-between gap-2">
                    <span className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-blue-300 font-bold shadow-sm">
                      {project.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold shadow-sm ${statusBadge.classes}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 left-2.5">
                    <h4 className="text-white font-extrabold text-sm truncate drop-shadow">
                      {project.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bars & Details */}
                <div className="p-3.5 space-y-3 text-xs flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="space-y-1">
                      <div className="flex justify-between font-bold text-slate-300">
                        <span>نسبة التنفيذ</span>
                        <span className="text-blue-400 font-black">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-slate-900/70 p-2 rounded-xl border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">التسليم الابتدائي</span>
                        <span className="text-xs font-extrabold text-emerald-400">{project.initialDelivery}%</span>
                      </div>
                      <div className="bg-slate-900/70 p-2 rounded-xl border border-slate-800/80">
                        <span className="text-[10px] text-slate-400 block">التسليم النهائي</span>
                        <span className="text-xs font-extrabold text-purple-400">{project.finalDelivery}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 truncate">
                      <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{project.manager}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300 font-bold shrink-0">
                      <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                      {(project.budget / 1000000).toLocaleString()} م
                    </span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-3.5 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[50, 85, 100].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          updateProjectProgress(
                            project.id,
                            val,
                            val >= 85 ? 70 : 30,
                            val === 100 ? 100 : 0
                          )
                        }
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                          project.progress === val
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                        }`}
                        title="تحديث سريع لنسبة الإنجاز"
                      >
                        {val}%
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubTab(null);
                      setActiveTab('projects');
                    }}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                  >
                    <span>التفاصيل</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
