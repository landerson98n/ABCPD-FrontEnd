import Image from 'next/image'
import { InputPlace, InputPair, InputText, Container } from './style'
import { Text } from '../Text'
import { animal, logo2Branca } from '@/assets'
import { Button } from '../Button'
import { CircularProgress } from '@mui/material'
import AnimalDTO from '@/utils/AnimalDTO'
import FazendaDTO from '@/utils/FazendaDTO'
import CriadorDTO from '@/utils/CriadorDTO'
import { useContext, useState } from 'react'
import format from 'date-fns/format'
import { updateAnimal } from '@/actions/animaisApi'
import { AlertContext } from '@/context/AlertContextProvider'
import { Tree } from 'react-organizational-chart'
import { ArvoreGenealogica } from '../ArvoreGenealogica'
import { Certificado } from '../Certificado'
import { Router, useRouter, useSearchParams } from 'next/navigation'
import { AnimalContext } from '@/context/AnimalContextProvider'

interface DetalheAnimal {
  animalInfos: {
    animalSelecionado: AnimalDTO
    fazendaSelecionado: FazendaDTO
    criadorSelecionado: CriadorDTO
    paiSelecionado: AnimalDTO
    maeSelecionado: AnimalDTO
  }
  token: string
  registro: boolean
  TecnicoRGD?: boolean
  TecnicoRGN?: boolean
  SuperRGD?: boolean
  SuperRGN?: boolean
  animaisCriador: AnimalDTO[]
}

