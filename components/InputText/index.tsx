import { Input } from './style'
import { Poppins } from 'next/font/google'
import React, { InputHTMLAttributes } from 'react'

const poppins = Poppins({ weight: ['300'], subsets: ['latin'] })

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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

export function InputText(props: InputProps) {
  const {
    fontSize,
    height,
    placeholder,
    type,
    width,
    border,
    borderColor,
    borderTop,
    borderLeft,
    borderRight,
    ...rest
  } = props
  return (
    <Input
      {...rest}
      style={{
        fontSize,
        height,
        width,
        border,
        borderColor: `${borderColor ?? '#9E4B00'}`,
        borderTop,
        borderLeft,
        borderRight,
      }}
      type={type}
      placeholder={placeholder}
      className={poppins.className}
    ></Input>
  )
}
