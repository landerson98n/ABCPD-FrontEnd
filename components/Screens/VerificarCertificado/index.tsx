/* eslint-disable no-constant-binary-expression */


/*
 * Import Image from "next/legacy/image";
 * import {Container, Border} from "./style";
 * import {logo, logo2, logoCert} from "@/assets";
 * import {InputPair, InputPlace} from "../Register/style";
 * import {Text} from "../../Text";
 */

/*
 * Import {InputText} from "../../InputText";
 * import {Tree, TreeNode} from "react-organizational-chart";
 * import AnimalDTO from "@/utils/AnimalDTO";
 * import format from "date-fns/format";
 * import {Button} from "../../Button";
 * import {getAnimalById} from "@/actions/animaisApi";
 * import {useContext, useEffect, useState} from "react";
 * import {AlertContext} from "@/context/AlertContextProvider";
 */


export function VerificarCertificado () {

    /*
     * Const [
     *     animalData,
     *     setAnimalData
     * ] = useState({
     *     "animal": {} as AnimalDTO,
     *     "fazendaName": "",
     *     "criadorName": ""
     * });
     * const {animal, fazendaName, criadorName} = animalData;
     * const [
     *     id,
     *     setId
     * ] = useState("");
     * const {alert} = useContext(AlertContext);
     */
    return (
        <></>

    /*
     * <Container>
     *     <div
     *         style={{
     *             "width": "100%",
     *             "justifyContent": "start",
     *             "marginTop": "5vw",
     *             "marginLeft": "25vw",
     *             "marginBottom": "5vw"
     *         }}
     *     >
     *         <Button
     *             widthButton="10%"
     *             heightButton="3vw"
     *             colorButton="black"
     *             textButton="←  Voltar"
     *             onClick={() => {
     */

    //                 // Router.push("/");

    /*
     *             }}
     *         />
     *     </div>
     */

    /*
     *     <div
     *         Style={{
     *             "width": "50%",
     *             "display": "flex",
     *             "flexDirection": "column",
     *             "alignItems": "end",
     *             "justifyContent": "space-between",
     *             "height": "13vw"
     *         }}
     *     >
     *         <InputPair style={{"width": "100%"}}>
     *             <InputPlace style={{"width": "100%"}}>
     *                 <Text
     *                     FontFamily="pop"
     *                     Size={"1.5vw"}
     *                     Text="Código de verificação"
     *                     Color="black"
     *                     FontWeight="300"
     *                 />
     *                 <InputText
     *                     Width="98.8%"
     *                     FontSize="1.1vw"
     *                     OnChange={(e) => {
     */

    //                         SetId(e.target.value);

    /*
     *                     }}
     *                 />
     *             </InputPlace>
     *         </InputPair>
     *         <Button
     *             WidthButton="20%"
     *             HeightButton="3vw"
     *             ColorButton="#9E4B00"
     *             TextButton="Verificar"
     *             OnClick={async () => {
     */

    /*
     *                 Const data: AnimalDTO = await getAnimalById(id);
     *                 If (data.statusCode === 400) {
     */

    //                     Alert("Código inválido");

    //                 } else {

    /*
     *                     SetAnimalData((prev) => ({
     *                         ...prev,
     *                         "animal": data,
     *                         "criadorName": data.criador?.nomeCompleto,
     *                         "fazendaName": data.fazendaAnimal?.nomeFazenda
     *                     }));
     */

    //                 }

    /*
     *             }}
     *         />
     *     </div>
     */

    /*
     *     {Object.values(animal).length === 0
     *         ? null
     *         : <Border>
     *             <div style={{"width": "100%",
     *                 "display": "flex"}}>
     *                 <Text
     *                     Text="Certificado de Registro Genealógico"
     *                     FontFamily="pop"
     *                     Color="black"
     *                     FontWeight="400"
     *                     Size="2vw"
     *                 />
     *             </div>
     */

    /*
     *             <div
     *                 Style={{
     *                     "display": "flex",
     *                     "justifyContent": "space-between",
     *                     "width": "100%"
     *                 }}
     *             >
     *                 <InputPair style={{"width": "47%"}}>
     *                     <InputPlace style={{"width": "20%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Número"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText
     *                             FontSize="1.1vw"
     *                             Disabled
     *                             Value={"" || animal?.nomeAnimal}
     *                         />
     *                     </InputPlace>
     */

    /*
     *                     <InputPlace style={{"width": "74%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Criador"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText fontSize="1.1vw" value={criadorName} disabled />
     *                     </InputPlace>
     *                 </InputPair>
     */

    /*
     *                 <InputPair style={{"width": "47%"}}>
     *                     <InputPlace style={{"width": "64%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Fazenda"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText
     *                             FontSize="1.1vw"
     *                             Value={"" || fazendaName}
     *                             Disabled
     *                         />
     *                     </InputPlace>
     *                 </InputPair>
     *             </div>
     */

    /*
     *             <div
     *                 Style={{
     *                     "display": "flex",
     *                     "justifyContent": "space-between",
     *                     "width": "100%"
     *                 }}
     *             >
     *                 <InputPair style={{"width": "47%"}}>
     *                     <InputPlace style={{"width": "47%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Sexo"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText
     *                             FontSize="1.1vw"
     *                             Disabled
     *                             Value={"" || animal?.sexoAnimal}
     *                         />
     *                     </InputPlace>
     */

    /*
     *                     <InputPlace style={{"width": "47%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Pelagem"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText
     *                             FontSize="1.1vw"
     *                             Value={"" || animal?.pelagemAnimal}
     *                             Disabled
     *                         />
     *                     </InputPlace>
     *                 </InputPair>
     */

    /*
     *                 <InputPair style={{"width": "47%"}}>
     *                     <InputPlace style={{"width": "47%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Registro"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText
     *                             FontSize="1.1vw"
     *                             Disabled
     *                             Value={"" || animal?.registro}
     *                         />
     *                     </InputPlace>
     */

    /*
     *                     <InputPlace style={{"width": "47%"}}>
     *                         <Text
     *                             FontFamily="pop"
     *                             Size={"1.5vw"}
     *                             Text="Data de nascimento"
     *                             Color="black"
     *                             FontWeight="300"
     *                         />
     *                         <InputText
     *                             FontSize="1.1vw"
     *                             Value={"" || animal?.dataNascimentoAnimal}
     *                             Disabled
     *                         />
     *                     </InputPlace>
     *                 </InputPair>
     *             </div>
     */

    /*
     *             <div
     *                 Style={{"width": "100%",
     *                     "justifyContent": "center",
     *                     "display": "flex"}}
     *             >
     *                 <div
     *                     Style={{
     *                         "width": "60%",
     *                         "display": "flex",
     *                         "justifyContent": "space-between",
     *                         "marginTop": "1vw",
     *                         "alignItems": "center",
     *                         "marginBottom": "2vw"
     *                     }}
     *                 >
     *                     <div style={{"width": "15vw"}}>
     *                         <Image
     *                             Src={logo}
     *                             Style={{"width": "10vw",
     *                                 "height": "10vw"}}
     *                             Alt="logo"
     *                         />
     *                     </div>
     */

    /*
     *                     <div style={{"width": "40%",
     *                         "rotate": "270deg",
     *                         "marginTop": "3vw"}}>
     *                         <Tree
     *                             Label={
     *                                 <div
     *                                     Style={{
     *                                         "display": "flex",
     *                                         "justifyContent": "center",
     *                                         "rotate": "90deg"
     *                                     }}
     *                                 >
     *                                     <Text
     *                                         Text={animal?.nomeAnimal}
     *                                         FontFamily="rob"
     *                                         FontWeight="600"
     *                                         Size="1.6vw"
     *                                         Color="black"
     *                                     />
     *                                 </div>
     *                             }
     *                         >
     *                             <TreeNode
     *                                 Label={
     *                                     <div
     *                                         Style={{
     *                                             "display": "flex",
     *                                             "justifyContent": "center",
     *                                             "rotate": "90deg"
     *                                         }}
     *                                     >
     *                                         <Text
     *                                             Text={animal.maeAnimal?.nomeAnimal || ""}
     *                                             FontFamily="rob"
     *                                             FontWeight="600"
     *                                             Size="1.6vw"
     *                                             Color="black"
     *                                         />
     *                                     </div>
     *                                 }
     *                             >
     *                                 <TreeNode
     *                                     Label={
     *                                         <div
     *                                             Style={{
     *                                                 "rotate": "90deg",
     *                                                 "display": "flex",
     *                                                 "justifyContent": "center"
     *                                             }}
     *                                         >
     *                                             <Text
     *                                                 Text={animal.maeAnimal?.maeAnimal?.nomeAnimal}
     *                                                 FontFamily="rob"
     *                                                 FontWeight="600"
     *                                                 Size="1.6vw"
     *                                                 Color="black"
     *                                             />
     *                                         </div>
     *                                     }
     *                                 ></TreeNode>
     */

    /*
     *                                 <TreeNode
     *                                     Label={
     *                                         <div
     *                                             Style={{
     *                                                 "rotate": "90deg",
     *                                                 "display": "flex",
     *                                                 "justifyContent": "center"
     *                                             }}
     *                                         >
     *                                             <Text
     *                                                 Text={animal.maeAnimal?.paiAnimal?.nomeAnimal}
     *                                                 FontFamily="rob"
     *                                                 FontWeight="600"
     *                                                 Size="1.6vw"
     *                                                 Color="black"
     *                                             />
     *                                         </div>
     *                                     }
     *                                 ></TreeNode>
     *                             </TreeNode>
     */

    /*
     *                             <TreeNode
     *                                 Label={
     *                                     <div
     *                                         Style={{
     *                                             "rotate": "90deg",
     *                                             "display": "flex",
     *                                             "justifyContent": "center"
     *                                         }}
     *                                     >
     *                                         <Text
     *                                             Text={animal.paiAnimal?.nomeAnimal || ""}
     *                                             FontFamily="rob"
     *                                             FontWeight="600"
     *                                             Size="1.6vw"
     *                                             Color="black"
     *                                         />
     *                                     </div>
     *                                 }
     *                             >
     *                                 <TreeNode
     *                                     Label={
     *                                         <div
     *                                             Style={{
     *                                                 "rotate": "90deg",
     *                                                 "display": "flex",
     *                                                 "justifyContent": "center"
     *                                             }}
     *                                         >
     *                                             <Text
     *                                                 Text={animal.paiAnimal?.maeAnimal?.nomeAnimal || ""}
     *                                                 FontFamily="rob"
     *                                                 FontWeight="600"
     *                                                 Size="1.6vw"
     *                                                 Color="black"
     *                                             />
     *                                         </div>
     *                                     }
     *                                 ></TreeNode>
     */

    /*
     *                                 <TreeNode
     *                                     Label={
     *                                         <div
     *                                             Style={{
     *                                                 "rotate": "90deg",
     *                                                 "display": "flex",
     *                                                 "justifyContent": "center"
     *                                             }}
     *                                         >
     *                                             <Text
     *                                                 Text={animal.paiAnimal?.paiAnimal?.nomeAnimal || ""}
     *                                                 FontFamily="rob"
     *                                                 FontWeight="600"
     *                                                 Size="1.6vw"
     *                                                 Color="black"
     *                                             />
     *                                         </div>
     *                                     }
     *                                 ></TreeNode>
     *                             </TreeNode>
     *                         </Tree>
     *                     </div>
     *                 </div>
     *             </div>
     */

    /*
     *             <InputPair style={{"width": "80%"}}>
     *                 <InputPlace style={{"width": "30%"}}>
     *                     <Text
     *                         FontFamily="pop"
     *                         Size={"1.5vw"}
     *                         Text="Data de emissão"
     *                         Color="black"
     *                         FontWeight="300"
     *                     />
     *                     <InputText
     *                         FontSize="1.1vw"
     *                         Disabled
     *                         Value={format(
     *                             Date.now(),
     *                             "dd/MM/yyyy"
     *                         )}
     *                     />
     *                 </InputPlace>
     */

    /*
     *                 <InputPlace style={{"width": "64%"}}>
     *                     <Text
     *                         FontFamily="pop"
     *                         Size={"1.5vw"}
     *                         Text="Código de verficação"
     *                         Color="black"
     *                         FontWeight="300"
     *                     />
     *                     <InputText
     *                         Width="30vw"
     *                         FontSize="1.1vw"
     *                         Value={animal?.id}
     *                         Disabled
     *                     />
     *                 </InputPlace>
     *             </InputPair>
     *         </Border>
     *     }
     * </Container>
     */
    );

}
