import { useCallback } from "react";
import { useState } from "react";

export const usePopUp = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const setPopUpContent = useCallback((text: string) => {
    setContent(text);
  }, []);

  return { open, content, setPopUpContent, openModal, closeModal };
};
