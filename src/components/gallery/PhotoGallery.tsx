import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 0) return null;

  return (
    <div className="photo-gallery">
      <div className="position-relative">
        <img
          src={photos[currentIndex]}
          alt={`Foto ${currentIndex + 1}`}
          className="img-fluid rounded cursor-pointer"
          onClick={() => setShowFullscreen(true)}
          style={{ height: '300px', width: '100%', objectFit: 'cover' }}
        />
        {photos.length > 1 && (
          <>
            <button
              className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2"
              onClick={prevPhoto}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={nextPhoto}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2">
          <div className="d-flex gap-1">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm rounded-circle ${
                  index === currentIndex ? 'btn-primary' : 'btn-light'
                }`}
                style={{ width: '10px', height: '10px', padding: 0 }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {showFullscreen && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <button
            className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3"
            onClick={() => setShowFullscreen(false)}
          >
            <X size={20} />
          </button>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <img
              src={photos[currentIndex]}
              alt={`Foto ${currentIndex + 1}`}
              className="img-fluid"
              style={{ maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}