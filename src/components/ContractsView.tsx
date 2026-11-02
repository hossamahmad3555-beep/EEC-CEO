import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Building2,
  Coins,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../store/AppContext';

interface ContractItem {
  id: string;
  code: string;
  title: string;
  contractor: string;
  projectName: string;
  specialty: string;
  totalValue: number;
  paidValue: number;
  startDate: string;
  endDate: string;
  status: 'ساري' | 'مكتمل' | 'قيد المراجعة';
  clauses: string[];
}

export const ContractsView: React.FC = () => {
  const { projects, addNotification } = useApp();
  const [statusTab, setStatusTab] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedContract, setSelectedContract] = useState<ContractItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const [contracts, setContracts] = useState<ContractItem[]>([
    {
      id: 'c-1',
      code: 'CNT-2026-101',
      title: 'عقد تنفيذ الأعمال الكهروميكانيكية الشامل',
      contractor: 'شركة النيل للأنظمة الكهروميكانيكية',
      projectName: 'محطة معالجة المياه',
      specialty: 'ميكانيكا',
      totalValue: 65000000,
      paidValue: 48000000,
      startDate: '2025-02-01',
      endDate: '2026-11-30',
      status: 'ساري',
      clauses: [
        'توريد وتركيب مضخات الضغط العالي وفق المواصفات القياسية الأوروبية.',
        'فترة الضمان والصيانة الشاملة لمدة 24 شهراً من تاريخ الاستلام الابتدائي.',
        'غرامات التأخير 1% عن كل أسبوع تأخير بحد أقصى 10% من إجمالي قيمة العقد.'
      ]
    },
    {
      id: 'c-2',
      code: 'CNT-2026-104',
      title: 'عقد تشطيبات الواجهات الزجاجية والكلادينج',
      contractor: 'المجموعة الهندسية للواجهات الحديثة',
      projectName: 'تطوير المقر الرئيسي',
      specialty: 'تشطيبات',
      totalValue: 42000000,
      paidValue: 31500000,
      startDate: '2025-04-10',
      endDate: '2026-06-20',
      status: 'ساري',
      clauses: [
        'استخدام زجاج مزدوج عازل للحرارة والصوت بسمك 24 مم.',
        'اعتماد كافة العينات من الاستشاري الهندسي قبل التوريد للموقع.',
        'صرف الدفعات بناءً على المستخلصات الشهرية المعتمدة.'
      ]
    },
    {
      id: 'c-3',
      code: 'CNT-2026-108',
      title: 'عقد تجهيز البنية التحتية وشبكات الألياف الضوئية',
      contractor: 'شركة الدلتا لتقنيات الاتصالات والتيار الخفيف',
      projectName: 'مشروع مركز البيانات',
      specialty: 'تيار خفيف',
      totalValue: 88000000,
      paidValue: 60000000,
      startDate: '2025-06-15',
      endDate: '2026-12-30',
      status: 'ساري',
      clauses: [
        'تركيب واختبار كابلات الألياف الضوئية وكبائن الخوادم الرئيسية.',
        'تطبيق معايير Tier-III لمراكز البيانات العالمية.',
        'تقديم شهادات اختبار Fluke لجميع نقاط الشبكة.'
      ]
    },
    {
      id: 'c-4',
      code: 'CNT-2025-089',
      title: 'عقد توريد وتركيب وحدات التكييف المركزي Chiller',
      contractor: 'العربية للتبريد والتكييف الهندسي',
      projectName: 'تطوير نظام التكييف - المرحلة الثانية',
      specialty: 'ميكانيكا',
      totalValue: 45000000,
      paidValue: 45000000,
      startDate: '2024-03-01',
      endDate: '2026-01-10',
      status: 'مكتمل',
      clauses: [
        'تم الاستلام الابتدائي والنهائي وتشغيل الوحدات بكفاءة 100%.',
        'رد خطاب الضمان النهائي بعد انتهاء فترة الصيانة التعاقدية.'
      ]
    },
    {
      id: 'c-5',
      code: 'CNT-2026-115',
      title: 'عقد أعمال الخرسانات المسلحة والأساسات العميقة',
      contractor: 'شركة الصعيد للمقاولات والإنشاءات',
      projectName: 'مبنى إداري جديد',
      specialty: 'إنشائي',
      totalValue: 110000000,
      paidValue: 25000000,
      startDate: '2026-09-01',
      endDate: '2027-05-30',
      status: 'قيد المراجعة',
      clauses: [
        'تنفيذ أعمال الخوازيق واللبشة المسلحة طبقاً لتقرير الجسات.',
        'إجراء اختبارات تكسير المكعبات الخرسانية في معامل معتمدة.'
      ]
    }
  ]);

  // New contract form state
  const [newTitle, setNewTitle] = useState('');
  const [newContractor, setNewContractor] = useState('');
  const [newProject, setNewProject] = useState(projects[0]?.name || 'محطة معالجة المياه');
  const [newSpecialty, setNewSpecialty] = useState('إنشائي');
  const [newTotalValue, setNewTotalValue] = useState('');

  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContractor.trim() || !newTotalValue) return;
    const val = Number(newTotalValue) * 1000000;
    const newItem: ContractItem = {
      id: `c-${Date.now()}`,
      code: `CNT-2026-${Math.floor(120 + Math.random() * 80)}`,
      title: newTitle,
      contractor: newContractor,
      projectName: newProject,
      specialty: newSpecialty,
      totalValue: val,
      paidValue: 0,
      startDate: '2026-11-02',
      endDate: '2027-06-30',
      status: 'ساري',
      clauses: [
        'الالتزام التام بالمواصفات الفنية والجدول الزمني المعتمد للمشروع.',
        'صرف المستخلصات بعد اعتماد مهندس الموقع والاستشاري.'
      ]
    };
    setContracts([newItem, ...contracts]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewContractor('');
    setNewTotalValue('');
    addNotification('تمت إضافة عقد جديد', `تم تسجيل "${newItem.title}" في سجل العقود بنجاح.`, 'success');
  };

  const filteredContracts = contracts.filter(c => {
    const matchesStatus = statusTab === 'الكل' || c.status === statusTab;
    const matchesSearch =
      c.title.includes(searchQuery) ||
      c.contractor.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.projectName.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const totalContractsVal = contracts.reduce((acc, c) => acc + c.totalValue, 0);
  const totalPaidVal = contracts.reduce((acc, c) => acc + c.paidValue, 0);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Top Header */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-400" />
            <span>إدارة العقود والمستخلصات الهندسية</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            متابعة عقود مقاولي الباطن، نسب الصرف المالي، البنود التعاقدية، ومواعيد الانتهاء.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>تسجيل عقد جديد</span>
        </button>
      </div>

      {/* KPI Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي العقود المسجلة</span>
          <span className="text-2xl font-black text-white">{contracts.length} عقود رئيسية</span>
          <span className="text-[11px] text-blue-400 font-semibold block mt-1">معتمدة من الشئون القانونية</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">القيمة الإجمالية للعقود</span>
          <span className="text-2xl font-black text-white">{(totalContractsVal / 1000000).toLocaleString()} مليون</span>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-1">جنيه مصري</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">المستخلصات المنصرفة</span>
          <span className="text-2xl font-black text-blue-400">{(totalPaidVal / 1000000).toLocaleString()} مليون</span>
          <span className="text-[11px] text-slate-300 font-semibold block mt-1">
            بنسبة صرف {Math.round((totalPaidVal / totalContractsVal) * 100)}%
          </span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">خطابات الضمان السارية</span>
          <span className="text-2xl font-black text-emerald-400">100% مغطاة</span>
          <span className="text-[11px] text-emerald-300 font-semibold block mt-1">تأمين ابتدائي ونهائي</span>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['الكل', 'ساري', 'مكتمل', 'قيد المراجعة'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                statusTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/10">
                {tab === 'الكل' ? contracts.length : contracts.filter(c => c.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث برقم العقد، اسم المقاول، أو المشروع..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-4 px-4">كود العقد</th>
                <th className="py-4 px-4">مسمى العقد والمقاول</th>
                <th className="py-4 px-4">المشروع والتخصص</th>
                <th className="py-4 px-4">قيمة العقد</th>
                <th className="py-4 px-4">المستخلصات المنصرفة</th>
                <th className="py-4 px-4">الحالة</th>
                <th className="py-4 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredContracts.map((contract) => {
                const paidPercent = Math.round((contract.paidValue / contract.totalValue) * 100);
                return (
                  <tr key={contract.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-blue-400">{contract.code}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{contract.title}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{contract.contractor}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-200">{contract.projectName}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-800 text-blue-300 text-[10px] font-bold">
                        {contract.specialty}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-white">
                      {(contract.totalValue / 1000000).toFixed(1)} مليون ج.م
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-400">
                          {(contract.paidValue / 1000000).toFixed(1)} م ({paidPercent}%)
                        </span>
                      </div>
                      <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${paidPercent}%` }} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          contract.status === 'ساري'
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : contract.status === 'مكتمل'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}
                      >
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedContract(contract)}
                          className="flex items-center gap-1 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-xl font-bold transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>البنود</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">{selectedContract.code}</span>
                <h3 className="font-black text-white text-base mt-0.5">{selectedContract.title}</h3>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block">المقاول المنفذ</span>
                  <span className="font-bold text-white mt-0.5 block">{selectedContract.contractor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">المشروع</span>
                  <span className="font-bold text-blue-400 mt-0.5 block">{selectedContract.projectName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">قيمة العقد الإجمالية</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">
                    {(selectedContract.totalValue / 1000000).toFixed(2)} مليون ج.م
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>الشروط والبنود التعاقدية المعتمدة:</span>
                </h4>
                <ul className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {selectedContract.clauses.map((clause, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  addNotification('تصدير نسخة العقد', `تم تجهيز ملف العقد ${selectedContract.code} للطباعة.`, 'info');
                  window.print();
                }}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                <span>طباعة / تصدير PDF</span>
              </button>
              <button
                onClick={() => setSelectedContract(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contract Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                <span>تسجيل عقد مقاولات جديد</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContract} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">مسمى العقد</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: عقد توريد وتركيب شبكات الإطفاء..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم الشركة / المقاول المنفذ</label>
                <input
                  type="text"
                  required
                  value={newContractor}
                  onChange={(e) => setNewContractor(e.target.value)}
                  placeholder="مثال: الشركة الهندسية للأنظمة المتكاملة"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">المشروع المرتبط</label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">القيمة (بالمليون ج.م)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newTotalValue}
                    onChange={(e) => setNewTotalValue(e.target.value)}
                    placeholder="مثال: 35"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                >
                  حفظ واعتماد العقد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
