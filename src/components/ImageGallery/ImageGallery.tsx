import React from "react";
import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (imageUrl: string, imageAlt: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          className={styles.galleryItem}
          onClick={() => onImageClick(image.urls.full, image.alt_description)}
        >
          <div>
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className={styles.image}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
