import { z } from 'zod'
import { TextField, TitleField } from '@/components/form-fields'
import { FieldInstance, FormFieldsRecord, InputFieldsRecord, LayoutFieldsRecord } from '@/types/form'

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

export const LAYOUT_FIELDS: LayoutFieldsRecord = {
  TITLE: TitleField,
}

export const INPUT_FIELDS: InputFieldsRecord = {
  TEXT: TextField,
}

export const FORM_FIELDS: FormFieldsRecord = {
  ...LAYOUT_FIELDS,
  ...INPUT_FIELDS,
}
