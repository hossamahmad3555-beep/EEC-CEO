import React from 'react';
import { Search, MessageSquare, Bell, Calendar as CalendarIcon, User, Moon, Sun, Shield, Maximize2, Minimize2 } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Header: React.FC = () => {
  const {
    darkMode,
    setDarkMode,
    focusMode,
    setFocusMode,
    notifications,
    setIsSearchOpen,
    setIsNotificationsOpen,
    isNotificationsOpen,
    isProfileOpen,
    setIsProfileOpen,
    user
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="relative bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg z-30 px-4 lg:px-8 py-3 border-b border-blue-700/40">
      <div className="flex items-center justify-between">
        
        {/* Right side: User profile & Title */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 bg-blue-950/60 hover:bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-500/30 transition-all shadow-inner"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-right">
                <span className="block font-bold text-sm tracking-wide text-blue-100">{user.name}</span>
                <span className="block text-xs text-blue-300 font-medium">{user.company}</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
                  <div>
                    <h4 className="font-bold text-white">{user.name}</h4>
                    <p className="text-xs text-blue-400">{user.role}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                </div>
                
                <div className="py-2 space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-800 rounded-lg cursor-pointer">
                    <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> المصادقة الآمنة OAuth 2.0</span>
                    <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">مفعل</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 text-sm hover:bg-slate-800 rounded-lg cursor-pointer">
                    <span className="flex items-center gap-2">التشفير السحابي</span>
                    <span className="text-xs bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">نشط</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition-all w-full justify-center"
                  >
                    {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                    <span>{darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions (Search, Focus Mode, Messages, Notifications) */}
          <div className="flex items-center gap-2 bg-blue-950/40 p-1.5 rounded-xl border border-blue-500/20">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
              title="بحث سريع"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`p-2 rounded-lg transition-colors relative ${
                focusMode ? 'bg-amber-600 text-white' : 'bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white'
              }`}
              title={focusMode ? 'إلغاء وضع التركيز' : 'وضع التركيز (إخفاء القوائم وتعتيم الخلفية)'}
            >
              {focusMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => alert('تم فتح صندوق الرسائل والمحادثات المباشرة مع مديري المواقع.')}
              className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors relative"
              title="الرسائل"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors relative"
                title="الإشعارات الفورية"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-blue-900">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Center / Left: Date Badge & Company Title */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-left">
            <h1 className="text-base font-extrabold text-white tracking-wide">صباح الخير، رئيس مجلس الإدارة</h1>
            <p className="text-xs text-blue-200 font-medium">لوحة المتابعة التنفيذية - الشركة المصرية الهندسية للمقاولات</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-950/60 px-3 py-1.5 rounded-xl border border-blue-500/30 text-blue-200 text-xs font-semibold">
            <CalendarIcon className="w-4 h-4 text-blue-400" />
            <span>الثلاثاء، 2 نوفمبر 2026</span>
          </div>
        </div>

      </div>
    </header>
  );
};
