'use client';

import { Compass } from 'lucide-react';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function NotFound() {
  return (
    <PlaceholderPage
      icon={Compass}
      badge="404"
      title="Page Not Found"
      description="The page you are looking for doesn't exist or has moved. Let's guide you back to the community."
    />
  );
}
