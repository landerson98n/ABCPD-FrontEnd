import { Select } from "./style"
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})



export function SelectBox(){

    return(
    <Select  className={poppins.className} >
        <option value="opcao1">Opção 1</option>
        <option value="opcao2">Opção 2</option>
    </Select>)
}