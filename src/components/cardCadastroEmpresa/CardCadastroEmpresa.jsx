import styles from "./CardCadastroEmpresa.module.css";
import "../../global.css";
import icone from "../../assets/icon-user.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { toast } from "react-toastify";
import { cnpjMask, removeCnpjMask } from "../../utils";
import api from "../../api";

export function CardLoginEmpresa() {
    const [cnpj, setCnpj] = useState("");
    const [name, setName] = useState("");
    const [avgValue, setAvgValue] = useState("");
    const navigate = useNavigate();

    const create = async () => {
        const response = await api.post("/establishments", {
            fantasyName: name,
            cnpj: removeCnpjMask(cnpj),
            averageOrderValue: avgValue
        });
        toast.success("Cadastrado com sucesso!");
        sessionStorage.setItem("empresaId", response.data.id);
        navigate("/cadastrar-info-empresa/" + response.data.id);
    }

    return (    
            <div className={styles["card"]}>
                <img src={icone} alt="icone do usuário" className={styles["avatar"]}/>
                <div className={styles["card-body"]}>
                    <h1 className={styles["card-title"]}><b>CADASTRE-SE</b></h1>
                    <form>
                        <div className={styles["form-group"]}>
                            <label htmlFor="cnpj">CNPJ</label>
                            <input type="text" className={styles["form-control"]} id="cnpj" placeholder="CNPJ" onChange={e => handleChangeInput(e, setCnpj)} value={cnpjMask(cnpj)}/>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="nome">Nome Fantasia</label>
                            <input type="text" className={styles["form-control"]} id="nome" placeholder="Nome fantasia" onChange={e => handleChangeInput(e, setName)}/>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="valorMedio">Valor médio</label>
                            <input type="number" className={styles["form-control"]} id="valorMedio" placeholder="Valor médio (ex: 50)" onChange={e => handleChangeInput(e, setAvgValue)}/>
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className={styles["form-control"]} id="email" placeholder="example@example.com"/>
                        </div>
                        <button type="button" className={styles["botao-entrar-usuario"]} onClick={create}><b>CADASTRAR</b></button>
                        <div className={styles["loginExistente"]}>
                            Já possui Login?<Link to="/loginEmpresa" className={styles["entrar"]}>Entrar</Link>
                        </div>
                    </form>
                </div>
            </div>
    );
}

const handleChangeInput = (e, setStateFunction) => {
    setStateFunction(e.target.value);
}
