import React, { useState } from 'react';
import { Building2, Plus, Search, Filter, MapPin, Calendar, User, CheckCircle2, TrendingUp, Sparkles, Map as MapIcon, Grid, FileText } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { ProjectMap } from './ProjectMap';

export const ProjectsView: React.FC = () => {
  const { projects, subTab, updateProjectProgress, setIsNewProjectOpen } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>(subTab || 'الكل');
  const [filterStatus, setFilterStatus] = useState<string>('الكل');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  React.useEffect(() => {
    if (subTab) {
      setFilterCategory(subTab);
    }
  }, [subTab]);

  const matchesStatusFilter = (status: string, progress: number, selectedStatus: string) => {
    if (selectedStatus === 'الكل') return true;
    if (selectedStatus === 'قيد التنفيذ') return status === 'قيد التنفيذ';
    if (selectedStatus === 'مكتمل') return status === 'مكتملة' || progress === 100;
    if (selectedStatus === 'متوقف') return status === 'مؤجلة' || status === 'معرضة للمخاطر';
    return true;
  };

  const filteredProjects = projects.filter(p => {
    const matchesCategory = filterCategory === 'الكل' || p.category.includes(filterCategory);
    const matchesStatus = matchesStatusFilter(p.status, p.progress, filterStatus);
    const matchesSearch = p.name.includes(searchTerm) || p.location.includes(searchTerm) || p.manager.includes(searchTerm);
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const calculateSmartPrediction = (startDateStr: string, endDateStr: string, progress: number) => {
    const start = new Date(startDateStr).getTime();
    const plannedEnd = new Date(endDateStr).getTime();
    const now = new Date('2026-11-02').getTime();
    
    const totalDuration = plannedEnd - start;
    const elapsed = now - start;
    
    if (progress >= 100) {
      return { status: 'مكتمل في الموعد', predictedDate: endDateStr, badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' };
    }

    if (progress <= 0) {
      return { status: 'لم يبدأ بعد', predictedDate: endDateStr, badgeColor: 'bg-slate-800 text-slate-300 border-slate-700' };
    }

    const estimatedTotalDuration = elapsed / (progress / 100);
    const predictedEndTime = start + estimatedTotalDuration;
    const predictedDateObj = new Date(predictedEndTime);
    const predictedDateStr = predictedDateObj.toISOString().split('T')[0];

    const diffDays = Math.round((predictedEndTime - plannedEnd) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return { status: `مبكر بـ ${Math.abs(diffDays)} يوم عن المخطط`, predictedDate: predictedDateStr, badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800' };
    } else if (diffDays <= 15) {
      return { status: 'على المسار الصحيح', predictedDate: predictedDateStr, badgeColor: 'bg-blue-950 text-blue-300 border-blue-800' };
    } else {
      return { status: `متأخر بـ ${diffDays} يوم عن المخطط`, predictedDate: predictedDateStr, badgeColor: 'bg-amber-950 text-amber-300 border-amber-800' };
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Top bar with title, View Toggle and Add button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            <span>إدارة المشاريع الإنشائية والخريطة الجغرافية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">متابعة مواقع العمل الجغرافية، مراحل التنفيذ، والتنبؤ الذكي بمواعيد التسليم.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>شبكة البطاقات</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'map' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>الخريطة التفاعلية</span>
            </button>
          </div>

          <button
            onClick={() => setIsNewProjectOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>مشروع جديد</span>
          </button>
        </div>
      </div>

      {/* Interactive Tabs Filter (By Status & Specialty) and Search Bar */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            <span className="text-xs font-bold text-slate-400 ml-1 shrink-0">الحالة:</span>
            {['الكل', 'قيد التنفيذ', 'مكتمل', 'متوقف'].map((statusTab) => (
              <button
                key={statusTab}
                onClick={() => setFilterStatus(statusTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  filterStatus === statusTab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>{statusTab}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  filterStatus === statusTab ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'
                }`}>
                  {projects.filter(p => matchesStatusFilter(p.status, p.progress, statusTab)).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="بحث عن مشروع أو موقع أو مهندس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Specialty Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 ml-1 shrink-0">التخصص:</span>
          {['الكل', 'إنشائي', 'تشطيبات', 'كهرباء', 'تيار خفيف', 'ميكانيكا'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode: Map vs Grid */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between text-xs text-slate-300">
            <span>خريطة مواقع مشاريع الشركة المصرية الهندسية للمقاولات عبر محافظات الجمهورية</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> مشاريع مكتملة</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> قيد التنفيذ</span>
            </div>
          </div>
          <ProjectMap projects={filteredProjects} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const prediction = calculateSmartPrediction(project.startDate, project.endDate, project.progress);

            return (
              <div
                key={project.id}
                className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all group"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="bg-blue-900/80 backdrop-blur-md text-blue-200 px-2.5 py-1 rounded-lg text-xs font-bold border border-blue-500/30">
                      {project.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      project.status === 'مكتملة' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-blue-950/80 text-blue-300 border border-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {project.contractCode && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 font-mono text-[10px] px-2 py-1 rounded-lg border border-slate-700/80">
                        {project.contractCode}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 left-3">
                    <h3 className="text-white font-black text-base">{project.name}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{project.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4 text-xs">
                  
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-purple-400 font-bold">
                        <Sparkles className="w-4 h-4" /> التنبؤ الذكي بالموعد
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${prediction.badgeColor}`}>
                        {prediction.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-900">
                      <span>المخطط: {project.endDate}</span>
                      <span className="text-blue-400 font-bold">المتوقع: {prediction.predictedDate}</span>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-300">
                        <span>نسبة التنفيذ الإجمالية</span>
                        <span className="text-blue-400 font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-slate-300">
                        <span>التسليم الإبتدائي</span>
                        <span className="text-emerald-400 font-bold">{project.initialDelivery}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${project.initialDelivery}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {project.documents && project.documents.length > 0 && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-blue-300">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                          <span>المستندات التأسيسية المرفقة</span>
                        </span>
                        <span className="bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded text-[10px]">
                          {project.documents.length} ملفات
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.documents.map(doc => (
                          <span
                            key={doc.id}
                            title={`${doc.name} (${doc.size})`}
                            className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md truncate max-w-[140px]"
                          >
                            {doc.category}: {doc.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[11px]">ميزانية المشروع</span>
                      <span className="text-white font-bold text-xs">{(project.budget / 1000000).toLocaleString()} مليون ج.م</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">المصروف الفعلي</span>
                      <span className="text-blue-400 font-bold text-xs">{(project.spent / 1000000).toLocaleString()} مليون ج.م</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-400" /> {project.manager}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" /> {project.startDate}</span>
                  </div>

                </div>

                <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">تحديث نسبة الإنجاز:</span>
                  <div className="flex items-center gap-1">
                    {[50, 75, 90, 100].map(val => (
                      <button
                        key={val}
                        onClick={() => updateProjectProgress(project.id, val, val > 60 ? 60 : val, val === 100 ? 100 : 0)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                          project.progress === val ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
