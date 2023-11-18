'use client'

import { match } from 'ts-pattern'
import { useCallback } from 'react'
import { Control, ControllerRenderProps } from 'react-hook-form'
import { FieldTypes } from '@/types/form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LAYOUT_FIELDS } from '@/lib/form'

type BaseItem = {
  id: string
  label: string
  type: FieldTypes
}

type ItemsRendererProps<T> = {
  items: T[]
  control?: Control
}

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
      .exhaustive()
  }, [])

  return items.map((item) => (
    <FormField
      control={control}
      key={item.id}
      name={item.id}
      render={({ field }) => (
        <FormItem>
          {Object.keys(LAYOUT_FIELDS).includes(item.type) ? null : <FormLabel>{item.label}</FormLabel>}
          <FormControl>{getFieldContent(item.type, field, item)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ))
}
