import { TRPCError } from '@trpc/server'
import { User } from '@clerk/nextjs/server'
import prisma from '@/lib/db'
import { CreateFormInput, SubmitFormInput, UpdateFormFieldsInput, UpdateFormInput } from './form.input'

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

export async function createForm(input: CreateFormInput, user: User) {
  return prisma.form.create({
    data: {
      ...input,
      userId: user.id,
    },
  })
}

export function getFormWithSubmissions(id: string, user: User) {
  return prisma.form.findUnique({ where: { id, userId: user.id }, include: { formSubmissions: true } })
}

export async function updateFormFields(input: UpdateFormFieldsInput, user: User) {
  const form = await prisma.form.findUnique({ where: { id: input.id, userId: user.id } })
  if (!form) {
    throw new TRPCError({ message: 'Form not found!', code: 'NOT_FOUND' })
  }

  return prisma.form.update({ where: { id: input.id }, data: { content: input.fields } })
}

export async function publishForm(id: string, user: User) {
  const form = await prisma.form.findUnique({ where: { id, userId: user.id } })
  if (!form) {
    throw new TRPCError({ message: 'Form not found!', code: 'NOT_FOUND' })
  }

  return prisma.form.update({ where: { id }, data: { published: true } })
}

export function findFormByShareUrl(shareUrl: string) {
  return prisma.form.update({ where: { shareUrl }, data: { visits: { increment: 1 } } })
}

export function submitForm(input: SubmitFormInput) {
  return prisma.form.update({
    where: { shareUrl: input.shareUrl },
    data: { submissions: { increment: 1 }, formSubmissions: { create: { content: input.fields } } },
  })
}
