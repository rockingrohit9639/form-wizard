import Logo from '@/app/(dashboard)/_components/logo'
import ThemeSwitcher from '@/app/(dashboard)/_components/theme-switcher'

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <nav className="container flex h-16 items-center justify-between border-b border-border">
        <Logo />

        <ThemeSwitcher />
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}
