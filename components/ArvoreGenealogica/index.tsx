import AnimalDTO from '@/utils/AnimalDTO'
import { Tree, TreeNode } from 'react-organizational-chart'
import { Text } from '../Text'
interface ArvoreGenealogica {
  animais: AnimalDTO[]
  animalSelecionado: AnimalDTO
}

export function ArvoreGenealogica(props: ArvoreGenealogica) {
  const { animais, animalSelecionado } = props

  const pai: AnimalDTO | undefined = animais.find((index: AnimalDTO) => {
    return index.id === animalSelecionado.pai
  })

  const mae: AnimalDTO | undefined = animais.find((index: AnimalDTO) => {
    return index.id === animalSelecionado.mae
  })

  return (
    <>
      {pai ? (
        <TreeNode
          label={
            <Text
              text={pai.nomeAnimal}
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="black"
            />
          }
        >
          {ArvoreGenealogica({ animais, animalSelecionado: pai })}
        </TreeNode>
      ) : null}

      {mae ? (
        <TreeNode
          label={
            <Text
              text={mae.nomeAnimal}
              fontFamily="rob"
              fontWeight="600"
              size="1.6vw"
              color="black"
            />
          }
        >
          {ArvoreGenealogica({ animais, animalSelecionado: mae })}
        </TreeNode>
      ) : null}
    </>
  )
}
