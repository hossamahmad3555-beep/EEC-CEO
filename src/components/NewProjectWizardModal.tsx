import React, { useState, useRef } from 'react';
import {
  X,
  Building2,
  Wallet,
  FileText,
  CheckCircle2,
  AlertCircle,
  Upload,
  Trash2,
  Calendar,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Sparkles,
  Hash,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { Project, ProjectDocument } from '../types';

const SITE_IMAGES = [
  {
    label: 'موقع إنشائي وأبراج',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7607?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'محطة معالجة وبنية تحتية',
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'مجمع إداري وتشطيبات',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    label: 'محطة طاقة وكهرباء',
    url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
  }
];

const LOCATION_PRESETS = [
  'العاصمة الإدارية الجديدة',
  'القاهرة الجديدة',
  'مدينة العلمين الجديدة',
  'المنطقة الاقتصادية - السويس',
  'مدينة 6 أكتوبر',
  'الإسكندرية'
];

const MANAGER_PRESETS = [
  'م. أحمد السيد',
  'م. خالد إبراهيم',
  'م. سامح عبد الله',
  'م. طارق محمود',
  'م. هاني فاروق'
];

const DOC_CATEGORIES: ProjectDocument['category'][] = [
  'عقد المشروع',
  'المخططات الهندسية',
  'جدول الكميات (BOQ)',
  'تراخيص الموقع',
  'أخرى'
];

export const NewProjectWizardModal: React.FC = () => {
  const { isNewProjectOpen, setIsNewProjectOpen, addProject, addNotification, darkMode } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [contractCode, setContractCode] = useState<string>(() => `CNT-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState<Project['category']>('إنشائي');
  const [location, setLocation] = useState<string>('العاصمة الإدارية الجديدة');
  const [description, setDescription] = useState<string>('');

  const [budget, setBudget] = useState<string>('120000000');
  const [spent, setSpent] = useState<string>('12000000');
  const [manager, setManager] = useState<string>('م. أحمد السيد');
  const [startDate, setStartDate] = useState<string>('2026-11-05');
  const [endDate, setEndDate] = useState<string>('2027-12-30');
  const [status, setStatus] = useState<Project['status']>('قيد التنفيذ');
  const [selectedImage, setSelectedImage] = useState<string>(SITE_IMAGES[0].url);

  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [selectedDocCategory, setSelectedDocCategory] = useState<ProjectDocument['category']>('عقد المشروع');

  // Validation Errors Map
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isNewProjectOpen) return null;

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!name.trim()) {
        newErrors.name = 'يرجى إدخال اسم المشروع الهندسي';
      } else if (name.trim().length < 5) {
        newErrors.name = 'يجب أن يتكون اسم المشروع من 5 أحرف على الأقل';
      }

      if (!contractCode.trim()) {
        newErrors.contractCode = 'يرجى إدخال الرقم المرجعي للعقد';
      } else if (!/^[A-Za-z0-9-_]+$/.test(contractCode.trim())) {
        newErrors.contractCode = 'كود العقد يجب أن يحتوي على أحرف وأرقام وشرطات فقط';
      }

      if (!location.trim() || location.trim().length < 3) {
        newErrors.location = 'يرجى تحديد الموقع الجغرافي للمشروع بدقة';
      }
    }

    if (step === 2) {
      const budgetNum = Number(budget);
      const spentNum = Number(spent);

      if (!budget || isNaN(budgetNum) || budgetNum < 500000) {
        newErrors.budget = 'يجب ألا تقل ميزانية المشروع عن 500,000 ج.م';
      }

      if (spent === '' || isNaN(spentNum) || spentNum < 0) {
        newErrors.spent = 'قيمة الدفعة المقدمة / المصروف غير صحيحة';
      } else if (!isNaN(budgetNum) && spentNum > budgetNum) {
        newErrors.spent = 'لا يمكن أن يتجاوز المصروف المبدئي إجمالي ميزانية المشروع';
      }

      if (!manager.trim() || manager.trim().length < 4) {
        newErrors.manager = 'يرجى تحديد اسم مدير المشروع المسؤول';
      }

      if (!startDate) {
        newErrors.startDate = 'يرجى تحديد تاريخ بدء المشروع';
      }

      if (!endDate) {
        newErrors.endDate = 'يرجى تحديد تاريخ التسليم المخطط';
      } else if (startDate && new Date(endDate).getTime() <= new Date(startDate).getTime()) {
        newErrors.endDate = 'تاريخ التسليم النهائي يجب أن يكون بعد تاريخ بدء المشروع';
      }
    }

    if (step === 3) {
      if (documents.length === 0) {
        newErrors.documents = 'يلزم إرفاق مستند ابتدائي واحد على الأقل (مثل عقد المشروع أو جدول الكميات BOQ) لاستكمال التأسيس';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  const processUploadedFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const maxBytes = 25 * 1024 * 1024; // 25MB
    const addedDocs: ProjectDocument[] = [];
    let fileError = '';

    Array.from(fileList).forEach((file) => {
      if (file.size > maxBytes) {
        fileError = `حجم الملف "${file.name}" يتجاوز الحد الأقصى المسموح به (25 ميجابايت)`;
        return;
      }

      const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
      addedDocs.push({
        id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: ext,
        category: selectedDocCategory,
        uploadedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      });
    });

    if (fileError) {
      setErrors(prev => ({ ...prev, documents: fileError }));
    } else if (addedDocs.length > 0) {
      setDocuments(prev => [...prev, ...addedDocs]);
      clearFieldError('documents');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTemplateDoc = (
    templateName: string,
    templateSize: string,
    templateType: string,
    docCategory: ProjectDocument['category']
  ) => {
    const newDoc: ProjectDocument = {
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: templateName,
      size: templateSize,
      type: templateType,
      category: docCategory,
      uploadedAt: 'الآن'
    };
    setDocuments(prev => [...prev, newDoc]);
    clearFieldError('documents');
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handleUpdateDocCategory = (id: string, newCat: ProjectDocument['category']) => {
    setDocuments(prev => prev.map(d => (d.id === id ? { ...d, category: newCat } : d)));
  };

  const resetAndClose = () => {
    setIsNewProjectOpen(false);
    setCurrentStep(1);
    setName('');
    setContractCode(`CNT-2026-${Math.floor(100 + Math.random() * 900)}`);
    setDescription('');
    setDocuments([]);
    setErrors({});
  };

  const handleFinalSubmit = () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return;

    const budgetNum = Number(budget);
    const spentNum = Number(spent);
    const initialProgress = budgetNum > 0 ? Math.min(25, Math.max(5, Math.round((spentNum / budgetNum) * 100))) : 5;

    addProject({
      name: name.trim(),
      contractCode: contractCode.trim(),
      description: description.trim() || `مشروع هندسي متكامل في قطاع ${category} بموقع ${location.trim()}.`,
      category,
      progress: initialProgress,
      initialDelivery: 0,
      finalDelivery: 0,
      status,
      budget: budgetNum,
      spent: spentNum,
      location: location.trim(),
      startDate,
      endDate,
      manager: manager.trim(),
      image: selectedImage,
      documents
    });

    addNotification(
      'تم تأسيس المشروع واعتماد مستنداته',
      `تم إدراج مشروع "${name.trim()}" (${contractCode.trim()}) مع ${documents.length} مستندات تأسيسية.`,
      'success'
    );

    resetAndClose();
  };

  const steps = [
    { id: 1, title: 'البيانات الأساسية', subtitle: 'الهوية والتصنيف', icon: Building2 },
    { id: 2, title: 'الميزانية والجدول', subtitle: 'التمويل والإدارة', icon: Wallet },
    { id: 3, title: 'المستندات الابتدائية', subtitle: 'العقود والمخططات', icon: FileText },
    { id: 4, title: 'المراجعة والاعتماد', subtitle: 'تأكيد الإدراج', icon: ShieldCheck }
  ];

  const durationMonths = (() => {
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24 * 30)));
  })();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        dir="rtl"
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all ${
          darkMode
            ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-black/80'
            : 'bg-white border-slate-200 text-slate-800 shadow-slate-900/20'
        }`}
      >
        {/* Wizard Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            darkMode
              ? 'bg-gradient-to-l from-blue-950/80 via-slate-900 to-slate-900 border-slate-800'
              : 'bg-gradient-to-l from-blue-50 via-white to-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-black text-base sm:text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  معالج تأسيس وإدراج مشروع هندسي جديد
                </h3>
                <span className="text-[11px] bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  خطوة {currentStep} من 4
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                إدخال البيانات التعاقدية، التحقق من الميزانية، وإرفاق الوثائق الهندسية الابتدائية
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className={`p-2 rounded-xl transition-colors ${
              darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Stepper Bar */}
        <div
          className={`px-6 py-3.5 border-b shrink-0 ${
            darkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (step.id < currentStep) {
                      setErrors({});
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={step.id > currentStep}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border text-right transition-all ${
                    isActive
                      ? 'bg-blue-600/15 border-blue-500/60 text-blue-400 shadow-sm'
                      : isCompleted
                      ? darkMode
                        ? 'bg-emerald-950/30 border-emerald-700/40 text-emerald-400 cursor-pointer hover:bg-emerald-950/50'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-pointer'
                      : darkMode
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-white border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : darkMode
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div className="hidden sm:block min-w-0">
                    <div
                      className={`text-xs font-extrabold truncate ${
                        isActive
                          ? darkMode
                            ? 'text-white'
                            : 'text-blue-900'
                          : isCompleted
                          ? 'text-emerald-400'
                          : ''
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[10px] opacity-75 truncate">{step.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: Basic Info & Scope */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1.5">
                    اسم المشروع الهندسي <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearFieldError('name');
                      }}
                      placeholder="مثال: محطة تحلية المياه المركزية - المرحلة الثانية"
                      className={`w-full rounded-xl pr-10 pl-4 py-2.5 text-xs border focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    كود العقد المرجعي <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      value={contractCode}
                      onChange={(e) => {
                        setContractCode(e.target.value);
                        clearFieldError('contractCode');
                      }}
                      placeholder="CNT-2026-105"
                      className={`w-full rounded-xl pr-10 pl-3 py-2.5 text-xs font-mono border focus:outline-none ${
                        errors.contractCode
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-blue-300 focus:border-blue-500'
                          : 'bg-slate-50 border-slate-300 text-blue-700 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.contractCode && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.contractCode}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Specialty Selection Cards */}
              <div>
                <label className="block text-xs font-bold mb-2">
                  القطاع والتخصص الهندسي <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(
                    [
                      { value: 'إنشائي', label: 'أعمال إنشائية' },
                      { value: 'تشطيبات', label: 'تشطيبات معمارية' },
                      { value: 'كهرباء / تيار خفيف', label: 'كهرباء باور' },
                      { value: 'تيار خفيف', label: 'أنظمة تيار خفيف' },
                      { value: 'ميكانيكا', label: 'أعمال ميكانيكا (MEP)' }
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setCategory(item.value)}
                      className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                        category === item.value
                          ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/20'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Geographic Location + Quick Chips */}
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  الموقع الجغرافي / المحافظة <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-blue-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      clearFieldError('location');
                    }}
                    placeholder="أدخل الموقع الجغرافي للمشروع..."
                    className={`w-full rounded-xl pr-10 pl-4 py-2.5 text-xs border focus:outline-none ${
                      errors.location
                        ? 'border-rose-500 bg-rose-950/20 text-white'
                        : darkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.location}</span>
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 ml-1">مواقع سريعة:</span>
                  {LOCATION_PRESETS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setLocation(loc);
                        clearFieldError('location');
                      }}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                        location === loc
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Scope Description */}
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  ملخص النطاق الهندسي للأعمال (اختياري)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف مختصر لنطاق الأعمال، القدرة الاستيعابية، أو المخرجات الهندسية المستهدفة..."
                  className={`w-full rounded-xl p-3 text-xs border focus:outline-none resize-none ${
                    darkMode
                      ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Budget, Timeline & Management */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    إجمالي الميزانية المعتمدة (ج.م) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="500000"
                    step="500000"
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      clearFieldError('budget');
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-xs border focus:outline-none ${
                      errors.budget
                        ? 'border-rose-500 bg-rose-950/20 text-white'
                        : darkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-blue-400 font-bold">
                      يعادل: {(Number(budget || 0) / 1000000).toLocaleString()} مليون ج.م
                    </span>
                  </div>
                  {errors.budget && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.budget}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    الدفعة المقدمة / المصروف الفعلي المبدئي (ج.م) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100000"
                    value={spent}
                    onChange={(e) => {
                      setSpent(e.target.value);
                      clearFieldError('spent');
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-xs border focus:outline-none ${
                      errors.spent
                        ? 'border-rose-500 bg-rose-950/20 text-white'
                        : darkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-emerald-400 font-bold">
                      نسبة الصرف المبدئي:{' '}
                      {Number(budget) > 0 ? Math.round((Number(spent || 0) / Number(budget)) * 100) : 0}%
                    </span>
                  </div>
                  {errors.spent && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.spent}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Project Manager & Initial Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    مدير المشروع المسؤول <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-blue-400 absolute right-3.5 top-3" />
                    <input
                      type="text"
                      value={manager}
                      onChange={(e) => {
                        setManager(e.target.value);
                        clearFieldError('manager');
                      }}
                      placeholder="مثال: م. أحمد السيد"
                      className={`w-full rounded-xl pr-10 pl-4 py-2.5 text-xs border focus:outline-none ${
                        errors.manager
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.manager && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.manager}</span>
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {MANAGER_PRESETS.map((mgr) => (
                      <button
                        key={mgr}
                        type="button"
                        onClick={() => {
                          setManager(mgr);
                          clearFieldError('manager');
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded-md border ${
                          manager === mgr
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                            : darkMode
                            ? 'bg-slate-950 border-slate-800 text-slate-400'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        {mgr}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">حالة التشغيل الابتدائية</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Project['status'])}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-xs border focus:outline-none ${
                      darkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  >
                    <option value="قيد التنفيذ">قيد التنفيذ (نشط)</option>
                    <option value="مؤجلة">مؤجلة (مرحلة تحضيرية)</option>
                    <option value="معرضة للمخاطر">معرضة للمخاطر (يتطلب متابعة خاصة)</option>
                  </select>
                </div>
              </div>

              {/* Start & End Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    تاريخ استلام الموقع وبدء التنفيذ <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        clearFieldError('startDate');
                        clearFieldError('endDate');
                      }}
                      className={`w-full rounded-xl pr-10 pl-4 py-2.5 text-xs border focus:outline-none ${
                        errors.startDate
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.startDate && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.startDate}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">
                    تاريخ التسليم الابتدائي المخطط <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        clearFieldError('endDate');
                      }}
                      className={`w-full rounded-xl pr-10 pl-4 py-2.5 text-xs border focus:outline-none ${
                        errors.endDate
                          ? 'border-rose-500 bg-rose-950/20 text-white'
                          : darkMode
                          ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-blue-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.endDate && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.endDate}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Site Cover Image Selector */}
              <div>
                <label className="block text-xs font-bold mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>صورة الموقع التعريفية</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SITE_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setSelectedImage(img.url)}
                      className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all group ${
                        selectedImage === img.url
                          ? 'border-blue-500 ring-2 ring-blue-500/40'
                          : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-white truncate">{img.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Initial Documentation Upload */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {/* Document Category Selector & Quick Standard Templates */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">
                    تصنيف المستند المراد رفعه:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DOC_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedDocCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          selectedDocCategory === cat
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Attach Standard Engineering Docs */}
                <div className="shrink-0">
                  <span className="block text-[10px] text-slate-400 mb-1">إرفاق سريع من النماذج القياسية:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleAddTemplateDoc(
                          `عقد_تأسيس_${contractCode}.pdf`,
                          '2.4 MB',
                          'PDF',
                          'عقد المشروع'
                        )
                      }
                      className="text-[10px] bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 border border-blue-500/30 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      <span>عقد المشروع (PDF)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddTemplateDoc(
                          `جدول_كميات_BOQ_${contractCode}.xlsx`,
                          '1.8 MB',
                          'XLSX',
                          'جدول الكميات (BOQ)'
                        )
                      }
                      className="text-[10px] bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      <span>مقايسة BOQ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drag and Drop Upload Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  processUploadedFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-blue-400 bg-blue-950/30'
                    : errors.documents
                    ? 'border-rose-500/70 bg-rose-950/10 hover:border-rose-400'
                    : darkMode
                    ? 'border-slate-700 hover:border-blue-500/60 bg-slate-950/40 hover:bg-slate-950/70'
                    : 'border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => processUploadedFiles(e.target.files)}
                />
                <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  اسحب وأفلت ملفات المشروع هنا أو انقر لاختيار الملفات من جهازك
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  يدعم المخططات الهندسية (DWG, PDF)، جداول الكميات (XLSX)، العقود (DOCX, PDF) بحد أقصى 25MB للملف
                </p>
              </div>

              {errors.documents && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errors.documents}</span>
                </div>
              )}

              {/* Uploaded Files List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-blue-400" />
                    <span>المستندات المرفقة ({documents.length})</span>
                  </h5>
                  {documents.length > 0 && (
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      جاهزة للأرشفة السحابية
                    </span>
                  )}
                </div>

                {documents.length === 0 ? (
                  <div className="text-center py-6 rounded-xl border border-slate-800/80 bg-slate-950/30 text-slate-500 text-xs">
                    لم يتم إرفاق أي مستندات بعد. يمكنك رفع ملف من جهازك أو استخدام أزرار الإرفاق السريع أعلاه.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20 shrink-0">
                            {doc.type === 'XLSX' || doc.type === 'XLS' ? (
                              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                            ) : doc.type === 'DWG' ? (
                              <FileCode className="w-4 h-4 text-amber-400" />
                            ) : (
                              <FileText className="w-4 h-4 text-blue-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{doc.name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span className="font-mono text-blue-400">{doc.type}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.uploadedAt}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={doc.category}
                            onChange={(e) =>
                              handleUpdateDocCategory(doc.id, e.target.value as ProjectDocument['category'])
                            }
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[10px] font-bold text-blue-300 focus:outline-none"
                          >
                            {DOC_CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => handleRemoveDocument(doc.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                            title="إزالة المستند"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Final Review & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-l from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedImage}
                    alt={name}
                    className="w-16 h-16 rounded-2xl object-cover border border-blue-400/40 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/30">
                        {contractCode}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-800">
                        {category}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mt-1">{name}</h4>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{location}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-bold underline shrink-0"
                >
                  تعديل البيانات
                </button>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">إجمالي الميزانية</span>
                  <span className="text-sm font-black text-white mt-1 block">
                    {(Number(budget) / 1000000).toLocaleString()} مليون ج.م
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">الدفعة المقدمة</span>
                  <span className="text-sm font-black text-emerald-400 mt-1 block">
                    {(Number(spent) / 1000000).toLocaleString()} مليون ج.م
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">مدير المشروع</span>
                  <span className="text-xs font-bold text-blue-300 mt-1 block truncate">{manager}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">المدة الزمنية المخططة</span>
                  <span className="text-xs font-bold text-amber-300 mt-1 block">{durationMonths} شهر</span>
                </div>
              </div>

              {/* Attached Documents Summary */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>المستندات التأسيسية المرفقة ({documents.length})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-bold"
                  >
                    إدارة المرفقات
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {documents.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-slate-200 font-semibold">{d.name}</span>
                      <span className="text-[10px] bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded">
                        {d.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Navigation */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between shrink-0 ${
            darkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
                <span>الخطوة السابقة</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                إلغاء
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
              >
                <span>حفظ ومتابعة</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>اعتماد وإدراج المشروع الآن</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
