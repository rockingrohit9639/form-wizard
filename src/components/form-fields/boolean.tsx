import { ToggleRightIcon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

const type: FieldTypes = 'BOOLEAN'

const extraAttributes = {
  label: 'Field Label',
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
})

/** Definition of field */
export const BooleanField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <ToggleRightIcon />,
    label: 'Boolean',
  },
  wizardField: WizardField,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'label',
        label: 'Label',
        type: 'TEXT',
        required: true,
      },
    ],
  },
}

type BooleanFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as BooleanFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Boolean Field</Label>
      <p>{_field.extraAttributes.label}</p>
      <div className="flex items-center justify-center gap-4 rounded-md border py-4">
        <div className="text-muted-foreground">No</div>
        <Switch disabled />
        <div className="text-muted-foreground">Yes</div>
      </div>
    </div>
  )
}
