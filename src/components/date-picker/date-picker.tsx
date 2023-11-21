'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type DatePickerProps = {
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  placeholder?: string
  value?: Date
  onChange?: (date: Date) => void
}

export default function DatePicker({
  className,
  style,
  placeholder = 'Pick a date',
  value,
  onChange,
  disabled,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>()

  useEffect(
    function updateInitialValue() {
      setDate(value)
    },
    [value],
  )

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      onChange?.(date)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('!text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-0', className)} style={style}>
        <Calendar mode="single" selected={date} onSelect={handleDateChange} disabled={disabled} />
      </PopoverContent>
    </Popover>
  )
}
