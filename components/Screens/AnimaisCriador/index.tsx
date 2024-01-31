import { InputText } from '@/components/InputText';
import { Text } from '@/components/Text';
import Image from 'next/image';
import React, { useState } from 'react';
import { Content, Table, TableContent, TableHeader } from '@/components/styles/stylesTecnico';
import { Button } from '@/components/Button';
import {logo2Branca, searchIcon } from '@/assets';
import { CircularProgress } from '@mui/material';
import AnimalDTO from '@/utils/AnimalDTO';
import { getRebanhoByFazendaId } from '@/actions/RebanhApi';
import { getFazendaById, getFazendaCriador } from '@/actions/fazendaApi';
import { getCriadorById } from '@/actions/criadorApi';
import FazendaDTO from '@/utils/FazendaDTO';
import CriadorDTO from '@/utils/CriadorDTO';

interface CriadoresABCPDDTO {
    animaisCriador: AnimalDTO[]
    token: string
    onPageChange: (page: any) => void;
    onCriadorChange: (property: string, data:any) => void;
    onAnimalChange: (property: string, data:any) => void;
}

export function AnimaisCriador(data: CriadoresABCPDDTO) {
  const {onPageChange, animaisCriador, onCriadorChange, onAnimalChange} = data;
  const [loading, setLoading] = useState(false);


  async function getFazendas() {
    setLoading(true);

    const response = await getFazendaCriador(data.token, criadorId);
    if (response) {
      const rebanho = await getRebanhoByFazendaId(response[0].id, data.token);

      onCriadorChange('fazendasCriador', response);
      onCriadorChange('rebanhosCriador', rebanho);
      setTypeCadastro('');
      onPageChange('verAnimalPage');
    }
    setLoading(false);
  }
  
  async function getInformacoesAnimal(animal: AnimalDTO) {
    setLoading(true);
    
    const fazenda: FazendaDTO = await getFazendaById(data.token, animal.fazenda);
    const criador: CriadorDTO = await getCriadorById(
      animal.criadorAnimal,
      data.token,
    );
    
    onAnimalChange('fazendaSelecionado', fazenda );
    onAnimalChange('criadorSelecionado', criador );
    onAnimalChange('maeSelecionado', (animaisCriador.find((index: AnimalDTO) => {
      return index.id == animal.mae;
    }) || {} as AnimalDTO) );
    onAnimalChange('paiSelecionado', (animaisCriador.find((index: AnimalDTO) => {
      return index.id == animal.pai;
    })||{} as AnimalDTO) );
    

    setLoading(false);
  } 
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
        text="Todos os Animais do Criador"
        color="black"
        fontWeight="600"
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <InputText
          style={{
            width: '20vw',
            fontSize: '1.2vw',
            placeholder: 'Buscar',
            height: '3vw',
            border: 'solid 1px rgba(103, 97, 97, 0.5)',
            borderTop: 'solid 1px rgba(103, 97, 97, 0.5)',
                  
          }}
        />
        {loading ? <CircularProgress/> : <Button
          marginTopImage="0.3vw"
          radius="0.3vw"
          textButton="+ Registrar Novo Animal"
          colorButton="#E91868"
          heightButton="3vw"
          widthButton="17vw"
          textColor="white"
          onClick={() => {
            getFazendas();
          }}
        />}
              
      </div>

      <Table>
        <TableHeader>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Nome"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Pelagem"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Sexo"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Registro"
              color="black"
              fontWeight="400"
            />
          </th>
        </TableHeader>
        {animaisCriador
          ? animaisCriador.map((dataAnimal: AnimalDTO) => {
            return (
              <TableContent key={dataAnimal.id}>
                <td style={{ width: '20%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={dataAnimal.nomeAnimal}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td style={{ width: '25%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={dataAnimal.pelagemAnimal}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td style={{ width: '25%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={dataAnimal.sexoAnimal}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td style={{ width: '25%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={dataAnimal.registro}
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
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <Button
                      marginTopImage="0.3vw"
                      radius="2vw"
                      marginLeftImage="0vw"
                      marginRightImage="0vw"
                      src={searchIcon}
                      colorButton="#0B7AB8"
                      heightButton="3vw"
                      widthImage="65%"
                      widthButton="3vw"
                      textColor="white"
                      onClick={() => {
                        onAnimalChange('animalSelecionado', dataAnimal);
                        getInformacoesAnimal(dataAnimal);
                        onPageChange('verAnimaRGDPage')
                      }}
                    />
                  </div>
                </td>
              </TableContent>
            );
          })
          : null}
      </Table>
    </Content>
  );
}
