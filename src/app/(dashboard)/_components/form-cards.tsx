'use client'

import { formatDistance } from 'date-fns'
import { ArrowRight, EyeIcon, FormInputIcon, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { match } from 'ts-pattern'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc/client'
import { ErrorMessage } from '@/components/ui/error-message'
import { Skeleton } from '@/components/ui/skeleton'
import { range } from '@/lib/utils'

export default function FormCards() {
  const formsQuery = trpc.form.findUserForms.useQuery()

  return match(formsQuery)
    .returnType<React.ReactNode>()
    .with({ status: 'loading' }, () =>
      range(4).map((i) => <Skeleton key={i} className="h-48 w-full border-2 border-primary/20" />),
    )
    .with({ status: 'error' }, () => <ErrorMessage />)
    .with({ status: 'success' }, ({ data: forms }) =>
      forms.map((form) => (
        <Card key={form.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <span className="truncate font-bold">{form.name}</span>
              {form.published ? <Badge>Published</Badge> : <Badge variant="warning">Draft</Badge>}
            </CardTitle>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
              {!form.published ? null : (
                <div className="flex items-center gap-2">
                  <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  <div>{form.visits.toLocaleString()}</div>

                  <FormInputIcon className="h-4 w-4 text-muted-foreground" />
                  <div>{form.submissions.toLocaleString()}</div>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="h-5 truncate text-sm text-muted-foreground">{form.description}</CardContent>

          <CardFooter className="mt-4">
            {form.published ? (
              <Button>
                <Link href={`/forms/${form.id}`} className="flex w-full items-center gap-2">
                  View Submission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="secondary">
                <Link href={`/builder/${form.id}/build`} className="flex w-full items-center gap-2">
                  Edit
                  <PencilIcon className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      )),
    )
    .exhaustive()
}
