import Image from 'next/legacy/image'
import { Container, Border } from './style'
import { logo, logo2, logoCert } from '@/assets'
import { InputPair, InputPlace } from '../Register/style'
import { Text } from '../Text'
import { InputText } from '../InputText'
import { Tree, TreeNode } from 'react-organizational-chart'
import AnimalDTO from '@/utils/AnimalDTO'
import format from 'date-fns/format'
import { Button } from '../Button'
import { getAnimalById } from '@/actions/animaisApi'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/context/AlertContextProvider'

interface CertificadoProps {
  animal: AnimalDTO
  fazendaName: string
  criadorName: string
  animaisCriador: AnimalDTO[]
}
export function VerificarCertificado() {
  const [animalData, setAnimalData] = useState({
    animal: {},
    fazendaName: '',
    criadorName: '',
  })
  const { animal, fazendaName, criadorName } = animalData
  const [id, setId] = useState('')
  const { alert } = useContext(AlertContext)
  return (
    <Container>
      <div
        style={{
          width: '100%',
          justifyContent: 'start',
          marginTop: '5vw',
          marginLeft: '25vw',
          marginBottom: '5vw',
        }}
      >
        <Button
          widthButton="10%"
          heightButton="3vw"
          colorButton="black"
          textButton="←  Voltar"
          onClick={() => {
            window.location.assign('/')
          }}
        />
      </div>

      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'space-between',
          height: '13vw',
        }}
      >
        <InputPair style={{ width: '100%' }}>
          <InputPlace style={{ width: '100%' }}>
            <Text
              fontFamily="pop"
              size={'1.5vw'}
              text="Código de verificação"
              color="black"
              fontWeight="300"
            />
            <InputText
              width="98.8%"
              fontSize="1.1vw"
              onChange={(e) => {
                setId(e.target.value)
              }}
            />
          </InputPlace>
        </InputPair>
        <Button
          widthButton="20%"
          heightButton="3vw"
          colorButton="#9E4B00"
          textButton="Verificar"
          onClick={async () => {
            const data: AnimalDTO = await getAnimalById(id)
            console.log(data)

            if (data.statusCode === 400) {
              alert('Código inválido')
            } else {
              setAnimalData((prev) => ({
                ...prev,
                animal: data,
                criadorName: data.criador?.nomeCompleto,
                fazendaName: data.fazendaAnimal?.nomeFazenda,
              }))
            }
          }}
        />
      </div>
      {Object.values(animal).length === 0 ? null : (
        <Border>
          <div style={{ width: '100%', display: 'flex' }}>
            <Text
              text="Certificado de Registro Genealógico"
              fontFamily="pop"
              color="black"
              fontWeight="400"
              size="2vw"
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <InputPair style={{ width: '47%' }}>
              <InputPlace style={{ width: '20%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Número"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.1vw"
                  disabled
                  value={'' || animal?.nomeAnimal}
                />
              </InputPlace>

              <InputPlace style={{ width: '74%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Criador"
                  color="black"
                  fontWeight="300"
                />
                <InputText fontSize="1.1vw" value={criadorName} disabled />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '47%' }}>
              <InputPlace style={{ width: '64%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Fazenda"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.1vw"
                  value={'' || fazendaName}
                  disabled
                />
              </InputPlace>
            </InputPair>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <InputPair style={{ width: '47%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Sexo"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.1vw"
                  disabled
                  value={'' || animal?.sexoAnimal}
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Pelagem"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.1vw"
                  value={'' || animal?.pelagemAnimal}
                  disabled
                />
              </InputPlace>
            </InputPair>

            <InputPair style={{ width: '47%' }}>
              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Registro"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.1vw"
                  disabled
                  value={'' || animal?.registro}
                />
              </InputPlace>

              <InputPlace style={{ width: '47%' }}>
                <Text
                  fontFamily="pop"
                  size={'1.5vw'}
                  text="Data de nascimento"
                  color="black"
                  fontWeight="300"
                />
                <InputText
                  fontSize="1.1vw"
                  value={'' || animal?.dataNascimentoAnimal}
                  disabled
                />
              </InputPlace>
            </InputPair>
          </div>

          <div
            style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
          >
            <div
              style={{
                width: '60%',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1vw',
                alignItems: 'center',
                marginBottom: '2vw',
              }}
            >
              <div style={{ width: '15vw' }}>
                <Image
                  src={logo}
                  style={{ width: '10vw', height: '10vw' }}
                  alt="logo"
                />
              </div>

              <div style={{ width: '40%', rotate: '270deg', marginTop: '3vw' }}>
                <Tree
                  label={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        rotate: '90deg',
                      }}
                    >
                      <Text
                        text={animal?.nomeAnimal}
                        fontFamily="rob"
                        fontWeight="600"
                        size="1.6vw"
                        color="black"
                      />
                    </div>
                  }
                >
                  <TreeNode
                    label={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          rotate: '90deg',
                        }}
                      >
                        <Text
                          text={animal.maeAnimal?.nomeAnimal || ''}
                          fontFamily="rob"
                          fontWeight="600"
                          size="1.6vw"
                          color="black"
                        />
                      </div>
                    }
                  >
                    <TreeNode
                      label={
                        <div
                          style={{
                            rotate: '90deg',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            text={animal.maeAnimal?.maeAnimal?.nomeAnimal}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                          />
                        </div>
                      }
                    ></TreeNode>

                    <TreeNode
                      label={
                        <div
                          style={{
                            rotate: '90deg',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            text={animal.maeAnimal?.paiAnimal?.nomeAnimal}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                          />
                        </div>
                      }
                    ></TreeNode>
                  </TreeNode>

                  <TreeNode
                    label={
                      <div
                        style={{
                          rotate: '90deg',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          text={animal.paiAnimal?.nomeAnimal || ''}
                          fontFamily="rob"
                          fontWeight="600"
                          size="1.6vw"
                          color="black"
                        />
                      </div>
                    }
                  >
                    <TreeNode
                      label={
                        <div
                          style={{
                            rotate: '90deg',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            text={animal.paiAnimal?.maeAnimal?.nomeAnimal || ''}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                          />
                        </div>
                      }
                    ></TreeNode>

                    <TreeNode
                      label={
                        <div
                          style={{
                            rotate: '90deg',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            text={animal.paiAnimal?.paiAnimal?.nomeAnimal || ''}
                            fontFamily="rob"
                            fontWeight="600"
                            size="1.6vw"
                            color="black"
                          />
                        </div>
                      }
                    ></TreeNode>
                  </TreeNode>
                </Tree>
              </div>
            </div>
          </div>

          <InputPair style={{ width: '80%' }}>
            <InputPlace style={{ width: '30%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Data de emissão"
                color="black"
                fontWeight="300"
              />
              <InputText
                fontSize="1.1vw"
                disabled
                value={format(Date.now(), 'dd/MM/yyyy')}
              />
            </InputPlace>

            <InputPlace style={{ width: '64%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Código de verficação"
                color="black"
                fontWeight="300"
              />
              <InputText
                width="30vw"
                fontSize="1.1vw"
                value={animal?.id}
                disabled
              />
            </InputPlace>
          </InputPair>
        </Border>
      )}
    </Container>
  )
}
