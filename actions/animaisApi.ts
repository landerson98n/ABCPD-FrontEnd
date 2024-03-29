/* eslint-disable no-empty */
"use client";
import AnimalDTO from "@/utils/AnimalDTO";

export async function getAnimaisByCriadorId (criadorId: string, token: string) {

    const res = await fetch(
        `https://abcpd-backend-production.up.railway.app/animal/get-animal-criador/${criadorId}`,
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return res.json();

}

export async function getAnimaisCriador (token: string) {

    const res = await fetch(
        "https://abcpd-backend-production.up.railway.app/animal/get-animal-criador",
        {
            "headers": {
                "Authorization": `Bearer ${token}`
            },
            "method": "GET"
        }
    );

    return res.json();

}

export async function CreateAnimal (data: AnimalDTO, token: string) {

    try {

        const res = await fetch(
            "https://abcpd-backend-production.up.railway.app/animal/cadastrar-animal",
            {
                "method": "POST",
                "body": JSON.stringify(data),
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return res;

    } catch (Error) {}

}

export async function getTodosAnimais (token: string) {

    try {

        const res = await fetch(
            "https://abcpd-backend-production.up.railway.app/animal/get-animal",
            {
                "method": "GET",
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return res.json();

    } catch (Error) {}

}

export async function updateAnimal (data: AnimalDTO, token: string, id: string) {

    try {

        const res = await fetch(
            `https://abcpd-backend-production.up.railway.app/animal/update-animal/${id}`,
            {
                "method": "PUT",
                "body": JSON.stringify(data),
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return res.json();

    } catch (Error) {}

}

export async function getAnimalById (id: string) {

    try {

        const res = await fetch(
            `https://abcpd-backend-production.up.railway.app/animal/get-animal/${id}`,
            {
                "method": "GET",
                "headers": {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return res.json();

    } catch (Error) {}

}
