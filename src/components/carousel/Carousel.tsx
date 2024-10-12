import React from "react";
import "../../styles/Carousel.modules.css";

interface CarouselProps {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  translateX: number;
  visibleImagesCount: number;
  imageWidth: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  selectedIndex,
  onSelect,
  handleNext,
  handlePrev,
  translateX,
  visibleImagesCount,
  imageWidth,
}) => (
  <div className="carousel">
    <button onClick={handlePrev} disabled={translateX === 0}>
      Prev
    </button>
    <div className="carousel-container">
      <div
        className="carousel-images"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Product ${index + 1}`}
            className={index === selectedIndex ? "selected" : ""}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
    <button
      onClick={handleNext}
      disabled={
        Math.abs(translateX) >=
        (images.length - visibleImagesCount) * imageWidth
      }
    >
      Next
    </button>
  </div>
);

export default Carousel;
