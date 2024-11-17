import React from 'react';
import styles from './Footer.module.css';
import LogoFooter from '../../assets/footerIcon.svg';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                <img src={LogoFooter} alt="logo" className={styles.logo} />
                <img src={LogoFooter} alt="logo" className={styles.logo} />
                <img src={LogoFooter} alt="logo" className={styles.logo} />
                <img src={LogoFooter} alt="logo" className={styles.logo} />
                <img src={LogoFooter} alt="logo" className={styles.logo} />
            </div>
            <div className={styles.menuContainer}>
                <div className={styles.menu}>
                    <h3 className={styles.menuTitulo}>MENU</h3>
                    <a className={styles.options} href="#outra">BARES MAIS VISTOS</a>
                    <a className={styles.options} href="#outra">SUGESTÕES DO MÊS</a>
                    <a className={styles.options} href="#outra">QUAL A SUA BOA?</a>
                    <a className={styles.options} href="#outra">QUEM SOMOS</a>
                </div>
                <div className={styles.menu}>
                    <h3 className={styles.menuTitulo}>ENDEREÇO</h3>
                    <span className={styles.optionsEndereco}>Rua Haddock Lobo, 595</span>
                    <span className={styles.optionsEndereco}>Cerqueira César</span>
                    <span className={styles.optionsEndereco}>São Paulo - SP</span>
                    <span className={styles.optionsEndereco}>01414-00</span>
                </div>
                <div className={styles.menu}>
                    <h3 className={styles.menuTitulo}>CONTATOS</h3>
                    <span className={styles.options}>@QualABoa</span>
                    <FaFacebook className={styles.midias} />
                    <FaInstagram className={styles.midias} />
                    <FaLinkedin className={styles.midias} />
                </div>
            </div>
            <div className={styles.copyright}>
                <span>Todos os direitos reservados</span>
            </div>
        </footer>
    );
}

export default Footer;