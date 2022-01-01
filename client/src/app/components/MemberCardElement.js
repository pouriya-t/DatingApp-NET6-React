import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default function MemberCardElement({ user }) {
  function likeUser(username) {
    agent.Like.likeUser(username)
      .then(() => toast.success(`You liked ${username}`))
      .catch((error) => console.log(error.data));
  }

  return (
    <Grid item xs={6} sm={2}>
      <Card>
        <div
          style={{
            overflow: "hidden",
          }}
          className="card-member"
        >
          <div className="card-image-div">
            {user.photoUrl ? (
              <CardMedia
                id={user.id}
                component="img"
                image={user.photoUrl}
                className="card-image"
              />
            ) : (
              <CardMedia
                id={user.id}
                component="img"
                image="/images/profile/Profile-Icon.png"
                className="card-image"
              />
            )}
          </div>
          <div className="animated-button">
            <Link to={`/members/${user.username}`} state={user.username}>
              <PersonIcon sx={styleIcon} />
            </Link>
            <FavoriteIcon
              onClick={() => likeUser(user.username)}
              sx={styleIcon}
            />
            <Link
              to={`/members/${user.username}?tab=4`}
              state={user.username}
            >
              <EmailIcon sx={styleIcon} />
            </Link>
          </div>
        </div>
        <CardContent>
          <Typography
            sx={{ textAlign: "center", marginTop: "-25px" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            <PersonIcon sx={{ mr: 1, position: "relative", top: "4px" }} />
            {user.username}, {user.age}
          </Typography>
          <Typography
            sx={{ textAlign: "center" }}
            variant="body2"
            color="text.secondary"
          >
            {user.city}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const styleIcon = {
  border: "2px solid #1976d2",
  color: "white",
  borderRadius: "5px",
  backgroundColor: "#1976d2",
  margin: "0 5px 0 5px",
  "&:hover": {
    cursor: "pointer",
  },
};
