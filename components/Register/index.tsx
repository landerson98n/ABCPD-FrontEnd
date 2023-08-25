import React, { useState } from "react";
import {Text} from '../Text'
import {
    Container,
    GreenBackground,
    RegisterPainel,
    Title,
    InputData,
    Content,
    InputPlace,
    InputPair,
    ButtonPanel,
    GrayBackground,
    ScreenOne,
    ScreenTwo,
    ScreenThree,
    TitleContent,
    TextBox,
    Payment,
    CreditCard
} from './style'
import { Header } from "../Header/Header";
import { Button } from "../Button";
import { InputText } from "../InputText";
import { WhiteBackground } from "../WhiteBackground";
import { boleto, card, cartao, logo, logo2, pix } from "@/assets";
import Image from "next/image";

export function Register(){
    const [pageOneX, setPageOneX] = useState(false)
    const [pageTwoX, setPageTwoX] = useState(false)
    const [pageThreeX, setPageThreeX] = useState(false)
    const [paymentX, setPaymentX] = useState(false)
    return (
       <Container style={{backgroundColor: pageThreeX ? 'white' : '#E0E0E0', height: pageThreeX ? '40vw' :  ""}}>
        <Header page="Register" />
        <GreenBackground style={{display: pageThreeX ? 'none' : ''}}/>

        <ScreenOne 
        animate={{x: pageOneX ? -1400 : 0}} 
        transition={{duration:1}}
        >
            <RegisterPainel>
                <WhiteBackground width="80%" height="45vw">
                    <Content>
                        <Button widthButton="10%" heightButton="3vw" colorButton="black" textButton="←  Voltar"/>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Registre-se" color="black" fontWeight="600"/>
                        </Title>

                        <InputData>

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Nome Completo" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="E-mail" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="email"/>
                                </InputPlace>
                                
                            </InputPair>
                            
                            <InputPair>
                                
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Senha" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="password"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Confirmar Senha" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="password"/>
                                </InputPlace>
                            </InputPair>
                            
                            
                        </InputData>

                    </Content>     
                </WhiteBackground> 
            </RegisterPainel>
            
            <ButtonPanel style={{marginTop:'51.5vw'}}>
                <GrayBackground>
                    <Button onClick={()=>{setPageOneX(!pageOneX)}} widthButton="80%" heightButton="6vw" colorButton="green" textButton="Continuar"/>
                </GrayBackground>
            </ButtonPanel>
        </ScreenOne>
        
        <ScreenTwo
            initial={{x:  1400}}
            animate={{x: pageTwoX ? -1400  : pageOneX ? 0 : 1400}} 
            transition={{duration:1}}
          
        >
            <RegisterPainel>
                <WhiteBackground width="80%" height="60vw">
                    <Content>
                        <Button  onClick={()=>{setPageOneX(!pageOneX)}}  widthButton="10%" heightButton="3vw" colorButton="black" textButton="←  Voltar"/>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Informações Pessoais" color="black" fontWeight="600"/>
                        </Title>

                        <InputData>

                            <InputPair>
                                <InputPlace>
                                    <TitleContent>
                                        <Text fontFamily="pop" size={"1.5vw"} text="CPF/CNPJ" color="black" fontWeight="300"/>
                                        <Text fontFamily="pop" size={"1vw"} text="(Somente números)" color="gray" fontWeight="300"/>
                                    </TitleContent>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                
                                <InputPlace>
                                    <TitleContent style={{width:'40%'}}>
                                        <Text fontFamily="pop" size={"1.5vw"} text="RG" color="black" fontWeight="300"/>
                                        <Text fontFamily="pop" size={"1vw"} text="(Somente números)" color="gray" fontWeight="300"/>
                                    </TitleContent>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                            
                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Endereço" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bairro" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Cidade" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Estado" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                            

                            <InputPair>
                                <InputPlace>
                                    <TitleContent style={{width:'40%'}}>
                                        <Text fontFamily="pop" size={"1.5vw"} text="CEP" color="black" fontWeight="300"/>
                                        <Text fontFamily="pop" size={"1vw"} text="(Somente números)" color="gray" fontWeight="300"/>
                                    </TitleContent>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                
                                <InputPlace>
                                    <TitleContent style={{width:'50%'}}>
                                        <Text fontFamily="pop" size={"1.5vw"} text="Telefone" color="black" fontWeight="300"/>
                                        <Text fontFamily="pop" size={"1vw"} text="(Somente números)" color="gray" fontWeight="300"/>
                                    </TitleContent>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                            
                        </InputData>

                    </Content>     
                </WhiteBackground> 
            </RegisterPainel>

            <ButtonPanel style={{marginTop:'59vw'}}>
                <GrayBackground>
                    <Button onClick={()=>{setPageTwoX(!pageTwoX)}} widthButton="80%" heightButton="6vw" colorButton="green" textButton="Continuar"/>
                </GrayBackground>
            </ButtonPanel>
        </ScreenTwo>

        <ScreenThree
            initial={{x:  1400}}
            animate={{x: pageThreeX ? -1400  : pageTwoX ? 0 : 1400}} 
            transition={{duration:1}}
            
        >
            <RegisterPainel>
                <WhiteBackground width="80%" height="200vw">
                    <Content>
                        <Button onClick={()=>{setPageTwoX(!pageTwoX)}} widthButton="10%" heightButton="3vw" colorButton="black" textButton="←  Voltar"/>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Fazendas" color="black" fontWeight="600"/>
                        </Title>

                        <InputData>

                            <InputPair>
                                <InputPlace>
                                    <TitleContent>
                                        <Text fontFamily="pop" size={"1.5vw"} text="Nome da fazenda" color="black" fontWeight="300"/>
                                    </TitleContent>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                
                                <InputPlace>
                                    <TitleContent style={{width:'50%'}}>
                                        <Text fontFamily="pop" size={"1.5vw"} text="Telefone" color="black" fontWeight="300"/>
                                        <Text fontFamily="pop" size={"1vw"} text="(Somente números)" color="gray" fontWeight="300"/>
                                    </TitleContent>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                            
                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Área" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Municipio" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                                   
                        </InputData>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Registro do Gado da Raça Pé-Duro:" color="black" fontWeight="600"/>
                        </Title>

                        <InputData>
                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bois de 0 a 4 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bois de 5 a 12 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>
                            </InputPair>

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bois de 13 a 24 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bois de 25 a 36 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>
                            </InputPair>

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bois de 37 a + Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Vacas de 0 a 4 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>
                        
                            </InputPair>

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Bois de 37 a + Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Vacas de 0 a 4 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>
                        
                            </InputPair>

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Vacas de 5 a 12 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Vacas de 13 a 24 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>
                        
                            </InputPair>   

                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Vacas de 25 a 36 Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Vacas de 37 a + Meses" color="black" fontWeight="300"/>
                                    <InputText placeholder="" type="number"/>
                                </InputPlace>
                        
                            </InputPair>    
                        </InputData>
                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Marca" color="black" fontWeight="600"/>
                        </Title>

                        <InputPlace>
                            <Text fontFamily="pop" size={"1.5vw"} text="Marca" color="black" fontWeight="300"/>
                            <InputText placeholder=""/>
                        </InputPlace>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Como chegar" color="black" fontWeight="600"/>
                        </Title>
                        <TextBox/>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Cria Outras Espécies/Raças Nativas/Adaptativas?" color="black" fontWeight="600"/>
                        </Title>
                        <TextBox/>

                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Observações" color="black" fontWeight="600"/>
                        </Title>
                        <TextBox/>

                        <Button widthButton="30%" heightButton="3vw" colorButton="#032759" textButton="+ Adicionar outra fazenda"/>

                    </Content>     
                </WhiteBackground> 
            </RegisterPainel>

            <ButtonPanel style={{marginTop:'129vw'}}>
                <GrayBackground>
                    <Button onClick={()=>{setPageThreeX(!pageThreeX)}} widthButton="80%" heightButton="6vw" colorButton="green" textButton="Continuar"/>
                </GrayBackground>
            </ButtonPanel>

        </ScreenThree>
        
        <Payment
            initial={{x:  1400}}
            animate={{x: paymentX ? -1400  : pageThreeX ? 0 : 1400}} 
            transition={{duration:1}}
        >

            <RegisterPainel>
                <WhiteBackground width="80%" height="100vw">
                    <Content>
                        <Button onClick={()=>{setPageTwoX(!pageTwoX)}} widthButton="10%" heightButton="3vw" colorButton="black" textButton="← "/>
                        <div style={{marginLeft:'8vw'}}>
                        <Title>
                            <Text fontFamily="pop" size={"2vw"} text="Pagamento" color="black" fontWeight="600"/>
                        </Title>

                        <Title>
                            <Text fontFamily="rob" size={"2vw"} text="Selecione um método de pagamento" color="black" fontWeight="400"/>
                        </Title>


                        <CreditCard>
                            <div>
                                <InputPair style={{width:'72%'}}>
                                    <InputText width="2vw" type="radio"/>
                                    <div style={{width:'5vw'}}>
                                        <Image src={cartao} alt="cartao" layout='responsive' objectFit='contain' />
                                    </div>
                                    <Text fontFamily="pop" size={"1.4vw"} text="Cartão Credito/Debito" color="black" fontWeight="600"/>
                                </InputPair>

                                <div style={{width:'25vw', marginTop:'2vw', marginLeft:'5vw'}}>
                                    <Image src={card} alt="cartao" layout='responsive' objectFit='contain' />
                                </div>

                                <Title style={{marginLeft:'5vw'}}>
                                    <Text fontFamily="pop" size={"2vw"} text="Adicionar Cartão" color="black" fontWeight="600"/>
                                </Title>

                                <div style={{marginLeft:'5vw', width:'50%'}}>
                                    <InputPlace style={{width:'100%'}}>
                                            <Text fontFamily="pop" size={"1.5vw"} text="Nome do titular" color="black" fontWeight="300"/>
                                            <InputText borderLeft="none" borderRight="none" borderTop="none" border="solid 0.2vw #F5F5F5"/>
                                    </InputPlace>
                                        
                                    <InputPlace style={{width:'100%'}}>
                                            <Text fontFamily="pop" size={"1.5vw"} text="Número do cartão" color="black" fontWeight="300"/>
                                            <InputText borderLeft="none" borderRight="none" borderTop="none" border="solid 0.2vw #F5F5F5"/>
                                    </InputPlace>

                                    <InputPair>
                                        <InputPlace >
                                            <TitleContent style={{width:'40%'}}>
                                                <Text fontFamily="pop" size={"1.5vw"} text="Validade" color="black" fontWeight="300"/>
                                            </TitleContent>
                                            <InputText borderLeft="none" borderRight="none" borderTop="none" border="solid 0.2vw #F5F5F5"/>
                                        </InputPlace>
                                        
                                        <InputPlace>
                                            <TitleContent style={{width:'50%'}}>
                                                <Text fontFamily="pop" size={"1.5vw"} text="CVV" color="black" fontWeight="300"/>
                                            </TitleContent>
                                            <InputText borderLeft="none" borderRight="none" borderTop="none" border="solid 0.2vw #F5F5F5"/>
                                        </InputPlace>
                                    </InputPair>
                                </div>
                            </div>

                            <WhiteBackground alignItems="normal" padding='3vw' boxShadow='0.1vw 0.1vw 0.6vw black' width="40%" height="15vw">
                                <div style={{width:'100%',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                                    <InputPair style={{alignItems:'center'}}>
                                        <div style={{width:'20%', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                                            <div style={{ width:'3vw'}}>
                                                <Image src={logo} alt="Logo" layout='responsive' objectFit='contain' />
                                            </div>

                                            <div style={{ width:'7vw'}}>
                                                <Image src={logo2} alt="Logo" layout='responsive' objectFit='contain' />
                                            </div>
                                        </div> 

                                        <TitleContent style={{width:'70%'}}>
                                            <Text fontFamily="pop" size={"1vw"} text="Pagamento da Taxa de Inscrição" color="black" fontWeight="600"/>
                                        </TitleContent>
                                    </InputPair>
                                    

                                    <InputPair>
                                        <TitleContent style={{width:'80%'}}>
                                            <Text fontFamily="pop" size={"1.2vw"} text="Taxa de Inscrição" color="black" fontWeight="600"/>
                                        </TitleContent>

                                        <TitleContent style={{width:'40%', marginLeft:'8vw'}}>
                                                <Text fontFamily="pop" size={"1.2vw"} text="R$ 10,00" color="black" fontWeight="600"/>
                                        </TitleContent>
                                    </InputPair>

                                <Button onClick={()=>{}} widthButton="100%" heightButton="3vw" colorButton="green" textButton="Confirmar Pagamento"/>

                                </div>         
                            </WhiteBackground>
                        </CreditCard>
                        

                        <InputPair style={{width:'20.5%'}}>
                            <InputText width="2vw" type="radio"/>
                            <div style={{width:'5vw'}}>
                                <Image src={pix} alt="pix" layout='responsive' objectFit='contain' />
                            </div>
                            <Text fontFamily="pop" size={"2vw"} text="PIX" color="black" fontWeight="600"/>
                        </InputPair>

                        <InputPair style={{width:'24.5%'}}>
                            <InputText width="2vw" type="radio"/>
                            <div style={{width:'5vw'}}>
                                <Image src={boleto} alt="boleto" layout='responsive' objectFit='contain' />

                            </div>
                            <Text fontFamily="pop" size={"2vw"} text="Boleto" color="black" fontWeight="600"/>
                        </InputPair>
                        
                        </div>
                        
                    </Content>     
                </WhiteBackground> 
            </RegisterPainel>
        </Payment>
        
            
       </Container>
    )
}