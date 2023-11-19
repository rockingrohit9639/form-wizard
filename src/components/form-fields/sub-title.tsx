import { Heading2Icon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'

const type: FieldTypes = 'SUB_TITLE'

const extraAttributes = {
  label: 'Sub Title',
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
})

/** Definition of field */
export const SubTitleField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <Heading2Icon />,
    label: 'SubTitle Field',
  },
  wizardField: WizardField,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'label',
        label: 'Title',
        type: 'TEXT',
        required: true,
      },
    ],
  },
}

type SubTitleFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as SubTitleFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">SubTitle Field</Label>
      <p className="text-lg">{_field.extraAttributes.label}</p>
    </div>
  )
}
