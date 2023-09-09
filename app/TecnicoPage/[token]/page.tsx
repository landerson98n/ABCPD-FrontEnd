'use client'
import { TecnicoDashboard } from '@/components'

export default function TecnicoPage({ params }: { params: { token: string } }) {
  return <TecnicoDashboard token={params.token} />
}
