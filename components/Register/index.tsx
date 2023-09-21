'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Text } from '../Text'
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
  CreditCard,
  Input,
} from './style'
import { Header } from '../Header/Header'
import { Button } from '../Button'
import { WhiteBackground } from '../WhiteBackground'
import { boleto, card, cartao, logo, logo2, pix } from '@/assets'
import Image from 'next/legacy/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CriarCriador } from '@/actions/criadorApi'
import { CriarFazenda } from '@/actions/fazendaApi'
import { motion } from 'framer-motion'
import { PaymentAPI } from '@/actions/paymentApi'
import { AlertContext } from '@/context/AlertContextProvider'
import { RebanhoAPI } from '@/actions/RebanhApi'
import { getUserCPFEmail } from '@/actions/user'
import { CircularProgress } from '@mui/material'
import FazendaDTO from '@/utils/FazendaDTO'

export function Register() {
  const { alert } = useContext(AlertContext)
  const [pageOneX, setPageOneX] = useState(false)
  const [pageTwoX, setPageTwoX] = useState(false)
  const [pageThreeX, setPageThreeX] = useState(false)
  const [paymentX, setPaymentX] = useState(false)
  const [pixPay, setPix] = useState(false)
  const [boletoPay, setBoleto] = useState(false)
  const [creditPay, setCredit] = useState(false)
  const [imagePix, setImagePix] = useState()
  const [boletoURL, setBoletoURL] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setSchema(getSchema())
  }, [pageOneX, pageTwoX, pageThreeX])

  const [schema, setSchema] = useState<any>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const [formValues, setFormValues] = React.useState(schema)

  function getSchema() {
    if (!pageOneX) {
      return z
        .object({
          nomeCompleto: z
            .string()
            .min(1, 'Nome completo é um campo obrigatório'),
          email: z
            .string({
              errorMap: () => {
                return { message: 'Email não é válido' }
              },
            })
            .min(1, 'Email é obrigatório')
            .email(),
          senha: z
            .string({
              errorMap: () => {
                return { message: 'Senha não é válida' }
              },
            })
            .min(8, 'Senha deve ter no minimo 8 digitos'),
          confirmarSenha: z
            .string({
              errorMap: () => {
                return { message: 'Confirmação de senha não é válida' }
              },
            })
            .min(8, 'Confirmação de senha deve ter no minimo 8 digitos'),
        })
        .refine((fields) => fields.senha === fields.confirmarSenha, {
          path: ['confirmarSenha'],
          message: 'As senhas precisam ser iguais',
        })
    }
    if (!pageTwoX) {
      return z
        .object({
          cpf: z.string().min(1, 'CPF é um campo obrigatório'),
          rg: z.string().min(1, 'RG é um campo obrigatório'),
          nomeRua: z.string().min(1, 'Rua é um campo obrigatório'),

          nomeBairro: z
            .string({
              errorMap: () => {
                return { message: 'Bairro não é válido' }
              },
            })
            .min(1, 'Bairro é um campo obrigatório'),

          nomeCidade: z.string().min(1, 'Cidade é um campo obrigatório'),
          nomeEstado: z.string().min(1, 'Estado é um campo obrigatório'),
          cep: z.string().min(1, 'CEP é um campo obrigatório'),
          telefone: z.string().min(1, 'Telefone é um campo obrigatório'),
          numeroCasa: z
            .string()
            .min(1, 'Numero da casa é um campo obrigatório'),
        })
        .refine((fields) => validarCPF(fields.cpf) === true, {
          path: ['cpf'],
          message: 'CPF inválido',
        })
    }
    if (!pageThreeX) {
      return z.object({
        nomeFazenda: z.string().min(1, 'Nome fazenda é um campo obrigatório'),
        telefoneFazenda: z.string().min(1, 'Telefone é um campo obrigatório'),
        areaFazenda: z.string().min(1, 'Area é um campo obrigatório'),
        municipioFazenda: z.string().min(1, 'Municipio é um campo obrigatório'),
        comoChegar: z.string(),
        outrasEspecies: z.string(),
        observacoes: z.string(),
        femeas04Fazenda: z.number(),
        femeas1224Fazenda: z.number(),
        femeas2436Fazenda: z.number(),
        femeas36Fazenda: z.number(),
        femeas412Fazenda: z.number(),
        macho04Fazenda: z.number(),
        macho1224Fazenda: z.number(),
        macho2436Fazenda: z.number(),
        macho36Fazenda: z.number(),
        macho412Fazenda: z.number(),
      })
    }
    return z.object({})
  }
  function validarCPF(cpf: string): boolean {
    // Removendo pontos e traços para obter apenas os dígitos
    const cpfLimpo = cpf.replace(/[.-]/g, '')

    // Verificando o formato do CPF (11 dígitos)
    const regexCPF = /^[0-9]{11}$/
    if (!regexCPF.test(cpfLimpo)) {
      return false
    }

    // Verificando dígitos repetidos (uma característica de CPF inválido)
    const digitosRepetidos = /^(.)\1+$/
    if (digitosRepetidos.test(cpfLimpo)) {
      return false
    }

    // Aplicando a fórmula de verificação do dígito
    const digitos = cpfLimpo.split('').map(Number)

    let soma = 0
    let peso = 10

    for (let i = 0; i < 9; i++) {
      soma += digitos[i] * peso
      peso--
    }

    let resto = soma % 11
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto

    if (digitoVerificador1 !== digitos[9]) {
      return false
    }

    soma = 0
    peso = 11

    for (let i = 0; i < 10; i++) {
      soma += digitos[i] * peso
      peso--
    }

    resto = soma % 11
    const digitoVerificador2 = resto < 2 ? 0 : 11 - resto
    return digitoVerificador2 === digitos[10]
  }

  async function CPFUsado(cpf: string) {
    const response = await getUserCPFEmail(cpf)
    return response
  }

  const handle = async (data) => {
    if (await CPFUsado(data.email)) {
      alert('Email já foi utilizado')
    } else {
      setFormValues({ ...formValues, ...data })
      if (Object.keys(errors).length === 0) {
        setPageOneX(!pageOneX)
      }
    }
  }

  const handle2 = async (data) => {
    setFormValues({ ...formValues, ...data })
    if (await CPFUsado(formValues.cpf)) {
      alert('CPF Já foi utilizado')
    } else {
      if (Object.keys(errors).length === 0) {
        setPageTwoX(!pageTwoX)
      }
    }
  }

  const handle3 = (data) => {
    if (data) {
      Enviar(data)
    } else {
      alert('Formulário inválido')
    }
  }

  async function getPixImage(id: string) {
    const response = await PaymentAPI(
      {
        billingType: 'PIX',
        value: '10',
      },
      id,
    )
    if (response.encodedImage) {
      setImagePix(`data:image/png;base64, ${response.encodedImage}`)
    }
  }

  async function getBoleto(id: string) {
    const response = await PaymentAPI(
      {
        billingType: 'BOLETO',
        value: '10',
      },
      id,
    )

    if (response.invoiceUrl && boletoURL == '') {
      setBoletoURL(response.invoiceUrl)
    }
  }

  const Enviar = async (fazenda: FazendaDTO) => {
    setLoading(true)
    const palavras = formValues.nomeCompleto.split(' ')

    const UserData = {
      dateJoined: new Date(Date.now()).toISOString(),
      nomePrimeiro: palavras[0],
      nomeUltimo: palavras[palavras.length - 1],
      email: formValues.email,
      cpf: formValues.cpf,
      username: palavras[0],
      senha: formValues.senha,
      telefone: formValues.telefone,
      ultimaConexao: new Date(Date.now()).toISOString(),
    }

    const CriadorData = {
      cep: formValues.cep,
      nomeBairro: formValues.nomeBairro,
      nomeCidade: formValues.nomeCidade,
      nomeCompleto: formValues.nomeCompleto,
      nomeEstado: formValues.nomeEstado,
      nomeRua: formValues.nomeRua,
      rg: formValues.rg,
      numeroCasa: formValues.numeroCasa,
    }

    const response = await CriarCriador({ ...CriadorData, ...UserData })

    if (!response.message) {
      const FazendaData = {
        criadorFazenda: response?.id,
        areaFazenda: fazenda.areaFazenda,
        atualizacoes: '',
        comoChegar: fazenda.comoChegar,
        femeas04Fazenda: parseInt(fazenda.femeas04Fazenda),
        femeas1224Fazenda: parseInt(fazenda.femeas1224Fazenda),
        femeas2436Fazenda: parseInt(fazenda.femeas2436Fazenda),
        femeas36Fazenda: parseInt(fazenda.femeas36Fazenda),
        femeas412Fazenda: parseInt(fazenda.femeas412Fazenda),
        macho04Fazenda: parseInt(fazenda.macho04Fazenda),
        macho1224Fazenda: parseInt(fazenda.macho1224Fazenda),
        macho2436Fazenda: parseInt(fazenda.macho2436Fazenda),
        macho36Fazenda: parseInt(fazenda.macho36Fazenda),
        macho412Fazenda: parseInt(fazenda.macho412Fazenda),
        municipioFazenda: fazenda.municipioFazenda,
        nomeFazenda: fazenda.nomeFazenda,
        observacoes: fazenda.observacoes,
        outrasEspecies: fazenda.outrasEspecies,
        telefoneFazenda: fazenda.telefoneFazenda,
        fazendaCadastrada: false,
      }
      const responseFazenda = await CriarFazenda(FazendaData)

      if (responseFazenda.id) {
        alert('Conta criada com sucesso', 'success')
        setPageThreeX(!pageThreeX)
        getPixImage(response?.id)
        getBoleto(response?.id)
      }
    }
    setLoading(false)
  }

  return (
    <Container
      style={{
        backgroundColor: pageThreeX ? 'white' : '#E0E0E0',
        height: pageThreeX ? '40vw' : '260vw',
      }}
    >
      <Header page="Register" />

      <GreenBackground style={{ display: pageThreeX ? 'none' : '' }} />

      <ScreenOne
        animate={{ x: pageOneX ? -1400 : 0 }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit(handle)}
      >
        <RegisterPainel>
          <WhiteBackground width="80%" height="45vw">
            <Content>
              <Button
                widthButton="10%"
                heightButton="3vw"
                colorButton="#9E4B00"
                textButton="←  Voltar"
                onClick={() => {
                  window.location.assign('/')
                }}
              />

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Registre-se"
                  color="black"
                  fontWeight="600"
                />
              </Title>

              <InputData>
                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Nome Completo"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      {...register('nomeCompleto', { required: true })}
                      type="text"
                      name="nomeCompleto"
                    />
                  </InputPlace>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="E-mail"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      {...register('email', { required: true })}
                      type="email"
                      name="email"
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Senha"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      {...register('senha', { required: true })}
                      placeholder=""
                      type="password"
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Confirmar Senha"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      {...register('confirmarSenha', { required: true })}
                      type="password"
                    />
                  </InputPlace>
                </InputPair>
              </InputData>
            </Content>
          </WhiteBackground>
        </RegisterPainel>

        <ButtonPanel style={{ marginTop: '51.5vw' }}>
          <GrayBackground>
            <Button
              onClick={() => {
                for (const componente in errors) {
                  const mensagem = errors[componente]
                  alert(mensagem?.message)
                }
                setSchema(getSchema())
              }}
              type="submit"
              widthButton="80%"
              heightButton="6vw"
              colorButton="#9E4B00"
              textButton="Continuar"
            />
          </GrayBackground>
        </ButtonPanel>
      </ScreenOne>

      <ScreenTwo
        initial={{ x: 1400 }}
        animate={{ x: pageTwoX ? -1400 : pageOneX ? 0 : 1400 }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit(handle2)}
      >
        <RegisterPainel>
          <WhiteBackground width="80%" height="60vw">
            <Content>
              <Button
                onClick={() => {
                  setPageOneX(!pageOneX)
                  setSchema(getSchema())
                }}
                widthButton="10%"
                heightButton="3vw"
                colorButton="#9E4B00"
                textButton="←  Voltar"
                type="button"
              />

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Informações Pessoais"
                  color="black"
                  fontWeight="600"
                />
              </Title>

              <InputData>
                <InputPair>
                  <InputPlace>
                    <TitleContent>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="CPF/CNPJ"
                        color="black"
                        fontWeight="300"
                      />
                      <Text
                        fontFamily="pop"
                        size={'1vw'}
                        text="(Somente números)"
                        color="gray"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('cpf', { required: true })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <TitleContent style={{ width: '40%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="RG"
                        color="black"
                        fontWeight="300"
                      />
                      <Text
                        fontFamily="pop"
                        size={'1vw'}
                        text="(Somente números)"
                        color="gray"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('rg', { required: true })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Endereço"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      {...register('nomeRua', { required: true })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Bairro"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      {...register('nomeBairro', { required: true })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Cidade"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      {...register('nomeCidade', { required: true })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Estado"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      {...register('nomeEstado', { required: true })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <TitleContent style={{ width: '40%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="CEP"
                        color="black"
                        fontWeight="300"
                      />
                      <Text
                        fontFamily="pop"
                        size={'1vw'}
                        text="(Somente números)"
                        color="gray"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('cep', { required: true })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <TitleContent style={{ width: '50%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="Telefone"
                        color="black"
                        fontWeight="300"
                      />
                      <Text
                        fontFamily="pop"
                        size={'1vw'}
                        text="(Somente números)"
                        color="gray"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('telefone', { required: true })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <TitleContent style={{ width: '70%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="Numero da casa"
                        color="black"
                        fontWeight="300"
                      />
                      <Text
                        fontFamily="pop"
                        size={'1vw'}
                        text="(Somente números)"
                        color="gray"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('numeroCasa', { required: true })}
                    />
                  </InputPlace>
                </InputPair>
              </InputData>
            </Content>
          </WhiteBackground>
        </RegisterPainel>

        <ButtonPanel style={{ marginTop: '59vw' }}>
          <GrayBackground>
            <Button
              onClick={async () => {
                for (const componente in errors) {
                  const mensagem = errors[componente]
                  alert(mensagem.message)
                }
              }}
              widthButton="80%"
              heightButton="6vw"
              colorButton="#9E4B00"
              textButton="Continuar"
            />
          </GrayBackground>
        </ButtonPanel>
      </ScreenTwo>

      <ScreenThree
        initial={{ x: 1400 }}
        animate={{ x: pageThreeX ? -1400 : pageTwoX ? 0 : 1400 }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit(handle3)}
      >
        <RegisterPainel>
          <WhiteBackground width="80%" height="200vw">
            <Content>
              <Button
                onClick={() => {
                  setPageTwoX(!pageTwoX)
                }}
                widthButton="10%"
                heightButton="3vw"
                colorButton="#9E4B00"
                textButton="←  Voltar"
                type="button"
              />

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Fazendas"
                  color="black"
                  fontWeight="600"
                />
              </Title>

              <InputData>
                <InputPair>
                  <InputPlace>
                    <TitleContent>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="Nome da fazenda"
                        color="black"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('nomeFazenda', { required: true })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <TitleContent style={{ width: '50%' }}>
                      <Text
                        fontFamily="pop"
                        size={'1.5vw'}
                        text="Telefone"
                        color="black"
                        fontWeight="300"
                      />
                      <Text
                        fontFamily="pop"
                        size={'1vw'}
                        text="(Somente números)"
                        color="gray"
                        fontWeight="300"
                      />
                    </TitleContent>
                    <Input
                      placeholder=""
                      {...register('telefoneFazenda', { required: true })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Área"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      {...register('areaFazenda', { required: true })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Municipio"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      type="text"
                      placeholder=""
                      {...register('municipioFazenda', { required: true })}
                    />
                  </InputPlace>
                </InputPair>
              </InputData>

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Registro do Gado da Raça Pé-Duro:"
                  color="black"
                  fontWeight="600"
                />
              </Title>

              <InputData>
                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Bois de 0 a 4 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('macho04Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Bois de 5 a 12 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('macho412Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Bois de 13 a 24 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('macho1224Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Bois de 25 a 36 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('macho2436Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Bois de 37 a + Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('macho36Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Vacas de 0 a 4 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('femeas04Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Vacas de 5 a 12 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('femeas412Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Vacas de 13 a 24 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('femeas1224Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>
                </InputPair>

                <InputPair>
                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Vacas de 25 a 36 Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('femeas2436Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>

                  <InputPlace>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Vacas de 37 a + Meses"
                      color="black"
                      fontWeight="300"
                    />
                    <Input
                      placeholder=""
                      type="number"
                      {...register('femeas36Fazenda', {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputPlace>
                </InputPair>
              </InputData>

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Como chegar"
                  color="black"
                  fontWeight="600"
                />
              </Title>
              <TextBox {...register('comoChegar')} />

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Cria Outras Espécies/Raças Nativas/Adaptativas?"
                  color="black"
                  fontWeight="600"
                />
              </Title>
              <TextBox {...register('outrasEspecies')} />

              <Title>
                <Text
                  fontFamily="pop"
                  size={'2vw'}
                  text="Observações"
                  color="black"
                  fontWeight="600"
                />
              </Title>
              <TextBox {...register('observacoes')} />
            </Content>
          </WhiteBackground>
        </RegisterPainel>

        <ButtonPanel style={{ marginTop: '129vw' }}>
          <GrayBackground>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={() => {
                  for (const componente in errors) {
                    const mensagem = errors[componente]
                    alert(mensagem.message)
                  }
                }}
                widthButton="80%"
                heightButton="6vw"
                colorButton="#9E4B00"
                textButton="Continuar"
              />
            )}
          </GrayBackground>
        </ButtonPanel>
      </ScreenThree>

      <Payment
        initial={{ x: 1400 }}
        animate={{ x: paymentX ? -1400 : pageThreeX ? 0 : 1400 }}
        transition={{ duration: 1 }}
      >
        <RegisterPainel>
          <WhiteBackground width="80%" height="100vw">
            <Content style={{ height: '100%' }}>
              <Button
                onClick={() => {
                  setPageThreeX(!pageThreeX)
                }}
                widthButton="10%"
                heightButton="3vw"
                colorButton="#9E4B00"
                textButton="← "
              />
              <div style={{ marginLeft: '8vw' }}>
                <Title>
                  <Text
                    fontFamily="pop"
                    size={'2vw'}
                    text="Pagamento"
                    color="black"
                    fontWeight="600"
                  />
                </Title>

                <Title>
                  <Text
                    fontFamily="rob"
                    size={'2vw'}
                    text="Selecione um método de pagamento"
                    color="black"
                    fontWeight="400"
                  />
                </Title>

                <CreditCard>
                  <div>
                    <InputPair style={{ width: '72%' }}>
                      <Input
                        checked={creditPay === true}
                        style={{ width: '13%' }}
                        type="radio"
                        onClick={() => {
                          setCredit(!creditPay)
                          setBoleto(false)
                          setPix(false)
                        }}
                      />
                      <Text
                        src={cartao}
                        widthImage="4vw"
                        fontFamily="pop"
                        size={'1.3vw'}
                        text="Cartão Credito/Debito"
                        color="black"
                        fontWeight="600"
                      />
                    </InputPair>

                    <div
                      style={{
                        width: '25vw',
                        marginTop: '2vw',
                        marginLeft: '5vw',
                      }}
                    >
                      <Image
                        src={card}
                        alt="cartao"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <motion.div
                      initial={{ height: '30vw', opacity: 1 }}
                      animate={{
                        height: creditPay ? '30vw' : '0vw',
                        opacity: creditPay ? 1 : 0,
                      }}
                      transition={{ duration: 1 }}
                    >
                      <Title
                        style={{
                          marginLeft: '5vw',
                        }}
                      >
                        <Text
                          fontFamily="pop"
                          size={'2vw'}
                          text="Adicionar Cartão"
                          color="black"
                          fontWeight="600"
                        />
                      </Title>

                      <div
                        style={{
                          marginLeft: '5vw',
                          width: '70%',
                          height: '100%',
                        }}
                      >
                        <InputPlace style={{ width: '100%' }}>
                          <Text
                            fontFamily="pop"
                            size={'1.5vw'}
                            text="Nome do titular"
                            color="black"
                            fontWeight="300"
                          />
                          <Input />
                        </InputPlace>

                        <InputPlace style={{ width: '100%' }}>
                          <Text
                            fontFamily="pop"
                            size={'1.5vw'}
                            text="Número do cartão"
                            color="black"
                            fontWeight="300"
                          />
                          <Input
                            type="text"
                            mask="9999 9999 9999 9999"
                            placeholder="0000 0000 0000 0000"
                          />
                        </InputPlace>

                        <InputPair>
                          <InputPlace style={{ width: '65%' }}>
                            <TitleContent style={{ width: '80%' }}>
                              <Text
                                fontFamily="pop"
                                size={'1.5vw'}
                                text="Validade"
                                color="black"
                                fontWeight="300"
                              />
                            </TitleContent>
                            <Input type="month" />
                          </InputPlace>

                          <InputPlace style={{ width: '25%' }}>
                            <TitleContent style={{ width: '40%' }}>
                              <Text
                                fontFamily="pop"
                                size={'1.5vw'}
                                text="CVV"
                                color="black"
                                fontWeight="300"
                              />
                            </TitleContent>
                            <Input type="text" mask="999" placeholder="000" />
                          </InputPlace>
                        </InputPair>
                      </div>
                    </motion.div>
                  </div>

                  <WhiteBackground
                    alignItems="normal"
                    padding="3vw"
                    boxShadow="0.1vw 0.1vw 0.6vw #9E4B00"
                    width="40%"
                    height="15vw"
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <InputPair style={{ alignItems: 'center' }}>
                        <div
                          style={{
                            width: '20%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <div style={{ width: '3vw' }}>
                            <Image
                              src={logo}
                              alt="Logo"
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                              }}
                            />
                          </div>

                          <div style={{ width: '7vw' }}>
                            <Image
                              src={logo2}
                              alt="Logo"
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                        </div>

                        <TitleContent style={{ width: '70%' }}>
                          <Text
                            fontFamily="pop"
                            size={'1vw'}
                            text="Pagamento da Taxa de Inscrição"
                            color="black"
                            fontWeight="600"
                          />
                        </TitleContent>
                      </InputPair>

                      <InputPair>
                        <TitleContent style={{ width: '80%' }}>
                          <Text
                            fontFamily="pop"
                            size={'1.2vw'}
                            text="Taxa de Inscrição"
                            color="black"
                            fontWeight="600"
                          />
                        </TitleContent>

                        <TitleContent
                          style={{ width: '40%', marginLeft: '8vw' }}
                        >
                          <Text
                            fontFamily="pop"
                            size={'1.2vw'}
                            text="R$ 10,00"
                            color="black"
                            fontWeight="600"
                          />
                        </TitleContent>
                      </InputPair>

                      <Button
                        widthButton="100%"
                        heightButton="3vw"
                        colorButton="#9E4B00"
                        textButton="Confirmar Pagamento"
                      />
                    </div>
                  </WhiteBackground>
                </CreditCard>

                <InputPair style={{ width: '20.5%' }}>
                  <Input
                    onClick={() => {
                      setPix(!pixPay)
                      setBoleto(false)
                      setCredit(false)
                      getPixImage()
                    }}
                    style={{ width: '18%' }}
                    type="radio"
                    checked={pixPay === true}
                  />
                  <div style={{ width: '5vw', marginTop: '0.6vw' }}>
                    <Image
                      src={pix}
                      alt="pix"
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <Text
                    fontFamily="pop"
                    size={'2vw'}
                    text="PIX"
                    color="black"
                    fontWeight="600"
                  />
                </InputPair>

                <motion.div
                  initial={{ height: '20vw', opacity: 1 }}
                  animate={{
                    height: pixPay ? '20vw' : '0vw',
                    opacity: pixPay ? 1 : 0,
                  }}
                  transition={{ duration: 1 }}
                >
                  <div
                    style={{ width: '10vw', display: pixPay ? 'flex' : 'none' }}
                  >
                    <img alt="pix" src={imagePix} style={{ width: '20vw' }} />
                  </div>
                </motion.div>

                <InputPair style={{ width: '24.5%' }}>
                  <Input
                    style={{ width: '15%' }}
                    type="radio"
                    onClick={() => {
                      setBoleto(!boletoPay)
                      setPix(false)
                      setCredit(false)
                    }}
                    checked={boletoPay === true}
                  />

                  <div
                    style={{
                      width: '5vw',
                    }}
                  >
                    <Image
                      src={boleto}
                      alt="boleto"
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <Text
                    fontFamily="pop"
                    size={'2vw'}
                    text="Boleto"
                    color="black"
                    fontWeight="600"
                  />
                </InputPair>

                <motion.div
                  initial={{ height: '20vw', opacity: 1 }}
                  animate={{
                    height: boletoPay ? '20vw' : '0vw',
                    opacity: boletoPay ? 1 : 0,
                  }}
                  transition={{ duration: 1 }}
                >
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Acesse o boleto em: "
                    color="black"
                    fontWeight="600"
                  />
                  <a href={boletoURL}>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Boleto ABCPD"
                      color="blue"
                      fontWeight="600"
                    />
                  </a>
                </motion.div>
              </div>
            </Content>
          </WhiteBackground>
        </RegisterPainel>
      </Payment>
    </Container>
  )
}
