export async function criarComunicacaoNacimento(data: any, token: string) {
  const res = await fetch(
    'http://localhost:3001/comunicacao-nascimento/cadastrar-nascimento',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return res
}

export async function getTodasComunicacoesNascimento(token: string) {
  const res = await fetch(
    'http://localhost:3001/comunicacao-nascimento/get-comunicacoes-nascimentos',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return res.json()
}

export async function getComunicacoesNascimentoCriador(
  token: string,
  id: string,
) {
  const res = await fetch(
    `http://localhost:3001/comunicacao-nascimento/get-comunicacoes-nascimentos-criador/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return res.json()
}
