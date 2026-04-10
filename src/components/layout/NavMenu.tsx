import { useState } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Publications', href: '#publications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav aria-label="Site navigation" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden absolute top-14 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 z-50"
        >
          <ul className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[color:var(--brand)] transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-[color:var(--brand)] hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Resume
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
