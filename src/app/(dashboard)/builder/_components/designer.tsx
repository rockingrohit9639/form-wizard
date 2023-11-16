'use client'

import DesignerSidebar from './designer-sidebar'

export default function Designer() {
  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div className="mx-auto flex h-full max-w-4xl flex-1 flex-grow-0 flex-col items-center justify-start overflow-y-auto rounded-md bg-background">
          <div className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">Drop here</div>
        </div>
      </div>

      <DesignerSidebar />
    </div>
  )
}
