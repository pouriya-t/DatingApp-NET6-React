import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingSmallComponent({
  height = "39vh",
  size = 100,
  ...props
}) {
  return (
    <Box {...props} height={height} display="flex" alignItems="center">
      <CircularProgress size={size} color="secondary" />
    </Box>
  );
}
