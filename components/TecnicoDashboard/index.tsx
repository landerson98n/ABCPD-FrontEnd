/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import {
  Home,
  add,
  animal,
  arrowLeft,
  boi,
  comunic,
  done,
  hamb,
  logo2Branca,
  logoBranca,
  search,
  seta,
  user,
  waiting,
  animalBlue,
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
  SelectBox,
} from './style'
import Image from 'next/legacy/image'
import { Button } from '../Button'
import { Text } from '../Text'
import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import CriadorDTO from '@/utils/CriadorDTO'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useQuery } from 'react-query'
import AnimalDTO from '@/utils/AnimalDTO'
import { getFazendaCriador } from '@/actions/fazendaApi'
import FazendaDTO from '@/utils/FazendaDTO'
import { AlertContext } from '@/context/AlertContextProvider'
import { getRebanhoByFazendaId } from '@/actions/RebanhApi'
import { CreateAnimal, getAnimaisByCriadorId } from '@/actions/animaisApi'
import { CircularProgress } from '@mui/material'
import { resolve } from 'path'
import RebanhoDTO from '@/utils/RebanhoDTO'

export function TecnicoDashboard(data: { token: string }) {
  const [animalPage, setAnimalPage] = useState(false)
  const [verAnimalPage, setVerAnimalPage] = useState(false)
  const [verAnimaRGDPage, setVerAnimalRGDPage] = useState(false)
  const [verAnimaisCriador, setVerAnimaisCriador] = useState(false)
  const [initialPage, setInitialPage] = useState(true)
  const [comunicPage, setComunicPage] = useState(false)
  const [animalBasePage, setAnimalBasePage] = useState(false)
  const [RGD, setRGD] = useState(false)
  const [comunicNascPage, setComunicNascPage] = useState(false)
  const [todasComunicNascPage, setTodasComunicNascPage] = useState(false)
  const [verComunicNascPage, setVerComunicNascPage] = useState(false)
  const [solicitacao, setSolicitacao] = useState(false)
  const [criadorId, setCriadorId] = useState('')
  const [criadores, setCriadores] = useState([])
  const [animaisCriador, setAnimaisCriador] = useState([])
  const [menu, setMenu] = useState(true)
  const [animalSelecionado, setAnimalSelecionado] = useState<AnimalDTO>({})
  const [fazendas, setFazendas] = useState([])
  const [rebanhos, setRebanhos] = useState([])
  const [loading, setLoading] = useState(false)
  const [isCG, setIsCG] = useState(false)
  const { alert } = useContext(AlertContext)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedImage2, setSelectedImage2] = useState<File | null>(null)
  const [selectedImage3, setSelectedImage3] = useState<File | null>(null)
  const [selectedImage4, setSelectedImage4] = useState<File | null>(null)
  const initialComunicacaoCobertura = {
    formaCabeca: 0,
    orelhasCabeca: 0,
    chifresCabeca: 0,
    formaPescoco: 0,
    barbelaPescoco: 0,
    morrilhoPescoco: 0,
    insercaoPescoco: 0,
    aparenciaGeral: 0,
    peso: 0,
    membrosAnterioresZoot: 0,
  }
  const initialComunicacaoCobertura2 = {
    membrosAnterioresRacial: 0,
    profundidadeTorax: 0,
    dorsoTorax: 0,
    lomboFlancoTorax: 0,
    traseira: 0,
    umbigo: 0,
    testiculoZoot: 0,
    testiculoUbere: 0,
    membrosPosteriores: 0,
    mucosa: 0,
  }

  const fieldNames = Object.keys(initialComunicacaoCobertura)
  const fieldNames2 = Object.keys(initialComunicacaoCobertura2)
  const fieldDisplayNames = {
    nomeCobertura: 'Nome da Cobertura',
    observacoes: 'Observações',
    tipoCobertura: 'Tipo de Cobertura',
    formaCabeca: 'Forma da Cabeça',
    orelhasCabeca: 'Orelhas da Cabeça',
    chifresCabeca: 'Chifres da Cabeça',
    formaPescoco: 'Forma do Pescoço',
    barbelaPescoco: 'Barbela do Pescoço',
    morrilhoPescoco: 'Morrilho do Pescoço',
    insercaoPescoco: 'Inserção do Pescoço',
    aparenciaGeral: 'Aparência Geral',
    peso: 'Peso',
    membrosAnterioresZoot: 'Membros Anteriores Zoo.',
  }
  const fieldDisplayNames2 = {
    membrosAnterioresRacial: 'Membros Anteriores Racial',
    profundidadeTorax: 'Profundidade do Tórax',
    dorsoTorax: 'Dorso do Tórax',
    lomboFlancoTorax: 'Lombo Flanco do Tórax',
    traseira: 'Traseira',
    umbigo: 'Umbigo',
    testiculoZoot: 'Testículo Zoo.',
    testiculoUbere: 'Testículo Ubere',
    membrosPosteriores: 'Membros Posteriores',
    mucosa: 'Mucosa',
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const handleImageChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setSelectedImage2(file)
    }
  }

  const handleImageChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setSelectedImage3(file)
    }
  }

  const handleImageChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    console.log(file)

    if (file) {
      setSelectedImage4(file)
    }
  }

  const animalSchema = z.object({
    mae: z.string().optional(),
    pai: z.string().optional(),
    dataAvalicacao: z
      .string()
      .min(1, 'Data de Avaliação é um campo obrigatório'),
    dataNascimentoAnimal: z
      .string()
      .min(1, 'Data de Nascimento do Animal é um campo obrigatório'),
    nomeAnimal: z.string().min(1, 'Nome do Animal é um campo obrigatório'),
    pelagemAnimal: z
      .string()
      .min(1, 'Pelagem do Animal é um campo obrigatório'),
    racaAnimalMatriz: z.string(),
    registro: z.string(),
    rebanho: z.string(),
    sexoAnimal: z.string(),
    fazenda: z.string(),
    observacaoTecnico: z.string(),
    formaCabeca: z.number(),
    orelhasCabeca: z.number(),
    chifresCabeca: z.number(),
    formaPescoco: z.number(),
    barbelaPescoco: z.number(),
    morrilhoPescoco: z.number(),
    insercaoPescoco: z.number(),
    aparenciaGeral: z.number(),
    peso: z.number(),
    membrosAnterioresZoot: z.number(),
    membrosAnterioresRacial: z.number(),
    profundidadeTorax: z.number(),
    dorsoTorax: z.number(),
    lomboFlancoTorax: z.number(),
    traseira: z.number(),
    umbigo: z.number(),
    testiculoZoot: z.number(),
    testiculoUbere: z.number(),
    membrosPosteriores: z.number(),
    mucosa: z.number(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(animalSchema) })

  async function send(animalData) {
    if (animalData.registro == '') {
      return alert('Selecione um tipo de registro')
    }

    if (animalData.mae != '' && animalData.pai == '') {
      return alert('Selecione um animal reprodutor')
    }

    if (
      animalData.pai != '' &&
      animalData.mae == '' &&
      animalData.registro != 'Produtos do Cruzamento Sob Controle de Genealogia'
    ) {
      return alert('Selecione um animal matriz')
    }
    if (animalData.racaAnimalMatriz == '' && isCG) {
      return alert('Selecione uma raça para o animal matriz')
    }

    const animalPai = animaisCriador.find((index: AnimalDTO) => {
      return index.id == animalData.pai
    })

    const animalMatriz = animaisCriador.find((index: AnimalDTO) => {
      return index.id == animalData.mae
    })

    if (
      animalData.registro == 'Produtos do Cruzamento Sob Controle de Genealogia'
    ) {
      animalData.composicaoGenetica = '50'
    } else {
      if (animalData.pai == '' && animalData.mae == '') {
        animalData.composicaoGenetica = '100'
      } else {
        animalData.composicaoGenetica = (
          parseInt(animalMatriz.composicaoGenetica) / 2 +
          parseInt(animalPai.composicaoGenetica) / 2
        ).toString()
      }
    }

    if (
      (animalData.registro == 'Puro de Origem por Adjudicação' &&
        animalData.sexoAnimal == 'Macho') ||
      (animalData.registro ==
        'Produtos do Cruzamento Sob Controle de Genealogia' &&
        animalData.sexoAnimal == 'Macho')
    ) {
      return alert(
        'O tipo de registro selecionado só é permitido para fêmeas (Puro de Origem por Adjudicação e Produtos do Cruzamento Sob Controle de Genealogia)',
      )
    }

    if (animalData.registro == 'Puro Controlado') {
      if (
        animalPai?.registro == 'Puro Controlado' ||
        animalMatriz?.registro == 'Puro Controlado' ||
        animalMatriz?.registro == 'Puro de Origem por Adjudicação' ||
        animalMatriz?.registro ==
          'Produtos do Cruzamento Sob Controle de Genealogia'
      ) {
        true
      } else {
        return alert(
          'Para ser puro controlado o animal deve seguir um dos requisitos: -Ser filho de animal Puro Controlado, -Ser filho de matriz com registro Produtos do Cruzamento Sob Controle de Genealogia -Ser filho de matriz com registro Produtos do Cruzamento Sob Controle de Genealogia',
        )
      }
    }
    if (animalData.rebanho == '') {
      alert('Selecione um rebanho')
    } else {
      if (animalData.fazenda == '') {
        alert('Selecione uma fazenda')
      } else {
        if (
          !selectedImage ||
          !selectedImage2 ||
          !selectedImage3 ||
          !selectedImage4
        ) {
          alert('Selecione 4 imagens para o animal')
        } else {
          setLoading(true)
          // Função para converter uma imagem em base64
          if (animalData.mae == '') {
            animalData.mae = null
          }

          if (animalData.pai == '') {
            animalData.pai = null
          }

          const convertToBase64 = async (file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = () => resolve(reader.result)
              reader.onerror = (error) => reject(error)
            })
          }

          const base64Image01 = await convertToBase64(new Blob([selectedImage]))
          const base64Image02 = await convertToBase64(
            new Blob([selectedImage2]),
          )
          const base64Image03 = await convertToBase64(
            new Blob([selectedImage3]),
          )
          const base64Image04 = await convertToBase64(
            new Blob([selectedImage4]),
          )

          const animal: AnimalDTO = {
            ...animalData,
            criadorAnimal: criadorId,
            registradoRGDSuper: false,
            registradoRGDTecnico: false,
            registradoRGNSuper: false,
            registradoRGNTecnico: true,
            dataRGNAnimalTecnico: new Date().toISOString(),
            decisaoAnimalTecnicoRGN: 'Registrado',
            registroGeral: '',
            image01: base64Image01,
            image02: base64Image02,
            image03: base64Image03,
            image04: base64Image04,
            flag: 0,
          }
          const response = await CreateAnimal(animal, data.token)
          if (!response.message) {
            alert('Animal criado com sucesso', 'success')
            setLoading(false)
          }
        }
      }
    }
  }

  async function getFazendas(id: string) {
    setLoading(true)
    const animais = await getAnimaisByCriadorId(id, data.token)
    const response = await getFazendaCriador(data.token, id)
    if (response) {
      const rebanho = await getRebanhoByFazendaId(response[0].id)
      setAnimaisCriador(animais)
      setFazendas(response)
      setRebanhos([rebanho])
      setVerAnimaisCriador(true), setAnimalPage(false), setLoading(false)
    }
  }

  const {
    isLoading,
    error,
    data: CriadoresData,
    refetch,
  } = useQuery('criadores', async () =>
    fetch('http://localhost:3001/criador/get-criadores', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      method: 'GET',
    }).then((res) => res.json()),
  )

  return (
    <>
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
                  setInitialPage(true),
                    setAnimalPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setVerAnimalRGDPage(false),
                    setSolicitacao(false),
                    setVerAnimaisCriador(false),
                    setComunicPage(false),
                    setAnimalBasePage(false),
                    setRGD(false),
                    setComunicNascPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setVerAnimalRGDPage(false),
                    setSolicitacao(false),
                    setVerAnimaisCriador(false)
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
                  setCriadores(CriadoresData)
                  setAnimalPage(!animalPage),
                    setInitialPage(false),
                    setComunicPage(false),
                    setAnimalBasePage(false),
                    setRGD(false),
                    setComunicNascPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setVerAnimalRGDPage(false),
                    setSolicitacao(false),
                    setVerAnimaisCriador(false)
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
                    setComunicPage(!comunicPage),
                    setAnimalBasePage(false),
                    setRGD(false),
                    setComunicNascPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setVerAnimalRGDPage(false),
                    setSolicitacao(false),
                    setVerAnimaisCriador(false)
                }}
                colorButton={comunicPage ? 'black' : '#9E4B00'}
                textButton="Comunicações "
              />
              <Button
                widthButton="16vw"
                widthImage="1.5vw"
                src={comunic}
                heightButton="3.3vw"
                onClick={() => {
                  setSolicitacao(!solicitacao),
                    setAnimalPage(false),
                    setInitialPage(false),
                    setComunicPage(false),
                    setAnimalBasePage(false),
                    setRGD(false),
                    setComunicNascPage(false),
                    setVerComunicNascPage(false),
                    setVerAnimalPage(false),
                    setVerAnimalRGDPage(false)
                }}
                colorButton={solicitacao ? 'black' : '#9E4B00'}
                textButton="Solicitações "
              />

              <DropdownMenu
                initial={{ opacity: 0 }}
                animate={{
                  y: animalPage ? '-6vw' : '-10vw',
                  opacity: animalPage ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: `${animalPage ? 'auto' : 'none'}` }}
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
                    setAnimalBasePage(false),
                      setRGD(true),
                      setComunicNascPage(false),
                      setVerComunicNascPage(false),
                      setVerAnimalPage(false),
                      setVerAnimalRGDPage(false),
                      setInitialPage(false),
                      setAnimalPage(false),
                      setVerComunicNascPage(false),
                      setVerAnimalPage(false),
                      setVerAnimalRGDPage(false)
                  }}
                  colorButton={animalBasePage ? 'black' : 'white'}
                  textButton="RGD"
                />
              </DropdownMenu>

              <DropdownMenu
                initial={{ opacity: 0 }}
                animate={{
                  y: comunicPage ? '-6vw' : '-12vw',
                  opacity: comunicPage ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: `${comunicPage ? 'auto' : 'none'}` }}
              >
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
                      setRGD(false),
                      setComunicNascPage(true),
                      setInitialPage(false),
                      setAnimalPage(false),
                      setVerComunicNascPage(false),
                      setVerAnimalPage(false),
                      setVerAnimalRGDPage(false),
                      setSolicitacao(false),
                      setVerAnimaisCriador(false)
                  }}
                  colorButton={comunicNascPage ? 'black' : 'white'}
                  textButton="Comunicações de Nascimento"
                />
              </DropdownMenu>

              <DropdownMenu
                initial={{ opacity: 0 }}
                animate={{
                  y: solicitacao ? '-6.4vw' : '-12vw',
                  opacity: solicitacao ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ pointerEvents: `${solicitacao ? 'auto' : 'none'}` }}
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
                      setRGD(false),
                      setComunicNascPage(false),
                      setVerComunicNascPage(false),
                      setVerAnimalPage(false),
                      setVerAnimalRGDPage(false),
                      setInitialPage(false),
                      setAnimalPage(false),
                      setVerComunicNascPage(false),
                      setVerAnimalPage(false),
                      setVerAnimalRGDPage(false)
                  }}
                  colorButton={animalBasePage ? 'black' : 'white'}
                  textButton="Solicitações Animais Base"
                />
              </DropdownMenu>
            </div>
          </motion.div>
        </Menu>

        <Content>
          <Header>
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
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="João da Silva Santos"
                color="black"
                fontWeight="600"
              />
            </div>
          </Header>

          <motion.div
            animate={{
              y: initialPage ? 0 : -50,
              opacity: initialPage ? 1 : 0,
            }}
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
                                src={search}
                                colorButton="#0B7AB8"
                                heightButton="3vw"
                                widthImage="65%"
                                widthButton="3vw"
                                textColor="white"
                                onClick={() => {
                                  setCriadorId(data.id)
                                  getFazendas(data.id)
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
          </Animals>

          <Animals
            initial={{ opacity: 0 }}
            animate={{
              y: verAnimaisCriador ? 0 : -50,
              opacity: verAnimaisCriador ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${verAnimaisCriador ? 'block' : 'none'}`,
              pointerEvents: `${verAnimaisCriador ? 'auto' : 'none'}`,
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
                  borderRight: 'solid 1px rgba(103, 97, 97, 0.5)',
                  borderLeft: 'solid 1px rgba(103, 97, 97, 0.5)',
                  borderTop: 'solid 1px rgba(103, 97, 97, 0.5)',
                  borderColor: 'rgba(103, 97, 97, 0.5)',
                }}
              />
              <Button
                marginTopImage="0.3vw"
                radius="0.3vw"
                textButton="+ Registrar Novo Animal"
                colorButton="#E91868"
                heightButton="3vw"
                widthButton="17vw"
                textColor="white"
                onClick={() => {
                  setVerAnimaisCriador(false), setVerAnimalPage(true)
                }}
              />
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
                              src={search}
                              colorButton="#0B7AB8"
                              heightButton="3vw"
                              widthImage="65%"
                              widthButton="3vw"
                              textColor="white"
                              onClick={() => {
                                setVerAnimalRGDPage(true),
                                  setAnimalPage(false),
                                  setVerAnimaisCriador(false),
                                  setAnimalSelecionado(dataAnimal)
                              }}
                            />
                          </div>
                        </td>
                      </TableContent>
                    )
                  })
                : null}
            </Table>
          </Animals>

          <Animals
            initial={{ opacity: 0 }}
            animate={{ y: RGD ? 0 : -50, opacity: RGD ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${RGD ? 'block' : 'none'}`,
              pointerEvents: `${RGD ? 'auto' : 'none'}`,
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
                width: '100%',
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

              <TableContent>
                <td style={{ width: '20%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Angus"
                    color="black"
                    fontWeight="400"
                  />
                </td>

                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="João da Silva Santos"
                    color="black"
                    fontWeight="400"
                  />
                </td>

                <td style={{ width: '25%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Fazenda Boa Vista"
                    color="black"
                    fontWeight="400"
                  />
                </td>

                <td style={{ width: '25%' }}>
                  <Text
                    widthImage="1.5vw"
                    src={waiting}
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Em Análise"
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
                        setVerAnimalRGDPage(true), setRGD(false)
                      }}
                    />
                  </div>
                </td>
              </TableContent>
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
            onSubmit={handleSubmit(send)}
          >
            <div style={{ width: '10vw' }}>
              <Image
                src={logo2Branca}
                alt="logoAnimal"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <Text
              text="Formulário Para Registro de Novo Animal | ABCPD"
              fontFamily="pop"
              fontWeight="700"
              size="1.8vw"
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
                  width="30vw"
                  {...register('nomeAnimal', { required: true })}
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Número da Mãe"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox {...register('mae', { required: true })}>
                  <option value="" disabled selected>
                    Selecione um animal
                  </option>
                  {animaisCriador.map((data: AnimalDTO) => {
                    if (data.sexoAnimal == 'Fêmea') {
                      return (
                        <option value={data.id} key={data.id}>
                          {data.nomeAnimal}
                        </option>
                      )
                    }
                  })}
                </SelectBox>
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Número do Pai"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox {...register('pai', { required: true })}>
                  <option value="" disabled selected>
                    Selecione um animal
                  </option>
                  {animaisCriador.map((data: AnimalDTO) => {
                    if (data.sexoAnimal == 'Macho') {
                      return (
                        <option value={data.id} key={data.id}>
                          {data.nomeAnimal}
                        </option>
                      )
                    }
                  })}
                </SelectBox>
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Sexo do Animal"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox {...register('sexoAnimal')}>
                  <option>Macho</option>
                  <option>Fêmea</option>
                </SelectBox>
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Tipo de Registro"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox {...register('registro', { required: true })}>
                  <option value="" disabled selected>
                    Selecione uma opção
                  </option>
                  <option disabled={!!isCG}>
                    Puro de Origem por Adjudicação
                  </option>
                  <option disabled={!!isCG}>Puro Controlado</option>
                  <option disabled={!!isCG}>Puro de Origem</option>
                  <option selected={!!isCG} disabled={!isCG}>
                    Produtos do Cruzamento Sob Controle de Genealogia
                  </option>
                </SelectBox>
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Fazenda"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox {...register('fazenda', { required: true })}>
                  <option value="" disabled selected>
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
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Data Da Avaliação"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  {...register('dataAvalicacao', { required: true })}
                  type="date"
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Rebanho"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox {...register('rebanho', { required: true })}>
                  <option value="" disabled selected>
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
                </SelectBox>
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Pelagem"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  width="30vw"
                  {...register('pelagemAnimal', { required: true })}
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Data de Nascimento"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  width="30vw"
                  type="date"
                  {...register('dataNascimentoAnimal', { required: true })}
                />
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
                  height="3vw"
                  accept="image/*"
                  type="file"
                  style={{ border: 'none' }}
                  onChange={handleImageChange}
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
                  type="file"
                  style={{ border: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange2}
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
                  height="3vw"
                  type="file"
                  style={{ border: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange3}
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
                  height="3vw"
                  type="file"
                  style={{ border: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange4}
                />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                {fieldNames.map((fieldName) => (
                  <div key={fieldName} style={{ width: '100%' }}>
                    <InputPlace style={{ width: '100%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text={fieldDisplayNames[fieldName]}
                        color="black"
                        fontWeight="300"
                      />
                      <InputText
                        {...register(fieldName, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        type="number"
                      />
                    </InputPlace>
                  </div>
                ))}
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                {fieldNames2.map((fieldName) => (
                  <div key={fieldName} style={{ width: '100%' }}>
                    <InputPlace style={{ width: '100%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text={fieldDisplayNames2[fieldName]}
                        color="black"
                        fontWeight="300"
                      />
                      <InputText
                        {...register(fieldName, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        type="number"
                      />
                    </InputPlace>
                  </div>
                ))}
              </InputPlace>
            </InputPair>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Observações"
                color="black"
                fontWeight="300"
              />
              <InputText
                height="3vw"
                type="text"
                {...register('observacaoTecnico', { required: true })}
              />
            </InputPlace>

            <InputPair
              style={{ width: '90%', display: `${isCG ? 'flex' : 'none'} ` }}
            >
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Raça da matriz"
                  color="black"
                  fontWeight="300"
                />
                <SelectBox
                  {...register('racaAnimalMatriz', { required: true })}
                >
                  <option value="" disabled selected>
                    Selecione uma raça
                  </option>
                  <option>Nelore</option>
                  <option>Guzerá</option>
                  <option>Sindi</option>
                  <option>Angus</option>
                  <option>Senepol</option>
                  <option>Jersey</option>
                  <option>Crioulo</option>
                  <option>Lageano</option>
                  <option>Caracu</option>
                </SelectBox>
              </InputPlace>
            </InputPair>

            <div
              style={{
                width: '91.2%',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  marginTop: '3vw',
                  justifyContent: 'space-between',
                  width: '69%',
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
                  textButton={isCG ? '←' : 'Animal Controle Genalógico'}
                  widthButton="18vw"
                  textColor="white"
                  type="button"
                  onClick={() => {
                    setIsCG(!isCG)
                  }}
                />

                {loading ? (
                  <CircularProgress size={'2vw'} />
                ) : (
                  <Button
                    colorButton="#9E4B00"
                    heightButton="2vw"
                    textButton="Registrar Novo Animal"
                    widthButton="18vw"
                    textColor="white"
                    type="submit"
                    onClick={() => {
                      console.log(errors)

                      for (const componente in errors) {
                        const mensagem = errors[componente]
                        alert(mensagem?.message)
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </VerAnimals>

          <VerAnimals
            initial={{ opacity: 0 }}
            animate={{
              y: verAnimaRGDPage ? 0 : -50,
              opacity: verAnimaRGDPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${verAnimaRGDPage ? 'flex' : 'none'}`,
              pointerEvents: `${verAnimaRGDPage ? 'auto' : 'none'}`,
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
              text="Detalhe do Animal | ABCPD"
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
                  text="Nome do Animal"
                  color="black"
                  fontWeight="300"
                />
                <InputText value={animalSelecionado.nomeAnimal} />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Nome da Mãe"
                  color="black"
                  fontWeight="300"
                />
                <InputText value={animalSelecionado.mae} />
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
                <InputText value={animalSelecionado.pai} />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Sexo do Animal"
                  color="black"
                  fontWeight="300"
                />
                <InputText value={animalSelecionado.sexoAnimal} />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Criador do Animal"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Fazenda"
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
                  text="Tipo de Registro"
                  color="black"
                  fontWeight="300"
                />
                <InputText value={animalSelecionado.registro} />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Pelagem Do Animal"
                  color="black"
                  fontWeight="300"
                />
                <InputText value={animalSelecionado.pelagemAnimal} />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '90%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Data da Avaliação"
                  color="black"
                  fontWeight="300"
                />
                <InputText value={animalSelecionado.dataAvalicacao} />
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
                <InputText value={animalSelecionado.decisaoAnimalTecnicoRGN} />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Data de  Registro do RNG"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
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
              <InputText />
            </InputPlace>

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
                <Image
                  alt="animal"
                  style={{ width: '100%', height: 'auto' }}
                  src={boi}
                />
              </div>
              <div style={{ width: '36vw' }}>
                <Image
                  alt="animal"
                  style={{ width: '100%', height: 'auto' }}
                  src={boi}
                />
              </div>
            </InputPair>

            <InputPair>
              <div style={{ width: '36vw' }}>
                <Image
                  alt="animal"
                  style={{ width: '100%', height: 'auto' }}
                  src={boi}
                />
              </div>
              <div style={{ width: '36vw' }}>
                <Image
                  alt="animal"
                  style={{ width: '100%', height: 'auto' }}
                  src={boi}
                />
              </div>
            </InputPair>

            <div
              style={{
                display: 'flex',
                marginTop: '1vw',
                justifyContent: 'space-between',
                width: '35%',
                marginLeft: '48vw',
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
                textButton="Aprovar"
                widthButton="7vw"
                textColor="white"
              />
              <Button
                colorButton="#BC433B"
                heightButton="2vw"
                textButton="Pendente"
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

            <Table>
              <TableHeader>
                <th>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1.3vw'}
                    text="Rebanho"
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

              <TableContent>
                <td style={{ width: '20%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="AAA"
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="João da Silva Santos"
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td style={{ width: '25%' }}>
                  <Text
                    widthImage="1.5vw"
                    src={waiting}
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Em análise"
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
                      textButton="Marcar Como Finalizado"
                      radius="2vw"
                      marginLeftImage="0vw"
                      marginRightImage="0vw"
                      colorButton="#0B7AB8"
                      heightButton="3vw"
                      widthButton="16vw"
                      textColor="white"
                      onClick={() => {
                        setVerAnimalPage(true), setAnimalPage(false)
                      }}
                    />
                  </div>
                </td>
              </TableContent>
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

              <TableContent>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Fazenda Boa Vista"
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="João Da Silva Santos"
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="(86) 99999-9999"
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
                        setTodasComunicNascPage(true), setComunicNascPage(false)
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

          <ComunicNascimento
            initial={{ opacity: 0 }}
            animate={{
              y: todasComunicNascPage ? 0 : -50,
              opacity: todasComunicNascPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${todasComunicNascPage ? 'block' : 'none'}`,
              pointerEvents: `${todasComunicNascPage ? 'auto' : 'none'}`,
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

              <TableContent>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="15 de Março de 2023 "
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Angus"
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text="Marrom"
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
                        setVerComunicNascPage(true),
                          setTodasComunicNascPage(false)
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
              y: verComunicNascPage ? 0 : -50,
              opacity: verComunicNascPage ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              display: `${verComunicNascPage ? 'flex' : 'none'}`,
              pointerEvents: `${verComunicNascPage ? 'auto' : 'none'}`,
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
                  text="Pai"
                  color="black"
                  fontWeight="300"
                />
                <InputText />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Mãe"
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
