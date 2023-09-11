import PaymentDTO from '@/utils/PaymentDTO'

export async function PaymentAPI(data: PaymentDTO, id: string) {
  const res = await fetch(`http://localhost:3001/criador/payment/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })

  return res.json()
}
