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
    <div className="w-full">
      <div className="relative flex items-center justify-center border-b">
        <NavLink href={`/builder/${formId}/build`}>Build</NavLink>
        <NavLink href={`/builder/${formId}/settings`}>Settings</NavLink>
        <NavLink href={`/builder/${formId}/publish`}>Publish</NavLink>

        <div className="absolute right-4">
          <PreviewDialogButton />
        </div>
      </div>
      {children}
    </div>
  )
}
