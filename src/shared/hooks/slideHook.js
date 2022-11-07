import { useState } from 'react';

export const useSlider = () => {
   const [dragging, setDragging] = useState(false);

   const startDragging = () => {
      setDragging(true);
   };

   const stopDragging = () => {
      setDragging(false);
   };

   const handleMove = (e) => {
      if (!dragging) return;
      let positionY = e.clientY ?? e.touches[0].clientY;
      let positionX = e.clientX ?? e.touches[0].clientX;

      return { positionX, positionY };
   };

   return { dragging, handleMove, startDragging, stopDragging };
};
