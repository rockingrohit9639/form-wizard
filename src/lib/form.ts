import { z } from 'zod'
import { TextField } from '@/components/form-fields'
import { FieldInstance, FormFieldsRecord } from '@/types/form'

export const FORM_FIELDS: FormFieldsRecord = {
  TEXT: TextField,
}

export function generateFieldsValidationSchema(fields: FieldInstance[]) {
  const validationSchema: Record<string, z.ZodTypeAny> = {}

  fields.forEach((field) => {
    const fieldSchema = field.extraAttributes?.required
      ? z.string({ required_error: `${field.extraAttributes.label} is required!` })
      : z.string().optional()
    validationSchema[field.id] = fieldSchema
  })

  return z.object(validationSchema)
}
