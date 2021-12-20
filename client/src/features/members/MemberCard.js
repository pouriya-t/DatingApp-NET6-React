import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function MemberCard({ user }) {
  return (
    <Card>
      <div style={{ border: "8px double #d9d9d9", margin: 20 }}>
        {user.photos?.map(
          (photo) =>
            photo.isMain && (
              <CardMedia key={photo.id} component="img" image={photo.url} />
            )
        )}
      </div>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Location:
        </Typography>
        <Typography variant="h6" component="div">
          {user.country}, {user.city}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Age:
        </Typography>
        <Typography variant="h6" component="div">
          {user.age}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Last Active:
        </Typography>
        <Typography variant="h6" component="div">
          {user.lastActive?.toString().split("T")[0]}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Member Since:
        </Typography>
        <Typography variant="h6" component="div">
          {user.created?.toString().split("T")[0]}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup
          variant="contained"
          sx={{ width: "100%", mb: 2, display: "flex" }}
        >
          <Button color="warning" sx={{ width: "100%" }}>
            Like
          </Button>
          <Button color="success" sx={{ width: "100%" }}>
            Message
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
