import React, { useState } from 'react';
import { Search, X, Bell, Building2, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Modals: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isNewProjectOpen,
    setIsNewProjectOpen,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    projects,
    addProject,
    setActiveTab
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  
  // New Project Form State
  const [newProjName, setNewProjName] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<'إنشائي' | 'تشطيبات' | 'كهرباء / تيار خفيف' | 'ميكانيكا' | 'تيار خفيف'>('إنشائي');
  const [newProjBudget, setNewProjBudget] = useState('100000000');
  const [newProjLocation, setNewProjLocation] = useState('القاهرة');
  const [newProjManager, setNewProjManager] = useState('م. أحمد');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      name: newProjName,
      category: newProjCategory,
      progress: 10,
      initialDelivery: 0,
      finalDelivery: 0,
      status: 'قيد التنفيذ',
      budget: Number(newProjBudget),
      spent: Number(newProjBudget) * 0.1,
      location: newProjLocation,
      startDate: '2026-11-02',
      endDate: '2027-12-30',
      manager: newProjManager,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7607?auto=format&fit=crop&w=800&q=80'
    });
    setIsNewProjectOpen(false);
    setNewProjName('');
    alert('تمت إضافة المشروع الجديد بنجاح وحفظه في النظام.');
  };

  const searchResults = projects.filter(p => p.name.includes(searchFilter) || p.location.includes(searchFilter));

  return (
    <>
      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 flex-1">
                <Search className="w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="ابحث عن المشاريع، المواقع، أو المهندسين..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchFilter.trim() === '' ? (
                <p className="text-center text-xs text-slate-500 py-6">اكتب للبحث السريع في كافة سجلات الشركة...</p>
              ) : searchResults.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-6">لا توجد نتائج مطابقة لبحثك.</p>
              ) : (
                searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveTab('projects');
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 cursor-pointer border border-slate-800 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{p.name}</h4>
                        <span className="text-[11px] text-slate-400">{p.location} - {p.category}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-950 text-blue-300 px-2 py-1 rounded-lg font-bold">
                      {p.progress}% إنجاز
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer / Dropdown */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="bg-slate-900 border-r border-slate-800 w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">الإشعارات والتنبيهات الفورية</h3>
              </div>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
              <span className="text-xs text-slate-400">لديك {notifications.filter(n => !n.read).length} إشعارات غير مقروءة</span>
              <button
                onClick={clearAllNotifications}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold"
              >
                تعليم الكل مقروء
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    n.read ? 'bg-slate-950/40 border-slate-800 opacity-70' : 'bg-slate-800/60 border-blue-500/30 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-white text-xs">{n.title}</h4>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isNewProjectOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                <span>إضافة مشروع هندسي جديد</span>
              </h3>
              <button
                onClick={() => setIsNewProjectOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">اسم المشروع</label>
                <input
                  type="text"
                  required
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                  placeholder="مثال: محطة طاقة شتوية..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">التخصص</label>
                  <select
                    value={newProjCategory}
                    onChange={(e: any) => setNewProjCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="إنشائي">الأعمال الإنشائية</option>
                    <option value="تشطيبات">أعمال التشطيبات</option>
                    <option value="كهرباء / تيار خفيف">الكهرباء والتيار الخفيف</option>
                    <option value="ميكانيكا">الأعمال الميكانيكية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الميزانية (ج.م)</label>
                  <input
                    type="number"
                    required
                    value={newProjBudget}
                    onChange={(e) => setNewProjBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">موقع المشروع</label>
                  <input
                    type="text"
                    required
                    value={newProjLocation}
                    onChange={(e) => setNewProjLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">مدير المشروع</label>
                  <input
                    type="text"
                    required
                    value={newProjManager}
                    onChange={(e) => setNewProjManager(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewProjectOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  حفظ وإضافة المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
