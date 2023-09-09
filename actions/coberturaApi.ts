import ComunicacaoCoberturaDto from '@/utils/CoberturaDTO'

export async function ComunicarCobertura(
  data: ComunicacaoCoberturaDto,
  token: string,
) {
  const res = await fetch(
    'http://localhost:3001/comunicacao-cobertura/cadastrar-cobertura',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return res.json()
}
