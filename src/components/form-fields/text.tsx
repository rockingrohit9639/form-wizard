import { TextIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Field, FieldInstance, FieldTypes } from '@/types/form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import useWizard from '@/hooks/use-wizard'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Switch } from '../ui/switch'

const type: FieldTypes = 'TEXT'

const extraAttributes = {
  label: 'Text Field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Value here...',
}

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
  propertiesForm: PropertiesComponent,
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

const propertiesSchema = z.object({
  label: z.string().min(2, 'Enter at least 2 characters!').max(50, 'Enter at most 50 characters'),
  helperText: z.string().max(200, 'Enter at most 200 characters'),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
})
type PropertiesSchema = z.infer<typeof propertiesSchema>

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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The label of the field <br /> It will be displayed above the field!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The help text of the field. <br />
                It will be displayed below the field!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The help text of the field. <br />
                  It will be displayed below the field!
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
  const _field = field as TextFieldInstance

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {_field.extraAttributes.label}
        {_field.extraAttributes.required ? '*' : null}
      </Label>

      <Input placeholder={_field.extraAttributes.placeholder} />
      {_field.extraAttributes.helperText ? (
        <p className="text-xs text-muted-foreground">{_field.extraAttributes.helperText}</p>
      ) : null}
    </div>
  )
}
