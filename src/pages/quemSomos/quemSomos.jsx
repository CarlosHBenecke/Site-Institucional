import styles from "./quemSomos.module.css";
import "../../global.css";
import NavBarQS from "../../components/navbar/NavBar";
import logo from "../../assets/logoBranca.svg";
import Footer from "../../components/footer/Footer";
import { Helmet } from 'react-helmet';
import Carlos from "../../assets/Carlinhos.svg"
import Danielle from "../../assets/Dani.svg"
import Nicolas from "../../assets/Nicolas.svg"
import Pedro from "../../assets/Pedro.svg"
import Samuel from "../../assets/Samuca.svg"
import Vinicius from "../../assets/Vinicius.svg"

function QuemSomos(){
    const images = {
        "CARLOS BENECKE": Carlos,
        "DANIELLE ROMANO": Danielle,
        "NICOLAS PRATES": Nicolas,
        "PEDRO PRADO": Pedro,
        "SAMUEL LUCENA": Samuel,
        "VINICIUS COSTA": Vinicius
    };
    
    const githubUsernames = {
        "CARLOS BENECKE": "CarlosHBenecke",
        "DANIELLE ROMANO": "DanielleRomano",
        "NICOLAS PRATES": "nicolas-prates",
        "PEDRO PRADO": "PedroPradoCho",
        "SAMUEL LUCENA": "samlucena",
        "VINICIUS COSTA": "Vinicius-Costa23"
    };
    
    const integrantes = [
        ["CARLOS BENECKE", "DANIELLE ROMANO", "NICOLAS PRATES"],
        ["PEDRO PRADO", "SAMUEL LUCENA", "VINICIUS COSTA"]
    ];
    
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Modak&display=swap" />
            </Helmet>
            <NavBarQS logoInicio={logo} />
            <div className={styles["container"]}>
                <div className={styles["background-imageQuemSomos"]}>
                    <div className={styles["containerQS"]}>
                        <span className={styles["titulo"]}>QUEM SOMOS?</span>
                        <span className={styles["texto"]}>
                            Nos somos a empresa QUAL A BOA?, do ramo de tecnologia e formada por seis desenvolvedores e analistas responsáveis pela criação, idealização e desenvolvimento do <span className={styles["modak-words"]}>Qual a boa?</span>, projeto que leva o nome da empresa.
                        </span>
                        <span className={styles["conheca"]}>CONHEÇA NOSSOS INTEGRANTES!</span>
                        {integrantes.map((row, rowIndex) => (
                            <div key={rowIndex}>
                                <div className={styles["avatares"]}>
                                    {row.map((name, colIndex) => (
                                        <a key={colIndex} href={`https://github.com/${githubUsernames[name]}`} target="_blank" rel="noreferrer">
                                            <img src={images[name]} alt={`avatar ${name}`} />
                                        </a>
                                    ))}
                                </div>
                                <div className={styles["avatares-nomes"]}>
                                    {row.map((name, colIndex) => (
                                        <span key={colIndex} className={styles["nomes"]}>{name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default QuemSomos;