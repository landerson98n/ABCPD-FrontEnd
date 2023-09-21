'use client'
import StyledComponentsRegistry from './registry'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AlertContextProvider } from '@/context/AlertContextProvider'
import { logo } from '@/assets'
import Image from 'next/image'
export const metadata = {
  title: 'ABCPD',
  description: 'Pagina ABCPD',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AlertContextProvider>
      <QueryClientProvider client={queryClient}>
        <StyledComponentsRegistry>
          <html lang="pt-br">
            <head>
              <title>ABCPD</title>
            </head>
            <body style={{ margin: 0, overflowX: 'hidden' }}>{children}</body>
          </html>
        </StyledComponentsRegistry>
      </QueryClientProvider>
    </AlertContextProvider>
  )
}
