import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Sky.css';

const Sky = () => {
   return (
      <div className="sky">
         <div class="stars"></div>
         <div class="twinkling"></div>
         <div class="clouds"></div>
      </div>
   );
};

export default Sky;
