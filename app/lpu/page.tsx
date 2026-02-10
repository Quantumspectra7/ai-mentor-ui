'use client';

import { useRouter } from 'next/navigation';
import { LPUExplorer } from '@/components/screens/LPUExplorer';
import { useLpuUserType } from '@/hooks/use-lpu-user';
import { UserType } from '@/lib/lpuData';

const moduleRoutes: Record<string, string> = {
  videos: '/lpu/videos',
  stories: '/lpu/stories',
  procedures: '/lpu/procedures',
  'senior-advice': '/lpu/senior-advice',
  'reality-check': '/lpu/reality-check',
  'branch-explorer': '/lpu/branch-explorer',
  resources: '/lpu/resources',
};

export default function Page() {
  const router = useRouter();
  const { setUserType } = useLpuUserType('pre-admission');

  const handleSelectUserType = (type: UserType) => {
    setUserType(type);
  };

  const handleNavigateToModule = (module: string) => {
    const route = moduleRoutes[module];
    if (route) {
      router.push(route);
    }
  };

  return (
    <LPUExplorer
      onSelectUserType={handleSelectUserType}
      onNavigateToModule={handleNavigateToModule}
    />
  );
}
