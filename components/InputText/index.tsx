import { Input } from "./style"
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})

interface InputProps{
    placeholder?: string
    type?: string
    width?: string
    border?: string
    borderColor?: string
    borderTop?: string
    borderLeft?: string
    borderRight?: string
}

export function InputText(props: InputProps){
    const {placeholder, type, width, border, borderColor, borderTop,borderLeft,borderRight } = props
    return(<Input style={{width, border, borderColor, borderTop, borderLeft, borderRight}} type={type} placeholder={placeholder} className={poppins.className} ></Input>)
}