import React from "react";
import {Text} from '../Text'
import Image from "next/image";

import {
    Container
} from './style'

interface ButtonProps{
    widthButton: string,
    heightButton: string,
    colorButton: string
    textButton: string,
    onClick?: ()=>void
    src?: string,
    widthImage?: string,
    textColor?: string,
    textSize?: string,
    marginLeftImage?: string | number,
    marginRightImage?: string
}

export function Button(props: ButtonProps){
    const {marginRightImage,marginLeftImage,textSize,widthButton, heightButton, colorButton, textButton, onClick, src, widthImage, textColor} = props
    
    return (
       <Container onClick={onClick} style={{width:`${widthButton}`, height:`${heightButton}`, backgroundColor: `${colorButton}`, cursor:"pointer", justifyContent:`${src? 'start': 'center'}`}}>
            {src? <div style={{width:`${widthImage}`, marginRight:`${marginRightImage? marginRightImage: '1vw'}`, marginLeft:`${marginLeftImage? marginLeftImage: '2vw'}`}}>
                 <Image src={src} alt="Logo" layout='responsive' objectFit='contain' /> 
            </div> : null }
            <Text fontFamily="pop" size={textSize? textSize : "1.2vw"} text={textButton} color={textColor? textColor : 'white'} fontWeight="300"/>
       </Container>
    )
}