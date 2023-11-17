'use server'

import { auth } from '@clerk/nextjs'
import { UserNotFoundError } from '@/lib/error'
import prisma from '@/lib/db'
import { CreateFormSchema, createFormSchema } from '@/schema/form'

export async function getFormStats() {
  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  const stats = await prisma.form.aggregate({
    where: { userId },
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

export async function createForm(data: CreateFormSchema) {
  const result = createFormSchema.safeParse(data)
  if (!result.success) {
    throw new Error('Form not valid!')
  }

  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  const formCreated = await prisma.form.create({
    data: {
      ...data,
      userId,
    },
  })

  return formCreated
}

export async function getForms() {
  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  return prisma.form.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
}

export async function getFormById(id: string) {
  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  const form = await prisma.form.findUnique({ where: { id } })
  if (!form) {
    throw new Error('Form not found!')
  }

  return form
}

export async function updateFormContent(id: string, fields: string) {
  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  const form = await prisma.form.findUnique({ where: { id, userId } })
  if (!form) {
    throw new Error('Form not found!')
  }

  return prisma.form.update({ where: { id }, data: { content: fields } })
}
