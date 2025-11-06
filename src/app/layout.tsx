import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'Deutsche Bahn Dashboard - Media Project',
  description: 'Usability Evaluation of Interactivity and Storytelling in the context of Data Stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-inter`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900" suppressHydrationWarning>
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700" suppressHydrationWarning>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
                <div className="flex justify-between items-center h-16" suppressHydrationWarning>
                  <div className="flex items-center" suppressHydrationWarning>
                    <h1 className="text-xl font-bold text-black dark:text-white">
                      DB Analytics
                    </h1>
                  </div>
                  <Navigation />
                </div>
              </div>
            </header>
            <main suppressHydrationWarning>
              {children}
            </main>
          </div>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
