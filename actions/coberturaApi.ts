import AnimalDTO from "@/utils/AnimalDTO";
import ComunicacaoCoberturaDto from "@/utils/CoberturaDTO";

export async function ComunicarCobertura (data: { criadorCobertura: string; fazendaCobertura: string; nomeCobertura: string; observacoes: string; statusCobertura: string; tipoCobertura: string; finalizadoCobertura: boolean; pago: boolean; animais: AnimalDTO[]; }, token: string) {

    const res = await fetch(
        "http://localhost:3001/comunicacao-cobertura/cadastrar-cobertura",
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    ).then((response) => response);

    return res;

}

export async function getAllCoberturas (token: string, id: string) {

    const res = await fetch(
        `http://localhost:3001/comunicacao-cobertura/get-coberturas-criador/${id}`,
        {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
    ).then((response) => response.json());

    return res;

}

export async function getCoberturas (token: string) {

    const res = await fetch(
        "http://localhost:3001/comunicacao-cobertura/get-coberturas",
        {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        }
    ).then((response) => response.json());

    return res;

}

export async function updateComunicCobertura (
    token: string,
    data: ComunicacaoCoberturaDto,
    id: string
) {

    const res = await fetch(
        `http://localhost:3001/comunicacao-cobertura/update-cobertura/${id}`,
        {
            "method": "PUT",
            "body": JSON.stringify(data),
            "headers": {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${token}`
            }
        }
    ).then((response) => response);

    return res;

}
