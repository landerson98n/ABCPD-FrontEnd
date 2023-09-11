export async function getUserCPFEmail(data: string) {
  const response = await fetch(
    `http://localhost:3001/user/getUserByEmailCpf/${data}`,
    {
      method: 'GET',
    },
  )
  return response.json()
}
