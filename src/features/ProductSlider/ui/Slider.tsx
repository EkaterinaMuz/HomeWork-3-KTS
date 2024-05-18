import cn from 'classnames';
import React, { useState } from 'react';
import SliderArrow from '@/shared/ui/icons/SliderArrow';
import s from './Slider.module.scss';

type SliderProps = {
  slides: string[];
};

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [offset, setOffset] = useState<number>(0);
  const PAGE_WIDTH = 600;

  const prevSlider = () => {
    setOffset((currentOffset) => {
      return Math.min(currentOffset + PAGE_WIDTH, 0);
    });
  };
  const nextSlider = () => {
    setOffset((currentOffset) => {
      const maxOffset = -(PAGE_WIDTH * (slides.length - 1));
      return Math.max(maxOffset, currentOffset - PAGE_WIDTH);
    });
  };
  return (
    <div className={s.slider_wrapper}>
      <div className={s.slider_window}>
        <SliderArrow
          className={cn(s.arrow_left, {
            [s.disabled]: !offset,
          })}
          onClick={prevSlider}
          disabled={!offset}
        />
        <div
          className={s.slider__slides}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index}`}
              style={{
                minWidth: `${PAGE_WIDTH}px`,
                maxWidth: `${PAGE_WIDTH}px`,
                height: '100%',
              }}
            />
          ))}
        </div>
        <SliderArrow
          className={cn(s.arrow_right, {
            [s.disabled]: offset === -(PAGE_WIDTH * (slides.length - 1)),
          })}
          direction="right"
          onClick={nextSlider}
          disabled={offset === -(PAGE_WIDTH * (slides.length - 1))}
        />
      </div>
    </div>
  );
};

export default Slider;
