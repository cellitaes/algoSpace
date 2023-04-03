import { FC } from "react";

import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  asOverlay?: boolean;
  ringClassName?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  asOverlay,
  ringClassName,
}) => {
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className={`${ringClassName} lds-dual-ring`}></div>
    </div>
  );
};

export default LoadingSpinner;
