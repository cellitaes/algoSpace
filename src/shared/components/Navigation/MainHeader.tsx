import { FC, PropsWithChildren } from "react";

import "./MainHeader.css";

const MainHeader: FC<PropsWithChildren> = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;
