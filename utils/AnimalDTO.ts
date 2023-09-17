type AnimalDTO = {
  id: string
  criadorAnimal: string
  fazenda: string
  mae?: string | null
  pai?: string | null
  rebanho: string
  dataAvalicacao: string
  composicaoGenetica: string
  dataRGDAnimalSuper: string
  dataRGDAnimalTecnico: string
  dataRGNAnimalSuper: string
  dataRGNAnimalTecnico: string
  dataNascimentoAnimal: string
  decisaoAnimalSuperRGD: string
  decisaoAnimalSuperRGN: string
  decisaoAnimalTecnicoRGD: string
  decisaoAnimalTecnicoRGN: string
  image01: string
  image02: string
  image03: string
  image04: string
  nomeAnimal: string
  observacaoSuper: string
  observacaoTecnico: string
  pelagemAnimal: string
  racaAnimalMatriz: string
  registradoRGDSuper: boolean
  registradoRGDTecnico: boolean
  registradoRGNSuper: boolean
  registradoRGNTecnico: boolean
  registro: string
  registroGeral: string
  sexoAnimal: string
  flag: number
}

export default AnimalDTO
