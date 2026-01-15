import '@/views/styles/globals.css'

export const metadata = {
  title: 'KALA - Mensagens Anónimas',
  description: 'Recebe mensagens anónimas dos teus amigos. Seguro, privado e divertido.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-AO">
      <body>
        {children}
      </body>
    </html>
  )
}