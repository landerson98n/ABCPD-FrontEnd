import { Input } from "./style"
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})

interface InputProps{
    placeholder?: string
    type?: string
    width?: string
    height?: string
    border?: string
    borderColor?: string
    borderTop?: string
    borderLeft?: string
    borderRight?: string
    fontSize?: string
}

export function InputText(props: InputProps){
    const {fontSize, height,placeholder, type, width, border, borderColor, borderTop,borderLeft,borderRight } = props
    return(<Input style={{fontSize,height,width, border, borderColor:`${borderColor ?? 'black'}`, borderTop, borderLeft, borderRight}} type={type} placeholder={placeholder} className={poppins.className} ></Input>)
}