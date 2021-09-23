import { Container } from "@mui/material";
import { Box } from "@mui/system";
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
    <Box
      id="app-frame"
      sx={{
        height: "100vh",
      }}
    >
      <Container
        sx={{
          pb: 7,
          height: "100%",
        }}
      >
        {children}
      </Container>
      <Container>{loggedIn ? <AppBar /> : null}</Container>
    </Box>
  );
};

export default Layout;
