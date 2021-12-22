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
import { updateUserProfile } from "../user/userSlice";
import UserSkeleton from "./UserSkeleton";

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
        {userProfile?.photos?.map(
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
        <Typography variant="h6" component="div">
          {userProfile?.lastActive?.toString().split("T")[0]}
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
