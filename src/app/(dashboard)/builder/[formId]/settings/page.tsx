import { redirect } from 'next/navigation'

export default function Settings({ params: { formId } }: { params: { formId: string } }) {
  return redirect(`/builder/${formId}/settings/basics`)
}
