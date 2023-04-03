import { useState, MouseEvent, TouchEvent } from "react";

export const useSlider = () => {
  const [dragging, setDragging] = useState(false);

  const startDragging = () => {
    setDragging(true);
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const handleMove = (e: MouseEvent) => {
    if (!dragging) return;
    let positionY = e.clientY;
    let positionX = e.clientX;

    return { positionX, positionY };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    let positionY = e.touches[0].clientY;
    let positionX = e.touches[0].clientX;

    return { positionX, positionY };
  };

  return { dragging, handleMove, handleTouchMove, startDragging, stopDragging };
};
