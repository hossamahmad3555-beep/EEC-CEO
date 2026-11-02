import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project, ApprovalItem, NotificationItem } from '../types';

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subTab: string | null;
  setSubTab: (subTab: string | null) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  focusMode: boolean;
  setFocusMode: (focus: boolean) => void;
  readingMode: boolean;
  setReadingMode: (reading: boolean) => void;
  projects: Project[];
  updateProjectProgress: (id: string, progress: number, initialDelivery: number, finalDelivery: number) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  approvals: ApprovalItem[];
  handleApprovalAction: (id: string, action: 'معتمد' | 'مرفوض') => void;
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: 'info' | 'warning' | 'success' | 'danger') => void;
  markNotificationAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isNewProjectOpen: boolean;
  setIsNewProjectOpen: (open: boolean) => void;
  user: {
    name: string;
    role: string;
    email: string;
    avatar: string;
    company: string;
  };
}

const initialProjects: Project[] = [
  {
    id: 'p-1',
    name: 'محطة معالجة المياه',
    category: 'ميكانيكا',
    progress: 85,
    initialDelivery: 60,
    finalDelivery: 0,
    status: 'قيد التنفيذ',
    budget: 180000000,
    spent: 145000000,
    location: 'القاهرة الجديدة',
    startDate: '2025-01-10',
    endDate: '2026-12-30',
    manager: 'م. أحمد السيد',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-2',
    name: 'تشطيب مبنى الخدمات',
    category: 'تشطيبات',
    progress: 72,
    initialDelivery: 0,
    finalDelivery: 0,
    status: 'قيد التنفيذ',
    budget: 95000000,
    spent: 68000000,
    location: 'العاصمة الإدارية',
    startDate: '2025-03-01',
    endDate: '2026-09-15',
    manager: 'م. محمود حسن',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7607?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-3',
    name: 'مشروع مركز البيانات',
    category: 'تيار خفيف',
    progress: 68,
    initialDelivery: 30,
    finalDelivery: 0,
    status: 'قيد التنفيذ',
    budget: 310000000,
    spent: 210000000,
    location: 'القرية الذكية - الجيزة',
    startDate: '2025-06-01',
    endDate: '2027-01-30',
    manager: 'م. سامح عبد الله',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-4',
    name: 'تطوير المقر الرئيسي',
    category: 'تشطيبات',
    progress: 76,
    initialDelivery: 45,
    finalDelivery: 0,
    status: 'قيد التنفيذ',
    budget: 220000000,
    spent: 165000000,
    location: 'وسط البلد - القاهرة',
    startDate: '2024-11-01',
    endDate: '2026-06-30',
    manager: 'م. خالد إبراهيم',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-5',
    name: 'مبنى إداري جديد',
    category: 'إنشائي',
    progress: 82,
    initialDelivery: 70,
    finalDelivery: 0,
    status: 'قيد التنفيذ',
    budget: 270000000,
    spent: 215000000,
    location: 'التجمع الخامس',
    startDate: '2024-05-15',
    endDate: '2026-10-31',
    manager: 'م. رامي فؤاد',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-6',
    name: 'تطوير نظام التكييف - المرحلة الثانية',
    category: 'ميكانيكا',
    progress: 100,
    initialDelivery: 100,
    finalDelivery: 100,
    status: 'مكتملة',
    budget: 75000000,
    spent: 72000000,
    location: 'الإسكندرية',
    startDate: '2024-02-01',
    endDate: '2026-01-15',
    manager: 'م. عادل الشريف',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-7',
    name: 'محطة محولات الكهرباء الرئيسية',
    category: 'كهرباء / تيار خفيف',
    progress: 40,
    initialDelivery: 0,
    finalDelivery: 0,
    status: 'مؤجلة',
    budget: 140000000,
    spent: 52000000,
    location: 'المنطقة الصناعية - العاشر من رمضان',
    startDate: '2025-02-15',
    endDate: '2026-11-30',
    manager: 'م. طارق المنشاوي',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-8',
    name: 'إنشاء مجمع المخازن الاستراتيجية',
    category: 'إنشائي',
    progress: 100,
    initialDelivery: 100,
    finalDelivery: 95,
    status: 'مكتملة',
    budget: 160000000,
    spent: 155000000,
    location: 'مدينة بدر',
    startDate: '2024-01-10',
    endDate: '2025-12-20',
    manager: 'م. هاني عبد الرحمن',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p-9',
    name: 'تأهيل واجهات البرج الإداري',
    category: 'تشطيبات',
    progress: 25,
    initialDelivery: 0,
    finalDelivery: 0,
    status: 'معرضة للمخاطر',
    budget: 65000000,
    spent: 22000000,
    location: 'العلمين الجديدة',
    startDate: '2025-05-01',
    endDate: '2026-08-30',
    manager: 'م. كريم فهمي',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  }
];

