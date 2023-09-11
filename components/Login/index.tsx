import React, { useContext } from 'react'
import Image from 'next/legacy/image'

import { logo, logo2 } from '@/assets'
import { Container, InputText } from './style'
import { Button } from '../Button'
import { Poppins } from 'next/font/google'
import { LoginAPI } from '@/actions/loginApi'
import { useForm } from 'react-hook-form'
import { AlertContext } from '@/context/AlertContextProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import errorMap from 'zod/locales/en.js'

const poppins = Poppins({ weight: ['300'], subsets: ['latin'] })

export default function Login() {
  const initialValues = {
    email: '',
    senha: '',
  }

  const [formValues, setFormValues] = React.useState(initialValues)
  const { alert } = useContext(AlertContext)
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const schema = z.object({
    email: z
      .string({
        errorMap: () => {
          return {
            message: 'Email inválido',
          }
        },
      })
      .email()
      .nonempty('Email não preenchido'),
    senha: z.string().nonempty('Senha não preenchida'),
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

  const Enviar = async (dataForm: any) => {
    setFormValues({ ...formValues, ...dataForm })
    const data = {
      email: formValues.email,
      senha: formValues.senha,
    }

    try {
      const response = await LoginAPI(data)
      const token = response.acessToken
      const pessoa = response.pessoa

      if (pessoa === 'Criador') {
        window.location.assign(`/CriadorPage/${token}`)
      }

      if (pessoa === 'Tecnico') {
        window.location.assign(`/TecnicoPage/${token}`)
      }

      if (pessoa === 'Superintendente') {
        window.location.assign(`/SuperintendentePage/${token}`)
      }
    } catch (e) {
      alert(e)
    }
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
        onSubmit={handleSubmit(Enviar)}
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
          {...register('email', { required: true })}
          placeholder="E-mail"
          value={formValues.email}
          onChange={handleInputChange}
          name="email"
          type="email"
        />
        <InputText
          placeholder="Senha"
          {...register('senha', { required: true })}
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
          onClick={() => {
            for (const componente in errors) {
              const mensagem = errors[componente]
              alert(mensagem?.message)
            }
            console.log(errors)
          }}
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
