'use client'
import { Register } from '@/components'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function RegisterPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  )
}
