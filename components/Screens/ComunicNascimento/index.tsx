import { InputText } from '@/components/InputText';
import { Text } from '@/components/Text';
import Image from 'next/image';
import React from 'react';
import { Content, Table, TableContent, TableHeader } from '@/components/styles/stylesTecnico';
import { Button } from '@/components/Button';
import { add, logo2Branca } from '@/assets';
import { ComunicacaoNascimentoDto } from '@/utils/ComunicacaoNascimentoDTO';
import AnimalDTO from '@/utils/AnimalDTO';
import { format } from 'date-fns';

interface ComunicNascimentoDTO {
    todosAnimais: AnimalDTO[]
    token: string
    nascimentos: any[]
    onPageChange: (page: any) => void;
}

export function ComunicNascimento(data: ComunicNascimentoDTO) {
  const {onPageChange, nascimentos, todosAnimais} = data;

  return(
    <Content>
      <div style={{ width: '4vw' }}>
        <Image
          src={logo2Branca}
          alt="Logo"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <Text
        fontFamily="pop"
        size={'1.5vw'}
        text="Todas Comunicações de Nascimento do Criador | ABCPD"
        color="black"
        fontWeight="600"
      />

      <div style={{ width: '30%' }}>
        <InputText
          fontSize="1.2vw"
          placeholder="Buscar"
          height="3vw"
          border="solid 1px rgba(103, 97, 97, 0.5)"
          borderRight="solid 1px rgba(103, 97, 97, 0.5)"
          borderLeft="solid 1px rgba(103, 97, 97, 0.5)"
          borderTop="solid 1px rgba(103, 97, 97, 0.5)"
          borderColor="rgba(103, 97, 97, 0.5)"
        />
      </div>

      <Table>
        <TableHeader>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Data da Comunicação"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Matriz"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Bezerro"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Opções"
              color="black"
              fontWeight="400"
            />
          </th>
        </TableHeader>
        {nascimentos
          ? nascimentos.map((index: ComunicacaoNascimentoDto) => {
            return (
              <TableContent key={index.id}>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={format(new Date(index.dataComunicacao), 'dd/ MM/ yyyy')}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={(todosAnimais.find((indexAnimal)=>{
                      return index.matrizAnimalId == indexAnimal.id;
                    })|| {}).nomeAnimal || ''}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={index.animalBezerro}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      onClick={() => {
                        onPageChange('verComunicNascPage');
                      }}
                      marginTopImage="0.6vw"
                      radius="2.5vw"
                      marginLeftImage="0vw"
                      marginRightImage="0vw"
                      src={add}
                      colorButton="white"
                      heightButton="2.8vw"
                      widthImage="100%"
                      widthButton="3vw"
                      textColor="white"
                    />
                  </div>
                </td>
              </TableContent>
            );
          })
          : null}
      </Table>

      <div style={{ marginTop: '1vw' }}>
        <Button
          colorButton="black"
          heightButton="2vw"
          textButton="← Voltar"
          widthButton="7vw"
          textColor="white"
        />
      </div>
    </Content>
  );
}
