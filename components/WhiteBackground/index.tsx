import { Container } from "./style";

interface WhiteBackgroundProps{
    height: string,
    width: string,
    children: React.JSX.Element
    boxShadow?: string
    padding?: string
    alignItems?: string
}

export function WhiteBackground(contenProps:WhiteBackgroundProps){
    const {height, width, children, boxShadow, padding, alignItems} = contenProps
    return(
        <Container style={{height, width, boxShadow, padding, alignItems} }>{children}</Container>
    )

}