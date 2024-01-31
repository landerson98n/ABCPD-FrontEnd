import { Text } from '@/components/Text';
import Image from 'next/image';
import React, { useState } from 'react';
import { Content, Table, TableContent, TableHeader } from '@/components/styles/stylesTecnico';
import { Button } from '@/components/Button';
import {done, logo2Branca, searchIcon, waiting } from '@/assets';
import CriadorDTO from '@/utils/CriadorDTO';
import RebanhoDTO from '@/utils/RebanhoDTO';
import { SolicitacaoRegistroAnimalBaseDTO } from '@/utils/SolicitacaoDTO';
import { updateAnimaisPA } from '@/actions/animalBaseApi';

interface RegistroAnimalDTO {
    solicitacoesAnimaisBase: SolicitacaoRegistroAnimalBaseDTO[]
    todosRebanhos: RebanhoDTO[]
    token: string
    CriadoresData: CriadorDTO[]
    onPageChange: (page: any) => void;
    onCriadorChange: (property: string, data:any) => void;
    onAnimalChange: (property: string, data:any) => void;
}

export function RegistroAnimal(data: RegistroAnimalDTO) {
  const {onPageChange, todosRebanhos, CriadoresData, onCriadorChange, onAnimalChange, solicitacoesAnimaisBase} = data;

  async function updateSolicitacaoPa (solicitacao: SolicitacaoRegistroAnimalBaseDTO){
    const solData: SolicitacaoRegistroAnimalBaseDTO = {
      ...solicitacao,
      estadoSolicitacao: 'Finalizado'
    };
    const response = await updateAnimaisPA(solData, data.token, solicitacao.id );
 
    
    if(!response.message){
      solicitacoesAnimaisBase.pop(solicitacao);
    }
  }
  return(
    <Content>
      <div style={{ width: '10vw' }}>
        <Image
          src={logo2Branca}
          alt="logoAnimal"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <Text
        text="Solicitação de Registro de Animais Puros por Adjudicação | ABCPD"
        fontFamily="pop"
        fontWeight="700"
        size="2vw"
        color="black"
      />

      <Table>
        <TableHeader>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Série alfabética"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Criador"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Estado da solicitação"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Ação"
              color="black"
              fontWeight="400"
            />
          </th>
        </TableHeader>
        {solicitacoesAnimaisBase ? solicitacoesAnimaisBase.map((index: SolicitacaoRegistroAnimalBaseDTO)=>{
          return (<TableContent key={index.criadorId}>
            <td style={{ width: '20%' }}>
              <Text
                textAlign="center"
                fontFamily="rob"
                size={'1vw'}
                text={ todosRebanhos ? (todosRebanhos.find((reb:RebanhoDTO) => {
                  return reb.id == index.rebanhoId;
                }) || {}).serie : ''}
                color="black"
                fontWeight="400"
              />
            </td>
            <td>
              <Text
                textAlign="center"
                fontFamily="rob"
                size={'1vw'}
                text={CriadoresData ? (CriadoresData?.find((cr: CriadorDTO)=>{
                  return cr.id == index.criadorId;
                }) || {}).nomeCompleto : null}
                color="black"
                fontWeight="400"
              />
            </td>
            <td style={{ width: '25%' }}>
              <Text
                widthImage="1.5vw"
                src={index.estadoSolicitacao == 'Em análise'? waiting : done}
                textAlign="center"
                fontFamily="rob"
                size={'1vw'}
                text={index.estadoSolicitacao}
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
                  height: '100%'
                }}
              >
                <Button
                  marginTopImage="0.3vw"
                  textButton="Marcar Como Finalizado"
                  radius="2vw"
                  marginLeftImage="0vw"
                  marginRightImage="0vw"
                  colorButton="#0B7AB8"
                  heightButton="3vw"
                  widthButton="16vw"
                  textColor="white"
                  onClick={()=>{
                    updateSolicitacaoPa(index);
                  }}
                />
                <div style={{marginLeft:'1vw'}}>
                  <Button
                    marginTopImage="0.3vw"
                    src={searchIcon}
                    radius="2vw"
                    marginLeftImage="0vw"
                    marginRightImage="0vw"
                    colorButton="#0B7AB8"
                    heightButton="3vw"
                    widthButton="3vw"
                    textColor="white"
                    onClick={() => {
                      onPageChange('verAnimalPage');
                      onAnimalChange('solicitacoesAnimaisBaseSelecionada', index);
                      onCriadorChange('criadorId', index.criadorId);
                      setTypeCadastro('animalBase');
                    }}
                  />
                </div>
                  
              </div>
            </td>
          </TableContent>);
        }) : null}
                          
      </Table>

      <div style={{ display: 'flex', marginTop: '1vw' }}>
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
