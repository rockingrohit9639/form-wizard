import { formatDistance } from 'date-fns'
import { ArrowRight, EyeIcon, FormInputIcon, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { getForms } from '@/actions/form'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function FormCards() {
  const forms = await getForms()

  return (
    <>
      {forms.map((form) => (
        <Card key={form.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              <span className="truncate font-bold">{form.name}</span>
              {form.published ? <Badge>Published</Badge> : <Badge variant="warning">Draft</Badge>}
            </CardTitle>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
              {form.published ? null : (
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
              <Button asChild>
                <Link href={`/forms/${form.id}`} className="flex w-full items-center gap-2">
                  View Submission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="secondary" asChild>
                <Link href={`/builder/${form.id}`} className="flex w-full items-center gap-2">
                  Edit
                  <PencilIcon className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
