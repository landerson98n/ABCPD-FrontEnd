import { Select } from "./style"
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})



export function SelectBox(){

    return(
    <Select  className={poppins.className} >
    </Select>)
}