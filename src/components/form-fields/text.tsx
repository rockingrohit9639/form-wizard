import { TextIcon } from 'lucide-react'
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

export const TextField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: <TextIcon />,
    label: 'Text Field',
  },
  designerField: DesignerField,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
}

type TextFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerField({ field }: { field: FieldInstance }) {
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
