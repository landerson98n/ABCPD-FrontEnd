import { Input } from "./style"
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})

interface InputProps{
    placeholder?: string
    type?: string
}

export function InputText(props: InputProps){
    const {placeholder, type} = props
    return(<Input type={type} placeholder={placeholder} className={poppins.className} ></Input>)
}