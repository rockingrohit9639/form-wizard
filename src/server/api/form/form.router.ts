import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { createFormInput, submitFormInput, updateFormFieldsInput, updateFormInput } from './form.input'
import {
  createForm,
  findFormById,
  findFormByShareUrl,
  findUserForms,
  getFormWithSubmissions,
  getFormsStats,
  publishForm,
  submitForm,
  updateForm,
  updateFormFields,
} from './form.service'

export const formRouter = router({
  stats: protectedProcedure.query(({ ctx }) => getFormsStats(ctx.user)),
  findById: protectedProcedure.input(z.string()).query(({ input }) => findFormById(input)),
  update: protectedProcedure.input(updateFormInput).mutation(({ input, ctx }) => updateForm(input, ctx.user)),
  findUserForms: protectedProcedure.query(({ ctx }) => findUserForms(ctx.user)),
  createForm: protectedProcedure.input(createFormInput).mutation(({ input, ctx }) => createForm(input, ctx.user)),
  getFormWithSubmissions: protectedProcedure
    .input(z.string())
    .query(({ input, ctx }) => getFormWithSubmissions(input, ctx.user)),
  updateFormFields: protectedProcedure
    .input(updateFormFieldsInput)
    .mutation(({ input, ctx }) => updateFormFields(input, ctx.user)),
  publishForm: protectedProcedure.input(z.string()).mutation(({ input, ctx }) => publishForm(input, ctx.user)),
  findFormByShareUrl: protectedProcedure.input(z.string()).query(({ input }) => findFormByShareUrl(input)),
  submitForm: publicProcedure.input(submitFormInput).mutation(({ input }) => submitForm(input)),
})
