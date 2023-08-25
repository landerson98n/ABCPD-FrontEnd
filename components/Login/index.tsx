import React from "react";
import Image from "next/image";

import { logo, logo2 } from "@/assets";
import {
    Container
} from './style'
import { Button } from "../Button";
import { Poppins } from 'next/font/google'
import { InputText } from "../InputText";

const poppins = Poppins({weight:['300'], subsets:['latin']})

export function Login(){
    return (
       <Container>
            <div style={{width:'100%', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                <div style={{ width:'4vw', height:'3vw'}}>
                    <Image src={logo} alt="Logo" layout='responsive' objectFit='contain' />
                </div>

                <div style={{ width:'12vw', height:'6vw'}}>
                    <Image src={logo2} alt="Logo" layout='responsive' objectFit='contain' />
                </div>
            </div>

            <div style={{marginTop:'2vw',height:'20vw',display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'space-between'}}>
                <InputText placeholder="E-mail"/>
                <InputText placeholder="Senha"/>
                <a href="#" style={{marginTop:'-2vw',fontSize:'1.1vw', width:'100%', justifyContent:'end', display:'flex'}} className={poppins.className}>Esqueceu a senha?</a>
                <Button widthButton="20vw" heightButton="3.3vw" colorButton="green" textButton="Entrar"/>
            </div>
            
       </Container>
    )
}