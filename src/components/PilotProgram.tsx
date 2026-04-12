import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export function PilotProgram() {
  return (
    <section id="pilot" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/90 text-primary-foreground rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Rocket className="w-4 h-4" />
              <span>البرامج التجريبية</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6">ساهم في تشكيل مستقبل التعليم المساند</h2>
            <p className="text-lg opacity-90 mb-10 leading-relaxed">
              نفتح المجال حالياً للمدارس والمراكز المتخصصة للانضمام إلى برامجنا التجريبية. كونوا من الأوائل الذين يختبرون حلولنا ويساهمون في تطويرها لتناسب احتياجات طلابهم.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-lg font-bold">قدم طلب الانضمام</Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-bold border-white text-white hover:bg-white/10">استفسر عن البرنامج</Button>
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
