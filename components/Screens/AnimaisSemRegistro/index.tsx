/* eslint-disable array-callback-return */
import {InputText} from "@/components/InputText";
import {Text} from "@/components/Text";
import Image from "next/image";
import React, {useState} from "react";
import {Content, Table, TableContent, TableHeader} from "@/components/styles/stylesTecnico";
import {Button} from "@/components/Button";
import {add, logo2Branca, seta, waiting} from "@/assets";
import AnimalDTO from "@/utils/AnimalDTO";
import CriadorDTO from "@/utils/CriadorDTO";
import FazendaDTO from "@/utils/FazendaDTO";
import {getFazendaById} from "@/actions/fazendaApi";
import {getCriadorById} from "@/actions/criadorApi";


interface CriadoresABCPDDTO {
    todosAnimais: AnimalDTO[]
    criadores: CriadorDTO[]
    todasFazendas: FazendaDTO[]
    token: string
    onPageChange: (page: any) => void;
    onCriadorChange: (property: string, data:any) => void;
    onAnimalChange: (property: string, data:any) => void;
}

export function AnimaisRegistro (data: CriadoresABCPDDTO) {

    const {onPageChange, todosAnimais, criadores, todasFazendas, onAnimalChange} = data;
    const [
        loading,
        setLoading
    ] = useState(false);

    async function getInformacoesAnimal (animal: AnimalDTO) {

        setLoading(true);

        const fazenda: FazendaDTO = await getFazendaById(
            data.token,
            animal.fazenda
        );
        const criador: CriadorDTO = await getCriadorById(
            animal.criadorAnimal,
            data.token
        );

        onAnimalChange(
            "fazendaSelecionado",
            fazenda
        );
        onAnimalChange(
            "criadorSelecionado",
            criador
        );
        onAnimalChange(
            "maeSelecionado",
            todosAnimais.find((index: AnimalDTO) => index.id == animal.mae) || {} as AnimalDTO
        );
        onAnimalChange(
            "paiSelecionado",
            todosAnimais.find((index: AnimalDTO) => index.id == animal.pai) || {} as AnimalDTO
        );


        setLoading(false);

    }

    return (
        <Content>
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
                text="Todos os Animais que Precisam do Registro | ABCPD"
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
                    ? todosAnimais.map((index: AnimalDTO) => {

                        if (!index.decisaoAnimalTecnicoRGD) {

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
                                                    onAnimalChange(
                                                        "animalSelecionado",
                                                        index
                                                    );
                                                    onAnimalChange(
                                                        "resgistro",
                                                        true
                                                    );
                                                    onPageChange("verAnimaRGDPage");

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
        </Content>
    );

}
