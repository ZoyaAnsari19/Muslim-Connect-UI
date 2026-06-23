'use client';

// ─── Site chrome — global Navbar + Footer, hidden on full-screen app routes ──

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Routes that render their own full-screen app shell (no global nav/footer)
const FULLSCREEN_ROUTES = ['/feed'];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = FULLSCREEN_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );

  if (isFullscreen) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
