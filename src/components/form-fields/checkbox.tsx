import { ListTodoIcon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const type: FieldTypes = 'CHECKBOX'

const extraAttributes = {
  label: 'Checkbox Field',
  helperText: 'Helper Text',
  required: false,
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
  helperText: z.string().max(200, 'Enter at most 200 characters'),
  required: z.boolean().default(false),
  options: z.string({ required_error: 'Please enter at least one option' }),
})

/** Definition of field */
export const CheckboxField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <ListTodoIcon />,
    label: 'Checkbox',
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
        id: 'helperText',
        label: 'Helper Text',
        type: 'TEXT',
        description: 'The help text of the field. It will be displayed below the field!',
      },
      {
        id: 'required',
        label: 'Required',
        type: 'BOOLEAN',
      },
      {
        id: 'options',
        label: 'Options',
        type: 'TEXTAREA',
        description: 'Enter comma separated options. Each item after a "," will be treaded as a new option.',
      },
    ],
  },
}

type RadioFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as RadioFieldInstance
  const options = _field.extraAttributes?.options?.split(',')?.filter(Boolean) as string[]

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {_field.extraAttributes.label}
        {_field.extraAttributes.required ? <span className="text-red-500">*</span> : null}
      </Label>

      {options?.map((option) => (
        <div key={option} className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox />
          <Label className="font-normal">{option}</Label>
        </div>
      ))}

      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}
