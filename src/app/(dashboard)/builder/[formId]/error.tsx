'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BuilderError(error: { error: Error }) {
  // eslint-disable-next-line no-console
  console.log(error)

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-destructive text-4xl font-bold">Something went wrong!</h1>
      <Button asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  )
}
