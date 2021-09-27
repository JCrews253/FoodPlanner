import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingIndicator = () => {
  return (
    <Box
      id="loading indicator"
      // sx={{
      //   width: "100%",
      //   height: "100%",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      sx={{
        margin: "auto",
        position: "absolute",
        top: "50%",
        bottom: "auto",
        left: "50%",
        right: "auto",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingIndicator;
