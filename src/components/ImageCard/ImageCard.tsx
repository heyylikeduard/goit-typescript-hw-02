import React from "react";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  src: string;
  alt?: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt = "Image", onClick }) => {
  return (
    <div className={styles.card}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;
