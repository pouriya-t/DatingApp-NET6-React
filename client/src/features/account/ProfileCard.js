import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../app/store/configureStore";
import { updateUserProfile } from "./accountSlice";
import UserSkeleton from "./UserSkeleton";
import TimeAgo from "react-timeago";

export default function ProfileCard({ profileForm, userProfile = null }) {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { isDirty },
  } = profileForm;

  function onSubmit(data) {
    dispatch(updateUserProfile(data));
  }


  if (!userProfile) return <UserSkeleton />;

  return (
    <Card sx={{ mt: 2 }}>
      <div style={{ border: "8px double #d9d9d9", margin: 20 }}>
        {userProfile?.photos?.length > 0 ? (
          userProfile?.photos?.map(
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
          {userProfile?.country}, {userProfile?.city}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Age:
        </Typography>
        <Typography variant="h6" component="div">
          {userProfile?.age}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Last Active:
        </Typography>
        <Typography
          variant="h6"
          component="div"
        >
          last seen{" "}
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
            date={userProfile?.lastActive}
          />
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }} variant="h5" component="div">
          Member Since:
        </Typography>
        <Typography variant="h6" component="div">
          {userProfile?.created?.toString().split("T")[0]}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup
          variant="contained"
          sx={{ width: "100%", mb: 2, display: "flex" }}
        >
          <Button
            color="success"
            sx={{ width: "100%" }}
            disabled={!isDirty}
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
