'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import InputMask from 'react-input-mask'

export const Payment = styled(motion.div)`
  width: 100%;
  margin-top: 35vw;
  position: absolute;
`

export const RegisterPainel = styled.div`
  width: 100%;
  height: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`
export const Content = styled.div`
  width: 100%;
`

export const CreditCard = styled.div`
  width: 100%;
  margin-bottom: 1vw;
  display: flex;
`
export const InputPair = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const TitleContent = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.div`
  width: 100%;
  margin-top: 6vw;
`

export const Input = styled(InputMask)`
  width: 100%;
  height: 4vw;
  background-color: white;
  border-radius: 0.5vw;
  font-size: 1.3vw;
  padding-left: 1vw;
  outline: none;
  display: flex;
`
export const InputPlace = styled.div`
  width: 45%;
`
