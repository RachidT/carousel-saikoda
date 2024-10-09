import MainView from "./components/main-view/MainView";
import Carousel from "./components/carousel/Carousel";
import { useCarousel } from "./hooks/useCarousel";
import { ImagesConfig } from "./config/imagesConfig";

function App() {
  const images = ImagesConfig.map((item) => item.image);
  const {
    selectedIndex,
    translateX,
    handleNext,
    handlePrev,
    selectImage,
    visibleImagesCount,
    imageWidth,
  } = useCarousel(images);

  return (
    <>
      <MainView
        selectedImage={images[selectedIndex]}
        imageDescription={ImagesConfig[selectedIndex].description}
        imageTitle={ImagesConfig[selectedIndex].title}
      />
      <Carousel
        images={images}
        selectedIndex={selectedIndex}
        onSelect={selectImage}
        handleNext={handleNext}
        handlePrev={handlePrev}
        translateX={translateX}
        visibleImagesCount={visibleImagesCount}
        imageWidth={imageWidth}
      />
    </>
  );
}

export default App;
