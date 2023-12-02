import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'

export type CreateContextOptions = {
  user?: User | null
}

export async function createTRPCContext(): Promise<CreateContextOptions> {
  const user = await currentUser()

  return { user }
}
