import {
  Payment,
  RegisterPainel,
  Content,
  Title,
  TitleContent,
  CreditCard,
  InputPair,
  Input,
  InputPlace,
} from './style'
import { WhiteBackground } from '../WhiteBackground'
import { Button } from '../Button'
import { Text } from '../Text'
import Image from 'next/image'
import { useState } from 'react'
import { boleto, card, cartao, logo, logo2, pix } from '@/assets'
import { motion } from 'framer-motion'
import { PaymentAPI } from '@/actions/paymentApi'

export default function PaymentComponent() {
  const [pixPay, setPix] = useState(false)
  const [boletoPay, setBoleto] = useState(false)
  const [creditPay, setCredit] = useState(false)
  const [imagePix, setImagePix] = useState()
  const [boletoURL, setBoletoURL] = useState('')
  async function getPixImage() {
    const response = await PaymentAPI(
      {
        billingType: 'PIX',
        value: '10',
      },
      '75e513d7-73a5-469a-9b97-3d07c5141227',
    )
    if (response.encodedImage) {
      setImagePix(`data:image/png;base64, ${response.encodedImage}`)
    }
  }

  async function getBoleto() {
    const response = await PaymentAPI(
      {
        billingType: 'BOLETO',
        value: '10',
      },
      '75e513d7-73a5-469a-9b97-3d07c5141227',
    )

    if (response.invoiceUrl && boletoURL == '') {
      setBoletoURL(response.invoiceUrl)
    }
  }

  return (
    <Payment>
      <RegisterPainel>
        <WhiteBackground width="80%" height="100vw">
          <Content style={{ height: '100%' }}>
            <Button
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

                      <TitleContent style={{ width: '40%', marginLeft: '8vw' }}>
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
                    getBoleto()
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
  )
}
