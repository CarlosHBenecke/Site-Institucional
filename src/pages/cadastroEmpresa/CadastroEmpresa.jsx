import styles from "./CadastroEmpresa.module.css";
import "../../global.css";
import NavbarEmpresa from "../../components/navbarEmpresa/NavbarEmpresa";
import logo from "../../assets/logoBranca.svg";
import { CardLoginEmpresa } from "../../components/cardCadastroEmpresa/CardCadastroEmpresa";
import FooterEmpresa from "../../components/footerEmpresa/FooterEmpresa";

function LoginEmpresa(){
    
    return(
        <>
        <NavbarEmpresa logoInicio = {logo}/>
            <section className={styles["sessao"]} id="inicio">
                <div className={styles["background-image"]}>
                        <div className={styles["containerCadastroEmpresa"]}>
                    <CardLoginEmpresa />
                    </div>
                </div>
            </section>
        <FooterEmpresa/>    
        </>
    );
}
export default LoginEmpresa;