export async function CriarFazenda(data: any) {
  const res = await fetch('http://localhost:3001/fazenda/cadastrar-fazenda', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
  console.log(res)

  return res.json()
}

export async function getFazendaCriador(token: string, id: string) {
  const response = await fetch(
    `http://localhost:3001/animal/get-fazendas-criador/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    },
  )
  console.log(response)
  return response.json()
}