const initialApprovals: ApprovalItem[] = [
  {
    id: 'app-1',
    title: 'أمر - تغيير - 014 - P',
    code: 'CHG-2026-014',
    amount: '12,500,000 ج.م',
    category: 'الأعمال الإنشائية',
    date: '2026-11-01',
    status: 'معلق',
    urgency: 'عاجل'
  },
  {
    id: 'app-2',
    title: 'عقد من الباطن - 020 - MEP',
    code: 'SUB-2026-020',
    amount: '8,750,000 ج.م',
    category: 'الأعمال الميكانيكية',
    date: '2026-10-29',
    status: 'معلق',
    urgency: 'عادي'
  },
  {
    id: 'app-3',
    title: 'توريد مواد - 118 - PR',
    code: 'MAT-2026-118',
    amount: '5,300,000 ج.م',
    category: 'أعمال التشطيبات',
    date: '2026-10-28',
    status: 'معلق',
    urgency: 'عادي'
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'اعتماد ميزانية جديدة',
    message: 'تم اعتماد ملحق ميزانية مشروع محطة معالجة المياه بنجاح بقيمة 18.5 مليون ج.م.',
    time: 'منذ 15 دقيقة',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: 'تنبيه مخاطر موقع',
    message: 'ارتفاع مؤشر سرعة الرياح في موقع العاصمة الإدارية، يرجى مراجعة إجراءات السلامة للروافع البرجية.',
    time: 'منذ ساعة',
    read: false,
    type: 'warning'
  },
  {
    id: 'notif-3',
    title: 'طلب موافقة عاجل',
    message: 'تم إدراج أمر تغيير رقم P-014 (أعمال كهروميكانيكية إضافية) في قائمة الموافقات المعلقة.',
    time: 'منذ ساعتين',
    read: false,
    type: 'danger'
  },
  {
    id: 'notif-4',
    title: 'توريد معدات الموقع الرئيسي',
    message: 'وصول شحنة المحولات الكهربائية ولوحات الجهد المتوسط إلى موقع محطة المحولات وإتمام الفحص الابتدائي.',
    time: 'منذ 3 ساعات',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-5',
    title: 'إنجاز مرحلة تنفيذية (85%)',
    message: 'تجاوز مشروع محطة معالجة المياه نسبة 85% من الجدول الزمني المعتمد قبل الموعد المحدد بأسبوعين.',
    time: 'منذ 5 ساعات',
    read: true,
    type: 'success'
  },
  {
    id: 'notif-6',
    title: 'تقرير الجودة والسلامة المهنية (HSE)',
    message: 'اعتماد التقرير الأسبوعي للسلامة المهنية بنسبة التزام 98.4% دون تسجيل أي حوادث توقف.',
    time: 'أمس',
    read: true,
    type: 'info'
  },
  {
    id: 'notif-7',
    title: 'مراجعة مستخلص مقاول الباطن',
    message: 'المستخلص الجاري رقم (8) لأعمال التكييف المركزي جاهز للمراجعة والاعتماد المالي.',
    time: 'منذ يومين',
    read: true,
    type: 'warning'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [subTab, setSubTab] = useState<string | null>(null);
  
  // System theme detection & manual override persistence
  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('eg_dark_mode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return true; // Default dark
  });

  const setDarkMode = (dark: boolean) => {
    setDarkModeState(dark);
    localStorage.setItem('eg_dark_mode', JSON.stringify(dark));
  };

  useEffect(() => {
    // Listen to system theme changes if user hasn't manually set preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('eg_dark_mode');
      if (saved === null) {
        setDarkModeState(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [readingMode, setReadingMode] = useState<boolean>(false);
  
  // LocalStorage persistence for projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('eg_projects');
    if (saved) {
      const parsed: Project[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(p => p.id));
      const missing = initialProjects.filter(p => !existingIds.has(p.id));
      return [...parsed, ...missing];
    }
    return initialProjects;
  });

  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => {
    const saved = localStorage.getItem('eg_approvals');
    return saved ? JSON.parse(saved) : initialApprovals;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('eg_notifications');
    if (saved) {
      const parsed: NotificationItem[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map(n => n.id));
      const missing = initialNotifications.filter(n => !existingIds.has(n.id));
      return [...parsed, ...missing];
    }
    return initialNotifications;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false);

  const user = {
    name: 'رئيس مجلس الإدارة',
    role: 'رئيس مجلس الإدارة والعضو المنتدب',
    email: 'chairman@eg-engineering.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    company: 'الشركة المصرية الهندسية للمقاولات'
  };

  useEffect(() => {
    localStorage.setItem('eg_projects', JSON.stringify(projects));
    
    projects.forEach(p => {
      const spendRatio = p.spent / p.budget;
      if (spendRatio >= 0.9) {
        const alertTitle = 'تنبيه تجاوز الميزانية (90%+)';
        const alertMsg = `تحذير: مشروع "${p.name}" وصل معدل الإنفاق فيه إلى ${Math.round(spendRatio * 100)}% من الميزانية المحددة!`;
        
        const exists = notifications.some(n => n.message.includes(p.name) && n.title.includes('تجاوز الميزانية'));
        if (!exists) {
          const warningNotif: NotificationItem = {
            id: `budget-alert-${Date.now()}-${p.id}`,
            title: alertTitle,
            message: alertMsg,
            time: 'الآن',
            read: false,
            type: 'danger'
          };
          setNotifications(prev => [warningNotif, ...prev]);
        }
      }
    });
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('eg_approvals', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('eg_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const updateProjectProgress = (id: string, progress: number, initialDelivery: number, finalDelivery: number) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, progress, initialDelivery, finalDelivery } : p));
  };

  const addProject = (newProj: Omit<Project, 'id'>) => {
    const proj: Project = {
      ...newProj,
      id: `p-${Date.now()}`
    };
    setProjects(prev => [proj, ...prev]);
  };

  const handleApprovalAction = (id: string, action: 'معتمد' | 'مرفوض') => {
    setApprovals(prev => prev.map(app => app.id === id ? { ...app, status: action } : app));
    const item = approvals.find(a => a.id === id);
    if (item) {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: action === 'معتمد' ? 'تم اعتماد الطلب بنجاح' : 'تم رفض الطلب',
        message: `تم ${action} الطلب: ${item.title} بقيمة ${item.amount}`,
        time: 'الآن',
        read: false,
        type: action === 'معتمد' ? 'success' : 'danger'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  const addNotification = (title: string, message: string, type: 'info' | 'warning' | 'success' | 'danger' = 'info') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      message,
      time: 'الآن',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        subTab,
        setSubTab,
        darkMode,
        setDarkMode,
        focusMode,
        setFocusMode,
        readingMode,
        setReadingMode,
        projects,
        updateProjectProgress,
        addProject,
        approvals,
        handleApprovalAction,
        notifications,
        addNotification,
        markNotificationAsRead,
        removeNotification,
        clearAllNotifications,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isProfileOpen,
        setIsProfileOpen,
        isNewProjectOpen,
        setIsNewProjectOpen,
        user
      }}
    >
      <div className={darkMode ? 'dark bg-slate-950 text-slate-100 min-h-screen' : 'light-mode bg-slate-100 text-slate-800 min-h-screen'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
