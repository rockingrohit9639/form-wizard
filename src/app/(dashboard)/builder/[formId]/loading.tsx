import { LoaderIcon } from 'lucide-react'

export default function BuilderLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderIcon className="h-8 w-8 animate-spin" />
    </div>
  )
}
