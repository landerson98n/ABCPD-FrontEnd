'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled(motion.form)`
  width: 100%;
  height: 100%;
  background-color: white;
  margin-top: 2vw;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Select = styled.select`
  width: 100%;
  height: 4vw;
  background-color: white;
  border-radius: 0.5vw;
  border: solid 1px #9e4b00;
  font-size: 1.7vw;
  padding-left: 1vw;
  overflow-y: scroll;
`

export const InputText = styled.input`
  width: 100%;
  height: 4vw;
  background-color: white;
  border: solid 1px #9e4b00;
  font-size: 1.7vw;
  padding-left: 1vw;
  outline: none;
  display: flex;
`
