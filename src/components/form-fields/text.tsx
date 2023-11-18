import { TextIcon } from 'lucide-react'
import { z } from 'zod'
import { ControllerRenderProps } from 'react-hook-form'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const type: FieldTypes = 'TEXT'

const extraAttributes = {
  label: 'Text Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Value here...',
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
  helperText: z.string().max(200, 'Enter at most 200 characters'),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
})

/** Definition of field */
export const TextField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <TextIcon />,
    label: 'Text Field',
  },
  wizardField: WizardField,
  formComponent: FormComponent,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'label',
        label: 'Label',
        type: 'TEXT',
        description: 'The label of the field. It will be displayed above the field!',
      },
      {
        id: 'placeholder',
        label: 'Placeholder',
        type: 'TEXT',
        description: 'The placeholder of the field.',
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
    ],
  },
}

type TextFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

/** Field related components */
function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as TextFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {_field.extraAttributes.label}
        {_field.extraAttributes.required ? '*' : null}
      </Label>

      <Input readOnly disabled placeholder={_field.extraAttributes.placeholder} />
      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}

function FormComponent({ field, formFieldProps }: { field: FieldInstance; formFieldProps?: ControllerRenderProps }) {
  const _field = field as TextFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {_field.extraAttributes.label}
        {_field.extraAttributes.required ? <span className="text-sm text-red-500">*</span> : null}
      </Label>

      <Input placeholder={_field.extraAttributes.placeholder} {...formFieldProps} />
      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}
