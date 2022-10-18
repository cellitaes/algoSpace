import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Sky.css';

const Sky = () => {
   const location = useLocation();

   let canvas = null;
   let ctx = null;
   let width = window.innerWidth;
   let height = window.innerHeight;
   let lastConstellation = 0;
   let nextConstellation = Math.random() * 3000;
   let constellation = {
      stars: [],
      isClosed: false,
      width: null,
   };
   let lastUpdate = 0;
   let generatedStars = [];

   const initCanvas = () => {
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
   };

   const generateStars = (count) => {
      let stars = [];

      for (let i = 0; i < count; i++) {
         const radius = Math.random() * 3 + 2;

         stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: radius,
            originalRadius: radius,
            color: '#fff',
            speed: Math.random() + 0.25,
         });
      }

      generatedStars = stars;
   };

   const drawStars = () => {
      generatedStars.forEach((star) => {
         drawStar(star);
      });
   };

   const updateStars = (delta) => {
      generatedStars.forEach((star) => {
         star.x += star.speed * (delta / 16);
         star.y -= (star.speed * (delta / 16) * (width / 2 - star.x)) / 3000;
         star.radius = star.originalRadius * (Math.random() / 4 + 0.9);

         if (star.x > width + 2 * star.radius) {
            star.x = -2 * star.radius;
         }
      });
   };

   const generateRandomConstellation = () => {
      const x = width / 2 + Math.random() * 0.8 * width - width / 2;
      const y = height / 2 + Math.random() * 0.8 * height - height / 2;
      const radius = (height / 2) * Math.random() * 0.5 + 0.5;

      constellation = {
         stars: generatedStars
            .filter((star) => {
               return (
                  star.x > x - radius &&
                  star.x < x + radius &&
                  star.y > y - radius &&
                  star.y < y + radius
               );
            })
            .slice(0, Math.round(Math.random() * 7 + 3)),
         isClosed: Math.random() > 0.5,
         width: 5,
      };
   };

   const updateConstellation = (delta) => {
      if (constellation.width > 0) {
         constellation.width -= 0.04 * (delta / 16);
      } else constellation.width = 0;
   };

   const drawConstellation = () => {
      const { stars, isClosed, width } = constellation;
      const starsCount = stars.length;
      if (starsCount > 2) {
         const firstStar = stars[0];

         ctx.beginPath();
         ctx.moveTo(firstStar.x, firstStar.y);
         ctx.lineTo(stars[1].x, stars[1].y);

         for (let i = 1; i < starsCount - 1; i++) {
            const nextStar = stars[i + 1];
            ctx.lineTo(nextStar.x, nextStar.y);
         }

         if (isClosed) {
            ctx.lineTo(firstStar.x, firstStar.y);
         }

         ctx.strokeStyle = '#f7eada';
         ctx.lineWidth = width;
         ctx.stroke();
      }
   };

   const clearCanvas = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
   };

   const drawStar = (star) => {
      ctx.save();

      ctx.fillStyle = star.color;

      ctx.beginPath();

      ctx.translate(star.x, star.y);
      ctx.moveTo(0, 0 - star.radius);

      for (let i = 0; i < 5; i++) {
         ctx.rotate((Math.PI / 180) * 36);
         ctx.lineTo(0, 0 - star.radius * 0.65);
         ctx.rotate((Math.PI / 180) * 36);
         ctx.lineTo(0, 0 - star.radius);
      }

      ctx.fill();
      ctx.restore();
   };

   const draw = (now) => {
      const delta = now - lastUpdate;

      clearCanvas();

      drawStars();
      updateStars(delta);

      drawConstellation();
      updateConstellation(delta);

      if (now - lastConstellation > nextConstellation) {
         lastConstellation = now;
         nextConstellation = Math.random() * 1000 + 2000;
         generateRandomConstellation();
      }

      lastUpdate = now;

      window.requestAnimationFrame((now) => draw(now));
   };

   const run = () => {
      initCanvas();
      if (window.innerWidth >= 1024) {
         generateStars(500);
      } else {
         generateStars(150);
      }
      draw(0);
   };

   const handleResize = () => {
      const canva = document.querySelector('canvas');
      canvas = canva;
      width = window.innerWidth;
      height = window.innerHeight;
      ctx = canvas.getContext('2d');
      run();
   };

   useEffect(() => {
      handleResize();
   }, [location]);

   useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <div className="canvas">
         <canvas id="#canvas"></canvas>
      </div>
   );
};

export default Sky;
