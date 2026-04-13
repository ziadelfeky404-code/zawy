
'use client';

import { cn } from "@/lib/utils";
import logoSvg from '@/app/logo.svg';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="w-28 h-16 md:w-36 md:h-20 lg:w-44 lg:h-24 transition-transform hover:scale-105 duration-300">
        <object
          data={logoSvg.src}
          type="image/svg+xml"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
