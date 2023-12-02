'use server'

import { auth } from '@clerk/nextjs'
import { UserNotFoundError } from '@/lib/error'
import prisma from '@/lib/db'
import { CreateFormInput, createFormInput } from '@/server/api/form/form.input'

export async function createForm(data: CreateFormInput) {
  const result = createFormInput.safeParse(data)
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

export async function publishForm(id: string) {
  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  const form = await prisma.form.findUnique({ where: { id, userId } })
  if (!form) {
    throw new Error('Form not found!')
  }

  return prisma.form.update({ where: { id }, data: { published: true } })
}

export async function getFormBySubmitUrl(shareUrl: string) {
  return prisma.form.update({ where: { shareUrl }, data: { visits: { increment: 1 } } })
}

export async function submitForm(shareUrl: string, content: string) {
  return prisma.form.update({
    where: { shareUrl },
    data: { submissions: { increment: 1 }, formSubmissions: { create: { content } } },
  })
}

export async function getFormWithSubmissions(id: string) {
  const { userId } = auth()
  if (!userId) {
    throw new UserNotFoundError()
  }

  return prisma.form.findUnique({ where: { id, userId }, include: { formSubmissions: true } })
}
