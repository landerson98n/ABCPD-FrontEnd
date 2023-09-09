'use client'
import { SuperintendenteDashboard } from '@/components'

export default function SuperintendentePage({
  params,
}: {
  params: { token: string }
}) {
  return <SuperintendenteDashboard token={params.token} />
}
