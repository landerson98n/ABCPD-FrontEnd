export async function CriarFazenda (data: any) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/fazenda/cadastrar-fazenda",
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {"Content-type": "application/json; charset=UTF-8"}
        }
    );

    return res.json();

}

export async function getFazendaCriador (token: string, id: string) {

    const response = await fetch(
        `https://abcpd-backend-production.up.railway.app/fazenda/get-fazendas-criador/${id}`,
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return response.json();

}

export async function getFazendaById (token: string, id: string) {

    const response = await fetch(
        `https://abcpd-backend-production.up.railway.app/fazenda/get-fazenda/${id}`,
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return response.json();

}

export async function getTodasFazendas (token: string) {

    const response = await fetch(
        "https://abcpd-backend-production.up.railway.app/fazenda/get-fazenda",
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return response.json();

}
