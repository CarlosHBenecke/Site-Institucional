import styles from "./CadastroUsuario.module.css";
import "../../global.css";
import logo from "../../assets/logoBranca.svg";
import NavBar from "../../components/navbar/NavBar";
import CardCadastro from "../../components/cardCadastro/CardCadastro";
import Footer from "../../components/footer/Footer";
const CadastroUsuario = () => {
    
    return(
        <div>
            <NavBar logoInicio = {logo}/>
            <div className={styles["background-imageCadastro"]}>
                <div className={styles["containerCadastroUsuario"]}>
                <CardCadastro />
                </div>
            </div>
            <Footer/>
    </div>
    );
};
// Exporta o componente Home para que possa ser usado em outras partes da aplicação
export default CadastroUsuario;