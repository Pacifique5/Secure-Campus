import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from './context/AuthContext'

export const metadata: Metadata = {
  title: 'SecureCampus',
  description: 'Secure campus digital platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
