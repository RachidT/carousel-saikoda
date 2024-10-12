import { useState, useEffect } from "react";

export const useCarousel = (images: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [visibleImagesCount, setVisibleImagesCount] = useState(4);
  const [imageWidth, setImageWidth] = useState(350);

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
      setVisibleImagesCount((prevCount) => {
        if (prevCount !== matchingBreakpoint.images) {
          return matchingBreakpoint.images;
        }
        return prevCount;
      });
    }
  };

  const updateImageWidth = () => {
    const carouselContainer = document.querySelector(".carousel-container");
    if (carouselContainer) {
      const containerWidth = carouselContainer.clientWidth;
      setImageWidth((prevWidth) => {
        const newWidth = containerWidth / visibleImagesCount;
        if (prevWidth !== newWidth) {
          return newWidth;
        }
        return prevWidth;
      });
    }
  };

  useEffect(() => {
    updateVisibleImagesCount();
    updateImageWidth();
    window.addEventListener("resize", updateVisibleImagesCount);
    window.addEventListener("resize", updateImageWidth);
    return () => {
      window.removeEventListener("resize", updateVisibleImagesCount);
      window.removeEventListener("resize", updateImageWidth);
    };
  }, [visibleImagesCount, imageWidth]);

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
