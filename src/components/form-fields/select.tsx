import { PanelTopOpenIcon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const type: FieldTypes = 'SELECT'

const extraAttributes = {
  label: 'Select Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Select Option',
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
  helperText: z.string().max(200, 'Enter at most 200 characters'),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.string({ required_error: 'Please enter at least one option' }),
})

/** Definition of field */
export const SelectField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <PanelTopOpenIcon />,
    label: 'Select',
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

type SelectFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as SelectFieldInstance
  const options = _field.extraAttributes?.options?.split(',')?.filter(Boolean) as string[]

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {_field.extraAttributes.label}
        {_field.extraAttributes.required ? <span className="text-red-500">*</span> : null}
      </Label>

      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder={_field.extraAttributes.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options &&
            options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}
