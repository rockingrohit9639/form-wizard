import { getFormById } from '@/actions/form'
import FormWizard from '../_components/form-wizard'

type BuilderProps = {
  params: { formId: string }
}

export default async function Builder({ params }: BuilderProps) {
  const form = await getFormById(params.formId)

  return <FormWizard form={form} />
}
