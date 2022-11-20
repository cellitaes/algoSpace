import { useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {};

export default () => {
   const scrollBlocked = useRef();
   const html = safeDocument.documentElement;
   const { body } = safeDocument;

   const blockScroll = () => {
      if (!body || !body.style || scrollBlocked.current) return;

      const scrollBarWidth = window.innerWidth - html.clientWidth;
      const bodyPaddingRight =
         parseInt(
            window.getComputedStyle(body).getPropertyValue('padding-right')
         ) || 0;

      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';

      scrollBlocked.current = true;
   };

   const allowScroll = () => {
      if (!body || !body.style || !scrollBlocked.current) return;

      html.style.overflow = '';
      body.style.overflow = '';

      scrollBlocked.current = false;
   };

   return { blockScroll, allowScroll };
};
