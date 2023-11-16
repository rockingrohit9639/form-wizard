import { TextField } from '@/components/form-fields'

export type FieldTypes = 'TEXT'

export type Field = {
  type: FieldTypes

  /** Construct a new field with random id */
  construct: (id: string) => FieldInstance

  /** A preview button which a user can use to drag over the designer */
  designerButtonElement: {
    icon: React.ReactElement<{ className?: string }>
    label: string
  }

  /** Preview of the field on designer */
  designerField: React.FC<{
    field: FieldInstance
  }>
  formComponent: React.FC

  /** A form which have properties specific to a field type */
  propertiesForm: React.FC<{
    field: FieldInstance
  }>
}

export type FieldInstance = {
  id: string
  type: FieldTypes
  extraAttributes?: Record<string, any>
}

export type FormFieldsRecord = Record<FieldTypes, Field>

export const FORM_FIELDS: FormFieldsRecord = {
  TEXT: TextField,
}
