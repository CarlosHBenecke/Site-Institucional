import React from 'react';
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Charts from '../../components/charts/Charts';
import styles from './Dashboard.module.css';
import Footer from "../../components/footerEmpresa/FooterEmpresa";
import logo from "../../assets/logoBranca.svg";
import { formatarData } from '../../utils';
const Dashboard = () => {
    return (
        <>
            <Navbar logoInicio={logo}/>
            <div className={styles["background-imageCadastro"]}>
                <div className={styles.dashboard}>
                    <Sidebar />
                    <div className={styles.main}>
                        <header className={styles.header}>
                            <span>{formatarData(new Date())}</span>
                        </header>
                        <Charts/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Dashboard;
