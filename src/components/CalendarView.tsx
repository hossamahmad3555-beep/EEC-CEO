import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Building2,
  Plus,
  CheckCircle2,
  MapPin,
  X
} from 'lucide-react';
import { useApp } from '../store/AppContext';

interface MilestoneEvent {
  id: string;
  title: string;
  projectName: string;
  date: string;
  time: string;
  type: 'تسليم ابتدائي' | 'تسليم نهائي' | 'اجتماع تنفيذي';
  location: string;
}

export const CalendarView: React.FC = () => {
  const { projects, addNotification } = useApp();
  const [activeType, setActiveType] = useState<string>('الكل');
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  const [events, setEvents] = useState<MilestoneEvent[]>([
    {
      id: 'ev-1',
      title: 'لجنة الاستلام الابتدائي لمحطة الضخ الرئيسية',
      projectName: 'محطة معالجة المياه',
      date: '2026-11-12',
      time: '10:00 صباحاً',
      type: 'تسليم ابتدائي',
      location: 'موقع القاهرة الجديدة'
    },
    {
      id: 'ev-2',
      title: 'اجتماع مجلس الإدارة لمراجعة مستخلصات الربع الرابع',
      projectName: 'تطوير المقر الرئيسي',
      date: '2026-11-18',
      time: '12:30 ظهراً',
      type: 'اجتماع تنفيذي',
      location: 'قاعة الاجتماعات الكبرى - المقر الرئيسي'
    },
    {
      id: 'ev-3',
      title: 'اختبار التشغيل التجريبي لأنظمة التبريد والتيار الخفيف',
      projectName: 'مشروع مركز البيانات',
      date: '2026-11-25',
      time: '11:00 صباحاً',
      type: 'تسليم ابتدائي',
      location: 'القرية الذكية - الجيزة'
    },
    {
      id: 'ev-4',
      title: 'توقيع محضر التسليم النهائي وإخلاء الموقع',
      projectName: 'تطوير نظام التكييف - المرحلة الثانية',
      date: '2026-12-05',
      time: '01:00 مساءً',
      type: 'تسليم نهائي',
      location: 'الإسكندرية'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState(projects[0]?.name || 'محطة معالجة المياه');
  const [newDate, setNewDate] = useState('2026-11-20');
  const [newType, setNewType] = useState<MilestoneEvent['type']>('اجتماع تنفيذي');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const ev: MilestoneEvent = {
      id: `ev-${Date.now()}`,
      title: newTitle,
      projectName: newProject,
      date: newDate,
      time: '11:00 صباحاً',
      type: newType,
      location: 'المقر الرئيسي / موقع المشروع'
    };
    setEvents([ev, ...events]);
    setIsAddOpen(false);
    setNewTitle('');
    addNotification('تمت جدولة الموعد', `تمت إضافة "${ev.title}" إلى التقويم التنفيذي.`, 'success');
  };

  const filteredEvents = events.filter(e => activeType === 'الكل' || e.type === activeType);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2.5">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
            <span>التقويم والمحطات الزمنية التنفيذية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            مواعيد التسليم الابتدائي والنهائي، اللجان الهندسية، واجتماعات المتابعة الدورية.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة موعد / لجنة استلام</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/70 p-3.5 rounded-2xl border border-slate-800 overflow-x-auto">
        {['الكل', 'تسليم ابتدائي', 'تسليم نهائي', 'اجتماع تنفيذي'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveType(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeType === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scheduled Events & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
            الأجندة التنفيذية ولجان الاستلام القادمة
          </h3>

          <div className="space-y-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        ev.type === 'تسليم ابتدائي'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : ev.type === 'تسليم نهائي'
                          ? 'bg-purple-950 text-purple-300 border-purple-800'
                          : 'bg-blue-950 text-blue-300 border-blue-800'
                      }`}
                    >
                      {ev.type}
                    </span>
                    <span className="text-xs font-bold text-blue-400">{ev.projectName}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{ev.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {ev.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {ev.time}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 text-center shrink-0">
                  <span className="text-xs font-mono font-bold text-white block">{ev.date}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">موعد مؤكد</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Completion Dates Overview */}
        <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
            تواريخ التسليم التعاقدية للمشاريع
          </h3>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{p.name}</h4>
                    <span className="text-[11px] text-slate-400">الانتهاء المخطط: {p.endDate}</span>
                  </div>
                </div>
                <span className="text-xs bg-blue-950 text-blue-300 px-2.5 py-1 rounded-full border border-blue-800 font-bold">
                  {p.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                <span>جدولة موعد أو لجنة استلام</span>
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">عنوان الموعد / اللجنة</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: معاينة استلام أعمال التشطيبات..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">المشروع المرتبط</label>
                <select
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">نوع الموعد</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="اجتماع تنفيذي">اجتماع تنفيذي</option>
                    <option value="تسليم ابتدائي">تسليم ابتدائي</option>
                    <option value="تسليم نهائي">تسليم نهائي</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">التاريخ</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  إضافة للتقويم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
