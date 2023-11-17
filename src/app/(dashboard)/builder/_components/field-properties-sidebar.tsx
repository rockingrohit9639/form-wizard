import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useWizard from '@/hooks/use-wizard'
import { Separator } from '@/components/ui/separator'
import { FORM_FIELDS } from '@/lib/form'

export default function FieldPropertiesSidebar() {
  const { selectedField, setSelectedField } = useWizard()
  if (!selectedField) return null

  const PropertiesForm = FORM_FIELDS[selectedField.type].propertiesForm

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Field Properties</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelectedField(null)
          }}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="mb-4" />
      <PropertiesForm field={selectedField} />
    </div>
  )
}
