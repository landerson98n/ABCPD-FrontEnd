export async function criarComunicacaoNacimento (data: any, token: string) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/comunicacao-nascimento/cadastrar-nascimento",
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res;

}
export async function updateComunicacaoNascimento (
    data: any,
    token: string,
    id: string
) {

    const res = await fetch(
        `https://abcpd-backend-production.up.railway.app/comunicacao-nascimento/update-comunicacoes-nascimentos/${id}`,
        {
            "method": "PUT",
            "body": JSON.stringify(data),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res;

}
export async function getTodasComunicacoesNascimento (token: string) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/comunicacao-nascimento/get-comunicacoes-nascimentos",
        {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res.json();

}

export async function getComunicacoesNascimentoCriador (
    token: string,
    id: string
) {

    const res = await fetch(
        `https://abcpd-backend-production.up.railway.app/comunicacao-nascimento/get-comunicacoes-nascimentos-criador/${id}`,
        {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res.json();

}
