export async function allTecnicos(token: string) {
  const response = await fetch('http://localhost:3001/tecnico/get-tecnicos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })

  return response.json()
}

export async function getTecnicos(token: string) {
  const response = await fetch('http://localhost:3001/tecnico/get-tecnicos', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    method: 'GET',
  })

  return response.json()
}

export async function getTecnicoEmail(token: string, id: string) {
  const response = await fetch(
    `http://localhost:3001/tecnico/get-tecnico-email/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'GET',
    },
  )

  return response.json()
}

export async function cadastrarTecnico(token: string, data) {
  const response = await fetch(
    'http://localhost:3001/tecnico/cadastrar-tecnico',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
      method: 'POST',
    },
  )

  return response.json()
}
