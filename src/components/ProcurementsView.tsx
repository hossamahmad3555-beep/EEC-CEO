import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  X
} from 'lucide-react';
import { useApp } from '../store/AppContext';

interface ProcurementOrder {
  id: string;
  poNumber: string;
  itemTitle: string;
  supplier: string;
  projectName: string;
  category: string;
  quantity: string;
  cost: number;
  deliveryDate: string;
  status: 'تم التوريد' | 'جاري الشحن' | 'بانتظار الاعتماد';
}

export const ProcurementsView: React.FC = () => {
  const { projects, addNotification } = useApp();
  const [statusTab, setStatusTab] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const [orders, setOrders] = useState<ProcurementOrder[]>([
    {
      id: 'po-1',
      poNumber: 'PO-2026-401',
      itemTitle: 'توريد حديد تسليح عالي المقاومة (قطر 16 و22 مم)',
      supplier: 'مجموعة عز الدخيلة للصلب',
      projectName: 'مبنى إداري جديد',
      category: 'إنشائي',
      quantity: '450 طن',
      cost: 19500000,
      deliveryDate: '2026-10-25',
      status: 'تم التوريد'
    },
    {
      id: 'po-2',
      poNumber: 'PO-2026-408',
      itemTitle: 'كابلات جهد متوسط ولوحات توزيع رئيسية ABB',
      supplier: 'السويدي إليكتريك للكابلات',
      projectName: 'محطة محولات الكهرباء الرئيسية',
      category: 'كهرباء',
      quantity: '12,000 متر طولي',
      cost: 28400000,
      deliveryDate: '2026-11-10',
      status: 'جاري الشحن'
    },
    {
      id: 'po-3',
      poNumber: 'PO-2026-412',
      itemTitle: 'طلمبات رفع مياه وكباسات هيدروليكية ألماني',
      supplier: 'شركة سيمنز للتوريدات الصناعية',
      projectName: 'محطة معالجة المياه',
      category: 'ميكانيكا',
      quantity: '8 وحدات متكاملة',
      cost: 34000000,
      deliveryDate: '2026-11-18',
      status: 'جاري الشحن'
    },
    {
      id: 'po-4',
      poNumber: 'PO-2026-419',
      itemTitle: 'خوادم وكبائن شبكات وأنظمة إطفاء غازي FM200',
      supplier: 'راية للنظم وتكنولوجيا المعلومات',
      projectName: 'مشروع مركز البيانات',
      category: 'تيار خفيف',
      quantity: '24 كابينة تقنية',
      cost: 41200000,
      deliveryDate: '2026-11-25',
      status: 'بانتظار الاعتماد'
    },
    {
      id: 'po-5',
      poNumber: 'PO-2026-422',
      itemTitle: 'رخام جرانيت وألواح أسقف معلقة مقاومة للحريق',
      supplier: 'شركة كليوباترا لمواد البناء والتشطيبات',
      projectName: 'تطوير المقر الرئيسي',
      category: 'تشطيبات',
      quantity: '6,500 متر مربع',
      cost: 11800000,
      deliveryDate: '2026-10-30',
      status: 'تم التوريد'
    }
  ]);

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newSupplier, setNewSupplier] = useState('');
  const [newProject, setNewProject] = useState(projects[0]?.name || 'محطة معالجة المياه');
  const [newQuantity, setNewQuantity] = useState('');
  const [newCost, setNewCost] = useState('');

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !newSupplier.trim() || !newCost) return;
    const order: ProcurementOrder = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-${Math.floor(430 + Math.random() * 70)}`,
      itemTitle: newItemTitle,
      supplier: newSupplier,
      projectName: newProject,
      category: 'إنشائي',
      quantity: newQuantity || 'دفعة متكاملة',
      cost: Number(newCost) * 1000000,
      deliveryDate: '2026-11-20',
      status: 'بانتظار الاعتماد'
    };
    setOrders([order, ...orders]);
    setIsAddModalOpen(false);
    setNewItemTitle('');
    setNewSupplier('');
    setNewQuantity('');
    setNewCost('');
    addNotification('إصدار أمر شراء جديد', `تم تسجيل أمر التوريد ${order.poNumber} بنجاح.`, 'success');
  };

  const updateOrderStatus = (id: string, nextStatus: ProcurementOrder['status']) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: nextStatus } : o)));
    const target = orders.find(o => o.id === id);
    if (target) {
      addNotification(
        'تحديث حالة التوريد',
        `تم تحديث حالة "${target.itemTitle}" إلى (${nextStatus}).`,
        nextStatus === 'تم التوريد' ? 'success' : 'info'
      );
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusTab === 'الكل' || o.status === statusTab;
    const matchesSearch =
      o.itemTitle.includes(searchQuery) ||
      o.supplier.includes(searchQuery) ||
      o.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.projectName.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const totalCost = orders.reduce((acc, o) => acc + o.cost, 0);

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2.5">
            <ShoppingCart className="w-6 h-6 text-blue-400" />
            <span>إدارة المشتريات والتوريدات الهندسية (Supply Chain)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            متابعة أوامر الشراء، الخامات الموردة للمواقع، الموردين المعتمدين، وحركة الشحنات.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>أمر شراء جديد (PO)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي أوامر الشراء</span>
          <span className="text-2xl font-black text-white">{orders.length} أوامر توريد</span>
          <span className="text-[11px] text-blue-400 font-semibold block mt-1">مرتبطة بالمشاريع النشطة</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">إجمالي قيمة التوريدات</span>
          <span className="text-2xl font-black text-white">{(totalCost / 1000000).toFixed(1)} مليون</span>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-1">جنيه مصري</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">شحنات تم استلامها بالموقع</span>
          <span className="text-2xl font-black text-emerald-400">
            {orders.filter(o => o.status === 'تم التوريد').length} شحنات
          </span>
          <span className="text-[11px] text-emerald-300 font-semibold block mt-1">مفحوصة ومطابقة للمواصفات</span>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-blue-500/30 shadow-lg">
          <span className="text-xs text-slate-400 font-bold block mb-1">شحنات قيد التوريد</span>
          <span className="text-2xl font-black text-amber-400">
            {orders.filter(o => o.status !== 'تم التوريد').length} طلبات
          </span>
          <span className="text-[11px] text-amber-300 font-semibold block mt-1">متابعة لوجستية يومية</span>
        </div>
      </div>

      {/* Interactive Status Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['الكل', 'تم التوريد', 'جاري الشحن', 'بانتظار الاعتماد'].map((tab) => (
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
                {tab === 'الكل' ? orders.length : orders.filter(o => o.status === tab).length}
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
            placeholder="بحث برقم PO، اسم الخامة، أو المورد..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Procurement Orders Table */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-4 px-4">رقم أمر الشراء</th>
                <th className="py-4 px-4">البند / المعدات الموردة</th>
                <th className="py-4 px-4">المشروع</th>
                <th className="py-4 px-4">الكمية</th>
                <th className="py-4 px-4">التكلفة</th>
                <th className="py-4 px-4">تاريخ التوريد</th>
                <th className="py-4 px-4">الحالة</th>
                <th className="py-4 px-4 text-center">تحديث الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-blue-400">{order.poNumber}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{order.itemTitle}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">المورد: {order.supplier}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-200">{order.projectName}</td>
                  <td className="py-4 px-4 text-slate-300 font-semibold">{order.quantity}</td>
                  <td className="py-4 px-4 font-extrabold text-emerald-400">
                    {(order.cost / 1000000).toFixed(2)} مليون ج.م
                  </td>
                  <td className="py-4 px-4 text-slate-400">{order.deliveryDate}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        order.status === 'تم التوريد'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : order.status === 'جاري الشحن'
                          ? 'bg-blue-950 text-blue-300 border-blue-800'
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {order.status === 'بانتظار الاعتماد' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'جاري الشحن')}
                        className="bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-xl font-bold transition-all"
                      >
                        اعتماد وشحن
                      </button>
                    )}
                    {order.status === 'جاري الشحن' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'تم التوريد')}
                        className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white px-3 py-1.5 rounded-xl font-bold transition-all"
                      >
                        تأكيد الاستلام بالموقع
                      </button>
                    )}
                    {order.status === 'تم التوريد' && (
                      <span className="text-emerald-400 font-bold text-[11px] flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> مكتمل
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Purchase Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-400" />
                <span>إصدار أمر شراء وتوريد جديد</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrder} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">بيان الخامات أو المعدات المطلوبة</label>
                <input
                  type="text"
                  required
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="مثال: توريد محولات كهربائية قدرة 2 ميجا فولت..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">الشركة الموردة</label>
                <input
                  type="text"
                  required
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  placeholder="مثال: شركة السويدي للتوريدات الهندسية"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">المشروع</label>
                  <select
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">الكمية</label>
                  <input
                    type="text"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="مثال: 100 طن"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">التكلفة (مليون ج.م)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    placeholder="مثال: 14.5"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
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
                  إصدار أمر الشراء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
