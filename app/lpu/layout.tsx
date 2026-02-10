import Link from 'next/link';
import { LpuUserTypeToggle } from '@/components/lpu/LpuUserTypeToggle';

const navItems = [
  { href: '/lpu', label: 'Overview' },
  { href: '/lpu/videos', label: 'Videos' },
  { href: '/lpu/stories', label: 'Stories' },
  { href: '/lpu/procedures', label: 'Procedures' },
  { href: '/lpu/senior-advice', label: 'Senior Advice' },
  { href: '/lpu/reality-check', label: 'Reality Check' },
  { href: '/lpu/branch-explorer', label: 'Branch Explorer' },
  { href: '/lpu/resources', label: 'Study Resources' },
];

export default function LpuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grain-overlay">
      <header className="sticky top-0 z-40 border-b border-amber-500/15 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-xl text-amber-100">
              AI Mentor
            </Link>
            <span className="hidden text-xs uppercase tracking-[0.3em] text-amber-300/70 md:inline">
              LPU Explorer
            </span>
          </div>
          <nav className="hidden flex-wrap gap-4 text-sm text-amber-100/80 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-amber-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <LpuUserTypeToggle />
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 pb-4 text-xs text-amber-100/80 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-amber-500/20 px-3 py-1 transition hover:border-amber-400/60"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 w-full">
            <LpuUserTypeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
