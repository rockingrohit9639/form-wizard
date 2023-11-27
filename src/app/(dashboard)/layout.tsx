import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from './_components/theme-switcher'
import Logo from './_components/logo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <nav className="fixed z-50 h-16 w-full border-b border-border bg-background/20 backdrop-blur-lg">
        <div className="container flex h-full w-full items-center justify-between">
          <Logo />

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <UserButton />
          </div>
        </div>
      </nav>
      <main className="mt-16 flex w-full flex-grow">{children}</main>
    </div>
  )
}
