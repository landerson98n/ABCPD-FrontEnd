export async function RebanhoAPI(data: { fazendaId: string; serie: string }) {
  const res = await fetch('http://localhost:3001/rebanho/cadastrar-rebanho', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })

  return res.json()
}
