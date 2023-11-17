import { redirect } from 'next/navigation'
import { ActivityIcon, EyeIcon, FormInputIcon, LogOutIcon } from 'lucide-react'
import { getFormById } from '@/actions/form'
import VisitButton from './_components/visit-button'
import FormLinkShare from './_components/form-link-share'
import { StatCard } from '../../_components/stats-cards'
import SubmissionsTable from './_components/submissions-table'

export default async function FormDetails({ params }: { params: { formId: string } }) {
  const { formId } = params
  const form = await getFormById(formId)
  if (!form) {
    return redirect('/')
  }

  const { visits, submissions } = form

  let submissionRate = 0
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
  }

  const bounceRate = 100 - submissionRate

  return (
    <div className="container">
      <div className="border-b border-muted py-10">
        <div className="flex justify-between">
          <h1 className="truncate text-4xl font-bold">{form.name}</h1>
          <VisitButton shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="border-b border-muted py-4">
        <div className="flex items-center justify-between gap-2">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          className="shadow-sm shadow-blue-600"
          title="Total Visits"
          icon={<EyeIcon className="h-6 w-6 text-blue-600" />}
          description="All time form visits"
          value={visits?.toLocaleString()}
        />

        <StatCard
          className="shadow-sm shadow-yellow-600"
          title="Total Submissions"
          icon={<FormInputIcon className="h-6 w-6 text-yellow-600" />}
          description="All time form submissions"
          value={submissions?.toLocaleString()}
        />

        <StatCard
          className="shadow-sm shadow-green-600"
          title="Submission Rate"
          icon={<ActivityIcon className="h-6 w-6 text-green-600" />}
          description="Visits that result in form submissions"
          value={submissionRate?.toLocaleString()}
          unit="%"
        />

        <StatCard
          className="shadow-sm shadow-red-600"
          title="Bounce Rate"
          icon={<LogOutIcon className="h-6 w-6 text-red-600" />}
          description="Visits that left without submission"
          value={bounceRate?.toLocaleString()}
          unit="%"
        />
      </div>

      <div className="pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  )
}
