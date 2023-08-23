import React from "react";
import {Text} from '../Text'

import {
    Container
} from './style'

interface ButtonProps{
    widthButton: string,
    heightButton: string,
    colorButton: string
    textButton: string
}

export function Button(props: ButtonProps){
    const {widthButton, heightButton, colorButton, textButton} = props
    return (
       <Container style={{width:`${widthButton}`, height:`${heightButton}`, backgroundColor: `${colorButton}`}}>
        <Text fontFamily="pop" size={"1.5vw"} text={textButton} color="white" fontWeight="300"/>
       </Container>
    )
}