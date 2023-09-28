import AnimalDTO from '@/utils/AnimalDTO'

export async function getAnimaisByCriadorId(criadorId: string, token: string) {
  const res = await fetch(
    `http://localhost:3001/animal/get-animal-criador/${criadorId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    },
  )

  return res.json()
}

export async function getAnimaisCriador(token: string) {
  const res = await fetch(`http://localhost:3001/animal/get-animal-criador`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })

  return res.json()
}

export async function CreateAnimal(data, token: string) {
  try {
    const res = await fetch('http://localhost:3001/animal/cadastrar-animal', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    return res
  } catch (Error) {
    console.log(Error.message)
  }
}

export async function getTodosAnimais(token: string) {
  try {
    const res = await fetch('http://localhost:3001/animal/get-animal', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.json()
  } catch (Error) {
    console.log(Error.message)
  }
}

export async function updateAnimal(data: AnimalDTO, token: string, id: string) {
  try {
    const res = await fetch(
      `http://localhost:3001/animal/update-animal/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
    return res.json()
  } catch (Error) {
    console.log(Error.message)
  }
}

export async function getAnimalById(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/animal/get-animal/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    return res.json()
  } catch (Error) {
    console.log(Error.message)
  }
}
