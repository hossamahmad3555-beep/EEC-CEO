import { Project } from '../types';

export const exportProjectsToCSV = (projects: Project[], filename = 'projects_report.csv') => {
  const headers = ['اسم المشروع', 'التخصص', 'نسبة التنفيذ (%)', 'التسليم الابتدائي (%)', 'التسليم النهائي (%)', 'الحالة', 'الميزانية (ج.م)', 'المصروف (ج.م)', 'الموقع', 'مدير المشروع'];
  
  const rows = projects.map(p => [
    `"${p.name}"`,
    `"${p.category}"`,
    p.progress,
    p.initialDelivery,
    p.finalDelivery,
    `"${p.status}"`,
    p.budget,
    p.spent,
    `"${p.location}"`,
    `"${p.manager}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportBudgetToCSV = (projects: Project[], filename = 'budget_financial_report.csv') => {
  const headers = ['اسم المشروع', 'التخصص', 'الميزانية المعتمدة (ج.م)', 'المصروف الفعلي (ج.م)', 'السيولة المتبقية (ج.م)', 'نسبة الصرف (%)'];
  
  const rows = projects.map(p => {
    const remaining = p.budget - p.spent;
    const ratio = Math.round((p.spent / p.budget) * 100);
    return [
      `"${p.name}"`,
      `"${p.category}"`,
      p.budget,
      p.spent,
      remaining,
      `${ratio}%`
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
