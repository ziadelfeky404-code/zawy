'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Rocket, Loader2 } from 'lucide-react';

interface PilotProgramData {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_text: string | null;
  cta_link: string | null;
}

export function PilotProgram({ data }: { data?: PilotProgramData | null }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    organization_name: '',
    contact_person: '',
    email: '',
    phone: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'حدث خطأ');
      }

      setSuccess(result.message);
      setShowForm(false);
      setFormData({ organization_name: '', contact_person: '', email: '', phone: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const title = data?.title || 'البرامج التجريبية';
  const subtitle = data?.subtitle || 'ساهم في تشكيل مستقبل التعليم المساند';
  const description = data?.description || 'نفتح المجال حالياً للمدارس والمراكز المتخصصة للانضمام إلى برامجنا التجريبية. كونوا من الأوائل الذين يختبرون حلولنا ويساهمون في تطويرها لتناسب احتياجات طلابهم.';
  const ctaText = data?.cta_text || 'قدم طلب الانضمام';

  if (showForm) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-primary/90 text-primary-foreground rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 left-4 text-white/70 hover:text-white"
              >
                ← zurück
              </button>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">طلب الانضمام للبرنامج التجريبي</h2>
                
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg opacity-90">{success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-200 bg-red-500/30 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">اسم المؤسسة</label>
                      <Input 
                        placeholder="اسم المدرسة أو المركز"
                        value={formData.organization_name}
                        onChange={(e) => setFormData({...formData, organization_name: e.target.value})}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">جهة الاتصال</label>
                      <Input 
                        placeholder="الاسم"
                        value={formData.contact_person}
                        onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">البريد الإلكتروني</label>
                        <Input 
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">رقم الهاتف</label>
                        <Input 
                          placeholder="+966..."
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">وصف المؤسسة、需要</label>
                      <Textarea 
                        placeholder="اشرح Briefly عن المؤسسة واحتياجاتك"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      variant="secondary" 
                      className="rounded-full px-8 py-6 text-lg font-bold"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin ml-2" /> : null}
                      {loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pilot" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/90 text-primary-foreground rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Rocket className="w-4 h-4" />
              <span>{title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6">{subtitle}</h2>
            <p className="text-lg opacity-90 mb-10 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-8 py-6 text-lg font-bold"
                onClick={() => setShowForm(true)}
              >
                {ctaText}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-lg font-bold border-white text-white hover:bg-white/10"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                استفسر عن البرنامج
              </Button>
            </div>
          </div>
          {/* Abstract patterns */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}