import React, { useState, useRef, useEffect } from 'react';
import styles from "./Listagem.module.css";
import "../../global.css";
import logo from "../../assets/logoBranca.svg";
import ResultadoBusca from "../../components/resultadoBusca/ResultadoBusca";
import Navbar from '../../components/navbar/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Listagem() {
    const [tamanhoDivExterno, setTamanhoDivExterno] = useState(0);
    const divRef = useRef(null);

    useEffect(() => {
        if (divRef.current) {
            setTamanhoDivExterno(divRef.current.offsetHeight);
        }
    }, []);

    return (
        <>
            <Navbar logoInicio={logo} />
            <section className={styles["sessao"]} id="inicio">
                <div style={{ height: `calc(100vh - ${tamanhoDivExterno}px)` }}>
                    <div className={styles["containerBusca"]} ref={divRef}>
                        <ResultadoBusca />
                        <a className={styles["botao-voltar"]} href="#inicio">
                            <FontAwesomeIcon icon={faArrowUp} style={{
                                color: '#FFF',
                                cursor: 'pointer'
                            }} />
                        </a>
                    </div>
                    
                </div>
                
            </section>
        </>
    );
}

export default Listagem;