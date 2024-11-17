import React, { useState } from 'react';
import styles from './navBarQS.module.css';
import perfil from '../../../assets/perfilBranco.svg';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/searchBar/SearchBar';
import Modal from '../../../components/modalGenerico/ModalGenerico';
import EditarFinal from '../../../components/editarFinal/EditarFinal';

const NavBarQS = ({ logoQS }) => {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
 
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openModal = () => {
        setModalOpen(true);
        setMenuOpen(false);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const scrollToSection = (sectionId) => {
        // Navega para a página inicial (ou para a página onde está a seção desejada)
        navigate('/home');

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

    return (
        <nav className={styles["navbar"]}>
            <img src={logoQS} className={styles["logo-inicio"]} alt="Logo Início" to="outra-pagina" smooth={true} onClick={() => scrollToSection('inicio')} />
            <span to="outra-pagina" smooth={true} onClick={() => scrollToSection('cidades')}><b>CIDADES MAIS PROCURADAS</b></span>
            <span to="outra-pagina" smooth={true} onClick={() => scrollToSection('bares')}><b>BARES MAIS VISTOS</b></span>
            <span to="outra-pagina" smooth={true} onClick={() => scrollToSection('sugestoes')}><b>SUGESTÕES DO MÊS</b></span>
            <span to="outra-pagina" smooth={true} onClick={() => scrollToSection('boa')}><b>QUAL A SUA BOA?</b></span>
            <span onClick={() => quemSomosSection('quem-somos')}><b>QUEM SOMOS</b></span>
            <SearchBar /> 
            <div className={styles["perfil-container"]} onClick={toggleMenu}>
                <img src={perfil} className={styles["perfil-user"]} alt="Usuário" />
                {menuOpen && (
                    <div className={styles["dropdown-menu"]}>
                        <ul>
                            <li onClick={openModal}>Configurações</li>
                            <li onClick={() => navigate("/login")}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
                <EditarFinal closeModal={closeModal} />
            </Modal>
        </nav>
    );
};

export default NavBarQS;
