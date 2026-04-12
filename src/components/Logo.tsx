
'use client';

import Image from 'next/image';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const LOGO_URL = "https://lh3.googleusercontent.com/rd-gg/AMW1TPqGPj-Q8EPK4KWnPilKPBHL26hV3cb6GacWaK2Wl2kjObWX2BV_bX_vU5GrnqOaTi_nR2C1TimO-tlfXEzCtlJpk6kNtP0JPsoI23K1Fk1FpSLxNCR8ILp7NitCveNPwqF2TLPALdKkwiMUB4G503ygjMucIoQkBLnTNXTmLiH7hAbuSHC1TgHLDWV5-bmx4rlZbOarugYpCeMJUta9O4kywNO8UnfoupZfFmCaVv-wvtiD4smyWIkcJniV0uTb6lOdFxlsxGZIPxIw0RsH0F9zauRwfYq-sYaPX1UVG0LeBvjYe45s4872FZz67AM8bSmeb8YfJnUBIWMjVptLQ7RxE6oFvbeuk4TPfcjWWFe7GgA3FJK_8W0sDyC9qNoQaVR0shIgAAdFtdy3C9Y6YoexwuHQ1o0SMEXuTz8rCCQ8MghdtJN5f6h4reIG7z3PhJ4b0_8fKmcDYa2-kj0AtRRfA4NjO3up_MWr3D1R7Jer1lxLPqRfZSXBoLE6dlbZHhpPrQd-TvqEXOPA4o3wDhCACqpmf-q0HIdAw5FveCTqzekoO_cDrRzTXvDa4ErPnuR92qbt7o-FA2nqhvZUDUUtXN1lEzPYO3dLzjMHzG5HPGdZP-fGj4FEOqLAlR3-A160-3nht-i0rBIB2o04C3Ka4cc9B7BLuBLxrcKNLuS2eVatoSX1NqU_JPP-GUiHBgDz4SwrDAxKkTxbMMz9YCbFSmkGu25NMCjr9q6837QvJIsKsgwwqwRS-mE2sU6gdGrknLwyOYgcYGi0b_fC9qw7gm0joOSor5jCP085_mI7nF2-baacbzrUnNlHoG_tYG7ujTObMM7w_I-ch7bYK7fpcanMzptoEicENA7QEO4ak8h-X8p32hvE07oQ_NsZFSE2vs6EmrkjVxrYft97h21rgmGOkL8djj7QuLJSMka2qdSGiKsBlNpM6KGpdoGKJY8LKA8yNVkpNGzpOIkYVHrl7Nukp669sJ8PavKePGBWawfZ4LbmwIHkzPk0RzytldfKyb8wGzLIm2GoeZdnCCX9bs0MwzNBWgi5PpLLiUYUBJuVN1oB79jtvsbWjAFsc21-QfIMCTxeDJNfUgrPBCM5xqusXB7g0i21zjNK3CtycsHcxQsCHQYMXy9nDP27F1hx7GXSDXkB1YiuDgxepn6IvyyDN3KLVq4pon_iLLXS6gZ4deg23ecfoplHQuyBnWQtPI6Ai-Pb7qbjzB-sOB17N9LbsQfZ5aaHBaBy2tRibntPCtZqV9pVWAzusfSSVlMfM20oJFd72UVspS0m2erYmdr0INntsLq8TBPPWvg8UJX_mRGiws-gfnG-dmMoAm70QD3cR5wdRXJav_XAor1oRPlOOUA7G7Y_1ZHtwI-4vyPUTJ-pgsizs-78eqXxwwhbM4cn00jQUXlnNAE=s1600";

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <div className="relative w-24 h-16 md:w-32 md:h-20 transition-transform hover:scale-105 duration-300">
        <Image
          src={LOGO_URL}
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
