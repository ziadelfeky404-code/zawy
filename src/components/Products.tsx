import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '@/types/supabase';

interface ProductsProps {
  products?: Product[];
}

const defaultProducts: Product[] = [
  {
    id: '1',
    title: 'ذوي Read',
    slug: 'zowi-read',
    short_description: 'جهاز تعليمي تفاعلي يعتمد على لغة برايل وتقنية RFID لتعليم القراءة للأطفال المكفوفين.',
    description: 'جهاز تعليمي تفاعلي يعتمد على لغة برايل وتقنية RFID لتعليم القراءة للأطفال المكفوفين.',
    image_url: null,
    icon_name: null,
    details: ['تعلم باللمس والصوت', 'قراءة برايل في المراحل المبكرة', 'مناسب للمنازل والمدارس والمراكز'],
    note: null,
    status: 'prototype',
    cta_text: 'اكتشف المزيد',
    cta_link: '#products',
    display_order: 1,
    is_published: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'ذوي Write',
    slug: 'zowi-write',
    short_description: 'لوحة تدريب على كتابة برايل تساعد الأطفال على إتقان مهارات الكتابة بدقة وسرعة.',
    description: 'لوحة تدريب على كتابة برايل تساعد الأطفال على إتقان مهارات الكتابة بدقة وسرعة.',
    image_url: null,
    icon_name: null,
    details: ['تدريب مكثف على الكتابة', 'دقة وسرعة عالية', 'أداة اقتصادية وسهلة الوصول'],
    note: null,
    status: 'prototype',
    cta_text: 'اكتشف المزيد',
    cta_link: '#products',
    display_order: 2,
    is_published: true,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    title: 'ذوي Assess',
    slug: 'zowi-assess',
    short_description: 'أداة مساندة للأخصائيين تستخدم الأنشطة التفاعلية وتحليل الذكاء الاصطناعي لإجراء تقييمات أولية.',
    description: 'أداة مساندة للأخصائيين تستخدم الأنشطة التفاعلية وتحليل الذكاء الاصطناعي لإجراء تقييمات أولية.',
    image_url: null,
    icon_name: null,
    details: ['دعم الأخصائي بالذكاء الاصطناعي', 'تقييمات أولية فعالة', 'تقارير تحليلية دقيقة'],
    note: 'ملاحظة: الذكاء الاصطناعي يساند الأخصائي ولا يشخص بشكل مستقل.',
    status: 'pilot',
    cta_text: 'اكتشف المزيد',
    cta_link: '#products',
    display_order: 3,
    is_published: true,
    created_at: '',
    updated_at: '',
  },
];

const statusLabels: Record<string, string> = {
  concept: 'مفهوم',
  prototype: 'نموذج أولي',
  pilot: 'تجريبي',
  coming_soon: 'قريباً',
  published: 'منشور',
};

export function Products(props: ProductsProps) {
  const products = (props.products && props.products.length > 0) ? props.products : defaultProducts;

  return (
    <section id="products" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">حلولنا الابتكارية</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أدوات مصممة بعناية لتلبية احتياجات الأطفال والأخصائيين والمؤسسات التعليمية.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow flex flex-col group">
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/20">{product.title}</span>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-primary">{product.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {statusLabels[product.status] || product.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.short_description || product.description}
                </p>
                {product.details && Array.isArray(product.details) && (
                  <ul className="space-y-3 mb-8">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
                {product.note && (
                  <p className="text-xs text-muted-foreground italic mb-6">
                    {product.note}
                  </p>
                )}
                <div className="mt-auto">
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-primary hover:text-primary/80 flex items-center gap-2 font-semibold">
                    {product.cta_text || 'اكتشف المزيد'}
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}