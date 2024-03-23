export async function getUserCPFEmail (data: string) {

    const response = await fetch(
        `https://abcpd-backend-production.up.railway.app/user/getUserByEmailCpf/${data}`,
        {
            "method": "GET"
        }
    );
    return response.json();

}

export async function getUserById (data: string, token: string) {

    const response = await fetch(
        `https://abcpd-backend-production.up.railway.app/user/getUserById/${data}`,
        {
            "method": "GET",
            "headers": {"Authorization": `Bearer ${token}`}
        }
    );
    const resJson = await response.json();

    return resJson;

}

export async function getAllUsers (token: string) {

    const response = await fetch(
        "https://abcpd-backend-production.up.railway.app/user/getUsers/",
        {
            "method": "GET",
            "headers": {"Authorization": `Bearer ${token}`}
        }
    );
    return response.json();

}
