import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import axios from "axios";
import "./App.css";

// Тип для зображення з API
interface Image {
  id: string;
  urls: { small: string };
  alt_description: string;
}

// Тип для відповіді з API
interface ApiResponse {
  results: Image[];
}

// Тип для об'єкта модального зображення
interface ModalImage {
  url: string;
  alt: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ModalImage>({ url: "", alt: "" });

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<ApiResponse>(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&page=1&per_page=12&client_id=aiRIM7Mx4-GMqgq9zm5dng13ZGkM2xh0HxgJDxshKZc`
      );
      setImages(response.data.results);
      setHasMore(response.data.results.length > 0);
    } catch (err) {
      setError("Unable to fetch images. Please try again later.");
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<ApiResponse>(
        `https://api.unsplash.com/search/photos?query=${query}&page=${
          page + 1
        }&per_page=12&client_id=aiRIM7Mx4-GMqgq9zm5dng13ZGkM2xh0HxgJDxshKZc`
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.results.length > 0);
    } catch (err) {
      setError("Unable to fetch more images. Please try again later.");
      console.error("Error fetching more images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (imageUrl: string, imageAlt: string) => {
    setModalImage({ url: imageUrl, alt: imageAlt });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {!error && <ImageGallery images={images} onImageClick={openModal} />}
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && hasMore && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={modalImage.url}
        imageAlt={modalImage.alt}
      />
    </div>
  );
};

export default App;
