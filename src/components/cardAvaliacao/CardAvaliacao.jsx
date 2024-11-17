import React, { useState } from 'react';
import styles from './CardAvaliacao.module.css';
import api from '../../api';

function CardAvaliacao ({ comentario, rating, userId }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  api.get("/users/" + userId).then(res => {
    setNomeUsuario(res.data.name);
  })
  return (
    <div className={styles.avaliacaoCard}>
        <div className={styles.details}>
          <p>{nomeUsuario}</p>
          <p>{comentario}</p>
        </div>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
          key={star}
          className={`${styles.star} ${star <= rating ? styles.filled : styles.outlined}`}
        >
          ★
        </span>
        ))}
      </div>
    </div>
  );
};

export default CardAvaliacao;