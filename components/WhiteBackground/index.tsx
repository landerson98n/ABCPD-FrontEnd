import { Container } from "./style";

interface WhiteBackgroundProps{
    height: string,
    width: string,
    children: React.JSX.Element
}

export function WhiteBackground(contenProps:WhiteBackgroundProps){
    const {height, width, children} = contenProps
    return(
        <Container style={{height, width} }>{children}</Container>
    )

}