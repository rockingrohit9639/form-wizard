'use client'

import { match } from 'ts-pattern'
import FormWizard from '../../_components/form-wizard'
import { trpc } from '@/lib/trpc/client'
import Loading from '@/components/ui/loading'
import { ErrorMessage } from '@/components/ui/error-message'

type BuilderProps = {
  params: { formId: string }
}

export default function Builder({ params }: BuilderProps) {
  const formDetailsQuery = trpc.form.findById.useQuery(params.formId)

  return match(formDetailsQuery)
    .returnType<React.ReactNode>()
    .with({ status: 'loading' }, () => <Loading title="Fetching form details..." />)
    .with({ status: 'error' }, () => <ErrorMessage description="Something went wrong while fetching form details!" />)
    .with({ status: 'success' }, ({ data }) => <FormWizard form={data} />)
    .exhaustive()
}
