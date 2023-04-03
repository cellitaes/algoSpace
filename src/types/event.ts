import { MouseEvent } from "react";

export interface PaginationMouseEvent extends MouseEvent<HTMLElement> {
  selected: number;
}
