import Image from 'next/legacy/image'
import { Container, Border } from './style'
import { logo } from '@/assets'
import { InputPair, InputPlace } from '../Register/style'
import { Text } from '../Text'
import { InputText } from '../InputText'
import { Tree, TreeNode } from 'react-organizational-chart'
import AnimalDTO from '@/utils/AnimalDTO'
import format from 'date-fns/format'

interface CertificadoProps {
  animal: AnimalDTO
  fazendaName: string
  criadorName: string
}
export function Certificado(props: CertificadoProps) {
  const { animal, fazendaName, criadorName } = props

  return (
    <Container>
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
            <InputPlace style={{ width: '31%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Série alfabética"
                color="black"
                fontWeight="300"
              />
              <InputText fontSize="1.1vw" disabled value="" />
            </InputPlace>

            <InputPlace style={{ width: '64%' }}>
              <Text
                fontFamily="pop"
                size={'1.5vw'}
                text="Fazenda"
                color="black"
                fontWeight="300"
              />
              <InputText fontSize="1.1vw" value={'' || fazendaName} disabled />
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
                style={{ width: '3vw', height: '3vw' }}
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
                      rotate: '270deg',
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
                        text={'text'}
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
                          text={'text'}
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
                          text={'text'}
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
                        text={'text'}
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
                          text={'text'}
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
                          text={'text'}
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
    </Container>
  )
}
