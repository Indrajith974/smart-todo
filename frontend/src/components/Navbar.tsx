'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, PlusCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/tasks/create', label: 'New Task', icon: PlusCircleIcon },
  { href: '/context/input', label: 'Context', icon: SparklesIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="glass sticky top-0 mx-auto w-full max-w-screen-2xl flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md z-30">
      <Link href="/dashboard" className="font-bold text-xl tracking-tight text-white">
        SmartTodo
      </Link>
      <ul className="flex gap-4">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-1 text-sm hover:text-blue-200 transition-colors ${
                pathname === href ? 'text-blue-300' : 'text-white'
              }`}
            >
              <Icon className="h-5 w-5" /> {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
