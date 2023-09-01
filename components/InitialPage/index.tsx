import React from "react";
import Image from "next/image";
import { vaca, gado, touros, logo2Branca, logoBranca, social } from "@/assets";
import {Text} from '../Text'
import {
    Container,
    About,
    GreenBackground,
    AboutSecond
} from './style'
import { Header } from "../Header/Header";
import { Login } from "..";
import { Button } from "../Button";


export function InitialPage(){
    return (
       <Container>
        <Header page="Home"/>
        <div style={{position:'relative', width:'100%', height:'50vw'}}>
            <Image src={gado} alt="Foto de gado" layout='fill' objectFit='cover' />
        </div>
        <Login/>
        <About>
            <div style={{ display: 'flex',paddingRight:'10vw', paddingLeft:'10vw', height:"40vw"}}>
                <Image src={touros} alt="Foto de gado"  objectFit='cover' layout="responsive"/>
                <div style={{marginLeft:'4vw'}}>
                    <Text fontFamily="pop" size={"1.3vw"} text={"Entenda Como Fazemos Isso"} color="green" fontWeight="200"/>
                    <Text fontFamily="pop" size={"1.8vw"} text={"PRESERVAÇÃO E CONTROLE DA RAÇA PÉ-DURO"} color="black" fontWeight="600"/>
                    <Text fontFamily="rob" size={"1.8vw"} text={"A Associação Brasileira de Criadores de Bovinos Curraleiro Pé-Duro (ABCPD), Localizada em Teresina, no estado do Piauí tem como objetivo promover e preservar a raça Curraleiro Pé-Duro, oferecendo suporte técnico aos criadores e estimulando práticas de criação responsáveis e sustentáveis. Sua localização estratégica em Teresina, permite atender os criadores da região e contribuir para o fortalecimento e desenvolvimento da raça bovina Curraleiro Pé-Duro."} color="black" fontWeight="400"/>
                </div>
            </div>
            
        </About>

        <GreenBackground>
            <div style={{marginLeft:'10vw', width:'30vw'}}>
                    <Text fontFamily="pop" size={"1.8vw"} text={"A confiança dos nossos clientes é o mais importante."} color="white" fontWeight="600"/>
                    <Text fontFamily="pop" size={"1.4vw"} text={"Veja alguns depoimentos:"} color="white" fontWeight="200"/>
            </div>
            <div style={{height:'30vw', width:'45vw', marginRight:'10vw', marginTop:'4vw'}}>
                <Image src={social} alt="Foto de gado"  objectFit='cover' layout="responsive"/>
            </div>
        </GreenBackground>

    
        <AboutSecond>
            <div style={{ display: 'flex',paddingRight:'10vw', paddingLeft:'10vw', height:'50vw'}}>
                <div style={{marginRight:'4vw'}}>
                    <Text fontFamily="pop" size={"1.3vw"} text={"Entenda Como Fazemos Isso"} color="green" fontWeight="200"/>
                    <Text fontFamily="pop" size={"1.8vw"} text={"PRESERVAR A RAÇA CURRALEIRO PÉ-DURO"} color="black" fontWeight="600"/>
                    <Text fontFamily="rob" size={"1.8vw"} text={"A criação de uma plataforma online permite a organização de todas as atividades relacionadas ao registro de fazendas, animais, nascimentos e cadastros de técnicos. Com essa centralização, torna-se mais eficiente e prático o acesso às informações necessárias, permitindo que você se concentre no crescimento do seu negócio, enquanto lidamos com as tarefas tediosas de registro e organização."} color="black" fontWeight="400"/>
                    <Button widthButton="20vw" heightButton="3.3vw" colorButton="green" textButton="Registre-se"/>
                </div>
                <Image src={vaca} alt="Foto de gado" height={500} objectFit='cover' layout="responsive"/>
            </div>
        </AboutSecond>


        <GreenBackground>
            <div style={{display:'flex', width:'40vw', alignItems:'initial', flexDirection:'column', paddingLeft:'10vw'}}>
                    <Text fontFamily="rob" size={"1.5vw"} text="Login" color="white" fontWeight="300"/>
                    <Text fontFamily="rob" size={"1.5vw"} text="Sobre" color="white" fontWeight="300"/>
                    <Text fontFamily="rob" size={"1.5vw"} text="Endereço" color="white" fontWeight="300"/>
                    <Text fontFamily="rob" size={"1.5vw"} text="Telefone" color="white" fontWeight="300"/>
            </div>

            <div style={{paddingLeft:'4vw',paddingRight:'10vw',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{width:'6vw', height:'6vw'}}>
                    <Image src={logo2Branca} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>

                <div style={{ width:'15vw', height:'6vw'}}>
                    <Image src={logoBranca} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                
            </div>
        </GreenBackground>
       </Container>
    )
}