import React from "react";
import { Audio } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Audio
        height={80}
        width={80}
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
