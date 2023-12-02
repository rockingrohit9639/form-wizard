import { PackageOpenIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyMessageProps = {
  title?: string
  description?: string
  className?: string
  style?: React.CSSProperties
}

export function EmptyMessage({
  title = 'No items found',
  description = 'Please upload some item',
  className,
  style,
}: EmptyMessageProps) {
  return (
    <div className={cn('p-4 text-sm', className)} style={style}>
      <PackageOpenIcon className="mx-auto mb-2 h-10 w-10" strokeWidth={1.25} />
      <div className="text-center font-medium">{title}</div>
      <div className="text-center text-muted-foreground">{description}</div>
    </div>
  )
}
