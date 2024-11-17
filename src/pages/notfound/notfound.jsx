import React from "react";
import styles from "./notfound.module.css";
import logo from "../../assets/logoBranca.svg";
import NavBar from "../../components/navbar/NavBar";
import imgNotFound from "../../assets/404.svg";
import Footer from "../../components/footer/Footer";
const NotFound = () => {
    return(
        <>
        <NavBar logoInicio = {logo}/>
            <div className={styles["container"]}>
                <div className={styles["background-image"]}>
                    <div className={styles["erro404"]}>
                        <h1>PÁGINA NÃO ENCONTRADA</h1>
                        <h1>ERRO 404</h1>

                        <img src={imgNotFound} className={styles["erroImage"]} alt="Erro 404" />               

                    </div>
                </div> 
            </div> 
        <Footer />       
        </>
    );
};
export default NotFound;
