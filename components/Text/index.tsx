import React, {TextareaHTMLAttributes} from "react";
import {Poppins, Roboto} from "next/font/google";
import Image from "next/legacy/image";


type TextAlign = "left" | "center" | "right" | "justify"

interface TextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fontFamily: "pop" | "rob"
  size: string
  text: string
  color: string
  fontWeight: string
  widthImage?: string
  src?: string
  textAlign?: TextAlign
}

export function Text (props: TextProps) {

    const {
        fontFamily,
        size,
        text,
        color,
        fontWeight,
        textAlign,
        widthImage,
        src,
        ...rest
    } = props;
    return (
        <>
            {src
                ? <div
                    style={{
                        "width": "100%",
                        "display": "flex",
                        "alignItems": "center",
                        "justifyContent": "center"
                    }}
                >
                    <div style={{"width": `${widthImage}`,
                        "marginTop": "0.3vw"}}>
                        <Image
                            src={src}
                            alt="Logo"
                            style={{"width": "100%",
                                "height": "auto",
                                "objectFit": "cover"}}
                        />
                    </div>
                    <h1
                        style={{
                            "fontSize": `${size}`,
                            color,
                            fontWeight,
                            "textAlign": `${textAlign || "justify"}`
                        }}

                    >
                        {text}
                    </h1>
                </div>
                : <h1
                    style={{
                        "fontSize": `${size}`,
                        color,
                        fontWeight,
                        "textAlign": `${textAlign || "justify"}`
                    }}

                >
                    {text}
                </h1>
            }
        </>
    );

}
