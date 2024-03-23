const URL = `${process.env.API_URL}`;

export async function CriarCriador (data: any) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/criador/cadastrar-criador",
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {"Content-type": "application/json; charset=UTF-8"}
        }
    );

    return res.json();

}

export async function getCriadorByUserId (id: string, token: string) {

    const res = await fetch(
        `https://abcpd-backend-production.up.railway.app/criador/get-criador-user/${id}`,
        {
            "method": "GET",
            "headers": {"Authorization": `Bearer ${token}`}
        }
    );

    return res.json();

}

export async function getCriadorById (id: string, token: string) {

    const res = await fetch(
        `https://abcpd-backend-production.up.railway.app/criador/get-criador/${id}`,
        {
            "method": "GET",
            "headers": {"Authorization": `Bearer ${token}`}
        }
    );

    return res.json();

}

export async function getCriadorTransferencia (token: string) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/criador/get-criador-transferencia",
        {
            "method": "GET",
            "headers": {"Authorization": `Bearer ${token}`}
        }
    );

    return res.json();

}

export async function dataAnimal (token: string) {

    const response = await fetch(
        "https://abcpd-backend-production.up.railway.app/animal/get-animal-criador",
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return response.json();

}
