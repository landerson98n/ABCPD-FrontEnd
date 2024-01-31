import React from 'react';
import { Container, Select, InputText } from './style';
import Image from 'next/image';
import { Text } from '../../Text';
import { logo2Branca } from '@/assets';
import { CircularProgress } from '@mui/material';
import { Button } from '../../Button';
import jsonWebTokenService from 'jsonwebtoken';
import FazendaDTO from '@/utils/FazendaDTO';
import RebanhoDTO from '@/utils/RebanhoDTO';
import { useQuery } from 'react-query';
import { getFazendaCriador } from '@/actions/fazendaApi';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { RebanhoAPI, getRebanhoBySerie } from '@/actions/RebanhApi';
import { AlertContext } from '@/context/AlertContextProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCriadorByUserId } from '@/actions/criadorApi';

export function CadastrarRebanho(props: { token: string }) {
  const [loading, setLoading] = useState(false);
  const decodedJwt = jsonWebTokenService.decode(props?.token);

  const { data: criador, isLoading: isLoadingCriador } = useQuery(
    'criadores',
    async () => getCriadorByUserId(decodedJwt?.sub, props.token),
  );

  const { isLoading: isLoadingFazendas, data: fazendas } = useQuery(
    'fazendas',
    async () => getFazendaCriador(props.token, criador.id),
    { enabled: criador !== undefined },
  );

  const schema = z.object({
    serie:
      criador?.rebanhos.length === 0
        ? z
          .string()
          .min(3, 'Rebanho deve ter no mínimo 3 caracteres')
          .max(3, 'Rebanho deve ter no máximo 3 caracteres')
        : z
          .string()
          .min(1, 'Rebanho deve ter no mínimo 1 caracter')
          .max(1, 'Rebanho deve ter no máximo 1 caracter'),
    fazendaId: z.string().nonempty('Selecione uma fazenda'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
  });
  const { alert } = useContext(AlertContext);

  async function cadastrarRebanho(data) {
    const rebanho: RebanhoDTO = data;
    setLoading(true);

    const serieUsada = await getRebanhoBySerie(
      criador.rebanhos.length !== 0
        ? `${criador.rebanhos[0].serie}${rebanho.serie}`
        : rebanho.serie,
      props.token,
    );

    if (serieUsada.status !== 404) {
      setLoading(false);
      return alert('Serie alfabetica já foi utilizada');
    }

    const responseRebanho = await RebanhoAPI({
      fazendaId: rebanho.fazendaId,
      serie:
        criador.rebanhos.length !== 0
          ? `${criador.rebanhos[0].serie}${rebanho.serie}`
          : rebanho.serie.toUpperCase(),
      criadorId: criador.id,
    });

    if (responseRebanho.serie) {
      if (criador.rebanhos.length === 0) {
        window.location.assign(`/CadastrarRebanho/${props.token}`);
      }
      setLoading(false);
      return alert('Rebanho cadastrado com sucesso!', 'success');
    }
    setLoading(false);
  }

  if (isLoadingFazendas || isLoadingCriador) {
    return (
      <div
        style={{
          width: '100%',
          height: '40vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container onSubmit={handleSubmit(cadastrarRebanho)}>
      <div
        style={{
          width: '100%',
          marginLeft: '50vw',
          marginBottom: '-5vw',
          marginTop: '5vw',
        }}
      >
        <Button
          widthButton="10%"
          heightButton="3vw"
          colorButton="black"
          textButton="← "
          onClick={() => {
            window.location.assign(`/CriadorPage/${props.token}`);
          }}
          type="button"
        />
      </div>

      <div style={{ width: '10vw' }}>
        <Image
          src={logo2Branca}
          alt="logoAnimal"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>
      <Text
        text="Cadastro de nova série alfabética | ABCPD"
        fontFamily="pop"
        fontWeight="700"
        size="2vw"
        color="black"
      />
      <Text
        text="Fazenda"
        fontFamily="rob"
        fontWeight="400"
        size="2vw"
        color="black"
      />
      <Select
        style={{ width: '30.5vw' }}
        {...register('fazendaId', { required: true })}
      >
        <option selected disabled value={''}>
          Selecione uma fazenda
        </option>
        {fazendas.map((data: FazendaDTO) => {
          return (
            <option value={data.id} key={data.nomeFazenda}>
              {data.nomeFazenda}
            </option>
          );
        })}
      </Select>

      <Text
        text="Série alfabética"
        fontFamily="rob"
        fontWeight="400"
        size="2vw"
        color="black"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '30%',
        }}
      >
        {criador?.rebanhos.length !== 0 ? (
          <Text
            text={`${criador.rebanhos[0].serie} - `}
            fontFamily="rob"
            fontWeight="400"
            size="2vw"
            color="black"
          />
        ) : null}

        <InputText
          {...register('serie', { required: true })}
          style={{ width: '20vw' }}
          type="text"
          max={1}
        />
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '1vw',
          justifyContent: 'space-between',
          width: '28%',
          marginLeft: '33vw',
        }}
      >
        {loading ? (
          <CircularProgress size={'2vw'} />
        ) : (
          <Button
            colorButton="#9E4B00"
            heightButton="2vw"
            textButton="Cadastrar Rebanho"
            widthButton="13vw"
            textColor="white"
            type="submit"
            onClick={() => {
              console.log();

              for (const componente in errors) {
                const mensagem = errors[componente];
                alert(mensagem?.message);
              }
            }}
          />
        )}
      </div>
    </Container>
  );
}
