import PaymentDTO from "@/utils/PaymentDTO";

export async function PaymentAPI (data: PaymentDTO, id: string, token: string) {

    const res = await fetch(
        `https://abcpd-backend.onrender.com/criador/payment/${id}`,
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
