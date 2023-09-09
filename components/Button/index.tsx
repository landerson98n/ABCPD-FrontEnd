import React, { ButtonHTMLAttributes } from 'react'
import { Text } from '../Text'
import Image from 'next/legacy/image'

import { Container } from './style'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  widthButton: string
  heightButton: string
  colorButton: string
  textButton?: string
  onClick?: () => void
  src?: string
  widthImage?: string
  textColor?: string
  textSize?: string
  marginLeftImage?: string | number
  marginRightImage?: string
  radius?: string
  marginTopImage?: string
}

export function Button(props: ButtonProps) {
  const {
    marginTopImage,
    radius,
    marginRightImage,
    marginLeftImage,
    textSize,
    widthButton,
    heightButton,
    colorButton,
    textButton,
    onClick,
    src,
    widthImage,
    textColor,
    ...rest
  } = props

  return (
    <Container
      {...rest}
      onClick={onClick}
      style={{
        borderRadius: `${radius || '0.3vw'}`,
        alignItems: 'center',
        width: `${widthButton}`,
        height: `${heightButton}`,
        backgroundColor: `${colorButton}`,
        cursor: 'pointer',
        justifyContent: `${src && textButton ? 'start' : 'center'}`,
        border: 'none',
      }}
    >
      {src ? (
        <div
          style={{
            marginTop: `${marginTopImage}`,
            width: `${widthImage}`,
            marginRight: `${marginRightImage || '1vw'}`,
            marginLeft: `${marginLeftImage || '2vw'}`,
          }}
        >
          <Image
            src={src}
            alt="Logo"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
      ) : null}
      {textButton ? (
        <Text
          fontFamily="pop"
          size={textSize || '1.1vw'}
          text={textButton}
          color={textColor || 'white'}
          fontWeight="300"
        />
      ) : null}
    </Container>
  )
}
