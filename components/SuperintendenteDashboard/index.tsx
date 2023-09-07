import { Home, add, animal, animalBlue, arrowLeft, boi, comunic, group, hamb, logo2Branca, logoBranca, search, seta, user, waiting } from '@/assets'
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
    InputPlace,
    ComunicNascimento,
    VerComunicNascimento,
    VerAnimals,
    InputPair,
    ComunicCobertura,
    VerComunicCobertura,
    UsersPage,
    UserRegister
} from './style'
import Image from "next/image";
import { Button } from '../Button';
import { Text } from '../Text';
import { InputText } from '../InputText';
import { useState } from 'react';
import { motion } from "framer-motion"

export function SuperintendenteDashboard(){
    const [animalPage, setAnimalPage] = useState(false)
    const [tecnicoPage, setTecnicoPage] = useState(false)
    const [criadorPage, setCriadorPage] = useState(false)
    const [verAnimalPage, setVerAnimalPage] = useState(false)
    const [verAnimaRGDPage, setVerAnimalRGDPage] = useState(false)
    const [verAnimaisCriador, setVerAnimaisCriador] = useState(false)
    const [initialPage, setInitialPage] = useState(true)
    const [comunicPage, setComunicPage] = useState(false)
    const [usersPage, setUsersPage] = useState(false)
    const [animalBasePage, setAnimalBasePage] = useState(false)
    const [RGD, setRGD] = useState(false)
    const [comunicNascPage, setComunicNascPage] = useState(false)
    const [comunicCoberPage, setComunicCoberPage] = useState(false)
    const [todasComunicNascPage, setTodasComunicNascPage] = useState(false)
    const [verComunicNascPage, setVerComunicNascPage] = useState(false)
    const [solicitacao, setSolicitacao] = useState(false)
    const [verComunicCoberPage, setVerComunicCoberPage] = useState(false)
    const [criadorRegister, setCriadorRegister] = useState(false)
    const [tecnicoRegister, setTecnicoRegister] = useState(false)
    const [menu, setMenu] = useState(true)

    return (
    <Container>
       
        <Menu 
             initial={{width:'20%'}}
             animate={{width:menu? '20%' : '5%'}} 
             transition={{duration:0.5}}
        >
             <motion.div initial={{x:'13vw'}} transition={{duration:0.5}} animate={{x:menu?'13vw':'1.5vw'}}  onClick={()=>{setMenu(!menu)}} style={{width:'100%', display:'flex', marginTop:'1vw'}}>
                    <div style={{ width:'2vw', cursor:'pointer'}}>
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
                    <Button widthButton="16vw" widthImage='1.5vw' src={Home} heightButton="3.3vw" onClick={()=>{setInitialPage(true), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false),setUsersPage(false)   , setComunicPage(false),setAnimalBasePage(false), setRGD(false), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false),setUsersPage(false)   }} colorButton={initialPage?"#032759":'green'} textButton="Pagina Inicial"/>
                    <Button widthButton="16vw" widthImage='1.5vw' src={animal} heightButton="3.3vw" onClick={()=>{setAnimalPage(!animalPage), setInitialPage(false), setComunicPage(false),setAnimalBasePage(false), setRGD(false), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false),setUsersPage(false)   }} colorButton={animalPage?"#032759":'green'}  textButton="Animais"/>
                    <Button widthButton="16vw" widthImage='1.5vw' src={group} heightButton="3.3vw" onClick={()=>{setUsersPage(!usersPage), setInitialPage(false), setComunicPage(false),setAnimalBasePage(false), setRGD(false), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false)   }} colorButton={usersPage?"#032759":'green'}  textButton="Usuários"/>
                    <Button widthButton="16vw" widthImage='1.5vw' src={comunic} heightButton="3.3vw" onClick={()=>{setAnimalPage(false), setInitialPage(false), setComunicPage(!comunicPage),setAnimalBasePage(false), setRGD(false), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false),setUsersPage(false)   }}  colorButton={comunicPage?"#032759":'green'} textButton="Comunicações "/>
                    <Button widthButton="16vw" widthImage='1.5vw' src={comunic} heightButton="3.3vw" onClick={()=>{setSolicitacao(!solicitacao),setAnimalPage(false), setInitialPage(false), setComunicPage(false),setAnimalBasePage(false), setRGD(false), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false)}}  colorButton={solicitacao?"#032759":'green'} textButton="Solicitações "/>
                    
                    <DropdownMenu
                        initial={{opacity:0}}
                        animate={{y: animalPage ? '-9.5vw' : '-15vw', opacity: animalPage ? 1 : 0}} 
                        transition={{duration:0.5}}
                        style={{pointerEvents:`${animalPage? 'auto': 'none'}`}}
                    >                                                               
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={animalBasePage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(false), setRGD(true), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false),  setInitialPage(false), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false)}} colorButton={animalBasePage?"#032759":'white'} textButton="RGD"/>
                       
                    </DropdownMenu>
                    
                    <DropdownMenu
                        initial={{opacity:0}}
                        animate={{y: comunicPage ?'-6vw' : '-12vw', opacity: comunicPage ? 1 : 0}} 
                        transition={{duration:0.5}}
                        style={{pointerEvents:`${comunicPage? 'auto': 'none'}`}}
                    >                                                               
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={comunicNascPage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(false), setRGD(false), setComunicNascPage(true),setInitialPage(false), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false),setUsersPage(false)   }} colorButton={comunicNascPage?"#032759":'white'}  textButton="Comunicações de Nascimento"/>
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={comunicCoberPage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setComunicCoberPage(true),setAnimalBasePage(false), setRGD(false), setComunicNascPage(false),setInitialPage(false), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false), setSolicitacao(false),setVerComunicCoberPage(false)}} colorButton={comunicCoberPage?"#032759":'white'}  textButton="Comunicações de Cobertura"/>

                    </DropdownMenu>

                    <DropdownMenu
                        initial={{opacity:0}}
                        animate={{y: usersPage ? '-16vw' : '-20vw', opacity: usersPage ? 1 : 0}} 
                        transition={{duration:0.5}}
                        style={{pointerEvents:`${usersPage? 'auto': 'none'}`}}
                    >                                                               
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={tecnicoPage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(false),setCriadorRegister(false), setRGD(false), setTecnicoPage(true), setComunicNascPage(false),setCriadorPage(false),setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false),  setInitialPage(false), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false)}} colorButton={tecnicoPage?"#032759":'white'} textButton="Tecnicos"/>
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={criadorPage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setTecnicoRegister(false),setAnimalBasePage(false), setRGD(false),setTecnicoPage(false),setCriadorPage(true), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false),  setInitialPage(false), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false)}} colorButton={criadorPage?"#032759":'white'} textButton="Criadores"/>

                    </DropdownMenu>
                    
                    <DropdownMenu
                        initial={{opacity:0}}
                        animate={{y: solicitacao ? '-16vw' : '-20vw', opacity: solicitacao ? 1 : 0}} 
                        transition={{duration:0.5}}
                        style={{pointerEvents:`${solicitacao? 'auto': 'none'}`}}
                    >                                                               
                        <Button marginRightImage='0.6vw' marginLeftImage={'0.6vw'} textSize='0.9vw' textColor={animalBasePage?'white':"#032759"} widthButton="100%" widthImage='0.5vw' src={arrowLeft} heightButton="3.3vw" onClick={()=>{setAnimalBasePage(true), setRGD(false), setComunicNascPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false),  setInitialPage(false), setAnimalPage(false), setVerComunicNascPage(false),setVerAnimalPage(false),setVerAnimalRGDPage(false)}} colorButton={animalBasePage?"#032759":'white'} textButton="Solicitações Animais Base"/>
                       
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
                <Text fontFamily="pop" size={"1.5vw"} text="Todos os Animais que Precisam do Resgistro | ABCPD" color="black" fontWeight="600"/>

                <div style={{width:'30%'}}>
                    <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Nome" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Criador" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Fazenda" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Decisão RGN do Superintendente" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Opções" color="black" fontWeight="400"/>

                        </th>
                        
                    </TableHeader>

                    <TableContent>
                        <td style={{width:'20%'}}>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João da Silva Santos" color="black" fontWeight="400"/>
            
                        </td>
                        <td style={{width:'25%'}}>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Fazenda Boa Vista" color="black" fontWeight="400"/>

                        </td>

                        <td style={{width:'25%'}}>
                        <Text widthImage='1.5vw' src={waiting}  textAlign='center' fontFamily="rob" size={"1vw"} text="Em análise" color="black" fontWeight="400"/>

                        </td>
                    
                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', height:'100%'}}>
                                <Button marginTopImage='0.3vw' radius='2vw' marginLeftImage='0vw' marginRightImage='0vw' src={seta} colorButton='white' heightButton='3vw'  widthImage='75%' widthButton='3vw' textColor='white' onClick={()=>{setVerAnimalPage(true), setAnimalPage(false)}}/>
                            </div>                         
                        </td>
                         
                    </TableContent>
  
                </Table>
            </Animals>

            <Animals
                initial={{opacity:0}}
                animate={{y: verAnimaisCriador ? 0 : -50, opacity: verAnimaisCriador ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${verAnimaisCriador? 'block': 'none'}`,pointerEvents:`${verAnimaisCriador? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Todos os Animais do Criador" color="black" fontWeight="600"/>

                <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <InputText width='20vw' fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                    <Button marginTopImage='0.3vw' radius='0.3vw'  textButton='+ Registrar Novo Animal' colorButton='#E91868' heightButton='3vw'  widthButton='17vw' textColor='white' onClick={()=>{setVerAnimaisCriador(false), setVerAnimalPage(true)}}/>

                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Nome" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Tipo" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Fazenda" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Criador" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Decisão Técnico RGN" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="decisão técnico RGD" color="black" fontWeight="400"/>
                        </th>
                        
                    </TableHeader>

                    <TableContent>
                        <td style={{width:'20%'}}>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João da Silva Santos" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="000.000.000-00" color="black" fontWeight="400"/>
            
                        </td>
                        <td style={{width:'25%'}}>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="00.000.00" color="black" fontWeight="400"/>

                        </td>
                    
                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', height:'100%'}}>
                                <Button marginTopImage='0.3vw' radius='2vw' marginLeftImage='0vw' marginRightImage='0vw' src={search} colorButton='#0B7AB8' heightButton='3vw'  widthImage='65%' widthButton='3vw' textColor='white' onClick={()=>{setVerAnimalPage(true), setAnimalPage(false)}}/>
                            </div>                         
                        </td>
                         
                    </TableContent>
  
                </Table>
            </Animals>

            <Animals
                initial={{opacity:0}}
                animate={{y: RGD ? 0 : -50, opacity: RGD ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${RGD? 'block': 'none'}`,pointerEvents:`${RGD? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Todos os Animais que Precisam do Registro | ABCPD" color="black" fontWeight="600"/>

                <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <InputText width='20vw' fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>

                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Nome" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Criador" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Fazenda" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Decisão RGD do Superintendente" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Opções" color="black" fontWeight="400"/>
                        </th>
                    </TableHeader>

                    <TableContent>
                        <td style={{width:'20%'}}>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>
                        </td>

                        <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João da Silva Santos" color="black" fontWeight="400"/>
                        </td>

                        <td style={{width:'25%'}}>
                            <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Fazenda Boa Vista" color="black" fontWeight="400"/>
                        </td>

                        <td style={{width:'25%'}}>
                            <Text widthImage='1.5vw' src={waiting} textAlign='center' fontFamily="rob" size={"1vw"} text="Em Análise" color="black" fontWeight="400"/>
                        </td>

                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', height:'100%'}}>
                                <Button  radius='2vw' marginLeftImage='0vw' marginRightImage='0vw' src={seta} colorButton='white' heightButton='3vw'  widthImage='65%' widthButton='4vw' textColor='white' onClick={()=>{setVerAnimalRGDPage(true), setRGD(false)}}/>
                            </div>                         
                        </td>
                         
                    </TableContent>
  
                </Table>
            </Animals>

            <VerAnimals
                initial={{opacity:0}}
                animate={{y: verAnimalPage ? 0 : -50, opacity: verAnimalPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${verAnimalPage? 'flex': 'none'}`,pointerEvents:`${verAnimalPage? 'auto': 'none'}`}}
            >
            <div style={{width:'10vw'}}>
                <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
            </div>
            <Text text='Detalhes do Animal | ABCPD' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
            <Text text='Informações' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome do Animal" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome da Mãe" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome do Pai" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Sexo do Animal" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Criador do Animal" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Fazenda" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Tipo de Registro" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Pelagem Do Animal" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Mês da Avaliação" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Ano Da Avaliação" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <div style={{marginTop:'2vw'}}>
                <Text text='Decisão do Técnico' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />
            </div>


            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="RNG" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Data de  Registro do RNG" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPlace style={{width:'43%'}}>
                <Text fontFamily="pop" size={"1.5vw"} text="Observações" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <div style={{marginTop:'2vw'}}>
                <Text text='Imagens' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />
            </div>

            
            <InputPair >
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
            </InputPair>

            <InputPair >
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
            </InputPair>

            <div style={{display:'flex', marginTop:'1vw', justifyContent:'space-between', width:'35%', marginLeft:'48vw', marginBottom:'10vw'}}>
                <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                <Button colorButton='green' heightButton='2vw'  textButton='Aprovar'  widthButton='7vw' textColor='white'/>
                <Button colorButton='#BC433B' heightButton='2vw'  textButton='Pendente' widthButton='7vw' textColor='white'/>
            </div>
            </VerAnimals>

            <VerAnimals
                initial={{opacity:0}}
                animate={{y: verAnimaRGDPage ? 0 : -50, opacity: verAnimaRGDPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${verAnimaRGDPage? 'flex': 'none'}`,pointerEvents:`${verAnimaRGDPage? 'auto': 'none'}`}}
            >
            <div style={{width:'10vw'}}>
                <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
            </div>
            <Text text='Detalhe do Animal | ABCPD' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
            <Text text='Informações' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome do Animal" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome da Mãe" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome do Pai" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Sexo do Animal" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Criador do Animal" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Fazenda" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Tipo de Registro" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Pelagem Do Animal" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Mês da Avaliação" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Ano Da Avaliação" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <div style={{marginTop:'2vw'}}>
                <Text text='Decisão do Técnico' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />
            </div>


            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="RNG" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Data de  Registro do RNG" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPlace style={{width:'43%'}}>
                <Text fontFamily="pop" size={"1.5vw"} text="Observações" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <div style={{marginTop:'2vw'}}>
                <Text text='Imagens' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />
            </div>

            
            <InputPair >
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
            </InputPair>

            <InputPair >
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
                <div style={{width:'36vw'}}>
                    <Image alt="animal" style={{width:'100%', height:'auto'}} src={boi}/>
                </div>
            </InputPair>

            <div style={{display:'flex', marginTop:'1vw', justifyContent:'space-between', width:'35%', marginLeft:'48vw', marginBottom:'10vw'}}>
                <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                <Button colorButton='green' heightButton='2vw'  textButton='Aprovar'  widthButton='7vw' textColor='white'/>
                <Button colorButton='#BC433B' heightButton='2vw'  textButton='Pendente' widthButton='7vw' textColor='white'/>
            </div>
            </VerAnimals>

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
                
                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Rebanho" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Criador" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Estado da solicitação" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Ação" color="black" fontWeight="400"/>

                        </th>
                       
                    </TableHeader>

                    <TableContent>
                        <td style={{width:'20%'}}>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="AAA" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João da Silva Santos" color="black" fontWeight="400"/>
            
                        </td>
                        <td style={{width:'25%'}}>
                            <Text widthImage='1.5vw' src={waiting} textAlign='center' fontFamily="rob" size={"1vw"} text="Em análise" color="black" fontWeight="400"/>

                        </td>

                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center', alignItems:'center', height:'100%'}}>
                                <Button marginTopImage='0.3vw' textButton='Marcar Como Finalizado' radius='2vw' marginLeftImage='0vw' marginRightImage='0vw'  colorButton='#0B7AB8' heightButton='3vw'   widthButton='16vw' textColor='white' onClick={()=>{setVerAnimalPage(true), setAnimalPage(false)}}/>
                            </div>                         
                        </td>
                         
                    </TableContent>   
                </Table>

                <div style={{display:'flex', marginTop:'1vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                </div>
            </RegistroAnimalBase> 

            <ComunicNascimento
                initial={{opacity:0}}
                animate={{y: comunicNascPage ? 0 : -50, opacity: comunicNascPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${comunicNascPage? 'block': 'none'}`,pointerEvents:`${comunicNascPage ? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Todos as Fazendas dos Criadores" color="black" fontWeight="600"/>

                <div style={{width:'30%'}}>
                    <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Nome da Fazenda" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Criador" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Telefone- fazenda" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Mais Informações" color="black" fontWeight="400"/>

                        </th>
                    </TableHeader>

                    <TableContent>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Fazenda Boa Vista" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="João Da Silva Santos" color="black" fontWeight="400"/>
            
                        </td>
                        <td>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="(86) 99999-9999" color="black" fontWeight="400"/>

                        </td>
                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                <Button onClick={()=>{setTodasComunicNascPage(true), setComunicNascPage(false)}} marginTopImage='0.6vw' radius='2.5vw' marginLeftImage='0vw' marginRightImage='0vw' src={seta} colorButton='white' heightButton='2.8vw'  widthImage='100%' widthButton='3vw' textColor='white'/>
                            </div>  
                        </td>
                    </TableContent> 
                    
                </Table>

                <div style={{marginTop:'1vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                </div>
            </ComunicNascimento>

            <ComunicNascimento
                initial={{opacity:0}}
                animate={{y: todasComunicNascPage ? 0 : -50, opacity: todasComunicNascPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${todasComunicNascPage? 'block': 'none'}`,pointerEvents:`${todasComunicNascPage ? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Todas Comunicações de Nascimento do Criador | ABCPD" color="black" fontWeight="600"/>

                <div style={{width:'30%'}}>
                    <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                </div>
               

                <Table>
                    <TableHeader>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Data da Comunicação" color="black" fontWeight="400"/>
                        </th>
                        <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Matriz" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Bezerro" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Opções" color="black" fontWeight="400"/>

                        </th>
                    </TableHeader>

                    <TableContent>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="15 de Março de 2023 " color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>
            
                        </td>
                        <td>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Marrom" color="black" fontWeight="400"/>

                        </td>
                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                <Button onClick={()=>{setVerComunicNascPage(true),setTodasComunicNascPage(false)}} marginTopImage='0.6vw' radius='2.5vw' marginLeftImage='0vw' marginRightImage='0vw' src={add} colorButton='white' heightButton='2.8vw'  widthImage='100%' widthButton='3vw' textColor='white'/>
                            </div>  
                        </td>
                    </TableContent> 
                    
                </Table>

                <div style={{marginTop:'1vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                </div>
            </ComunicNascimento>

            <VerComunicNascimento
                initial={{opacity:0}}
                animate={{y: verComunicNascPage ? 0 : -50, opacity: verComunicNascPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${verComunicNascPage? 'flex': 'none'}`,pointerEvents:`${verComunicNascPage? 'auto': 'none'}`}}
            >
            <div style={{width:'10vw'}}>
                <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
            </div>
            <Text text='Registro de um Novo Bezerro | ABCPD' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
            
            <InputPlace>
                <Text fontFamily="pop" size={"1.5vw"} text="Nome do Bezerro" color="black" fontWeight="300"/>
                <InputText border="solid 0.2vw black"/>
            </InputPlace>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Pai" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Mãe" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Mês Da Avaliação" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Ano Da Avaliação" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Sexo do Animal" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Pelagem do Animal" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Data de Nascimento" color="black" fontWeight="300"/>
                        <InputText type='date' border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Imagem 01" color="black" fontWeight="300"/>
                    <InputText fontSize='1.4vw' height='3vw' type='file'  border="solid 0.2vw black"/>

                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Imagem 02" color="black" fontWeight="300"/>
                    <InputText fontSize='1.4vw' height='3vw' type='file'  border="solid 0.2vw black"/>

                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Imagem 03" color="black" fontWeight="300"/>
                    <InputText fontSize='1.4vw' height='3vw' type='file'  border="solid 0.2vw black"/>

                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Imagem 04" color="black" fontWeight="300"/>
                    <InputText fontSize='1.4vw' height='3vw' type='file'  border="solid 0.2vw black"/>

                </InputPlace>
            </InputPair>

            
            <div style={{display:'flex', marginTop:'1vw', justifyContent:'space-between', width:'35%', marginLeft:'41.9vw', marginBottom:'10vw'}}>
                <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                <Button colorButton='green' heightButton='2vw' textButton='Registrar Animal' widthButton='17vw' textColor='white'/>
            </div>
            </VerComunicNascimento>
             

            <ComunicCobertura
                initial={{opacity:0}}
                animate={{y: comunicCoberPage ? 0 : -50, opacity: comunicCoberPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${comunicCoberPage? 'block': 'none'}`,pointerEvents:`${comunicCoberPage ? 'auto': 'none'}`}}
            >
                <div style={{width:'4vw'}}>
                    <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                </div>
                <Text fontFamily="pop" size={"1.5vw"} text="Listagem de Comunicações de Cobertura | ABCPD" color="black" fontWeight="600"/>

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
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Status" color="black" fontWeight="400"/>

                        </th>
                        <th>
                        <Text textAlign='center'  fontFamily="rob" size={"1.3vw"} text="Opções" color="black" fontWeight="400"/>

                        </th>
                    </TableHeader>

                    <TableContent>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="15 de Março de 2023 " color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>
            
                        </td>
                        <td>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Angus" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text  textAlign='center' fontFamily="rob" size={"1vw"} text="Monta Natural" color="black" fontWeight="400"/>

                        </td>
                        <td>
                        <Text widthImage='1.5vw' src={waiting}  textAlign='center' fontFamily="rob" size={"1vw"} text="Em análise" color="black" fontWeight="400"/>

                        </td>
                        <td>
                            <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                <Button onClick={()=>{setVerComunicCoberPage(true),setComunicCoberPage(false),  setCriadorRegister(false),setTecnicoPage(false),setCriadorPage(false),setTecnicoRegister(false),setUsersPage(false)   }} marginTopImage='0.6vw' radius='2.5vw' marginLeftImage='0vw' marginRightImage='0vw' src={seta} colorButton='white' heightButton='2.8vw'  widthImage='100%' widthButton='3vw' textColor='white'/>
                            </div>  
                        </td>
                    </TableContent> 
                    
                </Table>

                <div style={{marginTop:'1vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                </div>
            </ComunicCobertura>

            <VerComunicCobertura
                initial={{opacity:0}}
                animate={{y: verComunicCoberPage ? 0 : -50, opacity: verComunicCoberPage ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${verComunicCoberPage? 'flex': 'none'}`,pointerEvents:`${verComunicCoberPage? 'auto': 'none'}`}}
            >
                <div style={{width:'10vw'}}>
                    <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
                </div>
                <Text text='Detalhe da Cobertura | ABCPD' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
                
                <InputPlace>
                    <Text text='Informações ' fontFamily='pop' fontWeight='700' size='1.5vw' color='#032759' />
                </InputPlace>

                <InputPair style={{width:'90%'}}>
                    <InputPlace style={{width:'47%'}}>
                        <Text fontFamily="pop" size={"1.5vw"} text="Nome do Reprodudor" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                    </InputPlace>

                    <InputPlace style={{width:'47%'}}>
                        <Text fontFamily="pop" size={"1.5vw"} text="Nome da Matriz" color="black" fontWeight="300"/>
                            <InputText border="solid 0.2vw black"/>
                    </InputPlace>
                </InputPair>

                <InputPair style={{width:'90%'}}>
                    <InputPlace style={{width:'47%'}}>
                        <Text fontFamily="pop" size={"1.5vw"} text="Tipo de Cobertura" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                    </InputPlace>

                    <InputPlace style={{width:'47%'}}>
                        <Text fontFamily="pop" size={"1.5vw"} text="Data da Cobertura" color="black" fontWeight="300"/>
                            <InputText border="solid 0.2vw black"/>
                    </InputPlace>
                </InputPair>

                <InputPair style={{width:'90%'}}>
                    <InputPlace style={{width:'47%'}}>
                        <Text fontFamily="pop" size={"1.5vw"} text="Criador da Cobertura" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                    </InputPlace>
                </InputPair>

                
                
                <div style={{display:'flex', marginTop:'1vw', justifyContent:'end', width:'35%', marginLeft:'41.9vw', marginBottom:'10vw'}}>
                    <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                </div>
            </VerComunicCobertura>

            <UsersPage
                    initial={{opacity:0}}
                    animate={{y: tecnicoPage ? 0 : -50, opacity: tecnicoPage ? 1 : 0}} 
                    transition={{duration:0.5}}
                    style={{display:`${tecnicoPage? 'block': 'none'}`,pointerEvents:`${tecnicoPage ? 'auto': 'none'}`}}
                >
                    <div style={{width:'4vw'}}>
                        <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                    </div>
                    <Text fontFamily="pop" size={"1.5vw"} text="Todos os Técnicos da ABCPD" color="black" fontWeight="600"/>

                    <div style={{width:'30%'}}>
                        <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                    </div>
                

                    <Table>
                        <TableHeader>
                            <th>
                                <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Nome Completo" color="black" fontWeight="400"/>
                            </th>
                            <th>
                                <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="CPF" color="black" fontWeight="400"/>

                            </th>
                            <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Opções" color="black" fontWeight="400"/>

                            </th>
                        </TableHeader>

                        <TableContent>
                            <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Pedro" color="black" fontWeight="400"/>

                            </td>
                            <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Tec.nic.o@t-es" color="black" fontWeight="400"/>
                
                            </td>
                            <td>
                                <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                    <Button onClick={()=>{setTecnicoRegister(true),setTecnicoPage(false)}} marginTopImage='0.6vw' radius='2.5vw' marginLeftImage='0vw' marginRightImage='0vw' src={seta} colorButton='white' heightButton='2.8vw'  widthImage='100%' widthButton='3vw' textColor='white'/>
                                </div>  
                            </td>
                        </TableContent> 
                        
                    </Table>

                    <div style={{marginTop:'1vw', display:'flex', width:'28vw', justifyContent:'space-between'}}>
                        <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                        <Button colorButton='green ' heightButton='2vw'  textButton='Registrar novo técnico' widthButton='20vw' textColor='white'/>

                    </div>
            </UsersPage> 
                
            <UsersPage
                    initial={{opacity:0}}
                    animate={{y: criadorPage ? 0 : -50, opacity: criadorPage ? 1 : 0}} 
                    transition={{duration:0.5}}
                    style={{display:`${criadorPage? 'block': 'none'}`,pointerEvents:`${criadorPage ? 'auto': 'none'}`}}
                >
                    <div style={{width:'4vw'}}>
                        <Image src={animalBlue} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
                    </div>
                    <Text fontFamily="pop" size={"1.5vw"} text="Todos os Criadores da ABCPD" color="black" fontWeight="600"/>

                    <div style={{width:'30%'}}>
                        <InputText fontSize='1.2vw' placeholder="Buscar" height="3vw" border='solid 1px rgba(103, 97, 97, 0.5)' borderRight='solid 1px rgba(103, 97, 97, 0.5)' borderLeft='solid 1px rgba(103, 97, 97, 0.5)' borderTop='solid 1px rgba(103, 97, 97, 0.5)' borderColor='rgba(103, 97, 97, 0.5)'/>
                    </div>
                

                    <Table>
                        <TableHeader>
                            <th>
                                <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Nome Completo" color="black" fontWeight="400"/>
                            </th>
                            <th>
                                <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="CPF" color="black" fontWeight="400"/>

                            </th>
                            <th>
                            <Text textAlign='center' fontFamily="rob" size={"1.3vw"} text="Opções" color="black" fontWeight="400"/>

                            </th>
                        </TableHeader>

                        <TableContent>
                            <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Pedro" color="black" fontWeight="400"/>

                            </td>
                            <td>
                            <Text textAlign='center' fontFamily="rob" size={"1vw"} text="Tec.nic.o@t-es" color="black" fontWeight="400"/>
                
                            </td>
                            <td>
                                <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                    <Button onClick={()=>{setCriadorRegister(true),setCriadorPage(false)}} marginTopImage='0.6vw' radius='2.5vw' marginLeftImage='0vw' marginRightImage='0vw' src={seta} colorButton='white' heightButton='2.8vw'  widthImage='100%' widthButton='3vw' textColor='white'/>
                                </div>  
                            </td>
                        </TableContent> 
                        
                    </Table>

                    <div style={{marginTop:'1vw', display:'flex', width:'28vw', justifyContent:'space-between'}}>
                        <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                        <Button colorButton='green ' heightButton='2vw'  textButton='Registrar novo criador' widthButton='20vw' textColor='white'/>

                    </div>
            </UsersPage>


            <UserRegister
                initial={{opacity:0}}
                animate={{y: criadorRegister ? 0 : -50, opacity: criadorRegister ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${criadorRegister? 'flex': 'none'}`,pointerEvents:`${criadorRegister? 'auto': 'none'}`}}
            >
            <div style={{width:'10vw'}}>
                <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
            </div>
            <Text text='Registro do Criador' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
            <Text text='Informações' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome Completo" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Email" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="CPF/CNPJ" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="RG" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Endereço" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Bairro" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Cidade" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Estado" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="CEP" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Telefone" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            
            <div style={{display:'flex', marginTop:'5vw', justifyContent:'space-between', width:'40%', marginLeft:'38vw', marginBottom:'10vw'}}>
                <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                <Button colorButton='green' heightButton='2vw'  textButton='Editar'  widthButton='7vw' textColor='white'/>
                <Button colorButton='#BC433B' heightButton='2vw'  textButton='Desativar Conta' widthButton='12vw' textColor='white'/>
            </div>
            </UserRegister>

            <UserRegister
                initial={{opacity:0}}
                animate={{y: tecnicoRegister ? 0 : -50, opacity: tecnicoRegister ? 1 : 0}} 
                transition={{duration:0.5}}
                style={{display:`${tecnicoRegister? 'flex': 'none'}`,pointerEvents:`${tecnicoRegister? 'auto': 'none'}`}}
            >
            <div style={{width:'10vw'}}>
                <Image src={animalBlue} alt='logoAnimal' style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}/>
            </div>
            <Text text='Registro do Técnico' fontFamily='pop' fontWeight='700' size='1.8vw' color='#032759' />
            <Text text='Informações' fontFamily='rob' fontWeight='600' size='1.6vw' color='#032759' />

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Nome Completo" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Email" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="CPF/CNPJ" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="RG" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Endereço" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Bairro" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Cidade" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Estado" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            <InputPair style={{width:'90%'}}>
                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="CEP" color="black" fontWeight="300"/>
                    <InputText border="solid 0.2vw black"/>
                </InputPlace>

                <InputPlace style={{width:'47%'}}>
                    <Text fontFamily="pop" size={"1.5vw"} text="Telefone" color="black" fontWeight="300"/>
                        <InputText border="solid 0.2vw black"/>
                </InputPlace>
            </InputPair>

            
            <div style={{display:'flex', marginTop:'5vw', justifyContent:'space-between', width:'40%', marginLeft:'38vw', marginBottom:'10vw'}}>
                <Button colorButton='#032759' heightButton='2vw'  textButton='← Voltar' widthButton='7vw' textColor='white'/>
                <Button colorButton='green' heightButton='2vw'  textButton='Editar'  widthButton='7vw' textColor='white'/>
                <Button colorButton='#BC433B' heightButton='2vw'  textButton='Desativar Conta' widthButton='12vw' textColor='white'/>
            </div>
            </UserRegister>


        </Content>

    </Container>
    )
}