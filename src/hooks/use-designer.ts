import { useContext } from 'react'
import invariant from 'tiny-invariant'
import { DesignerContext } from '@/contexts'

export default function useDesigner() {
  const context = useContext(DesignerContext)
  invariant(context, 'useDesigner must be used within DesignerContext')

  return context
}
