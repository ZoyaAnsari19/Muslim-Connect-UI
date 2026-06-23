import type { Metadata } from 'next';
import { Playfair_Display, Inter, Amiri } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import SiteChrome from '@/components/SiteChrome';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Muslim Connect — Connecting the Global Muslim Community',
    template: '%s | Muslim Connect',
  },
  description:
    'Discover masjids, dargahs & madrasas, network with Muslim professionals, read Islamic content, and find opportunities through the Muslim Connect Employment Network.',
  keywords: [
    'Muslim community',
    'Masjid finder',
    'Dargah',
    'Madrasa',
    'Islamic jobs',
    'Duas',
    'Hadees',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${amiri.variable}`}>
      <body>
        <AuthProvider>
          <ToastProvider>
            <SiteChrome>{children}</SiteChrome>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
