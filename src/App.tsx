/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ProjectsView } from './components/ProjectsView';
import { ApprovalsView } from './components/ApprovalsView';
import { BudgetView } from './components/BudgetView';
import { ReportsView } from './components/ReportsView';
import { CalendarView } from './components/CalendarView';
import { SupportView } from './components/SupportView';
import { ProjectDocumentsView } from './components/ProjectDocumentsView';
import { Modals } from './components/Modals';
import { NotificationToast } from './components/NotificationToast';
import { Minimize2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, focusMode, setFocusMode } = useApp();

  return (
    <div className={`flex-1 overflow-y-auto transition-all duration-300 ${focusMode ? 'bg-slate-950 p-2 sm:p-6' : ''}`}>
      {focusMode && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-xl mb-4 flex items-center justify-between text-xs">
          <span className="font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
            وضع التركيز مفعل (تم إخفاء القوائم الجانبية لتسهيل قراءة وتحليل التقارير)
          </span>
          <button
            onClick={() => setFocusMode(false)}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500 text-amber-200 hover:text-white px-3 py-1 rounded-lg font-bold transition-all"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>إلغاء وضع التركيز</span>
          </button>
        </div>
      )}

      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'projects' && <ProjectsView />}
      {activeTab === 'approvals' && <ApprovalsView />}
      {activeTab === 'budget' && <BudgetView />}
      {activeTab === 'reports' && <ReportsView />}
      {activeTab === 'calendar' && <CalendarView />}
      {activeTab === 'support' && <SupportView />}
      {activeTab === 'contracts' && <ProjectsView />}
      {activeTab === 'procurements' && <ProjectsView />}
      {activeTab === 'documents' && <ProjectDocumentsView />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-['Cairo']">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <FocusSidebarWrapper />
        </div>
        <Modals />
        <NotificationToast />
      </div>
    </AppProvider>
  );
}

const FocusSidebarWrapper: React.FC = () => {
  const { focusMode } = useApp();
  return (
    <>
      {!focusMode && <Sidebar />}
      <MainContent />
    </>
  );
};
