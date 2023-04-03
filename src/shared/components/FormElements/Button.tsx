import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

import "./Button.css";

interface ButtonProps {
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  success?: boolean;
  active?: boolean;
  children?: ReactNode;
  to?: string;
  exact?: boolean | undefined;
  onClick?: (
    e?:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
  ) => void;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"} ${
          props.success && "button--success"
        }  ${props.active && "active"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <NavLink
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"} ${
          props.success && "button--success"
        } ${props.active && "active"}`}
        onClick={props.onClick}
      >
        {props.children}
      </NavLink>
    );
  }

  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"} ${
        props.success && "button--success"
      }  ${props.active && "active"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
