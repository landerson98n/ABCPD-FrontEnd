export async function getUserCPFEmail(data: string) {
  const response = await fetch(
    `http://localhost:3001/user/getUserByEmailCpf/${data}`,
    {
      method: 'GET',
    },
  )
  return response.json()
}

export async function getUserById(data: string, token: string) {
  const response = await fetch(
    `http://localhost:3001/user/getUserById/${data}`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response.json()
}

export async function getAllUsers(token: string) {
  const response = await fetch(`http://localhost:3001/user/getUsers/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.json()
}
