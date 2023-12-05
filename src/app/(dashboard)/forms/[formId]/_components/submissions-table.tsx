'use client'

import { formatDistance } from 'date-fns'
import { match } from 'ts-pattern'
import { useMemo } from 'react'
import { FieldInstance, FieldTypes } from '@/types/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { trpc } from '@/lib/trpc/client'
import Loading from '@/components/ui/loading'
import { ErrorMessage } from '@/components/ui/error-message'

type Column = {
  id: string
  label: string
  required: boolean
  type: FieldTypes
}

type Row = { [key: string]: string } & {
  submittedAt: Date
}

export default function SubmissionsTable({ id }: { id: string }) {
  const formWithSubmissionQuery = trpc.form.getFormWithSubmissions.useQuery(id)

  const { columns, rows } = useMemo(() => {
    if (!formWithSubmissionQuery.data) {
      return { columns: [], rows: [] }
    }

    const form = formWithSubmissionQuery.data
    const formFields = JSON.parse(form.content) as FieldInstance[]
    const columns: Column[] = []

    formFields.forEach((field) => {
      switch (field.type) {
        case 'TEXT': {
          columns.push({
            id: field.id,
            label: field.extraAttributes?.label,
            required: field.extraAttributes?.required,
            type: field.type,
          })
          break
        }

        default: {
          break
        }
      }
    })

    const rows: Row[] = []
    form.formSubmissions.forEach((submission) => {
      const content = JSON.parse(submission.content)
      rows.push({ ...content, submittedAt: submission.createdAt })
    })

    return { columns, rows }
  }, [formWithSubmissionQuery.data])

  return match(formWithSubmissionQuery)
    .returnType<React.ReactNode>()
    .with({ status: 'loading' }, () => <Loading title="Fetching form submissions" />)
    .with({ status: 'error' }, () => <ErrorMessage description="Could not fetch form submissions!" />)
    .with({ status: 'success' }, () => (
      <div>
        <h1 className="my-4 text-2xl font-bold">Form Submissions</h1>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id} className="uppercase">
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="text-right uppercase text-muted-foreground">Submitted At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <RowCell key={column.id} type={column.type} value={row[column.id]} />
                  ))}
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistance(row.submittedAt, new Date(), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    ))
    .exhaustive()
}

function RowCell({ value }: { type: FieldTypes; value: string }) {
  const node: React.ReactNode = value

  return <TableCell>{node}</TableCell>
}
