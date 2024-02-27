export async function allTecnicos (token: string) {

    const response = await fetch(
        "https://abcpd-backend.onrender.com/tecnico/get-tecnicos",
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return response.json();

}

export async function getTecnicos (token: string) {

    const response = await fetch(
        "https://abcpd-backend.onrender.com/tecnico/get-tecnicos",
        {
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
            "method": "GET"
        }
    );

    return response.json();

}

export async function getTecnicoEmail (token: string, id: string) {

    const response = await fetch(
        `https://abcpd-backend.onrender.com/tecnico/get-tecnico-email/${id}`,
        {
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
            "method": "GET"
        }
    );

    return response.json();

}

export async function cadastrarTecnico (token: string, data: { dateJoined: string; nomePrimeiro: any; nomeUltimo: any; email: any; cpf: any; username: any; senha: string; telefone: any; ultimaConexao: string; cep: any; nomeBairro: any; nomeCidade: any; nomeCompleto: any; nomeEstado: any; nomeRua: any; rg: any; numeroCasa: any; }) {

    const response = await fetch(
        "https://abcpd-backend.onrender.com/tecnico/cadastrar-tecnico",
        {
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
            "body": JSON.stringify(data),
            "method": "POST"
        }
    );

    return response.json();

}
