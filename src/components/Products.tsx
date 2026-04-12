import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft } from 'lucide-react';

const products = [
  {
    id: 'braille-learning',
    title: 'ذوي Read',
    description: 'جهاز تعليمي تفاعلي يعتمد على لغة برايل وتقنية RFID لتعليم القراءة للأطفال المكفوفين.',
    details: [
      'تعلم باللمس والصوت',
      'قراءة برايل في المراحل المبكرة',
      'مناسب للمنازل والمدارس والمراكز'
    ],
    image: 'braille-learning'
  },
  {
    id: 'writing-device',
    title: 'ذوي Write',
    description: 'لوحة تدريب على كتابة برايل تساعد الأطفال على إتقان مهارات الكتابة بدقة وسرعة.',
    details: [
      'تدريب مكثف على الكتابة',
      'دقة وسرعة عالية',
      'أداة اقتصادية وسهلة الوصول'
    ],
    image: 'writing-device'
  },
  {
    id: 'assessment-tool',
    title: 'ذوي Assess',
    description: 'أداة مساندة للأخصائيين تستخدم الأنشطة التفاعلية وتحليل الذكاء الاصطناعي لإجراء تقييمات أولية.',
    details: [
      'دعم الأخصائي بالذكاء الاصطناعي',
      'تقييمات أولية فعالة',
      'تقارير تحليلية دقيقة'
    ],
    note: 'ملاحظة: الذكاء الاصطناعي يساند الأخصائي ولا يشخص بشكل مستقل.',
    image: 'assessment-tool'
  }
];

export function Products() {
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
          {products.map((product) => {
            const imageData = PlaceHolderImages.find(img => img.id === product.image);
            return (
              <Card key={product.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  {imageData && (
                    <Image
                      src={imageData.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={imageData.imageHint}
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  {product.note && (
                    <p className="text-xs text-muted-foreground italic mb-6">
                      {product.note}
                    </p>
                  )}
                  <div className="mt-auto">
                    <Button variant="ghost" className="p-0 hover:bg-transparent text-primary hover:text-primary/80 flex items-center gap-2 font-semibold">
                      اكتشف المزيد
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
