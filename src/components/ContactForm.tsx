'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface ContactInfo {
  type: string;
  value: string;
  label: string | null;
}

export function ContactForm({ contactInfo = [] }: { contactInfo?: ContactInfo[] }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    inquiry_type: 'request',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const getContactValue = (type: string) => {
    const item = contactInfo.find(c => c.type === type);
    return item?.value || '';
  };

  const email = getContactValue('email');
  const phone = getContactValue('phone');
  const address = getContactValue('address');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ');
      }

      setSuccess(data.message);
      setFormData({ full_name: '', email: '', inquiry_type: 'request', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">لنتواصل معاً</h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              سواء كنت شريكاً محتملاً، مستثمراً، أو عائلة مهتمة بمنتجاتنا، يسعدنا سماع صوتك والإجابة على استفساراتك.
            </p>
            
            <div className="space-y-8">
              {email && (
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground">{email}</p>
                  </div>
                </div>
              )}
              
              {phone && (
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">رقم الهاتف</h4>
                    <p className="text-muted-foreground">{phone}</p>
                  </div>
                </div>
              )}
              
              {address && (
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">الموقع</h4>
                    <p className="text-muted-foreground">{address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">تم الإرسال بنجاح</h3>
                <p className="text-muted-foreground">{success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold mr-1">الاسم الكامل</label>
                    <Input 
                      placeholder="أدخل اسمك" 
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      required
                      className="rounded-xl border-border/60 bg-background/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold mr-1">البريد الإلكتروني</label>
                    <Input 
                      type="email" 
                      placeholder="example@mail.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="rounded-xl border-border/60 bg-background/50" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold mr-1">نوع الاستفسار</label>
                  <select 
                    className="flex h-10 w-full rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.inquiry_type}
                    onChange={(e) => setFormData({...formData, inquiry_type: e.target.value})}
                  >
                    <option value="request">طلب انضمام لبرنامج تجريبي</option>
                    <option value="investment">فرص استثمارية</option>
                    <option value="product">استفسار عن منتج</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold mr-1">رسالتك</label>
                  <Textarea 
                    placeholder="كيف يمكننا مساعدتك؟" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="min-h-[150px] rounded-xl border-border/60 bg-background/50" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-xl py-6 text-lg font-bold"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin ml-2" /> : null}
                  {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}