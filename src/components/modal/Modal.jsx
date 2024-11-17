import "../../global.css";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, modalText }) => {
    if (!isOpen) return null;

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClose}>&times;</span>
          <div className={styles.modalTxt}>
            <h3>MAIS INFORMAÇÕES</h3>
            <span>{modalText}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;