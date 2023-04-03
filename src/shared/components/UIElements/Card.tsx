import { FC, ReactNode, CSSProperties } from "react";

import "./Card.css";

interface CardProps {
  className: string;
  style: CSSProperties;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
