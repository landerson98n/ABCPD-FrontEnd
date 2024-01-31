import React from 'react';
import {
  ScreenThree,
  RegisterPainel,
  Content,
  Title,
  InputData,
  InputPair,
  InputPlace,
  TitleContent,
  ButtonPanel,
  Input,
  TextBox,
  GrayBackground,
} from './style';
import { WhiteBackground } from '../../WhiteBackground';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { CircularProgress } from '@mui/material';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CriarFazenda } from '@/actions/fazendaApi';
import { RebanhoAPI } from '@/actions/RebanhApi';
import FazendaDTO from '@/utils/FazendaDTO';
import { useContext, useState } from 'react';
import { AlertContext } from '@/context/AlertContextProvider';
import { useQuery } from 'react-query';
import { getCriadorByUserId } from '@/actions/criadorApi';
import jsonWebTokenService from 'jsonwebtoken';

export function CadastrarFazenda(props: { token: string }) {
  const decodedJwt = jsonWebTokenService.decode(props.token);

  const { data: criador, isLoading: isLoadingCriador } = useQuery(
    'criadores',
    async () => getCriadorByUserId(decodedJwt?.sub, props.token),
  );

  const schema = z.object({
    nomeFazenda: z.string().min(1, 'Nome fazenda é um campo obrigatório'),
    telefoneFazenda: z.string().min(1, 'Telefone é um campo obrigatório'),
    areaFazenda: z.string().min(1, 'Area é um campo obrigatório'),
    municipioFazenda: z.string().min(1, 'Municipio é um campo obrigatório'),
    comoChegar: z.string(),
    outrasEspecies: z.string(),
    observacoes: z.string(),
    femeas04Fazenda: z.number(),
    femeas1224Fazenda: z.number(),
    femeas2436Fazenda: z.number(),
    femeas36Fazenda: z.number(),
    femeas412Fazenda: z.number(),
    macho04Fazenda: z.number(),
    macho1224Fazenda: z.number(),
    macho2436Fazenda: z.number(),
    macho36Fazenda: z.number(),
    macho412Fazenda: z.number(),
  });

  const { alert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const handle3 = (data) => {
    if (data) {
      Enviar(data);
    } else {
      alert('Formulário inválido');
    }
  };
  const Enviar = async (fazenda: FazendaDTO) => {
    setLoading(true);

    const FazendaData = {
      criadorFazenda: criador?.id,
      areaFazenda: fazenda.areaFazenda,
      atualizacoes: '',
      comoChegar: fazenda.comoChegar,
      femeas04Fazenda: parseInt(fazenda.femeas04Fazenda),
      femeas1224Fazenda: parseInt(fazenda.femeas1224Fazenda),
      femeas2436Fazenda: parseInt(fazenda.femeas2436Fazenda),
      femeas36Fazenda: parseInt(fazenda.femeas36Fazenda),
      femeas412Fazenda: parseInt(fazenda.femeas412Fazenda),
      macho04Fazenda: parseInt(fazenda.macho04Fazenda),
      macho1224Fazenda: parseInt(fazenda.macho1224Fazenda),
      macho2436Fazenda: parseInt(fazenda.macho2436Fazenda),
      macho36Fazenda: parseInt(fazenda.macho36Fazenda),
      macho412Fazenda: parseInt(fazenda.macho412Fazenda),
      municipioFazenda: fazenda.municipioFazenda,
      nomeFazenda: fazenda.nomeFazenda,
      observacoes: fazenda.observacoes,
      outrasEspecies: fazenda.outrasEspecies,
      telefoneFazenda: fazenda.telefoneFazenda,
      fazendaCadastrada: false,
    };
    const responseFazenda = await CriarFazenda(FazendaData);

    if (responseFazenda.id) {
      setLoading(false);
      Object.keys(fazenda).forEach((fieldName) => {
        setValue(fieldName, '');
      });
      return alert('Fazenda criada com sucesso', 'success');
    }

    setLoading(false);
  };
  return (
    <ScreenThree onSubmit={handleSubmit(handle3)}>
      <RegisterPainel>
        <WhiteBackground width="80%" height="200vw">
          <Content>
            <Button
              onClick={() => {
                window.location.assign(`/CriadorPage/${props.token}`);
              }}
              widthButton="10%"
              heightButton="3vw"
              colorButton="#9E4B00"
              textButton="←  Voltar"
              type="button"
            />

            <Title>
              <Text
                fontFamily="pop"
                size={'2vw'}
                text="Cadastrar nova fazenda"
                color="black"
                fontWeight="600"
              />
            </Title>

            <InputData>
              <InputPair>
                <InputPlace>
                  <TitleContent>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Nome da fazenda"
                      color="black"
                      fontWeight="300"
                    />
                  </TitleContent>
                  <Input
                    placeholder=""
                    {...register('nomeFazenda', { required: true })}
                  />
                </InputPlace>

                <InputPlace>
                  <TitleContent style={{ width: '50%' }}>
                    <Text
                      fontFamily="pop"
                      size={'1.5vw'}
                      text="Telefone"
                      color="black"
                      fontWeight="300"
                    />
                    <Text
                      fontFamily="pop"
                      size={'1vw'}
                      text="(Somente números)"
                      color="gray"
                      fontWeight="300"
                    />
                  </TitleContent>
                  <Input
                    placeholder=""
                    {...register('telefoneFazenda', { required: true })}
                  />
                </InputPlace>
              </InputPair>

              <InputPair>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Área (Ha)"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    {...register('areaFazenda', { required: true })}
                  />
                </InputPlace>

                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Municipio"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    type="text"
                    placeholder=""
                    {...register('municipioFazenda', { required: true })}
                  />
                </InputPlace>
              </InputPair>
            </InputData>

            <Title>
              <Text
                fontFamily="pop"
                size={'2vw'}
                text="Registro do Gado da Raça Curraleiro Pé-Duro:"
                color="black"
                fontWeight="600"
              />
            </Title>

            <InputData>
              <InputPair>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Bois de 0 a 4 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('macho04Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>

                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Bois de 5 a 12 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('macho412Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>
              </InputPair>

              <InputPair>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Bois de 13 a 24 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('macho1224Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>

                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Bois de 25 a 36 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('macho2436Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>
              </InputPair>

              <InputPair>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Bois de 37 a + Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('macho36Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>

                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Vacas de 0 a 4 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('femeas04Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>
              </InputPair>

              <InputPair>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Vacas de 5 a 12 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('femeas412Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>

                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Vacas de 13 a 24 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('femeas1224Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>
              </InputPair>

              <InputPair>
                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Vacas de 25 a 36 Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('femeas2436Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>

                <InputPlace>
                  <Text
                    fontFamily="pop"
                    size={'1.5vw'}
                    text="Vacas de 37 a + Meses"
                    color="black"
                    fontWeight="300"
                  />
                  <Input
                    placeholder=""
                    type="number"
                    {...register('femeas36Fazenda', {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </InputPlace>
              </InputPair>
            </InputData>

            <Title>
              <Text
                fontFamily="pop"
                size={'2vw'}
                text="Como chegar"
                color="black"
                fontWeight="600"
              />
            </Title>
            <TextBox {...register('comoChegar')} />

            <Title>
              <Text
                fontFamily="pop"
                size={'2vw'}
                text="Cria Outras Espécies/Raças Nativas/Adaptativas?"
                color="black"
                fontWeight="600"
              />
            </Title>
            <TextBox {...register('outrasEspecies')} />

            <Title>
              <Text
                fontFamily="pop"
                size={'2vw'}
                text="Observações"
                color="black"
                fontWeight="600"
              />
            </Title>
            <TextBox {...register('observacoes')} />
          </Content>
        </WhiteBackground>
      </RegisterPainel>

      <ButtonPanel style={{ marginTop: '129vw' }}>
        <GrayBackground>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              onClick={() => {
                for (const componente in errors) {
                  const mensagem = errors[componente];
                  alert(mensagem?.message);
                }
              }}
              widthButton="80%"
              heightButton="6vw"
              colorButton="#9E4B00"
              textButton="Continuar"
            />
          )}
        </GrayBackground>
      </ButtonPanel>
    </ScreenThree>
  );
}
