import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface InvalidUrlProps {
  message?: string;
}

const InvalidUrl = ({ message }: InvalidUrlProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">
        {message ?? "This url does not exist :("}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ mt: (theme) => theme.spacing(2) }}
      >
        Home
      </Button>
    </Box>
  );
};

export default InvalidUrl;
