/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import {
  Home,
  add,
  animal,
  arrowLeft,
  boi,
  comunic,
  group,
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
  ComunicCobertura,
  VerComunicCobertura,
  UsersPage,
  UserRegister,
  TelaAnimaisRGD,
  TelaAnimaisRGN,
  TelaFazendasCriador,
} from './style'
import Image from 'next/legacy/image'
import { Button } from '../Button'
import { Text } from '../Text'
import { InputText } from '../InputText'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getUserById } from '@/actions/user'
import { getTodosAnimais } from '@/actions/animaisApi'
import { getRebanhosAll } from '@/actions/RebanhApi'
import { getTodasFazendas } from '@/actions/fazendaApi'
import { useQuery } from 'react-query'
import UserDTO from '@/utils/UserDTO'
import jsonWebTokenService from 'jsonwebtoken'
import AnimalDTO from '@/utils/AnimalDTO'
import { CircularProgress } from '@mui/material'
import CriadorDTO from '@/utils/CriadorDTO'
import FazendaDTO from '@/utils/FazendaDTO'
import { ComunicacaoNascimentoDto } from '@/utils/ComunicacaoNascimentoDTO'
import { getComunicacoesNascimentoCriador } from '@/actions/comunicacaoNascimento'
import format from 'date-fns/format'

