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
