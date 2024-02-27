"use client";
import {CadastrarRebanho} from "@/components";

export default function CriadorPage ({params}: { params: { token: string } }) {

    return <CadastrarRebanho token={params.token} />;

}
