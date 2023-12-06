'use server'

import { auth } from '@clerk/nextjs'
import { UserNotFoundError } from '@/lib/error'
import prisma from '@/lib/db'

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
