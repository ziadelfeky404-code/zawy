import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ذوي | تقنيات تعليمية مساندة',
  description: 'تقنيات تعليمية ومساندة مبتكرة لذوي الاحتياجات الخاصة، نبني أدوات تساعد على القراءة والكتابة والتقييم بدقة أكبر.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
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
      </head>
      <body className="font-body antialiased selection:bg-accent/30">
        {children}
      </body>
    </html>
  );
}
