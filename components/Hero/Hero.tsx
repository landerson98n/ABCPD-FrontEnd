import React from "react";
import Image from "next/image";
import { gado } from "@/assets";
import {
    Container
} from './style'
import { Header } from "../Header/Header";

export function Hero(){
    return (
       <Container>
        <Header/>
        <div style={{position:'relative', width:'100%', height:'100vh'}}>
         <Image src={gado} alt="Foto de gado" layout='fill' objectFit='cover' />
        </div>
       </Container>
    )
}