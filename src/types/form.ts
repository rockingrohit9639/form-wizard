import { ControllerRenderProps } from 'react-hook-form'
import { z } from 'zod'
import { FieldProperty } from './field-property'

export type LayoutFieldTypes = 'TITLE'
export type InputFieldTypes = 'TEXT'

export type FieldTypes = LayoutFieldTypes | InputFieldTypes

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
    formFieldProps?: ControllerRenderProps<any, any>
  }>

  /** Properties for the field */
  properties: {
    schema: z.AnyZodObject
    properties: FieldProperty[]
  }
}

export type FieldInstance = {
  id: string
  type: FieldTypes
  extraAttributes?: Record<string, any>
}

export type LayoutFieldsRecord = Record<LayoutFieldTypes, Field>
export type InputFieldsRecord = Record<InputFieldTypes, Field>

export type FormFieldsRecord = Record<FieldTypes, Field>
