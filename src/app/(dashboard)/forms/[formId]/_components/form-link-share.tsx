'use client'

import { ShareIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const { toast } = useToast()

  const shareLink = `${window.location.origin}/submit/${shareUrl}`

  return (
    <div className="flex w-full items-center gap-4">
      <Input className="flex-1" value={shareLink} readOnly />
      <Button
        className="w-max"
        onClick={() => {
          navigator.clipboard.writeText(shareLink)
          toast({ title: 'Link Coped successfully', variant: 'success' })
        }}
      >
        <ShareIcon className="mr-2 h-4 w-4" />
        Share Link
      </Button>
    </div>
  )
}
