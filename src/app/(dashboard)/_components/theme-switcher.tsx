'use client'

import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(function mountComponent() {
    setMounted(true)
  }, [])

  /** Avoid hydration errors */
  if (!mounted) return null

  return (
    <Tabs>
      <TabsList defaultValue={theme}>
        <TabsTrigger
          value="light"
          onClick={() => {
            setTheme('light')
          }}
        >
          <SunIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => {
            setTheme('dark')
          }}
        >
          <MoonIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          onClick={() => {
            setTheme('system')
          }}
        >
          <LaptopIcon className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
