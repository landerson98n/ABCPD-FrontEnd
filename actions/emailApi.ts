export async function sendEmail (
    data: { to: string; subject: string },
    token: string
) {

    const res = await fetch(
        "https://abcpd-backend.onrender.com/user/sendEmail",
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
