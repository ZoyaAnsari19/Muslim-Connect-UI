import type { Metadata } from 'next';
import RegistryView from '@/components/feed/RegistryView';
import { MASJIDS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Registered Masjids' };

export default function MasjidsPage() {
  return (
    <RegistryView
      eyebrow="Community Directory"
      title="Registered Masjids"
      subtitle="Verified masjids across the community — explore prayer times, services, and connect with each masjid."
      unit="Masjids"
      items={MASJIDS}
    />
  );
}
