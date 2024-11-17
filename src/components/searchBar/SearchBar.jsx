import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const navigate = useNavigate();

  const listagemScroll = (sectionId) => {
    // Navega para a página inicial (ou para a página onde está a seção desejada)
    navigate('/listagem');

    // Espera um pequeno intervalo de tempo antes de rolar para a seção
    setTimeout(() => {
        var secao = document.getElementById(sectionId);
        if (secao) {
            secao.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100); // ajuste o tempo conforme necessário
};


  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <button className={styles["botao-lupa"]} onClick={() => listagemScroll('inicio')}>
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: 'absolute',
            left: '9px', // Posição do ícone à esquerda
            top: '50%', // Alinhar verticalmente
            transform: 'translateY(-50%)',
            color: '#000',
            cursor: 'pointer'
          }}
        />
      </button>
    </div>
  );
};

export default SearchBar;
