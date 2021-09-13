import React from "react";
import AppBar from "./AppBar";

const Layout = (props: any) => {
  return (
    <div>
      <div>{props.children}</div>
      <AppBar />
    </div>
  );
};

export default Layout;
