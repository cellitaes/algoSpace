import { FC } from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop: FC<{ onClick: () => void }> = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")! as HTMLDivElement
  );
};

export default Backdrop;
