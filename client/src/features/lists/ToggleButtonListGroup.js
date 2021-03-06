import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { setLikesParams } from "./likeSlice";

export default function ToggleButtonListGroup({ dispatch }) {
  const [alignment, setAlignment] = useState("");
  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (!alignment) {
      dispatch(setLikesParams({ predicate: "likedBy" }));
      setAlignment("left");
    }
  }, [alignment, dispatch]);
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      color="primary"
      sx={{ mb: 2 }}
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
        }}
        variant="contained"
      >
        Users Liked By Me
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
