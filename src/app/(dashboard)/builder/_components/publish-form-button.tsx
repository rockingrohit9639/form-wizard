import { FileUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PublishFormButton() {
  return (
    <Button>
      <FileUpIcon className="mr-2 h-4 w-4" />
      Publish
    </Button>
  )
}
