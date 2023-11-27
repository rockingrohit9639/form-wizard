import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from './_components/theme-switcher'
import Logo from './_components/logo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <nav className="container fixed z-50 flex h-16 items-center justify-between border-b border-border bg-background/20 backdrop-blur-lg">
        <Logo />

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
      <main className="mt-16 flex w-full flex-grow">{children}</main>
    </div>
  )
}
