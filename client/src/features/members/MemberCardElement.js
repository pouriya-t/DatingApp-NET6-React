import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";

import React from "react";

export default function MemberCardElement({ user }) {
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
            <FavoriteIcon sx={styleIcon} />
            <EmailIcon sx={styleIcon} />
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
