import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClickImage, largeImageURL }) => {
  return (
    <div>
      <ImageGalleryList>
        {images.length >= 1 &&
          images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              tags={tags}
              webformatURL={webformatURL}
              key={id}
              largeImageURL={largeImageURL}
              onClickImage={onClickImage}
            />
          ))}
      </ImageGalleryList>
    </div>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
