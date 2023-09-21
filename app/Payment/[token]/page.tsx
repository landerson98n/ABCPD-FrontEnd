'use client'
import { PaymentComponent } from '@/components'

export default function RegisterPage({
  params,
}: {
  params: { token: string }
}) {
  return <PaymentComponent token={params.token} />
}
