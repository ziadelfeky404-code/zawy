import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ذوي | تقنيات تعليمية مساندة',
    template: '%s | ذوي',
  },
  description: 'تقنيات تعليمية ومساندة مبتكرة لذوي الاحتياجات الخاصة، نبني أدوات ذكية تساعد على القراءة والكتابة والتقييم بدقة أكبر.',
  keywords: ['ذوي', 'تقنيات مساندة', 'تعليم', 'احتياجات خاصة', 'برايل', 'أدوات تعليمية', 'السعودية'],
  authors: [{ name: 'ذوي' }],
  creator: 'ذوي',
  publisher: 'ذوي',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://zawy-six.vercel.app',
    siteName: 'ذوي',
    title: 'ذوي | تقنيات تعليمية مساندة',
    description: 'تقنيات تعليمية ومساندة مبتكرة لذوي الاحتياجات الخاصة',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ذوي - تقنيات مساندة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ذوي | تقنيات تعليمية مساندة',
    description: 'تقنيات تعليمية ومساندة مبتكرة لذوي الاحتياجات الخاصة',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30">
        {children}
      </body>
    </html>
  );
}
