import { formatDistance } from 'date-fns'
import { ArrowRight, EyeIcon, FormInputIcon, PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { getForms } from '@/actions/form'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
            <CardDescription className="text-muted-foreground flex items-center justify-between text-sm">
              {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
              {!form.published ? (
                <div className="flex items-center gap-2">
                  <EyeIcon className="text-muted-foreground h-4 w-4" />
                  <div>{form.visits.toLocaleString()}</div>

                  <FormInputIcon className="text-muted-foreground h-4 w-4" />
                  <div>{form.submissions.toLocaleString()}</div>
                </div>
              ) : null}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-muted-foreground h-5 truncate text-sm">{form.description}</CardContent>

          <CardFooter className="mt-4">
            {form.published ? (
              <Button asChild>
                <Link href={`/forms/${form.id}`} className="flex items-center gap-2">
                  View Submission
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={`/builder/${form.id}`} className="flex items-center gap-2">
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
