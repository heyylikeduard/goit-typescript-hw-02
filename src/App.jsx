import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import axios from "axios";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ url: "", alt: "" });

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
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
      const response = await axios.get(
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

  const openModal = (imageUrl, imageAlt) => {
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
