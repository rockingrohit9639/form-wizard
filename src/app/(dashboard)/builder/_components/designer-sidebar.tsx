import { FORM_FIELDS } from '@/types/form'
import FormField from './form-field'
import useDesigner from '@/hooks/use-designer'
import FieldPropertiesSidebar from './field-properties-sidebar'

export default function DesignerSidebar() {
  const { selectedField } = useDesigner()

  return (
    <aside className="flex h-full w-full max-w-sm flex-grow flex-col gap-2 overflow-y-auto border-muted bg-background p-4">
      {!selectedField ? <FormField field={FORM_FIELDS.TEXT} /> : null}

      {selectedField ? <FieldPropertiesSidebar /> : null}
    </aside>
  )
}
