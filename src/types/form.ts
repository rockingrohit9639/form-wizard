import { TextField } from '@/components/form-fields'

export type FieldTypes = 'TEXT'

export type Field = {
  type: FieldTypes

  /** Construct a new field with random id */
  construct: (id: string) => FieldInstance

  /** A button to display in sidebar to drag over wizard */
  wizardButtonElement: {
    icon: React.ReactElement<{ className?: string }>
    label: string
  }

  /** Preview of the field on wizard */
  wizardField: React.FC<{
    field: FieldInstance
  }>

  /** Preview of field on preview page */
  formComponent: React.FC<{
    field: FieldInstance
  }>

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
