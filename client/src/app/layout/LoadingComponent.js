import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingComponent({ message = "Loading..." }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={100} color="secondary" />
        <Typography
          variant="h4"
          sx={{
            justifyContent: "center",
            position: "fixed",
            top: "60%",
            mt: 4,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
