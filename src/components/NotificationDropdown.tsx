import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  CheckCheck,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  X,
  Trash2,
  Check,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { NotificationItem } from '../types';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    removeNotification,
    clearAllNotifications,
    setActiveTab,
    darkMode
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.type === 'danger' || n.type === 'warning').length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'urgent') return n.type === 'danger' || n.type === 'warning';
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks on the Bell trigger button so its own onClick can toggle cleanly
      if (target.closest('[data-notification-trigger="true"]')) {
        return;
      }

      if (popoverRef.current && !popoverRef.current.contains(target)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getNotificationMeta = (notif: NotificationItem) => {
    switch (notif.type) {
      case 'success':
        return {
          icon: CheckCircle2,
          badgeText: 'اعتماد وإنجاز',
          iconWrap: darkMode
            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            : 'bg-emerald-50 text-emerald-600 border-emerald-200',
          badgeStyle: darkMode
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200',
          targetTab: 'projects',
          actionLabel: 'عرض المشاريع'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          badgeText: 'تنبيه تشغيلي',
          iconWrap: darkMode
            ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            : 'bg-amber-50 text-amber-600 border-amber-200',
          badgeStyle: darkMode
            ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
            : 'bg-amber-50 text-amber-700 border-amber-200',
          targetTab: 'projects',
          actionLabel: 'متابعة الموقع'
        };
      case 'danger':
        return {
          icon: ShieldAlert,
          badgeText: 'أولوية قصوى',
          iconWrap: darkMode
            ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
            : 'bg-rose-50 text-rose-600 border-rose-200',
          badgeStyle: darkMode
            ? 'bg-rose-950/80 text-rose-300 border-rose-800/60'
            : 'bg-rose-50 text-rose-700 border-rose-200',
          targetTab: 'approvals',
          actionLabel: 'مراجعة الطلب'
        };
      default:
        return {
          icon: Info,
          badgeText: 'تحديث إداري',
          iconWrap: darkMode
            ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
            : 'bg-blue-50 text-blue-600 border-blue-200',
          badgeStyle: darkMode
            ? 'bg-blue-950/80 text-blue-300 border-blue-800/60'
            : 'bg-blue-50 text-blue-700 border-blue-200',
          targetTab: 'procurements',
          actionLabel: 'التفاصيل'
        };
    }
  };

  const handleNotificationNavigate = (notif: NotificationItem, targetTab: string) => {
    markNotificationAsRead(notif.id);
    setActiveTab(targetTab);
    onClose();
  };

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="نافذة الإشعارات"
      className={`absolute right-0 mt-3.5 w-[340px] sm:w-[410px] rounded-2xl shadow-2xl border z-50 text-right transition-all duration-200 origin-top-right ${
        darkMode
          ? 'bg-slate-900/95 backdrop-blur-xl text-slate-100 border-slate-700/80 ring-1 ring-blue-500/15 shadow-slate-950/80'
          : 'bg-white/95 backdrop-blur-xl text-slate-800 border-slate-200 ring-1 ring-slate-900/5 shadow-slate-900/15'
      }`}
    >
      {/* Top Popover Pointer Arrow aligned with the Bell icon */}
      <div
        className={`absolute -top-2 right-3.5 w-4 h-4 rotate-45 border-t border-l ${
          darkMode
            ? 'bg-slate-900 border-slate-700/80'
            : 'bg-white border-slate-200'
        }`}
      />

      {/* Popover Header */}
      <div
        className={`relative px-4 pt-4 pb-3 border-b rounded-t-2xl ${
          darkMode
            ? 'bg-gradient-to-l from-slate-900 via-slate-900 to-blue-950/50 border-slate-800'
            : 'bg-gradient-to-l from-slate-50 via-white to-blue-50/60 border-slate-200/80'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-inner ${
                darkMode
                  ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
                  : 'bg-blue-50 border-blue-200 text-blue-600'
              }`}
            >
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-extrabold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  مركز الإشعارات التنفيذي
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                    {unreadCount} غير مقروءة
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                تحديثات المشاريع والموافقات والتنبيهات الميدانية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                onClick={clearAllNotifications}
                className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 border ${
                  darkMode
                    ? 'bg-slate-800/90 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border-slate-700 hover:border-blue-500/40'
                    : 'bg-slate-100 hover:bg-blue-50 text-blue-600 border-slate-200 hover:border-blue-300'
                }`}
                title="تحديد الكل كمقروء"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>قراءة الكل</span>
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-colors ${
                darkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className={`grid grid-cols-3 gap-1.5 mt-3.5 p-1 rounded-xl border ${
            darkMode
              ? 'bg-slate-950/80 border-slate-800/80'
              : 'bg-slate-100/80 border-slate-200/70'
          }`}
        >
          <button
            onClick={() => setFilter('all')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>الكل</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filter === 'all'
                  ? 'bg-white/20 text-white'
                  : darkMode
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {notifications.length}
            </span>
          </button>

          <button
            onClick={() => setFilter('unread')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>غير المقروءة</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filter === 'unread'
                  ? 'bg-white/20 text-white'
                  : unreadCount > 0
                  ? 'bg-blue-500/20 text-blue-400'
                  : darkMode
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {unreadCount}
            </span>
          </button>

          <button
            onClick={() => setFilter('urgent')}
            className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              filter === 'urgent'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>تنبيهات هامة</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filter === 'urgent'
                  ? 'bg-white/20 text-white'
                  : urgentCount > 0
                  ? 'bg-amber-500/20 text-amber-400'
                  : darkMode
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {urgentCount}
            </span>
          </button>
        </div>
      </div>

      {/* Sleek Scrollable Notifications Area */}
      <div className="max-h-[340px] overflow-y-auto overscroll-contain px-3 py-2.5 space-y-2 scroll-smooth">
        {filteredNotifications.length === 0 ? (
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border ${
                darkMode
                  ? 'bg-slate-800/60 border-slate-700 text-slate-400'
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
            >
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <p className={`text-xs font-bold ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              لا توجد إشعارات في هذا التصنيف
            </p>
            <p className={`text-[11px] mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              جميع التنبيهات والتحديثات التنفيذية تمت مراجعتها
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const meta = getNotificationMeta(notif);
            const IconComponent = meta.icon;

            return (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`relative p-3 rounded-xl border transition-all duration-150 cursor-pointer group ${
                  notif.read
                    ? darkMode
                      ? 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                    : darkMode
                    ? 'bg-gradient-to-l from-blue-950/50 via-slate-900/90 to-slate-900/90 border-blue-500/40 hover:border-blue-400/60 shadow-md shadow-blue-950/20'
                    : 'bg-gradient-to-l from-blue-50/90 via-white to-white border-blue-300 hover:border-blue-400 shadow-sm'
                }`}
              >
                {/* Unread Accent Indicator Bar on Right Edge (RTL) */}
                {!notif.read && (
                  <span className="absolute right-0 top-3 bottom-3 w-1 rounded-l-full bg-blue-500" />
                )}

                <div className="flex items-start gap-3">
                  {/* Category Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${meta.iconWrap}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h4
                          className={`font-bold text-xs truncate transition-colors ${
                            notif.read
                              ? darkMode
                                ? 'text-slate-200 group-hover:text-white'
                                : 'text-slate-700 group-hover:text-slate-900'
                              : darkMode
                              ? 'text-white group-hover:text-blue-300'
                              : 'text-slate-900 group-hover:text-blue-700'
                          }`}
                        >
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 animate-pulse" />
                        )}
                      </div>

                      {/* Timestamp */}
                      <span
                        className={`text-[10px] font-medium flex items-center gap-1 shrink-0 ${
                          darkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <Clock className="w-2.5 h-2.5" />
                        {notif.time}
                      </span>
                    </div>

                    <p
                      className={`text-[11px] mt-1 leading-relaxed line-clamp-2 ${
                        notif.read
                          ? darkMode
                            ? 'text-slate-400'
                            : 'text-slate-500'
                          : darkMode
                          ? 'text-slate-200'
                          : 'text-slate-700'
                      }`}
                    >
                      {notif.message}
                    </p>

                    {/* Bottom Meta & Quick Actions Row */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/40">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${meta.badgeStyle}`}
                      >
                        {meta.badgeText}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {!notif.read && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              markNotificationAsRead(notif.id);
                            }}
                            className={`p-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              darkMode
                                ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                                : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-100'
                            }`}
                            title="تحديد كمقروء"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notif.id);
                          }}
                          className={`p-1 rounded-lg text-[10px] transition-colors ${
                            darkMode
                              ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                              : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                          }`}
                          title="حذف الإشعار"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationNavigate(notif, meta.targetTab);
                          }}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5 transition-colors ${
                            darkMode
                              ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-950/60'
                              : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                          }`}
                        >
                          <span>{meta.actionLabel}</span>
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Popover Footer */}
      <div
        className={`px-4 py-2.5 border-t rounded-b-2xl flex items-center justify-between gap-2 ${
          darkMode
            ? 'bg-slate-950/70 border-slate-800'
            : 'bg-slate-50/90 border-slate-200/80'
        }`}
      >
        <span className={`text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          إجمالي التنبيهات المسجلة: <strong className={darkMode ? 'text-white' : 'text-slate-800'}>{notifications.length}</strong>
        </span>

        <button
          onClick={() => {
            onClose();
            setActiveTab('approvals');
          }}
          className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            darkMode
              ? 'text-blue-400 hover:text-white hover:bg-blue-600/20 border border-transparent hover:border-blue-500/30'
              : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
          }`}
        >
          <span>مركز الموافقات والسجلات</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
