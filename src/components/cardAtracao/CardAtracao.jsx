import React from 'react';
import styles from './CardAtracao.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CardAtracao ({ foto, titulo, descricao }) {
  return (
    <div className={styles.avaliacaoCard}>
        <div className={styles.details}>
        <img className={styles.foto} src="" alt="FOTO EVENTO" />
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </div>
  );
};

export default CardAtracao;