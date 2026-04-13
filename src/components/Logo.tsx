
'use client';

import { cn } from "@/lib/utils";
import logoSvg from '@/app/logo.svg';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="w-20 h-12 md:w-28 md:h-16 lg:w-36 lg:h-20 transition-transform hover:scale-105 duration-300">
        <object
          data={logoSvg.src}
          type="image/svg+xml"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
