import { useEffect, FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <div>{children}</div>;
};

export default ScrollToTop;
