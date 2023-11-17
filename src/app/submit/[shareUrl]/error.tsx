'use client'

import Link from 'next/link'
import { RotateCcwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SubmitError(error: { error: Error }) {
  // eslint-disable-next-line no-console
  console.log(error)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => {
            location.reload()
          }}
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  )
}
