import type { Metadata } from 'next';
import JobsView from '@/components/feed/JobsView';

export const metadata: Metadata = { title: 'Active Jobs' };

export default function JobsPage() {
  return <JobsView />;
}
