'use server'

import prisma from '@/lib/db'

export async function getFormBySubmitUrl(shareUrl: string) {
  return prisma.form.update({ where: { shareUrl }, data: { visits: { increment: 1 } } })
}

export async function submitForm(shareUrl: string, content: string) {
  return prisma.form.update({
    where: { shareUrl },
    data: { submissions: { increment: 1 }, formSubmissions: { create: { content } } },
  })
}
