import { currentUser } from '@clerk/nextjs'
import { UserNotFoundError } from '@/lib/error'
import prisma from '@/lib/db'

export async function getFormStats() {
  const user = await currentUser()

  if (!user) {
    throw new UserNotFoundError()
  }

  const stats = await prisma.form.aggregate({
    where: { userId: user.id },
    _sum: { visits: true, submissions: true },
  })

  const visits = stats._sum.visits ?? 0
  const submissions = stats._sum.submissions ?? 0

  let submissionRate = 0
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
  }

  const bounceRate = 100 - submissionRate

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  }
}
