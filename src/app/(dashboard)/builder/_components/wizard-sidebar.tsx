import FieldPropertiesSidebar from './field-properties-sidebar'
import FormFieldsSidebar from './form-fields-sidebar'
import { useWizardStore } from '@/stores'

export default function WizardSidebar() {
  const selectedField = useWizardStore((state) => state.selectedField)

  return (
    <aside className="flex h-full w-full max-w-sm flex-grow flex-col gap-2 overflow-y-auto border-muted bg-background p-4">
      {!selectedField ? <FormFieldsSidebar /> : null}

      {selectedField ? <FieldPropertiesSidebar /> : null}
    </aside>
  )
}
