import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeCarousel = () => {
const images = [
  "https://picsum.photos/800/300?random=1",
  "https://picsum.photos/800/300?random=2",
  "https://picsum.photos/800/300?random=3"
];
  return (
    <div className="container mt-4">
      <Carousel fade indicators controls>
        {images.map((src, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 rounded"
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ objectFit: 'cover', maxHeight: '400px' }}
            />
            <Carousel.Caption>
              <h5>Slide {index + 1}</h5>
              <p>Tanıtım metni buraya gelebilir.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
