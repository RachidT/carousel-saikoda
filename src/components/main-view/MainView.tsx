import React from "react";
import "../../styles/MainView.modules.css";

interface MainViewProps {
  selectedImage: string;
  imageDescription: string;
  imageTitle: string;
}

const MainView: React.FC<MainViewProps> = ({
  selectedImage,
  imageTitle,
  imageDescription,
}) => {
  return (
    <div className="main-view">
      <img src={selectedImage} alt="Selected product" className="image" />
      <div className="main-view-description">
        <h3>{imageTitle}</h3>
        <p>{imageDescription}</p>
      </div>
    </div>
  );
};

export default MainView;
