import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import { Loader } from './Loader/Loader';
import { API_KEY } from './services/api.js';

export class App extends Component {
  state = {
    name: '',
    images: [],
    page: 1,
    status: 'idle',
    modal: false,
    currentImage: '',
  };

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

  handleNameSubmit = name => {
    this.setState({ name, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleClickImage = image => {
    this.setState({ currentImage: image, modal: true });
  };

  handleCloseModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const { images, status, modal, currentImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleNameSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery
              images={images}
              onClickImage={this.handleClickImage}
            />
            {status === 'pending' && <Loader />}
            <Button onLoadMore={this.handleLoadMore} />
          </>
        )}
        {modal === true && (
          <Modal currentImage={currentImage} onClose={this.handleCloseModal} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
