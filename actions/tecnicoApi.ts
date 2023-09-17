export async function allTecnicos(token: string) {
  const response = await fetch('http://localhost:3001/tecnico/get-tecnicos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  })

  return response.json()
}
