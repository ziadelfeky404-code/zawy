import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactForm() {
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
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">البريد الإلكتروني</h4>
                  <p className="text-muted-foreground">hello@thawi.tech</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">رقم الهاتف</h4>
                  <p className="text-muted-foreground">+966 12 345 6789</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">الموقع</h4>
                  <p className="text-muted-foreground">المملكة العربية السعودية، الرياض</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold mr-1">الاسم الكامل</label>
                  <Input placeholder="أدخل اسمك" className="rounded-xl border-border/60 bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold mr-1">البريد الإلكتروني</label>
                  <Input type="email" placeholder="example@mail.com" className="rounded-xl border-border/60 bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold mr-1">نوع الاستفسار</label>
                <select className="flex h-10 w-full rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option>طلب انضمام لبرنامج تجريبي</option>
                  <option>فرص استثمارية</option>
                  <option>استفسار عن منتج</option>
                  <option>أخرى</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold mr-1">رسالتك</label>
                <Textarea placeholder="كيف يمكننا مساعدتك؟" className="min-h-[150px] rounded-xl border-border/60 bg-background/50" />
              </div>
              <Button className="w-full rounded-xl py-6 text-lg font-bold">إرسال الرسالة</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
