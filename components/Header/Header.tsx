import {Container} from './style'
import Image from "next/image";
import {logo, logo2} from '@/assets'
import {Text} from '../Text'
import { Button } from '../Button';
export function Header(){
    return (
    <Container>
        <div style={{width:'16vw',paddingLeft:'4vw',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{ width:'4vw', height:'3vw'}}>
                <Image src={logo} alt="Logo" layout='responsive' objectFit='contain' />
            </div>

            <div style={{ width:'12vw', height:'4vw'}}>
                <Image src={logo2} alt="Logo" layout='responsive' objectFit='contain' />
            </div>
        </div>
           
 
        <div style={{display:'flex', justifyContent:'space-between', width:'40vw', paddingRight:'4vw', alignItems:'center'}}>
                <Text fontFamily="pop" size={"1.5vw"} text="Sobre" color="black" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="|" color="gray" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="Depoimentos" color="black" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="|" color="gray" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="Contato" color="black" fontWeight="300"/>
                <Button widthButton="9vw" heightButton="3.3vw" colorButton="green" textButton='Entrar'/>
        </div>

    </Container>)
}   