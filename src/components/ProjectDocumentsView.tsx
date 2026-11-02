import React, { useState } from 'react';
import { FolderOpen, FileText, Image as ImageIcon, FileCode, Download, Eye, Plus, Search, X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store/AppContext';

interface DocumentItem {
  id: string;
  title: string;
  category: 'عقود' | 'مخططات هندسية' | 'صور موقع';
  projectName: string;
  fileSize: string;
  date: string;
  url: string;
}

export const ProjectDocumentsView: React.FC = () => {
  const { projects, addNotification } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<string>('الكل');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [isAddDocOpen, setIsAddDocOpen] = useState<boolean>(false);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc-1',
      title: 'عقود المقاولات الرئيسية - محطة المياه',
      category: 'عقود',
      projectName: 'محطة معالجة المياه',
      fileSize: '4.2 MB',
      date: '2026-10-15',
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'doc-2',
      title: 'المخططات المعمارية والإنشائية - مركز البيانات',
      category: 'مخططات هندسية',
      projectName: 'مشروع مركز البيانات',
      fileSize: '12.8 MB',
      date: '2026-09-20',
      url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'doc-3',
      title: 'صور موقع العمل - تشطيب مبنى الخدمات',
      category: 'صور موقع',
      projectName: 'تشطيب مبنى الخدمات',
      fileSize: '8.5 MB',
      date: '2026-11-01',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7607?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'doc-4',
      title: 'عقد توريد الكابلات والأجهزة - العاصمة الإدارية',
      category: 'عقود',
      projectName: 'تطوير المقر الرئيسي',
      fileSize: '3.1 MB',
      date: '2026-10-28',
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'عقود' | 'مخططات هندسية' | 'صور موقع'>('عقود');
  const [newProject, setNewProject] = useState(projects[0]?.name || 'محطة معالجة المياه');

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    const doc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      projectName: newProject,
      fileSize: '5.0 MB',
      date: '2026-11-02',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    };
    setDocuments([doc, ...documents]);
    setIsAddDocOpen(false);
    setNewTitle('');
    addNotification('تم رفع المستند بنجاح', `تم أرشفة "${doc.title}" في سجل الوثائق الهندسية.`, 'success');
  };

  const filteredDocs = documents.filter(d => categoryFilter === 'الكل' || d.category === categoryFilter);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-blue-400" />
            <span>نظام إدارة الوثائق والمستندات الهندسية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">تصنيف وأرشفة العقود، المخططات الهندسية، صور الموقع مع المعاينة الفورية.</p>
        </div>

        <button
          onClick={() => setIsAddDocOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مستند جديد</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
        {['الكل', 'عقود', 'مخططات هندسية', 'صور موقع'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all group"
          >
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  doc.category === 'عقود' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                  doc.category === 'مخططات هندسية' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                  'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {doc.category}
                </span>
                <span className="text-xs text-slate-400">{doc.fileSize}</span>
              </div>

              <h3 className="font-bold text-white text-sm mt-2">{doc.title}</h3>
              <p className="text-xs text-blue-400 font-semibold">{doc.projectName}</p>
              <span className="text-[11px] text-slate-500 block">تاريخ الرفع: {doc.date}</span>
            </div>

            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="flex items-center gap-1.5 text-xs bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-xl font-bold transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة المستند</span>
              </button>
              <button
                onClick={() => addNotification('جاري تحميل المستند', `تم بدء تنزيل النسخة المعتمدة من "${doc.title}".`, 'info')}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title="تحميل"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{previewDoc.title}</h3>
                <p className="text-xs text-blue-400">{previewDoc.projectName} • {previewDoc.category}</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-slate-950 text-center">
              <img
                src={previewDoc.url}
                alt={previewDoc.title}
                className="max-h-[500px] mx-auto rounded-xl border border-slate-800 object-cover shadow-2xl"
              />
              <p className="text-xs text-slate-400 mt-4">معاينة مباشرة للمستند المعتمد في نظام إدارة الوثائق الرقمية للشركة.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {isAddDocOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                <span>رفع وإضافة مستند جديد</span>
              </h3>
              <button
                onClick={() => setIsAddDocOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoc} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">عنوان المستند</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: عقد مقاول من الباطن رقم 021..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">تصنيف المستند</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    <option value="عقود">عقود</option>
                    <option value="مخططات هندسية">مخططات هندسية</option>
                    <option value="صور موقع">صور موقع</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">المشروع المرتبط</label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDocOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  رفع وأرشفة المستند
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
