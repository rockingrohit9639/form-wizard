import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from './_components/theme-switcher'
import Logo from './_components/logo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex max-h-screen min-h-screen flex-col">
      <nav className="border-border flex h-16 items-center justify-between border-b px-4 py-2">
        <Logo />

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}
