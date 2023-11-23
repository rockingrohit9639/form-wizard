'use client'

import { QueryClientProvider as ReactQueryClientProvider } from 'react-query'
import { queryClient } from '@/lib/client'

type QueryClientProviderProps = Omit<React.ComponentProps<typeof ReactQueryClientProvider>, 'client'> & {
  children: React.ReactNode
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}
