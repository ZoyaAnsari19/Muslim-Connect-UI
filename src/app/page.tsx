'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/home/Hero';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import JobsHighlight from '@/components/home/JobsHighlight';
import QuickActions from '@/components/home/QuickActions';
import AboutTeaser from '@/components/home/AboutTeaser';
import Testimonials from '@/components/home/Testimonials';
import CtaBand from '@/components/home/CtaBand';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { isLoggedIn, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && isLoggedIn) {
      router.replace('/feed');
    }
  }, [isHydrated, isLoggedIn, router]);

  const scrollToGrid = () => {
    document.querySelector('#featured-directory')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Avoid flashing the public landing page for logged-in users before redirect
  if (!isHydrated || isLoggedIn) return null;

  return (
    <PageTransition>
      <Hero search={search} onSearchChange={setSearch} onSearchSubmit={scrollToGrid} />
      <FeaturedGrid search={search} />
      <JobsHighlight />
      <QuickActions />
      <AboutTeaser />
      <Testimonials />
      <CtaBand />
    </PageTransition>
  );
}
