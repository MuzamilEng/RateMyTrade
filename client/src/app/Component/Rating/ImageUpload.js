import React, { useState } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;

    // Convert FileList to Array
    const imagesArray = Array.from(files);

    // Update state with selected images
    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);

    // Pass selected images to the parent component
    onUpload([...selectedImages, ...imagesArray]);
  };
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);

    // Update state with removed image
    setSelectedImages(newImages);

    // Pass updated images to the parent component
    onUpload(newImages);
};

  return (
    <div>
    <input type="file" multiple onChange={handleImageChange} />
    <div style={{ marginTop: '10px' }}>
      {selectedImages.map((image, index) => (
        <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
          <img
            src={URL.createObjectURL(image)}
            alt={`Uploaded ${index}`}
            style={{ width: '100px', height: '100px', marginRight: '10px' }}
          />
          <button onClick={() => handleRemoveImage(index)}>Remove</button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ImageUpload;