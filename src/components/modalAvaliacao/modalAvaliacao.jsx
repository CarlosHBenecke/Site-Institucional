import React from 'react';
import "../../global.css";
import styles from "./modalAvaliacao.module.css";

const Modal = ({ rating, comment, onClose, onCommentChange, onSubmit, setSelectedRating }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClose}>&times;</span>
          <h2>Avaliação</h2>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`modal-star${star}`}
                  name="modal-rating"
                  value={star}
                  className="mask mask-star-2"
                  checked={rating === star}
                  onChange={() => setSelectedRating(star)}
                />
                <label htmlFor={`modal-star${star}`} title={`${star} estrelas`}></label>
              </React.Fragment>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={onCommentChange}
            placeholder="Deixe seu comentário"
            rows="4"
            cols="50"
            className={styles.textarea}
          />
          <button onClick={onSubmit} className={styles.enviar}>Enviar</button>
        </div>
      </div>
    );
  };
  
  export default Modal;