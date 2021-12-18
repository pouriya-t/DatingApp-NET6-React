import { Container, Paper, Typography, Button, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServerError() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container
      component={Paper}
      sx={{ margin: "0 auto", marginTop: "2rem", p: 2 }}
    >
      {state ? (
        <>
          <Typography variant="h3" color="error">
            {state.error.statusCode}
          </Typography>
          <Typography variant="h5" color="error">
            {state.error.message}
          </Typography>
          <Divider />
          <Typography>
            {state.error.details || "Internal server error"}
          </Typography>
          <Divider sx={{ margin: 2 }} />
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
