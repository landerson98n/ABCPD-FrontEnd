"use client";
import {CadastrarFazenda} from "@/components";

export default function Fazenda ({params}: { params: { token: string } }) {

    return <CadastrarFazenda token={params.token} />;

}
