export interface ProjectDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  category: 'عقد المشروع' | 'المخططات الهندسية' | 'جدول الكميات (BOQ)' | 'تراخيص الموقع' | 'أخرى';
  uploadedAt: string;
}

export interface Project {
  id: string;
  name: string;
  contractCode?: string;
  description?: string;
  category: 'إنشائي' | 'تشطيبات' | 'كهرباء / تيار خفيف' | 'ميكانيكا' | 'تيار خفيف';
  progress: number;
  initialDelivery: number;
  finalDelivery: number;
  status: 'مكتملة' | 'قيد التنفيذ' | 'مؤجلة' | 'معرضة للمخاطر';
  budget: number;
  spent: number;
  location: string;
  startDate: string;
  endDate: string;
  manager: string;
  image: string;
  documents?: ProjectDocument[];
}

export interface ApprovalItem {
  id: string;
  title: string;
  code: string;
  amount: string;
  category: string;
  date: string;
  status: 'معلق' | 'معتمد' | 'مرفوض';
  urgency: 'عاجل' | 'عادي';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'danger';
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}
