'use client'

import { ShareIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return false
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div className="flex flex-grow items-center gap-4">
      <Input value={shareLink} readOnly />
      <Button
        className="max-w-[250px]"
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
