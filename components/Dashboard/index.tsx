import { Home, animal, animalBlue, arrowLeft, comunic, done, hamb, logo2Branca, logoBranca, user, waiting } from '@/assets'
import {
    Container,
    Menu,
    Content,
    Header,
    Animals,
    Table,
    TableHeader,
    TableContent,
    DropdownMenu,
    RegistroAnimalBase,
    ComunicCobertura,
    InputPlace,
    ComunicNascimento
} from './style'
import Image from "next/image";
import { Button } from '../Button';
import { Text } from '../Text';
import { InputText } from '../InputText';
import { useState } from 'react';
import { motion } from "framer-motion"
import { SelectBox } from '../SelectBox';

export function Dashboard(){
    const [animalPage, setAnimalPage] = useState(false)
    const [initialPage, setInitialPage] = useState(true)
    const [comunicPage, setComunicPage] = useState(false)
    const [animalBasePage, setAnimalBasePage] = useState(false)
    const [comunicCoberturaPage, setComunicCoberturaPage] = useState(false)
    const [comunicNascPage, setComunicNascPage] = useState(false)
    const [menu, setMenu] = useState(true)
    return (
    <Container>
       
        <Menu 
             initial={{width:'20%'}}
             animate={{width:menu? '20%' : '5%'}} 
             transition={{duration:0.5}}
        >
             <motion.div initial={{x:'13vw'}} transition={{duration:0.5}} animate={{x:menu?'13vw':'1.5vw'}}  onClick={()=>{setMenu(!menu)}} style={{width:'100%', display:'flex', marginTop:'1vw'}}>
                    <div style={{ width:'2vw'}}>
                        <Image src={hamb} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                    </div>
            </motion.div>

            <motion.div initial={{x:'0vw'}} transition={{duration:0.7}} animate={{x:menu?'0vw':'-20vw', opacity:menu?1:0}} style={{display:menu?'flex':'none',width:'96%', flexDirection:'column', justifyContent:'center'}}>
                <div style={{paddingTop:'3vw' ,width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{ width:'4vw'}}>
                        <Image src={logo2Branca} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                    </div>

                    <div style={{ width:'10vw'}}>
                        <Image src={logoBranca} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                    </div>
                </div>
                
                <div style={{height:'20vw',display:'flex', justifyContent:'space-between', flexDirection:'column', marginTop:'3vw'}}>
                    <Button widthButton="16vw" widthImage='1.5vw' src={Home} heightButton="3.3vw" onClick={()=>{setInitialPage(true), setAnimalPage(false), setComunicPage(false),setAnimalBasePage(false), setComunicCoberturaPage(false), setComunicNascPage(false)}} colorButton={initialPage?"#032759":'green'} textButton="Pagina Inicial"/>
                    <Button widthButton="16vw" widthImage='1.5vw' src={animal} heightButton="3.3vw" onClick={()=>{setAnimalPage(true), setInitialPage(false), setComunicPage(false),setAnimalBasePage(false), setComunicCoberturaPage(false), setComunicNascPage(false)}} colorButton={animalPage?"#032759":'green'}  textButton="Animais"/>
                    <Button widthButton="16vw" widthImage='1.5vw' src={comunic} heightButton="3.3vw" onClick={()=>{setAnimalPage(false), setInitialPage(false), setComunicPage(true),setAnimalBasePage(false), setComunicCoberturaPage(false), setComunicNascPage(false)}}  colorButton={comunicPage?"#032759":'green'} textButton="Comunicações "/>
                    <DropdownMenu
                        initial={{opacity:0}}
                        animate={{y: comunicPage ? 0 : -50, opacity: comunicPage ? 1 : 0}} 
                        transition={{duration:0.5}}
                        style={{pointerEvents:`${comunicPage? 'auto': 'none'}`}}
                    >                                                               
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={animalBasePage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(true), setComunicCoberturaPage(false), setComunicNascPage(false), setInitialPage(false), setAnimalPage(false)}} colorButton={animalBasePage?"#032759":'white'} textButton="Registrar Animais Base"/>
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={comunicCoberturaPage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(false), setComunicCoberturaPage(true), setComunicNascPage(false),setInitialPage(false), setAnimalPage(false)}} colorButton={comunicCoberturaPage?"#032759":'white'}  textButton="Comunicações de Cobertura"/>
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={comunicNascPage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(false), setComunicCoberturaPage(false), setComunicNascPage(true),setInitialPage(false), setAnimalPage(false)}} colorButton={comunicNascPage?"#032759":'white'}  textButton="Comunicações de Nascimento"/>

                    </DropdownMenu>
                </div>
            </motion.div>
           
            
        </Menu>

        <Content>
            
            <Header>
                <div style={{marginRight:'3vw', display:'flex'}}>
                    <div style={{width:'4vw'}}>
                        <Image src={user} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                    </div>
                    <Text fontFamily="pop" size={"1.5vw"} text="João da Silva Santos" color="black" fontWeight="600"/>
                </div>
                
            </Header>

            <motion.div 
                animate={{y: initialPage ? 0 : -50, opacity: initialPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${initialPage? 'flex': 'none'}`,pointerEvents:`${initialPage? 'auto': 'none'}`,height:'100%', alignItems:'center'}}
            >
                <Text fontFamily="pop" size={"2.5vw"} text="Seja bem vindo" color="black" fontWeight="600"/>
            </motion.div>

            <Animals
                initial={{opacity:0}}
                animate={{y: animalPage ? 0 : -50, opacity: animalPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${animalPage? 'block': 'none'}`,pointerEvents:`${animalPage? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Todos os Animais do Criador" color="black" fontWeight="600"/>

                <div style={{width:'30%'}}>
                    <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="NOME" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="TIPO" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="FAZENDA" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="CRIADOR" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text  textAlign='center' fontFamily="rob" size={"1.1vw"} text="DECISÃO TÉCNICO RGN" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.1vw"} text="DECISÃO TÉCNICO RGD" color="black" fontWeight="400"/>
                        </th>
                    </TableHeader>

                    <TableContent>
                        <td style={{width:'20%'}}>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Base" color="black" fontWeight="400"/>
            
                        </td>
                        <td style={{width:'25%'}}>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Fazenda Boa Vista" color="black" fontWeight="400"/>

                        </td>
                        <td style={{width:'22%'}}>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João da Silva Santos" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Registrado" color="black" fontWeight="400"/>

                        </td>
                        <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Em análise" color="black" fontWeight="400"/>
                        </td>
                    </TableContent>

                    <TableContent>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Base" color="black" fontWeight="400"/>
            
                        </td>
                        <td>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Fazenda Boa Vista" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João da Silva Santos" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} src={done} widthImage='1.5vw' text="Registrado" color="green" fontWeight="400"/>

                        </td>
                        <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} src={waiting} widthImage='1.5vw' text="Em análise" color="black" fontWeight="400"/>
                        </td>
                    </TableContent> 
                    
                </Table>
            </Animals>

            <RegistroAnimalBase
                initial={{opacity:0}}
                animate={{y: animalBasePage ? 0 : -50, opacity: animalBasePage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${animalBasePage? 'flex': 'none'}`,pointerEvents:`${animalBasePage? 'auto': 'none'}`}}
            > 
                <div style={{width:'10vw'}}>
                    <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
                </div>
                <Text text='Solicitação de Registro de Animais Base | ABCPD' fontFamily='pop' fontWeight='700' size='2vw' color='#032759' />
                <Text text='Técnico' fontFamily='rob' fontWeight='400' size='2vw' color='#032759' />
                <SelectBox width='31.5vw'/>

                <Text text='Quantidade de Animais Base' fontFamily='rob' fontWeight='400' size='2vw' color='#032759' />
                <InputText width='30vw' type='number'/>
                <div style={{display:'flex', marginTop:'1vw', justifyContent:'space-between', width:'28%', marginLeft:'10vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                    <Button colorButton='green' heightButton='2vw' textButton='Criar Solicitação' widthButton='13vw' textColor='white'/>
                </div>
            </RegistroAnimalBase>

            <ComunicCobertura
                initial={{opacity:0}}
                animate={{y: comunicCoberturaPage ? 0 : -50, opacity: comunicCoberturaPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${comunicCoberturaPage? 'flex': 'none'}`,pointerEvents:`${comunicCoberturaPage? 'auto': 'none'}`}}
            >
            <div style={{width:'10vw'}}>
                <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
            </div>
            <Text text='Comunicação de Cobertura | ABCPD' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Nome  da Cobertura" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Fazenda de Cobertura" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Animal Reprodutor" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Animal Matriz" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Tipo de Cobertura" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Data de Cobertura" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Observações" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <div style={{display:'flex', marginTop:'1vw', justifyContent:'space-between', width:'28%', marginLeft:'34vw', marginBottom:'10vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                    <Button colorButton='green' heightButton='2vw' textButton='Fazer pagamento' widthButton='13vw' textColor='white'/>
            </div>
            </ComunicCobertura>


            <ComunicNascimento
                initial={{opacity:0}}
                animate={{y: comunicNascPage ? 0 : -50, opacity: comunicNascPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${comunicNascPage? 'block': 'none'}`,pointerEvents:`${comunicNascPage ? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Todos os Animais do Criador" color="black" fontWeight="600"/>

                <div style={{width:'30%'}}>
                    <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Data da Comunicação" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Reprodutor" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Matriz" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Tipo de Cobertura" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text  textAlign='center' fontFamily="rob" size={"1.1vw"} text="Status" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.1vw"} text="Opções" color="black" fontWeight="400"/>
                        </th>
                    </TableHeader>

                    <TableContent>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="15 de Março de 2023 " color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Benedito" color="black" fontWeight="400"/>
            
                        </td>
                        <td>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="JMonta Natural" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} src={done} widthImage='1.5vw' text="Registrado" color="green" fontWeight="400"/>

                        </td>
                        <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} src={waiting} widthImage='1.5vw' text="Em análise" color="black" fontWeight="400"/>
                        </td>
                    </TableContent> 
                    
                </Table>

                <div style={{display:'flex', marginTop:'15vw', justifyContent:'space-between', width:'30%', marginLeft:'54vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                    <Button colorButton='green' heightButton='2vw' textButton='Comunicar Nascimento' widthButton='15vw' textColor='white'/>
                </div>
            </ComunicNascimento>
        </Content>

    </Container>
    )
}