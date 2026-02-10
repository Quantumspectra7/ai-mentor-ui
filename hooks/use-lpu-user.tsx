'use client';

import { useEffect, useState } from 'react';
import { UserType } from '@/lib/lpuData';

const STORAGE_KEY = 'lpuUserType';

export function useLpuUserType(defaultType: UserType = 'pre-admission') {
  const [userType, setUserType] = useState<UserType>(defaultType);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUserType(saved as UserType);
      return;
    }
    localStorage.setItem(STORAGE_KEY, defaultType);
  }, [defaultType]);

  const updateUserType = (nextType: UserType) => {
    setUserType(nextType);
    localStorage.setItem(STORAGE_KEY, nextType);
  };

  return { userType, setUserType: updateUserType };
}
