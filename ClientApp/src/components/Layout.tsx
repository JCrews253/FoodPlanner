import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRecoilValue } from "recoil";
import { isMobileAtom } from "../state/state";
import AppBar from "./navigation/AppBar";
import BottomNavBar from "./navigation/BottomNavBar";

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useRecoilValue(isMobileAtom);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflow: "hidden",
      }}
    >
      {isMobile ? null : <AppBar />}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "hidden",
          marginBottom: isMobile ? "66px" : undefined,
        }}
        maxWidth={false}
      >
        {children}
      </Container>
      {isMobile ? <BottomNavBar /> : null}
    </Box>
  );
};

export default Layout;
