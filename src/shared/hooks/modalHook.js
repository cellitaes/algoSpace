import { useState } from 'react';

export const useModal = () => {
   const [open, setOpen] = useState(false);

   const openModal = () => {
      setOpen(true);
   };

   const closeModal = () => {
      setOpen(false);
   };

   return [open, openModal, closeModal];
};
