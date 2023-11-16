import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import WizardContextProvider from '@/contexts/wizard-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Form Wizard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <WizardContextProvider>
            <ThemeProvider attribute="class">
              <Toaster />
              {children}
            </ThemeProvider>
          </WizardContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
