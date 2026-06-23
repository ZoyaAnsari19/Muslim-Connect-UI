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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const SITE_TITLE = 'Muslim Connect — Connecting the Global Muslim Community';
const SITE_DESCRIPTION =
  'Discover masjids, dargahs & madrasas, network with Muslim professionals, read Islamic content, and find opportunities through the Muslim Connect Employment Network.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_TITLE,
    template: '%s | Muslim Connect',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Muslim community',
    'Masjid finder',
    'Dargah',
    'Madrasa',
    'Islamic jobs',
    'Duas',
    'Hadees',
  ],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Muslim Connect',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
