import { CheckCircle2, Globe, ShieldCheck, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    title: 'نقص الأدوات العربية',
    description: 'نعالج الفجوة الكبيرة في توفر الأدوات المساندة المصممة خصيصاً للغة العربية.',
    icon: Globe
  },
  {
    title: 'تكلفة اقتصادية',
    description: 'نوفر بدائل محلية عالية الجودة بتكلفة أقل بكثير من المنتجات المستوردة.',
    icon: ShieldCheck
  },
  {
    title: 'دعم تعليمي متكامل',
    description: 'حلولنا تغطي جوانب القراءة والكتابة والتقييم في حزمة تقنية واحدة.',
    icon: HeartHandshake
  },
  {
    title: 'سهولة الاستخدام',
    description: 'تصاميمنا تركز على المستخدم النهائي لتكون سهلة الاستخدام في البيت والمدرسة.',
    icon: CheckCircle2
  }
];

export function WhyUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8">لماذا نبتكر في "ذوي"؟</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              هناك حاجة ملحة في منطقتنا لحلول تقنية مساندة تواكب التطور العالمي ولكن بلمسة محلية ووعي كامل بمتطلبات اللغة والثقافة العربية.
            </p>
            <div className="space-y-4">
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-foreground/90">حلول عملية للمدارس والمراكز المتخصصة.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-foreground/90">دعم متواصل للعائلات لتسهيل عملية التعلم المنزلي.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span className="text-foreground/90">تكامل مع الخبراء لضمان دقة التقييمات وتطور الأطفال.</span>
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
                <reason.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
