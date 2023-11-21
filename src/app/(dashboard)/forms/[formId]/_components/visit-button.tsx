'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function VisitButton({ shareUrl }: { shareUrl: string }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return false
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`

  return (
    <Button
      className="w-52"
      onClick={() => {
        window.open(shareLink, '_blank')
      }}
    >
      Visit
    </Button>
  )
}
