import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  ChevronDown,
  Building2,
  Paintbrush,
  Zap,
  Radio,
  Snowflake,
  FileText,
  ShoppingCart,
  Wallet,
  BarChart3,
  CheckSquare,
  FolderOpen,
  Calendar,
  Headphones,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, subTab, setSubTab } = useApp();
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'projects', label: 'المشاريع', icon: FolderKanban },
    {
      id: 'specialties',
      label: 'التخصصات',
      icon: Layers,
      hasSub: true,
      subItems: [
        { id: 'إنشائي', label: 'الأعمال الإنشائية', icon: Building2 },
        { id: 'تشطيبات', label: 'أعمال التشطيبات', icon: Paintbrush },
        { id: 'كهرباء', label: 'الكهرباء (باور)', icon: Zap },
        { id: 'تيار خفيف', label: 'التيار الخفيف', icon: Radio },
        { id: 'ميكانيكا', label: 'الأعمال الميكانيكية (تكييفات وصرف)', icon: Snowflake }
      ]
    },
    { id: 'contracts', label: 'العقود', icon: FileText },
    { id: 'procurements', label: 'المشتريات', icon: ShoppingCart },
    { id: 'budget', label: 'التكاليف والميزانية', icon: Wallet },
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'approvals', label: 'الموافقات', icon: CheckSquare },
    { id: 'documents', label: 'المستندات', icon: FolderOpen },
    { id: 'calendar', label: 'التقويم', icon: Calendar }
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.hasSub) {
      setIsSpecialtiesOpen(!isSpecialtiesOpen);
    } else {
      setActiveTab(item.id);
      setSubTab(null);
      setIsMobileOpen(false);
    }
  };

  const handleSubMenuClick = (subId: string) => {
    setActiveTab('projects');
    setSubTab(subId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-blue-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center border-2 border-white/20"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 right-0 h-full w-72 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 text-slate-100 flex flex-col shadow-2xl border-l border-blue-800/40 z-40 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Company Header inside Sidebar */}
        <div className="p-4 border-b border-blue-900/60 bg-blue-950/80 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md border border-blue-400">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-extrabold text-base text-white">الشركة المصرية الهندسية</h2>
          </div>
          <p className="text-[11px] text-blue-300">للمقاولات العامة والإنشاءات الكبرى</p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !item.hasSub;

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold border border-blue-400/40'
                      : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.hasSub && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isSpecialtiesOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'
                      }`}
                    />
                  )}
                </button>

                {/* Sub-items */}
                {item.hasSub && isSpecialtiesOpen && item.subItems && (
                  <div className="mt-1 mr-4 space-y-1 border-r-2 border-blue-500/30 pr-3">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = subTab === sub.id && activeTab === 'projects';
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubMenuClick(sub.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isSubActive
                              ? 'bg-blue-600/80 text-white font-bold border border-blue-400/30'
                              : 'text-slate-300 hover:bg-blue-900/40 hover:text-white'
                          }`}
                        >
                          <SubIcon className="w-4 h-4 text-blue-400" />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support inside Sidebar */}
        <div className="p-3 border-t border-blue-900/60 bg-blue-950/60">
          <button
            onClick={() => setActiveTab('support')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'support'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
            }`}
          >
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>الدعم الفني والاتصال</span>
          </button>
        </div>
      </aside>
    </>
  );
};
