import React, { useState } from 'react';
import { Search, X, Building2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { NewProjectWizardModal } from './NewProjectWizardModal';

export const Modals: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    projects,
    setActiveTab
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');

  const searchResults = projects.filter(
    p => p.name.includes(searchFilter) || p.location.includes(searchFilter) || p.manager.includes(searchFilter)
  );

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

      {/* Multi-Step New Project Wizard Modal */}
      <NewProjectWizardModal />
    </>
  );
};
