import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import "../../styles/Carousel.modules.css";

interface CarouselProps {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  translateX: number;
  visibleImagesCount: number;
  carouselContainerRef: React.RefObject<HTMLDivElement>;
  isPrevButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  selectedIndex,
  onSelect,
  handleNext,
  handlePrev,
  translateX,
  carouselContainerRef,
  isPrevButtonDisabled,
  isNextButtonDisabled,
}) => {
  return (
    <div ref={carouselContainerRef} className="carousel">
      <button
        onClick={handlePrev}
        disabled={isPrevButtonDisabled}
        className="carousel-buttons prev-button"
      >
        <IoIosArrowDropleft />
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
        className="carousel-buttons next-button"
        onClick={handleNext}
        disabled={isNextButtonDisabled}
      >
        <IoIosArrowDropright />
      </button>
    </div>
  );
};

export default Carousel;
