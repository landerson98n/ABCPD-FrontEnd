import {SolicitacaoRegistroAnimalBaseDTO} from "@/utils/SolicitacaoDTO";

export async function registrarAnimaisBase (
    data: SolicitacaoRegistroAnimalBaseDTO,
    token: string
) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/animal-base/solicitacao-registro-animal-base",
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res.json();

}

export async function updateAnimaisPA (
    data: SolicitacaoRegistroAnimalBaseDTO,
    token: string,
    id: string
) {

    const res = await fetch(
        `https://abcpd-backend-production.up.railway.app/animal-base/update-solicitacao-registro-animal-base/${id}`,
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res.json();

}

export async function getRegistrosAnimalBase (token: string) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/animal-base/get-solicitacoes-registros-animais-base",
        {
            "method": "GET",
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return res;

}
