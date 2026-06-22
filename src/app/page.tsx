'use client';

import { useState } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import JobsHighlight from '@/components/home/JobsHighlight';
import QuickActions from '@/components/home/QuickActions';
import AboutTeaser from '@/components/home/AboutTeaser';
import Testimonials from '@/components/home/Testimonials';
import CtaBand from '@/components/home/CtaBand';
import PageTransition from '@/components/PageTransition';

export default function LandingPage() {
  const [search, setSearch] = useState('');

  const scrollToGrid = () => {
    document.querySelector('#featured-directory')?.scrollIntoView({ behavior: 'smooth' });
  };

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
