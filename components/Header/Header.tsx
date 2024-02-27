import {Container} from "./style";
import Image from "next/legacy/image";
import {logo, logo2} from "@/assets";
import {Text} from "../Text";
import {Button} from "../Button";
import {useRouter} from "next/navigation";

interface HeaderProps {
  page: string
}

export function Header (props: HeaderProps) {

    const router = useRouter();

    const {page} = props;

    return (
        <Container>
            <div
                style={{
                    "width": "16vw",
                    "paddingLeft": "4vw",
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "center"
                }}
            >
                <div style={{"width": "4vw",
                    "height": "3vw"}}>
                    {/* <Image
            src={logo}
            alt="Logo"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          /> */}
                </div>

                <div style={{"width": "12vw",
                    "height": "4vw"}}>
                    {/* <Image
            src={logo2}
            alt="Logo"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          /> */}
                </div>
            </div>

            {page == "Home"
                ? <div
                    style={{
                        "display": "flex",
                        "justifyContent": "space-between",
                        "width": "20vw",
                        "paddingRight": "4vw",
                        "alignItems": "center"
                    }}
                >
                    <a href="/VerificarCertificado" style={{"textDecoration": "none"}}>
                        <Text
                            fontFamily="pop"
                            size={"1.5vw"}
                            text="Certificados"
                            color="black"
                            fontWeight="300"
                        />
                    </a>

                    <Button
                        widthButton="9vw"
                        heightButton="3.3vw"
                        colorButton="#9E4B00"
                        textButton="Associar-se"
                        onClick={() => {

                            router.push("/Register");

                        }}
                    />
                </div>
                : null}
        </Container>
    );

}
