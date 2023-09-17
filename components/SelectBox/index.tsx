import { Select } from './style'
import { Poppins } from 'next/font/google'
import { SelectHTMLAttributes } from 'react'

const poppins = Poppins({ weight: ['300'], subsets: ['latin'] })

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: string
  height?: string
  border?: string
  borderColor?: string
  borderTop?: string
  borderLeft?: string
  borderRight?: string
  fontSize?: string
}

export function SelectBox(props: SelectProps) {
  const {
    fontSize,
    height,
    width,
    border,
    borderColor,
    borderTop,
    borderLeft,
    borderRight,
    ...all
  } = props
  return (
    <Select
      {...all}
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
      className={poppins.className}
    ></Select>
  )
}
