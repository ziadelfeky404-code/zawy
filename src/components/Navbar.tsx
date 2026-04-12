
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center -mr-2">
              <Logo />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              <Link href="#about" className="text-sm font-semibold hover:text-primary transition-colors">عن الشركة</Link>
              <Link href="#products" className="text-sm font-semibold hover:text-primary transition-colors">حلولنا</Link>
              <Link href="#pilot" className="text-sm font-semibold hover:text-primary transition-colors">البرامج التجريبية</Link>
              <Link href="#vision" className="text-sm font-semibold hover:text-primary transition-colors">رؤيتنا</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#contact">
              <Button variant="default" className="rounded-full px-6 py-2 text-sm font-bold shadow-md hover:shadow-primary/20 transition-all">تواصل معنا</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
