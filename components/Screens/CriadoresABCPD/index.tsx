import { InputText } from '@/components/InputText';
import { Text } from '@/components/Text';
import Image from 'next/image';
import React, { useState } from 'react';
import { Content, Table, TableContent, TableHeader } from '@/components/styles/stylesTecnico';
import { Button } from '@/components/Button';
import {logo2Branca, searchIcon } from '@/assets';
import { CircularProgress } from '@mui/material';
import CriadorDTO from '@/utils/CriadorDTO';
import { getAnimaisByCriadorId } from '@/actions/animaisApi';

interface CriadoresABCPDDTO {
    criadores: CriadorDTO[]
    token: string
    onPageChange: (page: any) => void;
    onCriadorChange: (property: string, data:any) => void;
}

export function CriadoresABCPD(data: CriadoresABCPDDTO) {
  const {onPageChange, criadores, onCriadorChange, token} = data;
  const [loading, setLoading] = useState(false);

  async function getAnimais(id: string) {
    setLoading(true);
    const animais = await getAnimaisByCriadorId(id, token);
    onCriadorChange('animaisCriador', animais);
    setLoading(false);
    onPageChange('verAnimaisCriador');

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
        text="Todos os criadores registrados na ABCPD"
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
              text="Cidade"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="RG"
              color="black"
              fontWeight="400"
            />
          </th>
          <th>
            <Text
              textAlign="center"
              fontFamily="rob"
              size={'1.3vw'}
              text="Ver Animais"
              color="black"
              fontWeight="400"
            />
          </th>
        </TableHeader>

        {criadores
          ? criadores.map((data: CriadorDTO) => {
            return (
              <TableContent key={data.userId}>
                <td style={{ width: '20%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={data.nomeCompleto}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={data.nomeCidade}
                    color="black"
                    fontWeight="400"
                  />
                </td>
                <td style={{ width: '25%' }}>
                  <Text
                    textAlign="center"
                    fontFamily="rob"
                    size={'1vw'}
                    text={data.rg}
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
                    {loading ? (
                      <CircularProgress size={'3vw'} />
                    ) : (
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
                          onCriadorChange('criadorId', data.id);
                          getAnimais(data.id);
                        }}
                      />
                    )}
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
