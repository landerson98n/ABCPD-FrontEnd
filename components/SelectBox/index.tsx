import { Select } from "./style"
import { Poppins } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})

interface SelectProps{
    width?: string
    height?: string
    border?: string
    borderColor?: string
    borderTop?: string
    borderLeft?: string
    borderRight?: string
    fontSize?: string
}

export function SelectBox(props: SelectProps){
    const {fontSize, height,width, border, borderColor, borderTop,borderLeft,borderRight } = props
    return(
    <Select style={{fontSize,height,width, border, borderColor:`${borderColor ?? 'black'}`, borderTop, borderLeft, borderRight}}  className={poppins.className} ></Select>)
}