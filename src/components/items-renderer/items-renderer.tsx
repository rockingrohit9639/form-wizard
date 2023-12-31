'use client'

import { match } from 'ts-pattern'
import { useCallback } from 'react'
import { Control, ControllerRenderProps } from 'react-hook-form'
import { SelectValue } from '@radix-ui/react-select'
import { FieldTypes } from '@/types/form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LAYOUT_FIELDS } from '@/lib/form'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'
import DatePicker from '../date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Checkbox } from '../ui/checkbox'
import AsyncSelector from './_components/async-selector'

export type BaseItem = {
  id: string
  label: string
  type: FieldTypes
  required?: boolean
  description?: string
  /** attributes which can be used for particular fields */
  extraAttributes?: Record<string, any>
}

type ItemsRendererProps<T> = {
  items: T[]
  control?: Control
}

const FIELD_LABELS_TO_IGNORE = [...Object.keys(LAYOUT_FIELDS)]

export default function ItemsRenderer<T extends BaseItem>({ items, control }: ItemsRendererProps<T>) {
  const getFieldContent = useCallback((type: FieldTypes, item: T, field?: ControllerRenderProps<any, any>) => {
    return match(type)
      .returnType<React.ReactNode>()
      .with('TEXT', () => (
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
          placeholder={item.extraAttributes?.placeholder}
          {...field}
        />
      ))
      .with('TITLE', () => <p className="text-xl font-bold">{item.label}</p>)
      .with('BOOLEAN', () => (
        <div className="flex items-center justify-center gap-4 rounded-md border py-4">
          <div className="text-muted-foreground">No</div>
          <Switch checked={field?.value} onCheckedChange={field?.onChange} />
          <div className="text-muted-foreground">Yes</div>
        </div>
      ))
      .with('SUB_TITLE', () => <p className="text-lg">{item.label}</p>)
      .with('PARAGRAPH', () => <p className="text-muted-foreground">{item.label}</p>)
      .with('SEPARATOR', () => <Separator />)
      .with('SPACER', () => <div style={{ marginBlock: item.extraAttributes?.spacing }} />)
      .with('NUMBER', () => (
        <Input
          type="number"
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
          }}
          placeholder={item.extraAttributes?.placeholder}
          {...field}
        />
      ))
      .with('TEXTAREA', () => (
        <Textarea placeholder={item.extraAttributes?.placeholder} {...field} rows={item.extraAttributes?.rows} />
      ))
      .with('DATE_PICKER', () => <DatePicker placeholder={item.extraAttributes?.placeholder} {...field} />)
      .with('SELECT', () => {
        const options = item.extraAttributes?.options?.split(',')?.filter(Boolean) as string[]

        return (
          <Select value={field?.value} onValueChange={field?.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={item.extraAttributes?.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options &&
                options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )
      })
      .with('RADIO', () => {
        const options = item.extraAttributes?.options?.split(',')?.filter(Boolean) as string[]

        return (
          <RadioGroup defaultValue={field?.value} onValueChange={field?.onChange} {...field}>
            {options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      })
      .with('CHECKBOX', () => {
        const options = item.extraAttributes?.options?.split(',')?.filter(Boolean) as string[]

        return options?.map((option) => (
          <div key={option} className="flex flex-row items-start space-x-3 space-y-0">
            <Checkbox
              checked={field?.value?.includes(option)}
              onCheckedChange={(checked) => {
                return checked
                  ? field?.onChange([...field.value, option])
                  : field?.onChange(field?.value?.filter((value: string) => value !== option))
              }}
            />
            <Label className="font-normal">{option}</Label>
          </div>
        ))
      })
      .with('ASYNC_SELECT', () => {
        const { api, accessToken, labelKey, valueKey } = item.extraAttributes ?? {}
        if (![api, labelKey, valueKey].every(Boolean)) {
          return (
            <div className="rounded-md border py-4 text-center text-muted-foreground">
              All fields are not selected yet
            </div>
          )
        }

        return (
          <AsyncSelector
            id={item.id}
            api={api}
            accessToken={accessToken}
            labelKey={labelKey}
            valueKey={valueKey}
            placeholder={item.extraAttributes?.placeholder}
            field={field}
          />
        )
      })
      .exhaustive()
  }, [])

  return items.map((item) =>
    typeof control !== 'undefined' ? (
      <FormField
        control={control}
        key={item.id}
        name={item.id}
        render={({ field }) => (
          <FormItem>
            {FIELD_LABELS_TO_IGNORE.includes(item.type) ? null : (
              <FormLabel>
                {item.label} {item.required ? <span className="text-red-500"> *</span> : null}
              </FormLabel>
            )}
            <FormControl>{getFieldContent(item.type, item, field)}</FormControl>
            <FormDescription>{item?.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    ) : (
      <div key={item.id} className="flex w-full flex-col gap-2">
        {FIELD_LABELS_TO_IGNORE.includes(item.type) ? null : (
          <Label>
            {item.label}
            {item.required ? <span className="text-sm text-red-500">*</span> : null}
          </Label>
        )}

        {getFieldContent(item.type, item)}
        {item.description ? <p className="text-xs text-muted-foreground">{item.description}</p> : null}
      </div>
    ),
  )
}
