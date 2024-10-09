import { useState, useEffect } from "react";

export const useCarousel = (images: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [visibleImagesCount, setVisibleImagesCount] = useState(4);
  const [imageWidth, setImageWidth] = useState(0);

  const updateVisibleImagesCount = () => {
    const width = window.innerWidth;
    const breakpoints = [
      { minWidth: 1440, images: 4 },
      { minWidth: 1280, images: 3 },
      { minWidth: 1024, images: 3 },
      { minWidth: 0, images: 2 },
    ];

    const matchingBreakpoint = breakpoints.find(
      (breakpoint) => width >= breakpoint.minWidth
    );

    if (matchingBreakpoint) {
      setVisibleImagesCount(matchingBreakpoint.images);
    }
  };

  const updateImageWidth = () => {
    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
      const containerWidth = carouselContainer.clientWidth;
      setImageWidth(containerWidth / visibleImagesCount);
    }
  };

  useEffect(() => {
    updateVisibleImagesCount();
    window.addEventListener("resize", updateVisibleImagesCount);
    window.addEventListener("resize", updateImageWidth);
    return () => {
      window.removeEventListener("resize", updateVisibleImagesCount);
      window.removeEventListener("resize", updateImageWidth);
    };
  }, [visibleImagesCount]);

  useEffect(() => {
    updateImageWidth();
  }, [visibleImagesCount]);

  const handleNext = () => {
    if (translateX < (images.length - visibleImagesCount) * imageWidth) {
      setTranslateX(translateX - imageWidth);
    }
  };

  const handlePrev = () => {
    if (translateX < 0) {
      setTranslateX(translateX + imageWidth);
    }
  };

  const selectImage = (index: number) => {
    setSelectedIndex(index);
  };

  return {
    selectedIndex,
    translateX,
    handleNext,
    handlePrev,
    selectImage,
    visibleImagesCount,
    imageWidth,
  };
};
