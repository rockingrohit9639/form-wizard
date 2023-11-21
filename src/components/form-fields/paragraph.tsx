import { TextIcon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'

const type: FieldTypes = 'PARAGRAPH'

const extraAttributes = {
  label: 'Paragraph Content',
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
})

/** Definition of field */
export const ParagraphField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <TextIcon />,
    label: 'Paragraph',
  },
  wizardField: WizardField,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'label',
        label: 'Paragraph Content',
        type: 'TEXT',
        required: true,
      },
    ],
  },
}

type ParagraphFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as ParagraphFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <p className="text-muted-foreground">{_field.extraAttributes.label}</p>
    </div>
  )
}
