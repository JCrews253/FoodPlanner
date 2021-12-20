import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppBar from "./AppBar";

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppBar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "hidden",
          padding: "0px !important",
        }}
        maxWidth={false}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
