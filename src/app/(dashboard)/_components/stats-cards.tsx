import { ActivityIcon, EyeIcon, FormInputIcon, LogOutIcon } from 'lucide-react'
import { cloneElement } from 'react'
import { getFormStats } from '@/actions/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default async function StatsCards() {
  const stats = await getFormStats()

  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        className="shadow-sm shadow-blue-600"
        title="Total Visits"
        icon={<EyeIcon className="h-6 w-6 text-blue-600" />}
        description="All time form visits"
        value={stats.visits?.toLocaleString()}
      />

      <StatCard
        className="shadow-sm shadow-yellow-600"
        title="Total Submissions"
        icon={<FormInputIcon className="h-6 w-6 text-yellow-600" />}
        description="All time form submissions"
        value={stats.submissions?.toLocaleString()}
      />

      <StatCard
        className="shadow-sm shadow-green-600"
        title="Submission Rate"
        icon={<ActivityIcon className="h-6 w-6 text-green-600" />}
        description="Visits that result in form submissions"
        value={stats.submissionRate?.toLocaleString()}
        unit="%"
      />

      <StatCard
        className="shadow-sm shadow-red-600"
        title="Bounce Rate"
        icon={<LogOutIcon className="h-6 w-6 text-red-600" />}
        description="Visits that left without submission"
        value={stats.submissionRate?.toLocaleString()}
        unit="%"
      />
    </div>
  )
}

type StatCardProps = {
  className?: string
  style?: React.CSSProperties
  title: string
  description?: string
  icon: React.ReactElement<{ className?: string }>
  value: number | string
  unit?: string
  loading?: boolean
}

function StatCard({ className, style, title, description = '', icon, value, unit, loading }: StatCardProps) {
  return (
    <Card className={className} style={style}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {cloneElement(icon)}
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <Skeleton /> : value} {unit}
        </div>
        <p className="pt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
