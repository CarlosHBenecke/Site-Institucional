import React, { useState } from 'react';
import styles from './Forms.module.css';
import "../../global.css";
import api from "../../api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function AdicionarUsuarios({ closeModal }) {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const establishmentId = sessionStorage.getItem("establishmentId");

    const salvarUsuario = () => {
        if (senha !== senhaConfirmacao) {
            toast.error("As senhas não coincidem.");
            return;
        }

        api.post("/users/register", {
            name: nome,
            email: email,
            password: senha,
            roleEnum: "ADMIN",
            establishmentId: establishmentId
        }).then(() => {
            toast.success("Novo Usuário cadastrado com sucesso!");
            navigate("/login");
        }).catch(() => {
            toast.error("Ocorreu um erro ao salvar os dados, por favor, tente novamente.");
        });
    }

    const setarValoresInput = (evento) => {
        const { name, value } = evento.target;

        switch (name) {
            case "newName":
                setNome(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "newPassword":
                setSenha(value);
                break;
            case "confirmNewPassword":
                setSenhaConfirmacao(value);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.form}>
            <img src={require('../../assets/asset-cadastro-usuario/avatar.svg').default} alt="User Icon" className={styles.userIcon} />
            <h2 id="adicionar-usuarios-form">ADICIONAR USUÁRIOS</h2>
            <form aria-labelledby="adicionar-usuarios-form">
                <label htmlFor="newName">NOME:</label>
                <input type="text" id="newName" name="newName" placeholder="Digite Nome" aria-required="true" onChange={setarValoresInput} />
                <label htmlFor="email">E-MAIL:</label>
                <input type="email" id="email" name="email" placeholder="Digite E-mail" aria-required="true" onChange={setarValoresInput} />
                <label htmlFor="newPassword">SENHA:</label>
                <input type="password" id="newPassword" name="newPassword" placeholder="Digite senha" aria-required="true" onChange={setarValoresInput} />
                <label htmlFor="confirmNewPassword">SENHA NOVAMENTE:</label>
                <input type="password" id="confirmNewPassword" name="confirmNewPassword" placeholder="Digite senha novamente" aria-required="true" onChange={setarValoresInput} />
                <div className={styles.formButtons}>
                    <button type="button" onClick={closeModal} aria-label="Cancelar">CANCELAR</button>
                    <button type="button" aria-label="Salvar usuário" onClick={salvarUsuario}>SALVAR</button>
                </div>
            </form>
        </div>

    );
}
export default AdicionarUsuarios;