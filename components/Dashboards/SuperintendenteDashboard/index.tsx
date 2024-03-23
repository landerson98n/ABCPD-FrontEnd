/* eslint-disable no-confusing-arrow */
/* eslint-disable indent */
/* eslint-disable no-extra-parens */
/* eslint-disable function-paren-newline */
/* eslint-disable no-negated-condition */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import {useContext, useEffect, useState} from "react";
import {
    Home,
    add,
    animal,
    arrowLeft,
    boi,
    comunic,
    group,
    hamb,
    logo2Branca,
    logoBranca,
    searchIcon,
    seta,
    user,
    waiting,
    animalBlue,
    done
} from "@/assets";
import {
    Container,
    Menu,
    Content,
    Header,
    Animals,
    Table,
    TableHeader,
    TableContent,
    DropdownMenu,
    RegistroAnimalBase,
    InputPlace,
    ComunicNascimento,
    VerComunicNascimento,
    VerAnimals,
    InputPair,
    ComunicCobertura,
    VerComunicCobertura,
    UsersPage,
    UserRegister,
    TelaAnimaisRGD,
    TelaAnimaisRGN,
    TelaFazendasCriador,
    InputText,
    TelaRegistroUsuario
} from "./style";
import Image from "next/legacy/image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {motion} from "framer-motion";
import {getAllUsers, getUserById, getUserCPFEmail} from "@/actions/user";
import {getAnimaisByCriadorId, getTodosAnimais} from "@/actions/animaisApi";
import {getRebanhosAll} from "@/actions/RebanhApi";
import {getFazendaById, getTodasFazendas} from "@/actions/fazendaApi";
import {useQuery} from "react-query";
import UserDTO from "@/utils/UserDTO";
import jsonWebTokenService from "jsonwebtoken";
import AnimalDTO from "@/utils/AnimalDTO";
import {CircularProgress} from "@mui/material";
import CriadorDTO from "@/utils/CriadorDTO";
import FazendaDTO from "@/utils/FazendaDTO";
import {ComunicacaoNascimentoDto} from "@/utils/ComunicacaoNascimentoDTO";
import {
    getComunicacoesNascimentoCriador,
    updateComunicacaoNascimento
} from "@/actions/comunicacaoNascimento";
import format from "date-fns/format";
import {CriarCriador, getCriadorById} from "@/actions/criadorApi";
import {DetalhesAnimal} from "../../Screens/DetalhesAnimal";
import RebanhoDTO from "@/utils/RebanhoDTO";
import {allTecnicos, cadastrarTecnico} from "@/actions/tecnicoApi";
import {AlertContext} from "@/context/AlertContextProvider";
import {
    getAllCoberturas,
    getCoberturas,
    updateComunicCobertura
} from "@/actions/coberturaApi";
import * as z from "zod";
import ComunicacaoCoberturaDto from "@/utils/CoberturaDTO";
import TecnicoDTO from "@/utils/TecnicoDTO";
import {getRegistrosAnimalBase} from "@/actions/animalBaseApi";
import {SolicitacaoRegistroAnimalBaseDTO} from "@/utils/SolicitacaoDTO";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {sendEmail} from "@/actions/emailApi";

