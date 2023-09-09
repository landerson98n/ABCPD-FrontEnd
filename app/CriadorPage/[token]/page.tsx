'use client'
import { CriadorDashboard } from '@/components'

export default function CriadorPage({ params }: { params: { token: string } }) {
  return <CriadorDashboard token={params.token} />
}
