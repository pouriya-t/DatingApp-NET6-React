import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import TimeAgo from "react-timeago";

export default function MemberCardDetails({ userDetails }) {
  return (
    <Card>
      <div style={{ border: "8px double #d9d9d9", margin: 20 }}>
        {userDetails?.photos?.length > 0 ? (
          userDetails.photos?.map(
            (photo) =>
              photo.isMain && (
                <CardMedia key={photo.id} component="img" image={photo.url} />
              )
          )
        ) : (
          <CardMedia component="img" image="/images/profile/Profile-Icon.png" />
        )}
      </div>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Location:
        </Typography>
        <Typography variant="h6" component="div">
          {userDetails.country}, {userDetails.city}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Age:
        </Typography>
        <Typography variant="h6" component="div">
          {userDetails.age}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Last Active:
        </Typography>
        <Typography variant="h6" component="div">
          <TimeAgo
            formatter={(value, unit, suffix) => {
              if (unit === "second") {
                return "just now";
              } else {
                return (
                  value + " " + unit + (value > 1 ? "s" : "") + " " + suffix
                );
              }
            }}
            date={userDetails?.lastActive}
          />
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Member Since:
        </Typography>
        <Typography variant="h6" component="div">
          {userDetails.created?.toString().split("T")[0]}
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
