import React, { useState } from 'react';
import {
  Search,
  MessageSquare,
  Bell,
  Calendar as CalendarIcon,
  Moon,
  Sun,
  Shield,
  Maximize2,
  Minimize2,
  Send,
  X
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { NotificationDropdown } from './NotificationDropdown';

export const Header: React.FC = () => {
  const {
    darkMode,
    setDarkMode,
    focusMode,
    setFocusMode,
    notifications,
    addNotification,
    setIsSearchOpen,
    setIsNotificationsOpen,
    isNotificationsOpen,
    isProfileOpen,
    setIsProfileOpen,
    user
  } = useApp();

  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'م. أحمد السيد (محطة المياه)',
      text: 'تم الانتهاء من صب الخرسانة المسلحة للخزان الرئيسي بنسبة 100%.',
      time: 'منذ 10 دقائق'
    },
    {
      id: 'm-2',
      sender: 'م. سامح عبد الله (مركز البيانات)',
      text: 'تم استلام شحنة كابلات الألياف الضوئية وجاري الفحص الهندسي.',
      time: 'منذ 45 دقيقة'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m-${Date.now()}`,
        sender: 'رئيس مجلس الإدارة',
        text: replyText,
        time: 'الآن'
      }
    ]);
    setReplyText('');
    addNotification('تم إرسال التوجيه', 'تم إرسال رسالتك المباشرة إلى مديري المواقع.', 'success');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="relative bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg z-40 px-4 lg:px-8 py-3 border-b border-blue-700/40 shrink-0">
      <div className="flex items-center justify-between">
        
        {/* Right side: User profile & Title */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
                setIsMessagesOpen(false);
              }}
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
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 p-4 z-50 text-right">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
                  <div>
                    <h4 className="font-bold text-white">{user.name}</h4>
                    <p className="text-xs text-blue-400">{user.role}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                </div>
                
                <div className="py-2 space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 text-xs hover:bg-slate-800 rounded-lg">
                    <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> المصادقة الآمنة OAuth 2.0</span>
                    <span className="text-[11px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">مفعل</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 text-xs hover:bg-slate-800 rounded-lg">
                    <span className="flex items-center gap-2">التشفير السحابي</span>
                    <span className="text-[11px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">نشط</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition-all w-full justify-center font-bold"
                  >
                    {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
                    <span>{darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions (Search, Theme Toggle, Focus Mode, Messages, Notifications) */}
          <div className="flex items-center gap-2 bg-blue-950/40 p-1.5 rounded-xl border border-blue-500/20">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
              title="بحث سريع"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors flex items-center justify-center"
              title={darkMode ? 'التحويل إلى الوضع النهاري (الفاتح)' : 'التحويل إلى الوضع الليلي (الداكن)'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-blue-200" />}
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

            {/* Direct Messages Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMessagesOpen(!isMessagesOpen);
                  setIsNotificationsOpen(false);
                  setIsProfileOpen(false);
                }}
                className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white transition-colors relative"
                title="توجيهات ومراسلات مديري المواقع"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </button>

              {isMessagesOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 p-4 z-50 text-right">
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800">
                    <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>غرفة تواصل مديري المواقع</span>
                    </h4>
                    <button
                      onClick={() => setIsMessagesOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto mb-3 pr-1">
                    {messages.map((m) => (
                      <div key={m.id} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-blue-400 font-bold mb-1">
                          <span>{m.sender}</span>
                          <span className="text-slate-500">{m.time}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{m.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="اكتب توجيهاً فورياً للمواقع..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            {/* Notifications Popover Trigger & Container */}
            <div className="relative">
              <button
                data-notification-trigger="true"
                aria-expanded={isNotificationsOpen}
                aria-haspopup="dialog"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                  setIsMessagesOpen(false);
                }}
                className={`p-2 rounded-lg transition-all relative ${
                  isNotificationsOpen
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400/60 shadow-md'
                    : 'bg-blue-900/60 hover:bg-blue-800 text-blue-200 hover:text-white'
                }`}
                title="الإشعارات الفورية"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border border-blue-900 shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
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
