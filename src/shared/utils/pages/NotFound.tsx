import { useEffect } from "react";

import { useScrollBlock } from "../../hooks/blockScrollHook";

import "./NotFound.css";

const NotFound = () => {
  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => {
      allowScroll();
    };
  }, []);

  return (
    <div className="not-found">
      <p>Page not found!</p>
    </div>
  );
};

export default NotFound;
