import { TRPCError } from '@trpc/server'
import { User } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import { UpdateFormInput } from './form.input'

export async function findFormById(id: string) {
  const form = await prisma.form.findUnique({ where: { id } })
  if (!form) {
    throw new TRPCError({ message: 'Form not found', code: 'NOT_FOUND' })
  }

  return form
}

export async function updateForm(input: UpdateFormInput, user: User) {
  const form = await findFormById(input.id)

  if (form.userId !== user.id) {
    throw new TRPCError({ message: 'You are not allowed to update this form', code: 'FORBIDDEN' })
  }

  return prisma.form.update({ where: { id: input.id }, data: { name: input.name, description: input.description } })
}

export async function getFormsStats(user: User) {
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

export async function findUserForms(user: User) {
  return prisma.form.findMany({ where: { userId: user.id } })
}
