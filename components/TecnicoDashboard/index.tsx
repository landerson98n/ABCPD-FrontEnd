/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import {
  Home,
  add,
  arrowLeft,
  comunic,
  done,
  hamb,
  logo2Branca,
  logoBranca,
  searchIcon,
  seta,
  user,
  waiting,
} from '@/assets'
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
  InputText,
  VerAnimalsRGD,
  TelaCadastroAnimal,
  TelaAnimaisRGD,
  TelaCriadoresABCPD,
  TelaAnimaisCriador,
  TelaFazendasCriador,
} from './style'
import Image from 'next/legacy/image'
import { Button } from '../Button'
import { Text } from '../Text'
import { useContext, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import CriadorDTO from '@/utils/CriadorDTO'
import { useQuery } from 'react-query'
import AnimalDTO from '@/utils/AnimalDTO'
import {
  getFazendaById,
  getFazendaCriador,
  getTodasFazendas,
} from '@/actions/fazendaApi'
import FazendaDTO from '@/utils/FazendaDTO'
import { AlertContext } from '@/context/AlertContextProvider'
import { getRebanhoByFazendaId, getRebanhosAll } from '@/actions/RebanhApi'
import {
  getAnimaisByCriadorId,
  getTodosAnimais,
  updateAnimal,
} from '@/actions/animaisApi'
import { CircularProgress } from '@mui/material'
import { getCriadorById } from '@/actions/criadorApi'
import { format } from 'date-fns'
import { getComunicacoesNascimentoCriador } from '@/actions/comunicacaoNascimento'
import { ComunicacaoNascimentoDto } from '@/utils/ComunicacaoNascimentoDTO'
import { CadastrarAnimal } from '../CadastrarAnimal'
import { getRegistrosAnimalBase } from '@/actions/animalBaseApi'
import { SolicitacaoRegistroAnimalBaseDTO } from '@/utils/SolicitacaoDTO'
import RebanhoDTO from '@/utils/RebanhoDTO'
import { DetalhesAnimal } from '../DetalhesAnimal'
import { getUserById } from '@/actions/user'
import UserDTO from '@/utils/UserDTO'
import jsonWebTokenService from 'jsonwebtoken'

export function TecnicoDashboard(data: { token: string }) {
  const [paginas, setPaginas] = useState({
    animalPage : false,
    verAnimalPage: false,
    verAnimaRGDPage: false,
    verAnimaisCriador: false,
    initialPage: false,
    comunicPage: false,
    animalBasePage:false,
    comunicNascPage:false,
    todasComunicNascPage:false,
    verComunicNascPage:false,
    solicitacao: false,
    menu:true,
    RGD: false,
    options: false,
    loading: false
  })

  const [animalInfos, setAnimalInfos] = useState({
    animalSelecionado : {} as AnimalDTO,
    fazendaSelecionado: {} as FazendaDTO,
    criadorSelecionado: {} as CriadorDTO,
    paiSelecionado: {} as AnimalDTO,
    maeSelecionado:{} as AnimalDTO,
    resgistro: false
  })
 
  const [criadorInfo, setCriadorInfo] = useState({
    animaisCriador: [] as AnimalDTO[],
    fazendasCriador: [] as FazendaDTO[],
    rebanhosCriador: [] as RebanhoDTO[],
    criadorId: '',
  })

  const [animalBaseInfo, setAnimalBaseInfo] = useState({
    solicitacoesAnimaisBase: [] as SolicitacaoRegistroAnimalBaseDTO[],
    solicitacoesAnimaisBaseSelecionada: {} as SolicitacaoRegistroAnimalBaseDTO,
  })

  const [criadores, setCriadores] = useState([])
  const [nascimentos, setNascimentos] = useState([])
  const [typeCadastro, setTypeCadastro] = useState('')
  const { alert } = useContext(AlertContext) 
  

  const {solicitacoesAnimaisBase, solicitacoesAnimaisBaseSelecionada} = animalBaseInfo
  const {animaisCriador, fazendasCriador, rebanhosCriador, criadorId} = criadorInfo
  const {options, loading} = paginas
  const {resgistro} = animalInfos
  const decodedJwt = jsonWebTokenService.decode(data.token)

  const {
    isLoading: isLoadingTecnicoUser,
    data: tecnicoUser,
  } = useQuery<UserDTO>('tecnico', async () => getUserById(decodedJwt.sub, data.token))

  const {
    isLoading: isLoadingAnimais,
    data: todosAnimais,
  } = useQuery('animais', async () => getTodosAnimais(data.token))

  const {
    isLoading: isLoadingRebanhos,
    data: todosRebanhos,
  } = useQuery('rebanhos', async () => getRebanhosAll(data.token))

  const { data: todasFazendas, isLoading: isLoadingFazendas } = useQuery('fazendas', async () =>
    getTodasFazendas(data.token),
  )

  const {
    isLoading,
    data: CriadoresData,
  } = useQuery('criadores', async () =>
    fetch('http://localhost:3001/criador/get-criadores', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      method: 'GET',
    }).then((res) => res.json()),
  )


  async function getAnimais(id: string) {
    setPaginas((prev)=>({
      ...prev,
      loading: true
    }))

    const animais = await getAnimaisByCriadorId(id, data.token)

    setCriadorInfo((prev)=>({
      ...prev,
      animaisCriador: animais
    }))

    setPaginas((prev) => ({
      ...updatedPages,
      verAnimaisCriador: true,
      animalPage: false,
      loading: false
    }))

  }

  async function getFazendas() {
    setPaginas((prev)=>({
      ...prev,
      loading: true
    }))

    const response = await getFazendaCriador(data.token, criadorId)
    if (response) {
      const rebanho = await getRebanhoByFazendaId(response[0].id)
      setCriadorInfo((prev)=>({
        ...prev,
        fazendasCriador: response,
        rebanhosCriador: rebanho
      }))

      setTypeCadastro('')
      setPaginas((prev) => ({
        ...updatedPages,
        verAnimaisCriador: false,
        verAnimalPage: true,
        loading: false
      }))
    }
  }

  async function getSolicitacoes() {
    setPaginas((prev)=>({
      ...prev,
      loading: true
    }))
    const response = await getRegistrosAnimalBase(data.token)   
    const responseJson = await response.json() 
    if (response.status==200) {      
      setAnimalBaseInfo((prev)=>({
        ...prev,
        solicitacoesAnimaisBase: responseJson 
      }))

      setPaginas((prev)=>({
        ...prev,
        loading: false
      }))
    }
  }

  async function getInformacoesAnimal(animal: AnimalDTO) {
    setPaginas((prev)=>({
      ...prev,
      loading: true
    }))
    
    const fazenda: FazendaDTO = await getFazendaById(data.token, animal.fazenda)
    const criador: CriadorDTO = await getCriadorById(
      animal.criadorAnimal,
      data.token,
    )
    
    setAnimalInfos((prevAnimal)=>({
      ...prevAnimal,
      fazendaSelecionado: fazenda,
      criadorSelecionado: criador,
      maeSelecionado:  (animaisCriador.find((index: AnimalDTO) => {
        return index.id == animal.mae
      }) || {} as AnimalDTO),
      paiSelecionado: (animaisCriador.find((index: AnimalDTO) => {
        return index.id == animal.pai
      })||{} as AnimalDTO)
    }))

    setPaginas((prev)=>({
      ...prev,
      loading: false
    }))
  } 

  async function getNascimentos(id: string){
    const nascimentoData = await getComunicacoesNascimentoCriador(data.token,id)    
    setNascimentos(nascimentoData)
  }

  const updatedPages = { ...paginas };
              
  for (const key in updatedPages) {
    if (key !== 'menu') {updatedPages[key] = false;}
    
  }

  if(isLoading || isLoadingAnimais || isLoadingRebanhos || isLoadingFazendas || isLoadingTecnicoUser){
    return <div style={{width:'100%', height:'100vh',display:'flex' ,justifyContent:'center', alignItems:'center'}}><CircularProgress/></div>
  }


  return (
    <>
      <Container>
        <Menu
          initial={{ width: '20%' }}
          animate={{ width: paginas.menu ? '20%' : '5%' }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: '13vw' }}
            transition={{ duration: 0.5 }}
            animate={{ x: paginas.menu ? '13vw' : '1.5vw' }}
            onClick={() => {
              setPaginas((prev) => {
                return {
                  ...updatedPages,
                  menu: !prev.menu,
                };
              });
            }}
            style={{ width: '100%', display: 'flex', marginTop: '1vw' }}
          >
            <div style={{ width: '2vw', cursor: 'pointer' }}>
              <Image
                src={hamb}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: '0vw' }}
            transition={{ duration: 0.7 }}
            animate={{ x: paginas.menu ? '0vw' : '-20vw', opacity: paginas.menu ? 1 : 0 }}
            style={{
              display: paginas.menu ? 'flex' : 'none',
              width: '96%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                paddingTop: '3vw',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '4vw' }}>
                <Image
                  src={logo2Branca}
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div style={{ width: '10vw' }}>
                <Image
                  src={logoBranca}
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                height: '20vw',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                marginTop: '3vw',
              }}
            >
              <Button
                widthButton="16vw"
                widthImage="1.5vw"
                src={Home}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages, 
                    initialPage: true
                  }))
                }}
                colorButton={paginas.initialPage ? 'black' : '#9E4B00'}
                textButton="Pagina Inicial"
              />
              <Button
                widthButton="16vw"
                widthImage="1.8vw"
                src={logo2Branca}
                heightButton="3.3vw"
                onClick={() => {
                  setCriadores(CriadoresData)
                  setPaginas((prev) => ({
                    ...updatedPages,
                    animalPage: !prev.animalPage
                  }))
                }}
                colorButton={paginas.animalPage || paginas.RGD ? 'black' : '#9E4B00'}
                textButton="Animais"
              />
              <Button
                widthButton="16vw"
                widthImage="1.5vw"
                src={comunic}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    comunicPage: !prev.comunicPage,
                  }))
                }}
                colorButton={paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage? 'black' : '#9E4B00'}
                textButton="Comunicações "
              />
              <Button
                widthButton="16vw"
                widthImage="1.5vw"
                src={comunic}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    solicitacao: !prev.solicitacao,
                  }))
                }}
                colorButton={paginas.solicitacao || paginas.verAnimalPage ? 'black' : '#9E4B00'}
                textButton="Solicitações "
              />

              <DropdownMenu
                initial={{ opacity: 0 }}
                animate={{
                  y: paginas.animalPage || paginas.RGD ? '-6vw' : '-10vw',
                  opacity: paginas.animalPage || paginas.RGD ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: `${paginas.animalPage || paginas.RGD ? 'auto' : 'none'}` }}
              >
                <Button
                  marginRightImage="0.6vw"
                  marginLeftImage={'0.6vw'}
                  textSize="0.9vw"
                  textColor={paginas.RGD ? 'white' : 'black'}
                  widthButton="100%"
                  widthImage="0.5vw"
                  src={arrowLeft}
                  heightButton="3.3vw"
                  onClick={() => {
                    setPaginas((prev) => ({
                      ...updatedPages,
                      animalPage:false,
                      RGD: !prev.RGD,
                    }))
                  }}
                  colorButton={paginas.RGD ? 'black' : 'white'}
                  textButton="RGD"
                />
              </DropdownMenu>

              <DropdownMenu
                initial={{ opacity: 0 }}
                animate={{
                  y: paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage? '-6vw' : '-12vw',
                  opacity: paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: `${paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage? 'auto' : 'none'}` }}
              >
                <Button
                  marginRightImage="0.6vw"
                  marginLeftImage={'0.6vw'}
                  textSize="0.9vw"
                  textColor={paginas.comunicNascPage || paginas.todasComunicNascPage || paginas.verComunicNascPage ? 'white' : 'black'}
                  widthButton="100%"
                  widthImage="0.5vw"
                  src={arrowLeft}
                  heightButton="3.3vw"
                  onClick={() => {
                    setPaginas((prev) => ({
                      ...updatedPages,
                      comunicPage:true,
                      comunicNascPage: !prev.comunicNascPage,
                    }))
                  }}
                  colorButton={paginas.comunicNascPage || paginas.todasComunicNascPage || paginas.verComunicNascPage? 'black' : 'white'}
                  textButton="Comunicações de Nascimento"
                />
              </DropdownMenu>

              <DropdownMenu
                initial={{ opacity: 0 }}
                animate={{
                  y: paginas.solicitacao ? '-6.4vw' : '-12vw',
                  opacity: paginas.solicitacao ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: `${paginas.solicitacao ? 'auto' : 'none'}` }}
              >
                <Button
                  marginRightImage="0.6vw"
                  marginLeftImage={'0.6vw'}
                  textSize="0.9vw"
                  textColor={paginas.animalBasePage ? 'white' : 'black'}
                  widthButton="100%"
                  widthImage="0.5vw"
                  src={arrowLeft}
                  heightButton="3.3vw"
                  onClick={() => {
                    getSolicitacoes()
                    setPaginas((prev) => ({
                      ...updatedPages,
                      solicitacao:true,
                      animalBasePage: !prev.animalBasePage,
                    }))
                  }}
                  colorButton={paginas.animalBasePage ? 'black' : 'white'}
                  textButton="Solicitações de  Animais PA"
                />
              </DropdownMenu>
            </div>
          </motion.div>
        </Menu>

        <Content>
          <Header>
            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y: options ? 0 : -50,
                opacity: options ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: `${options ? 'auto' : 'none'}`,
                marginTop: '18vw',
                marginLeft: '80vw',
                width: '20vw',
                position: 'absolute',
                height: '5vw',
              }}
            >
              <Button
                colorButton="white"
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                textColor="black"
                onClick={() => {
                  window.location.assign(`/`)
                }}
                textButton="Logout"
              />
            </DropdownMenu>
            <div style={{ marginRight: '3vw', display: 'flex' }}>
              <div style={{ width: '4vw' }}>
                <Image
                  src={user}
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div
                onClick={() => {
                  setPaginas((prev)=>({
                    ...prev,
                    options: !prev.options
                  }))
                }}
                style={{ cursor: 'pointer', width: '15vw' }}
              >
                <Text
                  fontFamily="pop"
                  size={'1.3vw'}
                  text={`${tecnicoUser?.nomePrimeiro} ${tecnicoUser?.nomeUltimo} ⚙️`}
                  color="black"
                  fontWeight="600"
                />
              </div>
            </div>
          </Header>

          <motion.div
            animate={{
              y: paginas.initialPage ? 0 : -50,
              opacity: paginas.initialPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.initialPage ? 'flex' : 'none'}`,
              pointerEvents: `${paginas.initialPage ? 'auto' : 'none'}`,
              height: '100%',
              alignItems: 'center',
            }}
          >
            <Text
              fontFamily="pop"
              size={'2.5vw'}
              text="Seja bem vindo"
              color="black"
              fontWeight="600"
            />
          </motion.div>

          <TelaCriadoresABCPD
            initial={{ opacity: 0 }}
            animate={{ y: paginas.animalPage ? 0 : -50, opacity: paginas.animalPage ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.animalPage ? 'block' : 'none'}`,
              pointerEvents: `${paginas.animalPage ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '4vw' }}>
              <Image
                src={logo2Branca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Todos os criadores registrados na ABCPD"
              color="black"
              fontWeight="600"
            />

            <div style={{ width: '30%' }}>
              <InputText
                fontSize="1.2vw"
                placeholder="Buscar"
                height="3vw"
                border="solid 1px rgba(103, 97, 97, 0.5)"
                borderRight="solid 1px rgba(103, 97, 97, 0.5)"
                borderLeft="solid 1px rgba(103, 97, 97, 0.5)"
                borderTop="solid 1px rgba(103, 97, 97, 0.5)"
                borderColor="rgba(103, 97, 97, 0.5)"
              />
            </div>

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Criador"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Cidade"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="RG"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Ver Animais"
                    color="black"
                    fontWeight="400"
                  />
                </th>
              </TableHeader>

              {criadores
                ? criadores.map((data: CriadorDTO) => {
                    return (
                      <TableContent key={data.userId}>
                        <td style={{ width: '20%' }}>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={data.nomeCompleto}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={data.nomeCidade}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td style={{ width: '25%' }}>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={data.rg}
                            color="black"
                            fontWeight="400"
                          />
                        </td>

                        <td>
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                            }}
                          >
                            {loading ? (
                              <CircularProgress size={'3vw'} />
                            ) : (
                              <Button
                                marginTopImage="0.3vw"
                                radius="2vw"
                                marginLeftImage="0vw"
                                marginRightImage="0vw"
                                src={searchIcon}
                                colorButton="#0B7AB8"
                                heightButton="3vw"
                                widthImage="65%"
                                widthButton="3vw"
                                textColor="white"
                                onClick={() => {
                                  setCriadorInfo((prev)=>({
                                    ...prev,
                                    criadorId: data.id
                                  }))
                                  getAnimais(data.id)
                                }}
                              />
                            )}
                          </div>
                        </td>
                      </TableContent>
                    )
                  })
                : null}
            </Table>
          </TelaCriadoresABCPD>

          <TelaAnimaisCriador
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.verAnimaisCriador ? 0 : -50,
              opacity: paginas.verAnimaisCriador ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.verAnimaisCriador ? 'block' : 'none'}`,
              pointerEvents: `${paginas.verAnimaisCriador ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '4vw' }}>
              <Image
                src={logo2Branca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Todos os Animais do Criador"
              color="black"
              fontWeight="600"
            />

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <InputText
                style={{
                  width: '20vw',
                  fontSize: '1.2vw',
                  placeholder: 'Buscar',
                  height: '3vw',
                  border: 'solid 1px rgba(103, 97, 97, 0.5)',
                  borderTop: 'solid 1px rgba(103, 97, 97, 0.5)',
                  
                }}
              />
              {loading ? <CircularProgress/> : <Button
                marginTopImage="0.3vw"
                radius="0.3vw"
                textButton="+ Registrar Novo Animal"
                colorButton="#E91868"
                heightButton="3vw"
                widthButton="17vw"
                textColor="white"
                onClick={() => {
                  getFazendas()
                }}
              />}
              
            </div>

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Nome"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Pelagem"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Sexo"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Registro"
                    color="black"
                    fontWeight="400"
                  />
                </th>
              </TableHeader>
              {animaisCriador
                ? animaisCriador.map((dataAnimal: AnimalDTO) => {
                    return (
                      <TableContent key={dataAnimal.id}>
                        <td style={{ width: '20%' }}>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={dataAnimal.nomeAnimal}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td style={{ width: '25%' }}>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={dataAnimal.pelagemAnimal}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td style={{ width: '25%' }}>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={dataAnimal.sexoAnimal}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td style={{ width: '25%' }}>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={dataAnimal.registro}
                            color="black"
                            fontWeight="400"
                          />
                        </td>

                        <td>
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                            }}
                          >
                            <Button
                              marginTopImage="0.3vw"
                              radius="2vw"
                              marginLeftImage="0vw"
                              marginRightImage="0vw"
                              src={searchIcon}
                              colorButton="#0B7AB8"
                              heightButton="3vw"
                              widthImage="65%"
                              widthButton="3vw"
                              textColor="white"
                              onClick={() => {
                                setAnimalInfos((prev)=>({
                                  ...prev,
                                  animalSelecionado: dataAnimal
                                }))
                                getInformacoesAnimal(dataAnimal)
                                setPaginas((prev) => ({
                                  ...updatedPages,
                                  verAnimaRGDPage:true,
                                }))
                   
                              }}
                            />
                          </div>
                        </td>
                      </TableContent>
                    )
                  })
                : null}
            </Table>
          </TelaAnimaisCriador>

          <TelaAnimaisRGD
            initial={{ opacity: 0 }}
            animate={{ y: paginas.RGD ? 0 : -50, opacity: paginas.RGD ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.RGD ? 'block' : 'none'}`,
              pointerEvents: `${paginas.RGD ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '4vw' }}>
              <Image
                src={logo2Branca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Todos os Animais que Precisam do Registro | ABCPD"
              color="black"
              fontWeight="600"
            />

            <div
              style={{
                width: '30%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <InputText
                width="20vw"
                fontSize="1.2vw"
                placeholder="Buscar"
                height="3vw"
                border="solid 1px rgba(103, 97, 97, 0.5)"
                borderRight="solid 1px rgba(103, 97, 97, 0.5)"
                borderLeft="solid 1px rgba(103, 97, 97, 0.5)"
                borderTop="solid 1px rgba(103, 97, 97, 0.5)"
                borderColor="rgba(103, 97, 97, 0.5)"
              />
            </div>

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Número"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Criador"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Fazenda"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Decisão RGD do Superintendente"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Opções"
                    color="black"
                    fontWeight="400"
                  />
                </th>
              </TableHeader>
              {todosAnimais
                ? todosAnimais.map((index: AnimalDTO) => {
                    if (!index.decisaoAnimalTecnicoRGD) {
                      return (
                        <TableContent key={index.id}>
                          <td style={{ width: '20%' }}>
                            <Text
                              textAlign="center"
                              fontFamily="rob"
                              size={'1vw'}
                              text={index.nomeAnimal}
                              color="black"
                              fontWeight="400"
                            />
                          </td>

                          <td>
                            <Text
                              textAlign="center"
                              fontFamily="rob"
                              size={'1vw'}
                              text={
                                criadores
                                  ? (
                                      criadores.find(
                                        (indexFind: CriadorDTO) => {
                                          return (
                                            indexFind.id === index.criadorAnimal
                                          )
                                        },
                                      ) || {}
                                    ).nomeCompleto
                                  : ''
                              }
                              color="black"
                              fontWeight="400"
                            />
                          </td>

                          <td style={{ width: '25%' }}>
                            <Text
                              textAlign="center"
                              fontFamily="rob"
                              size={'1vw'}
                              text={
                                todasFazendas
                                  ? (
                                      todasFazendas.find(
                                        (indexFind: FazendaDTO) => {
                                          return indexFind.id === index.fazenda
                                        },
                                      ) || {}
                                    ).nomeFazenda
                                  : ''
                              }
                              color="black"
                              fontWeight="400"
                            />
                          </td>

                          <td style={{ width: '25%' }}>
                            <Text
                              widthImage="1.5vw"
                              src={index.decisaoAnimalSuperRGD ? add : waiting}
                              textAlign="center"
                              fontFamily="rob"
                              size={'1vw'}
                              text={index.decisaoAnimalSuperRGD || 'Em análise'}
                              color="black"
                              fontWeight="400"
                            />
                          </td>

                          <td>
                            <div
                              style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                              }}
                            >
                              <Button
                                radius="2vw"
                                marginLeftImage="0vw"
                                marginRightImage="0vw"
                                src={seta}
                                colorButton="white"
                                heightButton="3vw"
                                widthImage="65%"
                                widthButton="4vw"
                                textColor="white"
                                onClick={() => {
                                  getInformacoesAnimal(index)
                                  setAnimalInfos((prev) =>({
                                    ...prev,
                                    animalSelecionado: index,
                                    resgistro: true
                                  }))
                                  setPaginas(()=>({
                                    ...updatedPages,
                                    verAnimaRGDPage: true,
                                    
                                  }))

                                    
                                }}
                              />
                            </div>
                          </td>
                        </TableContent>
                      )
                    }
                  })
                : null}
            </Table>
          </TelaAnimaisRGD>

          <TelaCadastroAnimal
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.verAnimalPage ? 0 : -50,
              opacity: paginas.verAnimalPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.verAnimalPage ? 'flex' : 'none'}`,
              pointerEvents: `${paginas.verAnimalPage ? 'auto' : 'none'}`,
            }}
          >
            <CadastrarAnimal solicitacaoBase={solicitacoesAnimaisBaseSelecionada} typeCadastro={typeCadastro} token={data.token} criadorId={criadorId} animaisCriador={animaisCriador} fazendas={fazendasCriador} rebanhos={todosRebanhos}/>
          </TelaCadastroAnimal>

          <VerAnimalsRGD
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.verAnimaRGDPage ? 0 : -50,
              opacity: paginas.verAnimaRGDPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.verAnimaRGDPage ? 'flex' : 'none'}`,
              pointerEvents: `${paginas.verAnimaRGDPage ? 'auto' : 'none'}`,
            }}
          >

            <DetalhesAnimal animaisCriador={animaisCriador} registro={resgistro} token={data.token} animalInfos={animalInfos}/>
          </VerAnimalsRGD>

          <RegistroAnimalBase
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.animalBasePage ? 0 : -50,
              opacity: paginas.animalBasePage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.animalBasePage ? 'flex' : 'none'}`,
              pointerEvents: `${paginas.animalBasePage ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '10vw' }}>
              <Image
                src={logo2Branca}
                alt="logoAnimal"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              text="Solicitação de Registro de Animais Puros por Adjudicação | ABCPD"
              fontFamily="pop"
              fontWeight="700"
              size="2vw"
              color="black"
            />

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Série alfabética"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Criador"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Estado da solicitação"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Ação"
                    color="black"
                    fontWeight="400"
                  />
                </th>
              </TableHeader>
            {solicitacoesAnimaisBase ? solicitacoesAnimaisBase.map((index: SolicitacaoRegistroAnimalBaseDTO)=>{
              return (<TableContent key={index.criadorId}>
                <td style={{ width: '20%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={ todosRebanhos ? (todosRebanhos.find((reb:RebanhoDTO) => {
                      return reb.id == index.rebanhoId
                    }) || {}).serie : ''}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={CriadoresData ? (CriadoresData?.find((cr: CriadorDTO)=>{
                      return cr.id == index.criadorId
                    }) || {}).nomeCompleto : null}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td style={{ width: '25%' }}>
                  <Text
                    widthImage="1.5vw"
                    src={index.estadoSolicitacao == 'Em análise'? waiting : done}
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={index.estadoSolicitacao}
                    color="black"
                    fontWeight="400"
                  />
                </td>

                <td>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%'
                    }}
                  >
                    <Button
                      marginTopImage="0.3vw"
                      textButton="Marcar Como Finalizado"
                      radius="2vw"
                      marginLeftImage="0vw"
                      marginRightImage="0vw"
                      colorButton="#0B7AB8"
                      heightButton="3vw"
                      widthButton="16vw"
                      textColor="white"
                    />
                    <div style={{marginLeft:'1vw'}}>
                    <Button
                      marginTopImage="0.3vw"
                      src={searchIcon}
                      radius="2vw"
                      marginLeftImage="0vw"
                      marginRightImage="0vw"
                      colorButton="#0B7AB8"
                      heightButton="3vw"
                      widthButton="3vw"
                      textColor="white"
                      onClick={() => {
                        setPaginas(()=>({
                          ...updatedPages,
                          verAnimalPage: true,
                        })),
                        setAnimalBaseInfo((prev)=>({
                          ...prev,
                          solicitacoesAnimaisBaseSelecionada: index
                        }))
                        , setTypeCadastro("animalBase")
                      }}
                    />
                    </div>
                  
                  </div>
                </td>
              </TableContent>)
            }) : null}
                          
            </Table>

            <div style={{ display: 'flex', marginTop: '1vw' }}>
              <Button
                colorButton="black"
                heightButton="2vw"
                textButton="← Voltar"
                widthButton="7vw"
                textColor="white"
              />
            </div>
          </RegistroAnimalBase>

          <TelaFazendasCriador
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.comunicNascPage ? 0 : -50,
              opacity: paginas.comunicNascPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.comunicNascPage ? 'block' : 'none'}`,
              pointerEvents: `${paginas.comunicNascPage ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '4vw' }}>
              <Image
                src={logo2Branca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Todos as Fazendas dos Criadores"
              color="black"
              fontWeight="600"
            />

            <div style={{ width: '30%' }}>
              <InputText
                fontSize="1.2vw"
                placeholder="Buscar"
                height="3vw"
                border="solid 1px rgba(103, 97, 97, 0.5)"
                borderRight="solid 1px rgba(103, 97, 97, 0.5)"
                borderLeft="solid 1px rgba(103, 97, 97, 0.5)"
                borderTop="solid 1px rgba(103, 97, 97, 0.5)"
                borderColor="rgba(103, 97, 97, 0.5)"
              />
            </div>

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Nome da Fazenda"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Criador"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Telefone- fazenda"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Mais Informações"
                    color="black"
                    fontWeight="400"
                  />
                </th>
              </TableHeader>
              {todasFazendas
                ? todasFazendas.map((index: FazendaDTO) => {
                    return (
                      <TableContent key={index.id}>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={index.nomeFazenda}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={
                              (
                                CriadoresData?.find((indexFind: CriadorDTO) => {
                                  return indexFind.id === index.criadorFazenda
                                }) || {}
                              ).nomeCompleto || ''
                            }
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={index.telefoneFazenda}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              onClick={() => {
                                getNascimentos(index.criadorFazenda)
                                setPaginas(()=>({
                                  ...updatedPages,
                                  todasComunicNascPage: true,
                                }))
                              }}
                              marginTopImage="0.6vw"
                              radius="2.5vw"
                              marginLeftImage="0vw"
                              marginRightImage="0vw"
                              src={seta}
                              colorButton="white"
                              heightButton="2.8vw"
                              widthImage="100%"
                              widthButton="3vw"
                              textColor="white"
                            />
                          </div>
                        </td>
                      </TableContent>
                    )
                  })
                : null}
            </Table>

            <div style={{ marginTop: '1vw' }}>
              <Button
                colorButton="black"
                heightButton="2vw"
                textButton="← Voltar"
                widthButton="7vw"
                textColor="white"
              />
            </div>
          </TelaFazendasCriador>

          <ComunicNascimento
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.todasComunicNascPage ? 0 : -50,
              opacity: paginas.todasComunicNascPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.todasComunicNascPage ? 'block' : 'none'}`,
              pointerEvents: `${paginas.todasComunicNascPage ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '4vw' }}>
              <Image
                src={logo2Branca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Todas Comunicações de Nascimento do Criador | ABCPD"
              color="black"
              fontWeight="600"
            />

            <div style={{ width: '30%' }}>
              <InputText
                fontSize="1.2vw"
                placeholder="Buscar"
                height="3vw"
                border="solid 1px rgba(103, 97, 97, 0.5)"
                borderRight="solid 1px rgba(103, 97, 97, 0.5)"
                borderLeft="solid 1px rgba(103, 97, 97, 0.5)"
                borderTop="solid 1px rgba(103, 97, 97, 0.5)"
                borderColor="rgba(103, 97, 97, 0.5)"
              />
            </div>

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Data da Comunicação"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Matriz"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Bezerro"
                    color="black"
                    fontWeight="400"
                  />
                </th>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Opções"
                    color="black"
                    fontWeight="400"
                  />
                </th>
              </TableHeader>
              {nascimentos
                ? nascimentos.map((index: ComunicacaoNascimentoDto) => {
                    return (
                      <TableContent key={index.id}>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={format(new Date(index.dataComunicacao), 'dd/ MM/ yyyy')}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={(todosAnimais.find((indexAnimal)=>{
                              return index.matrizAnimalId == indexAnimal.id
                            })|| {}).nomeAnimal || ''}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <Text
                            textAlign="center"
                            fontFamily="rob"
                            size={'1vw'}
                            text={index.animalBezerro}
                            color="black"
                            fontWeight="400"
                          />
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              onClick={() => {
                                setPaginas(()=>({
                                  ...updatedPages,
                                  verComunicNascPage: true,
                                }))
                              }}
                              marginTopImage="0.6vw"
                              radius="2.5vw"
                              marginLeftImage="0vw"
                              marginRightImage="0vw"
                              src={add}
                              colorButton="white"
                              heightButton="2.8vw"
                              widthImage="100%"
                              widthButton="3vw"
                              textColor="white"
                            />
                          </div>
                        </td>
                      </TableContent>
                    )
                  })
                : null}
            </Table>

            <div style={{ marginTop: '1vw' }}>
              <Button
                colorButton="black"
                heightButton="2vw"
                textButton="← Voltar"
                widthButton="7vw"
                textColor="white"
              />
            </div>
          </ComunicNascimento>

          <VerComunicNascimento
            initial={{ opacity: 0 }}
            animate={{
              y: paginas.verComunicNascPage ? 0 : -50,
              opacity: paginas.verComunicNascPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${paginas.verComunicNascPage ? 'flex' : 'none'}`,
              pointerEvents: `${paginas.verComunicNascPage ? 'auto' : 'none'}`,
            }}
          >
            <div style={{ width: '10vw' }}>
              <Image
                src={logo2Branca}
                alt="logoAnimal"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              text="Registro de um Novo Bezerro | ABCPD"
              fontFamily="pop"
              fontWeight="700"
              size="1.8vw"
              color="black"
            />

            <InputPlace>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome do Bezerro"
                color="black"
                fontWeight="300"
              />
              <InputText />
            </InputPlace>

            

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Mês Da Avaliação"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Ano Da Avaliação"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Sexo do Animal"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Pelagem do Animal"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Data de Nascimento"
                  color="black"
                  fontWeight="300"
                />
                <InputText type="date" />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Imagem 01"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.4vw"
                  height="3vw"
                  type="file"
                  accept="image/*"
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Imagem 02"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.4vw"
                  height="3vw"
                  type="file"
                  accept="image/*"
                />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Imagem 03"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.4vw"
                  height="3vw"
                  type="file"
                  accept="image/*"
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Imagem 04"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.4vw"
                  height="3vw"
                  type="file"
                  accept="image/*"
                />
              </InputPlace>
            </InputPair>

            <div
              style={{
                display: 'flex',
                marginTop: '1vw',
                justifyContent: 'space-between',
                width: '35%',
                marginLeft: '41.9vw',
                marginBottom: '10vw',
              }}
            >
              <Button
                colorButton="black"
                heightButton="2vw"
                textButton="← Voltar"
                widthButton="7vw"
                textColor="white"
              />
              <Button
                colorButton="#9E4B00"
                heightButton="2vw"
                textButton="Registrar Animal"
                widthButton="17vw"
                textColor="white"
              />
            </div>
          </VerComunicNascimento>
          
        </Content>
      </Container>
    </>
  )
}
