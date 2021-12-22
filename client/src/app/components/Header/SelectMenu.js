import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/configureStore";
import { signOut } from "../../../features/account/accountSlice";
import { Select, Typography, Divider, MenuItem, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function SelectMenu({ userInfo }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
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
