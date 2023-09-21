
export async function ComunicarCobertura(data, token: string) {
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
  ).then((response) => {
    return response
  })

  return res
}

export async function getAllCoberturas(token: string, id: string) {
  const res = await fetch(
    `http://localhost:3001/comunicacao-cobertura/get-coberturas-criador/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((response) => {
    return response.json()
  })

  return res
}
