'use client'

import { ActivityIcon, EyeIcon, FormInputIcon, LogOutIcon } from 'lucide-react'
import React, { cloneElement } from 'react'
import { match } from 'ts-pattern'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { trpc } from '@/lib/trpc/client'
import { ErrorMessage } from '@/components/ui/error-message'
import { range } from '@/lib/utils'

export default function StatsCards() {
  const formsStatsQuery = trpc.form.stats.useQuery()

  return match(formsStatsQuery)
    .returnType<React.ReactNode>()
    .with({ status: 'loading' }, () => (
      <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 xl:grid-cols-4">
        {range(4).map((i) => (
          <Skeleton key={i} className="h-36 w-full rounded-md border-2 border-primary/20" />
        ))}
      </div>
    ))
    .with({ status: 'error' }, () => <ErrorMessage />)
    .with({ status: 'success' }, ({ data: stats }) => (
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
          value={stats.bounceRate?.toLocaleString()}
          unit="%"
        />
      </div>
    ))
    .exhaustive()
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

export function StatCard({ className, style, title, description = '', icon, value, unit, loading }: StatCardProps) {
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
