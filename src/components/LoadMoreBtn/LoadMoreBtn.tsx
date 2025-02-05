import React from "react";
import styles from "./LoadMoreBtn.module.css";

// Типізація пропсів компонента
interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