export function SuperintendenteDashboard(data: { token: string }) {
  const decodedJwt = jsonWebTokenService.decode(data.token)

  const { isLoading: isLoadingTecnicoUser, data: tecnicoUser } =
    useQuery<UserDTO>('tecnico', async () =>
      getUserById(decodedJwt.sub, data.token),
    )

  const { isLoading: isLoadingAnimais, data: todosAnimais } = useQuery(
    'animais',
    async () => getTodosAnimais(data.token),
  )

  const { isLoading: isLoadingRebanhos, data: todosRebanhos } = useQuery(
    'rebanhos',
    async () => getRebanhosAll(data.token),
  )

  const { data: todasFazendas, isLoading: isLoadingFazendas } = useQuery(
    'fazendas',
    async () => getTodasFazendas(data.token),
  )

  const { isLoading, data: criadores } = useQuery('criadores', async () =>
    fetch('http://localhost:3001/criador/get-criadores', {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      method: 'GET',
    }).then((res) => res.json()),
  )

  console.log(criadores)

  const [paginas, setPaginas] = useState({
    animalPage: false,
    tecnicoPage: false,
    criadorPage: false,
    verAnimalPage: false,
    verAnimaRGDPage: false,
    initialPage: false,
    comunicPage: false,
    usersPage: false,
    animalBasePage: false,
    RGD: false,
    RGN: false,
    comunicNascPage: false,
    comunicCoberPage: false,
    todasComunicNascPage: false,
    verComunicNascPage: false,
    solicitacao: false,
    verComunicCoberPage: false,
    tecnicoRegister: false,
    criadorRegister: false,
    menu: true,
    verAnimaisCriador: false,
  })
  const [nascimentos, setNascimentos] = useState([])
  const {
    RGD,
    RGN,
    animalBasePage,
    animalPage,
    comunicCoberPage,
    comunicNascPage,
    comunicPage,
    criadorPage,
    criadorRegister,
    initialPage,
    menu,
    solicitacao,
    tecnicoPage,
    tecnicoRegister,
    todasComunicNascPage,
    usersPage,
    verAnimaRGDPage,
    verAnimalPage,
    verComunicCoberPage,
    verComunicNascPage,
    verAnimaisCriador,
  } = paginas

  const updatedPages = { ...paginas }

  for (const key in updatedPages) {
    if (key !== 'menu') {
      updatedPages[key] = false
    }
  }

  if (
    isLoading ||
    isLoadingAnimais ||
    isLoadingRebanhos ||
    isLoadingFazendas ||
    isLoadingTecnicoUser
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

  async function getNascimentos(id: string) {
    const nascimentoData = await getComunicacoesNascimentoCriador(
      data.token,
      id,
    )
    setNascimentos(nascimentoData)
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
            setPaginas((prev) => ({
              ...updatedPages,
              menu: !prev.menu,
            }))
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
                setPaginas(() => ({
                  ...updatedPages,
                  initialPage: true,
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
                  RGN: !prev.RGN,
                }))
              }}
              colorButton={RGN || RGD ? 'black' : '#9E4B00'}
              textButton="Animais"
            />
            <Button
              widthButton="16vw"
              widthImage="1.5vw"
              src={group}
              heightButton="3.3vw"
              onClick={() => {
                setPaginas((prev) => ({
                  ...updatedPages,
                  usersPage: !prev.usersPage,
                }))
              }}
              colorButton={
                usersPage || criadorPage || tecnicoPage ? 'black' : '#9E4B00'
              }
              textButton="Usuários"
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
                comunicPage || comunicNascPage || comunicCoberPage
                  ? 'black'
                  : '#9E4B00'
              }
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
              colorButton={solicitacao || animalBasePage ? 'black' : '#9E4B00'}
              textButton="Solicitações "
            />

            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y: RGN || RGD ? '-9.5vw' : '-15vw',
                opacity: RGN || RGD ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: `${RGN || RGD ? 'auto' : 'none'}`,
              }}
            >
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={RGD ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    RGD: !prev.RGD,
                  }))
                }}
                colorButton={RGD ? 'black' : 'white'}
                textButton="RGD"
              />
            </DropdownMenu>

            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y:
                  comunicPage || comunicNascPage || comunicCoberPage
                    ? '-6vw'
                    : '-12vw',
                opacity:
                  comunicPage || comunicNascPage || comunicCoberPage ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: `${
                  comunicPage || comunicNascPage || comunicCoberPage
                    ? 'auto'
                    : 'none'
                }`,
              }}
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
                  setPaginas((prev) => ({
                    ...updatedPages,
                    comunicNascPage: !prev.comunicNascPage,
                  }))
                }}
                colorButton={comunicNascPage ? 'black' : 'white'}
                textButton="Comunicações de Nascimento"
              />
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={comunicCoberPage ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    comunicCoberPage: !prev.comunicCoberPage,
                  }))
                }}
                colorButton={comunicCoberPage ? 'black' : 'white'}
                textButton="Comunicações de Cobertura"
              />
            </DropdownMenu>

            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y: usersPage || tecnicoPage || criadorPage ? '-16vw' : '-20vw',
                opacity: usersPage || tecnicoPage || criadorPage ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: `${
                  usersPage || tecnicoPage || criadorPage ? 'auto' : 'none'
                }`,
              }}
            >
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={tecnicoPage ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    tecnicoPage: !prev.tecnicoPage,
                  }))
                }}
                colorButton={tecnicoPage ? 'black' : 'white'}
                textButton="Tecnicos"
              />
              <Button
                marginRightImage="0.6vw"
                marginLeftImage={'0.6vw'}
                textSize="0.9vw"
                textColor={criadorPage ? 'white' : 'black'}
                widthButton="100%"
                widthImage="0.5vw"
                src={arrowLeft}
                heightButton="3.3vw"
                onClick={() => {
                  setPaginas((prev) => ({
                    ...updatedPages,
                    criadorPage: !prev.criadorPage,
                  }))
                }}
                colorButton={criadorPage ? 'black' : 'white'}
                textButton="Criadores"
              />
            </DropdownMenu>

            <DropdownMenu
              initial={{ opacity: 0 }}
              animate={{
                y: solicitacao || animalBasePage ? '-16vw' : '-20vw',
                opacity: solicitacao || animalBasePage ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                pointerEvents: `${
                  solicitacao || animalBasePage ? 'auto' : 'none'
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
            text="Todos os Animais que Precisam do Registro RGD| ABCPD"
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
                                    criadores.find((indexFind: CriadorDTO) => {
                                      return (
                                        indexFind.id === index.criadorAnimal
                                      )
                                    }) || {}
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
                                setAnimalInfos((prev) => ({
                                  ...prev,
                                  animalSelecionado: index,
                                }))
                                setPaginas(() => ({
                                  ...updatedPages,
                                  verAnimaRGDPage: true,
                                }))

                                setRegistro(true)
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

        <TelaAnimaisRGN
          initial={{ opacity: 0 }}
          animate={{ y: paginas.RGN ? 0 : -50, opacity: paginas.RGN ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${paginas.RGN ? 'block' : 'none'}`,
            pointerEvents: `${paginas.RGN ? 'auto' : 'none'}`,
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
            text="Todos os Animais que Precisam do Registro RGN| ABCPD"
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
                  text="Decisão RGN do Superintendente"
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
                                    criadores.find((indexFind: CriadorDTO) => {
                                      return (
                                        indexFind.id === index.criadorAnimal
                                      )
                                    }) || {}
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
                                setAnimalInfos((prev) => ({
                                  ...prev,
                                  animalSelecionado: index,
                                }))
                                setPaginas(() => ({
                                  ...updatedPages,
                                  verAnimaRGDPage: true,
                                }))

                                setRegistro(true)
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
        </TelaAnimaisRGN>

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
              alt="Logo"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Todos os Animais que Precisam do Resgistro | ABCPD"
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
                  text="Decisão RGN do Superintendente"
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
                    radius="2vw"
                    marginLeftImage="0vw"
                    marginRightImage="0vw"
                    src={seta}
                    colorButton="white"
                    heightButton="3vw"
                    widthImage="75%"
                    widthButton="3vw"
                    textColor="white"
                    onClick={() => {
                      setPaginas((prev) => ({
                        ...updatedPages,
                        verAnimaisCriador: !prev.verAnimaisCriador,
                      }))
                    }}
                  />
                </div>
              </td>
            </TableContent>
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
            <Button
              marginTopImage="0.3vw"
              radius="0.3vw"
              textButton="+ Registrar Novo Animal"
              colorButton="#E91868"
              heightButton="3vw"
              widthButton="17vw"
              textColor="white"
              onClick={() => {
                setPaginas((prev) => ({
                  ...updatedPages,
                  verAnimalPage: !prev.verAnimalPage,
                }))
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
                  text="Tipo"
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
                  text="Decisão Técnico RGN"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.3vw'}
                  text="decisão técnico RGD"
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
                  text="João da Silva Santos"
                  color="black"
                  fontWeight="400"
                />
              </td>
              <td>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1vw'}
                  text="000.000.000-00"
                  color="black"
                  fontWeight="400"
                />
              </td>
              <td style={{ width: '25%' }}>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1vw'}
                  text="00.000.00"
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
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Detalhes do Animal | ABCPD"
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome da Mãe"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Sexo do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Fazenda"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Pelagem Do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Ano Da Avaliação"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data de  Registro do RNG"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
            <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome da Mãe"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Sexo do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Fazenda"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Pelagem Do Animal"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Ano Da Avaliação"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data de  Registro do RNG"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
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
            <InputText border="solid 0.2vw #9E4B00" />
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
                              criadores?.find((indexFind: CriadorDTO) => {
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
                              setPaginas(() => ({
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
                          text={format(
                            new Date(index.dataComunicacao),
                            'dd/ MM/ yyyy',
                          )}
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
                              todosAnimais.find((indexAnimal) => {
                                return index.matrizAnimalId == indexAnimal.id
                              }) || {}
                            ).nomeAnimal || ''
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
                              setPaginas(() => ({
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

        <ComunicCobertura
          initial={{ opacity: 0 }}
          animate={{
            y: comunicCoberPage ? 0 : -50,
            opacity: comunicCoberPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${comunicCoberPage ? 'block' : 'none'}`,
            pointerEvents: `${comunicCoberPage ? 'auto' : 'none'}`,
          }}
        >
          <div style={{ width: '4vw' }}>
            <Image
              alt="Logo"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Listagem de Comunicações de Cobertura | ABCPD"
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
                  text="Monta Natural"
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
                  }}
                >
                  <Button
                    onClick={() => {
                      setPaginas(() => ({
                        ...updatedPages,
                        verComunicCoberPage: true,
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
        </ComunicCobertura>

        <VerComunicCobertura
          initial={{ opacity: 0 }}
          animate={{
            y: verComunicCoberPage ? 0 : -50,
            opacity: verComunicCoberPage ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${verComunicCoberPage ? 'flex' : 'none'}`,
            pointerEvents: `${verComunicCoberPage ? 'auto' : 'none'}`,
          }}
        >
          <div style={{ width: '10vw' }}>
            <Image
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Detalhe da Cobertura | ABCPD"
            fontFamily="pop"
            fontWeight="700"
            size="1.8vw"
            color="black"
          />

          <InputPlace>
            <Text
              text="Informações "
              fontFamily="pop"
              fontWeight="700"
              size="1.5vw"
              color="black"
            />
          </InputPlace>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome do Reprodudor"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Nome da Matriz"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Tipo de Cobertura"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data da Cobertura"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Criador da Cobertura"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <div
            style={{
              display: 'flex',
              marginTop: '1vw',
              justifyContent: 'end',
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
          </div>
        </VerComunicCobertura>

        <UsersPage
          initial={{ opacity: 0 }}
          animate={{ y: tecnicoPage ? 0 : -50, opacity: tecnicoPage ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${tecnicoPage ? 'block' : 'none'}`,
            pointerEvents: `${tecnicoPage ? 'auto' : 'none'}`,
          }}
        >
          <div style={{ width: '4vw' }}>
            <Image
              alt="Logo"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Todos os Técnicos da ABCPD"
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
                  text="Nome Completo"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.3vw'}
                  text="CPF"
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
                  text="Pedro"
                  color="black"
                  fontWeight="400"
                />
              </td>
              <td>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1vw'}
                  text="Tec.nic.o@t-es"
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
                      setPaginas((prev) => ({
                        ...updatedPages,
                        tecnicoRegister: !prev.tecnicoRegister,
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
          </Table>

          <div
            style={{
              marginTop: '1vw',
              display: 'flex',
              width: '28vw',
              justifyContent: 'space-between',
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
              colorButton="#9E4B00 "
              heightButton="2vw"
              textButton="Registrar novo técnico"
              widthButton="20vw"
              textColor="white"
            />
          </div>
        </UsersPage>

        <UsersPage
          initial={{ opacity: 0 }}
          animate={{ y: criadorPage ? 0 : -50, opacity: criadorPage ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${criadorPage ? 'block' : 'none'}`,
            pointerEvents: `${criadorPage ? 'auto' : 'none'}`,
          }}
        >
          <div style={{ width: '4vw' }}>
            <Image
              alt="Logo"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Todos os Criadores da ABCPD"
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
                  text="Nome Completo"
                  color="black"
                  fontWeight="400"
                />
              </th>
              <th>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1.3vw'}
                  text="CPF"
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
                  text="Pedro"
                  color="black"
                  fontWeight="400"
                />
              </td>
              <td>
                <Text
                  textAlign="center"
                  fontFamily="rob"
                  size={'1vw'}
                  text="Tec.nic.o@t-es"
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
                      setPaginas((prev) => ({
                        ...updatedPages,
                        criadorRegister: !prev.criadorRegister,
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
          </Table>

          <div
            style={{
              marginTop: '1vw',
              display: 'flex',
              width: '28vw',
              justifyContent: 'space-between',
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
              colorButton="#9E4B00 "
              heightButton="2vw"
              textButton="Registrar novo criador"
              widthButton="20vw"
              textColor="white"
            />
          </div>
        </UsersPage>

        <UserRegister
          initial={{ opacity: 0 }}
          animate={{
            y: criadorRegister ? 0 : -50,
            opacity: criadorRegister ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${criadorRegister ? 'flex' : 'none'}`,
            pointerEvents: `${criadorRegister ? 'auto' : 'none'}`,
          }}
        >
          <div style={{ width: '10vw' }}>
            <Image
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Registro do Criador"
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
                text="Nome Completo"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Email"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="CPF/CNPJ"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="RG"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Endereço"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Bairro"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Cidade"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Estado"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="CEP"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Telefone"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <div
            style={{
              display: 'flex',
              marginTop: '5vw',
              justifyContent: 'space-between',
              width: '40%',
              marginLeft: '38vw',
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
              textButton="Editar"
              widthButton="7vw"
              textColor="white"
            />
            <Button
              colorButton="#BC433B"
              heightButton="2vw"
              textButton="Desativar Conta"
              widthButton="12vw"
              textColor="white"
            />
          </div>
        </UserRegister>

        <UserRegister
          initial={{ opacity: 0 }}
          animate={{
            y: tecnicoRegister ? 0 : -50,
            opacity: tecnicoRegister ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            display: `${tecnicoRegister ? 'flex' : 'none'}`,
            pointerEvents: `${tecnicoRegister ? 'auto' : 'none'}`,
          }}
        >
          <div style={{ width: '10vw' }}>
            <Image
              alt="logoAnimal"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <Text
            text="Registro do Técnico"
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
                text="Nome Completo"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Email"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="CPF/CNPJ"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="RG"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Endereço"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Bairro"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Cidade"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Estado"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <InputPair style={{ width: '90%' }}>
            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="CEP"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>

            <InputPlace style={{ width: '47%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Telefone"
                color="black"
                fontWeight="300"
              />
              <InputText border="solid 0.2vw #9E4B00" />
            </InputPlace>
          </InputPair>

          <div
            style={{
              display: 'flex',
              marginTop: '5vw',
              justifyContent: 'space-between',
              width: '40%',
              marginLeft: '38vw',
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
              textButton="Editar"
              widthButton="7vw"
              textColor="white"
            />
            <Button
              colorButton="#BC433B"
              heightButton="2vw"
              textButton="Desativar Conta"
              widthButton="12vw"
              textColor="white"
            />
          </div>
        </UserRegister>
      </Content>
    </Container>
  )
}
