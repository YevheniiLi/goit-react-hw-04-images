import PropTypes from 'prop-types';
import { ImageGalleryEl, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <ImageGalleryEl
      onClick={() => {
        onClickImage(largeImageURL);
      }}
    >
      <Image src={webformatURL} alt={tags} />
    </ImageGalleryEl>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
