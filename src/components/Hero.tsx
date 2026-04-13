'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

const defaultTitle = 'تقنيات تعليمية ومساندة لذوي الاحتياجات الخاصة';
const defaultSubtitle = 'نبني أدوات ذكية ومبتكرة تساعد على القراءة والكتابة والتقييم بدقة أكبر، لتمكين كل طفل من الوصول إلى كامل إمكاناته التعليمية.';
const defaultCtaPrimary = 'تعرّف على حلولنا';
const defaultCtaSecondary = 'تواصل معنا';

export function Hero(props: HeroProps) {
  const title = props.title || defaultTitle;
  const subtitle = props.subtitle || defaultSubtitle;
  const ctaPrimary = props.ctaPrimary || defaultCtaPrimary;
  const ctaSecondary = props.ctaSecondary || defaultCtaSecondary;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-foreground leading-tight mb-6">
              {title.split('لذوي الاحتياجات الخاصة').map((part, i) => (
                i === 0 ? (
                  <span key={i}>{part}</span>
                ) : (
                  <span key={i} className="text-primary">لذوي الاحتياجات الخاصة</span>
                )
              ))}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">{ctaPrimary}</Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-primary text-primary hover:bg-primary/5">{ctaSecondary}</Button>
            </div>
          </div>
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/800x600/1a1a2e/ffffff?text=ذوي+-+ assistive+technology"
                alt="ذوي - تقنيات مساندة"
                fill
                className="object-cover"
                priority
                data-ai-hint="hero education technology"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
            {/* Subtle decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}