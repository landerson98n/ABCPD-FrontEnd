import React from "react";
import {Text} from '../Text'

import {
    Container
} from './style'

interface ButtonProps{
    widthButton: string,
    heightButton: string,
    colorButton: string
    textButton: string,
    onClick?: ()=>void
}

export function Button(props: ButtonProps){
    const {widthButton, heightButton, colorButton, textButton, onClick} = props
    
    return (
       <Container onClick={onClick} style={{width:`${widthButton}`, height:`${heightButton}`, backgroundColor: `${colorButton}`, cursor:"pointer"}}>
            <Text fontFamily="pop" size={"1.2vw"} text={textButton} color="white" fontWeight="300"/>
       </Container>
    )
}