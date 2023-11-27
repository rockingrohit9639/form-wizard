import { SettingsIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function WizardSettings() {
  return (
    <div className="container p-4">
      <Tabs orientation="vertical" className="flex gap-4" defaultValue="form-settings">
        <TabsList className="h-full">
          <TabsTrigger value="form-settings" asChild className="h-full">
            <div className="flex items-center gap-2">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <div>
                <div>Settings</div>
                <p className="text-xs text-muted-foreground">Customize form status and its properties</p>
              </div>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form-settings">Form Settings</TabsContent>
      </Tabs>
    </div>
  )
}
