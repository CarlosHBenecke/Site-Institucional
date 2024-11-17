import React, { useState } from 'react';
import styles from './NavBar.module.css';
import perfil from '../../assets/perfilBranco.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';

const NavBar = ({ logoInicio }) => {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
 
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const scrollToSection = (sectionId) => {
        // Navega para a página inicial (ou para a página onde está a seção desejada)
        navigate('/');

        // Espera um pequeno intervalo de tempo antes de rolar para a seção
        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // ajuste o tempo conforme necessário
    };

    const quemSomosSection = (sectionId) => {
        // Navega para a página inicial (ou para a página onde está a seção desejada)
        navigate('/quem-somos');

        // Espera um pequeno intervalo de tempo antes de rolar para a seção
        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // ajuste o tempo conforme necessário
    };
    const ShowLoginOrLogout = () => {
        if(sessionStorage.getItem("qabToken") === null || sessionStorage.getItem("qabToken") === undefined || sessionStorage.getItem("qabToken") === ""){
            return <li onClick={() => navigate("/login")}>Login</li>
        } else {
            return <li onClick={() => {
                sessionStorage.removeItem("qabToken");
                sessionStorage.removeItem("establishmentId")
                navigate("/");
            }}>Logout</li>
        }
    }

    const ShowDashboard = () => {
        if(sessionStorage.getItem("establishmentId") !== null){
            return <li onClick={() => {
                navigate("/dashboard");
            }}>Dashboard</li>
        }
    }

    const ShowFavoritos = () => {
        if(sessionStorage.getItem("qabToken") !== null){
            return <li onClick={() => {
                navigate("/favoritos");
            }}>Favoritos</li>
        } 
    }

    return (
        <nav className={styles["navbar"]}>
            <img src={logoInicio} className={styles["logo-inicio"]} alt="Logo Início" onClick={() => scrollToSection('inicio')} />
            <span onClick={() => scrollToSection('bares')}><b>BARES BEM AVALIADOS</b></span>
            <span onClick={() => scrollToSection('sugestoes')}><b>SUGESTÕES DO MÊS</b></span>
            <span onClick={() => scrollToSection('boa')}><b>QUAL A SUA BOA?</b></span>
            <span onClick={() => quemSomosSection('quem-somos')}><b>QUEM SOMOS</b></span>
            <SearchBar /> 
            <div className={styles["perfil-container"]} onClick={toggleMenu}>
                <img src={perfil} className={styles["perfil-user"]} alt="Usuário" />
                {menuOpen && (
                    <div className={styles["dropdown-menu"]}>
                        <ul>
                            <ShowFavoritos />
                            <ShowDashboard />
                            <ShowLoginOrLogout />
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;