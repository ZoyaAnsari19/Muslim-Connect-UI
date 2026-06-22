'use client';

import { useParams } from 'next/navigation';
import EditInstitutionPage from '@/components/institutions/EditInstitutionPage';

export default function EditDargahProfilePage() {
  const { id } = useParams<{ id: string }>();
  return <EditInstitutionPage type="dargah" profileId={id} />;
}
