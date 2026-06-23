'use client';

// ─── Site chrome — global Navbar + Footer, hidden on full-screen app routes ──

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Routes that render their own full-screen app shell (no global nav/footer)
const FULLSCREEN_ROUTES = ['/feed'];
// Routes that hide only the global navbar (footer stays)
const NO_NAVBAR_ROUTES = [
  '/employment-network',
  '/employment/job-seeker-dashboard',
  '/employment/employer-dashboard',
];

const matches = (pathname: string, routes: string[]) =>
  routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = matches(pathname, FULLSCREEN_ROUTES);
  const hideNavbar = matches(pathname, NO_NAVBAR_ROUTES);

  if (isFullscreen) return <>{children}</>;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
