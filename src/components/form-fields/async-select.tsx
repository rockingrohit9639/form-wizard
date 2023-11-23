import { CheckSquareIcon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Select, SelectTrigger, SelectValue } from '../ui/select'

const type: FieldTypes = 'ASYNC_SELECT'

/** @TODO Add dummy API */
const extraAttributes = {
  label: 'Async Select Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Select Option',
}

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
  helperText: z.string().max(200, 'Enter at most 200 characters'),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  api: z.string().url('Please enter a valid url'),
  apiAccessToken: z.string().optional(),
  labelKey: z.string(),
  valueKey: z.string(),
})

/** Definition of field */
export const AsyncSelectField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <CheckSquareIcon />,
    label: 'Async Select',
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
        id: 'api',
        label: 'API',
        type: 'TEXT',
        description: 'API endpoint to fetch data',
        required: true,
      },
      {
        id: 'apiAccessToken',
        label: 'API Access Token',
        type: 'TEXT',
        description: 'Provide an access token in case if your API is protected',
      },
      {
        id: 'labelKey',
        label: 'Label Key',
        type: 'TEXT',
        description: 'Name of key from data item that will be used as label of select item',
        required: true,
      },
      {
        id: 'valueKey',
        label: 'Value Key',
        type: 'TEXT',
        description: 'Name of key from data item that will be used as value of select item',
        required: true,
      },
      {
        id: 'required',
        label: 'Required',
        type: 'BOOLEAN',
      },
    ],
  },
}

type SelectFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as SelectFieldInstance

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
      </Select>

      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}
