const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function LoginAPI (data: { email: string; senha: string }) {

    const res = await fetch(
        "http://localhost:3001/auth/login",
        {
            "method": "POST",
            "body": JSON.stringify(data),
            "headers": {"Content-type": "application/json; charset=UTF-8"}
        }
    );

    return res.json();

}
