import './ImageSlider.scss';
import React, { useState } from "react";
import TImageSlide from "../../TImageSlide";

interface IProps {
    slides: Array<TImageSlide>;
}
export default function ImageSlider({slides}: IProps) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        if (currentIndex === 0) {
            setCurrentIndex(slides.length - 1)
            return;
        }

        setCurrentIndex(currentIndex - 1);
    }

    const goToNext = () => {
        if (currentIndex === slides.length - 1) {
            setCurrentIndex(0);
            return;
        }

        setCurrentIndex(currentIndex + 1);
    }

    return (
        <div className="image-slider-container">
                <button className="arrow left-arrow" onClick={goToPrevious}>PREV</button>
                <div className="slide" style={{ backgroundImage: `url(${slides[currentIndex].url}` }}/>
                <button className="arrow right-arrow" onClick={goToNext}>NEXT</button>

            {slides[currentIndex].description ??
            <p>
                {slides[currentIndex].description}
            </p>}
        </div>
    );
};
