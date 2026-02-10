'use client';

import { ThemeToggle } from './theme-toggle';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeToggle />
      {children}
    </>
  );
}
