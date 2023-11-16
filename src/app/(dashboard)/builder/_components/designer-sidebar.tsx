import { FORM_FIELDS } from '@/types/form'
import FormField from './form-field'

export default function DesignerSidebar() {
  return (
    <aside className="flex h-full w-full max-w-sm flex-grow flex-col gap-2 overflow-y-auto border-muted bg-background p-4">
      Designer sidebar
      <FormField field={FORM_FIELDS.TEXT} />
    </aside>
  )
}
