
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const logoImage = PlaceHolderImages.find(img => img.id === 'main-logo');

  if (!logoImage) {
    return <div className="w-12 h-12 bg-primary/10 rounded-full animate-pulse" />;
  }

  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <div className="relative w-24 h-16 md:w-32 md:h-20 transition-transform hover:scale-105 duration-300">
        <Image
          src={logoImage.imageUrl}
          alt="ذوي - تقنيات مساندة"
          fill
          className="object-contain"
          priority
          data-ai-hint={logoImage.imageHint}
        />
      </div>
    </div>
  );
}
