import { useState } from 'react';

import { useSlider } from '../../shared/hooks/slideHook';

import './Output.css';

const Output = ({ codeExecutionRes }) => {
   const outputContainer = document.querySelector('.output');
   const navigation = document.querySelector('.main-header');
   const toolbar = document.querySelector('.minimalize-editor');
   const heightOffset = navigation.offsetHeight + toolbar.offsetHeight;
   const windowHeight = window.innerHeight;

   const { handleMove, startDragging, stopDragging } = useSlider();

   const [top, setTop] = useState('50%');
   const [detailsTop, setDetailsTop] = useState('50%');
   const [outputHeight, setOutpuHeight] = useState();
   const [detailsHeight, setDetailsHeight] = useState();

   const checkSliderPosition = (clientY) => {
      let sliderPosiotion = clientY;
      sliderPosiotion = clientY < heightOffset ? heightOffset : clientY;
      sliderPosiotion = clientY > windowHeight ? windowHeight : sliderPosiotion;
      return sliderPosiotion;
   };

   const handleSliderMove = (e) => {
      let { positionY } = handleMove(e);
      positionY = checkSliderPosition(positionY);

      setTop(positionY - heightOffset);
      setDetailsTop(positionY - heightOffset);
      setOutpuHeight(positionY - heightOffset);
      setDetailsHeight(outputContainer.offsetHeight - positionY);
   };

   return (
      <div
         className="output"
         onMouseMove={handleSliderMove}
         onMouseUp={stopDragging}
         onTouchEnd={stopDragging}
         onTouchMove={handleSliderMove}
      >
         <div className="output--position-rel"></div>
         <div className="output__info" style={{ height: outputHeight }}>
            dupa
         </div>
         <div
            className="output__details"
            style={{ top: detailsTop, height: detailsHeight }}
         >
            kupa
         </div>
         <div class="slider__divider" style={{ top: top }}>
            <div
               class="slider__handle"
               onMouseDown={startDragging}
               onTouchStart={startDragging}
               onMouseUp={stopDragging}
            >
               <i class="fa fa-chevron-up"></i>
               <i class="fa fa-chevron-down"></i>
            </div>
         </div>
      </div>
   );
};

export default Output;
