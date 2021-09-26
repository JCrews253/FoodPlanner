import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TopAppBar from "./TopAppBar";

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      id="app-frame"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TopAppBar />
      <Box
        sx={{
          height: "100%",
          overflowX: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
