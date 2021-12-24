import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ImageViewer({ photos }) {
  let imagesUrl = [];
  for (var i of photos) {
    imagesUrl.push({ original: i.url, thumbnail: i.url });
  }
  return (
    <>
      <ImageGallery
        items={imagesUrl}
        showPlayButton={false}
        // showNav={false}
        showFullscreenButton={false}
      />
    </>
  );
}
