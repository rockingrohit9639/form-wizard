import { ChevronsUpDown } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'

const type: FieldTypes = 'SPACER'

const extraAttributes = {
  label: 'Spacer',
  spacing: 2,
}

const propertiesSchema = z.object({
  spacing: z.coerce.number().default(2),
})

/** Definition of field */
export const SpacerField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <ChevronsUpDown />,
    label: 'Spacer',
  },
  wizardField: WizardField,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'spacing',
        label: 'Spacing',
        type: 'NUMBER',
        required: true,
      },
    ],
  },
}

type SpacerFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as SpacerFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-center text-muted-foreground">Spacer Field: {_field.extraAttributes.spacing}px</Label>
      <div className="flex items-center justify-center">
        <ChevronsUpDown className="my-2" />
      </div>
    </div>
  )
}
