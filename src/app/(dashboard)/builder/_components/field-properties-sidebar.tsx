'use client'

import { XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import useWizard from '@/hooks/use-wizard'
import { Separator } from '@/components/ui/separator'
import { FORM_FIELDS } from '@/lib/form'
import { Form } from '@/components/ui/form'
import ItemsRenderer from '@/components/items-renderer'

export default function FieldPropertiesSidebar() {
  const { selectedField, setSelectedField, updateField } = useWizard()
  const fieldProperties = FORM_FIELDS[selectedField!.type]?.properties
  type PropertySchema = Record<string, string | number>

  const form = useForm<PropertySchema>({
    resolver: fieldProperties?.schema ? zodResolver(fieldProperties.schema) : undefined,
    mode: 'onBlur',
    defaultValues: selectedField?.extraAttributes,
  })

  useEffect(
    function updatePropertiesWhenFieldChange() {
      form.reset(selectedField?.extraAttributes)
    },
    [selectedField?.extraAttributes, form],
  )

  if (!selectedField) {
    return null
  }

  const applyChanges = (values: PropertySchema) => {
    updateField(selectedField.id, {
      ...selectedField,
      extraAttributes: values,
    })
  }

  if (!fieldProperties) {
    return <div className="flex h-full w-full items-center justify-center">No properties for this field</div>
  }

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Field Properties</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelectedField(null)
          }}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="mb-4" />

      <Form {...form}>
        <form
          onBlur={form.handleSubmit(applyChanges)}
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="space-y-4"
        >
          <ItemsRenderer control={form.control} items={fieldProperties?.properties ?? []} />
        </form>
      </Form>
    </div>
  )
}
