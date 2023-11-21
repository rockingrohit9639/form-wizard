import { SplitSquareVertical } from 'lucide-react'
import { Field, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

const type: FieldTypes = 'SEPARATOR'

const extraAttributes = {
  label: 'Separator',
}

/** Definition of field */
export const SeparatorField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <SplitSquareVertical />,
    label: 'Separator',
  },
  wizardField: WizardField,
}

function WizardField() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator className="my-2" />
    </div>
  )
}
