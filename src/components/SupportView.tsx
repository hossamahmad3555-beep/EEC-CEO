import React, { useState } from 'react';
import { Headphones, Send, CheckCircle2 } from 'lucide-react';

export const SupportView: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
    }, 4000);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-[1000px] mx-auto">
      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
          <Headphones className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-white">الدعم الفني والتقني لنظام المتابعة التنفيذية</h2>
        <p className="text-xs text-slate-400 mt-1">فريق الدعم الفني متواجد على مدار الساعة لمساعدتكم في أي استفسار تقني أو هندسي.</p>
      </div>

      <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        {sent ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-bold text-white text-lg">تم إرسال رسالتك بنجاح</h3>
            <p className="text-xs text-slate-400">سيتواصل معك فريق الدعم الفني خلال دقائق.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">رسالتك أو استفسارك الفني</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل الاستفسار التقني أو الهندسي هنا..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الطلب إلى الدعم الفني</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
