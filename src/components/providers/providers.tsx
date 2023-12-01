'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { queryClient, trpc, trpcClient } from '@/lib/trpc/client'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </trpc.Provider>
    </QueryClientProvider>
  )
}
