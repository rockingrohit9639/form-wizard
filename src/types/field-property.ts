import { FieldTypes } from './form'

export type FieldProperty = {
  id: string
  label: string
  description?: string
  type: FieldTypes
  required?: boolean
}
