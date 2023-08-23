import {Container} from './style'
import Image from "next/image";
import {logo, logo2} from '@/assets'

export function Header(){
    return (
    <Container>
        <div style={{position:'relative', width:'4vw', height:'3vw', marginLeft:'4vw'}}>
            <Image src={logo} alt="Logo" layout='fill' objectFit='contain' />
        </div>

        <div style={{position:'relative', width:'12vw', height:'6vw'}}>
            <Image src={logo2} alt="Logo" layout='fill' objectFit='contain' />
        </div>

        
    </Container>)
}