import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import { Loader } from './Loader/Loader';
import { API_KEY } from './services/api.js';

export const App = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (name.trim() === '') {
      return;
    }
    setStatus(true);
    fetch(
      `https://pixabay.com/api/?q=${name}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
        } else {
          setImages(images => [
            ...images,
            ...hits.map(({ id, tags, webformatURL, largeImageURL }) => {
              return { id, tags, webformatURL, largeImageURL };
            }),
          ]);
          setStatus(false);
        }
      });
  }, [name, page]);

  const handleNameSubmit = name => {
    setName(name);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleClickImage = image => {
    setCurrentImage(image);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleNameSubmit} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onClickImage={handleClickImage} />
          {status && <Loader />}
          <Button onLoadMore={handleLoadMore} />
        </>
      )}
      {modal === true && (
        <Modal currentImage={currentImage} onClose={handleCloseModal} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
