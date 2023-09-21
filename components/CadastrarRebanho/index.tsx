import { Container, Select, InputText } from './style'
import Image from 'next/image'
import { Text } from '../Text'
import { logo2Branca } from '@/assets'
import { CircularProgress } from '@mui/material'
import { Button } from '../Button'
import jsonWebTokenService from 'jsonwebtoken'
import FazendaDTO from '@/utils/FazendaDTO'
import RebanhoDTO from '@/utils/RebanhoDTO'
import { useQuery } from 'react-query'
import { getFazendaCriador } from '@/actions/fazendaApi'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { RebanhoAPI, getRebanhoBySerie } from '@/actions/RebanhApi'
import { AlertContext } from '@/context/AlertContextProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export function CadastrarRebanho(props: { token: string }) {
  const [loading, setLoading] = useState(false)
  const decodedJwt = jsonWebTokenService.decode(props?.token)
  const schema = z.object({
    serie: z
      .string()
      .min(3, 'Rebanho deve ter no mínimo 3 caracteres')
      .max(4, 'Rebanho deve ter no máximo 4 caracteres'),
    fazendaId: z.string().nonempty('Selecione uma fazenda'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
  })
  const { isLoading: isLoadingFazendas, data: fazendas } = useQuery(
    'fazendas',
    async () => getFazendaCriador(props.token, decodedJwt?.sub),
  )
  const { alert } = useContext(AlertContext)

  async function cadastrarRebanho(data) {
    const rebanho: RebanhoDTO = data
    setLoading(true)
    console.log(fazendas.length)

    if (fazendas.length > 1 && rebanho.serie.length === 3) {
      setLoading(false)
      return alert(
        'Serie alfabetica deve conter 4 caracteres, pois já possui outra fazenda',
      )
    }
    const serieUsada = await getRebanhoBySerie(rebanho.serie, props.token)

    if (serieUsada.id) {
      setLoading(false)
      return alert('Serie alfabetica já foi utlizada por outro criador')
    }

    const responseRebanho = await RebanhoAPI({
      fazendaId: rebanho.fazendaId,
      serie: rebanho.serie,
    })

    if (responseRebanho.serie) {
      setLoading(false)
      return alert('Rebanho cadastrado com sucesso!', 'success')
    }
    setLoading(false)
  }

  if (isLoadingFazendas) {
    return (
      <div
        style={{
          width: '100%',
          height: '40vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    )
  }
  return (
    <Container onSubmit={handleSubmit(cadastrarRebanho)}>
      <div
        style={{
          width: '100%',
          marginLeft: '50vw',
          marginBottom: '-5vw',
          marginTop: '5vw',
        }}
      >
        <Button
          widthButton="10%"
          heightButton="3vw"
          colorButton="black"
          textButton="← "
          onClick={() => {
            window.location.assign(`/CriadorPage/${props.token}`)
          }}
          type="button"
        />
      </div>

      <div style={{ width: '10vw' }}>
        <Image
          src={logo2Branca}
          alt="logoAnimal"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <Text
        text="Cadastro de novo rebanho | ABCPD"
        fontFamily="pop"
        fontWeight="700"
        size="2vw"
        color="black"
      />
      <Text
        text="Fazenda"
        fontFamily="rob"
        fontWeight="400"
        size="2vw"
        color="black"
      />
      <Select
        style={{ width: '30.5vw' }}
        {...register('fazendaId', { required: true })}
      >
        <option selected disabled value={''}>
          Selecione uma fazenda
        </option>
        {fazendas.map((data: FazendaDTO) => {
          return (
            <option value={data.id} key={data.nomeFazenda}>
              {data.nomeFazenda}
            </option>
          )
        })}
      </Select>

      <Text
        text="Série alfabética"
        fontFamily="rob"
        fontWeight="400"
        size="2vw"
        color="black"
      />
      <InputText
        {...register('serie', { required: true })}
        style={{ width: '30vw' }}
        type="text"
      />
      <div
        style={{
          display: 'flex',
          marginTop: '1vw',
          justifyContent: 'space-between',
          width: '28%',
          marginLeft: '33vw',
        }}
      >
        {loading ? (
          <CircularProgress size={'2vw'} />
        ) : (
          <Button
            colorButton="#9E4B00"
            heightButton="2vw"
            textButton="Cadastrar Rebanho"
            widthButton="13vw"
            textColor="white"
            type="submit"
            onClick={() => {
              for (const componente in errors) {
                const mensagem = errors[componente]
                alert(mensagem?.message)
              }
            }}
          />
        )}
      </div>
    </Container>
  )
}
