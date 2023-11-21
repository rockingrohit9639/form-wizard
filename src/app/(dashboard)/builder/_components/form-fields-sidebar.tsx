import { Separator } from '@/components/ui/separator'
import FormField from './form-field'
import { INPUT_FIELDS, LAYOUT_FIELDS } from '@/lib/form'

export default function FormFieldsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <p className="col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2">Layout Fields</p>
        {Object.entries(LAYOUT_FIELDS).map(([type, field]) => (
          <FormField key={type} field={field} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <p className="col-span-1 my-2 place-self-start text-sm text-muted-foreground md:col-span-2">Input Fields</p>
        {Object.entries(INPUT_FIELDS).map(([type, field]) => (
          <FormField key={type} field={field} />
        ))}
      </div>
    </div>
  )
}
