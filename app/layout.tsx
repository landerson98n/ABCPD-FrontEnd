import StyledComponentsRegistry from './registry'
export const metadata = {
  title: 'ABCPD',
  description: 'Pagina ABCPD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StyledComponentsRegistry>
      <html lang="pt-br">
        <body style={{ margin: 0, overflowX: 'hidden' }}>{children}</body>
      </html>
    </StyledComponentsRegistry>
  )
}
