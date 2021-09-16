import React from "react";
import { useRecoilValue } from "recoil";
import { AuthStatus } from "../state/state";
import AppBar from "./AppBar";

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);

  return (
    <div id="appWrapper">
      <div id="mainContent">{children}</div>
      {loggedIn ? <AppBar /> : null}
    </div>
  );
};

export default Layout;
