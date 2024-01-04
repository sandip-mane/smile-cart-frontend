import { useState, useEffect, useRef } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ title, imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
    resetTimer();
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    resetTimer();
  };

  return (
    <>
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={handleNext}
        />
      </div>
      <div className="flex items-center gap-2">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
