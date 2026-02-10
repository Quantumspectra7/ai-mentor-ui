'use client';

import { VideoHub } from '@/components/features/VideoHub';
import { useLpuUserType } from '@/hooks/use-lpu-user';

export default function Page() {
  const { userType } = useLpuUserType('pre-admission');
  return <VideoHub userType={userType} />;
}
