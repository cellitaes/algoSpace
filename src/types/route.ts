import { ReactNode } from "react";

export interface RouteProps {
  children: ReactNode;
  path: string;
  exact?: boolean;
}
