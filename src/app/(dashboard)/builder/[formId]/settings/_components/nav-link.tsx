'use client'

import Link, { LinkProps } from 'next/link'
import { cloneElement } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavLinkProps = LinkProps & {
  icon: React.ReactElement<{ className?: string }>
  title: string
  description: string
}

export default function NavLink({ href, icon, title, description }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname.includes(href as string)

  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 border-b px-4 py-2 hover:bg-secondary', { 'bg-secondary': isActive })}
    >
      <div>{cloneElement(icon, { className: 'w-4 h-4 text-primary' })}</div>
      <div>
        <h3 className="text-sm">{title}</h3>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
