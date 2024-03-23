/* eslint-disable complexity */
import {useState} from "react";
import {
    Home,
    arrowLeft,
    comunic,
    hamb,
    logo2Branca,
    user
} from "@/assets";
import {
    Container,
    Menu,
    Content,
    Header,
    DropdownMenu,
    Screen
} from "./style";
import Image from "next/legacy/image";
import {Button} from "../../Button";
import {Text} from "../../Text";
import {motion} from "framer-motion";
import CriadorDTO from "@/utils/CriadorDTO";
import {useQuery} from "react-query";
import AnimalDTO from "@/utils/AnimalDTO";
import {
    getTodasFazendas
} from "@/actions/fazendaApi";
import FazendaDTO from "@/utils/FazendaDTO";
import {getRebanhosAll} from "@/actions/RebanhApi";
import {
    getTodosAnimais
} from "@/actions/animaisApi";
import {CircularProgress} from "@mui/material";
import {CadastrarAnimal} from "../../Screens/CadastrarAnimal";
import {getRegistrosAnimalBase} from "@/actions/animalBaseApi";
import {SolicitacaoRegistroAnimalBaseDTO} from "@/utils/SolicitacaoDTO";
import RebanhoDTO from "@/utils/RebanhoDTO";
import {DetalhesAnimal} from "../../Screens/DetalhesAnimal";
import {getUserById} from "@/actions/user";
import UserDTO from "@/utils/UserDTO";
import jsonWebTokenService from "jsonwebtoken";
import {FazendaCriador} from "@/components/Screens/FazendaCriador";
import {CriadoresABCPD} from "@/components/Screens/CriadoresABCPD";
import {ComunicNascimento} from "@/components/Screens/ComunicNascimento";
import {AnimaisCriador} from "@/components/Screens/AnimaisCriador";
import {AnimaisRegistro} from "@/components/Screens/AnimaisSemRegistro";
import {RegistroAnimal} from "@/components/Screens/RegistroAnimalPA";
import {ViewComunicNascimento} from "@/components/Screens/ViewComunicNascimento";
import {ComunicacaoNascimentoDto} from "@/utils/ComunicacaoNascimentoDTO";

