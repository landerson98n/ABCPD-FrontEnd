/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import { CircularProgress } from '@mui/material'
import { Container, InputPair, InputPlace, InputText, SelectBox } from './style'
import { Button } from '../Button'
import Image from 'next/image'
import { Text } from '../Text'
import { logo2Branca } from '@/assets'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import AnimalDTO from '@/utils/AnimalDTO'
import RebanhoDTO from '@/utils/RebanhoDTO'
import { useContext, useEffect, useState } from 'react'
import FazendaDTO from '@/utils/FazendaDTO'
import { CreateAnimal } from '@/actions/animaisApi'
import { AlertContext } from '@/context/AlertContextProvider'

interface CadastrarAnimal {
  animaisCriador: [] | never[]
  fazendas: [] | never[]
  rebanhos: [] | never[]
  solicitacaoBase: {} | never[]
  criadorId: string
  token: string
  typeCadastro: string
}

export function CadastrarAnimal(props: CadastrarAnimal) {
  const {
    animaisCriador,
    fazendas,
    rebanhos,
    criadorId,
    token,
    typeCadastro,
    solicitacaoBase,
  } = props

  const { alert } = useContext(AlertContext)
  const [images, setImages] = useState({
    selectedImage: {} as File | null,
    selectedImage2: {} as File | null,
    selectedImage3: {} as File | null,
    selectedImage4: {} as File | null,
  })

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

  const [loading, setLoading] = useState(false)
  const [isCG, setIsCG] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(animalSchema) })

  const [values, setValues] = useState({
    aparenciaGeral: 0,
    formaCabeca: 0,
    chifresCabeca: 0,
    barbelaPescoco: 0,
    insercaoPescoco: 0,
    membrosAnterioresRacial: 0,
    peso: 0,
    orelhasCabeca: 0,
    formaPescoco: 0,
    morrilhoPescoco: 0,
    membrosAnterioresZoot: 0,
    profundidadeTorax: 0,
    dorsoTorax: 0,
    lomboFlancoTorax: 0,
    traseira: 0,
    testiculoZoot: 0,
    membrosPosteriores: 0,
    umbigo: 0,
    testiculoUbere: 0,
    mucosa: 0,
  })

  const [average, setAverage] = useState(0)

  useEffect(() => {
    const calculateAverage = () => {
      const valueArray = Object.values(values)
      const total = valueArray.reduce((acc, val) => acc + parseFloat(val), 0)
      const avg = total / valueArray.length
      setAverage(avg.toFixed(2))
    }

    calculateAverage()
  }, [values])

  const initialComunicacaoCobertura = {
    aparenciaGeral: 0,
    formaCabeca: 0,
    chifresCabeca: 0,
    barbelaPescoco: 0,
    insercaoPescoco: 0,
    membrosAnterioresRacial: 0,
  }

  const initialComunicacaoCobertura2 = {
    peso: 0,
    orelhasCabeca: 0,
    formaPescoco: 0,
    morrilhoPescoco: 0,
    membrosAnterioresZoot: 0,
  }

  const initialComunicacaoCobertura3 = {
    profundidadeTorax: 0,
    dorsoTorax: 0,
  }

  const initialComunicacaoCobertura4 = {
    lomboFlancoTorax: 0,
  }

  const initialComunicacaoCobertura5 = {
    traseira: 0,
    testiculoZoot: 0,
    membrosPosteriores: 0,
  }

  const initialComunicacaoCobertura6 = {
    umbigo: 0,
    testiculoUbere: 0,
    mucosa: 0,
  }

  const fieldNames = Object.keys(initialComunicacaoCobertura)
  const fieldNames2 = Object.keys(initialComunicacaoCobertura2)
  const fieldNames3 = Object.keys(initialComunicacaoCobertura3)
  const fieldNames4 = Object.keys(initialComunicacaoCobertura4)
  const fieldNames5 = Object.keys(initialComunicacaoCobertura5)
  const fieldNames6 = Object.keys(initialComunicacaoCobertura6)

  const fieldDisplayNames = {
    formaCabeca: 'Forma da Cabeça',
    chifresCabeca: 'Chifres da Cabeça',
    barbelaPescoco: 'Barbela do Pescoço',
    insercaoPescoco: 'Inserção do Pescoço',
    aparenciaGeral: 'Aparência Geral',
    membrosAnterioresRacial: 'Membros Anteriores Racial',
  }

  const fieldDisplayNames2 = {
    peso: 'Peso',
    membrosAnterioresZoot: 'Membros Anteriores Zoo.',
    morrilhoPescoco: 'Morrilho do Pescoço',
    orelhasCabeca: 'Orelhas da Cabeça',
    formaPescoco: 'Forma do Pescoço',
    profundidadeTorax: 'Profundidade do Tórax',
    dorsoTorax: 'Dorso do Tórax',
    lomboFlancoTorax: 'Lombo e Flanco ',
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
      setImages((images) => ({
        ...images,
        selectedImage: file,
      }))
    }
  }

  const handleImageChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setImages((images) => ({
        ...images,
        selectedImage2: file,
      }))
    }
  }

  const handleImageChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setImages((images) => ({
        ...images,
        selectedImage3: file,
      }))
    }
  }

  const handleImageChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      setImages((images) => ({
        ...images,
        selectedImage4: file,
      }))
    }
  }

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  async function send(animalData) {
    const animalPai = animaisCriador.find((index: AnimalDTO) => {
      return index.id === animalData.pai
    })

    const animalMatriz = animaisCriador.find((index: AnimalDTO) => {
      return index.id === animalData.mae
    })

    if (typeCadastro == 'animalBase') {
      animalData.rebanho = solicitacaoBase.rebanhoId
      animalData.fazenda = solicitacaoBase.fazendaId
    }

    if (animalData.registro === '') {
      return alert('Selecione um tipo de registro')
    }

    if (animalData.mae !== '' && animalData.pai === '') {
      return alert('Selecione um animal reprodutor')
    }

    if (animalData.registro === 'Puro Controlado') {
      if (
        animalPai?.registro === 'Puro Controlado' ||
        animalMatriz?.registro === 'Puro Controlado' ||
        animalMatriz?.registro === 'Puro de Origem por Adjudicação' ||
        animalMatriz?.registro ===
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
      return alert('Selecione um rebanho')
    }

    if (animalData.fazenda == '') {
      return alert('Selecione uma fazenda')
    }

    if (
      !images.selectedImage ||
      !images.selectedImage2 ||
      !images.selectedImage3 ||
      !images.selectedImage4
    ) {
      return alert('Selecione 4 imagens para o animal')
    }

    if (
      animalData.pai !== '' &&
      animalData.mae === '' &&
      animalData.registro !==
        'Produtos do Cruzamento Sob Controle de Genealogia'
    ) {
      return alert('Selecione um animal matriz')
    }

    if (animalData.racaAnimalMatriz === '' && isCG) {
      return alert('Selecione uma raça para o animal matriz')
    }

    if (
      animalData.registro ===
      'Produtos do Cruzamento Sob Controle de Genealogia'
    ) {
      animalData.composicaoGenetica = '50'
    } else {
      if (animalData.pai === '' && animalData.mae == '') {
        animalData.composicaoGenetica = '100'
      } else {
        animalData.composicaoGenetica = (
          parseInt(animalMatriz.composicaoGenetica) / 2 +
          parseInt(animalPai.composicaoGenetica) / 2
        ).toString()
      }
    }

    if (
      (animalData.registro === 'Puro de Origem por Adjudicação' &&
        animalData.sexoAnimal === 'Macho') ||
      (animalData.registro ===
        'Produtos do Cruzamento Sob Controle de Genealogia' &&
        animalData.sexoAnimal === 'Macho')
    ) {
      return alert(
        'O tipo de registro selecionado só é permitido para fêmeas (Puro de Origem por Adjudicação e Produtos do Cruzamento Sob Controle de Genealogia)',
      )
    }

    setLoading(true)
    if (animalData.mae == '') {
      animalData.mae = null
    }

    if (animalData.pai == '') {
      animalData.pai = null
    }

    const base64Image01 = await convertToBase64(
      new Blob([images.selectedImage]),
    )
    const base64Image02 = await convertToBase64(
      new Blob([images.selectedImage2]),
    )
    const base64Image03 = await convertToBase64(
      new Blob([images.selectedImage3]),
    )
    const base64Image04 = await convertToBase64(
      new Blob([images.selectedImage4]),
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
    const response = await CreateAnimal(animal, token)
    if (!response?.message) {
      alert('Animal criado com sucesso', 'success')
      Object.keys(animalData).forEach((fieldName) => {
        setValue(fieldName, '')
      })
      setLoading(false)
    }
  }

  return (
    <Container onSubmit={handleSubmit(send)}>
      <div style={{ width: '10vw' }}>
        <Image
          src={logo2Branca}
          alt="logoAnimal"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <Text
        text="Formulário de Avaliação Técnica | ABCPD"
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
            text={'Número do Animal'}
            color="black"
            fontWeight="300"
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {typeCadastro == 'animalBase' ? (
              <label>
                {rebanhos
                  ? (
                      rebanhos.find((reb: RebanhoDTO) => {
                        return reb.id == solicitacaoBase.rebanhoId
                      }) || {}
                    ).serie
                  : null}
              </label>
            ) : null}

            <InputText
              style={{ width: '80%' }}
              {...register('nomeAnimal', { required: true })}
              type="number"
            />
          </div>
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
            <option disabled={!!isCG}>Puro de Origem por Adjudicação</option>
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
            text="Data Da Avaliação"
            color="black"
            fontWeight="300"
          />
          <InputText
            {...register('dataAvalicacao', { required: true })}
            type="date"
          />
        </InputPlace>
      </InputPair>

      <InputPair style={{ width: '90%' }}>
        {typeCadastro == 'animalBase' ? null : (
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
        )}

        {typeCadastro == 'animalBase' ? null : (
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
        )}
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

      <div>
        <Text
          fontFamily="pop"
          size={'1.5vw'}
          text="1 - APRECIAÇÃO GERAL "
          color="black"
          fontWeight="300"
        />
      </div>
      <InputPair style={{ width: '90%', display: 'flex', alignItems: 'start' }}>
        <InputPlace style={{ width: '47%' }}>
          {fieldNames.map((fieldName) => (
            <div
              key={fieldName}
              style={{
                width: '100%',
              }}
            >
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
                    min: 0,
                    max: 10,
                  })}
                  step="1"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }}
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
                    min: 0,
                    max: 10,
                  })}
                  step="1"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }}
                />
              </InputPlace>
            </div>
          ))}
        </InputPlace>
      </InputPair>

      <div>
        <Text
          fontFamily="pop"
          size={'1.5vw'}
          text="3 - APRECIAÇÃO PARCIAL - TÓRAX 
          "
          color="black"
          fontWeight="300"
        />
      </div>
      <InputPair style={{ width: '90%', display: 'flex', alignItems: 'start' }}>
        <InputPlace style={{ width: '47%' }}>
          {fieldNames3.map((fieldName) => (
            <div
              key={fieldName}
              style={{
                width: '100%',
              }}
            >
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
                    min: 0,
                    max: 10,
                  })}
                  step="1"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }}
                />
              </InputPlace>
            </div>
          ))}
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          {fieldNames4.map((fieldName) => (
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
                    min: 0,
                    max: 10,
                  })}
                  step="1"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }}
                />
              </InputPlace>
            </div>
          ))}
        </InputPlace>
      </InputPair>

      <div>
        <Text
          fontFamily="pop"
          size={'1.5vw'}
          text="4 - APRECIAÇÃO PARCIAL - QUARTOS TRAZEIROS 
          "
          color="black"
          fontWeight="300"
        />
      </div>

      <InputPair style={{ width: '90%', display: 'flex', alignItems: 'start' }}>
        <InputPlace style={{ width: '47%' }}>
          {fieldNames5.map((fieldName) => (
            <div
              key={fieldName}
              style={{
                width: '100%',
              }}
            >
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
                    min: 0,
                    max: 10,
                  })}
                  step="1"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }}
                />
              </InputPlace>
            </div>
          ))}
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          {fieldNames6.map((fieldName) => (
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
                    min: 0,
                    max: 10,
                  })}
                  step="1"
                  type="number"
                  onChange={(e) => {
                    setValues((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }}
                />
              </InputPlace>
            </div>
          ))}
        </InputPlace>
      </InputPair>
      <div>
        <Text
          fontFamily="pop"
          size={'1.5vw'}
          text="Média"
          color="black"
          fontWeight="300"
        />
      </div>

      <div style={{ width: '100%', justifyContent: 'center' }}>
        <Text
          fontFamily="pop"
          size={'3.5vw'}
          text={`${average || 0}`}
          color="black"
          fontWeight="300"
          textAlign="center"
        />
      </div>

      <InputPair style={{ width: '90%' }}>
        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Imagem Frente"
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
            text="Imagem Esquerda"
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
            text="Imagem Direita"
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
            text="Imagem Traseira"
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

      <InputPlace style={{ width: '47%' }}>
        <Text
          fontFamily="pop"
          size={'1.5vw'}
          text="Parecer Técnico"
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
            text="Raça do animal matriz"
            color="black"
            fontWeight="300"
          />
          <SelectBox {...register('racaAnimalMatriz', { required: true })}>
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
              textButton="Salvar"
              widthButton="18vw"
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
      </div>
    </Container>
  )
}
