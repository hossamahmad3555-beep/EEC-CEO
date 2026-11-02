import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { NotificationItem } from '../types';

export const NotificationToast: React.FC = () => {
  const { notifications } = useApp();
  const [activeToasts, setActiveToasts] = useState<NotificationItem[]>([]);
  const seenIdsRef = useRef<Set<string>>(new Set(notifications.map(n => n.id)));

  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      if (!seenIdsRef.current.has(latest.id)) {
        seenIdsRef.current.add(latest.id);
        setActiveToasts(prev => [latest, ...prev.slice(0, 2)]);

        const timer = setTimeout(() => {
          setActiveToasts(prev => prev.filter(t => t.id !== latest.id));
        }, 4500);

        return () => clearTimeout(timer);
      }
    }
  }, [notifications]);

  const removeToast = (id: string) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
      case 'danger':
        return <AlertOctagon className="w-5 h-5 text-red-400 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/40 bg-emerald-950/90 text-emerald-100';
      case 'warning':
        return 'border-amber-500/40 bg-amber-950/90 text-amber-100';
      case 'danger':
        return 'border-red-500/40 bg-red-950/90 text-red-100';
      default:
        return 'border-blue-500/40 bg-blue-950/90 text-blue-100';
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex items-start gap-3 ${getBorderColor(toast.type)}`}
          >
            {getIcon(toast.type)}
            <div className="flex-1">
              <h4 className="font-bold text-sm text-white">{toast.title}</h4>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{toast.message}</p>
              <span className="text-[10px] text-slate-400 mt-1 block">{toast.time}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
