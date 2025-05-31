import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ReactQueryClientProvider } from '@/lib/react-query-provider'
import { ThemeContextProvider } from '@/context/ThemeContext'
import '../styles/global.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body className={inter.className} suppressHydrationWarning>
          <ThemeContextProvider>
            <ReactQueryClientProvider>
              <Header />
              {children}
            </ReactQueryClientProvider>
          </ThemeContextProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
