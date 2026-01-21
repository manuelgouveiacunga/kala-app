import '@/views/styles/globals.css'
import { Toaster } from '@/views/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'KALA - Mensagens Anónimas',
  description: 'Recebe mensagens anónimas dos teus amigos. Seguro, privado e divertido.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-AO">
      <body>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}