import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  getUserProfile,
  signOut,
} from "../../../features/account/accountSlice";
import {
  Select,
  Typography,
  Divider,
  MenuItem,
  Paper,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

export default function SelectMenu({ userInfo }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (!userProfile) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userProfile]);

  return (
    <>
      {userProfile?.photos?.length > 0 ? (
        userProfile?.photos?.map(
          (photo) =>
            photo.isMain && (
              <CardMedia
                key={photo.id}
                component="img"
                sx={{ width: "50px", height: "50px", mr: 2, borderRadius: 5 }}
                image={photo.url}
              />
            )
        )
      ) : userProfile?.photos !== undefined ? (
        <CardMedia
          sx={{ width: "50px", height: "50px", mr: 2, borderRadius: 5 }}
          component="img"
          image="/images/profile/Profile-Icon.png"
        />
      ) : null}
      <Typography sx={{ mr: 2 }}>Welcome {userInfo.username}</Typography>
      <Select
        className={classes.select}
        inputProps={{
          classes: {
            icon: classes.icon,
            root: classes.root,
          },
        }}
        variant="standard"
      >
        <Paper>
          <MenuItem
            sx={{ fontWeight: "bold" }}
            component={NavLink}
            style={styles.loginSelected}
            to="/member/edit"
          >
            Edit Profile
          </MenuItem>
          <MenuItem style={styles.loginSelected}>Account 2</MenuItem>
          <Divider />
          <MenuItem
            className="logout-menuitem"
            style={styles.loginSelected}
            onClick={() => {
              navigate("/");
              dispatch(signOut());
            }}
          >
            Logout
          </MenuItem>
        </Paper>
      </Select>
    </>
  );
}

const useStyles = makeStyles({
  select: {
    "&:before": {
      border: "none",
    },
    "&:after": {
      border: "none",
    },
    "&:not(.Mui-disabled):hover::before": {
      border: "none",
    },
  },
  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
});

const styles = {
  loginSelected: {
    padding: "10px 30px 10px 30px",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottom: "none",
  },
};
