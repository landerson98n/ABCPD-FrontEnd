export async function sendEmail(data, token: string) {
  const res = await fetch('http://localhost:3001/user/sendEmail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
