import { redirect } from 'next/navigation'
import { getFormBySubmitUrl } from '@/actions/form'
import { FieldInstance } from '@/types/form'
import FormSubmission from './_components/form-submission'

export default async function Submit({ params }: { params: { shareUrl: string } }) {
  const form = await getFormBySubmitUrl(params.shareUrl)
  if (!form) {
    return redirect('/')
  }

  const fields = JSON.parse(form.content) as FieldInstance[]

  return <FormSubmission fields={fields} shareUrl={params.shareUrl} />
}
