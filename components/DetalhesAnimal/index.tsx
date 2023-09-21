import Image from 'next/image'
import { InputPlace, InputPair, InputText } from './style'
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
  animaisCriador: AnimalDTO[]
}

export function DetalhesAnimal(props: DetalheAnimal) {
  const { alert } = useContext(AlertContext)
  const { animalInfos, registro, token, animaisCriador } = props
  const {
    criadorSelecionado,
    fazendaSelecionado,
    maeSelecionado,
    paiSelecionado,
    animalSelecionado,
  } = animalInfos

  const [loading, setLoading] = useState(false)

  async function updateAnimalRGD(decisao: string) {
    setLoading(true)
    const updateAnimalData: AnimalDTO = {
      ...animalSelecionado,
      decisaoAnimalTecnicoRGD: decisao,
      registradoRGDTecnico: true,
    }

    const animal = await updateAnimal(
      updateAnimalData,
      token,
      animalSelecionado.id,
    )

    if (!animal.messages) {
      alert('O RGD do animal foi aprovado', 'success')
    }
    setLoading(false)
  }

  return (
    <>
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
          <InputText value={animalSelecionado.nomeAnimal} disabled />
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Nome da Mãe"
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
            text="Nome do Pai"
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
          <InputText disabled value={criadorSelecionado?.nomeCompleto || ''} />
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
            text="RNG"
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
            text="Data de  Registro do RNG"
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
          height: '40vw',
        }}
      >
        <div style={{ overflowY: 'scroll' }}>
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
      {registro ? (
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
          {loading ? (
            <CircularProgress size={'2vw'} />
          ) : (
            <>
              <Button
                colorButton="#BC433B"
                heightButton="2vw"
                textButton="Desclassificar"
                widthButton="8vw"
                textColor="white"
              />
              <Button
                colorButton="green"
                heightButton="2vw"
                textButton="Aprovar"
                widthButton="7vw"
                textColor="white"
                onClick={() => {
                  updateAnimalRGD('Registrado')
                }}
              />
            </>
          )}
        </div>
      ) : null}
    </>
  )
}
