import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import { Loader } from './Loader/Loader';
import { API_KEY } from './services/api.js';

export  const App = () => {
  
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(status.IDLE);
  const [modal, setModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');


  // state = {
  //   name: '',
  //   images: [],
  //   page: 1,
  //   status: 'idle',
  //   modal: false,
  //   currentImage: '',
  // };




  useEffect(() => {
    setStatus(status.PENDING)


    fetch(
      `https://pixabay.com/api/?q=${name}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) => {
        if (hits.length === 0) {
          setStatus(status.REJECTED );
        } else {
          setImages(({ images }) => ({
            images: [
              ...images,
              ...hits.map(({ id, tags, webformatURL, largeImageURL }) => {
                return { id, tags, webformatURL, largeImageURL };
              }),
            ],
          }));
        }
      })
      .finally(() => {
        setStatus(status.IDLE);
      });


  },[]);






  componentDidUpdate(prevProps, prevState) {
    const { name, page, images } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${name}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
      )
        .then(res => res.json())
        .then(({ hits }) => {
          if (hits.length === 0) {
            this.setState({ status: 'rejected' });
          } else {
            this.setState(({ images }) => ({
              images: [
                ...images,
                ...hits.map(({ id, tags, webformatURL, largeImageURL }) => {
                  return { id, tags, webformatURL, largeImageURL };
                }),
              ],
            }));
          }
        })
        .finally(() => {
          this.setState({ status: 'idle' });
        });
    }
    if (prevState.images !== images && page !== 1) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  const handleNameSubmit = name => {
    setName(name, page: 1, images: [] );
  };

  const handleLoadMore = () => {
    setPage(( page ) => ({
      page: page + 1,
    }));
  };

  const handleClickImage = image => {
    setCurrentImage({ currentImage: image, modal: true });
  };

  const handleCloseModal = () => {
    setModal({ modal: false });
  };

    return (
      <div>
        <Searchbar onSubmit={handleNameSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              onClickImage={handleClickImage}
            />
            {status === 'pending' && <Loader />}
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
