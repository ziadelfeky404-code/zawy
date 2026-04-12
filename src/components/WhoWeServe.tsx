import { Users, School, Home, Stethoscope, UserCheck } from 'lucide-react';

const targets = [
  { name: 'الأطفال', icon: Users },
  { name: 'العائلات', icon: Home },
  { name: 'المدارس', icon: School },
  { name: 'مراكز التربية الخاصة', icon: Stethoscope },
  { name: 'الأخصائيين النفسيين', icon: UserCheck }
];

export function WhoWeServe() {
  return (
    <section className="py-20 bg-background/50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-12">لمن نصنع حلولنا؟</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {targets.map((target, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4 group">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <target.icon className="w-10 h-10" />
              </div>
              <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">{target.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
