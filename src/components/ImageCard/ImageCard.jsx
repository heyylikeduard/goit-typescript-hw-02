import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageCard.module.css";

const ImageCard = ({ src, alt }) => {
  return (
    <div className={styles.card}>
      <img src={src} alt={alt || "Image"} className={styles.image} />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageCard;
