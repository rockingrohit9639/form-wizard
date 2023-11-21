import { TextCursorIcon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const type: FieldTypes = 'TEXTAREA'

const extraAttributes = {
  label: 'Textarea Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Value here...',
  rows: 4,
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
  helperText: z.string().max(200, 'Enter at most 200 characters'),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  rows: z.coerce.number().default(4),
})

/** Definition of field */
export const TextareaField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <TextCursorIcon />,
    label: 'Textarea',
  },
  wizardField: WizardField,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'label',
        label: 'Label',
        type: 'TEXT',
        description: 'The label of the field. It will be displayed above the field!',
        required: true,
      },
      {
        id: 'placeholder',
        label: 'Placeholder',
        type: 'TEXT',
        description: 'The placeholder of the field.',
        required: true,
      },
      {
        id: 'helperText',
        label: 'Helper Text',
        type: 'TEXT',
        description: 'The help text of the field. It will be displayed below the field!',
      },
      {
        id: 'rows',
        label: 'Rows',
        type: 'NUMBER',
      },
      {
        id: 'required',
        label: 'Required',
        type: 'BOOLEAN',
      },
    ],
  },
}

type TextareaFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as TextareaFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {_field.extraAttributes.label}
        {_field.extraAttributes.required ? <span className="text-red-500"> *</span> : null}
      </Label>

      <Textarea readOnly disabled placeholder={_field.extraAttributes.placeholder} rows={_field.extraAttributes.rows} />
      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}
