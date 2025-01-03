import React from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose, imageUrl, imageAlt }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      border: "none",
      background: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className={styles.modalContent}>
        <img src={imageUrl} alt={imageAlt} className={styles.image} />
      </div>
    </Modal>
  );
};

export default ImageModal;
