import { redirect } from 'next/navigation'

type BuilderProps = {
  params: { formId: string }
}

export default function Builder({ params }: BuilderProps) {
  return redirect(`/builder/${params.formId}/build`)
}
