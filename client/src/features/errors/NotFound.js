import { Container, Divider, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container
      component={Paper}
      sx={{ margin: "0 auto", marginTop: "2rem", p: 2 }}
    >
      <Typography gutterBottom variant="h3">
        Oops - we could not find what are you looking
      </Typography>
      <Divider />
      <br />
      <Button variant="contained" color="secondary" component={Link} to="/">
        Go Back to Home
      </Button>
    </Container>
  );
}
