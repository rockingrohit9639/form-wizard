'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavLinkProps = LinkProps & {
  className?: string
  children: React.ReactNode
}

export default function NavLink({ className, href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname.includes(href as string)

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-2 hover:bg-secondary',
        {
          'bg-secondary': isActive,
        },
        className,
      )}
    >
      {children}
    </Link>
  )
}
