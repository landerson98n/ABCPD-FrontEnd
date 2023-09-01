import {Container} from './style'
import Image from "next/image";
import {logo, logo2} from '@/assets'
import {Text} from '../Text'
import { Button } from '../Button';

interface HeaderProps{
    page: string
}


export function Header(props: HeaderProps){
    const {page} =  props

    return (
    <Container>
        <div style={{width:'16vw',paddingLeft:'4vw',display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{ width:'4vw', height:'3vw'}}>
                <Image src={logo} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
            </div>

            <div style={{ width:'12vw', height:'4vw'}}>
                <Image src={logo2} alt="Logo" style={{ width: '100%', height: 'auto' ,objectFit: 'cover'}}  />
            </div>
        </div>
           
        {page == 'Home' ? <div style={{display:'flex', justifyContent:'space-between', width:'40vw', paddingRight:'4vw', alignItems:'center'}}>
                <Text fontFamily="pop" size={"1.5vw"} text="Sobre" color="black" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="|" color="gray" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="Depoimentos" color="black" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="|" color="gray" fontWeight="300"/>
                <Text fontFamily="pop" size={"1.5vw"} text="Contato" color="black" fontWeight="300"/>
                <Button widthButton="9vw" heightButton="3.3vw" colorButton="green" textButton='Registre-se'/>
        </div> : null}
        

    </Container>)
}   