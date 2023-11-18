import { Heading1Icon } from 'lucide-react'
import { z } from 'zod'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
export default function Title() {}

const type: FieldTypes = 'TITLE'

const extraAttributes = {
  title: 'Title',
}

const propertiesSchema = z.object({
  title: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
})

/** Definition of field */
export const TitleField: Field = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  wizardButtonElement: {
    icon: <Heading1Icon />,
    label: 'Title Field',
  },
  wizardField: WizardField,
  formComponent: FormComponent,
  properties: {
    schema: propertiesSchema,
    properties: [
      {
        id: 'title',
        label: 'Title',
        type: 'TEXT',
      },
    ],
  },
}

type TitleFieldInstance = FieldInstance & {
  extraAttributes: typeof extraAttributes
}

/** Field related components */
function WizardField({ field }: { field: FieldInstance }) {
  const _field = field as TitleFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Title Field</Label>
      <p className="text-xl font-bold">{_field.extraAttributes.title}</p>
    </div>
  )
}

function FormComponent({ field }: { field: FieldInstance }) {
  const _field = field as TitleFieldInstance
  return <p className="text-xl font-bold">{_field.extraAttributes.title}</p>
}
