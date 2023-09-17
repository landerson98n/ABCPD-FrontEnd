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
  search,
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
import { getCriadorByUserId } from '@/actions/criadorApi'
import ComunicacaoCoberturaDto from '@/utils/CoberturaDTO'
import { ArvoreGenealogica } from '../ArvoreGenealogica'
import { Tree } from 'react-organizational-chart'
import { getUserById } from '@/actions/user'

export function CriadorDashboard(data: { token: string }) {
  const decodedJwt = jsonWebTokenService.decode(data.token)

  const { data: user, isLoading: isLoadingUser } = useQuery('users', async () =>
    getUserById(decodedJwt.sub, data.token),
  )

  const { data: criador, isLoading: isLoadingCriador } = useQuery(
    'users',
    async () => getCriadorByUserId(decodedJwt.sub, data.token),
  )

  const {
    isLoading: isLoadingFazendas,
    error: errorFazendas,
    data: fazendas,
  } = useQuery('fazendas', async () =>
    fetch(
      `http://localhost:3001/fazenda/get-fazendas-criador/${decodedJwt?.sub}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        method: 'GET',
      },
    ).then((res) => res.json()),
  )

  const {
    isLoading: isLoadingTecnicos,
    error: errorTecnico,
    data: tecnicos,
  } = useQuery('tecnicos', async () =>
    fetch('http://localhost:3001/tecnico/get-tecnicos', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      method: 'GET',
    }).then((res) => res.json()),
  )

  const {
    isLoading: isLoadingAnimais,
    error: errorAnimais,
    data: animaisCriador,
  } = useQuery('animais', async () =>
    fetch('http://localhost:3001/animal/get-animal-criador', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      method: 'GET',
    }).then((res) => res.json()),
  )

  const schema = z.object({
    nomeCobertura: z.string().nonempty('Este campo não pode ficar vazio'),
    observacoes: z.enum(['Monta natural', 'Inseminação Artificial']),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
  })

  const { register: registerCobertura, handleSubmit: handleCobertura } =
    useForm({
      criteriaMode: 'all',
      mode: 'all',
    })

  const [animalPage, setAnimalPage] = useState(false)
  const [verAnimalPage, setVerAnimalPage] = useState(false)
  const [initialPage, setInitialPage] = useState(true)
  const [comunicPage, setComunicPage] = useState(false)
  const [animalBasePage, setAnimalBasePage] = useState(false)
  const [comunicCoberturaPage, setComunicCoberturaPage] = useState(false)
  const [comunicNascPage, setComunicNascPage] = useState(false)
  const [verComunicNascPage, setVerComunicNascPage] = useState(false)
  const [numeroProcuradoM, setNumeroProcuradoM] = useState('')
  const [numeroProcuradoF, setNumeroProcuradoF] = useState('')
  const [menu, setMenu] = useState(true)
  const [loading, setLoading] = useState(false)
  const [opcaoSelecionada, setOpcaoSelecionada] = useState({})
  const { alert } = useContext(AlertContext)
  const [animaisSelecionados, setAnimaisSelecionados] = useState([])
  const [animalSelecionado, setAnimalSelecionado] = useState<AnimalDTO>([])
  const [coberturaSelecionada, setCoberturaSelecionada] =
    useState<ComunicacaoCoberturaDto>({})
  const [coberturas, setCoberturas] = useState<ComunicacaoCoberturaDto[]>([])
  const [options, setOptions] = useState(false)
  const [animaisSelecionadosMatriz, setAnimaisSelecionadosMatriz] = useState([])
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
  const [comunicacaoCobertura, setComunicacaoCobertura] = useState(
    initialComunicacaoCobertura,
  )
  let fazendaAnimal: FazendaDTO | null = null
  let fazendaCobertura: FazendaDTO | null = null

  if (fazendas) {
    fazendaAnimal = fazendas.find(
      (index: FazendaDTO) => index.id === animalSelecionado.fazenda,
    )

    fazendaCobertura = fazendas.find(
      (index: FazendaDTO) => index.id === coberturaSelecionada.fazendaCobertura,
    )
  }

  const handleChange = (event) => {
    const novaOpcao = event.target.value
    setOpcaoSelecionada(novaOpcao)
  }

  const handleCheckboxChangeMatriz = (animal: AnimalDTO) => {
    if (
      animaisSelecionadosMatriz.some(
        (selectedAnimal) => selectedAnimal.id === animal.id,
      )
    ) {
      setAnimaisSelecionadosMatriz(
        animaisSelecionados.filter(
          (selectedAnimal) => selectedAnimal.id !== animal.id,
        ),
      )
    } else {
      setAnimaisSelecionadosMatriz([...animaisSelecionados, animal])
    }
  }

  const handleCheckboxChange = (animal: AnimalDTO) => {
    if (
      animaisSelecionados.some(
        (selectedAnimal) => selectedAnimal.id === animal.id,
      )
    ) {
      setAnimaisSelecionados(
        animaisSelecionados.filter(
          (selectedAnimal) => selectedAnimal.id !== animal.id,
        ),
      )
    } else {
      setAnimaisSelecionados([...animaisSelecionados, animal])
    }
  }

  const handleSubmitCobertura = async (e: any) => {
    if (comunicacaoCobertura.tipoCobertura == '') {
      return alert('Selecione um tipo de cobertura')
    }
    console.log(opcaoSelecionada)

    if (Object.values(opcaoSelecionada) == 0) {
      return alert('Selecione uma fazenda')
    }
    const criador = await getCriadorByUserId(decodedJwt?.sub, data.token)
    if (!criador) {
      return
    }
    console.log(criador)

    const animais = [...animaisSelecionados, ...animaisSelecionadosMatriz]
    const dataCobertura = {
      criadorCobertura: criador.id,
      fazendaCobertura: opcaoSelecionada,
      nomeCobertura: comunicacaoCobertura.nomeCobertura,
      observacoes: comunicacaoCobertura.observacoes,
      statusCobertura: 'Em Análise',
      tipoCobertura: comunicacaoCobertura.tipoCobertura,
      finalizadoCobertura: false,
      pago: false,
      animais,
    }

    try {
      const response = ComunicarCobertura(dataCobertura, data.token)
      if ((response.status = 201)) {
        alert('Solicitação de cobertura cadastrada com sucesso', 'success')
      }
    } catch (e) {
      console.log(e)
    }

    setAnimaisSelecionadosMatriz([])
    setAnimaisSelecionados([])
  }

  const handleSubmitNascimento = async (e: any) => {
    if (comunicacaoCobertura.tipoCobertura == '') {
      return alert('Selecione um tipo de cobertura')
    }
    console.log(opcaoSelecionada)

    if (Object.values(opcaoSelecionada) == 0) {
      return alert('Selecione uma fazenda')
    }
    const criador = await getCriadorByUserId(decodedJwt?.sub, data.token)
    if (!criador) {
      return
    }
    console.log(criador)

    const animais = [...animaisSelecionados, ...animaisSelecionadosMatriz]
    const dataCobertura = {
      criadorCobertura: criador.id,
      fazendaCobertura: opcaoSelecionada,
      nomeCobertura: comunicacaoCobertura.nomeCobertura,
      observacoes: comunicacaoCobertura.observacoes,
      statusCobertura: 'Em Análise',
      tipoCobertura: comunicacaoCobertura.tipoCobertura,
      finalizadoCobertura: false,
      pago: false,
      animais,
    }

    try {
      const response = ComunicarCobertura(dataCobertura, data.token)
      if ((response.status = 201)) {
        alert('Solicitação de cobertura cadastrada com sucesso', 'success')
      }
    } catch (e) {
      console.log(e)
    }

    setAnimaisSelecionadosMatriz([])
    setAnimaisSelecionados([])
  }

  const handleInputChangeCobertura = (e: any) => {
    const { name, value } = e.target
    setComunicacaoCobertura({
      ...comunicacaoCobertura,
      [name]: value,
    })
  }

  const handleInputChangeAnimalM = (e: any) => {
    const { name, value } = e.target
    setNumeroProcuradoM(value)
  }
  const handleInputChangeAnimalF = (e: any) => {
    const { name, value } = e.target
    setNumeroProcuradoF(value)
  }

  if (
    isLoadingAnimais ||
    isLoadingFazendas ||
    isLoadingTecnicos ||
    isLoadingUser ||
    isLoadingCriador
  ) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LinearProgress />
      </div>
    )
  }

  async function solicitacaoAnimalBase(
    dataSolicitacao: SolicitacaoRegistroAnimalBaseDTO,
  ) {
    setLoading(true)

    if (dataSolicitacao.tecnicoId == '') {
      return alert('Selecione um técnico')
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

    await registrarAnimaisBase(dataAPI, data.token)
    setLoading(false)
    alert('Solicitação criada com sucesso', 'success')
  }

  async function getCoberturas() {
    const criador = await getCriadorByUserId(decodedJwt.sub, data.token)
    const response = await getAllCoberturas(data.token, criador.id)
    console.log(response)

    if (response.message) {
      return alert('Erro ao carregar dados ')
    }
    setCoberturas(response)
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
          onClick={() => {
            setMenu(!menu)
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
                setInitialPage(true),
                  setAnimalPage(false),
                  setVerComunicNascPage(false),
                  setVerAnimalPage(false),
                  setComunicPage(false),
                  setAnimalBasePage(false),
                  setComunicCoberturaPage(false),
                  setComunicNascPage(false),
                  setVerComunicNascPage(false),
                  setVerAnimalPage(false)
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
                setAnimalPage(true),
                  setInitialPage(false),
                  setComunicPage(false),
                  setAnimalBasePage(false),
                  setComunicCoberturaPage(false),
                  setComunicNascPage(false),
                  setVerComunicNascPage(false),
                  setVerAnimalPage(false)
              }}
              colorButton={animalPage ? 'black' : '#9E4B00'}
              textButton="Animais"
            />
            <Button
              widthButton="16vw"
              widthImage="1.5vw"
              src={comunic}
              heightButton="3.3vw"
              onClick={() => {
                setAnimalPage(false),
                  setInitialPage(false),
                  setComunicPage(true),
                  setAnimalBasePage(false),
                  setComunicCoberturaPage(false),
                  setComunicNascPage(false),
                  setVerComunicNascPage(false),
                  setVerAnimalPage(false)
              }}
              colorButton={comunicPage ? 'black' : '#9E4B00'}
              textButton="Comunicações "
            />

            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y: comunicPage ? 0 : -50,
                opacity: comunicPage ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{ pointerEvents: `${comunicPage ? 'auto' : 'none'}` }}
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
                  setAnimalBasePage(true),
                    setComunicCoberturaPage(false),
                    setComunicNascPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setInitialPage(false),
                    setAnimalPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false)
                }}
                colorButton={animalBasePage ? 'black' : 'white'}
                textButton="Registrar Animais Base"
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
                  setAnimalBasePage(false),
                    setComunicCoberturaPage(true),
                    setComunicNascPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setInitialPage(false),
                    setAnimalPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false)
                }}
                colorButton={comunicCoberturaPage ? 'black' : 'white'}
                textButton="Comunicações de Cobertura"
              />
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={comunicNascPage ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setAnimalBasePage(false),
                    setComunicCoberturaPage(false),
                    setComunicNascPage(true),
                    setInitialPage(false),
                    setAnimalPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    getCoberturas()
                }}
                colorButton={comunicNascPage ? 'black' : 'white'}
                textButton="Comunicações de Nascimento"
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
              textColor={animalBasePage ? 'white' : 'black'}
              widthButton="100%"
              widthImage="0.5vw"
              src={arrowLeft}
              heightButton="3.3vw"
              onClick={() => {}}
              colorButton={animalBasePage ? 'black' : 'white'}
              textButton="Associar-se"
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
              onClick={() => {}}
              colorButton={comunicCoberturaPage ? 'black' : 'white'}
              textButton="Cadastrar fazenda"
            />
            <Button
              marginRightImage="0.6vw"
              marginLeftImage={'0.6vw'}
              textSize="0.9vw"
              textColor={comunicNascPage ? 'white' : 'black'}
              widthButton="100%"
              widthImage="0.5vw"
              src={arrowLeft}
              heightButton="3.3vw"
              onClick={() => {
                window.location.assign(`/`)
              }}
              colorButton={comunicNascPage ? 'black' : 'white'}
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
                setOptions(!options)
              }}
              style={{ cursor: 'pointer', width: '15vw' }}
            >
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text={`${user.nomePrimeiro} ⚙️`}
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

            {animaisCriador.map((data: AnimalDTO) => {
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
                        src={search}
                        colorButton="#0B7AB8"
                        heightButton="3vw"
                        widthImage="65%"
                        widthButton="3vw"
                        textColor="white"
                        onClick={() => {
                          setVerAnimalPage(true),
                            setAnimalPage(false),
                            setAnimalSelecionado(data)
                        }}
                      />
                    </div>
                  </td>
                </TableContent>
              )
            })}
          </Table>
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
          <div style={{ width: '10vw' }}>
            <Image
              src={logo2Branca}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Ilustrando o Animal | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="black"
          />
          <Text
            text="Informações"
            fontFamily="rob"
            fontWeight="600"
            size="1.6vw"
            color="black"
          />

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Número do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.nomeAnimal}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome da Mãe"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado!.mae!}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome do Pai"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado!.pai!}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Sexo do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.sexoAnimal}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Fazenda"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={fazendaAnimal ? fazendaAnimal.nomeFazenda : ''}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Tipo de Registro"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.registro}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Pelagem Do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.pelagemAnimal}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data da Avaliação"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.dataAvalicacao}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>
          </InputPair>

          <div style={{ marginTop: '2vw' }}>
            <Text
              text="Decisão do Técnico"
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="black"
            />
          </div>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="RNG"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.decisaoAnimalTecnicoRGN}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data de  Registro do RNG"
                color="black"
                fontWeight="300"
              />
              <InputText
                disabled
                value={animalSelecionado.dataRGNAnimalTecnico}
                style={{ border: 'solid 0.2vw #9E4B00' }}
              />
            </InputPlace>
          </InputPair>

          <InputPlace style={{ width: '43%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Observações"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={animalSelecionado.observacaoTecnico}
              style={{ border: 'solid 0.2vw #9E4B00' }}
            />
          </InputPlace>

          <div style={{ marginTop: '2vw' }}>
            <Text
              text="Árvore Genealógica"
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="black"
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              width: '100%',
              height: '5vw',
            }}
          >
            {verAnimalPage ? (
              <Tree
                label={
                  <Text
                    text={animalSelecionado.nomeAnimal}
                    fontFamily="rob"
                    fontWeight="600"
                    size="1.6vw"
                    color="black"
                  />
                }
              >
                <ArvoreGenealogica
                  animais={animaisCriador}
                  animalSelecionado={animalSelecionado}
                />
              </Tree>
            ) : null}
          </div>

          <div style={{ marginTop: '2vw' }}>
            <Text
              text="Imagens"
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="black"
            />
          </div>

          <InputPair>
            <div style={{ width: '36vw' }}>
              <img
                alt="animal"
                style={{ width: '100%', height: 'auto' }}
                src={animalSelecionado.image01}
              />
            </div>
            <div style={{ width: '36vw' }}>
              <img
                alt="animal"
                style={{ width: '100%', height: 'auto' }}
                src={animalSelecionado.image02}
              />
            </div>
          </InputPair>

          <InputPair>
            <div style={{ width: '36vw' }}>
              <img
                alt="animal"
                style={{ width: '100%', height: 'auto' }}
                src={animalSelecionado.image03}
              />
            </div>
            <div style={{ width: '36vw' }}>
              <img
                alt="animal"
                style={{ width: '100%', height: 'auto' }}
                src={animalSelecionado.image04}
              />
            </div>
          </InputPair>

          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'space-between',
              width: '35%',
              marginLeft: '66vw',
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
          </div>
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
          onSubmit={handleCobertura(solicitacaoAnimalBase)}
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={logo2Branca}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Solicitação de Registro de Animais Base | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="2vw"
            color="black"
          />
          <Text
            text="Técnico"
            fontFamily="rob"
            fontWeight="400"
            size="2vw"
            color="black"
          />
          <Select
            style={{ width: '30.5vw' }}
            {...registerCobertura('tecnicoId', { required: true })}
          >
            {tecnicos.map((data: TecnicoDTO) => {
              return (
                <option value={data.id} key={data.nomeCompleto}>
                  {data.nomeCompleto}
                </option>
              )
            })}
          </Select>

          <Text
            text="Quantidade de Animais Base"
            fontFamily="rob"
            fontWeight="400"
            size="2vw"
            color="black"
          />
          <InputText
            {...registerCobertura('quantidadeAnimais', { required: true })}
            style={{ width: '30vw' }}
            type="number"
          />
          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'space-between',
              width: '28%',
              marginLeft: '10vw',
            }}
          >
            <Button
              colorButton="black"
              heightButton="2vw"
              textButton="← Voltar"
              widthButton="7vw"
              textColor="white"
            />
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
          onSubmit={handleSubmit(handleSubmitCobertura)}
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
            <SelectBox onChange={handleChange} width="67.5vw">
              <option selected disabled>
                Selecione uma fazenda
              </option>
              {fazendas.map((data: FazendaDTO) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.nomeFazenda}
                  </option>
                )
              })}
            </SelectBox>
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
                    <SelectBox
                      name={fieldName}
                      value={comunicacaoCobertura[fieldName]}
                      onChange={handleInputChangeCobertura}
                      width="67.5vw"
                    >
                      <option selected disabled>
                        Selecione um tipo de cobertura
                      </option>
                      <option>Monta Natural</option>
                      <option>Inseminação Artificial</option>
                    </SelectBox>
                  ) : (
                    <InputText
                      name={fieldName}
                      value={comunicacaoCobertura[fieldName]}
                      onChange={handleInputChangeCobertura}
                      type={fieldName}
                    />
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
                    onChange={handleInputChangeAnimalF}
                  />

                  {animaisCriador.map((data: AnimalDTO) => {
                    if (data.nomeAnimal == numeroProcuradoF) {
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
                    onChange={handleInputChangeAnimalM}
                  />
                  {animaisCriador.map((data: AnimalDTO) => {
                    if (data.nomeAnimal == numeroProcuradoM) {
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
            </InputPlace>
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'space-between',
              width: '28%',
              marginLeft: '47vw',
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
              textButton="Fazer pagamento"
              widthButton="13vw"
              textColor="white"
              type="submit"
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
            {coberturas.map((data: ComunicacaoCoberturaDto) => {
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
                      src={done}
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
                      <div
                        style={{
                          display: 'flex',
                          width: '70%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          marginTopImage="0.3vw"
                          radius="2vw"
                          marginLeftImage="0vw"
                          marginRightImage="0vw"
                          src={search}
                          colorButton="#0B7AB8"
                          heightButton="3vw"
                          widthImage="65%"
                          widthButton="3vw"
                          textColor="white"
                          onClick={() => {
                            setVerComunicNascPage(true),
                              setComunicNascPage(false),
                              setCoberturaSelecionada(data)
                          }}
                        />
                        <Button
                          marginTopImage="0.6vw"
                          radius="2.5vw"
                          marginLeftImage="0vw"
                          marginRightImage="0vw"
                          src={seta}
                          colorButton="white"
                          heightButton="2.8vw"
                          widthImage="100%"
                          widthButton="4vw"
                          textColor="white"
                        />
                      </div>
                    </div>
                  </td>
                </TableContent>
              )
            })}
          </Table>

          <div
            style={{
              display: 'flex',
              marginTop: '15vw',
              justifyContent: 'space-between',
              width: '30%',
              marginLeft: '54vw',
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
              textButton="Comunicar Nascimento"
              widthButton="15vw"
              textColor="white"
            />
          </div>
        </ComunicNascimento>

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
          onSubmit={handleSubmit(handleSubmitNascimento)}
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
            <SelectBox style={{ border: 'solid 0.2vw #9E4B00' }} width="102.3%">
              <option selected disabled>
                Selecione uma fazenda
              </option>
              {fazendas.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.nomeFazenda}
                  </option>
                )
              })}
            </SelectBox>
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Técnico do Nascimento"
              color="black"
              fontWeight="300"
            />
            <SelectBox style={{ border: 'solid 0.2vw #9E4B00' }} width="102.3%">
              <option selected disabled>
                Selecione um técnico
              </option>
              {tecnicos.map((data: TecnicoDTO) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.nomeCompleto}
                  </option>
                )
              })}
            </SelectBox>
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Nome do Bezerro"
              color="black"
              fontWeight="300"
            />
            <InputText style={{ border: 'solid 0.2vw #9E4B00' }} />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data do Nascimento"
              color="black"
              fontWeight="300"
            />
            <InputText type="date" style={{ border: 'solid 0.2vw #9E4B00' }} />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Observações"
              color="black"
              fontWeight="300"
            />
            <InputText style={{ border: 'solid 0.2vw #9E4B00' }} />
          </InputPlace>

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
              textButton="Comunicar Nascimento"
              widthButton="17vw"
              textColor="white"
              type="submit"
            />
          </div>
        </VerComunicNascimento>
      </Content>
    </Container>
  )
}
