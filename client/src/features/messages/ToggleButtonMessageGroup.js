import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { setMessagesParams } from "./messageSlice";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";

export default function ToggleButtonMessageGroup({ dispatch }) {
  const [alignment, setAlignment] = useState("");
  const handleAlignment = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (!alignment) {
      dispatch(setMessagesParams({ container: "Inbox" }));
      setAlignment("center");
    }
  }, [alignment, dispatch]);

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
          dispatch(setMessagesParams({ container: "Unread" }));
        }}
        value="left"
        aria-label="left aligned"
      >
        <MailIcon />
        Unread
      </ToggleButton>
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
          dispatch(setMessagesParams({ container: "Inbox" }));
        }}
        value="center"
        aria-label="center aligned"
      >
        <DraftsIcon />
        Inbox
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
          dispatch(setMessagesParams({ container: "Outbox" }));
        }}
        variant="contained"
      >
        <SendIcon />
        Outbox
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
