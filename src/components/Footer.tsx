
'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="bg-white border-t pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="mb-4 block">
              <Logo className="items-start -mr-6" />
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mt-4">
              شركة تقنية ناشئة متخصصة في تطوير الأدوات التعليمية المساندة باللغة العربية، نجمع بين الابتكار والشمولية لتمكين الجميع.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground">روابط سريعة</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">عن ذوي</Link></li>
              <li><Link href="#products" className="text-muted-foreground hover:text-primary transition-colors">منتجاتنا</Link></li>
              <li><Link href="#pilot" className="text-muted-foreground hover:text-primary transition-colors">البرامج التجريبية</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground">تابعنا</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} شركة ذوي للتقنيات المساندة. جميع الحقوق محفوظة.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-primary">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
