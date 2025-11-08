'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  className?: string
}

export function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Network Map', href: '/map' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`flex items-center space-x-0 ${className}`}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`
            px-4 py-2 text-sm font-roboto transition-all duration-300
            ${pathname === item.href
              ? 'bg-white dark:bg-gray-800 text-black dark:text-white relative'
              : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
        >
          {item.name}
          {pathname === item.href && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-db-light-green"></div>
          )}
        </Link>
      ))}
    </nav>
  )
}
