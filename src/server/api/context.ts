import { auth } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'

export type CreateContextOptions = {
  user?: User | null
}

export function createTRPCContext(): CreateContextOptions {
  const { user } = auth()

  return { user }
}
