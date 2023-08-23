import React from "react";
import { Poppins, Roboto } from 'next/font/google'

const poppins = Poppins({weight:['300'], subsets:['latin']})
const roboto  = Roboto ({weight:['300'], subsets:['latin']})

interface TextProps {
    fontFamily: 'pop' | 'rob';
    size: string,
    text: string,
    color: string,
    fontWeight: string
    
}

export function Text(props: TextProps){
    const { fontFamily, size, text, color, fontWeight } = props;
    return (
        <>
            <h1 style={{fontSize:`${size}`, color, fontWeight, textAlign:'justify'}} className={fontFamily == 'pop' ? poppins.className : roboto.className}>{text}</h1>
        </>
        
    )
}