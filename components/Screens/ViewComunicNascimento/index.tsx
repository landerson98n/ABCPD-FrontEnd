import { InputText } from '@/components/InputText';
import { Text } from '@/components/Text';
import Image from 'next/image';
import React from 'react';
import { Content, InputPair, InputPlace} from '@/components/styles/stylesTecnico';
import { Button } from '@/components/Button';
import {logo2Branca } from '@/assets';

export function ViewComunicNascimento() {
  
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
        text="Registro de um Novo Bezerro | ABCPD"
        fontFamily="pop"
        fontWeight="700"
        size="1.8vw"
        color="black"
      />

      <InputPlace>
        <Text
          fontFamily="pop"
          size={'1.5vw'}
          text="Nome do Bezerro"
          color="black"
          fontWeight="300"
        />
        <InputText />
      </InputPlace>

      <InputPair style={{ width: '90%' }}>
        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Mês Da Avaliação"
            color="black"
            fontWeight="300"
          />
          <InputText />
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Ano Da Avaliação"
            color="black"
            fontWeight="300"
          />
          <InputText />
        </InputPlace>
      </InputPair>

      <InputPair style={{ width: '90%' }}>
        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Sexo do Animal"
            color="black"
            fontWeight="300"
          />
          <InputText />
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Pelagem do Animal"
            color="black"
            fontWeight="300"
          />
          <InputText />
        </InputPlace>
      </InputPair>

      <InputPair style={{ width: '90%' }}>
        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Data de Nascimento"
            color="black"
            fontWeight="300"
          />
          <InputText type="date" />
        </InputPlace>
      </InputPair>

      <InputPair style={{ width: '90%' }}>
        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Imagem 01"
            color="black"
            fontWeight="300"
          />
          <InputText
            fontSize="1.4vw"
            height="3vw"
            type="file"
            accept="image/*"
          />
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Imagem 02"
            color="black"
            fontWeight="300"
          />
          <InputText
            fontSize="1.4vw"
            height="3vw"
            type="file"
            accept="image/*"
          />
        </InputPlace>
      </InputPair>

      <InputPair style={{ width: '90%' }}>
        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Imagem 03"
            color="black"
            fontWeight="300"
          />
          <InputText
            fontSize="1.4vw"
            height="3vw"
            type="file"
            accept="image/*"
          />
        </InputPlace>

        <InputPlace style={{ width: '47%' }}>
          <Text
            fontFamily="pop"
            size={'1.5vw'}
            text="Imagem 04"
            color="black"
            fontWeight="300"
          />
          <InputText
            fontSize="1.4vw"
            height="3vw"
            type="file"
            accept="image/*"
          />
        </InputPlace>
      </InputPair>

      <div
        style={{
          display: 'flex',
          marginTop: '1vw',
          justifyContent: 'space-between',
          width: '35%',
          marginLeft: '41.9vw',
          marginBottom: '10vw',
        }}
      >
        <Button
          colorButton="black"
          heightButton="2vw"
          textButton="← Voltar"
          widthButton="7vw"
          textColor="white"
        />
        <Button
          colorButton="#9E4B00"
          heightButton="2vw"
          textButton="Registrar Animal"
          widthButton="17vw"
          textColor="white"
        />
      </div>
    </Content>
  );
}
