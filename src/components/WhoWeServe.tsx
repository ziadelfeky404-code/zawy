import type { WhoWeServeItem } from '@/types/supabase';
import { Users, School, Home, Stethoscope, UserCheck } from 'lucide-react';

interface WhoWeServeProps {
  items?: WhoWeServeItem[];
}

const defaultItems: WhoWeServeItem[] = [
  { id: '1', title: 'الأطفال', description: 'الأطفال ذوو الاحتياجات التعليمية الخاصة', icon_name: 'users', display_order: 1, is_published: true, created_at: '', updated_at: '' },
  { id: '2', title: 'العائلات', description: 'أسر الأطفال الذين يحتاجون دعماً تعليمياً', icon_name: 'home', display_order: 2, is_published: true, created_at: '', updated_at: '' },
  { id: '3', title: 'المدارس', description: 'المدارس العامة والخاصة', icon_name: 'school', display_order: 3, is_published: true, created_at: '', updated_at: '' },
  { id: '4', title: 'مراكز التربية الخاصة', description: 'مراكز التأهيل والتدريب المتخصصة', icon_name: 'stethoscope', display_order: 4, is_published: true, created_at: '', updated_at: '' },
  { id: '5', title: 'الأخصائيين النفسيين', description: 'الأخصائيين والتربويين المتخصصين', icon_name: 'user-check', display_order: 5, is_published: true, created_at: '', updated_at: '' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  home: Home,
  school: School,
  stethoscope: Stethoscope,
  'user-check': UserCheck,
};

export function WhoWeServe(props: WhoWeServeProps) {
  const items = (props.items && props.items.length > 0) ? props.items : defaultItems;

  return (
    <section className="py-20 bg-background/50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-12">لمن نصنع حلولنا؟</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {items.map((item) => {
            const IconComponent = item.icon_name ? iconMap[item.icon_name] : Users;
            return (
              <div key={item.id} className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-10 h-10" />
                </div>
                <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}