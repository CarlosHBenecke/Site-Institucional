import React, { useState, useEffect, useRef } from 'react';
import styles from './NavbarEmpresa.module.css';
import perfil from '../../assets/perfilBranco.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';

const NavBar = ({ logoInicio }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    function logOff() {
        sessionStorage.removeItem("qabToken");
        navigate("/login"); 
    }

    const quemSomosSection = (sectionId) => {
        navigate('/quem-somos');

        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); 
    };

    const scrollToSection = (sectionId) => {
        navigate('/home-estabelecimento');

        setTimeout(() => {
            var secao = document.getElementById(sectionId);
            if (secao) {
                secao.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); 
    };

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true);
        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, []);

    return (
        <nav className={styles["navbar"]}>
            <img src={logoInicio} className={styles["logo-inicio"]} alt="Logo Início" onClick={() => scrollToSection('inicio')}/>
            <span onClick={() => scrollToSection('vantagens')}><b>VANTAGENS</b></span>
            <span onClick={() => scrollToSection('destaque')}><b>BAR DESTAQUE DO MÊS</b></span>
            <span onClick={() => scrollToSection('dica')}><b>DICA DO CHOPPER</b></span>
            <span onClick={() => quemSomosSection('quem-somos')}><b>QUEM SOMOS</b></span>
            <SearchBar /> 
            <div ref={menuRef} className={styles["perfil-container"]}>
                <img src={perfil} className={styles["perfil-user"]} alt="Usuário" onClick={() => setMenuOpen(!menuOpen)}/>
                {menuOpen && (
                    <div className={styles["dropdown-menu"]}>
                        <ul>
                            <li onClick={() => navigate("/estabelecimento")}>Perfil</li>
                            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                            <li onClick={logOff}>Sair</li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
