import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

interface SideDrawerProps {
  onClick: () => void;
  show: boolean;
  children: ReactNode;
}

const SideDrawer: FC<SideDrawerProps> = (props, { onClick, show }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook")! as HTMLDivElement
  );
};

export default SideDrawer;
