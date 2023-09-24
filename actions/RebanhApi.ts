export async function RebanhoAPI(data: { fazendaId: string; serie: string }) {
  const res = await fetch('http://localhost:3001/rebanho/cadastrar-rebanho', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })

  return res.json()
}

export async function getRebanhoByFazendaId(fazendaId: string) {
  const res = await fetch(
    `http://localhost:3001/rebanho/rebanho-fazenda-id/${fazendaId}`,
    {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    },
  )
  const resposta = await res.json()

  return resposta
}

export async function getRebanhosAll(token: string) {
  const res = await fetch(`http://localhost:3001/rebanho/get-rebanhos`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  })
  const resposta = await res.json()

  return resposta
}

export async function getRebanhoByCriadorId(fazendaId: string) {
  const res = await fetch(
    `http://localhost:3001/rebanho/rebanho-fazenda-id/${fazendaId}`,
    {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    },
  )

  return res.json()
}

export async function getRebanhoBySerie(serie: string, token: string) {
  try {
    const res = await fetch(
      `http://localhost:3001/rebanho/get-rebanho/${serie}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )

    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`)
    }

    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return undefined
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('An error occurred:', error)
    throw error
  }
}
