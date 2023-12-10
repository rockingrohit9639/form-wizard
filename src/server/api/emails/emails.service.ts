import { User } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import prisma from '@/lib/db'
import { CreateOrUpdateEmailInput } from './emails.input'

export function findEmailByFormId(formId: string) {
  return prisma.email.findFirst({ where: { formId } })
}

export async function createOrUpdateEmail(input: CreateOrUpdateEmailInput, user: User) {
  const email = await findEmailByFormId(input.formId)

  /** In case if email is created for the first time */
  if (!email) {
    return prisma.email.create({
      data: {
        form: { connect: { id: input.formId } },
        subject: input.subject,
        content: input.content,
        userId: user.id,
      },
    })
  }

  /** In case if email is already created for the form */
  if (email.userId !== user.id) {
    throw new TRPCError({ message: 'You are not allowed to update this email!', code: 'FORBIDDEN' })
  }

  return prisma.email.update({
    where: { id: email.id },
    data: {
      subject: input.subject,
      content: input.content,
    },
  })
}