export function DetalhesAnimal(props: DetalheAnimal) {
  const { alert } = useContext(AlertContext)
  const { animal } = useContext(AnimalContext)
  const {
    animalInfos,
    registro,
    token,
    animaisCriador,
    TecnicoRGD,
    SuperRGD,
    SuperRGN,
    TecnicoRGN,
  } = props
  const {
    criadorSelecionado,
    fazendaSelecionado,
    maeSelecionado,
    paiSelecionado,
    animalSelecionado,
  } = animalInfos

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  let updateAnimalData: AnimalDTO
  async function updateAnimalRGD(decisao: string) {
    setLoading(true)

    if (TecnicoRGD) {
      updateAnimalData = {
        ...animalSelecionado,
        decisaoAnimalTecnicoRGD: decisao,
        registradoRGDTecnico: true,
      }
    }

    if (TecnicoRGN) {
      updateAnimalData = {
        ...animalSelecionado,
        decisaoAnimalTecnicoRGN: decisao,
        registradoRGNTecnico: true,
      }
    }

    if (SuperRGN) {
      updateAnimalData = {
        ...animalSelecionado,
        decisaoAnimalSuperRGN: decisao,
        registradoRGNSuper: true,
      }
    }

    if (SuperRGD) {
      updateAnimalData = {
        ...animalSelecionado,
        decisaoAnimalSuperRGD: decisao,
        registradoRGDSuper: true,
      }
    }

    const animal = await updateAnimal(
      updateAnimalData,
      token,
      animalSelecionado.id,
    )

    if (!animal.messages) {
      alert('A decisão foi salva com sucesso', 'success')
    }
    setLoading(false)
  }

  return (
    <>
      <Certificado
        animal={animalSelecionado}
        fazendaName={fazendaSelecionado.nomeFazenda}
        criadorName={criadorSelecionado.nomeCompleto}
      />
      <Container>
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
              text="Número do Animal"
              color="black"
              fontWeight="300"
            />
            <InputText value={animalSelecionado.nomeAnimal} disabled />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Número da Mãe"
              color="black"
              fontWeight="300"
            />
            <InputText value={maeSelecionado.nomeAnimal || ''} disabled />
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
            <InputText value={paiSelecionado.nomeAnimal || ''} disabled />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Sexo do Animal"
              color="black"
              fontWeight="300"
            />
            <InputText value={animalSelecionado.sexoAnimal} disabled />
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
            <InputText
              disabled
              value={criadorSelecionado?.nomeCompleto || ''}
            />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Fazenda"
              color="black"
              fontWeight="300"
            />
            <InputText value={fazendaSelecionado.nomeFazenda || ''} disabled />
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
            <InputText disabled value={animalSelecionado.registro} />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Pelagem Do Animal"
              color="black"
              fontWeight="300"
            />
            <InputText disabled value={animalSelecionado.pelagemAnimal} />
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
            <InputText disabled value={animalSelecionado.dataAvalicacao} />
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
              text="RGN"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={animalSelecionado.decisaoAnimalTecnicoRGN}
            />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data de  Registro do RGN"
              color="black"
              fontWeight="300"
            />
            <InputText
              value={
                animalSelecionado.dataRGNAnimalTecnico
                  ? format(
                      new Date(animalSelecionado.dataRGNAnimalTecnico),
                      'dd/MM/yyyy',
                    )
                  : ''
              }
              disabled
            />
          </InputPlace>
        </InputPair>

        <InputPair style={{ width: '90%' }}>
          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="RGD"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={animalSelecionado.decisaoAnimalTecnicoRGD}
            />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data de  Registro do RGD"
              color="black"
              fontWeight="300"
            />
            <InputText
              value={
                animalSelecionado.dataRGDAnimalTecnico
                  ? format(
                      new Date(animalSelecionado.dataRGDAnimalTecnico),
                      'dd/MM/yyyy',
                    )
                  : ''
              }
              disabled
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
          <InputText />
        </InputPlace>

        <div style={{ marginTop: '2vw' }}>
          <Text
            text="Decisão do Superintendente"
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
              text="RGN"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={animalSelecionado.decisaoAnimalSuperRGN}
            />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data de Registro do RGN"
              color="black"
              fontWeight="300"
            />
            <InputText
              value={
                animalSelecionado.dataRGNAnimalSuper
                  ? format(
                      new Date(animalSelecionado.dataRGNAnimalSuper),
                      'dd/MM/yyyy',
                    )
                  : ''
              }
              disabled
            />
          </InputPlace>
        </InputPair>

        <InputPair style={{ width: '90%' }}>
          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="RGD"
              color="black"
              fontWeight="300"
            />
            <InputText
              disabled
              value={animalSelecionado.decisaoAnimalSuperRGD}
            />
          </InputPlace>

          <InputPlace style={{ width: '47%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Data de Registro do RGD"
              color="black"
              fontWeight="300"
            />
            <InputText
              value={
                animalSelecionado.dataRGDAnimalSuper
                  ? format(
                      new Date(animalSelecionado.dataRGDAnimalSuper),
                      'dd/MM/yyyy',
                    )
                  : ''
              }
              disabled
            />
          </InputPlace>
        </InputPair>

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
            height: '20vw',
          }}
        >
          <div style={{ overflowY: 'scroll', width: '50%' }}>
            <Tree
              label={
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Text
                    text={animalSelecionado.nomeAnimal}
                    fontFamily="rob"
                    fontWeight="600"
                    size="1.6vw"
                    color="black"
                  />
                </div>
              }
            >
              {animaisCriador ? (
                <ArvoreGenealogica
                  animais={animaisCriador}
                  animalSelecionado={animalSelecionado}
                />
              ) : null}
            </Tree>
          </div>
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
          <div style={{ width: '34vw' }}>
            <img
              alt="animal"
              style={{ width: '100%', height: 'auto' }}
              src={animalSelecionado.image01}
            />
          </div>
          <div style={{ width: '34vw' }}>
            <img
              alt="animal"
              style={{ width: '100%', height: 'auto' }}
              src={animalSelecionado.image02}
            />
          </div>
        </InputPair>

        <InputPair>
          <div style={{ width: '34vw' }}>
            <img
              alt="animal"
              style={{ width: '100%', height: 'auto' }}
              src={animalSelecionado.image03}
            />
          </div>
          <div style={{ width: '34vw', marginLeft: '1vw' }}>
            <img
              alt="animal"
              style={{ width: '100%', height: 'auto' }}
              src={animalSelecionado.image04}
            />
          </div>
        </InputPair>
        <div style={{ width: '100%', justifyContent: 'end', display: 'flex' }}>
          {registro ? (
            <div
              style={{
                display: 'flex',
                marginTop: '1vw',
                justifyContent: 'space-between',
                width: '55%',
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
              {loading ? (
                <CircularProgress size={'2vw'} />
              ) : (
                <>
                  <Button
                    colorButton="#BC433B"
                    heightButton="2vw"
                    textButton="Reprovar"
                    widthButton="8vw"
                    textColor="white"
                    onClick={() => {
                      updateAnimalRGD('Reprovado')
                    }}
                  />
                  <Button
                    colorButton="green"
                    heightButton="2vw"
                    textButton="Aprovar"
                    widthButton="7vw"
                    textColor="white"
                    onClick={() => {
                      updateAnimalRGD('Aprovado')
                    }}
                  />
                  <Button
                    colorButton="green"
                    heightButton="2vw"
                    textButton="Certificado do animal"
                    widthButton="15vw"
                    textColor="white"
                    onClick={() => {
                      window.setTimeout(function () {
                        window.print()
                      }, 400)
                    }}
                  />
                </>
              )}
            </div>
          ) : (
            <Button
              colorButton="green"
              heightButton="2vw"
              textButton="Certificado do animal"
              widthButton="15vw"
              textColor="white"
              onClick={() => {
                setCertificado(() => ({
                  visible: true,
                }))
                window.setTimeout(function () {
                  window.print()
                  window.setTimeout(function () {
                    setCertificado(() => ({
                      visible: false,
                    }))
                  }, 900)
                }, 400)
              }}
            />
          )}
        </div>
      </Container>
    </>
  )
}
