import { getFormById } from '@/actions/form'
import FormBuilder from '../_components/form-builder'

type BuilderProps = {
  params: { formId: string }
}

export default async function Builder({ params }: BuilderProps) {
  const form = await getFormById(params.formId)

  return <FormBuilder form={form} />
}
