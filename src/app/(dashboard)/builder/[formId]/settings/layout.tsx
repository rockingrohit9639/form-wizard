import { MailIcon, SettingsIcon } from 'lucide-react'
import NavLink from './_components/nav-link'

const MENU_ITEMS: Array<{ icon: React.ReactElement; title: string; description: string; link: string }> = [
  {
    icon: <SettingsIcon />,
    title: 'Settings',
    description: 'Customize form properties',
    link: '/basics',
  },
  {
    icon: <MailIcon />,
    title: 'Emails',
    description: 'Receive Notifications',
    link: '/emails',
  },
]

export default function SettingsLayout({
  children,
  params: { formId },
}: {
  children: React.ReactNode
  params: { formId: string }
}) {
  return (
    <main className="container grid h-[88.8vh] grid-cols-8 border-r">
      <div className="col-span-2 flex h-full flex-col divide-y border-x">
        {MENU_ITEMS.map((item) => (
          <NavLink key={item.link} href={`/builder/${formId}/settings${item.link}`} {...item} />
        ))}
      </div>
      <div className="col-span-6 overflow-y-auto px-4 py-2">{children}</div>
    </main>
  )
}
