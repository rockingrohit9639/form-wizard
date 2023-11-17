import { useContext } from 'react'
import invariant from 'tiny-invariant'
import { WizardContext } from '@/contexts'

export default function useWizard() {
  const context = useContext(WizardContext)
  invariant(context, 'useWizard must be used within DesignerContext')

  return context
}
