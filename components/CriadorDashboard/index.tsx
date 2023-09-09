/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
'use client'
import {
  Home,
  animal,
  animalBlue,
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
} from './style'
import Image from 'next/legacy/image'
import { Button } from '../Button'
import { Text } from '../Text'
import { InputText } from '../InputText'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SelectBox } from '../SelectBox'
import * as z from 'zod'
import AnimalDTO from '@/utils/AnimalDTO'
import TecnicoDTO from '@/utils/TecnicoDTO'
import { dataAnimal } from '@/actions/criadorApi'
import { allTecnicos } from '@/actions/tecnicoApi'
import { ComunicarCobertura } from '@/actions/coberturaApi'
import jsonWebTokenService from 'jsonwebtoken'
import { getFazendaCriador } from '@/actions/fazendaApi'
import FazendaDTO from '@/utils/FazendaDTO'
import { ErrorPanel } from '../ErrorPanel'

export function CriadorDashboard(data: { token: string }) {
  const [animalPage, setAnimalPage] = useState(false)
  const [verAnimalPage, setVerAnimalPage] = useState(false)
  const [initialPage, setInitialPage] = useState(true)
  const [comunicPage, setComunicPage] = useState(false)
  const [animalBasePage, setAnimalBasePage] = useState(false)
  const [comunicCoberturaPage, setComunicCoberturaPage] = useState(false)
  const [comunicNascPage, setComunicNascPage] = useState(false)
  const [verComunicNascPage, setVerComunicNascPage] = useState(false)
  const [animaisCriador, setAnimaisCriador] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [fazendas, setFazendas] = useState([])
  const [menu, setMenu] = useState(true)
  const decodedJwt = jsonWebTokenService.decode(data.token)
  const [opcaoSelecionada, setOpcaoSelecionada] = useState({})

  const initialComunicacaoCobertura = {
    comprovantePagamento: '',
    nomeCobertura: '',
    observacoes: '',
    statusCobertura: '',
    tipoCobertura: '',
  }
  const fieldDisplayNames = {
    comprovantePagamento: 'Comprovante de Pagamento',
    nomeCobertura: 'Nome da Cobertura',
    observacoes: 'Observações',
    statusCobertura: 'Status da Cobertura',
    tipoCobertura: 'Tipo de Cobertura',
  }
  const fieldNames = Object.keys(initialComunicacaoCobertura)
  const [comunicacaoCobertura, setComunicacaoCobertura] = useState(
    initialComunicacaoCobertura,
  )
  const handleChange = (event) => {
    const novaOpcao = event.target.value
    setOpcaoSelecionada(novaOpcao)
  }

  const handleSubmitCobertura = async (e: any) => {
    e.preventDefault()

    const dataCobertura = {
      criadorCobertura: decodedJwt.sub,
      fazendaCobertura: opcaoSelecionada.id,
      comprovantePagamento: comunicacaoCobertura.comprovantePagamento,
      nomeCobertura: comunicacaoCobertura.nomeCobertura,
      observacoes: comunicacaoCobertura.observacoes,
      statusCobertura: comunicacaoCobertura.statusCobertura,
      tipoCobertura: comunicacaoCobertura.tipoCobertura,
      finalizadoCobertura: false,
    }

    try {
      const response = ComunicarCobertura(dataCobertura, data.token)
      window.location.assign(`/CriadorPage/${data.token}`)
    } catch (e) {
      console.log(e)
    }
  }

  const handleInputChangeCobertura = (e: any) => {
    const { name, value } = e.target
    setComunicacaoCobertura({
      ...comunicacaoCobertura,
      [name]: value,
    })
  }

  useEffect(() => {
    async function getAnimais() {
      if (animaisCriador.length == 0) {
        const animais = await dataAnimal(data.token)
        if (animais.statusCode != 404) {
          setAnimaisCriador(animais)
        }
      }
    }

    async function getTecnicos() {
      if (tecnicos.length == 0) {
        const tecnicosData = await allTecnicos(data.token)
        if (tecnicosData.statusCode != 404) {
          setTecnicos(tecnicosData)
        }
      }
    }

    async function getFazendas() {
      if (fazendas.length == 0) {
        const fazendasData = await getFazendaCriador(data.token, decodedJwt.sub)

        if (fazendasData.statusCode != 404) {
          setFazendas(fazendasData)
        }
      }
    }
    getFazendas()
    getAnimais()
    getTecnicos()
  }, [])

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
              colorButton={initialPage ? '#032759' : 'green'}
              textButton="Pagina Inicial"
            />
            <Button
              widthButton="16vw"
              widthImage="1.5vw"
              src={animal}
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
              colorButton={animalPage ? '#032759' : 'green'}
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
              colorButton={comunicPage ? '#032759' : 'green'}
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
                textColor={animalBasePage ? 'white' : '#032759'}
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
                colorButton={animalBasePage ? '#032759' : 'white'}
                textButton="Registrar Animais Base"
              />
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={comunicCoberturaPage ? 'white' : '#032759'}
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
                colorButton={comunicCoberturaPage ? '#032759' : 'white'}
                textButton="Comunicações de Cobertura"
              />
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={comunicNascPage ? 'white' : '#032759'}
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
                    setVerAnimalPage(false)
                }}
                colorButton={comunicNascPage ? '#032759' : 'white'}
                textButton="Comunicações de Nascimento"
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
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
              src={animalBlue}
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
                  text="NOME"
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
                  size={'1.3vw'}
                  text="CRIADOR"
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
                      text={data.fazenda}
                      color="black"
                      fontWeight="400"
                    />
                  </td>
                  <td style={{ width: '22%' }}>
                    <Text
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={data.criadorAnimal}
                      color="black"
                      fontWeight="400"
                    />
                  </td>
                  <td>
                    <Text
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={data.decisaoAnimalTecnicoRGN}
                      color="black"
                      fontWeight="400"
                    />
                  </td>
                  <td>
                    <Text
                      widthImage="1.5vw"
                      src={waiting}
                      textAlign="center"
                      fontFamily="rob"
                      size={'1vw'}
                      text={data.decisaoAnimalTecnicoRGD}
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
                          setVerAnimalPage(true), setAnimalPage(false)
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
              src={animalBlue}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Ilustrando o Animal | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="#032759"
          />
          <Text
            text="Informações"
            fontFamily="rob"
            fontWeight="600"
            size="1.6vw"
            color="#032759"
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
              <InputText border="solid 0.2vw black" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome da Mãe"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
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
              <InputText border="solid 0.2vw black" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Sexo do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
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
              <InputText border="solid 0.2vw black" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Fazenda"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
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
              <InputText border="solid 0.2vw black" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Pelagem Do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Mês da Avaliação"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Ano Da Avaliação"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
            </InputPlace>
          </InputPair>

          <div style={{ marginTop: '2vw' }}>
            <Text
              text="Decisão do Técnico"
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="#032759"
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
              <InputText border="solid 0.2vw black" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data de  Registro do RNG"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw black" />
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
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <div style={{ marginTop: '2vw' }}>
            <Text
              text="Imagens"
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="#032759"
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
              marginLeft: '66vw',
              marginBottom: '10vw',
            }}
          >
            <Button
              colorButton="#032759"
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
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={animalBlue}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Solicitação de Registro de Animais Base | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="2vw"
            color="#032759"
          />
          <Text
            text="Técnico"
            fontFamily="rob"
            fontWeight="400"
            size="2vw"
            color="#032759"
          />
          <SelectBox width="31.5vw">
            {tecnicos.map((data: TecnicoDTO) => {
              return (
                <option key={data.nomeCompleto}>{data.nomeCompleto}</option>
              )
            })}
          </SelectBox>

          <Text
            text="Quantidade de Animais Base"
            fontFamily="rob"
            fontWeight="400"
            size="2vw"
            color="#032759"
          />
          <InputText width="30vw" type="number" />
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
              colorButton="#032759"
              heightButton="2vw"
              textButton="← Voltar"
              widthButton="7vw"
              textColor="white"
            />
            <Button
              colorButton="green"
              heightButton="2vw"
              textButton="Criar Solicitação"
              widthButton="13vw"
              textColor="white"
            />
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
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={animalBlue}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Comunicação de Cobertura | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="#032759"
          />
          <div style={{ width: '100%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text={'Fazenda'}
              color="black"
              fontWeight="300"
            />
            <SelectBox
              value={opcaoSelecionada}
              onChange={handleChange}
              width="67.5vw"
            >
              {fazendas.map((data: FazendaDTO) => {
                return <option key={data.id}>{data.nomeFazenda}</option>
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
                  <InputText
                    type="text"
                    name={fieldName}
                    value={comunicacaoCobertura[fieldName]}
                    onChange={handleInputChangeCobertura}
                  />
                </InputPlace>
              </div>
            ))}
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
              colorButton="#032759"
              heightButton="2vw"
              textButton="← Voltar"
              widthButton="7vw"
              textColor="white"
            />
            <Button
              colorButton="green"
              heightButton="2vw"
              textButton="Fazer pagamento"
              widthButton="13vw"
              textColor="white"
              onClick={() => {
                handleSubmitCobertura
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
              src={animalBlue}
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
                  text="Reprodutor"
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
                  text="Tipo de Cobertura"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.1vw'}
                  text="Status"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.1vw'}
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
                  text="Benedito"
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
                  text="JMonta Natural"
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
                  text="Registrado"
                  color="green"
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
                        setVerComunicNascPage(true), setComunicNascPage(false)
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
              colorButton="#032759"
              heightButton="2vw"
              textButton="← Voltar"
              widthButton="7vw"
              textColor="white"
            />
            <Button
              colorButton="green"
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
        >
          <div style={{ width: '10vw' }}>
            <Image
              src={animalBlue}
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Comunicação de Nascimento | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="#032759"
          />
          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Nome do Reprodutor"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Nome da Matriz"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Tipo de Cobertura"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data da Cobertura"
              color="black"
              fontWeight="300"
            />
            <InputText type="date" border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Criador da Cobertura"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Fazenda da Cobertura"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Fazenda de Nascimento"
              color="black"
              fontWeight="300"
            />
            <SelectBox border="solid 0.2vw black" width="102.3%" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Técnico do Nascimento"
              color="black"
              fontWeight="300"
            />
            <SelectBox width="102.3%" border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Nome do Bezerro"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data do Nascimento"
              color="black"
              fontWeight="300"
            />
            <InputText type="date" border="solid 0.2vw black" />
          </InputPlace>

          <InputPlace>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Observções"
              color="black"
              fontWeight="300"
            />
            <InputText border="solid 0.2vw black" />
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
              colorButton="#032759"
              heightButton="2vw"
              textButton="← Voltar"
              widthButton="7vw"
              textColor="white"
            />
            <Button
              colorButton="green"
              heightButton="2vw"
              textButton="Comunicar Nascimento"
              widthButton="17vw"
              textColor="white"
            />
          </div>
        </VerComunicNascimento>
      </Content>
    </Container>
  )
}
