/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
'use client'
import {
  Home,
  animal,
  logo2Branca,
  arrowLeft,
  boi,
  comunic,
  done,
  hamb,
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
  ComunicCobertura,
  InputPlace,
  ComunicNascimento,
  VerComunicNascimento,
  VerAnimals,
  InputPair,
  InputText,
  Select,
} from './style'
import { format } from 'date-fns'
import Image from 'next/legacy/image'
import { Button } from '../Button'
import { Text } from '../Text'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SelectBox } from '../SelectBox'
import * as z from 'zod'
import AnimalDTO from '@/utils/AnimalDTO'
import TecnicoDTO from '@/utils/TecnicoDTO'
import { ComunicarCobertura, getAllCoberturas } from '@/actions/coberturaApi'
import jsonWebTokenService from 'jsonwebtoken'
import FazendaDTO from '@/utils/FazendaDTO'
import { AlertContext } from '@/context/AlertContextProvider'
import { useQuery } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Checkbox, CircularProgress, LinearProgress } from '@mui/material'
import { SolicitacaoRegistroAnimalBaseDTO } from '@/utils/SolicitacaoDTO'
import { registrarAnimaisBase } from '@/actions/animalBaseApi'
import { getCriadorByUserId, getCriadorTransferencia } from '@/actions/criadorApi'
import ComunicacaoCoberturaDto from '@/utils/CoberturaDTO'
import { ArvoreGenealogica } from '../ArvoreGenealogica'
import { Tree } from 'react-organizational-chart'
import { ComunicacaoNascimentoDto } from '@/utils/ComunicacaoNascimentoDTO'
import { criarComunicacaoNacimento } from '@/actions/comunicacaoNascimento'
import RebanhoDTO from '@/utils/RebanhoDTO'
import { getRebanhoByFazendaId } from '@/actions/RebanhApi'
import { getFazendaCriador } from '@/actions/fazendaApi'
import { getTecnicoEmail, getTecnicos } from '@/actions/tecnicoApi'
import { getAnimaisCriador } from '@/actions/animaisApi'
import { DetalhesAnimal } from '../DetalhesAnimal'
import CriadorDTO from '@/utils/CriadorDTO'
import { sendEmail } from '@/actions/emailApi'
import { getUserById } from '@/actions/user'
import UserDTO from '@/utils/UserDTO'

