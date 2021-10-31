import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Header = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" component="h2" align="center">
        Crud Operations
      </Typography>
    </Box>
  );
};
