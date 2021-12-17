import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container
      component={Paper}
      sx={{ margin: "0 auto", marginTop: "2rem", p: 2 }}
    >
      {state?.error ? (
        <>
          <Typography variant="h5" color="error">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography>
            {state.error.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">Server Error</Typography>
      )}
      <Button variant="contained" onClick={() => navigate("/")}>
        Go back to the home
      </Button>
    </Container>
  );
}
