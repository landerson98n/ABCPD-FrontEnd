import React from "react";
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
    TextBox
} from './style'
import { Header } from "../Header/Header";
import { Button } from "../Button";
import { InputText } from "../InputText";
import { WhiteBackground } from "../WhiteBackground";
import { SelectBox } from "../SelectBox";

export function Register(){
    return (
       <Container>
        <Header page="Register" />
        <GreenBackground/>
        {/* <ScreenOne>
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
                                    <Text fontFamily="pop" size={"1.5vw"} text="Senha" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                            
                            <InputPair>
                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="E-mail" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                                

                                <InputPlace>
                                    <Text fontFamily="pop" size={"1.5vw"} text="Confirmar Senha" color="black" fontWeight="300"/>
                                    <InputText placeholder=""/>
                                </InputPlace>
                            </InputPair>
                            
                            
                        </InputData>

                    </Content>     
                </WhiteBackground> 
            </RegisterPainel>
            
            <ButtonPanel style={{marginTop:'66.5vw'}}>
                <GrayBackground>
                    <Button widthButton="80%" heightButton="6vw" colorButton="green" textButton="Continuar"/>
                </GrayBackground>
            </ButtonPanel>
        </ScreenOne> */}
        
        {/* <ScreenTwo>
            <RegisterPainel>
                <WhiteBackground width="80%" height="70vw">
                    <Content>
                        <Button widthButton="10%" heightButton="3vw" colorButton="black" textButton="←  Voltar"/>

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
            <ButtonPanel style={{marginTop:'79vw'}}>
                <GrayBackground>
                    <Button widthButton="80%" heightButton="6vw" colorButton="green" textButton="Continuar"/>
                </GrayBackground>
            </ButtonPanel>
        </ScreenTwo> */}

        <ScreenThree>
            <RegisterPainel>
                <WhiteBackground width="80%" height="200vw">
                    <Content>
                        <Button widthButton="10%" heightButton="3vw" colorButton="black" textButton="←  Voltar"/>

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

            <ButtonPanel style={{marginTop:'144vw'}}>
                <GrayBackground>
                    <Button widthButton="80%" heightButton="6vw" colorButton="green" textButton="Continuar"/>
                </GrayBackground>
            </ButtonPanel>

        </ScreenThree>
        
            
            
       </Container>
    )
}