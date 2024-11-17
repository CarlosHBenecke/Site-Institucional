import React, { useState, useEffect, useRef } from 'react';
import styles from './NavbarDash.module.css';
import perfil from '../../assets/perfilUser.svg';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ logoInicio }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    function logOff() {
        sessionStorage.removeItem("qabToken");
        navigate("/login"); 
    }

    const scrollToSection = (path, sectionId) => {
        navigate(path);
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
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
            <img src={logoInicio} className={styles["logo-inicio"]} alt="Logo Início" onClick={() => scrollToSection('/home-estabelecimento', 'inicio')} />
            <span onClick={() => scrollToSection('/home-estabelecimento', 'vantagens')}><b>VANTAGENS</b></span>
            <span onClick={() => scrollToSection('/home-estabelecimento', 'destaque')}><b>DESTAQUES DO MÊS</b></span>
            <span onClick={() => scrollToSection('/dashboard', 'footerEmpresa')}><b>CONTATOS</b></span>
            <span onClick={() => scrollToSection('/quem-somos', 'quem-somos')}><b>QUEM SOMOS</b></span>
            <input type="text" placeholder="Escreva aqui" />
            <div ref={menuRef} className={styles["perfil-container"]} onClick={() => setMenuOpen(!menuOpen)}>
                <img src={perfil} className={styles["perfil-user"]} alt="Usuário" />
                {menuOpen && (
                    <div className={styles["dropdown-menu"]}>
                        <ul>
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
