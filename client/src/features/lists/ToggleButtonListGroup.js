import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { likesUser, setLikesParams } from "./likeSlice";

export default function ToggleButtonListGroup({
  dispatch,
  alignment,
  setAlignment,
}) {
  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton
        sx={{
          backgroundColor: "#5f7fe8",
          color: "white",
          "&:hover": {
            backgroundColor: "#8ba4f7",
          },
        }}
        variant="contained"
        onClick={() => {
          dispatch(setLikesParams({ predicate: "likedBy" }));
          dispatch(likesUser());
        }}
        value="left"
        aria-label="left aligned"
      >
        Who Users Likes Me
      </ToggleButton>
      <ToggleButton
        sx={{
          backgroundColor: "#5f7fe8",
          color: "white",
          "&:hover": {
            backgroundColor: "#8ba4f7",
          },
        }}
        value="right"
        aria-label="right aligned"
        onClick={() => {
          dispatch(setLikesParams({ predicate: "liked" }));
          dispatch(likesUser());
        }}
        variant="contained"
      >
        Users Liked By Me
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
