import type { VisionMission } from '@/types/supabase';

interface VisionProps {
  items?: VisionMission[];
}

const defaultVision: VisionMission = {
  id: '1',
  type: 'vision',
  title: 'رؤيتنا',
  content: '"أن نصبح الشركة العربية الرائدة في مجال التقنيات المساندة لتحقيق الدمج التعليمي والتعلم الميسر للجميع."',
  display_order: 1,
  is_published: true,
  created_at: '',
  updated_at: '',
};

export function Vision(props: VisionProps) {
  const visionItem = (props.items && props.items.length > 0) 
    ? props.items.find(item => item.type === 'vision') || props.items[0]
    : defaultVision;

  return (
    <section id="vision" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-primary font-bold mb-6 tracking-wide uppercase">{visionItem.title}</h2>
        <p className="text-4xl md:text-5xl font-bold font-headline leading-tight text-foreground">
          {visionItem.content}
        </p>
      </div>
    </section>
  );
}