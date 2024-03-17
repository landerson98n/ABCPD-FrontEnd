import {InputText} from "../Login/style";
import {Text} from "@/components/Text";
import Image from "next/image";
import React, {useContext, useState} from "react";
import {Content, InputPair, InputPlace} from "@/components/styles/stylesTecnico";
import {Button} from "@/components/Button";
import {logo2Branca} from "@/assets";
import {ComunicacaoNascimentoDto} from "@/utils/ComunicacaoNascimentoDTO";
import {useForm} from "react-hook-form";
import AnimalDTO from "@/utils/AnimalDTO";
import {CreateAnimal} from "@/actions/animaisApi";
import {AlertContext} from "@/context/AlertContextProvider";
import {CircularProgress} from "@mui/material";

export function ViewComunicNascimento (data: ComunicacaoNascimentoDto, criadorId: string, token: string) {


    const {alert} = useContext(AlertContext);

    const [
        images,
        setImages
    ] = useState({
        "selectedImage1": {} as File,
        "selectedImage2": {} as File,
        "selectedImage3": {} as File,
        "selectedImage4": {} as File
    });

    const {
        register,
        handleSubmit,
        "formState": {errors},
        setValue
    } = useForm({
        "criteriaMode": "all",
        "mode": "all",
        "defaultValues": {"anoAvalicao": "",
            "sexo": "",
            "pelagem": "",
            "dataNascimento": "",
            "mesAvalicao": "",
            "imagem01": "",
            "imagem02": "",
            "imagem03": "",
            "imagem04": ""}
    });


    const convertToBase64 = async (file) => new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);

    });

    const [
        loading,
        setLoading
    ] = useState(false);

    async function send (animalData: AnimalDTO) {

        setLoading(true);
        if (animalData.mae == "") {

            animalData.mae = null;

        }

        if (animalData.pai == "") {

            animalData.pai = null;

        }

        const base64Image01 = await convertToBase64(new Blob([images.selectedImage1]));
        const base64Image02 = await convertToBase64(new Blob([images.selectedImage2]));
        const base64Image03 = await convertToBase64(new Blob([images.selectedImage3]));
        const base64Image04 = await convertToBase64(new Blob([images.selectedImage4]));

        const animal: AnimalDTO = {
            ...animalData,
            "criadorAnimal": criadorId,
            "registradoRGDSuper": false,
            "registradoRGDTecnico": false,
            "registradoRGNSuper": false,
            "registradoRGNTecnico": true,
            "dataRGNAnimalTecnico": new Date().toISOString(),
            "decisaoAnimalTecnicoRGN": "Registrado",
            "registroGeral": "",
            "image01": base64Image01,
            "image02": base64Image02,
            "image03": base64Image03,
            "image04": base64Image04,
            "flag": 0
        };

        const response = await CreateAnimal(
            animal,
            token
        );

        if (!response?.message) {

            alert(
                "Animal criado com sucesso",
                "success"
            );
            Object.keys(animalData).forEach((fieldName) => {

                setValue(
                    fieldName,
                    ""
                );

            });
            setLoading(false);

        }

    }
    return (
        <Content>
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
                text="Registro de um Novo Bezerro | ABCPD"
                fontFamily="pop"
                fontWeight="700"
                size="1.8vw"
                color="black"
            />
            <form onSubmit={handleSubmit(send)}>

                <InputPair style={{"width": "90%"}}>
                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Mês Da Avaliação"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText {...register(
                            "mesAvalicao",
                            {
                                "required": "Digite o mês de avaliação"
                            }
                        )}/>
                    </InputPlace>

                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Ano Da Avaliação"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText {...register(
                            "anoAvalicao",
                            {
                                "required": "Digite o ano de avaliação"
                            }
                        )}/>
                    </InputPlace>
                </InputPair>

                <InputPair style={{"width": "90%"}}>
                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Sexo do Animal"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText {...register(
                            "sexo",
                            {
                                "required": "Digite o sexo do animal"
                            }
                        )}/>
                    </InputPlace>

                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Pelagem do Animal"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText {...register(
                            "pelagem",
                            {
                                "required": "Digite a pelagem do animal"
                            }
                        )}/>
                    </InputPlace>
                </InputPair>

                <InputPair style={{"width": "90%"}}>
                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Data de Nascimento"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText type="date" {...register(
                            "dataNascimento",
                            {
                                "required": "Selecione a data de nascimento"
                            }
                        )}/>
                    </InputPlace>
                </InputPair>

                <InputPair style={{"width": "90%"}}>
                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Imagem 01"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText
                            fontSize="1.4vw"
                            height="3vw"
                            type="file"
                            accept="image/*"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                const file = event.target.files && event.target.files[0];
                                if (file) {

                                    setImages((images) => ({
                                        ...images,
                                        "selectedImage1": file
                                    }));

                                }

                            }}
                            {...register(
                                "imagem01",
                                {
                                    "required": "Selecione 4 imagens"
                                }
                            )}

                        />
                    </InputPlace>

                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Imagem 02"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText
                            fontSize="1.4vw"
                            height="3vw"
                            type="file"
                            accept="image/*"
                            {...register(
                                "imagem02",
                                {
                                    "required": "Selecione 4 imagens"
                                }
                            )}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                const file = event.target.files && event.target.files[0];
                                if (file) {

                                    setImages((images) => ({
                                        ...images,
                                        "selectedImage2": file
                                    }));

                                }

                            }}
                        />
                    </InputPlace>
                </InputPair>

                <InputPair style={{"width": "90%"}}>
                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Imagem 03"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText
                            fontSize="1.4vw"
                            height="3vw"
                            type="file"
                            accept="image/*"
                            {...register(
                                "imagem03",
                                {
                                    "required": "Selecione 4 imagens"
                                }
                            )}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                const file = event.target.files && event.target.files[0];
                                if (file) {

                                    setImages((images) => ({
                                        ...images,
                                        "selectedImage3": file
                                    }));

                                }

                            }}
                        />
                    </InputPlace>

                    <InputPlace style={{"width": "47%"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Imagem 04"
                            color="black"
                            fontWeight="300"
                        />
                        <InputText
                            fontSize="1.4vw"
                            height="3vw"
                            type="file"
                            accept="image/*"
                            {...register(
                                "imagem04",
                                {
                                    "required": "Selecione 4 imagens"
                                }
                            )}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                                const file = event.target.files && event.target.files[0];
                                if (file) {

                                    setImages((images) => ({
                                        ...images,
                                        "selectedImage4": file
                                    }));

                                }

                            }}
                        />
                    </InputPlace>
                </InputPair>

                <div
                    style={{
                        "display": "flex",
                        "marginTop": "1vw",
                        "justifyContent": "space-between",
                        "width": "35%",
                        "marginLeft": "41.9vw",
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
                    {loading
                        ? <CircularProgress size={"2vw"} />
                        : <Button
                            colorButton="#9E4B00"
                            heightButton="2vw"
                            textButton="Registrar Animal"
                            widthButton="17vw"
                            textColor="white"
                            onClick={() => {

                                for (const componente in errors) {

                                    const mensagem = errors[componente];
                                    alert(mensagem?.message);

                                }

                            }}
                        />
                    }

                </div>

            </form>

        </Content>
    );

}