export function TecnicoDashboard (data: { token: string }) {

    const [
        paginas,
        setPaginas
    ] = useState({
        "animalPage": false,
        "verAnimalPage": false,
        "verAnimaRGDPage": false,
        "verAnimaisCriador": false,
        "initialPage": false,
        "comunicPage": false,
        "animalBasePage": false,
        "comunicNascPage": false,
        "todasComunicNascPage": false,
        "verComunicNascPage": false,
        "solicitacao": false,
        "menu": true,
        "RGD": false,
        "options": false,
        "loading": false
    });

    const [
        animalInfos,
        setAnimalInfos
    ] = useState({
        "animalSelecionado": {} as AnimalDTO,
        "fazendaSelecionado": {} as FazendaDTO,
        "criadorSelecionado": {} as CriadorDTO,
        "paiSelecionado": {} as AnimalDTO,
        "maeSelecionado": {} as AnimalDTO,
        "resgistro": false
    });

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
        animalBaseInfo,
        setAnimalBaseInfo
    ] = useState({
        "solicitacoesAnimaisBase": [] as SolicitacaoRegistroAnimalBaseDTO[],
        "solicitacoesAnimaisBaseSelecionada": {} as SolicitacaoRegistroAnimalBaseDTO
    });

    const [
        criadores,
        setCriadores
    ] = useState([]);

    const [
        nascimentos,
        setNascimentos
    ] = useState([]);

    const [
        typeCadastro,
        setTypeCadastro
    ] = useState([]);

    const [
        nascimentoSelecionado,
        setNascimentoSelecionado
    ] = useState({} as ComunicacaoNascimentoDto);

    const {solicitacoesAnimaisBase, solicitacoesAnimaisBaseSelecionada} = animalBaseInfo;
    const {animaisCriador, fazendasCriador, rebanhosCriador, criadorId} = criadorInfo;
    const {options, loading} = paginas;
    const {resgistro} = animalInfos;
    const decodedJwt = jsonWebTokenService.decode(data.token);

    const {
        "isLoading": isLoadingTecnicoUser,
        "data": tecnicoUser
    } = useQuery<UserDTO>(
        "tecnico",
        async () => getUserById(
            decodedJwt.sub,
            data.token
        )
    );

    const {
        "isLoading": isLoadingAnimais,
        "data": todosAnimais
    } = useQuery(
        "animais",
        async () => getTodosAnimais(data.token)
    );

    const {
        "isLoading": isLoadingRebanhos,
        "data": todosRebanhos
    } = useQuery(
        "rebanhos",
        async () => getRebanhosAll(data.token)
    );

    const {"data": todasFazendas, "isLoading": isLoadingFazendas} = useQuery(
        "fazendas",
        async () => getTodasFazendas(data.token)
    );


    const {
        isLoading,
        "data": CriadoresData
    } = useQuery(
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


    async function getSolicitacoes () {

        setPaginas((prev) => ({
            ...prev,
            "loading": true
        }));
        const response = await getRegistrosAnimalBase(data.token);
        const responseJson = await response.json();
        if (response.status == 200) {

            setAnimalBaseInfo((prev) => ({
                ...prev,
                "solicitacoesAnimaisBase": responseJson
            }));

            setPaginas((prev) => ({
                ...prev,
                "loading": false
            }));

        }

    }


    const handleNascimentosChange = (novosNascimentos: any) => {

        setNascimentos(novosNascimentos);

    };

    const handleCriadorChange = (property: string, data: any) => {

        setCriadorInfo((prev) => ({
            ...prev,
            [property]: data
        }));

    };

    const handleAnimalChange = (property: string, data: any) => {

        setAnimalInfos((prev) => ({
            ...prev,
            [property]: data
        }));

    };

    const handlePageChange = (property: string, comunicData: ComunicacaoNascimentoDto) => {

        setNascimentoSelecionado(comunicData);
        setPaginas((prevPaginas) => ({
            ...updatedPages,
            [property]: true
        }));

    };

    const updatedPages = {...paginas};

    for (const key in updatedPages) {

        if (key !== "menu") {

            updatedPages[key] = false;

        }

    }

    if (isLoading || isLoadingAnimais || isLoadingRebanhos || isLoadingFazendas || isLoadingTecnicoUser) {

        return <div style={{"width": "100%",
            "height": "100vh",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"}}><CircularProgress/></div>;

    }


    return (
        <>
            <Container>
                <Menu
                    initial={{"width": "20%"}}
                    animate={{"width": paginas.menu
                        ? "20%"
                        : "5%"}}
                    transition={{"duration": 0.5}}
                >
                    <motion.div
                        initial={{"x": "13vw"}}
                        transition={{"duration": 0.5}}
                        animate={{"x": paginas.menu
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
                        animate={{"x": paginas.menu
                            ? "0vw"
                            : "-20vw",
                        "opacity": paginas.menu
                            ? 1
                            : 0}}
                        style={{
                            "display": paginas.menu
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
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                /> */}
                            </div>

                            <div style={{"width": "10vw"}}>
                                {/* <Image
                  src={logoBranca}
                  alt="Logo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
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

                                    setPaginas((prev) => ({
                                        ...updatedPages,
                                        "initialPage": true
                                    }));

                                }}
                                colorButton={paginas.initialPage
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

                                    setCriadores(CriadoresData);
                                    setPaginas((prev) => ({
                                        ...updatedPages,
                                        "animalPage": !prev.animalPage
                                    }));

                                }}
                                colorButton={paginas.animalPage || paginas.RGD
                                    ? "black"
                                    : "#9E4B00"}
                                textButton="Animais"
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
                                colorButton={paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage
                                    ? "black"
                                    : "#9E4B00"}
                                textButton="Comunicações "
                            />
                            <Button
                                widthButton="16vw"
                                widthImage="1.5vw"
                                src={comunic}
                                heightButton="3.3vw"
                                onClick={() => {

                                    setPaginas((prev) => ({
                                        ...updatedPages,
                                        "solicitacao": !prev.solicitacao
                                    }));

                                }}
                                colorButton={paginas.solicitacao || paginas.verAnimalPage
                                    ? "black"
                                    : "#9E4B00"}
                                textButton="Solicitações "
                            />

                            <DropdownMenu
                                initial={{"opacity": 0}}
                                animate={{
                                    "y": paginas.animalPage || paginas.RGD
                                        ? "-6vw"
                                        : "-10vw",
                                    "opacity": paginas.animalPage || paginas.RGD
                                        ? 1
                                        : 0
                                }}
                                transition={{"duration": 0.5}}
                                style={{"pointerEvents": `${paginas.animalPage || paginas.RGD
                                    ? "auto"
                                    : "none"}`}}
                            >
                                <Button
                                    marginRightImage="0.6vw"
                                    marginLeftImage={"0.6vw"}
                                    textSize="0.9vw"
                                    textColor={paginas.RGD
                                        ? "white"
                                        : "black"}
                                    widthButton="100%"
                                    widthImage="0.5vw"
                                    src={arrowLeft}
                                    heightButton="3.3vw"
                                    onClick={() => {

                                        setPaginas((prev) => ({
                                            ...updatedPages,
                                            "animalPage": false,
                                            "RGD": !prev.RGD
                                        }));

                                    }}
                                    colorButton={paginas.RGD
                                        ? "black"
                                        : "white"}
                                    textButton="RGD"
                                />
                            </DropdownMenu>

                            <DropdownMenu
                                initial={{"opacity": 0}}
                                animate={{
                                    "y": paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage
                                        ? "-6vw"
                                        : "-12vw",
                                    "opacity": paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage
                                        ? 1
                                        : 0
                                }}
                                transition={{"duration": 0.5}}
                                style={{"pointerEvents": `${paginas.comunicPage || paginas.todasComunicNascPage || paginas.verComunicNascPage
                                    ? "auto"
                                    : "none"}`}}
                            >
                                <Button
                                    marginRightImage="0.6vw"
                                    marginLeftImage={"0.6vw"}
                                    textSize="0.9vw"
                                    textColor={paginas.comunicNascPage || paginas.todasComunicNascPage || paginas.verComunicNascPage
                                        ? "white"
                                        : "black"}
                                    widthButton="100%"
                                    widthImage="0.5vw"
                                    src={arrowLeft}
                                    heightButton="3.3vw"
                                    onClick={() => {

                                        setPaginas((prev) => ({
                                            ...updatedPages,
                                            "comunicPage": true,
                                            "comunicNascPage": !prev.comunicNascPage
                                        }));

                                    }}
                                    colorButton={paginas.comunicNascPage || paginas.todasComunicNascPage || paginas.verComunicNascPage
                                        ? "black"
                                        : "white"}
                                    textButton="Comunicações de Nascimento"
                                />
                            </DropdownMenu>

                            <DropdownMenu
                                initial={{"opacity": 0}}
                                animate={{
                                    "y": paginas.solicitacao
                                        ? "-6.4vw"
                                        : "-12vw",
                                    "opacity": paginas.solicitacao
                                        ? 1
                                        : 0
                                }}
                                transition={{"duration": 0.5}}
                                style={{"pointerEvents": `${paginas.solicitacao
                                    ? "auto"
                                    : "none"}`}}
                            >
                                <Button
                                    marginRightImage="0.6vw"
                                    marginLeftImage={"0.6vw"}
                                    textSize="0.9vw"
                                    textColor={paginas.animalBasePage
                                        ? "white"
                                        : "black"}
                                    widthButton="100%"
                                    widthImage="0.5vw"
                                    src={arrowLeft}
                                    heightButton="3.3vw"
                                    onClick={() => {

                                        getSolicitacoes();
                                        setPaginas((prev) => ({
                                            ...updatedPages,
                                            "solicitacao": true,
                                            "animalBasePage": !prev.animalBasePage
                                        }));

                                    }}
                                    colorButton={paginas.animalBasePage
                                        ? "black"
                                        : "white"}
                                    textButton="Solicitações de  Animais PA"
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
                                    : -50,
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
                                    style={{
                                        "width": "100%",
                                        "height": "auto",
                                        "objectFit": "cover"
                                    }}
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
                                    "width": "15vw"}}
                            >
                                <Text
                                    fontFamily="pop"
                                    size={"1.3vw"}
                                    text={`${tecnicoUser?.nomePrimeiro} ${tecnicoUser?.nomeUltimo} ⚙️`}
                                    color="black"
                                    fontWeight="600"
                                />
                            </div>
                        </div>
                    </Header>

                    {/* Bem vindo */}
                    <motion.div
                        animate={{
                            "y": paginas.initialPage
                                ? 0
                                : -50,
                            "opacity": paginas.initialPage
                                ? 1
                                : 0
                        }}
                        transition={{"duration": 0.5}}
                        style={{
                            "display": `${paginas.initialPage
                                ? "flex"
                                : "none"}`,
                            "pointerEvents": `${paginas.initialPage
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


                    {/* Criadores ABCPD */}
                    <Screen
                        initial={{"opacity": 0}}
                        animate={{"y": paginas.animalPage
                            ? 0
                            : -50,
                        "opacity": paginas.animalPage
                            ? 1
                            : 0}}
                        transition={{"duration": 0.5}}
                        style={{
                            "display": `${paginas.animalPage
                                ? "block"
                                : "none"}`,
                            "pointerEvents": `${paginas.animalPage
                                ? "auto"
                                : "none"}`
                        }}

                    >
                        <CriadoresABCPD
                            token={data.token}
                            onCriadorChange={handleCriadorChange}
                            criadores={criadores}
                            onPageChange={handlePageChange} />
                    </Screen>

                    {/* Animais Criador */}
                    <Screen
                        initial={{"opacity": 0}}
                        animate={{
                            "y": paginas.verAnimaisCriador
                                ? 0
                                : -50,
                            "opacity": paginas.verAnimaisCriador
                                ? 1
                                : 0
                        }}
                        transition={{"duration": 0.5}}
                        style={{
                            "display": `${paginas.verAnimaisCriador
                                ? "block"
                                : "none"}`,
                            "pointerEvents": `${paginas.verAnimaisCriador
                                ? "auto"
                                : "none"}`
                        }}
                    >
                        <AnimaisCriador
                            onAnimalChange={handleAnimalChange}
                            token={data.token}
                            onPageChange={handlePageChange}
                            onCriadorChange={handleCriadorChange}
                            animaisCriador={animaisCriador}
                            criadorId={criadorId}
                        />

                    </Screen>

                    {/* Animais Que Precisam de Registro */}
                    <Screen
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
                        <AnimaisRegistro
                            onCriadorChange={handleCriadorChange}
                            onPageChange={handlePageChange}
                            todasFazendas={todasFazendas}
                            todosAnimais={todosAnimais}
                            criadores={criadores}
                            token={data.token}
                            onAnimalChange={handleAnimalChange}/>
                    </Screen>

                    {/* Cadastro Animal */}
                    <Screen
                        initial={{"opacity": 0}}
                        animate={{
                            "y": paginas.verAnimalPage
                                ? 0
                                : -50,
                            "opacity": paginas.verAnimalPage
                                ? 1
                                : 0
                        }}
                        transition={{"duration": 0.5}}
                        style={{
                            "display": `${paginas.verAnimalPage
                                ? "flex"
                                : "none"}`,
                            "pointerEvents": `${paginas.verAnimalPage
                                ? "auto"
                                : "none"}`
                        }}
                    >
                        <CadastrarAnimal
                            solicitacaoBase={solicitacoesAnimaisBaseSelecionada}
                            typeCadastro={typeCadastro}
                            token={data.token}
                            criadorId={criadorId}
                            animaisCriador={animaisCriador}
                            fazendas={fazendasCriador}
                            rebanhos={todosRebanhos}/>
                    </Screen>

                    {/* Animal RGD */}
                    <Screen
                        initial={{"opacity": 0}}
                        animate={{
                            "y": paginas.verAnimaRGDPage
                                ? 0
                                : -50,
                            "opacity": paginas.verAnimaRGDPage
                                ? 1
                                : 0
                        }}
                        transition={{"duration": 0.5}}
                        style={{
                            "display": `${paginas.verAnimaRGDPage
                                ? "flex"
                                : "none"}`,
                            "pointerEvents": `${paginas.verAnimaRGDPage
                                ? "auto"
                                : "none"}`
                        }}
                    >

                        <DetalhesAnimal
                            TecnicoRGD={true}
                            animaisCriador={animaisCriador}
                            registro={resgistro}
                            token={data.token}
                            animalInfos={animalInfos}/>
                    </Screen>

                    {/* Solicitação de Registro de Animais Puros por Adjudicação */}
                    <Screen
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
                        <RegistroAnimal
                            CriadoresData={CriadoresData}
                            onAnimalChange={handleAnimalChange}
                            onCriadorChange={handleCriadorChange}
                            onPageChange={handlePageChange}
                            solicitacoesAnimaisBase={solicitacoesAnimaisBase}
                            todosRebanhos={todosRebanhos}
                            token={data.token}/>
                    </Screen>


                    {/* Fazenda Criador */}
                    <Screen
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
                        }}>
                        <FazendaCriador
                            onPageChange={handlePageChange}
                            onNascimentosChange={handleNascimentosChange}
                            token={data.token} CriadoresData={CriadoresData}
                            todasFazendas={todasFazendas}/>
                    </Screen>

                    {/* Comunicação de Nascimento */}
                    <Screen
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
                        <ComunicNascimento
                            nascimentos={nascimentos}
                            onPageChange={handlePageChange}
                            todosAnimais={todosAnimais}
                            token={data.token} />
                    </Screen>

                    {/* Ver Comunicação de Nascimento */}
                    <Screen
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
                        <ViewComunicNascimento criadorNascimentoId={criadorId} token={data.token} data={nascimentoSelecionado}/>
                    </Screen>

                </Content>
            </Container>
        </>
    );

}