export function CriadorDashboard(data: { token: string }) {
  const decodedJwt = jsonWebTokenService.decode(data.token)

  const { data: criador, isLoading: isLoadingCriador } = useQuery<CriadorDTO>(
    'criadores',
    async () => getCriadorByUserId(decodedJwt?.sub, data.token),
  )

  const { data: criadorAdquirente, isLoading: isLoadingCriadorAdquirente } = useQuery<CriadorDTO>(
    'adquirente',
    async () => getCriadorTransferencia(data.token),
  )

  const [fazendaID, setFazendaID] = useState('')
  const { data: rebanhos, isLoading: isLoadingRebanho } = useQuery(
    'rebanhos',
    async () => getRebanhoByFazendaId(fazendaID, data.token),
    
    { enabled: fazendaID != '' },
  )

  const { isLoading: isLoadingFazendas, data: fazendas } = useQuery(
    'fazendas',
    async () => getFazendaCriador(data.token, criador.id),
    {enabled: criador !== undefined}
  )

  const { isLoading: isLoadingTecnicos, data: tecnicos } = useQuery(
    'tecnicos',
    async () => getTecnicos(data.token),
  )

  const { isLoading: isLoadingAnimais, data: animaisCriador } = useQuery(
    'animais',
    async () => getAnimaisCriador(data.token),
  )

  const schemaCobertura = z.object({
    nomeCobertura: z.string().min(1, 'Nome da cobertura não pode ficar vazio'),
    observacoes: z.string(),
    tipoCobertura: z.string().min(1, 'Selecione um tipo de cobertura'),
    fazendaCobertura: z.string().min(1, 'Selecione uma fazenda'),
  })

  const schemaTransferencia = z.object({
    adquirente: z.string().min(1, 'Selecione adquirente'),
    animal: z.string().min(1, 'Selecione um animal'),
    fazendaAdquirente: z.string().min(1, 'Selecione uma fazenda'),
  })

  useEffect(() => {
    
  }, [fazendaID]);

  const {
    register: registerCobertura,
    handleSubmit: handleCobertura,
    formState: { errors: errorsCobertura },
    setValue: setValueCobertura
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaCobertura),
  })

  const {
    register: registerTransferencia,
    handleSubmit: handleTransferencia,
    formState: { errors: errorsTransferencia },
    setValue: setValueTransferencia
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaTransferencia),
  })

  const { register: registerAnimalBase, handleSubmit: handleAnimalBase, setValue: setValueAnimalBase } =
    useForm({
      criteriaMode: 'all',
      mode: 'all',
    })

  const nascimentoSchema = z.object({
    nomeBezerro: z.string().nonempty('Nome do bezerro é um campo obrigatório'),
    tecnicoNascimento: z
      .string()
      .nonempty('Técnico do nascimento é um campo obrigatório'),
    fazendaNascimento: z
      .string()
      .nonempty('Fazenda de nascimento é um campo obrigatório'),
    dataNascimento: z
      .string()
      .nonempty('Data de nascimento é um campo obrigatório'),
  })
  const [page, setPage] = useState(1)

  const {
    register: registerNascimento,
    handleSubmit: handleNascimento,
    formState: { errors: errorsNascimento },
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(nascimentoSchema),
  })

  const [paginas, setPaginas] = useState({
    animalPage: false,
    verAnimalPage: false,
    initialPage: true,
    comunicPage: false,
    animalBasePage: false,
    comunicCoberturaPage: false,
    comunicNascPage: false,
    verComunicNascPage: false,
    loading: false,
    options: false,
    menu: false,
    comunicObito:false,
    transferirPage: false
  })

  const [animalInfos, setAnimalInfos] = useState({
    animalSelecionado : {} as AnimalDTO,
    fazendaSelecionado: {} as FazendaDTO,
    criadorSelecionado: {} as CriadorDTO,
    paiSelecionado: {} as AnimalDTO,
    maeSelecionado:{} as AnimalDTO,
    resgistro: false
  })
  const {animalSelecionado} = animalInfos
  const [adquirente, setAdquirente] = useState('')
  const {
    animalBasePage,
    animalPage,
    comunicCoberturaPage,
    comunicNascPage,
    comunicPage,
    initialPage,
    loading,
    menu,
    options,
    verAnimalPage,
    verComunicNascPage,
    comunicObito,
    transferirPage
  } = paginas

  const [search, setSearch] = useState({
    numeroProcuradoM: '',
    numeroProcuradoF: '',
  })
  
  const { alert } = useContext(AlertContext)
  const [animaisSelecionadosCobertura, setAnimaisSelecionadosCobertura] =
    useState({
      animaisSelecionadosMatriz: [],
      animaisSelecionados: [],
    })

  const [coberturaSelecionada, setCoberturaSelecionada] =
    useState<ComunicacaoCoberturaDto>({})
  const [coberturas, setCoberturas] = useState<ComunicacaoCoberturaDto[]>([])

  const initialComunicacaoCobertura = {
    nomeCobertura: '',
    observacoes: '',
    tipoCobertura: '',
  }
  const fieldDisplayNames = {
    nomeCobertura: 'Nome da Cobertura',
    observacoes: 'Observações',
    statusCobertura: 'Status da Cobertura',
    tipoCobertura: 'Tipo de Cobertura',
  }
  const fieldNames = Object.keys(initialComunicacaoCobertura)
  const { animaisSelecionados, animaisSelecionadosMatriz } =
    animaisSelecionadosCobertura
  const { numeroProcuradoF, numeroProcuradoM } = search
  
  let fazendaCobertura: FazendaDTO | null = null

  if (fazendas ) {
    fazendaCobertura = fazendas.find(
      (index: FazendaDTO) => index.id === coberturaSelecionada.fazendaCobertura,
    )
  }

  const handleCheckboxChangeMatriz = (animal: AnimalDTO) => {
    if (
      animaisSelecionadosMatriz.some(
        (selectedAnimal) => selectedAnimal.id === animal.id,
      )
    ) {
      setAnimaisSelecionadosCobertura((prev) => ({
        ...prev,
        animaisSelecionadosMatriz: (
          animaisSelecionadosMatriz.filter(
            (selectedAnimal) => selectedAnimal.id !== animal.id,
          ),
        )
      }))
    } else {
      setAnimaisSelecionadosCobertura((prev) => ({
        ...prev,
        animaisSelecionadosMatriz: [...prev.animaisSelecionadosMatriz, animal]
      }))
    }
  }

  const handleCheckboxChange = (animal: AnimalDTO) => {
    if (
      animaisSelecionados.some(
        (selectedAnimal) => selectedAnimal.id === animal.id,
      )
    ) {
      setAnimaisSelecionadosCobertura((prev) => ({
        ...prev,
        animaisSelecionados: (
          animaisSelecionados.filter(
            (selectedAnimal) => selectedAnimal.id !== animal.id,
          ),
        )
      }))
    } else {
      setAnimaisSelecionadosCobertura((prev) => ({
        ...prev,
        animaisSelecionados: [...prev.animaisSelecionados, animal ]
      }))
    }
  }

  const submitCobertura = async (dataCobertura: ComunicacaoCoberturaDto) => {
    
    if (animaisSelecionados.length == 0) {
      return alert('É necessário selecionar pelo menos um animal reprodutor')
    }
    if (animaisSelecionadosMatriz.length == 0) {
      return alert('É necessário selecionar pelo menos um animal matriz')
    }
    const animais = [...animaisSelecionados, ...animaisSelecionadosMatriz]
    const dataCoberturaApi = {
      criadorCobertura: criador.id,
      fazendaCobertura: dataCobertura.fazendaCobertura,
      nomeCobertura: dataCobertura.nomeCobertura,
      observacoes: dataCobertura.observacoes,
      statusCobertura: 'Em Análise',
      tipoCobertura: dataCobertura.tipoCobertura,
      finalizadoCobertura: false,
      pago: false,
      animais,
    }

    try {
      const response = await ComunicarCobertura(dataCoberturaApi, data.token)
      if (response.status == 201) {
        Object.keys(dataCobertura).forEach((fieldName) => {
          setValueCobertura(fieldName, '')
        })
        alert('Solicitação de cobertura cadastrada com sucesso', 'success')
      }
    } catch (e) {
 
    }
    setAnimaisSelecionadosCobertura((prev)=>({
      animaisSelecionados: [],
      animaisSelecionadosMatriz: []
    }))
  }

  async function submitTransferencia(data){
    console.log(data);
    
  }

  async function handleSubmitNascimento(e) {
    if (animaisSelecionadosMatriz.length > 1) {
      return alert('Selecione somente um animal matriz')
    }

    if (animaisSelecionados.length > 1) {
      return alert('Selecione somente um animal reprodutor')
    }

    if (animaisSelecionadosMatriz.length < 1) {
      return alert('Selecione um animal matriz')
    }

    if (animaisSelecionados.length < 1) {
      return alert('Selecione um animal reprodutor')
    }
    setPaginas((prev) => ({
      ...prev,
      loading: true,
    }))
    const dataNascimento: ComunicacaoNascimentoDto = {
      coberturaRegistradaId: coberturaSelecionada.id,
      criadorNascimentoId: criador.id,
      dataComunicacao: new Date().toISOString(),
      matrizAnimalId: animaisSelecionadosMatriz[0].id,
      reprodutorAnimalId: animaisSelecionados[0].id,
      animalBezerro: e.nomeBezerro,
      statusNascimento: 'Em análise',
      fazendaNascimentoId: e.fazendaNascimento,
      tecnicoNascimentoId: e.tecnicoNascimento,
      dataNascimento: e.dataNascimento,
      finalizadoNascimento: false,
      observacoes: e.observacoes || '',
    }

    const response = await criarComunicacaoNacimento(dataNascimento, data.token)


    if (response.status == 201) {
      setPaginas((prev) => ({
        ...prev,
        loading: false,
      }))
      setAnimaisSelecionadosCobertura((prev)=>({
        animaisSelecionados: [],
        animaisSelecionadosMatriz: []
      }))
      return alert('Comunicação criada com sucesso', 'success')
    } else {
      setPaginas((prev) => ({
        ...prev,
        loading: false,
      }))
      return alert('Houve um erro ao criar a comunicação')
    }
  }

  async function solicitacaoAnimalBase(
    dataSolicitacao: SolicitacaoRegistroAnimalBaseDTO,
  ) {
    setPaginas((prev) => ({
      ...prev,
      loading: true,
    }))

    if (dataSolicitacao.tecnicoId == '') {
      return alert('Selecione um técnico')
    }

    if (dataSolicitacao.fazendaId == '') {
      return alert('Selecione uma fazenda')
    }

    if (dataSolicitacao.rebanhoId == '') {
      return alert('Selecione um rebanho')
    }

    if (dataSolicitacao.quantidadeAnimais == undefined) {
      return alert('Defina a quantidade de animais')
    }
    const dataAPI: SolicitacaoRegistroAnimalBaseDTO = {
      ...dataSolicitacao,
      estadoSolicitacao: 'Em Aberto',
      criadorId: criador.id,
      quantidadeAnimais: parseInt(dataSolicitacao.quantidadeAnimais),
    }

    const response = await registrarAnimaisBase(dataAPI, data.token)

    if (!response.message) {
      setPaginas((prev) => ({
        ...prev,
        loading: false,
      }))
      const tecnicoUser = await getTecnicoEmail(data.token,dataSolicitacao.tecnicoId)
      Object.keys(dataSolicitacao).forEach((fieldName) => {
        setValueAnimalBase(fieldName, '')
      })
      console.log(tecnicoUser);
      
      alert('Solicitação criada com sucesso', 'success')
      await sendEmail({to:`${tecnicoUser.user.email}`, subject:"Nova solicitação de registro de animais puros por adjudicação foi criada"}, data.token)
    }
    setPaginas((prev) => ({
      ...prev,
      loading: false,
    }))
  }

  async function getCoberturas() {
    setPaginas((prev) => ({
      ...prev,
      loading: true,
    }))
    if (coberturas.length == 0) {
      const response = await getAllCoberturas(data.token, criador.id)

      if (response.message) {
        return alert('Erro ao carregar dados ')
      }
      setCoberturas(response)
    }

    setPaginas((prev) => ({
      ...prev,
      loading: false,
    }))
  }

  function paginate({ items, currentPage }: PaginationOptions) {
    const itemsPerPage = 4
    if (!Array.isArray(items) || itemsPerPage <= 0 || currentPage <= 0) {
      throw new Error('Invalid input parameters')
    }
    const startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = startIndex + itemsPerPage

    if (endIndex > items.length) {
      endIndex = items.length
    }

    return items.slice(startIndex, endIndex)
  }

  const updatedPages = { ...paginas }

  for (const key in updatedPages) {
    if (key !== 'menu') {
      updatedPages[key] = false
    }
  }

  if (
    isLoadingAnimais ||
    isLoadingFazendas ||
    isLoadingCriador ||
    isLoadingTecnicos
  ) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <Container>
      <Menu
        initial={{ width: '20%' }}
        animate={{ width: menu ? '20%' : '5%' }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ x: '13vw' }}
          transition={{ duration: 0.5 }}
          animate={{ x: menu ? '13vw' : '1.5vw' }}
          onClick={async () => {
            setPaginas((prev) => ({
              ...updatedPages,
              menu: !prev.menu,
            }))

          }}
          style={{ width: '100%', display: 'flex', marginTop: '1vw' }}
        >
          <div style={{ width: '2vw' }}>
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
          animate={{ x: menu ? '0vw' : '-20vw', opacity: menu ? 1 : 0 }}
          style={{
            display: menu ? 'flex' : 'none',
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
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>

            <div style={{ width: '10vw' }}>
              <Image
                src={logoBranca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
                  initialPage: !prev.initialPage,
                }))
              }}
              colorButton={initialPage ? 'black' : '#9E4B00'}
              textButton="Pagina Inicial"
            />
            <Button
              widthButton="16vw"
              widthImage="1.8vw"
              src={logo2Branca}
              heightButton="3.3vw"
              onClick={() => {
                setPaginas((prev) => ({
                  ...updatedPages,
                  animalPage: !prev.animalPage,
                }))
              }}
              colorButton={animalPage || verAnimalPage ? 'black' : '#9E4B00'}
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
              colorButton={
                comunicPage ||
                animalBasePage ||
                comunicCoberturaPage ||
                comunicNascPage ||
                verComunicNascPage||
                comunicObito
                  ? 'black'
                  : '#9E4B00'
              }
              textButton="Comunicações "
            />

            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y:
                  comunicPage ||
                  animalBasePage ||
                  comunicCoberturaPage ||
                  comunicNascPage ||
                  verComunicNascPage||
                  comunicObito|| 
                  transferirPage
                    ? 0
                    : -50,
                opacity:
                  comunicPage ||
                  animalBasePage ||
                  comunicCoberturaPage ||
                  comunicNascPage ||
                  verComunicNascPage||
                  comunicObito||
                  transferirPage
                    ? 1
                    : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: `${
                  comunicPage ||
                  animalBasePage ||
                  comunicCoberturaPage ||
                  comunicNascPage ||
                  verComunicNascPage ||
                  comunicObito|| 
                  transferirPage
                    ? 'auto'
                    : 'none'
                }`,
              }}
            >
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={animalBasePage ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    animalBasePage: !prev.animalBasePage,
                  }))
                }}
                colorButton={animalBasePage ? 'black' : 'white'}
                textButton="Registrar PA"
              />
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={comunicCoberturaPage ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    comunicCoberturaPage: !prev.comunicCoberturaPage,
                  }))
                }}
                colorButton={comunicCoberturaPage ? 'black' : 'white'}
                textButton="Comunicações de Cobertura"
              />

              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={
                  comunicNascPage || verComunicNascPage ? 'white' : 'black'
                }
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    comunicNascPage: !prev.comunicNascPage,
                  }))
                  getCoberturas()
                }}
                colorButton={
                  comunicNascPage || verComunicNascPage ? 'black' : 'white'
                }
                textButton="Comunicações de Nascimento"
              />

              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={
                  comunicObito ? 'white' : 'black'
                }
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    comunicObito: !prev.comunicObito,
                  }))
                  getCoberturas()
                }}
                colorButton={
                  comunicObito ? 'black' : 'white'
                }
                textButton="Comunicar Óbito"
              />

              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={
                  transferirPage ? 'white' : 'black'
                }
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    transferirPage: !prev.transferirPage,
                  }))
                  getCoberturas()
                }}
                colorButton={
                  transferirPage ? 'black' : 'white'
                }
                textButton="Transferir Animal"
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
              height: '10vw',
            }}
          >
            <Button
              marginRightImage="0.6vw"
              marginLeftImage={'0.6vw'}
              textSize="0.9vw"
              widthButton="100%"
              widthImage="0.5vw"
              src={arrowLeft}
              textColor="black"
              heightButton="3.3vw"
              colorButton="white"
              onClick={() => {
                window.location.assign(`/Payment/${data.token}`)
              }}
              textButton="Associar-se"
            />
            <Button
              marginRightImage="0.6vw"
              marginLeftImage={'0.6vw'}
              textSize="0.9vw"
              widthButton="100%"
              widthImage="0.5vw"
              src={arrowLeft}
              textColor="black"
              heightButton="3.3vw"
              colorButton="white"
              onClick={() => {
                window.location.assign(`/CadastrarRebanho/${data.token}`)
              }}
              textButton="Cadastrar Rebanho"
            />
            <Button
              marginRightImage="0.6vw"
              marginLeftImage={'0.6vw'}
              textSize="0.9vw"
              widthButton="100%"
              textColor="black"
              widthImage="0.5vw"
              src={arrowLeft}
              colorButton="white"
              heightButton="3.3vw"
              onClick={() => {
                window.location.assign(`/CadastrarFazenda/${data.token}`)
              }}
              textButton="Cadastrar fazenda"
            />
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
          <div style={{ display: 'flex', width: '27%' }}>
            <div style={{ width: '4vw' }}>
              <Image
                src={user}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div
              onClick={() => {
                setPaginas((prev) => ({
                  ...prev,
                  options: !prev.options,
                }))
              }}
              style={{ cursor: 'pointer', width: '15vw' }}
            >
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text={`${criador.user.nomePrimeiro} ⚙️`}
                color="black"
                fontWeight="600"
              />
            </div>
          </div>
        </Header>

        <motion.div
          animate={{ y: initialPage ? 0 : -50, opacity: initialPage ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${initialPage ? 'flex' : 'none'}`,
            pointerEvents: `${initialPage ? 'auto' : 'none'}`,
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

        <Animals
          initial={{ opacity: 0 }}
          animate={{ y: animalPage ? 0 : -50, opacity: animalPage ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${animalPage ? 'block' : 'none'}`,
            pointerEvents: `${animalPage ? 'auto' : 'none'}`,
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
                  text="NÚMERO"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.3vw'}
                  text="REGISTRO"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.3vw'}
                  text="FAZENDA"
                  color="black"
                  fontWeight="400"
                />
              </th>

              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.1vw'}
                  text="DECISÃO TÉCNICO RGN"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.1vw'}
                  text="DECISÃO TÉCNICO RGD"
                  color="black"
                  fontWeight="400"
                />
              </th>

              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.1vw'}
                  text="OPÇÕES"
                  color="black"
                  fontWeight="400"
                />
              </th>
            </TableHeader>

            {paginate({items: animaisCriador, currentPage: page}).map((data: AnimalDTO) => {
              const fazendaCriador: FazendaDTO = fazendas.find((index) => {
                return index.id == data.fazenda
              })
              return (
                <TableContent key={data.id}>
                  <td style={{ width: '20%' }}>
                    <Text
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={data.nomeAnimal}
                      color="black"
                      fontWeight="400"
                    />
                  </td>
                  <td>
                    <Text
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={data.registro}
                      color="black"
                      fontWeight="400"
                    />
                  </td>
                  <td style={{ width: '25%' }}>
                    <Text
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={fazendaCriador.nomeFazenda}
                      color="black"
                      fontWeight="400"
                    />
                  </td>

                  <td>
                    <Text
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      src={
                        data.decisaoAnimalTecnicoRGN == 'Registrado'
                          ? done
                          : waiting
                      }
                      text={
                        data.decisaoAnimalTecnicoRGN == 'Registrado'
                          ? 'Registrado'
                          : 'Em análise'
                      }
                      color="black"
                      fontWeight="400"
                      widthImage="1.5vw"
                    />
                  </td>
                  <td>
                    <Text
                      widthImage="1.5vw"
                      src={
                        data.decisaoAnimalTecnicoRGD == 'Registrado'
                          ? done
                          : waiting
                      }
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={
                        data.decisaoAnimalTecnicoRGD == 'Registrado'
                          ? 'Registrado'
                          : 'Em análise'
                      }
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
                          setAnimalInfos((prev) =>({
                            ...prev,
                            animalSelecionado: data,
                            fazendaSelecionado: fazendas.find(
                              (index: FazendaDTO) => index.id === data?.fazenda,
                            ),
                            criadorSelecionado: criador,
                            paiSelecionado: (animaisCriador.find((index)=>{
                              return index.id === data.pai
                            }) || {}),
                            maeSelecionado:( animaisCriador.find((index)=>{
                              return index.id === data.mae
                            }) || {}),
                          }))

                          setPaginas((prev) => ({
                            ...updatedPages,
                            verAnimalPage: true,
                          }))

                         

                          console.log(animalInfos);

                        }}
                      />
                    </div>
                  </td>
                </TableContent>
              )
            })}
          </Table>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1vw',
            }}
          >
            <div style={{ marginRight: '1vw' }}>
              <Button
                colorButton="green"
                heightButton="2vw"
                widthButton="3vw"
                textButton="<"
                onClick={() => {
                  setPage((prevPage) =>
                    prevPage > 1 ? prevPage - 1 : prevPage,
                  )
                }}
              />
            </div>

            <Button
              colorButton="green"
              heightButton="2vw"
              widthButton="3vw"
              textButton=">"
              onClick={() => {
                setPage((prevPage) => prevPage + 1)
              }}
            />
          </div>
        </Animals>

        <VerAnimals
          initial={{ opacity: 0 }}
          animate={{
            y: verAnimalPage ? 0 : -50,
            opacity: verAnimalPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${verAnimalPage ? 'flex' : 'none'}`,
            pointerEvents: `${verAnimalPage ? 'auto' : 'none'}`,
          }}
        >
          {Object.values(animalSelecionado).length == 0 ? null : <DetalhesAnimal animaisCriador={animaisCriador} animalInfos={animalInfos} token={data.token} registro={false}/>}

        </VerAnimals>

        <RegistroAnimalBase
          initial={{ opacity: 0 }}
          animate={{
            y: animalBasePage ? 0 : -50,
            opacity: animalBasePage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${animalBasePage ? 'flex' : 'none'}`,
            pointerEvents: `${animalBasePage ? 'auto' : 'none'}`,
          }}
          onSubmit={handleAnimalBase(solicitacaoAnimalBase)}
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={logo2Branca}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Solicitação de Registro de PA | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="2vw"
            color="black"
          />
          <div style={{width:'90%'}}>
          <div>
            <Text
              text="Técnico"
              fontFamily="rob"
              fontWeight="400"
              size="2vw"
              color="black"
            />
            <Select
              {...registerAnimalBase('tecnicoId', { required: true })}
            >
              {' '}
              <option disabled selected>
                Selecione um tecnico
              </option>
              {tecnicos.map((data: TecnicoDTO) => {
                return (
                  <option value={data.id} key={data.nomeCompleto}>
                    {data.nomeCompleto}
                  </option>
                )
              })}
            </Select>
          </div>

          <div>
            <Text
              text="Fazenda"
              fontFamily="rob"
              fontWeight="400"
              size="2vw"
              color="black"
            />
            <Select
  
              {...registerAnimalBase('fazendaId', { required: true })}
              onChange={(e) => {
                const selectedFazendaID = e.target.value
                setFazendaID(selectedFazendaID)
              }}
            >
              <option disabled selected>
                Selecione uma fazenda
              </option>
              {fazendas.map((data: FazendaDTO) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.nomeFazenda}
                  </option>
                )
              })}
            </Select>
          </div>

          <div>
            <Text
              text="Rebanho"
              fontFamily="rob"
              fontWeight="400"
              size="2vw"
              color="black"
            />
            <Select
           
              {...registerAnimalBase('rebanhoId', { required: true })}
            >
               <option disabled selected>
                Selecione um rebanho
              </option>
              {rebanhos
                ? rebanhos.map((data: RebanhoDTO) => {
                    return (
                      <option value={data.id} key={data.id}>
                        {data.serie}
                      </option>
                    )
                  })
                : null}
            </Select>
          </div>

          <div>
            <Text
              text="Quantidade de Animais Base"
              fontFamily="rob"
              fontWeight="400"
              size="2vw"
              color="black"
            />
            <InputText
              {...registerAnimalBase('quantidadeAnimais', { required: true })}
              style={{ width: '98%' }}
              type="number"
            />
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'end',
              width: '100%',

            }}
          >
            {loading ? (
              <CircularProgress size={'2vw'} />
            ) : (
              <Button
                colorButton="#9E4B00"
                heightButton="2vw"
                textButton="Criar Solicitação"
                widthButton="13vw"
                textColor="white"
                type="submit"
              />
            )}
          </div>
          </div>
         
        </RegistroAnimalBase>

        <ComunicCobertura
          initial={{ opacity: 0 }}
          animate={{
            y: comunicCoberturaPage ? 0 : -50,
            opacity: comunicCoberturaPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${comunicCoberturaPage ? 'flex' : 'none'}`,
            pointerEvents: `${comunicCoberturaPage ? 'auto' : 'none'}`,
          }}
          onSubmit={handleCobertura(submitCobertura)}
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={logo2Branca}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Comunicação de Cobertura | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="black"
          />
          <div style={{ width: '100%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text={'Fazenda'}
              color="black"
              fontWeight="300"
            />
            <Select
              style={{ width: '92%' }}
              {...registerCobertura('fazendaCobertura')}
              width="67.5vw"
            >
              <option selected disabled value="">
                Selecione uma fazenda
              </option>
              {fazendas.map((data: FazendaDTO) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.nomeFazenda}
                  </option>
                )
              })}
            </Select>
            {fieldNames.map((fieldName) => (
              <div key={fieldName}>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text={fieldDisplayNames[fieldName]}
                    color="black"
                    fontWeight="300"
                  />
                  {fieldName == 'tipoCobertura' ? (
                    <Select
                      style={{ width: '102%' }}
                      {...registerCobertura('tipoCobertura', {
                        required: true,
                      })}
                    >
                      <option selected disabled value="">
                        Selecione um tipo de cobertura
                      </option>
                      <option>Monta Natural</option>
                      <option>Inseminação Artificial</option>
                    </Select>
                  ) : (
                    <InputText {...registerCobertura(fieldName)} />
                  )}
                </InputPlace>
              </div>
            ))}

            <InputPlace style={{ marginTop: '2vw' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text={'Animal Matriz'}
                    color="black"
                    fontWeight="300"
                  />
                  <InputText
                    placeholder="Procurar animal por número"
                    style={{ width: '30vw' }}
                    type="text"
                    onChange={(e) => {
                      setSearch((prev) => ({
                        ...prev,
                        numeroProcuradoF: e.target.value,
                      }))
                    }}
                  />
                  <div style={{overflowY:'scroll', height:'20vw'}}>
                  {animaisCriador.map((data: AnimalDTO) => {
                    if (data.nomeAnimal.toLocaleLowerCase().includes(numeroProcuradoF.toLocaleLowerCase()) && data.sexoAnimal=="Fêmea" ) {
                      return (
                        <div style={{ display: 'flex' }} key={data.id}>
                          <Text
                            text={data.nomeAnimal}
                            color="black"
                            size="1.5vw"
                          />
                          <Checkbox
                            key={data.id}
                            checked={animaisSelecionadosMatriz.some(
                              (selectedAnimal) => selectedAnimal.id === data.id,
                            )}
                            onChange={() => handleCheckboxChangeMatriz(data)}
                          />
                        </div>
                      )
                    }
                  })}
                </div>
                  
                </div>
                <div>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text={'Animal Reprodutor'}
                    color="black"
                    fontWeight="300"
                  />
                  <InputText
                    placeholder="Procurar animal por número"
                    style={{ width: '30vw' }}
                    type="text"
                    onChange={(e) => {
                      setSearch((prev) => ({
                        ...prev,
                        numeroProcuradoM: e.target.value,
                      }))
                    }}
                  />
                   <div style={{overflowY:'scroll', height:'20vw'}}>
                   {animaisCriador.map((data: AnimalDTO) => {
                    if (data.nomeAnimal.toLocaleLowerCase().includes(numeroProcuradoM.toLocaleLowerCase()) && data.sexoAnimal=="Macho") {
                      return (
                        <div style={{ display: 'flex' }} key={data.id}>
                          <Text
                            text={data.nomeAnimal}
                            color="black"
                            size="1.5vw"
                          />
                          <Checkbox
                            key={data.id}
                            checked={animaisSelecionados.some(
                              (selectedAnimal) => selectedAnimal.id === data.id,
                            )}
                            onChange={() => handleCheckboxChange(data)}
                          />
                        </div>
                      )
                    }
                  })}

                   </div>
                  
                </div>
              </div>
            </InputPlace>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'space-between',
              width: '28%',
              marginLeft: '53.2vw',
              marginBottom: '10vw',
            }}
          >
            <Button
              colorButton="#9E4B00"
              heightButton="2vw"
              textButton="Fazer pagamento"
              widthButton="13vw"
              textColor="white"
              type="submit"
              onClick={() => {
                for (const componente in errorsCobertura) {
                  const mensagem = errorsCobertura[componente]
                  alert(mensagem?.message)
                }
              }}
            />
          </div>
        </ComunicCobertura>

        <ComunicNascimento
          initial={{ opacity: 0 }}
          animate={{
            y: comunicNascPage ? 0 : -50,
            opacity: comunicNascPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${comunicNascPage ? 'block' : 'none'}`,
            pointerEvents: `${comunicNascPage ? 'auto' : 'none'}`,
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
            text="Todas as comunicações de cobertura do Criador"
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
                  text="Tipo de Cobertura"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.3vw'}
                  text="Status"
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
            {loading ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  height: '5vw',
                }}
              >
                <LinearProgress color="inherit" />
                <LinearProgress color="inherit" />
                <LinearProgress color="inherit" />
              </div>
            ) : (
              paginate({items: coberturas, currentPage: page}).map((data: ComunicacaoCoberturaDto) => {
                return (
                  <TableContent key={data.id}>
                    <td>
                      <Text
                        textAlign="center"
                        fontFamily="rob"
                        size={'1vw'}
                        text={data.dataCobertura}
                        color="black"
                        fontWeight="400"
                      />
                    </td>
                    <td>
                      <Text
                        textAlign="center"
                        fontFamily="rob"
                        size={'1vw'}
                        text={data.tipoCobertura}
                        color="black"
                        fontWeight="400"
                      />
                    </td>
                    <td>
                      <Text
                        textAlign="center"
                        fontFamily="rob"
                        size={'1vw'}
                        src={data.statusCobertura == 'Em Análise'? waiting :done}
                        widthImage="1.5vw"
                        text={data.statusCobertura}
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
                            setPaginas((prev) => ({
                              ...updatedPages,
                              verComunicNascPage: true,
                            }))
                            setCoberturaSelecionada(data)
                          }}
                        />
                      </div>
                    </td>
                  </TableContent>
                )
              })
            )}
          </Table>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1vw',
            }}
          >
            <div style={{ marginRight: '1vw' }}>
              <Button
                colorButton="green"
                heightButton="2vw"
                widthButton="3vw"
                textButton="<"
                onClick={() => {
                  setPage((prevPage) =>
                    prevPage > 1 ? prevPage - 1 : prevPage,
                  )
                }}
              />
            </div>

            <Button
              colorButton="green"
              heightButton="2vw"
              widthButton="3vw"
              textButton=">"
              onClick={() => {
                setPage((prevPage) => prevPage + 1)
              }}
            />
          </div>
        </ComunicNascimento>


        <ComunicCobertura
          initial={{ opacity: 0 }}
          animate={{
            y: transferirPage ? 0 : -50,
            opacity: transferirPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${transferirPage ? 'flex' : 'none'}`,
            pointerEvents: `${transferirPage ? 'auto' : 'none'}`,
          }}
          onSubmit={handleTransferencia(submitTransferencia)}
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={logo2Branca}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Transferir Animal | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="black"
          />
          <div style={{ width: '100%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text={'Animal'}
              color="black"
              fontWeight="300"
            />
            <Select
              style={{ width: '92%' }}
              {...registerTransferencia('animal')}
              width="67.5vw"
            >
              <option selected disabled value="">
                Selecione um animal
              </option>
              {animaisCriador.map((data: AnimalDTO) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.nomeAnimal}
                  </option>
                )
              })}
            </Select>
            

            
          </div>

          <div style={{ width: '100%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text={'Criador adquirente'}
              color="black"
              fontWeight="300"
            />
            <Select
              style={{ width: '92%' }}
              {...registerTransferencia('adquirente')}
              width="67.5vw"
              onChange={(e) =>{setAdquirente(e.target.value)}}
            >
              <option selected disabled value="">
                Selecione um criador adquirente
              </option>
              {criadorAdquirente?.map((data: CriadorDTO) => {
                return (
                  <option  value={data.id} key={data.id}>
                    {data.nomeCompleto}
                  </option>
                )
              })}
            </Select>
            

            
          </div>

          <div style={{ width: '100%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text={'Fazenda adquirente'}
              color="black"
              fontWeight="300"
            />
            <Select
              style={{ width: '92%' }}
              {...registerTransferencia('fazendaAdquirente')}
              width="67.5vw"
            >
              <option selected disabled value="">
                Selecione uma fazenda adquirente
              </option>
              {criadorAdquirente?.map((data: CriadorDTO) => {
                if (data.id === adquirente) {
                  return data.fazenda.map((fazenda: FazendaDTO) => (
                    <option value={fazenda.id} key={fazenda.id}>
                      {fazenda.nomeFazenda}
                    </option>
                  ));
                }
                return null; 
              })}
            </Select>
            

            
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'end',
              width: '92%',
              marginBottom: '10vw',
            }}
          >
            <Button
              colorButton="#9E4B00"
              heightButton="2vw"
              textButton="Transferir"
              widthButton="13vw"
              textColor="white"
              type="submit"
              onClick={() => {
                for (const componente in errorsTransferencia) {
                  const mensagem = errorsTransferencia[componente]
                  alert(mensagem?.message)
                }
               
                
              }}
            />
          </div>
        </ComunicCobertura>


        <VerComunicNascimento
          initial={{ opacity: 0 }}
          animate={{
            y: verComunicNascPage ? 0 : -50,
            opacity: verComunicNascPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${verComunicNascPage ? 'flex' : 'none'}`,
            pointerEvents: `${verComunicNascPage ? 'auto' : 'none'}`,
          }}
          onSubmit={handleNascimento(handleSubmitNascimento)}
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={logo2Branca}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Comunicação de Nascimento | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="black"
          />
          <div style={{ display: 'flex', width: '100%' }}>
            <InputPlace>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Número do Reprodutor"
                color="black"
                fontWeight="300"
              />
              {coberturaSelecionada.animais
                ? coberturaSelecionada.animais.map((data: AnimalDTO) => {
                    if (data.sexoAnimal == 'Macho') {
                      return (
                        <div style={{ display: 'flex' }} key={data.id}>
                          <Text
                            text={data.nomeAnimal}
                            color="black"
                            size="1.5vw"
                          />
                          <Checkbox
                            key={data.id}
                            checked={animaisSelecionados.some(
                              (selectedAnimal) => selectedAnimal.id === data.id,
                            )}
                            onChange={() => handleCheckboxChange(data)}
                          />
                        </div>
                      )
                    }
                  })
                : null}
            </InputPlace>

            <InputPlace>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Número da Matriz"
                color="black"
                fontWeight="300"
              />
              {coberturaSelecionada.animais
                ? coberturaSelecionada.animais.map((data: AnimalDTO) => {
                    if (data.sexoAnimal == 'Fêmea') {
                      return (
                        <div style={{ display: 'flex' }} key={data.id}>
                          <Text
                            text={data.nomeAnimal}
                            color="black"
                            size="1.5vw"
                          />
                          <Checkbox
                            key={data.id}
                            checked={animaisSelecionadosMatriz.some(
                              (selectedAnimal) => selectedAnimal.id === data.id,
                            )}
                            onChange={() => handleCheckboxChangeMatriz(data)}
                          />
                        </div>
                      )
                    }
                  })
                : null}
            </InputPlace>
          </div>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Tipo de Cobertura"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={coberturaSelecionada.tipoCobertura}
              style={{ border: 'solid 0.2vw #9E4B00' }}
            />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data da Cobertura"
              color="black"
              fontWeight="300"
            />

            <InputText
              value={
                coberturaSelecionada.dataCobertura
                  ? format(
                      new Date(coberturaSelecionada.dataCobertura),
                      'dd/MM/yyyy',
                    )
                  : ''
              }
              style={{ border: 'solid 0.2vw #9E4B00' }}
              disabled
            />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Fazenda da Cobertura"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={fazendaCobertura ? fazendaCobertura?.nomeFazenda : ''}
              style={{ border: 'solid 0.2vw #9E4B00' }}
            />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Fazenda de Nascimento"
              color="black"
              fontWeight="300"
            />
            <Select

              {...registerNascimento('fazendaNascimento', { required: true })}
              style={{ border: 'solid 0.2vw #9E4B00', width:'102%' }}
            >
              <option selected disabled value="">
                Selecione uma fazenda
              </option>
              {fazendas.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.nomeFazenda}
                  </option>
                )
              })}
            </Select>
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Técnico do Nascimento"
              color="black"
              fontWeight="300"
            />
            <Select
              {...registerNascimento('tecnicoNascimento', { required: true })}
              style={{ border: 'solid 0.2vw #9E4B00', width:'102%' }}
            >
              <option value={''} selected disabled>
                Selecione um técnico
              </option>
              {tecnicos.map((data: TecnicoDTO) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.nomeCompleto}
                  </option>
                )
              })}
            </Select>
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Nome do Bezerro"
              color="black"
              fontWeight="300"
            />
            <InputText
              {...registerNascimento('nomeBezerro', { required: true })}
              style={{ border: 'solid 0.2vw #9E4B00' }}
            />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data do Nascimento"
              color="black"
              fontWeight="300"
            />
            <InputText
              {...registerNascimento('dataNascimento', { required: true })}
              type="date"
              style={{ border: 'solid 0.2vw #9E4B00' }}
            />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Observações"
              color="black"
              fontWeight="300"
            />
            <InputText
              {...registerNascimento('observacoes')}
              style={{ border: 'solid 0.2vw #9E4B00' }}
            />
          </InputPlace>

          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'end',
              width: '92%',
              marginBottom:'2vw'
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                colorButton="#9E4B00"
                heightButton="2vw"
                textButton="Comunicar Nascimento"
                widthButton="17vw"
                textColor="white"
                type="submit"
                onClick={() => {
                  for (const componente in errorsNascimento) {
                    const mensagem = errorsNascimento[componente]
                    alert(mensagem?.message)
                  }
                }}
              />
            )}
          </div>
        </VerComunicNascimento>
      </Content>
    </Container>
  )
}
