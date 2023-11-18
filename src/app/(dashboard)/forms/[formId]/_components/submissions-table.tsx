import { formatDistance } from 'date-fns'
import { getFormWithSubmissions } from '@/actions/form'
import { FieldInstance, FieldTypes } from '@/types/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Column = {
  id: string
  label: string
  required: boolean
  type: FieldTypes
}

type Row = { [key: string]: string } & {
  submittedAt: Date
}

export default async function SubmissionsTable({ id }: { id: string }) {
  const form = await getFormWithSubmissions(id)

  if (!form) {
    throw new Error('Form not found!')
  }

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

  return (
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
  )
}

function RowCell({ value }: { type: FieldTypes; value: string }) {
  const node: React.ReactNode = value

  return <TableCell>{node}</TableCell>
}
