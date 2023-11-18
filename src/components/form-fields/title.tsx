import { Heading1Icon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import useWizard from '@/hooks/use-wizard'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
export default function Title() {}

const type: FieldTypes = 'TITLE'

const extraAttributes = {
  title: 'Title',
}

const propertiesSchema = z.object({
  title: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
})
type PropertiesSchema = z.infer<typeof propertiesSchema>

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
  propertiesForm: PropertiesComponent,
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

function PropertiesComponent({ field }: { field: FieldInstance }) {
  const { updateField } = useWizard()

  const form = useForm<PropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: field.extraAttributes,
  })

  useEffect(
    function updatePropertiesWhenFieldChange() {
      form.reset(field.extraAttributes)
    },
    [field.extraAttributes, form],
  )

  const applyChanges = (values: PropertiesSchema) => {
    updateField(field.id, {
      ...field,
      extraAttributes: values,
    })
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function FormComponent({ field }: { field: FieldInstance }) {
  const _field = field as TitleFieldInstance
  return <p className="text-xl font-bold">{_field.extraAttributes.title}</p>
}
