import { LoaderIcon } from 'lucide-react'

type LoadingProps = {
  title?: string
}

export default function Loading({ title = 'Loading...' }: LoadingProps) {
  return (
    <div className="min-h-40 flex h-full items-center justify-center">
      <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
      <span className="text-xs text-muted-foreground">{title}</span>
    </div>
  )
}
