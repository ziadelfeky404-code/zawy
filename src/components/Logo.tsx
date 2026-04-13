
'use client';

import Image from 'next/image';
import { cn } from "@/lib/utils";
import logoSvg from '@/app/logo.svg';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <div className="relative w-24 h-16 md:w-32 md:h-20 transition-transform hover:scale-105 duration-300">
        <Image
          src={logoSvg}
          alt="ذوي - تقنيات مساندة"
          fill
          className="object-contain"
          priority
          data-ai-hint="logo company"
        />
      </div>
    </div>
  );
}
