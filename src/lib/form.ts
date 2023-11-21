import { z } from 'zod'
import {
  TextField,
  BooleanField,
  TitleField,
  SubTitleField,
  ParagraphField,
  SeparatorField,
  SpacerField,
  NumberField,
  TextareaField,
} from '@/components/form-fields'
import { FieldInstance, FormFieldsRecord, InputFieldsRecord, LayoutFieldsRecord } from '@/types/form'
import { BaseItem } from '@/components/items-renderer'

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

export function getItemsFromFields(fields: FieldInstance[]): BaseItem[] {
  return fields.map((field) => ({
    id: field.id,
    label: field.extraAttributes?.label,
    type: field.type,
    required: field.extraAttributes?.required,
    extraInputProps: { placeholder: field.extraAttributes?.placeholder },
    description: field.extraAttributes?.helperText,
    extraAttributes: field.extraAttributes,
  }))
}

export const LAYOUT_FIELDS: LayoutFieldsRecord = {
  TITLE: TitleField,
  SUB_TITLE: SubTitleField,
  PARAGRAPH: ParagraphField,
  SEPARATOR: SeparatorField,
  SPACER: SpacerField,
}

export const INPUT_FIELDS: InputFieldsRecord = {
  TEXT: TextField,
  BOOLEAN: BooleanField,
  NUMBER: NumberField,
  TEXTAREA: TextareaField,
}

export const FORM_FIELDS: FormFieldsRecord = {
  ...LAYOUT_FIELDS,
  ...INPUT_FIELDS,
}
