import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageCard.module.css";

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div className={styles.card}>
      <img
        src={src}
        alt={alt || "Image"}
        className={styles.image}
        onClick={onClick}
      />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
