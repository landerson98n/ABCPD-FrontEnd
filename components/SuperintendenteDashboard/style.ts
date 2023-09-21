'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background-color: white;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
`

export const RegistroAnimalBase = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
  flex-direction: column;
  align-items: start;
`
export const RGDTecnico = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`

export const InputPlace = styled.div`
  width: 90%;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

export const Header = styled.div`
  width: 100%;
  background-color: white;
  height: 7vw;
  box-shadow: 0.1vw 0.1vw 0.5vw #d6d6d6;
  display: flex;
  align-items: center;
  justify-content: end;
`

export const Menu = styled(motion.div)`
  width: 20%;
  height: 100%;
  background-color: #9e4b00;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const TelaAnimaisRGD = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`
export const TelaAnimaisRGN = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`

export const Animals = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`
export const ComunicNascimento = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`

export const TelaFazendasCriador = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`

export const ComunicCobertura = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`

export const UsersPage = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
`

export const VerComunicNascimento = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
  flex-direction: column;
  align-items: start;
  overflow-y: scroll;
`

export const VerComunicCobertura = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
  flex-direction: column;
  align-items: start;
  overflow-y: scroll;
`

export const VerAnimals = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
  flex-direction: column;
  align-items: start;
  overflow-y: scroll;
  overflow-x: hidden;
`
export const UserRegister = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: white;
  margin-top: 2vw;
  flex-direction: column;
  align-items: start;
  overflow-y: scroll;
  overflow-x: hidden;
`

export const InputPair = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const Table = styled.table`
  width: 100%;
  height: 20%;
  text-align: center;
  background-color: white;
  border: solid 1px rgba(103, 97, 97, 0.5);
  margin-top: 2vw;
`

export const TableHeader = styled.tr`
  background-color: #f9f9fb;
  border-bottom: solid 1px rgba(103, 97, 97, 0.5);
`

export const TableContent = styled.tr`
  border-bottom: solid 1px rgba(103, 97, 97, 0.5);
`

export const DropdownMenu = styled(motion.div)`
  width: 100%;
  height: 45%;
  background-color: white;
  border-radius: 0.5vw;
`
