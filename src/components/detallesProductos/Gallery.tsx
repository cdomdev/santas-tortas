import ImageGallery from "react-image-gallery";
import type { ImageGalleryItem } from "react-image-gallery";


import "react-image-gallery/styles/css/image-gallery.css";

const { PUBLIC_HOST } = import.meta.env;

type StrapiImage = {
  id: number;
  documentId: string;
  url: string;
};

type GalleryProps = {
  images: StrapiImage[];
};

// Ajustamos el tipo correctamente
type CustomImageGalleryItem = ImageGalleryItem & {
  renderItem?: (item: ImageGalleryItem) => JSX.Element;
};

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const formattedImages: CustomImageGalleryItem[] = images.map((img) => ({
    original: `${img.url}`,
    thumbnail: `${img.url}`,
    renderItem: (item) => (
      <div className="w-full h-[300px] flex justify-center items-center bg-gray-100">
        <img
          src={item.original}
          alt="Galería"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  }));

  return (
    <ImageGallery
      items={formattedImages}
      showBullets={images.length > 1}
      showNav={false}
      thumbnailPosition="left"
      autoPlay={images.length > 1}
      showPlayButton={false}
      showFullscreenButton={false}
      slideInterval={5000}
    />
  );
};
