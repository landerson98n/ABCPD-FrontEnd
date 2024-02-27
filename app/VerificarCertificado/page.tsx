/* eslint-disable valid-typeof */
"use client";
import {useContext, useEffect, useState} from "react";
import Image from "next/legacy/image";
import {Container, Border} from "./style";
import {logo, logo2, logoCert} from "@/assets";
import {Text} from "@/components/Text";
import {InputText} from "@/components/InputText";
import {Tree, TreeNode} from "react-organizational-chart";
import AnimalDTO from "@/utils/AnimalDTO";
import format from "date-fns/format";
import {Button} from "@/components/Button";
import {getAnimalById} from "@/actions/animaisApi";
import {AlertContext} from "@/context/AlertContextProvider";
import {InputPlace, InputPair} from "@/components/styles/stylesTecnico";
import dynamic from "next/dynamic";
const DynamicTree = dynamic(
    () => import("@/components/Tree"),
    {
        "ssr": false
    }
);
export default function TecnicoPage () {

    const [
        animalData,
        setAnimalData
    ] = useState({
        "animal": {} as AnimalDTO,
        "fazendaName": "",
        "criadorName": ""
    });
    const {animal, fazendaName, criadorName} = animalData;
    const [
        id,
        setId
    ] = useState("");
    const {alert} = useContext(AlertContext);


    return (
        <>
            <div
                style={{
                    "width": "100%",
                    "justifyContent": "start",
                    "marginTop": "5vw",
                    "marginLeft": "25vw",
                    "marginBottom": "5vw"
                }}
            >
                <Button
                    widthButton="10%"
                    heightButton="3vw"
                    colorButton="black"
                    textButton="←  Voltar"
                    onClick={() => {

                        // Router.push("/");

                    }}
                />
            </div>

            <div
                style={{
                    "width": "50%",
                    "display": "flex",
                    "flexDirection": "column",
                    "alignItems": "end",
                    "justifyContent": "space-between",
                    "height": "13vw"
                }}
            >
                <InputPair style={{"width": "100%"}}>
                    <InputPlace style={{"width": "100%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Código de verificação"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText
                            width="98.8%"
                            fontSize="1.1vw"
                            onChange={(e) => {

                                setId(e.target.value);

                            }}
                        />
                    </InputPlace>
                </InputPair>
                <Button
                    widthButton="20%"
                    heightButton="3vw"
                    colorButton="#9E4B00"
                    textButton="Verificar"
                    onClick={async () => {

                        const data: AnimalDTO = await getAnimalById(id);
                        if (data.statusCode === 400) {

                            alert("Código inválido");

                        } else {

                            setAnimalData((prev) => ({
                                ...prev,
                                "animal": data,
                                "criadorName": data.criador?.nomeCompleto,
                                "fazendaName": data.fazendaAnimal?.nomeFazenda
                            }));

                        }

                    }}
                />
            </div>

            {Object.values(animal).length === 0
                ? null
                : <Border>
                    <div style={{"width": "100%",
                        "display": "flex"}}>
                        <Text
                            text="Certificado de Registro Genealógico"
                            fontFamily="pop"
                            color="black"
                            fontWeight="400"
                            size="2vw"
                        />
                    </div>

                    <div
                        style={{
                            "display": "flex",
                            "justifyContent": "space-between",
                            "width": "100%"
                        }}
                    >
                        <InputPair style={{"width": "47%"}}>
                            <InputPlace style={{"width": "20%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Número"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText
                                    fontSize="1.1vw"
                                    disabled
                                    value={"" || animal?.nomeAnimal}
                                />
                            </InputPlace>

                            <InputPlace style={{"width": "74%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Criador"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText fontSize="1.1vw" value={criadorName} disabled />
                            </InputPlace>
                        </InputPair>

                        <InputPair style={{"width": "47%"}}>
                            <InputPlace style={{"width": "64%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Fazenda"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText
                                    fontSize="1.1vw"
                                    value={"" || fazendaName}
                                    disabled
                                />
                            </InputPlace>
                        </InputPair>
                    </div>

                    <div
                        style={{
                            "display": "flex",
                            "justifyContent": "space-between",
                            "width": "100%"
                        }}
                    >
                        <InputPair style={{"width": "47%"}}>
                            <InputPlace style={{"width": "47%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Sexo"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText
                                    fontSize="1.1vw"
                                    disabled
                                    value={"" || animal?.sexoAnimal}
                                />
                            </InputPlace>

                            <InputPlace style={{"width": "47%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Pelagem"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText
                                    fontSize="1.1vw"
                                    value={"" || animal?.pelagemAnimal}
                                    disabled
                                />
                            </InputPlace>
                        </InputPair>

                        <InputPair style={{"width": "47%"}}>
                            <InputPlace style={{"width": "47%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Registro"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText
                                    fontSize="1.1vw"
                                    disabled
                                    value={"" || animal?.registro}
                                />
                            </InputPlace>

                            <InputPlace style={{"width": "47%"}}>
                                <Text
                                    fontFamily="pop"
                                    size={"1.5vw"}
                                    text="Data de nascimento"
                                    color="black"
                                    fontWeight="300"
                                />
                                <InputText
                                    fontSize="1.1vw"
                                    value={"" || animal?.dataNascimentoAnimal}
                                    disabled
                                />
                            </InputPlace>
                        </InputPair>
                    </div>

                    <div
                        style={{"width": "100%",
                            "justifyContent": "center",
                            "display": "flex"}}
                    >
                        <div
                            style={{
                                "width": "60%",
                                "display": "flex",
                                "justifyContent": "space-between",
                                "marginTop": "1vw",
                                "alignItems": "center",
                                "marginBottom": "2vw"
                            }}
                        >
                            <div style={{"width": "15vw"}}>
                                <Image
                                    src={logo}
                                    style={{"width": "10vw",
                                        "height": "10vw"}}
                                    alt="logo"
                                />
                            </div>

                            <div style={{"width": "40%",
                                "rotate": "270deg",
                                "marginTop": "3vw"}}>
                                {typeof document !== "undefined" && <DynamicTree />}

                            </div>
                        </div>
                    </div>

                    <InputPair style={{"width": "80%"}}>
                        <InputPlace style={{"width": "30%"}}>
                            <Text
                                fontFamily="pop"
                                size={"1.5vw"}
                                text="Data de emissão"
                                color="black"
                                fontWeight="300"
                            />
                            <InputText
                                fontSize="1.1vw"
                                disabled
                                value={format(
                                    Date.now(),
                                    "dd/MM/yyyy"
                                )}
                            />
                        </InputPlace>

                        <InputPlace style={{"width": "64%"}}>
                            <Text
                                fontFamily="pop"
                                size={"1.5vw"}
                                text="Código de verficação"
                                color="black"
                                fontWeight="300"
                            />
                            <InputText
                                width="30vw"
                                fontSize="1.1vw"
                                value={animal?.id}
                                disabled
                            />
                        </InputPlace>
                    </InputPair>
                </Border>
            }
        </>);

}
