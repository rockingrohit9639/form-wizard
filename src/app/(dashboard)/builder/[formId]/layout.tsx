import NavLink from '../_components/nav-link'
import PreviewDialogButton from '../_components/preview-dialog-button'

export default function BuilderLayout({
  children,
  params: { formId },
}: {
  children: React.ReactNode
  params: { formId: string }
}) {
  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden">
      <div className="relative flex items-center justify-center border-b">
        <NavLink href={`/builder/${formId}/build`}>Build</NavLink>
        <NavLink href={`/builder/${formId}/settings/basics`}>Settings</NavLink>
        <NavLink href={`/builder/${formId}/publish`}>Publish</NavLink>

        <div className="absolute right-4">
          <PreviewDialogButton />
        </div>
      </div>
      {children}
    </div>
  )
}
