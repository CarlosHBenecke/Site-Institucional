import "../../global.css";
import styles from "./edicaoEmpresa.module.css";
import NavBar from "../../components/navbar/NavBar";
import logoQS from "../../assets/logoBranca.svg";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router";
import Editar from "../../components/editarEstabelecimentoForm/editar";

function EditarEstabelecimento(){
    const { id } = useParams();
    return(
      <>
       <div className={styles.container}>
                <NavBar logoInicio={logoQS} />
                    <div className={styles["background-image"]}>
                        <Editar idEmpresa={id}/>                 
                    </div>
                <Footer />
        </div>
        </>
    )
}



export default EditarEstabelecimento;