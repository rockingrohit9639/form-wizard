import { ControllerRenderProps } from 'react-hook-form'
import axios from 'axios'
import { LoaderIcon, ShieldXIcon } from 'lucide-react'
import { SelectProps } from '@radix-ui/react-select'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type AsyncSelectorProps = SelectProps & {
  className?: string
  style?: React.CSSProperties
  id: string
  api: string
  labelKey: string
  valueKey: string
  accessToken?: string
  field?: ControllerRenderProps<any, any>
  placeholder?: string
}

export default function AsyncSelector({
  className,
  style,
  id,
  api,
  labelKey,
  valueKey,
  accessToken,
  field,
  placeholder = 'Select an item',
  ...restProps
}: AsyncSelectorProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['async-selector', id],
    queryFn: async () => {
      const { data } = await axios.get(api, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      })

      return data
    },
  })

  const optionsToRender = useMemo(() => {
    if (!data) {
      return []
    }

    return data.map((item: any) => ({ label: item[labelKey], value: item[valueKey] }))
  }, [data, labelKey, valueKey]) as Array<{ label: string; value: string }>

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2 text-muted-foreground">
        <LoaderIcon className="h-4 w-4 animate-spin" />
        <div>Loading options...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <ShieldXIcon className="h-6 w-6" />
        <div>Something went wrong while fetching options</div>
      </div>
    )
  }

  return (
    <Select value={field?.value} onValueChange={field?.onChange} {...field} {...restProps}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn('max-h-72', className)} style={style}>
        {optionsToRender.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