export function SuperintendenteDashboard (data: { token: string }) {

    const decodedJwt = jsonWebTokenService.decode(data.token);
    const {token} = data;
    const {"isLoading": isLoadingSuperintendenteUser, "data": superintendenteUser} =
    useQuery<UserDTO>(
        "superintendente",
        async () => getUserById(
            decodedJwt.sub,
            data.token
        )
    );

    const {"isLoading": isLoadingAnimais, "data": todosAnimais} = useQuery<[]>(
        "animais",
        async () => getTodosAnimais(data.token)
    );

    const {"isLoading": isLoadingTecnicos, "data": todosTecnicos} = useQuery(
        "tecnicos",
        async () => allTecnicos(data.token)
    );

    const {"isLoading": isLoadingRebanhos, "data": todosRebanhos} = useQuery(
        "rebanhos",
        async () => getRebanhosAll(data.token)
    );

    const {"data": todasFazendas, "isLoading": isLoadingFazendas} = useQuery(
        "fazendas",
        async () => getTodasFazendas(data.token)
    );

    const {"data": todasCoberturas, "isLoading": isLoadingCobertura} = useQuery(
        "coberturas",
        async () => getCoberturas(data.token)
    );

    const {"data": todosUsuarios, "isLoading": isLoadingUsuarios} = useQuery(
        "usuarios",
        async () => getAllUsers(data.token)
    );

    const {isLoading, "data": criadores} = useQuery(
        "criadores",
        async () => fetch(
            "https://abcpd-backend-production.up.railway.app/criador/get-criadores",
            {
                "headers": {
                    "Authorization": `Bearer ${data.token}`
                },
                "method": "GET"
            }
        ).then((res) => res.json())
    );

    const [
        paginas,
        setPaginas
    ] = useState({
        "animalPage": false,
        "tecnicoPage": false,
        "criadorPage": false,
        "verAnimalPage": false,
        "verAnimaRGDPage": false,
        "initialPage": false,
        "comunicPage": false,
        "usersPage": false,
        "animalBasePage": false,
        "RGD": false,
        "RGN": false,
        "comunicNascPage": false,
        "comunicCoberPage": false,
        "todasComunicNascPage": false,
        "verComunicNascPage": false,
        "solicitacao": false,
        "verComunicCoberPage": false,
        "tecnicoRegister": false,
        "criadorRegister": false,
        "menu": true,
        "verAnimaisCriador": false,
        "loading": false,
        "userRegister": false,
        "options": false
    });

    useEffect(
        () => {

            setPage(1);

        },
        [paginas]
    );

    const {alert} = useContext(AlertContext);
    const [
        nascimentos,
        setNascimentos
    ] = useState([]);
    const [
        cobertura,
        setCobertura
    ] = useState<ComunicacaoCoberturaDto>([]);
    const [
        criadorSelecionado,
        setCriadorSelecionado
    ] = useState<CriadorDTO>([]);
    const [
        tecnicoSelecionado,
        setTecnicoSelecionado
    ] = useState<TecnicoDTO>([]);
    const {
        loading,
        RGD,
        RGN,
        animalBasePage,
        animalPage,
        comunicCoberPage,
        comunicNascPage,
        comunicPage,
        criadorPage,
        criadorRegister,
        initialPage,
        menu,
        solicitacao,
        tecnicoPage,
        tecnicoRegister,
        todasComunicNascPage,
        usersPage,
        verAnimaRGDPage,
        verAnimalPage,
        verComunicCoberPage,
        verComunicNascPage,
        verAnimaisCriador,
        userRegister,
        options
    } = paginas;

    const [
        animalInfos,
        setAnimalInfos
    ] = useState({
        "animalSelecionado": {} as AnimalDTO,
        "fazendaSelecionado": {} as FazendaDTO,
        "criadorSelecionado": {} as CriadorDTO,
        "paiSelecionado": {} as AnimalDTO,
        "maeSelecionado": {} as AnimalDTO,
        "resgistro": false,
        "rgn": false,
        "rgd": false
    });

    const [
        nascimentoSelecionado,
        setNascimentoSelecionado
    ] =
    useState<ComunicacaoNascimentoDto>({});

    const [
        criadorInfo,
        setCriadorInfo
    ] = useState({
        "animaisCriador": [] as AnimalDTO[],
        "fazendasCriador": [] as FazendaDTO[],
        "rebanhosCriador": [] as RebanhoDTO[],
        "criadorId": ""
    });
    const [
        isTecnico,
        setIsTecnico
    ] = useState(false);
    const [
        page,
        setPage
    ] = useState(1);
    const [
        isSubmitSuccessful,
        setIsSubmitSuccessful
    ] = useState(false);
    const {animaisCriador, fazendasCriador, rebanhosCriador, criadorId} =
    criadorInfo;
    const {resgistro, rgn, rgd} = animalInfos;
    const updatedPages = {...paginas};

    for (const key in updatedPages) {

        if (key !== "menu") {

            updatedPages[key] = false;

        }

    }

    const [
        animalBaseInfo,
        setAnimalBaseInfo
    ] = useState({
        "solicitacoesAnimaisBase": [] as SolicitacaoRegistroAnimalBaseDTO[],
        "solicitacoesAnimaisBaseSelecionada": {} as SolicitacaoRegistroAnimalBaseDTO
    });
    const {solicitacoesAnimaisBase, solicitacoesAnimaisBaseSelecionada} =
    animalBaseInfo;

    function validarCPF (cpf: string): boolean {

        // Removendo pontos e traços para obter apenas os dígitos
        const cpfLimpo = cpf.replace(
            /[.-]/g,
            ""
        );

        // Verificando o formato do CPF (11 dígitos)
        const regexCPF = /^[0-9]{11}$/;
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

        let soma = 0;
        let peso = 10;

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

    const schema = z.
        object({
            "nomeCompleto": z.string().min(
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
            "cep": isTecnico
                ? z.string().optional()
                : z.string().min(
                    1,
                    "CEP é um campo obrigatório"
                ),
            "telefone": z.string().min(
                1,
                "Telefone é um campo obrigatório"
            ),
            "numeroCasa": isTecnico
                ? z.string().optional()
                : z.string().min(
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

    const {
        register,
        handleSubmit,
        "formState": {errors},
        setValue
    } = useForm({
        "criteriaMode": "all",
        "mode": "onSubmit",
        "resolver": zodResolver(schema)
    });

    async function getSolicitacoes () {

        setPaginas((prev) => ({
            ...prev,
            "loading": true
        }));
        const response = await getRegistrosAnimalBase(data.token);
        const reponseJson = await response.json();
        if (response.status == 200) {

            setAnimalBaseInfo((prev) => ({
                ...prev,
                "solicitacoesAnimaisBase": reponseJson
            }));

        }

        setPaginas((prev) => ({
            ...prev,
            "loading": false
        }));

    }

    if (
        isLoading ||
    isLoadingAnimais ||
    isLoadingRebanhos ||
    isLoadingFazendas ||
    isLoadingSuperintendenteUser
    ) {

        return (
            <div
                style={{
                    "width": "100%",
                    "height": "100vh",
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "center"
                }}
            >
                <CircularProgress />
            </div>
        );

    }

    async function getInformacoesAnimal (animal: AnimalDTO) {

        setPaginas((prev) => ({
            ...prev,
            "loading": true
        }));

        const fazenda: FazendaDTO = await getFazendaById(
            data.token,
            animal.fazenda
        );
        const criador: CriadorDTO = await getCriadorById(
            animal.criadorAnimal,
            data.token
        );

        setAnimalInfos((prevAnimal) => ({
            ...prevAnimal,
            "fazendaSelecionado": fazenda,
            "criadorSelecionado": criador,
            "maeSelecionado":
        todosAnimais.find((index: AnimalDTO) => index.id === animal.mae) || ({} as AnimalDTO),
            "paiSelecionado":
        todosAnimais.find((index: AnimalDTO) => index.id === animal.pai) || ({} as AnimalDTO)
        }));

        const animais = await getAnimaisByCriadorId(
            animal.criadorAnimal,
            data.token
        );

        setCriadorInfo((prev) => ({
            ...prev,
            "animaisCriador": animais
        }));

        setPaginas((prev) => ({
            ...prev,
            "loading": false
        }));

    }

    async function getNascimentos (id: string) {

        const nascimentoData = await getComunicacoesNascimentoCriador(
            data.token,
            id
        );
        setNascimentos(nascimentoData);

    }

    async function updateNascimento (decisao: string) {

        setPaginas((prev) => ({
            ...prev,
            "loading": true
        }));
        nascimentoSelecionado.statusNascimento = decisao;
        const resposta = await updateComunicacaoNascimento(
            nascimentoSelecionado,
            data.token,
            nascimentoSelecionado.id
        );

        if (resposta.status === 200) {

            alert(
                "Decisão salva com sucesso",
                "success"
            );

        } else {

            alert("Houve um erro ao salvar a decisão");

        }

        setPaginas((prev) => ({
            ...prev,
            "loading": false
        }));

    }

    async function updateCobertura (decisao: string) {

        setPaginas((prev) => ({
            ...prev,
            "loading": true
        }));
        cobertura.statusCobertura = decisao;
        const resposta = await updateComunicCobertura(
            data.token,
            cobertura,
            cobertura.id
        );

        if (resposta.status === 200) {

            alert(
                "Decisão salva com sucesso",
                "success"
            );

        } else {

            alert("Houve um erro ao salvar a decisão");

        }

        setPaginas((prev) => ({
            ...prev,
            "loading": false
        }));

    }

    async function CPFEmailUsado (cpf: string) {

        const response = await getUserCPFEmail(cpf);
        return response;

    }

    function gerarSenha () {

        const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
        const passwordLength = 16;
        let password = "";

        for (let i = 0; i < passwordLength; i++) {

            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(
                randomNumber,
                randomNumber + 1
            );

        }
        return password;

    }

    async function registrarUsuario (dataUser) {

        setPaginas((prev) => ({
            ...prev,
            "loading": true
        }));
        if (await CPFEmailUsado(dataUser.email)) {

            return alert("Email já foi utilizado");

        }
        if (await CPFEmailUsado(dataUser.cpf)) {

            return alert("CPF já foi utilizado");

        }
        if (!isTecnico) {

            const palavras = dataUser.nomeCompleto.split(" ");
            const UserData = {
                "dateJoined": new Date(Date.now()).toISOString(),
                "nomePrimeiro": palavras[0],
                "nomeUltimo": palavras[palavras.length - 1],
                "email": dataUser.email,
                "cpf": dataUser.cpf,
                "username": palavras[0],
                "senha": gerarSenha(),
                "telefone": dataUser.telefone,
                "ultimaConexao": new Date(Date.now()).toISOString()
            };
            const CriadorData = {
                "cep": dataUser.cep,
                "nomeBairro": dataUser.nomeBairro,
                "nomeCidade": dataUser.nomeCidade,
                "nomeCompleto": dataUser.nomeCompleto,
                "nomeEstado": dataUser.nomeEstado,
                "nomeRua": dataUser.nomeRua,
                "rg": dataUser.rg,
                "numeroCasa": dataUser.numeroCasa
            };
            const response = await CriarCriador({...CriadorData,
                ...UserData});
            if (!response.message) {

                Object.keys(dataUser).forEach((fieldName) => {

                    setValue(
                        fieldName,
                        ""
                    );

                });
                await sendEmail(
                    {"to": UserData.email,
                        "subject": `Senha ABCPD: ${password}`},
                    data.token
                );
                return alert(
                    "Criador registrado com sucesso",
                    "success"
                );

            }

        } else {

            const palavras = dataUser.nomeCompleto.split(" ");
            const password = gerarSenha();
            const UserData = {
                "dateJoined": new Date(Date.now()).toISOString(),
                "nomePrimeiro": palavras[0],
                "nomeUltimo": palavras[palavras.length - 1],
                "email": dataUser.email,
                "cpf": dataUser.cpf,
                "username": palavras[0],
                "senha": password,
                "telefone": dataUser.telefone,
                "ultimaConexao": new Date(Date.now()).toISOString()
            };
            const TecnicoData = {
                "cep": dataUser.cep,
                "nomeBairro": dataUser.nomeBairro,
                "nomeCidade": dataUser.nomeCidade,
                "nomeCompleto": dataUser.nomeCompleto,
                "nomeEstado": dataUser.nomeEstado,
                "nomeRua": dataUser.nomeRua,
                "rg": dataUser.rg,
                "numeroCasa": dataUser.numeroCasa
            };
            const response = await cadastrarTecnico(
                token,
                {
                    ...TecnicoData,
                    ...UserData
                }
            );
            if (!response.message) {

                setPaginas((prev) => ({
                    ...prev,
                    "loading": false
                }));
                Object.keys(dataUser).forEach((fieldName) => {

                    setValue(
                        fieldName,
                        ""
                    );

                });
                await sendEmail(
                    {"to": UserData.email,
                        "subject": `Senha ABCPD: ${password}`},
                    data.token
                );
                return alert(
                    "Tecnico registrado com sucesso",
                    "success"
                );

            }
            Object.keys(dataUser).forEach((fieldName) => {

                setValue(
                    fieldName,
                    ""
                );

            });

        }
        setPaginas((prev) => ({
            ...prev,
            "loading": false
        }));

    }

  interface PaginationOptions {
    items: []
    currentPage: number
  }

  function paginate ({items, currentPage}: PaginationOptions) {

      const itemsPerPage = 4;
      if (!Array.isArray(items) || itemsPerPage <= 0 || currentPage <= 0) {

          throw new Error("Invalid input parameters");

      }
      const startIndex = (currentPage - 1) * itemsPerPage;
      let endIndex = startIndex + itemsPerPage;

      if (endIndex > items.length) {

          endIndex = items.length;

      }

      return items.slice(
          startIndex,
          endIndex
      );

  }

  return (
      <Container>
          <Menu
              initial={{"width": "20%"}}
              animate={{"width": menu
                  ? "20%"
                  : "5%"}}
              transition={{"duration": 0.5}}
          >
              <motion.div
                  initial={{"x": "13vw"}}
                  transition={{"duration": 0.5}}
                  animate={{"x": menu
                      ? "13vw"
                      : "1.5vw"}}
                  onClick={() => {

                      setPaginas((prev) => ({
                          ...updatedPages,
                          "menu": !prev.menu
                      }));

                  }}
                  style={{"width": "100%",
                      "display": "flex",
                      "marginTop": "1vw"}}
              >
                  <div style={{"width": "2vw",
                      "cursor": "pointer"}}>
                      <Image
                          src={hamb}
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
              </motion.div>

              <motion.div
                  initial={{"x": "0vw"}}
                  transition={{"duration": 0.7}}
                  animate={{"x": menu
                      ? "0vw"
                      : "-20vw",
                  "opacity": menu
                      ? 1
                      : 0}}
                  style={{
                      "display": menu
                          ? "flex"
                          : "none",
                      "width": "96%",
                      "flexDirection": "column",
                      "justifyContent": "center"
                  }}
              >
                  <div
                      style={{
                          "paddingTop": "3vw",
                          "width": "100%",
                          "display": "flex",
                          "justifyContent": "center",
                          "alignItems": "center"
                      }}
                  >
                      <div style={{"width": "4vw"}}>
                          {/* <Image
                src={logo2Branca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              /> */}
                      </div>

                      <div style={{"width": "10vw"}}>
                          {/* <Image
                src={logoBranca}
                alt="Logo"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              /> */}
                      </div>
                  </div>

                  <div
                      style={{
                          "height": "20vw",
                          "display": "flex",
                          "justifyContent": "space-between",
                          "flexDirection": "column",
                          "marginTop": "3vw"
                      }}
                  >
                      <Button
                          widthButton="16vw"
                          widthImage="1.5vw"
                          src={Home}
                          heightButton="3.3vw"
                          onClick={() => {

                              setPaginas(() => ({
                                  ...updatedPages,
                                  "initialPage": true
                              }));

                          }}
                          colorButton={initialPage
                              ? "black"
                              : "#9E4B00"}
                          textButton="Pagina Inicial"
                      />
                      <Button
                          widthButton="16vw"
                          widthImage="1.8vw"
                          src={logo2Branca}
                          heightButton="3.3vw"
                          onClick={() => {

                              setPaginas((prev) => ({
                                  ...updatedPages,
                                  "RGN": !prev.RGN
                              }));

                          }}
                          colorButton={RGN || RGD
                              ? "black"
                              : "#9E4B00"}
                          textButton="Animais"
                      />
                      <Button
                          widthButton="16vw"
                          widthImage="1.5vw"
                          src={group}
                          heightButton="3.3vw"
                          onClick={() => {

                              setPaginas((prev) => ({
                                  ...updatedPages,
                                  "usersPage": !prev.usersPage
                              }));

                          }}
                          colorButton={
                              usersPage || criadorPage || tecnicoPage
                                  ? "black"
                                  : "#9E4B00"
                          }
                          textButton="Usuários"
                      />
                      <Button
                          widthButton="16vw"
                          widthImage="1.5vw"
                          src={comunic}
                          heightButton="3.3vw"
                          onClick={() => {

                              setPaginas((prev) => ({
                                  ...updatedPages,
                                  "comunicPage": !prev.comunicPage
                              }));

                          }}
                          colorButton={
                              comunicPage ||
                comunicNascPage ||
                comunicCoberPage ||
                todasComunicNascPage ||
                verComunicNascPage
                                  ? "black"
                                  : "#9E4B00"
                          }
                          textButton="Comunicações "
                      />
                      <Button
                          widthButton="16vw"
                          widthImage="1.5vw"
                          src={comunic}
                          heightButton="3.3vw"
                          onClick={() => {

                              getSolicitacoes();
                              setPaginas((prev) => ({
                                  ...updatedPages,
                                  "solicitacao": !prev.solicitacao
                              }));

                          }}
                          colorButton={solicitacao || animalBasePage
                              ? "black"
                              : "#9E4B00"}
                          textButton="Solicitações "
                      />

                      <DropdownMenu
                          initial={{"opacity": 0}}
                          animate={{
                              "y": RGN || RGD
                                  ? "-9.5vw"
                                  : "-15vw",
                              "opacity": RGN || RGD
                                  ? 1
                                  : 0
                          }}
                          transition={{"duration": 0.5}}
                          style={{
                              "pointerEvents": `${RGN || RGD
                                  ? "auto"
                                  : "none"}`
                          }}
                      >
                          <Button
                              marginRightImage="0.6vw"
                              marginLeftImage={"0.6vw"}
                              textSize="0.9vw"
                              textColor={RGD
                                  ? "white"
                                  : "black"}
                              widthButton="100%"
                              widthImage="0.5vw"
                              src={arrowLeft}
                              heightButton="3.3vw"
                              onClick={() => {

                                  setPaginas((prev) => ({
                                      ...updatedPages,
                                      "RGD": !prev.RGD
                                  }));

                              }}
                              colorButton={RGD
                                  ? "black"
                                  : "white"}
                              textButton="RGD"
                          />
                      </DropdownMenu>

                      <DropdownMenu
                          initial={{"opacity": 0}}
                          animate={{
                              "y":
                  comunicPage || comunicNascPage || comunicCoberPage
                      ? "-4vw"
                      : "-12vw",
                              "opacity":
                  comunicPage || comunicNascPage || comunicCoberPage
                      ? 1
                      : 0
                          }}
                          transition={{"duration": 0.5}}
                          style={{
                              "pointerEvents": `${
                                  comunicPage || comunicNascPage || comunicCoberPage
                                      ? "auto"
                                      : "none"
                              }`
                          }}
                      >
                          <Button
                              marginRightImage="0.6vw"
                              marginLeftImage={"0.6vw"}
                              textSize="0.9vw"
                              textColor={
                                  comunicNascPage || todasComunicNascPage || verComunicNascPage
                                      ? "white"
                                      : "black"
                              }
                              widthButton="100%"
                              widthImage="0.5vw"
                              src={arrowLeft}
                              heightButton="3.3vw"
                              onClick={() => {

                                  setPaginas((prev) => ({
                                      ...updatedPages,
                                      "comunicNascPage": !prev.comunicNascPage
                                  }));

                              }}
                              colorButton={
                                  comunicNascPage || todasComunicNascPage || verComunicNascPage
                                      ? "black"
                                      : "white"
                              }
                              textButton="Comunicações de Nascimento"
                          />
                          <Button
                              marginRightImage="0.6vw"
                              marginLeftImage={"0.6vw"}
                              textSize="0.9vw"
                              textColor={comunicCoberPage
                                  ? "white"
                                  : "black"}
                              widthButton="100%"
                              widthImage="0.5vw"
                              src={arrowLeft}
                              heightButton="3.3vw"
                              onClick={() => {

                                  setPaginas((prev) => ({
                                      ...updatedPages,
                                      "comunicCoberPage": !prev.comunicCoberPage
                                  }));

                              }}
                              colorButton={comunicCoberPage
                                  ? "black"
                                  : "white"}
                              textButton="Comunicações de Cobertura"
                          />
                      </DropdownMenu>

                      <DropdownMenu
                          initial={{"opacity": 0}}
                          animate={{
                              "y": usersPage || tecnicoPage || criadorPage
                                  ? "-8vw"
                                  : "-15vw",
                              "opacity": usersPage || tecnicoPage || criadorPage
                                  ? 1
                                  : 0
                          }}
                          transition={{"duration": 0.5}}
                          style={{
                              "pointerEvents": `${
                                  usersPage || tecnicoPage || criadorPage
                                      ? "auto"
                                      : "none"
                              }`
                          }}
                      >
                          <Button
                              marginRightImage="0.6vw"
                              marginLeftImage={"0.6vw"}
                              textSize="0.9vw"
                              textColor={tecnicoPage
                                  ? "white"
                                  : "black"}
                              widthButton="100%"
                              widthImage="0.5vw"
                              src={arrowLeft}
                              heightButton="3.3vw"
                              onClick={() => {

                                  setPaginas((prev) => ({
                                      ...updatedPages,
                                      "tecnicoPage": !prev.tecnicoPage
                                  }));

                              }}
                              colorButton={tecnicoPage
                                  ? "black"
                                  : "white"}
                              textButton="Tecnicos"
                          />
                          <Button
                              marginRightImage="0.6vw"
                              marginLeftImage={"0.6vw"}
                              textSize="0.9vw"
                              textColor={criadorPage
                                  ? "white"
                                  : "black"}
                              widthButton="100%"
                              widthImage="0.5vw"
                              src={arrowLeft}
                              heightButton="3.3vw"
                              onClick={() => {

                                  setPaginas((prev) => ({
                                      ...updatedPages,
                                      "criadorPage": !prev.criadorPage
                                  }));

                              }}
                              colorButton={criadorPage
                                  ? "black"
                                  : "white"}
                              textButton="Criadores"
                          />
                      </DropdownMenu>

                      <DropdownMenu
                          initial={{"opacity": 0}}
                          animate={{
                              "y": solicitacao || animalBasePage
                                  ? "-2.5vw"
                                  : "-20vw",
                              "opacity": solicitacao || animalBasePage
                                  ? 1
                                  : 0
                          }}
                          transition={{"duration": 0.5}}
                          style={{
                              "pointerEvents": `${
                                  solicitacao || animalBasePage
                                      ? "auto"
                                      : "none"
                              }`
                          }}
                      >
                          <Button
                              marginRightImage="0.6vw"
                              marginLeftImage={"0.6vw"}
                              textSize="0.9vw"
                              textColor={animalBasePage
                                  ? "white"
                                  : "black"}
                              widthButton="100%"
                              widthImage="0.5vw"
                              src={arrowLeft}
                              heightButton="3.3vw"
                              onClick={() => {

                                  setPaginas((prev) => ({
                                      ...updatedPages,
                                      "animalBasePage": !prev.animalBasePage
                                  }));

                              }}
                              colorButton={animalBasePage
                                  ? "black"
                                  : "white"}
                              textButton="Solicitações Animais Base"
                          />
                      </DropdownMenu>
                  </div>
              </motion.div>
          </Menu>

          <Content>
              <Header>
                  <DropdownMenu
                      initial={{"opacity": 0}}
                      animate={{
                          "y": options
                              ? 0
                              : -40,
                          "opacity": options
                              ? 1
                              : 0
                      }}
                      transition={{"duration": 0.5}}
                      style={{
                          "pointerEvents": `${options
                              ? "auto"
                              : "none"}`,
                          "marginTop": "10vw",
                          "marginLeft": "80vw",
                          "width": "20vw",
                          "position": "absolute",
                          "height": "5vw"
                      }}
                  >
                      <Button
                          colorButton="white"
                          marginRightImage="0.6vw"
                          marginLeftImage={"0.6vw"}
                          textSize="0.9vw"
                          widthButton="100%"
                          widthImage="0.5vw"
                          src={arrowLeft}
                          heightButton="3.3vw"
                          textColor="black"
                          onClick={() => {

                            router.push("/");

}}
                          textButton="Logout"
                      />
                  </DropdownMenu>
                  <div style={{"marginRight": "3vw",
                      "display": "flex"}}>
                      <div style={{"width": "4vw"}}>
                          <Image
                              src={user}
                              alt="Logo"
                              style={{"width": "100%",
                                  "height": "auto",
                                  "objectFit": "cover"}}
                          />
                      </div>
                      <div
                          onClick={() => {

                              setPaginas((prev) => ({
                                  ...prev,
                                  "options": !prev.options
                              }));

                          }}
                          style={{"cursor": "pointer",
                              "width": "16vw"}}
                      >
                          <Text
                              fontFamily="pop"
                              size={"1.5vw"}
                              text={`${superintendenteUser?.nomePrimeiro} ${superintendenteUser?.nomeUltimo}`}
                              color="black"
                              fontWeight="600"
                          />
                      </div>
                  </div>
              </Header>

              <motion.div
                  animate={{"y": initialPage
                      ? 0
                      : -50,
                  "opacity": initialPage
                      ? 1
                      : 0}}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${initialPage
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${initialPage
                          ? "auto"
                          : "none"}`,
                      "height": "100%",
                      "alignItems": "center"
                  }}
              >
                  <Text
                      fontFamily="pop"
                      size={"2.5vw"}
                      text="Seja bem vindo"
                      color="black"
                      fontWeight="600"
                  />
              </motion.div>

              <TelaAnimaisRGD
                  initial={{"opacity": 0}}
                  animate={{"y": paginas.RGD
                      ? 0
                      : -50,
                  "opacity": paginas.RGD
                      ? 1
                      : 0}}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${paginas.RGD
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${paginas.RGD
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "4vw"}}>
                      <Image
                          src={logo2Branca}
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      fontFamily="pop"
                      size={"1.5vw"}
                      text="Todos os Animais que Precisam do Registro RGD| ABCPD"
                      color="black"
                      fontWeight="600"
                  />

                  <div
                      style={{
                          "width": "30%",
                          "display": "flex",
                          "justifyContent": "space-between"
                      }}
                  >
                      <InputText
                          width="20vw"
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
                                  size={"1.3vw"}
                                  text="Número"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Criador"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Fazenda"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Decisão RGD do Superintendente"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Opções"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>
                      {todosAnimais
                          ? paginate({"items": todosAnimais,
                              "currentPage": page}).map((index: AnimalDTO) => {

                              if (!index.decisaoAnimalSuperRGD) {

                                  return (
                                      <TableContent key={index.id}>
                                          <td style={{"width": "20%"}}>
                                              <Text
                                                  textAlign="center"
                                                  fontFamily="rob"
                                                  size={"1vw"}
                                                  text={index.nomeAnimal}
                                                  color="black"
                                                  fontWeight="400"
                                              />
                                          </td>

                                          <td>
                                              <Text
                                                  textAlign="center"
                                                  fontFamily="rob"
                                                  size={"1vw"}
                                                  text={
                                                      criadores
                                                          ? (
                                                              criadores.find((indexFind: CriadorDTO) => indexFind.id === index.criadorAnimal) || {}
                                                          ).nomeCompleto
                                                          : ""
                                                  }
                                                  color="black"
                                                  fontWeight="400"
                                              />
                                          </td>

                                          <td style={{"width": "25%"}}>
                                              <Text
                                                  textAlign="center"
                                                  fontFamily="rob"
                                                  size={"1vw"}
                                                  text={
                                                      todasFazendas
                                                          ? (
                                                              todasFazendas.find((indexFind: FazendaDTO) => indexFind.id === index.fazenda) || {}
                                                          ).nomeFazenda
                                                          : ""
                                                  }
                                                  color="black"
                                                  fontWeight="400"
                                              />
                                          </td>

                                          <td style={{"width": "25%"}}>
                                              <Text
                                                  widthImage="1.5vw"
                                                  src={index.decisaoAnimalSuperRGD
                                                      ? add
                                                      : waiting}
                                                  textAlign="center"
                                                  fontFamily="rob"
                                                  size={"1vw"}
                                                  text={index.decisaoAnimalSuperRGD || "Em análise"}
                                                  color="black"
                                                  fontWeight="400"
                                              />
                                          </td>

                                          <td>
                                              <div
                                                  style={{
                                                      "display": "flex",
                                                      "width": "100%",
                                                      "justifyContent": "center",
                                                      "alignItems": "center",
                                                      "height": "100%"
                                                  }}
                                              >
                                                  <Button
                                                      radius="2vw"
                                                      marginLeftImage="0vw"
                                                      marginRightImage="0vw"
                                                      src={seta}
                                                      colorButton="white"
                                                      heightButton="3vw"
                                                      widthImage="65%"
                                                      widthButton="4vw"
                                                      textColor="white"
                                                      onClick={() => {

                                                          getInformacoesAnimal(index);
                                                          setAnimalInfos((prev) => ({
                                                              ...prev,
                                                              "animalSelecionado": index,
                                                              "resgistro": true,
                                                              "rgn": false,
                                                              "rgd": true
                                                          }));
                                                          setPaginas(() => ({
                                                              ...updatedPages,
                                                              "verAnimalPage": true
                                                          }));

                                                      }}
                                                  />
                                              </div>
                                          </td>
                                      </TableContent>
                                  );

                              }

                          })
                          : null}
                  </Table>
                  <div
                      style={{
                          "width": "100%",
                          "display": "flex",
                          "justifyContent": "center",
                          "marginTop": "1vw"
                      }}
                  >
                      <div style={{"marginRight": "1vw"}}>
                          <Button
                              colorButton="green"
                              heightButton="2vw"
                              widthButton="3vw"
                              textButton="<"
                              onClick={() => {

                                  setPage((prevPage) => (prevPage > 1
? prevPage - 1
: prevPage)
                                  );

                              }}
                          />
                      </div>

                      <Button
                          colorButton="green"
                          heightButton="2vw"
                          widthButton="3vw"
                          textButton=">"
                          onClick={() => {

                              setPage((prevPage) => prevPage + 1);

                          }}
                      />
                  </div>
              </TelaAnimaisRGD>

              <TelaAnimaisRGN
                  initial={{"opacity": 0}}
                  animate={{"y": paginas.RGN
                      ? 0
                      : -50,
                  "opacity": paginas.RGN
                      ? 1
                      : 0}}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${paginas.RGN
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${paginas.RGN
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {paginas.RGN
                      ? <>
                          <div style={{"width": "4vw"}}>
                              <Image
                                  src={logo2Branca}
                                  alt="Logo"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              fontFamily="pop"
                              size={"1.5vw"}
                              text="Todos os Animais que Precisam do Registro RGN| ABCPD"
                              color="black"
                              fontWeight="600"
                          />

                          <div
                              style={{
                                  "width": "30%",
                                  "display": "flex",
                                  "justifyContent": "space-between"
                              }}
                          >
                              <InputText
                                  width="20vw"
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
                                          size={"1.3vw"}
                                          text="Número"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Criador"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Fazenda"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Decisão RGN do Superintendente"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Opções"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                              </TableHeader>

                              {todosAnimais
                                  ? paginate({
                                      "items": todosAnimais,
                                      "currentPage": page
                                  }).map((index: AnimalDTO) => {

                                      if (!index.decisaoAnimalSuperRGN) {

                                          return (
                                              <TableContent key={index.id}>
                                                  <td style={{"width": "20%"}}>
                                                      <Text
                                                          textAlign="center"
                                                          fontFamily="rob"
                                                          size={"1vw"}
                                                          text={index.nomeAnimal}
                                                          color="black"
                                                          fontWeight="400"
                                                      />
                                                  </td>

                                                  <td>
                                                      <Text
                                                          textAlign="center"
                                                          fontFamily="rob"
                                                          size={"1vw"}
                                                          text={
                                                              criadores
                                                                  ? (
                                                                      criadores.find((indexFind: CriadorDTO) => indexFind.id ===
                                              index.criadorAnimal) || {}
                                                                  ).nomeCompleto
                                                                  : ""
                                                          }
                                                          color="black"
                                                          fontWeight="400"
                                                      />
                                                  </td>

                                                  <td style={{"width": "25%"}}>
                                                      <Text
                                                          textAlign="center"
                                                          fontFamily="rob"
                                                          size={"1vw"}
                                                          text={
                                                              todasFazendas
                                                                  ? (
                                                                      todasFazendas.find((indexFind: FazendaDTO) => indexFind.id === index.fazenda) || {}
                                                                  ).nomeFazenda
                                                                  : ""
                                                          }
                                                          color="black"
                                                          fontWeight="400"
                                                      />
                                                  </td>

                                                  <td style={{"width": "25%"}}>
                                                      <Text
                                                          widthImage="1.5vw"
                                                          src={
                                                              index.decisaoAnimalSuperRGD
                                                                  ? add
                                                                  : waiting
                                                          }
                                                          textAlign="center"
                                                          fontFamily="rob"
                                                          size={"1vw"}
                                                          text={
                                                              index.decisaoAnimalSuperRGD || "Em análise"
                                                          }
                                                          color="black"
                                                          fontWeight="400"
                                                      />
                                                  </td>

                                                  <td>
                                                      <div
                                                          style={{
                                                              "display": "flex",
                                                              "width": "100%",
                                                              "justifyContent": "center",
                                                              "alignItems": "center",
                                                              "height": "100%"
                                                          }}
                                                      >
                                                          <Button
                                                              radius="2vw"
                                                              marginLeftImage="0vw"
                                                              marginRightImage="0vw"
                                                              src={seta}
                                                              colorButton="white"
                                                              heightButton="3vw"
                                                              widthImage="65%"
                                                              widthButton="4vw"
                                                              textColor="white"
                                                              onClick={() => {

                                                                  getInformacoesAnimal(index);
                                                                  setAnimalInfos((prev) => ({
                                                                      ...prev,
                                                                      "animalSelecionado": index,
                                                                      "resgistro": true,
                                                                      "rgn": true,
                                                                      "rgd": false
                                                                  }));
                                                                  setCriadorInfo((prev) => ({
                                                                      ...prev,
                                                                      "criadorId": index.criadorAnimal
                                                                  }));
                                                                  setPaginas(() => ({
                                                                      ...updatedPages,
                                                                      "verAnimalPage": true
                                                                  }));

                                                              }}
                                                          />
                                                      </div>
                                                  </td>
                                              </TableContent>
                                          );

                                      }

                                  })
                                  : null}
                          </Table>
                          <div
                              style={{
                                  "width": "100%",
                                  "display": "flex",
                                  "justifyContent": "center",
                                  "marginTop": "1vw"
                              }}
                          >
                              <div style={{"marginRight": "1vw"}}>
                                  <Button
                                      colorButton="green"
                                      heightButton="2vw"
                                      widthButton="3vw"
                                      textButton="<"
                                      onClick={() => {

                                          setPage((prevPage) => prevPage > 1
? prevPage - 1
: prevPage
                                          );

                                      }}
                                  />
                              </div>

                              <Button
                                  colorButton="green"
                                  heightButton="2vw"
                                  widthButton="3vw"
                                  textButton=">"
                                  onClick={() => {

                                      setPage((prevPage) => prevPage + 1);

                                  }}
                              />
                          </div>
                      </>
                      : null}
              </TelaAnimaisRGN>

              <Animals
                  initial={{"opacity": 0}}
                  animate={{"y": animalPage
                      ? 0
                      : -50,
                  "opacity": animalPage
                      ? 1
                      : 0}}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${animalPage
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${animalPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "4vw"}}>
                      <Image
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      fontFamily="pop"
                      size={"1.5vw"}
                      text="Todos os Animais que Precisam do Resgistro | ABCPD"
                      color="black"
                      fontWeight="600"
                  />

                  <div style={{"width": "30%"}}>
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
                                  size={"1.3vw"}
                                  text="Nome"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Criador"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Fazenda"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Decisão RGN do Superintendente"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Opções"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>

                      <TableContent>
                          <td style={{"width": "20%"}}>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="Angus"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>
                          <td>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="João da Silva Santos"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>
                          <td style={{"width": "25%"}}>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="Fazenda Boa Vista"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>

                          <td style={{"width": "25%"}}>
                              <Text
                                  widthImage="1.5vw"
                                  src={waiting}
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="Em análise"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>

                          <td>
                              <div
                                  style={{
                                      "display": "flex",
                                      "width": "100%",
                                      "justifyContent": "center",
                                      "alignItems": "center",
                                      "height": "100%"
                                  }}
                              >
                                  <Button
                                      marginTopImage="0.3vw"
                                      radius="2vw"
                                      marginLeftImage="0vw"
                                      marginRightImage="0vw"
                                      src={seta}
                                      colorButton="white"
                                      heightButton="3vw"
                                      widthImage="75%"
                                      widthButton="3vw"
                                      textColor="white"
                                      onClick={() => {

                                          setPaginas((prev) => ({
                                              ...updatedPages,
                                              "verAnimaisCriador": !prev.verAnimaisCriador
                                          }));

                                      }}
                                  />
                              </div>
                          </td>
                      </TableContent>
                  </Table>
              </Animals>

              <Animals
                  initial={{"opacity": 0}}
                  animate={{
                      "y": verAnimaisCriador
                          ? 0
                          : -50,
                      "opacity": verAnimaisCriador
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${verAnimaisCriador
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${verAnimaisCriador
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "4vw"}}>
                      <Image
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      fontFamily="pop"
                      size={"1.5vw"}
                      text="Todos os Animais do Criador"
                      color="black"
                      fontWeight="600"
                  />

                  <div
                      style={{
                          "width": "100%",
                          "display": "flex",
                          "justifyContent": "space-between"
                      }}
                  >
                      <InputText
                          width="20vw"
                          fontSize="1.2vw"
                          placeholder="Buscar"
                          height="3vw"
                          border="solid 1px rgba(103, 97, 97, 0.5)"
                          borderRight="solid 1px rgba(103, 97, 97, 0.5)"
                          borderLeft="solid 1px rgba(103, 97, 97, 0.5)"
                          borderTop="solid 1px rgba(103, 97, 97, 0.5)"
                          borderColor="rgba(103, 97, 97, 0.5)"
                      />
                      <Button
                          marginTopImage="0.3vw"
                          radius="0.3vw"
                          textButton="+ Registrar Novo Animal"
                          colorButton="#E91868"
                          heightButton="3vw"
                          widthButton="17vw"
                          textColor="white"
                          onClick={() => {

                              setPaginas((prev) => ({
                                  ...updatedPages,
                                  "verAnimalPage": !prev.verAnimalPage
                              }));

                          }}
                      />
                  </div>

                  <Table>
                      <TableHeader>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Nome"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Tipo"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Fazenda"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Criador"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Decisão Técnico RGN"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="decisão técnico RGD"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>

                      <TableContent>
                          <td style={{"width": "20%"}}>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="João da Silva Santos"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>
                          <td>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="000.000.000-00"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>
                          <td style={{"width": "25%"}}>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text="00.000.00"
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>

                          <td>
                              <div
                                  style={{
                                      "display": "flex",
                                      "width": "100%",
                                      "justifyContent": "center",
                                      "alignItems": "center",
                                      "height": "100%"
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

                                          setPaginas(() => ({
                                              ...updatedPages,
                                              "verAnimalPage": true
                                          }));

                                      }}
                                  />
                              </div>
                          </td>
                      </TableContent>
                  </Table>
              </Animals>

              <VerAnimals
                  initial={{"opacity": 0}}
                  animate={{
                      "y": verAnimalPage
                          ? 0
                          : -50,
                      "opacity": verAnimalPage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${verAnimalPage
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${verAnimalPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <DetalhesAnimal
                      token={data.token}
                      animalInfos={animalInfos}
                      animaisCriador={animaisCriador}
                      registro={resgistro}
                      SuperRGD={rgd}
                      SuperRGN={rgn}
                  />
              </VerAnimals>

              <RegistroAnimalBase
                  initial={{"opacity": 0}}
                  animate={{
                      "y": paginas.animalBasePage
                          ? 0
                          : -50,
                      "opacity": paginas.animalBasePage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${paginas.animalBasePage
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${paginas.animalBasePage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "10vw"}}>
                      <Image
                          src={logo2Branca}
                          alt="logoAnimal"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      text="Solicitação de Registro de Animais Base | ABCPD"
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
                                  size={"1.3vw"}
                                  text="Rebanho"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Criador"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Estado da solicitação"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Ação"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>
                      {solicitacoesAnimaisBase
                          ? solicitacoesAnimaisBase.map((index: SolicitacaoRegistroAnimalBaseDTO) => <TableContent key={index.criadorId}>
                              <td style={{"width": "20%"}}>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={
                                          todosRebanhos
                                              ? (
                                                  todosRebanhos.find((reb: RebanhoDTO) => reb.id == index.rebanhoId) || {}
                                              ).serie
                                              : ""
                                      }
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={
                                          criadores
                                              ? (
                                                  criadores?.find((cr: CriadorDTO) => cr.id == index.criadorId) || {}
                                              ).nomeCompleto
                                              : null
                                      }
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td style={{"width": "25%"}}>
                                  <Text
                                      widthImage="1.5vw"
                                      src={
                                          index.estadoSolicitacao == "Em análise"
                                              ? waiting
                                              : done
                                      }
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={index.estadoSolicitacao}
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>

                              <td>
                                  <div
                                      style={{
                                          "display": "flex",
                                          "width": "100%",
                                          "justifyContent": "center",
                                          "alignItems": "center",
                                          "height": "100%"
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
                                      />
                                      <div style={{"marginLeft": "1vw"}}>
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

                                                  setPaginas(() => ({
                                                      ...updatedPages,
                                                      "verAnimalPage": true
                                                  })),
                                                  setAnimalBaseInfo((prev) => ({
                                                      ...prev,
                                                      "solicitacoesAnimaisBaseSelecionada": index
                                                  })),
                                                  setTypeCadastro("animalBase");

                                              }}
                                          />
                                      </div>
                                  </div>
                              </td>
                          </TableContent>)
                          : null}
                  </Table>

                  <div style={{"display": "flex",
                      "marginTop": "1vw"}}>
                      <Button
                          colorButton="black"
                          heightButton="2vw"
                          textButton="← Voltar"
                          widthButton="7vw"
                          textColor="white"
                      />
                  </div>
              </RegistroAnimalBase>

              <TelaFazendasCriador
                  initial={{"opacity": 0}}
                  animate={{
                      "y": paginas.comunicNascPage
                          ? 0
                          : -50,
                      "opacity": paginas.comunicNascPage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${paginas.comunicNascPage
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${paginas.comunicNascPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "4vw"}}>
                      <Image
                          src={logo2Branca}
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      fontFamily="pop"
                      size={"1.5vw"}
                      text="Todos as Fazendas dos Criadores"
                      color="black"
                      fontWeight="600"
                  />

                  <div style={{"width": "30%"}}>
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
                                  size={"1.3vw"}
                                  text="Nome da Fazenda"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Criador"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Telefone- fazenda"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Mais Informações"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>
                      {todasFazendas
                          ? todasFazendas.map((index: FazendaDTO) => <TableContent key={index.id}>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={index.nomeFazenda}
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={
                                          (
                                              criadores?.find((indexFind: CriadorDTO) => indexFind.id === index.criadorFazenda) || {}
                                          ).nomeCompleto || ""
                                      }
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={index.telefoneFazenda}
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <div
                                      style={{
                                          "display": "flex",
                                          "width": "100%",
                                          "justifyContent": "center"
                                      }}
                                  >
                                      <Button
                                          onClick={() => {

                                              getNascimentos(index.criadorFazenda);
                                              setPaginas(() => ({
                                                  ...updatedPages,
                                                  "todasComunicNascPage": true
                                              }));

                                          }}
                                          marginTopImage="0.6vw"
                                          radius="2.5vw"
                                          marginLeftImage="0vw"
                                          marginRightImage="0vw"
                                          src={seta}
                                          colorButton="white"
                                          heightButton="2.8vw"
                                          widthImage="100%"
                                          widthButton="3vw"
                                          textColor="white"
                                      />
                                  </div>
                              </td>
                          </TableContent>)
                          : null}
                  </Table>

                  <div style={{"marginTop": "1vw"}}>
                      <Button
                          colorButton="black"
                          heightButton="2vw"
                          textButton="← Voltar"
                          widthButton="7vw"
                          textColor="white"
                      />
                  </div>
              </TelaFazendasCriador>

              <ComunicNascimento
                  initial={{"opacity": 0}}
                  animate={{
                      "y": paginas.todasComunicNascPage
                          ? 0
                          : -50,
                      "opacity": paginas.todasComunicNascPage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${paginas.todasComunicNascPage
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${paginas.todasComunicNascPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "4vw"}}>
                      <Image
                          src={logo2Branca}
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      fontFamily="pop"
                      size={"1.5vw"}
                      text="Todas Comunicações de Nascimento do Criador | ABCPD"
                      color="black"
                      fontWeight="600"
                  />

                  <div style={{"width": "30%"}}>
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
                                  size={"1.3vw"}
                                  text="Data da Comunicação"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Matriz"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Bezerro"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Opções"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>
                      {nascimentos
                          ? nascimentos.map((index: ComunicacaoNascimentoDto) => <TableContent key={index.id}>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={format(
                                          new Date(index.dataComunicacao),
                                          "dd/ MM/ yyyy"
                                      )}
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={
                                          (
                                              todosAnimais.find((indexAnimal) => index.matrizAnimalId == indexAnimal.id) || {}
                                          ).nomeAnimal || ""
                                      }
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <Text
                                      textAlign="center"
                                      fontFamily="rob"
                                      size={"1vw"}
                                      text={index.animalBezerro}
                                      color="black"
                                      fontWeight="400"
                                  />
                              </td>
                              <td>
                                  <div
                                      style={{
                                          "display": "flex",
                                          "width": "100%",
                                          "justifyContent": "center"
                                      }}
                                  >
                                      <Button
                                          onClick={() => {

                                              setNascimentoSelecionado(index);
                                              setPaginas(() => ({
                                                  ...updatedPages,
                                                  "verComunicNascPage": true
                                              }));

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
                          </TableContent>)
                          : null}
                  </Table>

                  <div style={{"marginTop": "1vw"}}>
                      <Button
                          colorButton="black"
                          heightButton="2vw"
                          textButton="← Voltar"
                          widthButton="7vw"
                          textColor="white"
                      />
                  </div>
              </ComunicNascimento>

              <VerComunicNascimento
                  initial={{"opacity": 0}}
                  animate={{
                      "y": paginas.verComunicNascPage
                          ? 0
                          : -50,
                      "opacity": paginas.verComunicNascPage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${paginas.verComunicNascPage
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${paginas.verComunicNascPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {verComunicNascPage
                      ? <>
                          <div style={{"width": "10vw"}}>
                              <Image
                                  src={logo2Branca}
                                  alt="logoAnimal"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              text="Detalhe comunicação de nascimento | ABCPD"
                              fontFamily="pop"
                              fontWeight="700"
                              size="1.8vw"
                              color="black"
                          />

                          <InputPlace>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Nome do Bezerro"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText value={nascimentoSelecionado.animalBezerro} />
                          </InputPlace>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Fazenda"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todasFazendas.find((index) => index.id === nascimentoSelecionado.fazendaNascimentoId).nomeFazenda
                                      }
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Criador"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          criadores.find((index) => index.id === nascimentoSelecionado.criadorNascimentoId).nomeCompleto
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Matriz"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todosAnimais.find((index) => index.id === nascimentoSelecionado.matrizAnimalId).nomeAnimal
                                      }
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Reprodutor"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todosAnimais.find((index) => index.id === nascimentoSelecionado.reprodutorAnimalId).nomeAnimal
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Técnico"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todosTecnicos.find((index) => index.id === nascimentoSelecionado.tecnicoNascimentoId).nomeCompleto
                                      }
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Data comunicação"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={format(
                                          new Date(nascimentoSelecionado.dataComunicacao),
                                          "dd/MM/yyyy"
                                      )}
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "91%",
                              "marginTop": "2vw"}}>
                              <div
                                  style={{
                                      "width": "100%",
                                      "justifyContent": "end",
                                      "display": "flex"
                                  }}
                              >
                                  {loading
                                      ? <CircularProgress size="3vw" />
                                      : <div
                                          style={{
                                              "display": "flex",
                                              "marginTop": "1vw",
                                              "justifyContent": "space-between",
                                              "width": "60%",
                                              "marginBottom": "10vw"
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
                                              colorButton="red"
                                              heightButton="2vw"
                                              textButton="Reprovar"
                                              widthButton="15vw"
                                              textColor="white"
                                              onClick={() => {

                                                  updateNascimento("Reprovar");

                                              }}
                                          />
                                          <Button
                                              colorButton="green"
                                              heightButton="2vw"
                                              textButton="Aprovar"
                                              widthButton="17vw"
                                              textColor="white"
                                              onClick={() => {

                                                  updateNascimento("Aprovar");

                                              }}
                                          />
                                      </div>
                                  }
                              </div>
                          </InputPair>
                      </>
                      : null}
              </VerComunicNascimento>

              <ComunicCobertura
                  initial={{"opacity": 0}}
                  animate={{
                      "y": comunicCoberPage
                          ? 0
                          : -50,
                      "opacity": comunicCoberPage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${comunicCoberPage
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${comunicCoberPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {comunicCoberPage
                      ? <>
                          <div style={{"width": "4vw"}}>
                              <Image
                                  alt="Logo"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              fontFamily="pop"
                              size={"1.5vw"}
                              text="Listagem de Comunicações de Cobertura | ABCPD"
                              color="black"
                              fontWeight="600"
                          />

                          <div style={{"width": "30%"}}>
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
                                          size={"1.3vw"}
                                          text="Data da Comunicação"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Fazenda"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Criador"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Tipo de Cobertura"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>

                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Opções"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                              </TableHeader>
                              {todasCoberturas.map((index: ComunicacaoCoberturaDto) => <TableContent key={index.id}>
                                  <td>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1vw"}
                                          text={format(
                                              new Date(index.dataCobertura),
                                              "dd/MM/yyyy"
                                          )}
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </td>
                                  <td>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1vw"}
                                          text={
                                              todasFazendas.find((data) => data.id === index.fazendaCobertura).nomeFazenda
                                          }
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </td>
                                  <td>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1vw"}
                                          text={
                                              criadores.find((data) => data.id === index.criadorCobertura).nomeCompleto
                                          }
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </td>
                                  <td>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1vw"}
                                          text={index.tipoCobertura}
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </td>

                                  <td>
                                      <div
                                          style={{
                                              "display": "flex",
                                              "width": "100%",
                                              "justifyContent": "center"
                                          }}
                                      >
                                          <Button
                                              onClick={() => {

                                                  setPaginas(() => ({
                                                      ...updatedPages,
                                                      "verComunicCoberPage": true
                                                  }));
                                                  setCobertura(index);

                                              }}
                                              marginTopImage="0.6vw"
                                              radius="2.5vw"
                                              marginLeftImage="0vw"
                                              marginRightImage="0vw"
                                              src={seta}
                                              colorButton="white"
                                              heightButton="2.8vw"
                                              widthImage="100%"
                                              widthButton="3vw"
                                              textColor="white"
                                          />
                                      </div>
                                  </td>
                              </TableContent>)}
                          </Table>

                          <div style={{"marginTop": "1vw"}}>
                              <Button
                                  colorButton="black"
                                  heightButton="2vw"
                                  textButton="← Voltar"
                                  widthButton="7vw"
                                  textColor="white"
                              />
                          </div>
                      </>
                      : null}
              </ComunicCobertura>

              <VerComunicCobertura
                  initial={{"opacity": 0}}
                  animate={{
                      "y": verComunicCoberPage
                          ? 0
                          : -50,
                      "opacity": verComunicCoberPage
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${verComunicCoberPage
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${verComunicCoberPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {verComunicCoberPage
                      ? <>
                          <div style={{"width": "10vw"}}>
                              <Image
                                  alt="logoAnimal"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              text="Detalhe da Cobertura | ABCPD"
                              fontFamily="pop"
                              fontWeight="700"
                              size="1.8vw"
                              color="black"
                          />

                          <InputPlace>
                              <Text
                                  text="Informações "
                                  fontFamily="pop"
                                  fontWeight="700"
                                  size="1.5vw"
                                  color="black"
                              />
                          </InputPlace>

                          <InputPair style={{"width": "90%",
                              "alignItems": "start"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Reprodudor(es)"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  {cobertura.animais.map((index: AnimalDTO) => {

                                      if (index.sexoAnimal === "Macho") {

                                          return (
                                              <InputText key={index.id} value={index.nomeAnimal} />
                                          );

                                      }

                                  })}
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Matriz(es)"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  {cobertura.animais.map((index: AnimalDTO) => {

                                      if (index.sexoAnimal === "Fêmea") {

                                          return (
                                              <InputText key={index.id} value={index.nomeAnimal} />
                                          );

                                      }

                                  })}
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Tipo de Cobertura"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={cobertura.tipoCobertura} />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Data da Cobertura"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={format(
                                          new Date(cobertura.dataCobertura),
                                          "dd/MM/yyyy"
                                      )}
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Criador da Cobertura"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          criadores.find((index) => index.id === cobertura.criadorCobertura).nomeCompleto
                                      }
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Observações"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={cobertura.observacoes} />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Fazenda"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todasFazendas.find((index) => index.id === cobertura.fazendaCobertura).nomeFazenda
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <div
                              style={{
                                  "display": "flex",
                                  "justifyContent": "end",
                                  "width": "92%"
                              }}
                          >
                              {loading
                                  ? <CircularProgress size={"4vw"} />
                                  : <div
                                      style={{
                                          "display": "flex",
                                          "marginTop": "1vw",
                                          "justifyContent": "space-between",
                                          "width": "40%",
                                          "marginBottom": "10vw"
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
                                          colorButton="red"
                                          heightButton="2vw"
                                          textButton="Reprovar"
                                          widthButton="7vw"
                                          textColor="white"
                                          onClick={() => {

                                              updateCobertura("Reprovado");

                                          }}
                                      />

                                      <Button
                                          colorButton="green"
                                          heightButton="2vw"
                                          textButton="Aprovar"
                                          widthButton="7vw"
                                          textColor="white"
                                          onClick={() => {

                                              updateCobertura("Aprovado");

                                          }}
                                      />
                                  </div>
                              }
                          </div>
                      </>
                      : null}
              </VerComunicCobertura>

              <UsersPage
                  initial={{"opacity": 0}}
                  animate={{"y": tecnicoPage
                      ? 0
                      : -50,
                  "opacity": tecnicoPage
                      ? 1
                      : 0}}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${tecnicoPage
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${tecnicoPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {tecnicoPage
                      ? <>
                          <div style={{"width": "4vw"}}>
                              <Image
                                  alt="Logo"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              fontFamily="pop"
                              size={"1.5vw"}
                              text="Todos os Técnicos da ABCPD"
                              color="black"
                              fontWeight="600"
                          />

                          <div style={{"width": "30%"}}>
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
                                          size={"1.3vw"}
                                          text="Nome Completo"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Cidade"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                                  <th>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1.3vw"}
                                          text="Opções"
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </th>
                              </TableHeader>
                              {todosTecnicos.map((index: TecnicoDTO) => <TableContent key={index.id}>
                                  <td>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1vw"}
                                          text={index.nomeCompleto}
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </td>
                                  <td>
                                      <Text
                                          textAlign="center"
                                          fontFamily="rob"
                                          size={"1vw"}
                                          text={index.nomeCidade}
                                          color="black"
                                          fontWeight="400"
                                      />
                                  </td>
                                  <td>
                                      <div
                                          style={{
                                              "display": "flex",
                                              "width": "100%",
                                              "justifyContent": "center"
                                          }}
                                      >
                                          <Button
                                              onClick={() => {

                                                  setPaginas((prev) => ({
                                                      ...updatedPages,
                                                      "tecnicoRegister": !prev.tecnicoRegister
                                                  }));
                                                  setTecnicoSelecionado(index);

                                              }}
                                              marginTopImage="0.6vw"
                                              radius="2.5vw"
                                              marginLeftImage="0vw"
                                              marginRightImage="0vw"
                                              src={seta}
                                              colorButton="white"
                                              heightButton="2.8vw"
                                              widthImage="100%"
                                              widthButton="3vw"
                                              textColor="white"
                                          />
                                      </div>
                                  </td>
                              </TableContent>)}
                          </Table>

                          <div
                              style={{
                                  "marginTop": "1vw",
                                  "display": "flex",
                                  "width": "28vw",
                                  "justifyContent": "space-between"
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
                                  colorButton="#9E4B00 "
                                  heightButton="2vw"
                                  textButton="Registrar novo técnico"
                                  widthButton="20vw"
                                  textColor="white"
                                  onClick={() => {

                                      setIsTecnico(true);
                                      setPaginas(() => ({
                                          ...updatedPages,
                                          "userRegister": true
                                      }));

                                  }}
                              />
                          </div>
                      </>
                      : null}
              </UsersPage>

              <UsersPage
                  initial={{"opacity": 0}}
                  animate={{"y": criadorPage
                      ? 0
                      : -50,
                  "opacity": criadorPage
                      ? 1
                      : 0}}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${criadorPage
                          ? "block"
                          : "none"}`,
                      "pointerEvents": `${criadorPage
                          ? "auto"
                          : "none"}`
                  }}
              >
                  <div style={{"width": "4vw"}}>
                      <Image
                          alt="Logo"
                          style={{"width": "100%",
                              "height": "auto",
                              "objectFit": "cover"}}
                      />
                  </div>
                  <Text
                      fontFamily="pop"
                      size={"1.5vw"}
                      text="Todos os Criadores da ABCPD"
                      color="black"
                      fontWeight="600"
                  />

                  <div style={{"width": "30%"}}>
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
                                  size={"1.3vw"}
                                  text="Nome Completo"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Cidade"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                          <th>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1.3vw"}
                                  text="Opções"
                                  color="black"
                                  fontWeight="400"
                              />
                          </th>
                      </TableHeader>

                      {criadores.map((index: CriadorDTO) => <TableContent key={index.id}>
                          <td>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text={index.nomeCompleto}
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>
                          <td>
                              <Text
                                  textAlign="center"
                                  fontFamily="rob"
                                  size={"1vw"}
                                  text={index.nomeCidade}
                                  color="black"
                                  fontWeight="400"
                              />
                          </td>
                          <td>
                              <div
                                  style={{
                                      "display": "flex",
                                      "width": "100%",
                                      "justifyContent": "center"
                                  }}
                              >
                                  <Button
                                      onClick={() => {

                                          setPaginas((prev) => ({
                                              ...updatedPages,
                                              "criadorRegister": !prev.criadorRegister
                                          }));

                                          setCriadorSelecionado(index);

                                      }}
                                      marginTopImage="0.6vw"
                                      radius="2.5vw"
                                      marginLeftImage="0vw"
                                      marginRightImage="0vw"
                                      src={seta}
                                      colorButton="white"
                                      heightButton="2.8vw"
                                      widthImage="100%"
                                      widthButton="3vw"
                                      textColor="white"
                                  />
                              </div>
                          </td>
                      </TableContent>)}
                  </Table>

                  <div
                      style={{
                          "marginTop": "1vw",
                          "display": "flex",
                          "width": "28vw",
                          "justifyContent": "space-between"
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
                          colorButton="#9E4B00 "
                          heightButton="2vw"
                          textButton="Registrar novo criador"
                          widthButton="20vw"
                          textColor="white"
                          onClick={() => {

                              setIsTecnico(false);
                              setPaginas(() => ({
                                  ...updatedPages,
                                  "userRegister": true
                              }));

                          }}
                      />
                  </div>
              </UsersPage>

              <UserRegister
                  initial={{"opacity": 0}}
                  animate={{
                      "y": criadorRegister
                          ? 0
                          : -50,
                      "opacity": criadorRegister
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${criadorRegister
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${criadorRegister
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {criadorRegister
                      ? <>
                          <div style={{"width": "10vw"}}>
                              <Image
                                  alt="logoAnimal"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              text="Registro do Criador"
                              fontFamily="pop"
                              fontWeight="700"
                              size="1.8vw"
                              color="black"
                          />
                          <Text
                              text="Informações"
                              fontFamily="rob"
                              fontWeight="600"
                              size="1.6vw"
                              color="black"
                          />

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Nome Completo"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.nomeCompleto}
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Email"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={
                                          todosUsuarios.find((index) => index.id === criadorSelecionado.userId).email
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="CPF/CNPJ"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={
                                          todosUsuarios.find((index) => index.id === criadorSelecionado.userId).cpf
                                      }
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="RG"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.rg}
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Endereço"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.nomeRua}
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Bairro"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.nomeBairro}
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Cidade"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.nomeCidade}
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Estado"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.nomeEstado}
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="CEP"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={criadorSelecionado.cep}
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Telefone"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      style={{"fontSize": "1.3vw"}}
                                      value={
                                          todosUsuarios.find((index) => index.id === criadorSelecionado.userId).telefone
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <div
                              style={{
                                  "display": "flex",
                                  "marginTop": "5vw",
                                  "justifyContent": "space-between",
                                  "width": "40%",
                                  "marginLeft": "38vw",
                                  "marginBottom": "10vw"
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
                                  textButton="Editar"
                                  widthButton="7vw"
                                  textColor="white"
                              />
                              <Button
                                  colorButton="#BC433B"
                                  heightButton="2vw"
                                  textButton="Desativar Conta"
                                  widthButton="12vw"
                                  textColor="white"
                              />
                          </div>
                      </>
                      : null}
              </UserRegister>

              <UserRegister
                  initial={{"opacity": 0}}
                  animate={{
                      "y": tecnicoRegister
                          ? 0
                          : -50,
                      "opacity": tecnicoRegister
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${tecnicoRegister
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${tecnicoRegister
                          ? "auto"
                          : "none"}`
                  }}
              >
                  {tecnicoRegister
                      ? <>
                          <div style={{"width": "10vw"}}>
                              <Image
                                  alt="logoAnimal"
                                  style={{"width": "100%",
                                      "height": "auto",
                                      "objectFit": "cover"}}
                              />
                          </div>
                          <Text
                              text="Registro do Técnico"
                              fontFamily="pop"
                              fontWeight="700"
                              size="1.8vw"
                              color="black"
                          />
                          <Text
                              text="Informações"
                              fontFamily="rob"
                              fontWeight="600"
                              size="1.6vw"
                              color="black"
                          />

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Nome Completo"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={tecnicoSelecionado.nomeCompleto} />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Email"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todosUsuarios.find((index) => index.id === tecnicoSelecionado.userId).email
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="CPF/CNPJ"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todosUsuarios.find((index) => index.id === tecnicoSelecionado.userId).cpf
                                      }
                                  />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="RG"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={tecnicoSelecionado.rg} />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Endereço"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={tecnicoSelecionado.nomeRua} />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Bairro"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={tecnicoSelecionado.nomeBairro} />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Cidade"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={tecnicoSelecionado.nomeCidade} />
                              </InputPlace>

                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Estado"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText value={tecnicoSelecionado.nomeEstado} />
                              </InputPlace>
                          </InputPair>

                          <InputPair style={{"width": "90%"}}>
                              <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Telefone"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      value={
                                          todosUsuarios.find((index) => index.id === tecnicoSelecionado.userId).telefone
                                      }
                                  />
                              </InputPlace>
                          </InputPair>

                          <div
                              style={{
                                  "display": "flex",
                                  "marginTop": "5vw",
                                  "justifyContent": "space-between",
                                  "width": "40%",
                                  "marginLeft": "38vw",
                                  "marginBottom": "10vw"
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
                                  textButton="Editar"
                                  widthButton="7vw"
                                  textColor="white"
                              />
                              <Button
                                  colorButton="#BC433B"
                                  heightButton="2vw"
                                  textButton="Desativar Conta"
                                  widthButton="12vw"
                                  textColor="white"
                              />
                          </div>
                      </>
                      : null}
              </UserRegister>

              <TelaRegistroUsuario
                  initial={{"opacity": 0}}
                  animate={{
                      "y": userRegister
                          ? 0
                          : -50,
                      "opacity": userRegister
                          ? 1
                          : 0
                  }}
                  transition={{"duration": 0.5}}
                  style={{
                      "display": `${userRegister
                          ? "flex"
                          : "none"}`,
                      "pointerEvents": `${userRegister
                          ? "auto"
                          : "none"}`
                  }}
                  onSubmit={handleSubmit(registrarUsuario)}
              >
                  <>
                      <div style={{"width": "10vw"}}>
                          <Image
                              alt="logoAnimal"
                              style={{"width": "100%",
                                  "height": "auto",
                                  "objectFit": "cover"}}
                          />
                      </div>
                      <Text
                          text="Registrar usuario"
                          fontFamily="pop"
                          fontWeight="700"
                          size="1.8vw"
                          color="black"
                      />
                      <Text
                          text="Informações"
                          fontFamily="rob"
                          fontWeight="600"
                          size="1.6vw"
                          color="black"
                      />

                      <InputPair style={{"width": "90%"}}>
                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Nome Completo"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText {...register(
                                  "nomeCompleto",
                                  {"required": true}
                              )} />
                          </InputPlace>

                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Email"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "email",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>
                      </InputPair>

                      <InputPair style={{"width": "90%"}}>
                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="CPF"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "cpf",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>

                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="RG"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "rg",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>
                      </InputPair>

                      <InputPair style={{"width": "90%"}}>
                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Endereço"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "nomeRua",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>

                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Bairro"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "nomeBairro",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>
                      </InputPair>

                      <InputPair style={{"width": "90%"}}>
                          {isTecnico
                              ? null
                              : <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="Numero da casa"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      defaultValue={""}
                                      {...register(
                                          "numeroCasa",
                                          {"required": true}
                                      )}
                                  />
                              </InputPlace>
                          }

                          {isTecnico
                              ? null
                              : <InputPlace style={{"width": "47%"}}>
                                  <Text
                                      fontFamily="pop"
                                      size={"1.5vw"}
                                      text="CEP"
                                      color="black"
                                      fontWeight="300"
                                  />
                                  <InputText
                                      defaultValue={""}
                                      {...register(
                                          "cep",
                                          {"required": true}
                                      )}
                                  />
                              </InputPlace>
                          }
                      </InputPair>

                      <InputPair style={{"width": "90%"}}>
                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Cidade"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "nomeCidade",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>

                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Estado"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "nomeEstado",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>
                      </InputPair>
                      <InputPair style={{"width": "90%"}}>
                          <InputPlace style={{"width": "47%"}}>
                              <Text
                                  fontFamily="pop"
                                  size={"1.5vw"}
                                  text="Telefone"
                                  color="black"
                                  fontWeight="300"
                              />
                              <InputText
                                  defaultValue={""}
                                  {...register(
                                      "telefone",
                                      {"required": true}
                                  )}
                              />
                          </InputPlace>
                      </InputPair>

                      <div
                          style={{
                              "display": "flex",
                              "marginTop": "5vw",
                              "justifyContent": "space-between",
                              "width": "40%",
                              "marginLeft": "38vw",
                              "marginBottom": "10vw"
                          }}
                      >
                          {loading
                              ? <CircularProgress />
                              : <>
                                  {" "}
                                  <Button
                                      colorButton="black"
                                      heightButton="2vw"
                                      textButton="← Voltar"
                                      widthButton="7vw"
                                      textColor="white"
                                      type="button"
                                  />
                                  <Button
                                      colorButton="green"
                                      heightButton="2vw"
                                      textButton="Registrar"
                                      widthButton="12vw"
                                      textColor="white"
                                      onClick={() => {

                                          for (const componente in errors) {

                                              const mensagem = errors[componente];
                                              alert(mensagem.message);

                                          }

                                      }}
                                  />
                              </>
                          }
                      </div>
                  </>
              </TelaRegistroUsuario>
          </Content>
      </Container>
  );

}
