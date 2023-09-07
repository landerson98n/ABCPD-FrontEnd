import React from 'react'
import Image from 'next/image'

import { logo, logo2 } from '@/assets'
import { Container } from './style'
import { Button } from '../Button'
import { Poppins } from 'next/font/google'
import { InputText } from '../InputText'

const poppins = Poppins({ weight: ['300'], subsets: ['latin'] })

export function Login() {
  const initialValues = {
    email: '',
    senha: '',
  }

  const [formValues, setFormValues] = React.useState(initialValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Aqui você pode acessar os valores de formValues.email e formValues.senha
    console.log('Email:', formValues.email)
    console.log('Senha:', formValues.senha)
  }

  return (
    <Container>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '4vw', height: '3vw' }}>
          <Image
            src={logo}
            alt="Logo"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>

        <div style={{ width: '12vw', height: '6vw' }}>
          <Image
            src={logo2}
            alt="Logo"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
      </div>

      <form
        style={{
          marginTop: '2vw',
          height: '20vw',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <InputText
          placeholder="E-mail"
          value={formValues.email}
          onChange={handleInputChange}
          name="email"
        />
        <InputText
          placeholder="Senha"
          value={formValues.senha}
          onChange={handleInputChange}
          name="senha"
          type="password"
        />
        <a
          href="#"
          style={{
            marginTop: '-2vw',
            fontSize: '1.1vw',
            width: '100%',
            justifyContent: 'end',
            display: 'flex',
          }}
          className={poppins.className}
        >
          Esqueceu a senha?
        </a>
        <Button
          type="submit"
          widthButton="20vw"
          heightButton="3.3vw"
          colorButton="green"
          textButton="Entrar"
        />
      </form>
    </Container>
  )
}
