"use client";
import React, {useContext, useEffect, useState} from "react";
import {Text} from "../../Text";
import {
    ButtonPanel,
    Container,
    Content,
    CreditCard,
    GrayBackground,
    GreenBackground,
    Input,
    InputData,
    InputPair,
    InputPlace,
    Payment,
    RegisterPainel,
    ScreenOne,
    ScreenThree,
    ScreenTwo,
    TextBox,
    Title,
    TitleContent
} from "./style";
import {Header} from "../../Header/Header";
import {Button} from "../../Button";
import {WhiteBackground} from "../../WhiteBackground";
import {boleto, card, cartao, logo, logo2, pix} from "@/assets";
import Image from "next/legacy/image";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {CriarCriador} from "@/actions/criadorApi";
import {CriarFazenda} from "@/actions/fazendaApi";
import {motion} from "framer-motion";
import {PaymentAPI} from "@/actions/paymentApi";
import {AlertContext} from "@/context/AlertContextProvider";
import {getUserCPFEmail} from "@/actions/user";
import {CircularProgress} from "@mui/material";
import FazendaDTO from "@/utils/FazendaDTO";

export async function Register () {

    const {alert} = useContext(AlertContext),
        [
            pageOneX,
            setPageOneX
        ] = useState(false),
        [
            pageTwoX,
            setPageTwoX
        ] = useState(false),
        [
            pageThreeX,
            setPageThreeX
        ] = useState(false),
        [
            paymentX,
            setPaymentX
        ] = useState(false),
        [
            pixPay,
            setPix
        ] = useState(false),
        [
            boletoPay,
            setBoleto
        ] = useState(false),
        [
            creditPay,
            setCredit
        ] = useState(false),
        [
            imagePix,
            setImagePix
        ] = useState(),
        [
            boletoURL,
            setBoletoURL
        ] = useState(""),
        [
            loading,
            setLoading
        ] = useState(false);
    useEffect(
        () => {

            setSchema(getSchema());

        },
        [
            pageOneX,
            pageTwoX,
            pageThreeX
        ]
    );

    const [
            schema,
            setSchema
        ] = useState<any>(),
        {
            register,
            handleSubmit,
            "formState": {errors}
        } = useForm({
            "criteriaMode": "all",
            "mode": "all",
            "resolver": zodResolver(schema)
        }),

        [
            formValues,
            setFormValues
        ] = React.useState(schema);

    function getSchema () {

        if (!pageOneX) {

            return z.
                object({
                    "nomeCompleto": z.
                        string().
                        min(
                            1,
                            "Nome completo é um campo obrigatório"
                        ),
                    "email": z.
                        string({
                            "errorMap": () => ({"message": "Email não é válido"})
                        }).
                        min(
                            1,
                            "Email é obrigatório"
                        ).
                        email(),
                    "senha": z.
                        string({
                            "errorMap": () => ({"message": "Senha não é válida"})
                        }).
                        min(
                            8,
                            "Senha deve ter no minimo 8 digitos"
                        ),
                    "confirmarSenha": z.
                        string({
                            "errorMap": () => ({"message": "Confirmação de senha não é válida"})
                        }).
                        min(
                            8,
                            "Confirmação de senha deve ter no minimo 8 digitos"
                        )
                }).
                refine(
                    (fields) => fields.senha === fields.confirmarSenha,
                    {
                        "path": ["confirmarSenha"],
                        "message": "As senhas precisam ser iguais"
                    }
                );

        }
        if (!pageTwoX) {

            return z.
                object({
                    "cpf": z.string().min(
                        1,
                        "CPF é um campo obrigatório"
                    ),
                    "rg": z.string().min(
                        1,
                        "RG é um campo obrigatório"
                    ),
                    "nomeRua": z.string().min(
                        1,
                        "Rua é um campo obrigatório"
                    ),

                    "nomeBairro": z.
                        string({
                            "errorMap": () => ({"message": "Bairro não é válido"})
                        }).
                        min(
                            1,
                            "Bairro é um campo obrigatório"
                        ),

                    "nomeCidade": z.string().min(
                        1,
                        "Cidade é um campo obrigatório"
                    ),
                    "nomeEstado": z.string().min(
                        1,
                        "Estado é um campo obrigatório"
                    ),
                    "cep": z.string().min(
                        1,
                        "CEP é um campo obrigatório"
                    ),
                    "telefone": z.string().min(
                        1,
                        "Telefone é um campo obrigatório"
                    ),
                    "numeroCasa": z.
                        string().
                        min(
                            1,
                            "Numero da casa é um campo obrigatório"
                        )
                }).
                refine(
                    (fields) => validarCPF(fields.cpf) === true,
                    {
                        "path": ["cpf"],
                        "message": "CPF inválido"
                    }
                );

        }
        if (!pageThreeX) {

            return z.object({
                "nomeFazenda": z.string().min(
                    1,
                    "Nome fazenda é um campo obrigatório"
                ),
                "telefoneFazenda": z.string().min(
                    1,
                    "Telefone é um campo obrigatório"
                ),
                "areaFazenda": z.string().min(
                    1,
                    "Area é um campo obrigatório"
                ),
                "municipioFazenda": z.string().min(
                    1,
                    "Municipio é um campo obrigatório"
                ),
                "comoChegar": z.string(),
                "outrasEspecies": z.string(),
                "observacoes": z.string(),
                "femeas04Fazenda": z.number(),
                "femeas1224Fazenda": z.number(),
                "femeas2436Fazenda": z.number(),
                "femeas36Fazenda": z.number(),
                "femeas412Fazenda": z.number(),
                "macho04Fazenda": z.number(),
                "macho1224Fazenda": z.number(),
                "macho2436Fazenda": z.number(),
                "macho36Fazenda": z.number(),
                "macho412Fazenda": z.number()
            });

        }
        return z.object({});

    }
    function validarCPF (cpf: string): boolean {

        // Removendo pontos e traços para obter apenas os dígitos
        const cpfLimpo = cpf.replace(
                /[.-]/g,
                ""
            ),

            // Verificando o formato do CPF (11 dígitos)
            regexCPF = /^[0-9]{11}$/;
        if (!regexCPF.test(cpfLimpo)) {

            return false;

        }

        // Verificando dígitos repetidos (uma característica de CPF inválido)
        const digitosRepetidos = /^(.)\1+$/;
        if (digitosRepetidos.test(cpfLimpo)) {

            return false;

        }

        // Aplicando a fórmula de verificação do dígito
        const digitos = cpfLimpo.split("").map(Number);

        let peso = 10,
            soma = 0;

        for (let i = 0; i < 9; i++) {

            soma += digitos[i] * peso;
            peso--;

        }

        let resto = soma % 11;
        const digitoVerificador1 = resto < 2
            ? 0
            : 11 - resto;

        if (digitoVerificador1 !== digitos[9]) {

            return false;

        }

        soma = 0;
        peso = 11;

        for (let i = 0; i < 10; i++) {

            soma += digitos[i] * peso;
            peso--;

        }

        resto = soma % 11;
        const digitoVerificador2 = resto < 2
            ? 0
            : 11 - resto;
        return digitoVerificador2 === digitos[10];

    }

    async function CPFUsado (cpf: string) {

        const response = await getUserCPFEmail(cpf);
        return response;

    }

    const handle = async (data) => {

            if (await CPFUsado(data.email)) {

                alert("Email já foi utilizado");

            } else {

                setFormValues({...formValues,
                    ...data});
                if (Object.keys(errors).length === 0) {

                    setPageOneX(!pageOneX);

                }

            }

        },

        handle2 = async (data) => {

            setFormValues({...formValues,
                ...data});
            if (await CPFUsado(formValues.cpf)) {

                alert("CPF Já foi utilizado");

            } else if (Object.keys(errors).length === 0) {

                setPageTwoX(!pageTwoX);

            }

        },

        handle3 = (data) => {

            if (data) {

                Enviar(data);

            } else {

                alert("Formulário inválido");

            }

        };


    const Enviar = async (fazenda: FazendaDTO) => {

        setLoading(true);
        const palavras = formValues.nomeCompleto.split(" "),

            UserData = {
                "dateJoined": new Date(Date.now()).toISOString(),
                "nomePrimeiro": palavras[0],
                "nomeUltimo": palavras[palavras.length - 1],
                "email": formValues.email,
                "cpf": formValues.cpf,
                "username": palavras[0],
                "senha": formValues.senha,
                "telefone": formValues.telefone,
                "ultimaConexao": new Date(Date.now()).toISOString()
            },

            CriadorData = {
                "cep": formValues.cep,
                "nomeBairro": formValues.nomeBairro,
                "nomeCidade": formValues.nomeCidade,
                "nomeCompleto": formValues.nomeCompleto,
                "nomeEstado": formValues.nomeEstado,
                "nomeRua": formValues.nomeRua,
                "rg": formValues.rg,
                "numeroCasa": formValues.numeroCasa
            },

            response = await CriarCriador({...CriadorData,
                ...UserData});

        if (!response.message) {

            const FazendaData = {
                    "criadorFazenda": response?.id,
                    "areaFazenda": fazenda.areaFazenda,
                    "atualizacoes": "",
                    "comoChegar": fazenda.comoChegar,
                    "femeas04Fazenda": parseInt(fazenda.femeas04Fazenda),
                    "femeas1224Fazenda": parseInt(fazenda.femeas1224Fazenda),
                    "femeas2436Fazenda": parseInt(fazenda.femeas2436Fazenda),
                    "femeas36Fazenda": parseInt(fazenda.femeas36Fazenda),
                    "femeas412Fazenda": parseInt(fazenda.femeas412Fazenda),
                    "macho04Fazenda": parseInt(fazenda.macho04Fazenda),
                    "macho1224Fazenda": parseInt(fazenda.macho1224Fazenda),
                    "macho2436Fazenda": parseInt(fazenda.macho2436Fazenda),
                    "macho36Fazenda": parseInt(fazenda.macho36Fazenda),
                    "macho412Fazenda": parseInt(fazenda.macho412Fazenda),
                    "municipioFazenda": fazenda.municipioFazenda,
                    "nomeFazenda": fazenda.nomeFazenda,
                    "observacoes": fazenda.observacoes,
                    "outrasEspecies": fazenda.outrasEspecies,
                    "telefoneFazenda": fazenda.telefoneFazenda,
                    "fazendaCadastrada": false
                },
                responseFazenda = await CriarFazenda(FazendaData);

            if (responseFazenda.id) {

                alert(
                    "Conta criada com sucesso",
                    "success"
                );
                window.location.assign("/");

            }

        }
        setLoading(false);

    };

    return (
        <Container
            style={{
                "backgroundColor": pageThreeX
                    ? "white"
                    : "#E0E0E0",
                "height": pageThreeX
                    ? "40vw"
                    : "260vw"
            }}
        >
            <Header page="Register" />

            <GreenBackground style={{"display": pageThreeX
                ? "none"
                : ""}}
            />

            <ScreenOne
                animate={{"x": pageOneX
                    ? -1400
                    : 0}}
                onSubmit={handleSubmit(handle)}
                transition={{"duration": 1}}
            >
                <RegisterPainel>
                    <WhiteBackground
                        height="45vw"
                        width="80%"
                    >
                        <Content>
                            <Button
                                colorButton="#9E4B00"
                                heightButton="3vw"
                                onClick={() => {

                                    window.location.assign("/");

                                }}
                                textButton="←  Voltar"
                                widthButton="10%"
                            />

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Associar-se"
                                />
                            </Title>

                            <InputData>
                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Nome Completo"
                                        />

                                        <Input
                                            {...register(
                                                "nomeCompleto",
                                                {"required": true}
                                            )}
                                            name="nomeCompleto"
                                            type="text"
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="E-mail"
                                        />

                                        <Input
                                            {...register(
                                                "email",
                                                {"required": true}
                                            )}
                                            name="email"
                                            type="email"
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Senha"
                                        />

                                        <Input
                                            {...register(
                                                "senha",
                                                {"required": true}
                                            )}
                                            placeholder=""
                                            type="password"
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Confirmar Senha"
                                        />

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "confirmarSenha",
                                                {"required": true}
                                            )}
                                            type="password"
                                        />
                                    </InputPlace>
                                </InputPair>
                            </InputData>
                        </Content>
                    </WhiteBackground>
                </RegisterPainel>

                <ButtonPanel style={{"marginTop": "51.5vw"}}>
                    <GrayBackground>
                        <Button
                            colorButton="#9E4B00"
                            heightButton="6vw"
                            onClick={() => {

                                for (const componente in errors) {

                                    const mensagem = errors[componente];
                                    alert(mensagem?.message);

                                }
                                setSchema(getSchema());

                            }}
                            textButton="Continuar"
                            type="submit"
                            widthButton="80%"
                        />
                    </GrayBackground>
                </ButtonPanel>
            </ScreenOne>

            <ScreenTwo
                animate={{"x": pageTwoX
                    ? -1400
                    : pageOneX
                        ? 0
                        : 1400}}
                initial={{"x": 1400}}
                onSubmit={handleSubmit(handle2)}
                transition={{"duration": 1}}
            >
                <RegisterPainel>
                    <WhiteBackground
                        height="60vw"
                        width="80%"
                    >
                        <Content>
                            <Button
                                colorButton="#9E4B00"
                                heightButton="3vw"
                                onClick={() => {

                                    setPageOneX(!pageOneX);
                                    setSchema(getSchema());

                                }}
                                textButton="←  Voltar"
                                type="button"
                                widthButton="10%"
                            />

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Informações Pessoais"
                                />
                            </Title>

                            <InputData>
                                <InputPair>
                                    <InputPlace>
                                        <TitleContent>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="CPF/CNPJ"
                                            />

                                            <Text
                                                color="gray"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1vw"
                                                text="(Somente números)"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "cpf",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <TitleContent style={{"width": "40%"}}>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="RG"
                                            />

                                            <Text
                                                color="gray"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1vw"
                                                text="(Somente números)"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "rg",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Endereço"
                                        />

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "nomeRua",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Bairro"
                                        />

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "nomeBairro",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Cidade"
                                        />

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "nomeCidade",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Estado"
                                        />

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "nomeEstado",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <TitleContent style={{"width": "40%"}}>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="CEP"
                                            />

                                            <Text
                                                color="gray"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1vw"
                                                text="(Somente números)"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "cep",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <TitleContent style={{"width": "50%"}}>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="Telefone"
                                            />

                                            <Text
                                                color="gray"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1vw"
                                                text="(Somente números)"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "telefone",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <TitleContent style={{"width": "70%"}}>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="Numero da casa"
                                            />

                                            <Text
                                                color="gray"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1vw"
                                                text="(Somente números)"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "numeroCasa",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>
                            </InputData>
                        </Content>
                    </WhiteBackground>
                </RegisterPainel>

                <ButtonPanel style={{"marginTop": "59vw"}}>
                    <GrayBackground>
                        <Button
                            colorButton="#9E4B00"
                            heightButton="6vw"
                            onClick={async () => {

                                for (const componente in errors) {

                                    const mensagem = errors[componente];
                                    alert(mensagem.message);

                                }

                            }}
                            textButton="Continuar"
                            widthButton="80%"
                        />
                    </GrayBackground>
                </ButtonPanel>
            </ScreenTwo>

            <ScreenThree
                animate={{"x": pageThreeX
                    ? -1400
                    : pageTwoX
                        ? 0
                        : 1400}}
                initial={{"x": 1400}}
                onSubmit={handleSubmit(handle3)}
                transition={{"duration": 1}}
            >
                <RegisterPainel>
                    <WhiteBackground
                        height="200vw"
                        width="80%"
                    >
                        <Content>
                            <Button
                                colorButton="#9E4B00"
                                heightButton="3vw"
                                onClick={() => {

                                    setPageTwoX(!pageTwoX);

                                }}
                                textButton="←  Voltar"
                                type="button"
                                widthButton="10%"
                            />

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Fazendas"
                                />
                            </Title>

                            <InputData>
                                <InputPair>
                                    <InputPlace>
                                        <TitleContent>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="Nome da fazenda"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "nomeFazenda",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <TitleContent style={{"width": "50%"}}>
                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1.5vw"
                                                text="Telefone"
                                            />

                                            <Text
                                                color="gray"
                                                fontFamily="pop"
                                                fontWeight="300"
                                                size="1vw"
                                                text="(Somente números)"
                                            />
                                        </TitleContent>

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "telefoneFazenda",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Área"
                                        />

                                        <Input
                                            placeholder=""
                                            {...register(
                                                "areaFazenda",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Municipio"
                                        />

                                        <Input
                                            placeholder=""
                                            type="text"
                                            {...register(
                                                "municipioFazenda",
                                                {"required": true}
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>
                            </InputData>

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Registro do Gado da Raça Pé-Duro:"
                                />
                            </Title>

                            <InputData>
                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Bois de 0 a 4 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "macho04Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Bois de 5 a 12 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "macho412Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Bois de 13 a 24 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "macho1224Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Bois de 25 a 36 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "macho2436Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Bois de 37 a + Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "macho36Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Vacas de 0 a 4 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "femeas04Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Vacas de 5 a 12 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "femeas412Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Vacas de 13 a 24 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "femeas1224Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>

                                <InputPair>
                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Vacas de 25 a 36 Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "femeas2436Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>

                                    <InputPlace>
                                        <Text
                                            color="black"
                                            fontFamily="pop"
                                            fontWeight="300"
                                            size="1.5vw"
                                            text="Vacas de 37 a + Meses"
                                        />

                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...register(
                                                "femeas36Fazenda",
                                                {
                                                    "required": true,
                                                    "valueAsNumber": true
                                                }
                                            )}
                                        />
                                    </InputPlace>
                                </InputPair>
                            </InputData>

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Como chegar"
                                />
                            </Title>

                            <TextBox {...register("comoChegar")} />

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Cria Outras Espécies/Raças Nativas/Adaptativas?"
                                />
                            </Title>

                            <TextBox {...register("outrasEspecies")} />

                            <Title>
                                <Text
                                    color="black"
                                    fontFamily="pop"
                                    fontWeight="600"
                                    size="2vw"
                                    text="Observações"
                                />
                            </Title>

                            <TextBox {...register("observacoes")} />
                        </Content>
                    </WhiteBackground>
                </RegisterPainel>

                <ButtonPanel style={{"marginTop": "129vw"}}>
                    <GrayBackground>
                        {loading
                            ? <CircularProgress />
                            : <Button
                                colorButton="#9E4B00"
                                heightButton="6vw"
                                onClick={() => {

                                    for (const componente in errors) {

                                        const mensagem = errors[componente];
                                        alert(mensagem.message);

                                    }

                                }}
                                textButton="Continuar"
                                widthButton="80%"
                            />}
                    </GrayBackground>
                </ButtonPanel>
            </ScreenThree>

            <Payment
                animate={{"x": paymentX
                    ? -1400
                    : pageThreeX
                        ? 0
                        : 1400}}
                initial={{"x": 1400}}
                transition={{"duration": 1}}
            >
                <RegisterPainel>
                    <WhiteBackground
                        height="100vw"
                        width="80%"
                    >
                        <Content style={{"height": "100%"}}>
                            <Button
                                colorButton="#9E4B00"
                                heightButton="3vw"
                                onClick={() => {

                                    setPageThreeX(!pageThreeX);

                                }}
                                textButton="← "
                                widthButton="10%"
                            />

                            <div style={{"marginLeft": "8vw"}}>
                                <Title>
                                    <Text
                                        color="black"
                                        fontFamily="pop"
                                        fontWeight="600"
                                        size="2vw"
                                        text="Pagamento"
                                    />
                                </Title>

                                <Title>
                                    <Text
                                        color="black"
                                        fontFamily="rob"
                                        fontWeight="400"
                                        size="2vw"
                                        text="Selecione um método de pagamento"
                                    />
                                </Title>

                                <CreditCard>
                                    <div>
                                        <InputPair style={{"width": "72%"}}>
                                            <Input
                                                checked={creditPay === true}
                                                onClick={() => {

                                                    setCredit(!creditPay);
                                                    setBoleto(false);
                                                    setPix(false);

                                                }}
                                                style={{"width": "13%"}}
                                                type="radio"
                                            />

                                            <Text
                                                color="black"
                                                fontFamily="pop"
                                                fontWeight="600"
                                                size="1.3vw"
                                                src={cartao}
                                                text="Cartão Credito/Debito"
                                                widthImage="4vw"
                                            />
                                        </InputPair>

                                        <div
                                            style={{
                                                "width": "25vw",
                                                "marginTop": "2vw",
                                                "marginLeft": "5vw"
                                            }}
                                        >
                                            <Image
                                                alt="cartao"
                                                src={card}
                                                style={{
                                                    "width": "100%",
                                                    "height": "auto",
                                                    "objectFit": "cover"
                                                }}
                                            />
                                        </div>

                                        <motion.div
                                            animate={{
                                                "height": creditPay
                                                    ? "30vw"
                                                    : "0vw",
                                                "opacity": creditPay
                                                    ? 1
                                                    : 0
                                            }}
                                            initial={{"height": "30vw",
                                                "opacity": 1}}
                                            transition={{"duration": 1}}
                                        >
                                            <Title
                                                style={{
                                                    "marginLeft": "5vw"
                                                }}
                                            >
                                                <Text
                                                    color="black"
                                                    fontFamily="pop"
                                                    fontWeight="600"
                                                    size="2vw"
                                                    text="Adicionar Cartão"
                                                />
                                            </Title>

                                            <div
                                                style={{
                                                    "marginLeft": "5vw",
                                                    "width": "70%",
                                                    "height": "100%"
                                                }}
                                            >
                                                <InputPlace style={{"width": "100%"}}>
                                                    <Text
                                                        color="black"
                                                        fontFamily="pop"
                                                        fontWeight="300"
                                                        size="1.5vw"
                                                        text="Nome do titular"
                                                    />

                                                    <Input />
                                                </InputPlace>

                                                <InputPlace style={{"width": "100%"}}>
                                                    <Text
                                                        color="black"
                                                        fontFamily="pop"
                                                        fontWeight="300"
                                                        size="1.5vw"
                                                        text="Número do cartão"
                                                    />

                                                    <Input
                                                        mask="9999 9999 9999 9999"
                                                        placeholder="0000 0000 0000 0000"
                                                        type="text"
                                                    />
                                                </InputPlace>

                                                <InputPair>
                                                    <InputPlace style={{"width": "65%"}}>
                                                        <TitleContent style={{"width": "80%"}}>
                                                            <Text
                                                                color="black"
                                                                fontFamily="pop"
                                                                fontWeight="300"
                                                                size="1.5vw"
                                                                text="Validade"
                                                            />
                                                        </TitleContent>

                                                        <Input type="month" />
                                                    </InputPlace>

                                                    <InputPlace style={{"width": "25%"}}>
                                                        <TitleContent style={{"width": "40%"}}>
                                                            <Text
                                                                color="black"
                                                                fontFamily="pop"
                                                                fontWeight="300"
                                                                size="1.5vw"
                                                                text="CVV"
                                                            />
                                                        </TitleContent>

                                                        <Input
                                                            mask="999"
                                                            placeholder="000"
                                                            type="text"
                                                        />
                                                    </InputPlace>
                                                </InputPair>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <WhiteBackground
                                        alignItems="normal"
                                        boxShadow="0.1vw 0.1vw 0.6vw #9E4B00"
                                        height="15vw"
                                        padding="3vw"
                                        width="40%"
                                    >
                                        <div
                                            style={{
                                                "width": "100%",
                                                "display": "flex",
                                                "flexDirection": "column",
                                                "justifyContent": "space-between"
                                            }}
                                        >
                                            <InputPair style={{"alignItems": "center"}}>
                                                <div
                                                    style={{
                                                        "width": "20%",
                                                        "display": "flex",
                                                        "justifyContent": "center",
                                                        "flexDirection": "column",
                                                        "alignItems": "center"
                                                    }}
                                                >
                                                    <div style={{"width": "3vw"}}>
                                                        <Image
                                                            alt="Logo"
                                                            src={logo}
                                                            style={{
                                                                "width": "100%",
                                                                "height": "auto",
                                                                "objectFit": "cover"
                                                            }}
                                                        />
                                                    </div>

                                                    <div style={{"width": "7vw"}}>
                                                        <Image
                                                            alt="Logo"
                                                            src={logo2}
                                                            style={{
                                                                "width": "100%",
                                                                "height": "auto",
                                                                "objectFit": "cover"
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <TitleContent style={{"width": "70%"}}>
                                                    <Text
                                                        color="black"
                                                        fontFamily="pop"
                                                        fontWeight="600"
                                                        size="1vw"
                                                        text="Pagamento da Taxa de Inscrição"
                                                    />
                                                </TitleContent>
                                            </InputPair>

                                            <InputPair>
                                                <TitleContent style={{"width": "80%"}}>
                                                    <Text
                                                        color="black"
                                                        fontFamily="pop"
                                                        fontWeight="600"
                                                        size="1.2vw"
                                                        text="Taxa de Inscrição"
                                                    />
                                                </TitleContent>

                                                <TitleContent
                                                    style={{"width": "40%",
                                                        "marginLeft": "8vw"}}
                                                >
                                                    <Text
                                                        color="black"
                                                        fontFamily="pop"
                                                        fontWeight="600"
                                                        size="1.2vw"
                                                        text="R$ 10,00"
                                                    />
                                                </TitleContent>
                                            </InputPair>

                                            <Button
                                                colorButton="#9E4B00"
                                                heightButton="3vw"
                                                textButton="Confirmar Pagamento"
                                                widthButton="100%"
                                            />
                                        </div>
                                    </WhiteBackground>
                                </CreditCard>

                                <InputPair style={{"width": "20.5%"}}>
                                    <Input
                                        checked={pixPay === true}
                                        onClick={() => {

                                            setPix(!pixPay);
                                            setBoleto(false);
                                            setCredit(false);
                                            getPixImage();

                                        }}
                                        style={{"width": "18%"}}
                                        type="radio"
                                    />

                                    <div style={{"width": "5vw",
                                        "marginTop": "0.6vw"}}
                                    >
                                        <Image
                                            alt="pix"
                                            src={pix}
                                            style={{
                                                "width": "100%",
                                                "height": "auto",
                                                "objectFit": "cover"
                                            }}
                                        />
                                    </div>

                                    <Text
                                        color="black"
                                        fontFamily="pop"
                                        fontWeight="600"
                                        size="2vw"
                                        text="PIX"
                                    />
                                </InputPair>

                                <motion.div
                                    animate={{
                                        "height": pixPay
                                            ? "20vw"
                                            : "0vw",
                                        "opacity": pixPay
                                            ? 1
                                            : 0
                                    }}
                                    initial={{"height": "20vw",
                                        "opacity": 1}}
                                    transition={{"duration": 1}}
                                >
                                    <div
                                        style={{"width": "10vw",
                                            "display": pixPay
                                                ? "flex"
                                                : "none"}}
                                    >
                                        <img
                                            alt="pix"
                                            src={imagePix}
                                            style={{"width": "20vw"}}
                                        />
                                    </div>
                                </motion.div>

                                <InputPair style={{"width": "24.5%"}}>
                                    <Input
                                        checked={boletoPay === true}
                                        onClick={() => {

                                            setBoleto(!boletoPay);
                                            setPix(false);
                                            setCredit(false);

                                        }}
                                        style={{"width": "15%"}}
                                        type="radio"
                                    />

                                    <div
                                        style={{
                                            "width": "5vw"
                                        }}
                                    >
                                        <Image
                                            alt="boleto"
                                            src={boleto}
                                            style={{
                                                "width": "100%",
                                                "height": "auto",
                                                "objectFit": "cover"
                                            }}
                                        />
                                    </div>

                                    <Text
                                        color="black"
                                        fontFamily="pop"
                                        fontWeight="600"
                                        size="2vw"
                                        text="Boleto"
                                    />
                                </InputPair>

                                <motion.div
                                    animate={{
                                        "height": boletoPay
                                            ? "20vw"
                                            : "0vw",
                                        "opacity": boletoPay
                                            ? 1
                                            : 0
                                    }}
                                    initial={{"height": "20vw",
                                        "opacity": 1}}
                                    transition={{"duration": 1}}
                                >
                                    <Text
                                        color="black"
                                        fontFamily="pop"
                                        fontWeight="600"
                                        size="1.5vw"
                                        text="Acesse o boleto em: "
                                    />

                                    <a href={boletoURL}>
                                        <Text
                                            color="blue"
                                            fontFamily="pop"
                                            fontWeight="600"
                                            size="1.5vw"
                                            text="Boleto ABCPD"
                                        />
                                    </a>
                                </motion.div>
                            </div>
                        </Content>
                    </WhiteBackground>
                </RegisterPainel>
            </Payment>
        </Container>
    );

}
