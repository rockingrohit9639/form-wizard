import { Separator } from '@/components/ui/separator'
import StatsCards from './_components/stats-cards'
import CreateFormButton from './_components/create-form-button'
import FormCards from './_components/form-cards'

export default function Home() {
  return (
    <div className="container">
      <StatsCards />

      <Separator className="my-6" />
      <h2 className="text-4xl font-bold">Your forms</h2>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormButton />
        <FormCards />
      </div>
    </div>
  )
}
