import React, { useState } from 'react';

function Gallery({ imagenes }) {
  const [currentImage, setCurrentImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setCurrentImage(null);
    setIsDialogOpen(false);
  };

  const showPreviousImage = () => {
    const currentIndex = imagenes.indexOf(currentImage);
    if (currentIndex > 0) {
      setCurrentImage(imagenes[currentIndex - 1]);
    }
  };

  const showNextImage = () => {
    const currentIndex = imagenes.indexOf(currentImage);
    if (currentIndex < imagenes.length - 1) {
      setCurrentImage(imagenes[currentIndex + 1]);
    }
  };

  return (
    <div >
      <div className="image-grid   " >
        {imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={`Imagen ${index + 1}`}
            onClick={() => handleImageClick(imagen)}
          />
        ))}
      </div>

      {isDialogOpen && currentImage && (
        <dialog open>
          <button onClick={closeDialog}>Cerrar</button>
          <button onClick={showPreviousImage}>Anterior</button>
          <button onClick={showNextImage}>Siguiente</button>
          <img src={currentImage} alt="Imagen ampliada" />
        </dialog>
      )}
    </div>
  );
}

export default Gallery;
