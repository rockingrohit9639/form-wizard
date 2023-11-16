import { ViewIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PreviewDialogButton() {
  return (
    <Button variant="outline">
      <ViewIcon className="mr-2 h-4 w-4" />
      Preview
    </Button>
  )
}
