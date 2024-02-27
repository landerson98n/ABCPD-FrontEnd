import React from "react";
import {Content, Table, TableContent, TableHeader} from "@/components/styles/stylesTecnico";
import Image from "next/image";
import {Text} from "@/components/Text";
import {InputText} from "@/components/InputText";
import {Button} from "@/components/Button";
import {logo2Branca, seta} from "@/assets";
import FazendaDTO from "@/utils/FazendaDTO";
import CriadorDTO from "@/utils/CriadorDTO";
import {getComunicacoesNascimentoCriador} from "@/actions/comunicacaoNascimento";

interface FazendaCriadorDTO {
    todasFazendas: FazendaDTO[]
    CriadoresData: CriadorDTO[]
    token: string
    onNascimentosChange: (novosNascimentos: any) => void;
    onPageChange: (page: any) => void;
}


export function FazendaCriador (data: FazendaCriadorDTO) {

    const {todasFazendas, CriadoresData, token, onNascimentosChange, onPageChange} = data;


    async function getNascimentos (id: string) {

        const nascimentoData = await getComunicacoesNascimentoCriador(
            token,
            id
        );
        onNascimentosChange(nascimentoData);

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
                                        CriadoresData?.find((indexFind: CriadorDTO) => indexFind.id === index.criadorFazenda) || {}
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
                                        onPageChange("todasComunicNascPage");

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
        </Content>
    );

}
