import { TextIcon } from 'lucide-react'
import { Field, FieldTypes } from '@/types/form'

const type: FieldTypes = 'TEXT'

export const TextField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes: { label: 'Text Field', helperText: 'Helper Text', required: false, placeholder: 'Value here...' },
  }),
  designerButtonElement: {
    icon: <TextIcon />,
    label: 'Text Field',
  },
  designerField: () => <div className="text-white">Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
}
