import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface LoadingIndicatorProps {
  size?: number;
}

const LoadingIndicator = ({ size }: LoadingIndicatorProps) => {
  return (
    <Box
      id="loading indicator"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" size={size ?? 40} />
    </Box>
  );
};

export default LoadingIndicator;
