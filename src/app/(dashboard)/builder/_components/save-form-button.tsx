import { SaveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SaveFormButton() {
  return (
    <Button variant="outline">
      <SaveIcon className="mr-2 h-4 w-4" />
      Save
    </Button>
  )
}
