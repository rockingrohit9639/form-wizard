'use client'

import { match } from 'ts-pattern'
import { useCallback } from 'react'
import { Control, ControllerRenderProps } from 'react-hook-form'
import { FieldTypes } from '@/types/form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LAYOUT_FIELDS } from '@/lib/form'
import { Switch } from '@/components/ui/switch'

type BaseItem = {
  id: string
  label: string
  type: FieldTypes
  required?: boolean
  description?: string
}

type ItemsRendererProps<T> = {
  items: T[]
  control?: Control
}

const FIELD_LABELS_TO_IGNORE = [...Object.keys(LAYOUT_FIELDS)]

export default function ItemsRenderer<T extends BaseItem>({ items, control }: ItemsRendererProps<T>) {
  const getFieldContent = useCallback((type: FieldTypes, field: ControllerRenderProps<any, any>, item: T) => {
    return match(type)
      .returnType<React.ReactNode>()
      .with('TEXT', () => (
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
          {...field}
        />
      ))
      .with('TITLE', () => <p className="text-xl font-bold">{item.label}</p>)
      .with('BOOLEAN', () => (
        <div className="flex items-center justify-center gap-4 rounded-md border py-4">
          <div className="text-muted-foreground">No</div>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
          <div className="text-muted-foreground">Yes</div>
        </div>
      ))
      .exhaustive()
  }, [])

  return items.map((item) => (
    <FormField
      control={control}
      key={item.id}
      name={item.id}
      render={({ field }) => (
        <FormItem>
          {FIELD_LABELS_TO_IGNORE.includes(item.type) ? null : (
            <FormLabel>
              {item.label} {item.required ? <span className="text-red">*</span> : null}
            </FormLabel>
          )}
          <FormControl>{getFieldContent(item.type, field, item)}</FormControl>
          <FormDescription>{item?.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  ))
}
